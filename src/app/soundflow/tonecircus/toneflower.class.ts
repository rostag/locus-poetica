import { IC, IDNS } from "src/app/soundflow/tonecircus/toneflower.constants";
import {
  LeafModel,
  FlowerModel,
} from "src/app/soundflow/tonecircus/toneflower.model";

export class ToneFlower {
  private model: FlowerModel;

  constructor() {
    this.model = {
      leaves: [],
      buttSize: IC.flowerButtSize,
      leafWidth: IC.flowerLeafWidth,
      flowerX: 10,
      flowerY: 10,
    };
  }

  private addLeaf(leaf: LeafModel) {
    this.model.leaves.push(leaf);
  }

  public seed(flowerModel: FlowerModel) {
    this.cx = flowerModel.flowerX;
    this.cy = flowerModel.flowerY;

    // const buttId = this.getButtColor(flowerIdns);
    // this.addLeaf(buttId[1]);

    flowerModel.leaves.map((leaf) => this.addLeaf(leaf));
  }

  public burn() {
    this.model.leaves = [];
  }

  /**
    Jak rahujetcja kolo vseredyni

    1. Skladaju čysla po koljorah jaki vyjšly (ti, ščo smugy) i vidnimaju 12, poky ne otrymaju čyslo vid 1 do 12 – ce bude kolir centru

    2. Nyžnje kolo (try blakytnyh i zolotyj): 
      6 + 6 + 6 + 9 = 27. 27 - 12 = 15. 15 - 12 = 3. 
      3 – pomarančevyj centr

    3. Serednje kolo (červonyj, sribnyj, perlynovyj):
      2 + 11 + 10 = 23. 23 - 12 = 11.
      11 – sribnyj centr

    4. Verhnje kolo (fioletovyj, zelenyj, čornyj):
      8 + 5 + 1 = 14. 14 - 12 = 2
      2 – červonyj centr
  */

  // public getButtColor(leaveIds: number[][]) {
  //   const sum = leaveIds
  //     .map((leaf) => leaf[0])
  //     .reduce((acc, leaf) => {
  //       return acc + leaf;
  //     }, 0);
  //   const centerId = sum % 12;
  //   console.log("get c", sum, leaveIds, centerId);
  //   return centerId;
  // }

  public get leaves() {
    return this.model.leaves;
  }

  public get baseRadius() {
    return this.model.buttSize;
  }

  public get leafWidth() {
    return this.model.leafWidth;
  }

  public get cx() {
    return this.model.flowerX;
  }

  public get cy() {
    return this.model.flowerY;
  }

  public set cx(value: number) {
    this.model.flowerX = value;
  }

  public set cy(value: number) {
    this.model.flowerY = value;
  }
}
