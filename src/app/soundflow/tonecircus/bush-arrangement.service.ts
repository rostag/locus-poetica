import { Injectable, signal, WritableSignal } from "@angular/core";
import { BUSH_PRESETS, ROZP_PRESETS } from "./toneflower.constants";

const LS_MAIN_PRESET = "toneflower.bush.main.preset";
const LS_MAIN_CUSTOM = "toneflower.bush.main.custom";
const LS_ROZP_PRESET = "toneflower.bush.rozpakovka.preset";
const LS_ROZP_CUSTOM = "toneflower.bush.rozpakovka.custom";

function readPreset(key: string): number | "custom" {
  try {
    const raw = localStorage.getItem(key);
    if (raw === "custom") return "custom";
    const n = parseInt(raw ?? "", 10);
    if (!isNaN(n) && n >= 0 && n <= 4) return n;
  } catch {}
  return 0;
}

function readCustom(key: string, expectedLen: number): [number, number][] | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (
      Array.isArray(parsed) &&
      parsed.length === expectedLen &&
      parsed.every((p: unknown) => Array.isArray(p) && p.length === 2)
    ) {
      return parsed as [number, number][];
    }
  } catch {}
  return null;
}

@Injectable({ providedIn: "root" })
export class BushArrangementService {
  readonly mainPreset: WritableSignal<number | "custom">;
  readonly mainCustomPositions: WritableSignal<[number, number][]>;
  readonly rozpakovkaPreset: WritableSignal<number | "custom">;
  readonly rozpakovkaCustomPositions: WritableSignal<[number, number][]>;

  constructor() {
    const savedMainPreset = readPreset(LS_MAIN_PRESET);
    const savedRozpPreset = readPreset(LS_ROZP_PRESET);

    const defaultMainCustom = BUSH_PRESETS[0].points.map(
      (p) => [p[0], p[1]] as [number, number],
    );
    const defaultRozpCustom = ROZP_PRESETS[0].points.map(
      (p) => [p[0], p[1]] as [number, number],
    );

    const savedMainCustom = readCustom(LS_MAIN_CUSTOM, 3) ?? defaultMainCustom;
    const savedRozpCustom = readCustom(LS_ROZP_CUSTOM, 4) ?? defaultRozpCustom;

    if (!readCustom(LS_MAIN_CUSTOM, 3)) {
      localStorage.removeItem(LS_MAIN_CUSTOM);
    }
    if (!readCustom(LS_ROZP_CUSTOM, 4)) {
      localStorage.removeItem(LS_ROZP_CUSTOM);
    }

    this.mainPreset = signal(savedMainPreset);
    this.mainCustomPositions = signal(savedMainCustom);
    this.rozpakovkaPreset = signal(savedRozpPreset);
    this.rozpakovkaCustomPositions = signal(savedRozpCustom);
  }

  positionsForFlower(bushId: "main" | "rozpakovka", index: number): [number, number] {
    if (bushId === "main") {
      const preset = this.mainPreset();
      if (preset === "custom") return this.mainCustomPositions()[index] ?? [125, 150];
      return BUSH_PRESETS[preset].points[index] ?? [125, 150];
    } else {
      const preset = this.rozpakovkaPreset();
      if (preset === "custom") return this.rozpakovkaCustomPositions()[index] ?? [125, 150];
      return ROZP_PRESETS[preset].points[index] ?? [125, 150];
    }
  }

  selectPreset(bushId: "main" | "rozpakovka", n: number): void {
    if (bushId === "main") {
      this.mainPreset.set(n);
      localStorage.setItem(LS_MAIN_PRESET, String(n));
    } else {
      this.rozpakovkaPreset.set(n);
      localStorage.setItem(LS_ROZP_PRESET, String(n));
    }
  }

  activateCustomMode(bushId: "main" | "rozpakovka"): void {
    if (bushId === "main") {
      this.mainPreset.set("custom");
      localStorage.setItem(LS_MAIN_PRESET, "custom");
    } else {
      this.rozpakovkaPreset.set("custom");
      localStorage.setItem(LS_ROZP_PRESET, "custom");
    }
  }

  saveCustomPositions(bushId: "main" | "rozpakovka"): void {
    if (bushId === "main") {
      localStorage.setItem(LS_MAIN_CUSTOM, JSON.stringify(this.mainCustomPositions()));
    } else {
      localStorage.setItem(LS_ROZP_CUSTOM, JSON.stringify(this.rozpakovkaCustomPositions()));
    }
  }

  isCustom(bushId: "main" | "rozpakovka"): boolean {
    return bushId === "main"
      ? this.mainPreset() === "custom"
      : this.rozpakovkaPreset() === "custom";
  }
}
