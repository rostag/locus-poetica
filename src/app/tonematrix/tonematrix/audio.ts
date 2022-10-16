import {matrixSize, Model} from "./model"

const mSize = matrixSize;
const xLimit = mSize - 1;

const BPM = 120.0;

const midiToFrequency = (note: number): number => {
    return 440.0 * Math.pow(2.0, (note + 3.0) / 12.0 - 6.0)
}

export class Audio {
    static LOOK_AHEAD_TIME = 0.010
    static SCHEDULE_TIME = 0.010
    static ADDITIONAL_LATENCY = 0.005
    static SEMIQUAVER = 1.0 / 16.0
    static RELEASE_TIME = 0.250
    static VOICE_GAIN = 1
    static NOTESONE = new Float32Array([
        midiToFrequency(96),
        midiToFrequency(93),
        midiToFrequency(91),
        midiToFrequency(89),
        midiToFrequency(86),
        midiToFrequency(84),
        midiToFrequency(81),
        midiToFrequency(79),
        midiToFrequency(77),
        midiToFrequency(74),
        midiToFrequency(72),
        midiToFrequency(69),
        midiToFrequency(67),
        midiToFrequency(65),
        midiToFrequency(62),
        midiToFrequency(60),
        //
        midiToFrequency(59),
        midiToFrequency(58),
        midiToFrequency(57),
        midiToFrequency(56),
        midiToFrequency(55),
        midiToFrequency(54),
        midiToFrequency(53),
        midiToFrequency(52),
        midiToFrequency(51),
        midiToFrequency(50),
        midiToFrequency(49),
        midiToFrequency(48),
        midiToFrequency(47),
        midiToFrequency(46),
        midiToFrequency(45),
        midiToFrequency(44),
    ])
    static SEMITONES = new Float32Array(mSize);

    static NOTES = Audio.SEMITONES;

    private readonly context = new AudioContext()
    private readonly voiceMix: GainNode = this.context.createGain()

    private nextScheduleTime: number = 0.0
    private absoluteTime: number = 0.0
    private intervalId: number = -1
    private bpm: number = BPM;

    constructor(private readonly model: Model) {

        for (let i = 0; i <= mSize; i++) {
            Audio.SEMITONES[mSize - i] = midiToFrequency(i + 60)
        }

        this.buildFxChain()

        if (this.context.state === "running") {
            this.start()
        } else {
            const toast = document.querySelector("div.enabled-audio") as HTMLElement
            toast.style.visibility = "visible"
            const options = {capture: true}
            const listener = event => {
                toast.style.visibility = "hidden"
                event.preventDefault()
                this.context.resume().then(() => this.start())
                window.removeEventListener("mousedown", listener, options)
                window.removeEventListener("touchstart", listener, options)
            }
            window.addEventListener("mousedown", listener, options)
            window.addEventListener("touchstart", listener, options)
        }
    }

    start(): void {
        if (-1 < this.intervalId) {
            return
        }
        this.absoluteTime = 0.0
        this.nextScheduleTime = this.context.currentTime + Audio.LOOK_AHEAD_TIME
        this.intervalId = setInterval(() => {
            const now = this.context.currentTime
            if (now + Audio.LOOK_AHEAD_TIME >= this.nextScheduleTime) {
                const m0 = this.absoluteTime
                const m1 = m0 + Audio.SCHEDULE_TIME
                const t0 = this.secondsToBars(m0)
                const t1 = this.secondsToBars(m1)
                this.schedule(t0, t1)
                this.absoluteTime += Audio.SCHEDULE_TIME
                this.nextScheduleTime += Audio.SCHEDULE_TIME
            }
        }, 1) as unknown as number;
    }

    stop(): void {
        this.pause()
        this.absoluteTime = 0.0
    }

    pause(): void {
        if (-1 === this.intervalId) {
            return
        }
        clearInterval(this.intervalId)
        this.intervalId = -1
    }

    private schedule(t0: number, t1: number): void {
        let index = (t0 / Audio.SEMIQUAVER) | 0
        if (index < 0) {
            return
        }
        let barPosition = index * Audio.SEMIQUAVER
        while (barPosition < t1) {
            if (barPosition >= t0) {
                const time = this.computeStartOffset(barPosition)
                const x = index & xLimit
                for (let y = 0; y < matrixSize; y++) {
                    if (this.model.pattern.getStep(x, y)) {
                        this.playVoice(time, y)
                    }
                }
            }
            barPosition = ++index * Audio.SEMIQUAVER
        }
        const bars = this.secondsToBars(this.absoluteTime + Audio.SCHEDULE_TIME)
        this.model.stepIndex = (Math.floor(bars / Audio.SEMIQUAVER) - 1) & xLimit
    }

    private computeStartOffset(barPosition: number): number {
        return (this.nextScheduleTime - this.absoluteTime) +
            this.barsToSeconds(barPosition) + Audio.ADDITIONAL_LATENCY
    }

    private barsToSeconds(bars: number): number {
        return bars * 240.0 / this.bpm
    }

    private secondsToBars(seconds: number): number {
        return seconds * this.bpm / 240.0
    }

    private playVoice(time: number, rowIndex: number): void {
        const context: AudioContext = this.context
        const endTime: number = time + Audio.RELEASE_TIME
        const oscillator: OscillatorNode = context.createOscillator()
        const envelope: GainNode = context.createGain()
        const panner: StereoPannerNode = context.createStereoPanner()
        panner.pan.value = Math.random() - Math.random()
        envelope.gain.value = Audio.VOICE_GAIN
        envelope.gain.setValueAtTime(Audio.VOICE_GAIN, time)
        envelope.gain.linearRampToValueAtTime(0.0, endTime)
        oscillator.frequency.value = Audio.NOTES[rowIndex]
        oscillator.connect(panner)
        panner.connect(envelope)
        envelope.connect(this.voiceMix)
        oscillator.start(time)
        oscillator.stop(endTime)
    }

    private buildFxChain(): void {
        const delay: DelayNode = this.context.createDelay()
        delay.delayTime.value = this.barsToSeconds(3.0 / mSize)
        const feedbackGain: GainNode = this.context.createGain()
        feedbackGain.gain.value = 0.4
        const wetGain: GainNode = this.context.createGain()
        wetGain.gain.value = 0.1
        this.voiceMix.connect(delay)
        delay.connect(feedbackGain)
        feedbackGain.connect(delay)
        feedbackGain.connect(wetGain)
        wetGain.connect(this.context.destination)
    }
}