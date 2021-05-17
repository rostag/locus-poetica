import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { getRandomWordOfGivenLength, latynize } from '../../generator-helpers';
import { generatorState, IAudio, IConnection } from '../generator/generator.component';
import { Rhyme, Rhymes, rhymes } from '../models/rhyme.models';
import { Dictionary, Line, Poetry, PoetryService, Strophae, Word } from '../services/poetry.service';

/*
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

  rhymeControl = new FormControl();
  dictionaryControl = new FormControl();
  latynizeControl = new FormControl(false);

  dictionaries: Dictionary[];
  dictionary: Dictionary;

  rhymes: Rhymes;
  rhyme: Rhyme;

  poetry: string = '';
  public objectOrientedPoetry: Poetry;

  public connections: IConnection[] = generatorState.connections;

  constructor(private poetryService: PoetryService) {
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

  public generate() {
    this.objectOrientedPoetry = this.getPoetryObjectFromDicAndRhyme();
  }

  public getPoetryStringFromDicAndRhyme(): string {
    let result = '';
    this.rhyme.value.forEach(line => {
      line.forEach(wordLength => {
        const newWord = getRandomWordOfGivenLength(this.dictionary.words, wordLength, false, false);
        result += newWord.wordContents + ' ';
      })
      result += '\n';
    })
    return result;
  };

  public getPoetryObjectFromDicAndRhyme(): Poetry {
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
        const newWord = getRandomWordOfGivenLength(this.dictionary.words, wordLength, false, false);
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

  public poetryBeat(evt: IAudio) {
    const cons = generatorState.connections;
    const con: IConnection = cons.find(con => con.source === evt.name) || { source : null, destination: null};
    const dest = con.destination;
    const randomStrophae = Math.floor(Math.random() * this.objectOrientedPoetry.strophae.length);
    const strophae: Strophae = this.objectOrientedPoetry.strophae[randomStrophae];
    const randomLine = Math.floor(Math.random() * strophae.lines.length);
    const line: Line = strophae.lines[randomLine];
    const randomWord = Math.floor(Math.random() * line.words.length);
    const word = line.words[randomWord];
    
    // Options:
    const methodMap = [
      { name: 'retext', ref: () => this.retext(strophae, line, word) },
      { name: 'recolor', ref: () => this.recolor() },
      { name: 'resizeFont', ref: () => this.resizeFont() },
    ]
    // console.log('sequencer event:', evt, con, dest);
    // this.retext(strophae, line, word);
    // this.recolor();
    // this.resizeFont();
    const meth = methodMap.find(method => method.name === dest) || methodMap[1];
    meth.ref();
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
    const r = Math.round(Math.random() * 135) + 150;
    const g = Math.round(Math.random() * 135) + 150;
    const b = Math.round(Math.random() * 135) + 100;
    this.color = { r, g, b };
    // console.log(`Recolor:`, this.color);
  }

  public resizeFont() {
    this.fontSize = Math.round(15 + Math.random() * 30 - Math.random() * 3);

  }
}
