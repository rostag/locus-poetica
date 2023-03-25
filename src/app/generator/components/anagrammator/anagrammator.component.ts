import { Component, OnInit } from '@angular/core';
import { copyToClipboardWithVisualResponse } from '../../generator-helpers';

@Component({
  selector: 'app-anagrammator',
  templateUrl: './anagrammator.component.html',
  styleUrls: ['./anagrammator.component.scss']
})

export class AnagrammatorComponent implements OnInit {

  shuffle = false;
  toUseRutenia = false;

  sourceWord = 'WORD';
  anagrams = [''];
  filtered = [''];
  formattedResult = '';
  
  startWith = '';
  hasPart = '';
  endWith = '';

  maxIterations = 10000000000;
  iteration: number;

  ngOnInit() {
    this.anagrammate();
  }

  setSourceString(event: any) {
    this.sourceWord = event?.target?.value;
    this.anagrammate();
  }

  toggleShuffling(event: any) {
    this.shuffle = event?.currentTarget?.checked;
    this.anagrammate();
  }

  setStartWith(evt) {
    this.startWith = evt.target.value;
    this.anagrammate();
  }  
 
  setHasPart(evt) {
    this.hasPart = evt.target.value;
    this.anagrammate();
  }  

  setEndWith(evt) {
    this.endWith = evt.target.value;
    this.anagrammate();
  }  
 
  toggleUseRuteniaFont(event: any) {
    this.toUseRutenia = event?.currentTarget?.checked;
    document.querySelector('#result-render')?.classList.toggle('rootenia', this.toUseRutenia );
  }

  combineItems(items: any[], max = this.maxIterations, start = 0, divider = '') {
    if (items.length === 0) return [''];
    var result = {} as any;
    items.forEach((item, i) => {
      if (++this.iteration > max) {
        return;
      }
      var remainingItems = items.slice(0, i).concat(items.slice(i + 1));
      this.combineItems(remainingItems, max, start, divider).forEach((remaining = '') => {
        const res = [item].concat(remaining);
        const id = item + remaining
        result[id] = res.join(divider);
      });
    });
    return Object.values(result) as [];
  }

  shuffleArray(arr: any[]) {
    let currentIndex = arr.length, randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
    }
    return arr;
  }

  anagrammate() {
    this.iteration = 0;

    this.anagrams = this.combineItems(this.sourceWord.split(''), this.maxIterations, 0, '');
    const filteredByStart = this.startWith ? this.anagrams.filter(str => str.indexOf(this.startWith) === 0) : this.anagrams;
    const filteredByEnd = this.endWith ? filteredByStart.filter(str => str.lastIndexOf(this.endWith) === str.length - this.endWith.length) : filteredByStart;
    const filteredByHasPart = this.hasPart ? filteredByEnd.filter(str => str.indexOf(this.hasPart) !== -1) : filteredByEnd;
    this.filtered = filteredByHasPart;

    const shuffled = this.shuffle ? this.shuffleArray(this.filtered) : this.filtered;

    this.formattedResult = shuffled.join('\n');
  }

  copyResults(copyId: string) {
    const el = document.querySelector('#' + copyId);
    copyToClipboardWithVisualResponse(el, this.filtered);
  }
}
