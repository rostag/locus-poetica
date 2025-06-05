// D3.js, ReactJS TS - https://medium.com/@prncher/a-visual-experience-of-sampling-data-using-d3-js-reactjs-and-typescript-43b3bb603c3c
// Visualizing Sound With D3 and Web Audio API - https://medium.com/swlh/visualizing-sound-with-d3-and-web-audio-api-435ffea88f30
// Collide force - https://d3js.org/d3-force/collide
// PIE - padAngle: https://observablehq.com/@d3/arc-pad-angle

import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatSliderModule } from "@angular/material/slider";

import { RouterModule } from "@angular/router";
import * as d3 from "d3";
import { AbetkaComponent } from "src/app/soundflow/tonecircus/abetka/abetka.component";
import { FlowerInputComponent } from "src/app/soundflow/tonecircus/flowerinput/flowerinput.component";
import { GetOrdinalComponent } from "src/app/soundflow/tonecircus/get-ordinal/get-ordinal.component";
import { ToneFlower } from "src/app/soundflow/tonecircus/toneflower.class";
import {
  IC,
  PLAY_BUSH,
  SAMPLE_BUSHMODELS,
} from "src/app/soundflow/tonecircus/toneflower.constants";
import {
  BushModel,
  IDN,
  LeafModel,
} from "src/app/soundflow/tonecircus/toneflower.model";
import * as Tone from "tone";

type OscItem = {
  [index: number]: OscillatorNode;
};

@Component({
  selector: "app-tonecircus",
  imports: [
    RouterModule,
    MatSliderModule,
    FormsModule,
    AbetkaComponent,
    GetOrdinalComponent,
  ],
  templateUrl: "./toneflower.component.html",
  styleUrl: "./toneflower.component.css",
  standalone: true,
})
export class ToneFlowerComponent implements OnInit {
  public showSettings = true;

  private playFlower: ToneFlower;

  private margin = 50;
  private width = 750 - this.margin * 2;
  private height = 600 - this.margin * 2;

  private tau = 2 * Math.PI;
  private minRad = 0;
  private maxRad = 800;
  private th = this.maxRad - this.minRad;
  private innRad = this.minRad - this.th;
  private outRad = this.minRad;
  private ease = d3.easeLinear;

  private svgr;
  private arcs = [];
  private arcGen = d3.arc().startAngle(0).endAngle(this.tau);
  private c = 0;
  private randLen = 1;
  private duration = 9000;

  private audioStarted = false;

  public IC = IC;
  public padAngle = IC.padAngle;

  private flowers: ToneFlower[] = [];

  private bush: BushModel;

  public clearFlowers() {
    this.svgr.selectAll("*").remove();

    this.flowers.forEach((flower) => {
      flower.burn();
    });

    this.arcs = [];
  }

  private drawBush() {
    const bush: BushModel = this.bush;
    bush.flowers.map((flowerModel, i) => {
      const flower = new ToneFlower();
      this.flowers.push(flower);
      flower.seed(flowerModel);
      this.drawFlower(flower);
    });
  }

  private drawFlowers() {
    this.playFlower = new ToneFlower();
    this.playFlower.cx = 150;
    this.playFlower.cy = 230;
    this.playFlower.seed(PLAY_BUSH.flowers[0]);

    this.drawBush();
  }

