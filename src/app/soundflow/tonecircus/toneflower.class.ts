import {
  IDLEAVES,
  ToneFlowerModel,
} from "src/app/soundflow/tonecircus/toneflower.model";

export class ToneFlower {
  private config: ToneFlowerModel;

  constructor() {
    this.config = {
      leaves: [],
      baseRadius: 10,
      leafWidth: 10,
      cx: 10,
      cy: 10,
    };
  }

  public seed(leaveIds: number[], place: number[]) {
    this.cx = place[0];
    this.cy = place[1];

    const buttId = this.getCenterColor(leaveIds);
    this.addLeaf(buttId);

    leaveIds.map((leafId) => this.addLeaf(leafId));
  }

  public addLeaf(leafId: number) {
    const leaf = {
      order: this.config.leaves.length,
      toneCircus: IDLEAVES.find((preset) => preset.num === leafId)!,
    };

    this.config.leaves.push(leaf);
  }

  /**
    Jak rahujetcja kolo vseredyni

    1. Skladaju čysla po koljorah jaki vyjšly (ti, ščo smugy) i vidnimaju 12, poky ne otrymaju čyslo vid 1 do 12 – ce bude kolir centru

    2. Nyžnje kolo (try blakytnyh i zolotyj): 
    6+6+6+9=27. 27-12=15. 15-12=3. 
    3 – pomarančevyj centr

    3. Serednje kolo (červonyj, sribnyj, perlynovyj):
    2+11+10=23. 23-12=11.
    11 – sribnyj centr

    4. Verhnje kolo (fioletovyj, zelenyj, čornyj):
    8+5+1=14. 14-12=2
    2 – červonyj centr
  */
  public getCenterColor(leaveIds: number[]) {
    const sum = leaveIds.reduce((acc, leaf) => {
      return acc + leaf;
    }, 0);
    const centerId = sum % 12;
    console.log("get c", sum, leaveIds, centerId);
    return centerId;
  }

  public get leaves() {
    return this.config.leaves;
  }

  public get baseRadius() {
    return this.config.baseRadius;
  }

  public get leafWidth() {
    return this.config.leafWidth;
  }

  public get cx() {
    return this.config.cx;
  }

  public get cy() {
    return this.config.cy;
  }

  public set cx(value: number) {
    this.config.cx = value;
  }

  public set cy(value: number) {
    this.config.cy = value;
  }
}
