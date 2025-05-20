import { Component, OnInit } from "@angular/core";
import * as Tone from "tone";

@Component({
  selector: "app-tonetest",
  imports: [],
  templateUrl: "./tonetest.component.html",
  styleUrl: "./tonetest.component.css",
})
export class TonetestComponent implements OnInit {
  ngOnInit(): void {
    // this.toneTest();
  }

  public async helloTone() {
    await Tone.start();
    console.log("audio is ready");
    //create a synth and connect it to the main output (your speakers)
    const synth = new Tone.Synth().toDestination();

    //play a middle 'C' for the duration of an 8th note
    synth.triggerAttackRelease("C4", "8n");
  }

  /**
   * Tone.Synth is a basic synthesizer with a single oscillator and an ADSR envelope.
   * triggerAttack / triggerRelease
   * triggerAttack starts the note (the amplitude is rising), and triggerRelease is when the amplitude is going back to 0 (i.e. note off).
   */
  public toneSynth() {
    const synth = new Tone.Synth().toDestination();
    const now = Tone.now();
    // trigger the attack immediately
    synth.triggerAttack("C4", now);
    // wait one second before triggering the release
    synth.triggerRelease(now + 1);

    const synth2 = new Tone.Synth().toDestination();

    /**
     * triggerAttackRelease is a combination of triggerAttack and triggerRelease
     * The first argument to the note which can either be a frequency in hertz (like 440) or as “pitch-octave” notation (like "D#2").
     * The second argument is the duration that the note is held. This value can either be in seconds, or as a tempo-relative value.
     * The third (optional) argument of triggerAttackRelease is when along the AudioContext time the note should play.
     * It can be used to schedule events in the future.
     */
    synth2.triggerAttackRelease("C4", "8n", now + 0.5);
    synth2.triggerAttackRelease("E4", "8n", now + 0.75);
    synth2.triggerAttackRelease("G4", "8n", now + 1);

    // setInterval(() => console.log(Tone.now()), 100);
  }

  public toneTransport() {
    const synthA = new Tone.FMSynth().toDestination();
    const synthB = new Tone.AMSynth().toDestination();
    //play a note every quarter-note
    const loopA = new Tone.Loop((time) => {
      synthA.triggerAttackRelease("C2", "8n", time);
    }, "4n").start(0);
    //play another note every off quarter-note, by starting it "8n"
    const loopB = new Tone.Loop((time) => {
      synthB.triggerAttackRelease("C4", "8n", time);
    }, "4n").start("8n");
    // all loops start when the Transport is started
    Tone.getTransport().start();
    // ramp up to 800 bpm over 10 seconds
    Tone.getTransport().bpm.rampTo(800, 10);
  }

  public toneInstruments() {
    const synth = new Tone.PolySynth(Tone.Synth).toDestination();
    const now = Tone.now();
    synth.triggerAttack("D4", now);
    synth.triggerAttack("F4", now + 0.5);
    synth.triggerAttack("A4", now + 1);
    synth.triggerAttack("C5", now + 1.5);
    synth.triggerAttack("E5", now + 2);
    synth.triggerRelease(["D4", "F4", "A4", "C5", "E5"], now + 4);
  }

  public toneSamples() {
    const player = new Tone.Player(
      "https://tonejs.github.io/audio/berklee/gong_1.mp3"
    ).toDestination();
    Tone.loaded().then(() => {
      player.start();
    });
  }

  public toneSampler() {
    const sampler = new Tone.Sampler({
      urls: {
        C4: "C4.mp3",
        "D#4": "Ds4.mp3",
        "F#4": "Fs4.mp3",
        A4: "A4.mp3",
      },
      release: 1,
      baseUrl: "https://tonejs.github.io/audio/salamander/",
    }).toDestination();

    Tone.loaded().then(() => {
      sampler.triggerAttackRelease(["Eb4"], 4);
      sampler.triggerAttackRelease(["G4", "Bb4"], 4, 0.25);
      sampler.triggerAttackRelease(["Eb4", "G4", "Bb4"], 4, 0.5);
      sampler.triggerAttackRelease(["C4", "G4", "Bb4", "A4"], 4, 0.75);
    });
  }

  public toneEffects() {
    const player = new Tone.Player({
      url: "https://tonejs.github.io/audio/berklee/gurgling_theremin_1.mp3",
      loop: false,
      autostart: true,
    });
    //create a distortion effect
    const distortion = new Tone.AutoFilter(0.1).toDestination();
    //connect a player to the distortion
    player.connect(distortion);

    const player2 = new Tone.Player({
      url: "https://tonejs.github.io/audio/drum-samples/loops/ominous.mp3",
      autostart: true,
    });
    const filter = new Tone.Filter(400, "lowpass").toDestination();
    const feedbackDelay = new Tone.FeedbackDelay(0.125, 0.5).toDestination();

    // connect the player to the feedback delay and filter in parallel
    player2.connect(filter);
    player2.connect(feedbackDelay);
  }

  public toneSignals() {
    const osc = new Tone.Oscillator().toDestination();
    // start at "C4"
    osc.frequency.value = "C4";
    // ramp to "C2" over 2 seconds
    osc.frequency.rampTo("C2", 2);
    // start the oscillator for 2 seconds
    osc.start().stop("+3");
  }

  // Some example from stackblitz
  // synth: any;
  // notes: string[] = [
  //   "C",
  //   "C#",
  //   "D",
  //   "D#",
  //   "E",
  //   "F",
  //   "F#",
  //   "G",
  //   "G#",
  //   "A",
  //   "A#",
  //   "B",
  // ];
  // octives: number[] = [1, 2, 3, 4, 5, 6];
  // msdown: boolean = false;
  // constructor() {
  //   this.synth = new Tone.PolySynth(1, Tone.Synth).toMaster();
  // }
  // chorus() {
  //   var chorus = new Tone.Chorus(4, 2.5, 0.5);
  //   this.synth = new Tone.PolySynth(4, Tone.MonoSynth)
  //     .toDestination()
  //     .connect(chorus);
  // }
  // reverb() {
  //   var reverb = new Tone.JCReverb(0.9).connect(Tone.Master);
  //   var delay = new Tone.FeedbackDelay(0.2);
  //   this.synth = new Tone.DuoSynth().chain(delay, reverb);
  // }
  // phaser() {
  //   var phaser = new Tone.Phaser({
  //     frequency: 2,
  //     octaves: 2,
  //     baseFrequency: 55,
  //   }).toDestination();
  //   this.synth.connect(phaser);
  // }
  // msover(note) {
  //   if (this.msdown) {
  //     this.play(note);
  //   }
  // }
  // play(note) {
  //   //this.synth.triggerAttackRelease(["C3","E3","G3"], "8n");
  //   this.synth.triggerAttackRelease(note, "8n");
  //   //this.synth.triggerAttackRelease([note], "2n");
  // }
}
