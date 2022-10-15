import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sequencer',
  templateUrl: './sequencer.component.html',
  styleUrls: ['./sequencer.component.css']
})
export class SequencerComponent implements OnInit {

  constructor() { }

  audioContext = new AudioContext();
  oscList: any = [];
  mainGainNode: GainNode;

  noteFreq: [];
  customWaveform: PeriodicWave;
  sineTerms = null;
  cosineTerms = null;

  keyboard: Element;
  wavePicker: HTMLSelectElement;
  volumeControl: HTMLInputElement;

  ngOnInit(): void {
    this.keyboard = document.querySelector(".keyboard") as Element;
    this.wavePicker = document.querySelector("select[name='waveform']") as HTMLSelectElement;
    this.volumeControl = document.querySelector("input[name='volume']") as HTMLInputElement;
    this.noteFreq = this.createNoteTable() as [];

    this.volumeControl.addEventListener("change", this.changeVolume, false);
  
    this.mainGainNode = this.audioContext.createGain();
    this.mainGainNode.connect(this.audioContext.destination);
  
    // // Create the keys; skip any that are sharp or flat; for
    // // our purposes we don't need them. Each octave is inserted
    // // into a <div> of class "octave".
  
    this.noteFreq.forEach((keys: Map<string, number>, idx) => {
      const keyList = Object.entries(keys);
      const octaveElem = document.createElement("div");
      octaveElem.className = "octave";
  
      keyList.forEach((key) => {
        if (key[0].length === 1) {
          octaveElem.appendChild(this.createKey(key[0], idx + '', key[1]));
        }
      });
  
      this.keyboard.appendChild(octaveElem);
    });

    // document.querySelector("div[data-note='B'][data-octave='5']")!.scrollIntoView(false);

    let sineTerms = new Float32Array([0, 0, 1, 0, 1]);
    let cosineTerms = new Float32Array(sineTerms.length);
    this.customWaveform = this.audioContext.createPeriodicWave(cosineTerms, sineTerms);

    for (let i = 0; i < 9; i++) {
      this.oscList[i] = {};
    }
  }

  changeVolume() {
    this.mainGainNode.gain.value = parseInt(this.volumeControl.value);
  }

  createKey(note: string, octave: string, freq: string) {
    const keyElement = document.createElement("div");
    const labelElement = document.createElement("div");

    keyElement.className = "key";
    keyElement.dataset["octave"] = octave;
    keyElement.dataset["note"] = note;
    keyElement.dataset["frequency"] = freq;
  
    labelElement.innerHTML = `${note}<sub>${octave}</sub>`;
    keyElement.appendChild(labelElement);
  
    keyElement.addEventListener("mousedown", this.notePressed, false);
    keyElement.addEventListener("mouseup", this.noteReleased, false);
    keyElement.addEventListener("mouseover", this.notePressed, false);
    keyElement.addEventListener("mouseleave", this.noteReleased, false);
  
    return keyElement;
  }

  createNoteTable() {
    const nf: any[] = [];
    for (let i=0; i< 9; i++) {
      nf[i] = [];
    }

    nf[0] = [
      { "A": 27.500000000000000},
      { "A#": 29.135235094880619},
      { "B": 30.867706328507756}
    ]

    nf[1] = [
      { "C": 32.703195662574829 },
      { "C#": 34.647828872109012 },
      { "D": 36.708095989675945 },
      { "D#": 38.890872965260113 },
      { "E": 41.203444614108741 },
      { "F": 43.653528929125485 },
      { "F#": 46.249302838954299 },
      { "G": 48.999429497718661 },
      { "G#": 51.913087197493142 },
      { "A": 55.000000000000000 },
      { "A#": 58.270470189761239 },
      { "B": 61.735412657015513 }
    ];

    nf[7] = [
      { "C": 2093.004522404789077 },
      { "C#": 2217.461047814976769},
      { "D": 2349.318143339260482},
      { "D#": 2489.015869776647285},
      { "E": 2637.020455302959437},
      { "F": 2793.825851464031075},
      { "F#": 2959.955381693075191},
      { "G": 3135.963487853994352},
      { "G#": 3322.437580639561108},
      { "A": 3520.000000000000000},
      { "A#": 3729.310092144719331},
      { "B": 3951.066410048992894}
    ];
  
    nf[8] = [ {"C": 4186.009044809578154 } ];

    return nf;
  }

  playTone(freq: number) {
    const osc = this.audioContext.createOscillator();
    osc.connect(this.mainGainNode);

    const type = this.wavePicker.options[this.wavePicker.selectedIndex].value;
    // const type: OscillatorType= 'sine';

    // if (type === 'custom') {
    //   osc.setPeriodicWave(this.customWaveform);
    // } else {
      osc.type = type as OscillatorType;
    // }
  
    osc.frequency.value = freq;
    osc.start();
  
    return osc;
  }

  notePressed(event: any) {
    if (event.buttons & 1) {
      const dataset = event.target.dataset;
  
      if (!dataset["pressed"]) {
        const octave = Number(dataset["octave"]);
        this.oscList[octave][dataset["note"]] = this.playTone(dataset["frequency"]);
        dataset["pressed"] = "yes";
      }
    }
  }

  noteReleased(event: any) {
    const dataset = event.target.dataset;
  
    if (dataset && dataset["pressed"]) {
      const octave = Number(dataset["octave"]);
      this.oscList[octave][dataset["note"]].stop();
      delete this.oscList[octave][dataset["note"]];
      delete dataset["pressed"];
    }
  }
  

}
