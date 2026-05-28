import { Component, inject, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ArcHoverInfo } from "src/app/soundflow/tonecircus/toneflower.constants";
import { ToneflowerI18nService } from "src/app/soundflow/tonecircus/toneflower-i18n.service";

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
  private i18n = inject(ToneflowerI18nService);

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

  get panelInfoLabel(): string {
    return this.i18n.strings().panelInfoLabel;
  }

  get introText(): string {
    return this.i18n.strings().intro;
  }

  get labelKolir(): string {
    return this.i18n.strings().labelKolir;
  }

  get labelCyslo(): string {
    return this.i18n.strings().labelCyslo;
  }

  get labelPjednannja(): string {
    return this.i18n.strings().labelPjednannja;
  }

  get colorData() {
    return this.activeInfo
      ? this.i18n.strings().colors[this.activeInfo.colorOrdinal]
      : null;
  }

  get numberData() {
    return this.activeInfo
      ? this.i18n.strings().numbers[this.activeInfo.leafNum]
      : null;
  }

  get comboTitle(): string | null {
    if (!this.activeInfo) return null;
    return `${this.activeInfo.colorOrdinal}-${this.activeInfo.leafNum}`;
  }

  get comboText(): string | null {
    if (!this.activeInfo) return null;
    return (
      this.i18n
        .strings()
        .combos[
          `${this.activeInfo.colorOrdinal}_${this.activeInfo.leafNum}`
        ] ?? null
    );
  }
}
