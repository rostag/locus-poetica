// D3.js, ReactJS TS - https://medium.com/@prncher/a-visual-experience-of-sampling-data-using-d3-js-reactjs-and-typescript-43b3bb603c3c
// Visualizing Sound With D3 and Web Audio API - https://medium.com/swlh/visualizing-sound-with-d3-and-web-audio-api-435ffea88f30
// Collide force - https://d3js.org/d3-force/collide
// PIE - padAngle: https://observablehq.com/@d3/arc-pad-angle

import { Component, inject, OnInit, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatSliderModule } from "@angular/material/slider";

import { RouterModule } from "@angular/router";
import * as d3 from "d3";
import { AbetkaComponent } from "src/app/soundflow/tonecircus/abetka/abetka.component";
import { ArrangementPresetsComponent } from "src/app/soundflow/tonecircus/arrangement-presets/arrangement-presets.component";
import { ArcInfoPanelComponent } from "src/app/soundflow/tonecircus/arc-info-panel/arc-info-panel.component";
import { BushArrangementService } from "src/app/soundflow/tonecircus/bush-arrangement.service";
import { GetOrdinalComponent } from "src/app/soundflow/tonecircus/get-ordinal/get-ordinal.component";
import { ToneFlower } from "src/app/soundflow/tonecircus/toneflower.class";
import {
  ArcHoverInfo,
  BUSH_LOC,
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
import { IdnListComponent } from "./idn-list/idn-list.component";
import { MatButtonModule } from "@angular/material/button";

type OscItem = {
  [index: number]: OscillatorNode;
};

@Component({
  selector: "app-tonecircus",
  imports: [
    RouterModule,
    MatSliderModule,
    MatButtonModule,
    FormsModule,
    AbetkaComponent,
    GetOrdinalComponent,
    IdnListComponent,
    ArrangementPresetsComponent,
    ArcInfoPanelComponent,
  ],
  templateUrl: "./toneflower.component.html",
  styleUrl: "./toneflower.component.css",
  standalone: true,
})
export class ToneFlowerComponent implements OnInit {
  // TODO Unblock to set IDN colors etc
  public showSettings = true;

  protected arrangementService = inject(BushArrangementService);

  hoveredArc = signal<ArcHoverInfo | null>(null);
  clickedArc = signal<ArcHoverInfo | null>(null);

  private playFlower: ToneFlower;

  private margin = 50;
  private width = 350 - this.margin * 2;
  private height = 500 - this.margin * 2;

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

  setPadAngle(evt: any) {
    this.padAngle = parseFloat(evt.target.value) || 0.01;
  }

  private flowers: ToneFlower[] = [];

  private bush: BushModel;

  private rozpSvgr: any;
  private rozpArcs = [];
  private rozpFlowers: ToneFlower[] = [];
  private rozpBush?: BushModel;

  public clearFlowers() {
    this.svgr.selectAll("*").remove();

    this.flowers.forEach((flower) => {
      flower.burn();
    });

    this.arcs = [];
    this.clearRozpFlowers();
  }

  public redrawBush() {
    this.clearFlowers();
    this.drawFlowers();
    if (this.rozpBush) {
      this.drawRozpBush(this.rozpBush);
    }
  }

  private drawBush() {
    const bush: BushModel = this.bush;
    bush.flowers.map((flowerModel, i) => {
      const flower = new ToneFlower();
      this.flowers.push(flower);
      flower.seed(flowerModel);
      this.drawFlower(flower, i);
    });
  }

  private drawFlowers() {
    this.playFlower = new ToneFlower();
    this.playFlower.cx = 150;
    this.playFlower.cy = 230;
    this.playFlower.seed(PLAY_BUSH.flowers[0]);

    this.drawBush();
  }

  updateBush(bush: BushModel) {
    this.bush = bush;
    this.drawBush();
    this.redrawBush();
  }

  public clearRozpFlowers() {
    if (this.rozpSvgr) {
      this.rozpSvgr.selectAll("*").remove();
    }
    this.rozpFlowers.forEach((flower) => {
      flower.burn();
    });
    this.rozpFlowers = [];
    this.rozpArcs = [];
  }

  private drawRozpBush(bush: BushModel) {
    bush.flowers.map((flowerModel, i) => {
      const flower = new ToneFlower();
      this.rozpFlowers.push(flower);
      flower.seed(flowerModel);
      this.drawFlowerInSvg(
        this.rozpSvgr,
        this.rozpArcs,
        flower,
        i,
        "rozpakovka",
      );
    });
  }

  updateRozpakovkaBush(bush: BushModel) {
    this.rozpBush = bush;
    this.clearRozpFlowers();
    this.drawRozpBush(bush);
  }

  private drawFlower(flower: ToneFlower, flowerIndex: number) {
    this.drawFlowerInSvg(this.svgr, this.arcs, flower, flowerIndex, "main");
  }

  private drawFlowerInSvg(
    svgTarget: any,
    arcsTarget: any[],
    flower: ToneFlower,
    flowerIndex = -1,
    bushId: "main" | "rozpakovka" | null = null,
  ) {
    const flowerGroup = svgTarget.append("g").attr("class", "flower-group");

    flower.leaves.forEach((leaf, index) => {
      const centerX = flower.cx;
      const centerY = flower.cy;
      const radius = flower.baseRadius + flower.leafWidth * index;
      this.addArc(
        flowerGroup,
        arcsTarget,
        centerX,
        centerY,
        index === 0 ? 0 : radius,
        radius + flower.leafWidth,
        leaf,
        true,
      );
    });

    if (
      bushId &&
      flowerIndex >= 0 &&
      this.arrangementService.isCustom(bushId)
    ) {
      flowerGroup.style("cursor", "grab");
      this.attachFlowerDrag(flowerGroup, flower, flowerIndex, bushId);
    }
  }

  private attachFlowerDrag(
    flowerGroup: any,
    flower: ToneFlower,
    flowerIndex: number,
    bushId: "main" | "rozpakovka",
  ) {
    const svgW = this.width;
    const svgH = this.height;
    const svc = this.arrangementService;

    flowerGroup
      .append("circle")
      .attr("class", "drag-handle")
      .attr("cx", flower.cx)
      .attr("cy", flower.cy)
      .attr("r", 16)
      .attr("fill", "transparent")
      .attr("stroke", "rgba(255,255,255,0.4)")
      .attr("stroke-width", "1.5")
      .attr("cursor", "grab");

    let startX = 0;
    let startY = 0;
    let currentDx = 0;
    let currentDy = 0;

    flowerGroup.call(
      d3
        .drag()
        .on("start", (event: any) => {
          startX = event.x;
          startY = event.y;
          currentDx = 0;
          currentDy = 0;
          flowerGroup.style("cursor", "grabbing");
        })
        .on("drag", (event: any) => {
          currentDx = Math.max(
            -flower.cx,
            Math.min(svgW - flower.cx, event.x - startX),
          );
          currentDy = Math.max(
            -flower.cy,
            Math.min(svgH - flower.cy, event.y - startY),
          );
          flowerGroup.attr("transform", `translate(${currentDx},${currentDy})`);
        })
        .on("end", () => {
          const newX = flower.cx + currentDx;
          const newY = flower.cy + currentDy - this.bushMarginTop;
          if (bushId === "main") {
            svc.mainCustomPositions.update((positions) => {
              const updated: [number, number][] = [...positions];
              updated[flowerIndex] = [newX, newY];
              return updated;
            });
          } else {
            svc.rozpakovkaCustomPositions.update((positions) => {
              const updated: [number, number][] = [...positions];
              updated[flowerIndex] = [newX, newY];
              return updated;
            });
          }
          svc.saveCustomPositions(bushId);
          flowerGroup.style("cursor", "grab");
        }),
    );
  }

  private showPadLine = false;
  public toggleLine() {
    this.showPadLine = !this.showPadLine;
    this.redrawBush();
  }

  public padAngleBgStyle = 0; // 1, 2
  public toggleBgStyle = () => {
    this.padAngleBgStyle =
      this.padAngleBgStyle > 1 ? 0 : this.padAngleBgStyle + 1;
    this.redrawBush();
  };

  showChyslo = false;
  toggleChyslo() {
    this.showChyslo = !this.showChyslo;
    this.padAngleBgStyle = 0;
    this.redrawBush();
  }

  // move to setting
  bushMarginTop = BUSH_LOC.marginTop();
  setBushMarginTop(evt: any) {
    this.bushMarginTop = parseFloat(evt.target.value);
    BUSH_LOC.marginTop.set(this.bushMarginTop);
    console.log(BUSH_LOC.marginTop());

    this.redrawBush();
  }

  private getSectionData = (leafModel: LeafModel) => {
    const assignedNumber = leafModel.leafNum;
    const sections = new Array(assignedNumber);
    const s = 360 / assignedNumber;
    sections.fill(s, 0, assignedNumber);
    return sections;
  };

  private drawPie(
    svgTarget: any,
    arcs,
    x: number,
    y: number,
    innerRadius: number,
    outerRadius: number,
    leafModel: LeafModel,
    isLeaf = false,
  ) {
    const data = this.getSectionData(leafModel);

    // const padAngle = (12 - data.length) * this.padAngle; // 36 / ;
    const padAngle = this.padAngle; // 36 / ;
    const pie2 = d3.pie().padAngle(padAngle); // adjusted pad angle (good)
    const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);

    const g = svgTarget
      .append("g")
      .selectAll("g")
      .data(() => [pie2(data)])
      .join("g")
      .attr("fill", (d, i) => [leafModel.leafIdn?.colorHex])
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
    if (!leafModel || !leafModel.leafIdn) {
      return "#fff";
    }
    switch (this.padAngleBgStyle) {
      case 0:
        return leafModel.leafIdn.colorHex;
      case 1:
        return "#B7B9B4"; // bily
      default:
        return "#000";
    }
  };

  private addArc(
    svgTarget: any,
    arcs,
    x: number,
    y: number,
    innerRadius: number,
    outerRadius: number,
    leafModel: LeafModel,
    isLeaf = false,
  ) {
    const arcX = x,
      arcY = y;
    const g = svgTarget
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
      .attr("d", this.arcGen)
      .on("mouseover", () => {
        arcPath.style("stroke", "#ffffff").style("stroke-width", "1px");
        this.hoveredArc.set({
          colorOrdinal: leafModel.leafIdn.ordinal,
          leafNum: leafModel.leafNum,
          colorHex: leafModel.leafIdn.colorHex,
        });
      })
      .on("mouseleave", () => {
        arcPath.style("stroke", null).style("stroke-width", null);
        this.hoveredArc.set(null);
      })
      .on("click", (event: any) => {
        // event.stopPropagation();
        arcPath.style("stroke", "#ffffff").style("stroke-width", "1px");
        this.clickedArc.set({
          colorOrdinal: leafModel.leafIdn.ordinal,
          leafNum: leafModel.leafNum,
          colorHex: leafModel.leafIdn.colorHex,
        });
      });

    if (this.showChyslo) {
      this.drawPie(
        svgTarget,
        arcs,
        x,
        y,
        innerRadius,
        outerRadius,
        leafModel,
        isLeaf,
      );
    }
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
      .select("#bushwrap")
      .append("svg")
      .attr("class", "bush-wrap")
      .attr("viewBox", [0, 0, this.width, this.height]);

    this.rozpSvgr = d3
      .select("#rozpakovka-bushwrap")
      .append("svg")
      .attr("class", "bush-wrap")
      .attr("viewBox", [0, 0, this.width, this.height]);

    this.svgr.on("click", (event) => {
      // this.clickedArc.set(null);
      if (!this.audioStarted) {
        (async () => {
          await Tone.start();
          console.log("audio is ready");
          this.audioStarted = true;
        })();
      }
      var e = d3.pointer(event);
      this.addArc(
        this.svgr,
        this.arcs,
        e[0],
        e[1],
        this.innRad,
        this.outRad,
        this.playFlower.leaves[0],
        false,
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
      path.style("stroke", datum.colliding === true ? tc?.color : "#eee");
      path.style("fill", "none");
    }
  }

  // Returns a tween for a transition’s "d" attribute, transitioning any selected arcs
  private radiusTween(newRadius) {
    return (d) => {
      const interpolateInner = d3.interpolate(
        d.innerRadius,
        newRadius - this.th,
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
      freq,
    );
    let attTime = this.range(
      { min: 1, max: this.maxRad },
      { min: 0.1, max: 0.01 },
      freq,
    );
    let relTime = this.range(
      { min: 1, max: this.maxRad },
      { min: 1, max: 0.01 },
      freq,
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

  // private renderCycle() {
  //   setInterval(() => {
  //     this.clearFlowers();
  //     this.drawFlowers();
  //   }, 50);
  // }

  ngOnInit(): void {
    this.initFlow();
    this.drawFlowers();
    // this.renderCycle();
  }
}
