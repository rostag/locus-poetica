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
   * [VARIANT — inactive] Alternative center (jadro) color calculation.
   *
   * Spec: openspec/changes/tonecircus-numerology-rules/design.md — Risks / Trade-offs, Open Questions
   *
   * Sums the ordinals of all leaf colors that appeared in a ring (the "stripes")
   * and subtracts 12 repeatedly until a number in 1..12 remains — that ordinal
   * is the center color.
   *
   * Worked examples (from the original numerological method):
   *   - Lower flower (3× blakytnyj + zolotyj): 6+6+6+9 = 27 → 27-12=15 → 15-12=3 → pomarančevyj
   *   - Middle flower (červonyj + sribnyj + perlynovyj): 2+11+10 = 23 → 23-12=11 → sribnyj
   *   - Upper flower (fioletovyj + zelenyj + čornyj): 8+5+1 = 14 → 14-12=2 → červonyj
   *
   * This is mathematically equivalent to `sum % 12 || 12` — the same reduction
   * used by `ordinalByNumber` for the active jadro calculation.
   *
   * TODO: This variant could eventually replace the current `% 12` jadro
   * calculation in `GetOrdinalComponent`/`SlovoComponent` once the two
   * approaches are confirmed equivalent across all alphabets and inputs.
   * Kept here as a reference variant; see design.md "Open Questions".
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
