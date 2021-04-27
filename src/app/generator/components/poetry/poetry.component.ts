import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { getRandomWordOfGivenLength, latynize } from '../../generator-helpers';
import { Rhyme, Rhymes, rhymes } from '../models/rythm.models';
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

  constructor(private poetryService: PoetryService) {
    this.dictionaries = this.poetryService.setupDictionaries();
    this.dictionary = this.dictionaries[0];
    this.recolor();
  }

  public onDictionarySelection(d: Dictionary) {
    this.dictionary = d;
    this.generate();
  }

  public onRhymeSelection(rhyme: Rhyme) {
    this.setRhyme(rhyme);
    this.generate();
  }

  public reSlovo() {
    this.generate();
  }

  public reStyle() {
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
    this.objectOrientedPoetry = this.getOPoetryObjectFromDicAndRythm();
  }

  public getPoetryStringFromDicAndRythm(): string {
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

  public getOPoetryObjectFromDicAndRythm(): Poetry {
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

  public sequence(evt: Event) {
    // console.log('seq: ', evt);
    const randomStrophae = Math.floor(Math.random() * this.objectOrientedPoetry.strophae.length);
    const strophae: Strophae = this.objectOrientedPoetry.strophae[randomStrophae];
    const randomLine = Math.floor(Math.random() * strophae.lines.length);
    const line: Line = strophae.lines[randomLine];
    const randomWord = Math.floor(Math.random() * line.words.length);
    const word = line.words[randomWord];

    this.reword(line.words, word);
    this.reline(strophae.lines, line);
    this.recolor();
    // this.generate();
  }

  public color: any;
  public fontSize = 19;

  public recolor() {
    const r = Math.round(Math.random() * 155)+180;
    const g = Math.round(Math.random() * 155)+180;
    const b = Math.round(Math.random() * 155)+140;
    this.color = {r, g, b};

    this.fontSize += Math.round(Math.random()*3 - Math.random()*3);
    // console.log('fsize', this.fontSize);
  }

}
