import { Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { getRandomWordOfGivenLength, latynize } from '../../generator-helpers';
import { generatorState, IAudio, IConnection } from '../generator/generator.component';
import { Rhyme, Rhymes, rhymes } from '../models/rhyme.models';
import { Dictionary, Line, OOPTimelineMode, Poetry, PoetryService, Strophae, Word } from '../services/poetry.service';

/**
  pyro / senkan
  я бог 
  ты бросая 
  сукой волосами 
  красным которые лона 
  меня 
 */

@Component({
  selector: 'app-poetry',
  templateUrl: './poetry.component.html',
  styleUrls: ['./poetry.component.scss']
})
export class PoetryComponent implements OnInit {

  rhymeControl = new UntypedFormControl();
  modeControl = new UntypedFormControl();
  dictionaryControl = new UntypedFormControl();
  latynizeControl = new UntypedFormControl(false);

  dictionaries: Dictionary[];
  dictionary: Dictionary;

  rhymes: Rhymes;
  rhyme: Rhyme;
  mode: OOPTimelineMode;

  poetry: string = '';
  objectOrientedPoetry: Poetry;

  connections: IConnection[] = generatorState.connections;

  constructor(public poetryService: PoetryService) {
    this.dictionaries = this.poetryService.setupDictionaries();
    this.dictionary = this.dictionaries[0];
    this.recolor();
    this.resizeFont();
  }

  public onDictionarySelection(d: Dictionary) {
    this.dictionary = d;
    this.generate();
  }

  public onRhymeSelection(rhyme: Rhyme) {
    this.setRhyme(rhyme);
    this.generate();
  }

  public onModeSelection(mode: OOPTimelineMode) {
    this.setMode(mode);
    this.generate();
  }

  public getDictionaries(): Dictionary[] {
    return Object['values'](this.dictionaries);
  }

  public getRhymes(): [] {
    // @ts-ignore: Object is of type 'unknown'.
    return Object.values(this.rhymes);
  }

  public ngOnInit() {
    this.dictionaryControl.valueChanges.pipe().subscribe(val => this.onDictionarySelection(val));
    this.rhymeControl.valueChanges.pipe().subscribe(val => this.onRhymeSelection(val));
    this.modeControl.valueChanges.pipe().subscribe(val => this.onModeSelection(val));
    this.latynizeControl.valueChanges.pipe().subscribe(val => this.generate())

    this.rhymes = rhymes;
    this.setRhyme(this.rhymes.haiku);

    this.generate();
  }

  public setDictionary(dic: Dictionary) {
    this.dictionary = dic;
  }

  public setRhyme(rhyme: Rhyme) {
    this.rhyme = rhyme;
  }

  public setMode(mode: OOPTimelineMode) {
    console.log('set mode:', mode);
    this.mode = mode;
  }

  public generate() {
    this.objectOrientedPoetry = this.getPoetryObjectFromDicAndRhyme();
  }

  // public getPoetryStringFromDicAndRhyme(): string {
  //   let result = '';
  //   this.rhyme.value.forEach(line => {
  //     line.forEach(wordLength => {
  //       const newWord = getRandomWordOfGivenLength(this.dictionary.words, wordLength, false, false);
  //       result += newWord.wordContents + ' ';
  //     })
  //     result += '\n';
  //   })
  //   return result;
  // };

  public getPoetryObjectFromDicAndRhyme(): Poetry {
    let prevEnding = '';
    const oopo: Poetry = {
      strophae: [{
        lines: [{
          words: []
        }]
      }]
    };
    let lines: Line[] = [];
    this.rhyme.value.forEach(rhymeLine => {
      let words: Word[] = [];
      rhymeLine.forEach(wordLength => {
        const newWord = getRandomWordOfGivenLength(this.dictionary.words, wordLength, false, false, prevEnding);
        words = words.concat(newWord);
      })
      lines.push({
        words: words
      });
    })
    oopo.strophae[0].lines = lines;
    return oopo;
  };

  public copyText(event: MouseEvent) {
    event.preventDefault;
    event.stopPropagation();
    let val = '';
    this.objectOrientedPoetry.strophae.forEach(strophae => strophae.lines.forEach(line => {
      line.words.forEach(word => {
        val += this.postProcess(word) + ' ';
      });
      val += '\n';
    }));
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    const today = new Date().toDateString();
    const framework = this.dictionary.name + ' / ' + this.rhyme.name;
    selBox.value = `${framework} - ${today} \n\n${val} \n* * *\n\n`;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  reword(words: Word[], word: Word, event?: MouseEvent): void {
    const newWord = getRandomWordOfGivenLength(this.dictionary.words, word.rhymeWordLength);
    const index = words.indexOf(word);
    words[index] = newWord;
    event ? event.stopPropagation() : null;
  }
  reline(lines: Line[], line: Line, event?: Event): void {
    line.words.forEach((word, index, words) => {
      words[index] = getRandomWordOfGivenLength(this.dictionary.words, word.rhymeWordLength)
    })
    event ? event.stopPropagation() : null;
  }

  postProcess(word: Word): string {
    return this.latynizeControl.value ? latynize(word.wordContents) : word.wordContents;
  }

  public getRandomText() {
    const randomStrophae = Math.floor(Math.random() * this.objectOrientedPoetry.strophae.length);
    const strophae: Strophae = this.objectOrientedPoetry.strophae[randomStrophae];
    const randomLine = Math.floor(Math.random() * strophae.lines.length);
    const line: Line = strophae.lines[randomLine];
    const randomWord = Math.floor(Math.random() * line.words.length);
    const word = line.words[randomWord];
    return { strophae, line, word }
  }

  public poetryBeat(evt: IAudio) {
    const text = this.getRandomText();

    const connection: IConnection = generatorState.connections.find(con => con.source === evt.name) || { source: null, target: null };
    const targetMethod = connection.target;

    const methodMap = [
      { name: 'retext', ref: () => this.retext(text.strophae, text.line, text.word) },
      { name: 'recolor', ref: () => this.recolor() },
      { name: 'resizeFont', ref: () => this.resizeFont() },
      { name: 'randomize', ref: () => this.randomize() },
    ]

    const meth = methodMap.find(method => method.name === targetMethod) || methodMap[1];
    meth.ref();
  }

  private randomize() {
    const text = this.getRandomText();
    this.retext(text.strophae, text.line, text.word);
    this.recolor();
    this.resizeFont();
  }

  private retext(strophae: any, line: any, word: any) {
    this.reword(line.words, word);
    this.reline(strophae.lines, line);
  }

  public methodMap = [{
    target: null,
    targetProperty: null,
    destination: null,
    destinationProperty: null
  }, {
    target: null,
    targetProperty: null,
    destination: null,
    destinationProperty: null
  }]

  public color: any;
  public fontSize = 19;

  public recolor() {
    
    const max = 255;

    const minr = 80;
    const ming = 0;
    const minb = 150;

    const kr = 1 / (max / (max - minr));
    const kg = 1 / (max / (max - ming));
    const kb = 1 / (max / (max - minb));
    const r = Math.round(Math.random() * max * kr) + max * (1 - kr);
    const g = Math.round(Math.random() * max * kg) + max * (1 - kg);
    const b = Math.round(Math.random() * max * kb) + max * (1 - kb);
    console.log({ r, g, b });

    this.color = { r, g, b };
  }

  public resizeFont() {
    this.fontSize = Math.round(35 + Math.random() * 3 - Math.random() * 2);
  }

  // TODO Move to separate component
  /* Timeline */
  // private playingSample: boolean
  // public currentSampleName = 'kick'
  // private onDestroy$ = new Subject<void>()
  // private _sampleFreq = 300


  // public stopLoop(sampleName: any) {
  //   this.playingSample = false;
  //   // this.closeAudioContext(sampleName);
  //   this.onDestroy$.next();
  // }

  // public play() {
  //   this.initLoop(this.currentSampleName, this._sampleFreq);
  // }

  // public playLoop(sample: string) {
  //   this.initLoop(sample, this._sampleFreq);
  // }

  // public initLoop(sample: string, time: number) {
  //   this.playSample(sample);
  //   interval(time)
  //     .pipe(
  //       timeInterval(),
  //       takeUntil(this.onDestroy$)
  //     )
  //     .subscribe(a => {
  //       // this.timelineBeat.emit(this.TODOgeneratorMigrate);
  //       this.playSample(sample);
  //     });
  // }

  // public playLoopOnce(name: string) {
  //   of(1).pipe().subscribe(a => {
  //     // this.timelineBeat.emit(this.TODOgeneratorMigrate);
  //     this.playSample(name);
  //   });
  // }

  // public playSample(sampleName: any) {
  //   this.playingSample = true;
  //   this.currentSampleName = sampleName;

  //   // Save buffer source to sample
  // }

  // public setControlValue(evt: MatSliderChange) {
  //   // this.timelineBeat.emit(this.TODOgeneratorMigrate);
  //   this._sampleFreq = evt.value as number;
  // }

  // public y(x: number) {
  //   return Math.round(Math.exp(x));
  // }

  // public r(r: number) {
  //   const a = Math.random() * r;
  //   return Math.round(a * a + a);
  // }

  // public ngOnDestroy() {
  //   // this.TODOgeneratorMigrate.enabled = false;
  //   this.stopLoop('');
  // }

  // private getModeByName(name: string) {
  //   return this.poetryService.getTimeline().modes.find((mode: any) => mode.name === name) || { name: 'Undefined' };
  // }
}
