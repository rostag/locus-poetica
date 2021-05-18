import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSliderChange } from '@angular/material/slider'
import { interval, of, Subject } from 'rxjs';
import { timeInterval, takeUntil } from 'rxjs/operators';
import { generatorState, ISample } from '../generator/generator.component';

// ankursethi.in/2016/01/13/build-a-sampler-with-angular-2-webaudio-and-webmidi-lesson-1-introduction-to-the-webaudio-api

@Component({
    selector: 'app-audio',
    templateUrl: './audio.component.html',
    styleUrls: ['./audio.component.scss']
})
export class AudioComponent implements OnInit, OnDestroy {

    @Input() name = 'Audio Loop'
    @Input('audio') generatorStateAudio: any

    public sources: BufferSource[] = []
    public generatorState = generatorState
    public mainForm: FormGroup
    public loadingSample = false
    public playingSample = false
    private audioContext: AudioContext[] = []
    private audioBuffer: AudioBuffer[] = []
    private onDestroy$ = new Subject<void>()
    private _binauralFreq: number
    private _sampleFreq = 300

    public samples: ISample[] = [
        { name: 'kick' },
        { name: 'bass' },
        { name: 'speech1' },
        { name: 'speech2' },
        { name: 'minus' },
    ]

    public currentSampleName = 'kick'
    public audioInitialized: boolean
    public isOpened: boolean

    constructor() { }

    @Output('beat') audioBeat: EventEmitter<any> = new EventEmitter();

    public ngOnInit() {
        this.mainForm = new FormGroup({
            'name': new FormControl(null)
        });
        this.initAudio()
    }

    public initAudio() {
        if (this.audioInitialized) {
            return;
        }
        this.audioInitialized = true
        for (let s = 0; s < this.samples.length; s++) {
            this.loadingSample = true
            this.fetchSample(this.samples[s].name)
                .then(audioBuffer => {
                    this.loadingSample = false
                    const sample: ISample = this.getSampleByName(this.samples[s].name)
                    sample.audioBuffer = audioBuffer
                    this.audioBuffer[this.samples[s].name as any] = audioBuffer
                })
                .catch(error => {
                    throw error
                });
        }
    }

    public fetchSample(sampleName: any): Promise<AudioBuffer> {
        return fetch(`/assets/wav/${sampleName}.wav`)
            .then(response => response.arrayBuffer())
            .then(buffer => {
                return new Promise<AudioBuffer>((resolve, reject) => {
                    const sample: ISample = this.getSampleByName(sampleName)
                    sample.audioContext = new AudioContext()
                    this.audioContext[sampleName] = sample.audioContext
                    sample.audioContext.decodeAudioData(
                        buffer,
                        resolve,
                        reject
                    );
                });
            });
    }

    public stopLoop(sampleName: any) {
        this.playingSample = false;
        this.closeAudioContext(sampleName);
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
                this.audioBeat.emit(this.generatorStateAudio);
                this.playSample(sample);
            });
    }

    public playLoopOnce(name: string) {
        this.initAudio();
        of(1).pipe().subscribe(a => {
            this.audioBeat.emit(this.generatorStateAudio);
            this.playSample(name);
        });
    }

    public playSample(sampleName: any) {
        this.initAudio();
        this.playingSample = true;
        this.currentSampleName = sampleName;

        // Save buffer source to sample
        const sample: ISample = this.getSampleByName(sampleName);
        sample.bufferSource = this.audioContext[sampleName].createBufferSource();
        sample.bufferSource.buffer = this.audioBuffer[sampleName];
        sample.bufferSource.connect(this.audioContext[sampleName].destination);
        sample.bufferSource.start(0);
    }

    public setControlValue(evt: MatSliderChange) {
        this.audioBeat.emit(this.generatorStateAudio);
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

    public open() {
        this.isOpened = true;
    }

    public close(state: any) {
        state.enabled = false;
    }

    public ngOnDestroy() {
        this.generatorStateAudio.enabled = false;
        this.stopLoop('');
        this.samples.forEach(sample => this.closeAudioContext(sample.name));
    }

    private closeAudioContext(sampleName: any) {
        this.playingSample = false;
        const audioContext = this.audioContext[sampleName];
        if (audioContext) {
            audioContext.close();
        }
    }

    private getSampleByName(name: string) {
        return this.samples.find((sample: any) => sample.name === name) || { name: 'Undefined' };
    }    
}
