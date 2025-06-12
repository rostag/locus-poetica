/** Ported to Angular Module from original Tonematrix implementaion
 *  by Andre Michelle in pure ts: https://andremichelle.github.io/tonematrix/
 **/

import { Component, OnInit } from "@angular/core";
import { Model } from "./tonematrix/model";
import { View } from "./tonematrix/view";
import { Audio } from "./tonematrix/audio";

@Component({
  selector: "app-tonematrix",
  templateUrl: "./tonematrix.component.html",
  styleUrls: ["./tonematrix.component.css"],
  standalone: false,
})
export class TonematrixComponent implements OnInit {
  readonly model: Model = new Model();
  readonly audio: Audio = new Audio(this.model);
  view: View;

  constructor() {}

  ngOnInit(): void {
    const canvas: HTMLCanvasElement = document.querySelector("canvas#matrix")!;
    this.view = new View(this.model, canvas);
    if (location.hash !== "") {
      this.model.pattern.deserialize(location.hash.substring(1));
    }
    (document.querySelector("button#link") as HTMLButtonElement).onclick = (
      event: MouseEvent
    ) => {
      event.preventDefault();
      navigator.clipboard.writeText(
        `https://rostag.github.io/tonematrix/#${this.model.pattern.serialize()}`
      );
    };
    (document.querySelector("button#studio") as HTMLButtonElement).onclick = (
      event: MouseEvent
    ) => {
      event.preventDefault();
      window.open(`https://www.audiotool.com/`);
    };

    // prevent dragging entire document on mobile
    document.addEventListener(
      "touchmove",
      (event: TouchEvent) => event.preventDefault(),
      { passive: false }
    );
    document.addEventListener(
      "dblclick",
      (event: Event) => event.preventDefault(),
      { passive: false }
    );
    const resize = () =>
      (document.body.style.height = `${window.innerHeight}px`);
    window.addEventListener("resize", resize);
    resize();
    requestAnimationFrame(() => {
      document
        .querySelectorAll("body svg.preloader")
        .forEach((element) => element.remove());
      document
        .querySelectorAll("body main")
        .forEach((element) => element.classList.remove("invisible"));
    });
  }
}
