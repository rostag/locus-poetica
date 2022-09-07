import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-anagrammator',
  templateUrl: './anagrammator.component.html',
  styleUrls: ['./anagrammator.component.scss']
})

export class AnagrammatorComponent implements OnInit {

  sourceWord = 'UKRAINE';
  randomize = false;
  filterBy = '';
  anagrams = [''];
  filtered = [''];
  formattedResult = '';

  maxIterations = 10000000000;
  iteration: number;

  ngOnInit() {
    this.anagrammate();
  }

  setSourceString(event: any) {
    this.sourceWord = event?.target?.value;
    this.anagrammate();
  }

  setFilter(event: any) {
    this.filterBy = event?.target?.value;
    this.anagrammate();
  }

  toggleShuffling(event: any) {
    this.randomize = event?.currentTarget?.checked;
    this.anagrammate();
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
    this.filtered = this.filterBy ? this.anagrams.filter(anagram => anagram.indexOf(this.filterBy) === 0) : this.anagrams;
    const shuffled = this.randomize ? this.shuffleArray(this.filtered) : this.filtered;

    this.formattedResult = shuffled.join('\n');
  }
}
