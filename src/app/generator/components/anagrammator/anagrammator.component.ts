import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-anagrammator',
  templateUrl: './anagrammator.component.html',
  styleUrls: ['./anagrammator.component.scss']
})

export class AnagrammatorComponent implements OnInit {

  maxIterations = 10000000000;

  filterBy = '';
  sourceWord = '';
  anagrams = [''];
  randomize = true;

  filtered = [''];

  formattedResult = '';

  ngOnInit() {
    console.log('init');
  }

  setSourceString(event: any) {
    this.sourceWord = event?.target?.value;
    this.anagrammate();
  }

  setFilter(event: any) {
    this.filterBy = event?.target?.value;
    this.anagrammate()
  }

  anagrammate() {
    const word = this.sourceWord;
    // const reverse = word.split('').reverse().join('');

    let iteration = 0;

    function allAnagramsForString(str = '', max = 0, start = 0) {
      if (str.length === 0) return [''];
      var result = {} as any;
      str.split('').forEach((char, i) => {
        if (++iteration > max) {
          return;
        }
        var remainingChars = str.slice(0, i) + str.slice(i + 1);
        allAnagramsForString(remainingChars, max, start).forEach((anagram = '') => {
          result[char + anagram] = true;
        });
      });
      return Object.keys(result) as string[];
    }

    function shuffleArray(arr: any[]) {
      let currentIndex = arr.length, randomIndex;
      while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
      }
      return arr;
    }

    this.anagrams = allAnagramsForString(word, this.maxIterations);
    this.filtered = this.filterBy ? this.anagrams.filter(anagram => anagram.indexOf(this.filterBy) === 0) : this.anagrams;
    const shuffled = this.randomize ? shuffleArray(this.filtered) : this.filtered;

    this.formattedResult = shuffled.join('\n');
  }
}
 