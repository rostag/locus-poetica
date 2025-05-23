import {
  ToneCircusProps,
  ToneFlowerConfig,
} from "src/app/soundflow/tonecircus/tonecircus.model";

export class ToneFlower {
  private config: ToneFlowerConfig;

  constructor() {
    this.config = {
      leaves: [],
      baseRadius: 10,
      leafWidth: 10,
      cx: 10,
      cy: 10,
    };
  }

  public addCircus(toneCircus: ToneCircusProps, order?: number) {
    const leaf = {
      order: order ?? this.config.leaves.length,
      toneCircus,
    };
    this.config.leaves.push(leaf);
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
