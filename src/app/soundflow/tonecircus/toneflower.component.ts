// D3.js, ReactJS TS - https://medium.com/@prncher/a-visual-experience-of-sampling-data-using-d3-js-reactjs-and-typescript-43b3bb603c3c
// Visualizing Sound With D3 and Web Audio API - https://medium.com/swlh/visualizing-sound-with-d3-and-web-audio-api-435ffea88f30
// Collide force - https://d3js.org/d3-force/collide

import { Component, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
import * as d3 from "d3";
import {
  BushModel,
  IDLEAVES,
  ToneCircusModel,
} from "src/app/soundflow/tonecircus/toneflower.model";
import { ToneFlower } from "src/app/soundflow/tonecircus/toneflower.class";
import * as Tone from "tone";
import { F } from "@angular/cdk/scrolling-module.d-ud2XrbF8";

type OscItem = {
  [index: number]: OscillatorNode;
};

@Component({
  selector: "app-tonecircus",
  imports: [RouterModule],
  templateUrl: "./toneflower.component.html",
  styleUrl: "./toneflower.component.css",
  standalone: true,
})
export class ToneFlowerComponent implements OnInit {
  private baseFlower: ToneFlower;

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

  private initToneFlowers() {
    this.baseFlower = new ToneFlower();
    this.baseFlower.cx = 150;
    this.baseFlower.cy = 230;
    this.baseFlower.addLeaf(1);

    const bush1: BushModel = {
      flowers: [
        [6, 6, 6, 9],
        [2, 11, 10],
        [8, 5, 1],
      ],
    };
    const flowerPlaces = [
      [150, 230],
      [80, 132],
      [165, 60],
    ];

    bush1.flowers.map((flowerIds, i) => {
      const flower = new ToneFlower();
      flower.seed(flowerIds, flowerPlaces[i]);
      this.drawFlower(flower);
    });
  }

  private drawFlower(flower: ToneFlower) {
    flower.leaves.forEach((leaf, index) => {
      const centerX = flower.cx;
      const centerY = flower.cy;
      const radius = flower.baseRadius + flower.leafWidth * index;
      this.addArc(
        this.arcs,
        centerX,
        centerY,
        index === 0 ? 0 : radius,
        radius + flower.leafWidth,
        leaf.toneCircus,
        true
      );
    });
  }

  private addArc(
    arcs,
    x: number,
    y: number,
    innerRadius: number,
    outerRadius: number,
    toneCircus: ToneCircusModel,
    isLeaf = false
  ) {
    const arcX = x,
      arcY = y;
    const g = this.svgr
      .append("g")
      .attr("transform", "translate(" + arcX + "," + arcY + ")");
    const arcPath = g
      .append("path")
      .datum({
        innerRadius,
        outerRadius,
        cx: x,
        cy: y,
        collided: false,
        name: "p" + this.c++,
        toneCircus,
        isLeaf,
      })
      .style("fill", toneCircus.colorHex)
      .attr("d", this.arc);
    arcs.push(arcPath);
    if (!isLeaf) {
      this.appear(null, arcPath);
    }
  }

  private collisionDetection(orig) {
    const paths = [...orig];
    paths.forEach((path: any) => {
      const datumPath = path.datum();
      const myIndex = paths.indexOf(path);
      const others = paths.toSpliced(myIndex, 1);
      // console.log('A -', paths.map(p=>p.datum().name).join(', '));
      // console.log('B -', others.map(p=>p.datum().name).join(', '));
      others.forEach((other) => {
        const datumOther = other.datum();
        const aX = datumPath.cx;
        const aY = datumPath.cy;
        const bX = datumOther.cx;
        const bY = datumOther.cy;
        const radiusA = datumPath.outerRadius;
        const radiusB = datumOther.outerRadius;
        const a = aX - bX;
        const b = aY - bY;
        const distance = Math.sqrt(a * a + b * b);
        // console.log(`a(${aX},${aY})|${radiusA}, b(${bX}, ${bY})|${radiusB}, dx=${a}, dy=${b}, D=${distance}, rSum=${radiusA + radiusB}`)
        if (distance < radiusA + radiusB && !datumOther.colliding) {
          path.selectAll("*").interrupt();
          other.selectAll("*").interrupt();
          // deflate(path);
          if (!datumOther.isLeaf) {
            this.collide(path, other);
          }
        }
        this.drawCircus(other);
      });
      this.drawCircus(path);
    });
  }

  private async initFlow() {
    this.svgr = d3
      .select("#tonecircus")
      .append("svg")
      .style("border", "1px solid #ccc")
      .attr("viewBox", [0, 0, this.width, this.height]);

    this.svgr.on("click", (event) => {
      if (!this.audioStarted) {
        (async () => {
          await Tone.start();
          console.log("audio is ready");
          this.audioStarted = true;
        })();
      }
      var e = d3.pointer(event);
      this.addArc(
        this.arcs,
        e[0],
        e[1],
        this.innRad,
        this.outRad,
        this.baseFlower.leaves[0].toneCircus,
        false
      );
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

  // private randomizeArcs() {
  //   for (let i = 0; i < this.randLen; i++) {
  //     this.duration = Math.round(Math.random() * 5000 + 8000);
  //     this.addArc(
  //       this.arcs,
  //       Math.random() * this.width,
  //       Math.random() * this.height
  //     );
  //   }
  // }

  private appear(a, b) {
    b.transition()
      .duration(this.duration)
      .attrTween("d", this.radiusTween(this.maxRad))
      .ease(this.ease);
  }

  private collide(leaf, water) {
    const datumLeaf = leaf.datum();
    const datumWater = water.datum();
    datumWater.colliding = true;
    const growth = datumWater.outerRadius / this.maxRad;
    const radiusId = this.maxRad - datumWater.outerRadius;
    const durationCalibrated = this.duration * growth;
    this.noteOn(radiusId.toString(), datumLeaf.toneCircus);
    water
      .transition()
      .duration(durationCalibrated)
      .attrTween("d", this.radiusTween(this.minRad))
      .ease(this.ease)
      .on("end", (datum) => {
        datum.colliding = false;
        this.appear(leaf, water);
        this.noteOff(radiusId.toString(), datumLeaf.toneCircus);
      });
  }

  private drawCircus(path) {
    const datum = path.datum();
    const tc: ToneCircusModel = datum.toneCircus;
    if (!datum.isLeaf) {
      path.style("stroke", datum.colliding === true ? tc.color : "#333");
      path.style("fill", "none");
    }
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
  private oscList: OscItem[] = [];
  private noteFreq: number[] = [];

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

  private freqToOctave(frequency) {
    const referenceFrequency = 440; // A4
    const octave = Math.log2(frequency / referenceFrequency) + 4;
    return octave;
  }

  private playNote(freq, toneCircus: ToneCircusModel) {
    const octave = this.freqToOctave(freq);
    const note = toneCircus.note + octave;

    console.log(`play ${note} (${freq})`);
    const synth = new Tone.PolySynth(Tone.Synth).toDestination();
    const now = Tone.now();

    synth.triggerAttack(note, now + 0.05);
    // synth.triggerAttack("F4", now + 0.5);
    // synth.triggerAttack("A4", now + 1);
    // synth.triggerAttack("C5", now + 1.5);
    // synth.triggerAttack("E5", now + 2);
    synth.triggerRelease([note], now + 0.3);
  }

  private playTone(freq, toneCircus: ToneCircusModel) {
    if (toneCircus && toneCircus.note) {
      this.playNote(freq, toneCircus);
      return;
    }

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

    // console.debug(
    //   `Tone: ${freq}Hz, ${noteLength.toFixed(2)} sec, ${attTime.toFixed(
    //     2
    //   )} att / ${relTime.toFixed(2)} rel.`
    // );

    return synth;
  }

  private noteOn(radiusId: string, toneCircus: ToneCircusModel) {
    // console.debug("note on", radiusId);
    // this.noteOff(radiusId, toneCircus);
    this.oscList[radiusId] = this.playTone(radiusId, toneCircus);
  }

  private noteOff(radiusId: string, toneCircus: ToneCircusModel) {
    // const oscToOff = this.oscList[radiusId];
    // if (oscToOff) {
    // console.debug("note off", radiusId, oscToOff);
    // delete this.oscList[radiusId];
    // }
  }

  ngOnInit(): void {
    this.initFlow();
    this.initToneFlowers();
  }
}
