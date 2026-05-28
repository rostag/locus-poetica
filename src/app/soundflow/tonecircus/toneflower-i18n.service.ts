import { Injectable, signal } from "@angular/core";
import { TRANSLATIONS, ToneflowerStrings } from "./toneflower-translations";

@Injectable({ providedIn: "root" })
export class ToneflowerI18nService {
  private static readonly STORAGE_KEY = "toneflower-lang";

  readonly currentLang = signal<"uk" | "lat">(
    (localStorage.getItem(ToneflowerI18nService.STORAGE_KEY) as
      | "uk"
      | "lat") ?? "lat",
  );

  toggle(): void {
    const next = this.currentLang() === "lat" ? "uk" : "lat";
    this.currentLang.set(next);
    localStorage.setItem(ToneflowerI18nService.STORAGE_KEY, next);
  }

  strings(): ToneflowerStrings {
    return TRANSLATIONS[this.currentLang()];
  }
}
