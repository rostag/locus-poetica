import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider'
import { interval, of, Subject } from 'rxjs';
import { timeInterval, takeUntil } from 'rxjs/operators';

// ankursethi.in/2016/01/13/build-a-sampler-with-angular-2-webaudio-and-webmidi-lesson-1-introduction-to-the-webaudio-api
export interface Sample {
    name: string;
    interval?: number; // Set duration of one
    audioContext?: AudioContext;
    audioBuffer?: AudioBuffer;
}
@Component({
    selector: 'app-audio',
    templateUrl: './audio.component.html',
    styleUrls: ['./audio.component.scss']
})
export class AudioComponent implements OnInit {

    @Input() title = 'Audio Loop';

    public loadingSample = false;
    public playingSample = false;

    private audioContext: AudioContext[] = [];
    private audioBuffer: AudioBuffer[] = [];

    private onDestroy$ = new Subject<void>();
    private _binauralFreq: number;
    private _sampleFreq = 300;

    public samples: Sample[] = [
        { name: 'kick' },
        { name: 'dsb-thinner' },
        { name: 'speech15' }
    ];
    public sampleNames = ['kick', 'dsb-thinner', 'speech15', 'speech2'];
    public currentSampleName = 'kick';
    audioInitialized: boolean;

    constructor() { }

    @Output() sequencer: EventEmitter<any> = new EventEmitter();

    public ngOnInit() {
        this.initAudio();
    }

    public initAudio() {
        if (this.audioInitialized) {
            return;
        }
        this.audioInitialized = true;
        for (let s = 0; s < this.sampleNames.length; s++) {
            this.loadingSample = true;
            this.fetchSample(this.sampleNames[s])
                .then(audioBuffer => {
                    this.loadingSample = false;
                    const sample: Sample = this.getSampleByName(this.sampleNames[s]);
                    sample.audioBuffer = audioBuffer;
                    this.audioBuffer[this.sampleNames[s] as any] = audioBuffer;
                })
                .catch(error => {
                    throw error;
                });
        }
    }

    public fetchSample(sampleName: any): Promise<AudioBuffer> {
        return fetch(`/assets/wav/${sampleName}.wav`)
            .then(response => response.arrayBuffer())
            .then(buffer => {
                return new Promise<AudioBuffer>((resolve, reject) => {
                    const sample: Sample = this.getSampleByName(this.sampleNames[sampleName]);
                    sample.audioContext = new AudioContext();
                    this.audioContext[sampleName] = sample.audioContext;
                    sample.audioContext.decodeAudioData(
                        buffer,
                        resolve,
                        reject
                    );
                });
            });
    }

    public stopLoop(sampleName: string) {
        this.playingSample = false;
        console.log('stop:', sampleName);

        this.onDestroy$.next();
    }

    public playMinus(sample: string) {
        this.initAudio();
        this.playSample('minus');
    }

    public play() {
        this.initAudio();
        this.initLoop(this.currentSampleName, this._sampleFreq);
    }

    public playLoop(sample: string) {
        this.initAudio();
        this.initLoop(sample, this._sampleFreq);
    }

    public initLoop(sample: string, time: number) {
        this.playSample(sample);
        interval(time)
            .pipe(
                timeInterval(),
                takeUntil(this.onDestroy$)
            )
            .subscribe(a => {
                this.sequencer.emit(sample);
                this.playSample(sample);
            });
    }

    public playLoopOnce(name: string) {
        this.initAudio();
        of(1).pipe().subscribe(a => {
            this.sequencer.emit(name);
            this.playSample(name);
        });
    }

    public playSample(sampleName: any) {
        this.initAudio();
        this.playingSample = true;
        this.currentSampleName = sampleName;
        const bufferSource = this.audioContext[sampleName].createBufferSource();
        bufferSource.buffer = this.audioBuffer[sampleName];
        bufferSource.connect(this.audioContext[sampleName].destination);
        bufferSource.start(0);
    }

    public setControlValue(evt: MatSliderChange) {
        this.sequencer.emit(evt);
        this._sampleFreq = evt.value as number;
    }

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
        this.stopLoop(this.currentSampleName);
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

    private getSampleByName(name: string) {
        return this.samples.find((sample: any) => sample.name === name) || { name: 'Undefined' };
    }

}
