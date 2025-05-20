{
  // D3.js, ReactJS TS - https://medium.com/@prncher/a-visual-experience-of-sampling-data-using-d3-js-reactjs-and-typescript-43b3bb603c3c
  // Visualizing Sound With D3 and Web Audio API - https://medium.com/swlh/visualizing-sound-with-d3-and-web-audio-api-435ffea88f30
  // Collide force - https://d3js.org/d3-force/collide

  const height = 520,
    tau = 2 * Math.PI,
    minRad = 0,
    maxRad = 800,
    th = maxRad - minRad,
    innRad = minRad - th,
    outRad = minRad,
    ease = d3.easeLinear;
  const svgr = d3
    .create("svg")
    .style("border", "1px solid #fc0")
    .attr("viewBox", [0, 0, width, height]);
  const arcs = [];
  const arc = d3.arc().startAngle(0).endAngle(tau);
  let c = 0;
  let randLen = 1,
    duration = 9000;

  svgr.on("click", function (event) {
    var e = d3.pointer(event);
    addArc(arcs, e[0], e[1]);
  });

  // for (let i = 0; i < randLen; i++) {
  //   duration = Math.round(Math.random() * 5000 + 8000);
  //   addArc(arcs, Math.random() * width, Math.random() * height, );
  // }

  // Button
  svgr
    .append("circle")
    .attr("cx", 30)
    .attr("cy", 30)
    .attr("stroke", "black")
    .style("fill", "yellow")
    .attr("r", 20)
    .on("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      arcs.forEach(function (path) {
        path.datum().colliding = true;
        path.selectAll("*").interrupt();
        deflate(path);
      });
    });

  d3.timer(function () {
    collisionDetection(arcs);
  }, 1000);

  function addArc(arcs, x, y) {
    const arcX = x,
      arcY = y;
    const g = svgr
      .append("g")
      .attr("transform", "translate(" + arcX + "," + arcY + ")");
    const arcPath = g
      .append("path")
      .datum({
        innerRadius: innRad,
        outerRadius: outRad,
        cx: x,
        cy: y,
        collided: false,
        name: "p" + c++,
      })
      .style("fill", "#333")
      .attr("d", arc);
    arcs.push(arcPath);
    inflate(arcPath);
  }

  function inflate(arcPath) {
    arcPath
      .transition()
      .duration(duration)
      .attrTween("d", radiusTween(maxRad))
      .ease(ease);
  }

  function deflate(arcPath) {
    const datum = arcPath.datum();
    datum.colliding = true;
    const growth = datum.outerRadius / maxRad;
    const radiusId = parseInt(maxRad - datum.outerRadius, 10);
    const durationCalibrated = duration * growth;
    noteOn(radiusId);
    arcPath
      .transition()
      .duration(durationCalibrated)
      .attrTween("d", radiusTween(minRad))
      .ease(ease)
      .on("end", function (datum) {
        datum.colliding = false;
        inflate(arcPath);
        // noteOff(radiusId);
      });
  }

  function drawCollideStatus(path) {
    path.style("fill", path.datum().colliding === true ? "#f00" : "#333");
  }

  function collisionDetection(orig) {
    const paths = [...orig];
    paths.forEach(function (path) {
      const datumA = path.datum();
      const myIndex = paths.indexOf(path);
      const others = paths.toSpliced(myIndex, 1);
      // console.log('A -', paths.map(p=>p.datum().name).join(', '));
      // console.log('B -', others.map(p=>p.datum().name).join(', '));
      others.forEach(function (other) {
        const datumB = other.datum();
        const aX = datumA.cx;
        const aY = datumA.cy;
        const bX = datumB.cx;
        const bY = datumB.cy;
        const radiusA = datumA.outerRadius;
        const radiusB = datumB.outerRadius;
        const a = aX - bX;
        const b = aY - bY;
        const distance = Math.sqrt(a * a + b * b);
        // console.log(`a(${aX},${aY})|${radiusA}, b(${bX}, ${bY})|${radiusB}, dx=${a}, dy=${b}, D=${distance}, rSum=${radiusA + radiusB}`)
        if (distance < radiusA + radiusB && !datumB.colliding) {
          path.selectAll("*").interrupt();
          other.selectAll("*").interrupt();
          // deflate(path);
          deflate(other);
        }
        drawCollideStatus(other);
      });
      drawCollideStatus(path);
    });
  }

  // Returns a tween for a transition’s "d" attribute, transitioning any selected arcs
  function radiusTween(newRadius) {
    return function (d) {
      const interpolateInner = d3.interpolate(d.innerRadius, newRadius - th);
      const interpolateOuter = d3.interpolate(d.outerRadius, newRadius);
      return function (t) {
        d.innerRadius = interpolateInner(t);
        d.outerRadius = interpolateOuter(t);
        return arc(d);
      };
    };
  }

  // Audio
  const audioContext = new AudioContext();
  const oscList = [];
  let mainGainNode = null;
  let sweepEnv = null;

  let noteFreq = null;
  let customWaveform = null;
  let sineTerms = null;
  let cosineTerms = null;

  let mainGain = 1;
  let envGain = 0.1;

  function createNoteTable() {
    const noteFreq = [];
    for (let i = 0; i < 9; i++) {
      noteFreq[i] = [];
    }

    // noteFreq[0]["A"] = 27.500000000000000;
    // noteFreq[0]["A#"] = 29.135235094880619;
    // noteFreq[0]["B"] = 30.867706328507756;
    // noteFreq[1]["C"] = 32.703195662574829;
    // noteFreq[1]["C#"] = 34.647828872109012;
    // noteFreq[1]["D"] = 36.708095989675945;
    // noteFreq[1]["D#"] = 38.890872965260113;
    // noteFreq[1]["E"] = 41.203444614108741;
    // noteFreq[1]["F"] = 43.653528929125485;
    // noteFreq[1]["F#"] = 46.249302838954299;
    // noteFreq[1]["G"] = 48.999429497718661;
    // noteFreq[1]["G#"] = 51.913087197493142;
    // noteFreq[1]["A"] = 55.000000000000000;
    // noteFreq[1]["A#"] = 58.270470189761239;
    // noteFreq[1]["B"] = 61.735412657015513;
    // noteFreq[7]["C"] = 2093.004522404789077;
    // noteFreq[7]["C#"] = 2217.461047814976769;
    // noteFreq[7]["D"] = 2349.318143339260482;
    // noteFreq[7]["D#"] = 2489.015869776647285;
    // noteFreq[7]["E"] = 2637.020455302959437;
    // noteFreq[7]["F"] = 2793.825851464031075;
    // noteFreq[7]["F#"] = 2959.955381693075191;
    // noteFreq[7]["G"] = 3135.963487853994352;
    // noteFreq[7]["G#"] = 3322.437580639561108;
    // noteFreq[7]["A"] = 3520.000000000000000;
    // noteFreq[7]["A#"] = 3729.310092144719331;
    // noteFreq[7]["B"] = 3951.066410048992894;
    // noteFreq[8]["C"] = 4186.009044809578154;
    return noteFreq;
  }

  function setup() {
    noteFreq = createNoteTable();

    mainGainNode = audioContext.createGain();
    mainGainNode.connect(audioContext.destination);
    mainGainNode.gain.value = mainGain;

    sineTerms = new Float32Array([0, 0, 1, 0, 1]);
    cosineTerms = new Float32Array(sineTerms.length);
    customWaveform = audioContext.createPeriodicWave(cosineTerms, sineTerms);

    for (let i = 0; i < oscList.length; i++) {
      oscList[i] = {};
    }
  }

  setup();

  function range(inRange, outRange, val) {
    const inMin = inRange.min;
    const inMax = inRange.max;
    const inSize = inMax - inMin;

    const outMin = outRange.min;
    const outMax = outRange.max;
    const outSize = outMax - outMin;

    const inv = outSize < 0;
    const base = inv ? outMin : 0;

    const ratio = outSize / inSize;
    const result = base + val * ratio;

    // console.log(`range: ${inMin}-${inMax} to ${outMin}-${outMax}, ${val}=>${result}`)
    return result;
  }

  function playTone(freq) {
    // Range 1 - 600 to 1.5 - 0.1 // 1 - 600
    let noteLength = range(
      { min: 1, max: maxRad },
      { min: 1.5, max: 0.01 },
      freq
    );
    let attTime = range({ min: 1, max: maxRad }, { min: 0.1, max: 0.01 }, freq);
    let relTime = range({ min: 1, max: maxRad }, { min: 1, max: 0.01 }, freq);

    const osc = audioContext.createOscillator();

    const time = audioContext.currentTime;

    const rampInTime = time + attTime;
    const rampOutTime = time + noteLength - relTime;

    console.log(
      `${freq}Hz, ${noteLength.toFixed(2)} sec, ${attTime.toFixed(
        2
      )} att / ${relTime.toFixed(2)} rel.`
    );

    sweepEnv = new GainNode(audioContext);
    sweepEnv.gain.cancelScheduledValues(time);
    sweepEnv.gain.setValueAtTime(0, time);
    sweepEnv.gain.linearRampToValueAtTime(envGain, rampInTime);
    sweepEnv.gain.linearRampToValueAtTime(0, rampOutTime);

    osc.connect(sweepEnv).connect(mainGainNode);
    // osc.connect(mainGainNode);
    osc.type = "sine";
    osc.frequency.value = freq;
    osc.start();
    // osc.stop(noteLen);
    return osc;
  }

  function noteOn(freq) {
    // console.log('note on', freq)
    noteOff(freq);
    oscList[freq] = playTone(freq);
  }

  function noteOff(freq) {
    if (oscList[freq]) {
      // console.log('note off', freq)
      oscList[freq].stop();
      delete oscList[freq];
    }
  }

  // Attack-Release
  // const attackControl = document.querySelector("#attack");
  // attackControl.addEventListener("input",(ev) => {  attackTime = parseFloat(ev.target.value, 10) }, false );

  // const releaseControl = document.querySelector("#release");
  // releaseControl.addEventListener("input", (ev) => { releaseTime = parseInt(ev.target.value, 10) }, false );

  return svgr.node();
}