  getBush(bush: BushModel) {
    this.bush = bush;
    this.drawBush();
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
        leaf,
        true
      );
    });
  }

  private showPadLine = false;
  public toggleLine() {
    this.showPadLine = !this.showPadLine;
  }

  public padAngleBgStyle = 0; // 1, 2
  public toggleBgStyle = () => {
    this.padAngleBgStyle =
      this.padAngleBgStyle > 1 ? 0 : this.padAngleBgStyle + 1;
  };

  private getSectionData = (leafModel: LeafModel) => {
    const assignedNumber = leafModel.leafNum;
    const sections = new Array(assignedNumber);
    const s = 360 / assignedNumber;
    sections.fill(s, 0, assignedNumber);
    return sections;
  };

  private drawPie(
    arcs,
    x: number,
    y: number,
    innerRadius: number,
    outerRadius: number,
    leafModel: LeafModel,
    isLeaf = false
  ) {
    const data = this.getSectionData(leafModel);

    // const padAngle = (12 - data.length) * this.padAngle; // 36 / ;
    const padAngle = this.padAngle; // 36 / ;
    const pie2 = d3.pie().padAngle(padAngle); // adjusted pad angle (good)
    const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);

    const g = this.svgr
      .append("g")
      .selectAll("g")
      .data(() => [pie2(data)])
      .join("g")
      .attr("fill", (d, i) => [leafModel.leafIdn.colorHex])
      .attr("transform", (d, i) => `translate(${x}, ${y})`);

    if (this.showPadLine) {
      g.append("g")
        .attr("fill", "none")
        // .attr("stroke-width", Math.ceil(leafModel.leafNum / 2) + "px")
        .attr("stroke-width", ".25px")
        .attr("stroke", leafModel.leafIdn.colorHex)
        .selectAll("path")
        .data((arcs) => arcs)
        .join("path")
        .attr("d", arc.padAngle(0));
    }

    g.append("g")
      .attr("stroke", "#ffffff")
      .attr("stroke-width", ".25px")
      .attr("stroke-linejoin", "round")
      .selectAll("path")
      .data((arcs) => arcs)
      .join("path")
      .attr("d", arc.padAngle(padAngle));
  }

  private getArcBgStyle = (leafModel: LeafModel) => {
    switch (this.padAngleBgStyle) {
      case 0:
        return leafModel.leafIdn.colorHex;
      case 1:
        return "#fff";
      default:
        return "#000";
    }
  };

  private addArc(
    arcs,
    x: number,
    y: number,
    innerRadius: number,
    outerRadius: number,
    leafModel: LeafModel,
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
        leafModel,
        isLeaf,
      })
      .style("fill", this.getArcBgStyle(leafModel))
      .attr("d", this.arcGen);

    this.drawPie(arcs, x, y, innerRadius, outerRadius, leafModel, isLeaf);
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
    this.bush = SAMPLE_BUSHMODELS[IC.bushId];

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
        this.playFlower.leaves[0],
        false
      );
    });

    d3.timer(() => {
      this.collisionDetection(this.arcs);
    }, 1000);

    this.setupAudio();
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

  private collide(leaf, playLeaf) {
    const datumLeaf = leaf.datum();
    const datumWater = playLeaf.datum();
    datumWater.colliding = true;
    const growth = datumWater.outerRadius / this.maxRad;
    const radiusId = this.maxRad - datumWater.outerRadius;
    const durationCalibrated = this.duration * growth;
    this.noteOn(radiusId.toString(), datumLeaf.leafIdn);
    playLeaf
      .transition()
      .duration(durationCalibrated)
      .attrTween("d", this.radiusTween(this.minRad))
      .ease(this.ease)
      .on("end", (datum) => {
        datum.colliding = false;
        this.appear(leaf, playLeaf);
        this.noteOff(radiusId.toString(), datumLeaf.leafIdn);
      });
  }

  private drawCircus(path) {
    const datum = path.datum();
    const tc: IDN = datum.leafIdn;
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
        return this.arcGen(d);
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

  private playNote(freq, leafIdn: IDN) {
    const octave = this.freqToOctave(freq);
    const note = leafIdn.note + octave;

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

  private playTone(freq, leafIdn: IDN) {
    if (leafIdn && leafIdn.note) {
      this.playNote(freq, leafIdn);
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

  private noteOn(radiusId: string, leafIdn: IDN) {
    // console.debug("note on", radiusId);
    // this.noteOff(radiusId, leafIdn);
    // this.oscList[radiusId] = this.playTone(radiusId, leafIdn);
  }

  private noteOff(radiusId: string, leafIdn: IDN) {
    // const oscToOff = this.oscList[radiusId];
    // if (oscToOff) {
    // console.debug("note off", radiusId, oscToOff);
    // delete this.oscList[radiusId];
    // }
  }

  private renderCycle() {
    setInterval(() => {
      this.clearFlowers();
      this.drawFlowers();
    }, 50);
  }

  ngOnInit(): void {
    this.initFlow();
    // this.drawFlowers();
    this.renderCycle();
  }
}
