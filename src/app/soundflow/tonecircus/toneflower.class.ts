import {
  LEAF_IDNS,
  LeafModel,
  ToneFlowerModel,
} from "src/app/soundflow/tonecircus/toneflower.model";

export class ToneFlower {
  private model: ToneFlowerModel;

  constructor() {
    this.model = {
      leaves: [],
      baseRadius: 10,
      leafWidth: 10,
      cx: 10,
      cy: 10,
    };
  }

  private addLeaf(leafId: number) {
    const leaf: LeafModel = {
      leafOrder: this.model.leaves.length,
      leafIdn: LEAF_IDNS.find((preset) => preset.num === leafId)!,
      assignedNumber: Math.round(Math.random() * 12),
    };

    this.model.leaves.push(leaf);
  }

  public seed(leaveIds: number[], place: number[]) {
    this.cx = place[0];
    this.cy = place[1];

    const buttId = this.getCenterColor(leaveIds);
    this.addLeaf(buttId);

    leaveIds.map((leafId) => this.addLeaf(leafId));
  }

  public burn() {
    this.model.leaves = [];
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
    return this.model.leaves;
  }

  public get baseRadius() {
    return this.model.baseRadius;
  }

  public get leafWidth() {
    return this.model.leafWidth;
  }

  public get cx() {
    return this.model.cx;
  }

  public get cy() {
    return this.model.cy;
  }

  public set cx(value: number) {
    this.model.cx = value;
  }

  public set cy(value: number) {
    this.model.cy = value;
  }
}
