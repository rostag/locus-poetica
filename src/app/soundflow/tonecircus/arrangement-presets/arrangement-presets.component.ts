import { Component, Input, inject } from "@angular/core";
import { BushArrangementService } from "../bush-arrangement.service";
import { BUSH_PRESETS, ROZP_PRESETS } from "../toneflower.constants";

const SVG_W = 250;
const SVG_H = 290;
const THUMB = 36;
const PAD = 4;

function toThumb(x: number, y: number): { cx: number; cy: number } {
  return {
    cx: PAD + (x / SVG_W) * THUMB,
    cy: PAD + (y / SVG_H) * THUMB,
  };
}

@Component({
  selector: "app-arrangement-presets",
  standalone: true,
  imports: [],
  templateUrl: "./arrangement-presets.component.html",
  styleUrl: "./arrangement-presets.component.css",
})
export class ArrangementPresetsComponent {
  @Input() bushId: "main" | "rozpakovka" = "main";

  protected svc = inject(BushArrangementService);

  get presets() {
    return this.bushId === "main" ? BUSH_PRESETS : ROZP_PRESETS;
  }

  get activePreset(): number | "custom" {
    return this.bushId === "main"
      ? this.svc.mainPreset()
      : this.svc.rozpakovkaPreset();
  }

  thumbnailDots(points: [number, number][]) {
    return points.map(([x, y]) => toThumb(x, y));
  }

  selectPreset(n: number) {
    this.svc.selectPreset(this.bushId, n);
  }

  activateCustom() {
    this.svc.activateCustomMode(this.bushId);
  }
}
