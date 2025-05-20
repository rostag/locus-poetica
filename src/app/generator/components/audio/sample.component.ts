import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
// import { MatLegacySliderChange as MatSliderChange } from '@angular/material/legacy-slider'
import { interval, Subject } from "rxjs";
import { timeInterval, takeUntil } from "rxjs/operators";
import { ISample } from "../generator/generator.component";

// ankursethi.in/2016/01/13/build-a-sampler-with-angular-2-webaudio-and-webmidi-lesson-1-introduction-to-the-webaudio-api

@Component({
    selector: "app-sample",
    templateUrl: "./sample.component.html",
    styleUrls: ["./sample.component.scss"],
    standalone: false
})
export class SampleComponent implements OnInit {
  @Input() set sample(value: ISample) {
    this.sample = value;
  }

  public loadingSample = false;
  public audioInitialized: boolean;

  private audioContext: AudioContext;
  private audioBuffer: AudioBuffer;

  private onDestroy$ = new Subject<void>();
  private _binauralFreq: number;
  private _sampleFreq = 300;

  public currentSample: string;

  constructor() {}

  @Output() sequencer: EventEmitter<any> = new EventEmitter();

  public ngOnInit() {}

  public initAudio() {
    if (this.audioInitialized) {
      return;
    }
    this.audioInitialized = true;
  }

  public stopLoop(loopName: string) {
    this.onDestroy$.next();
  }

  public playMinus(sample: string) {
    this.initAudio();
    this.playSample("minus");
  }

  public playLoop(sample: string) {
    this.initAudio();
    this.initLoop(sample, this._sampleFreq);
  }

  public initLoop(sample: string, time: number) {
    interval(time)
      .pipe(timeInterval(), takeUntil(this.onDestroy$))
      .subscribe((a) => {
        this.sequencer.emit(sample);
        this.playSample(sample || this.currentSample);
      });
  }

  public playSample(loopName: any) {
    const bufferSource = this.audioContext.createBufferSource();
    bufferSource.buffer = this.audioBuffer;
    bufferSource.connect(this.audioContext.destination);
    bufferSource.start(0);
  }

  public setControlValue(evt: any) {
    this.sequencer.emit(evt);
    this._sampleFreq = evt.value as number;
  }
  // public setControlValue(evt: MatSliderChange) {
  //   this.sequencer.emit(evt);
  //   this._sampleFreq = evt.value as number;
  // }

  public y(x: number) {
    return Math.round(Math.exp(x));
  }

  public r(r: number) {
    const a = Math.random() * r;
    return Math.round(a * a + a);
  }

  /******
   * Try Hz:
   * 34
   * 94
   * 102
   * 253
   * -264
   * -302
   * -364
   * 404
   ******/

  public playBinaural(sample: string, baze: number, hz: number) {
    this.stopLoop(this.currentSample);
    this._binauralFreq = baze;
    this.initLoop(sample, baze);
    this.initLoop(sample, baze + hz);
  }

  public get binauralFreq() {
    return this._binauralFreq;
  }

  public get sampleFreq() {
    return this._sampleFreq;
  }
}
