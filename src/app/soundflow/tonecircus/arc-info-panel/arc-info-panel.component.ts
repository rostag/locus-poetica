import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  ArcHoverInfo,
  COLOR_INFO,
  NUMBER_INFO,
  COMBO_INFO,
} from "src/app/soundflow/tonecircus/toneflower.constants";

function contrastColor(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.55 ? "#1a1a2e" : "#ffffff";
}

@Component({
  selector: "app-arc-info-panel",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./arc-info-panel.component.html",
  styleUrl: "./arc-info-panel.component.css",
})
export class ArcInfoPanelComponent {
  @Input() info: ArcHoverInfo | null = null;
  @Input() clickedInfo: ArcHoverInfo | null = null;

  get activeInfo(): ArcHoverInfo | null {
    return this.clickedInfo ?? this.info;
  }

  get arcColor(): string | null {
    return this.activeInfo?.colorHex ?? null;
  }

  contrastColor(hex: string): string {
    return contrastColor(hex);
  }

  get colorData() {
    return this.activeInfo ? COLOR_INFO[this.activeInfo.colorOrdinal] : null;
  }

  get numberData() {
    return this.activeInfo ? NUMBER_INFO[this.activeInfo.leafNum] : null;
  }

  get comboTitle(): string | null {
    if (!this.activeInfo) return null;
    const pre = `${this.activeInfo.colorOrdinal}-${this.activeInfo.leafNum}`;
    return pre ?? null;
  }
  get comboText(): string | null {
    if (!this.activeInfo) return null;
    const combo =
      COMBO_INFO[`${this.activeInfo.colorOrdinal}_${this.activeInfo.leafNum}`];
    return combo ?? null;
  }
}
