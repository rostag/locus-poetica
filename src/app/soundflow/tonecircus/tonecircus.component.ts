// D3.js, ReactJS TS - https://medium.com/@prncher/a-visual-experience-of-sampling-data-using-d3-js-reactjs-and-typescript-43b3bb603c3c
// Visualizing Sound With D3 and Web Audio API - https://medium.com/swlh/visualizing-sound-with-d3-and-web-audio-api-435ffea88f30
// Collide force - https://d3js.org/d3-force/collide

import { Component, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
import * as d3 from "d3";
import * as Tone from "tone";

type OscItem = {
  [index: number]: OscillatorNode;
};

@Component({
  selector: "app-tonecircus",
  imports: [RouterModule],
  templateUrl: "./tonecircus.component.html",
  styleUrl: "./tonecircus.component.css",
  standalone: true,
})
export class TonecircusComponent implements OnInit {
  private margin = 50;
  private width = 750 - this.margin * 2;
  private height = 400 - this.margin * 2;

  private tau = 2 * Math.PI;
  private minRad = 0;
  private maxRad = 800;
  private th = this.maxRad - this.minRad;
  private innRad = this.minRad - this.th;
  private outRad = this.minRad;
  private ease = d3.easeLinear;

  private svgr;
  private arcs = [];
  private arc = d3.arc().startAngle(0).endAngle(this.tau);
  private c = 0;
  private randLen = 1;
  private duration = 9000;

  private audioStarted = false;

  private async initFlow() {
    this.svgr = d3
      .select("#soundflow")
      .append("svg")
      .style("border", "1px solid #ccc")
      .attr("viewBox", [0, 0, this.width, this.height]);
    // .style("border", "1px solid #fc0")
    // .attr("width", this.width + this.margin * 2)
    // .attr("height", this.height + this.margin * 2)
    // .append("g")
    // .attr("transform", "translate(" + this.margin + "," + this.margin + ")");

    this.svgr.on("click", (event) => {
      if (!this.audioStarted) {
        (async () => {
          await Tone.start();
          console.log("audio is ready");
          this.audioStarted = true;
        })();
      }
      var e = d3.pointer(event);
      this.addArc(this.arcs, e[0], e[1]);
    });

    d3.timer(() => {
      this.collisionDetection(this.arcs);
    }, 1000);

    this.setupAudio();

    // Reset Button
    // this.svgr
    //   .append("circle")
    //   .attr("cx", 30)
    //   .attr("cy", 30)
    //   .attr("stroke", "black")
    //   .style("fill", "yellow")
    //   .attr("r", 20)
    //   .on("click", (event) => {
    //     event.preventDefault();
    //     event.stopPropagation();
    //     this.arcs.forEach((path: any) => {
    //       // FIXME
    //       path.datum().colliding = true;
    //       path.selectAll("*").interrupt();
    //       this.deflate(path);
    //     });
    //   });

    // this.randomizeArcs();
  }

  private randomizeArcs() {
    for (let i = 0; i < this.randLen; i++) {
      this.duration = Math.round(Math.random() * 5000 + 8000);
      this.addArc(
        this.arcs,
        Math.random() * this.width,
        Math.random() * this.height
      );
    }
  }

  private addArc(arcs, x, y) {
    const arcX = x,
      arcY = y;
    const g = this.svgr
      .append("g")
      .attr("transform", "translate(" + arcX + "," + arcY + ")");
    const arcPath = g
      .append("path")
      .datum({
        innerRadius: this.innRad,
        outerRadius: this.outRad,
        cx: x,
        cy: y,
        collided: false,
        name: "p" + this.c++,
      })
      .style("fill", "#333")
      .attr("d", this.arc);
    arcs.push(arcPath);
    this.inflate(arcPath);
  }

  private inflate(arcPath) {
    arcPath
      .transition()
      .duration(this.duration)
      .attrTween("d", this.radiusTween(this.maxRad))
      .ease(this.ease);
  }

  private deflate(arcPath) {
    const datum = arcPath.datum();
    datum.colliding = true;
    const growth = datum.outerRadius / this.maxRad;
    const radiusId = this.maxRad - datum.outerRadius; // parseInt
    const durationCalibrated = this.duration * growth;
    this.noteOn(radiusId.toString());
    arcPath
      .transition()
      .duration(durationCalibrated)
      .attrTween("d", this.radiusTween(this.minRad))
      .ease(this.ease)
      .on("end", (datum) => {
        datum.colliding = false;
        this.inflate(arcPath);
        this.noteOff(radiusId.toString());
      });
  }

  private drawCollideStatus(path) {
    path.style("fill", path.datum().colliding === true ? "#f00" : "#333");
  }

  private collisionDetection(orig) {
    const paths = [...orig];
    paths.forEach((path: any) => {
      const datumA = path.datum();
      const myIndex = paths.indexOf(path);
      const others = paths.toSpliced(myIndex, 1);
      // console.log('A -', paths.map(p=>p.datum().name).join(', '));
      // console.log('B -', others.map(p=>p.datum().name).join(', '));
      others.forEach((other) => {
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
          this.deflate(other);
        }
        this.drawCollideStatus(other);
      });
      this.drawCollideStatus(path);
    });
  }

  // Returns a tween for a transition’s "d" attribute, transitioning any selected arcs
  private radiusTween(newRadius) {
    return (d) => {
      const interpolateInner = d3.interpolate(
        d.innerRadius,
        newRadius - this.th
      );
      const interpolateOuter = d3.interpolate(d.outerRadius, newRadius);
      return (t) => {
        d.innerRadius = interpolateInner(t);
        d.outerRadius = interpolateOuter(t);
        return this.arc(d);
      };
    };
  }

  // Audio
  private audioContext = new AudioContext();
  private oscList: OscItem[] = [];
  private mainGainNode;
  private sweepEnv;

  private noteFreq;
  private customWaveform;
  private sineTerms;
  private cosineTerms;

  private mainGain = 1;
  private envGain = 0.1;

  private minVolume = 0.00001;

  private createNoteTable() {
    const noteFreq: any[] = []; // TODO type
    for (let i = 0; i < 9; i++) {
      noteFreq[i] = null;
    }

    // TODO noteFreq[0]["A"] = 27.500000000000000;
    // ...

    return noteFreq;
  }

  private setupAudio() {
    this.noteFreq = this.createNoteTable();

    for (let i = 0; i < this.oscList.length; i++) {
      this.oscList[i] = {};
    }
  }

  private range(inRange, outRange, val) {
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

  private playTone(freq) {
    // Range 1 - 600 to 1.5 - 0.1 // 1 - 600
    let noteLength = this.range(
      { min: 1, max: this.maxRad },
      { min: 1.5, max: 0.01 },
      freq
    );
    let attTime = this.range(
      { min: 1, max: this.maxRad },
      { min: 0.1, max: 0.01 },
      freq
    );
    let relTime = this.range(
      { min: 1, max: this.maxRad },
      { min: 1, max: 0.01 },
      freq
    );

    //create a synth and connect it to the main output (your speakers)
    const synth = new Tone.AMSynth().toDestination();
    //play a freq for the duration of an 8th note
    synth.triggerAttackRelease(freq / 6, noteLength);

    console.debug(
      `Tone: ${freq}Hz, ${noteLength.toFixed(2)} sec, ${attTime.toFixed(
        2
      )} att / ${relTime.toFixed(2)} rel.`
    );

    return synth;
  }

  private noteOn(radiusId: string) {
    console.debug("note on", radiusId);
    this.noteOff(radiusId);
    this.oscList[radiusId] = this.playTone(radiusId);
  }

  private noteOff(radiusId: string) {
    const oscToOff = this.oscList[radiusId];
    if (oscToOff) {
      console.debug("note off", radiusId, oscToOff);
      delete this.oscList[radiusId];
    }
  }

  ngOnInit(): void {
    this.initFlow();
  }
}
