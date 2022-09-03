import { Component, OnInit } from '@angular/core';

export interface Item {
  content: '',
}

interface GameAxis {
  name: string;
  values: GameValue[]
};

interface GameValue {
  label: string
};

@Component({
  selector: 'app-anagrammator',
  templateUrl: './anagrammator.component.html',
  styleUrls: ['./anagrammator.component.scss']
})

export class AnagrammatorComponent implements OnInit {

  maxIterations = 10000000000;

  filterBy = '';
  sourceWord = 'UKRAINE';
  anagrams = [''];
  randomize = false;

  filtered = [''];

  formattedResult = '';
  iteration: number;

  ngOnInit() {
    // this.anagrammate();
    this.getAxes();
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
      this.combineItems(remainingItems, max, start).forEach((remaining = '') => {
        const res = [item].concat(remaining);
        const id = item + remaining
        result[id] = res;
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
    const word = this.sourceWord;
    // const reverse = word.split('').reverse().join('');

    this.iteration = 0;

    this.anagrams = this.combineItems(word.split(''), this.maxIterations);
    this.filtered = this.filterBy ? this.anagrams.filter(anagram => anagram.indexOf(this.filterBy) === 0) : this.anagrams;
    const shuffled = this.randomize ? this.shuffleArray(this.filtered) : this.filtered;

    this.formattedResult = shuffled.join('\n');
  }

  axes1: string[][] =
    [
      [
        'Свобода',
        'Братерство',
        'Рівність',
      ],
      [
        'Війна',
        'Релігія',
        'Секс',
      ],
      [
        'Наука',
        'Містика',
        'Ремесло',
      ],
      [
        'Ієрархія',
        'Гармонія',
        'Хаос',
      ]
    ]

  axes: GameAxis[] =
    [
      {
        name: 'Humanity',
        values: [
          { label: 'Свобода' },
          { label: 'Братерство' },
          { label: 'Рівність' },
        ],
      },
      {
        name: 'Humanity',
        values: [
          { label: 'Війна' },
          { label: 'Релігія' },
          { label: 'Секс' },
        ]
      },
      {
        name: 'Humanity',
        values: [
          { label: 'Наука' },
          { label: 'Містика' },
          { label: 'Ремесло' },
        ]
      },
      {
        name: 'Humanity',
        values:
          [
            { label: 'Ієрархія' },
            { label: 'Гармонія' },
            { label: 'Хаос' },
          ]
      }
    ]

  triangles: string[] = [];

  t1 = [''];
  t2 = [''];
  t3 = [''];
  t4 = [''];
  bookConfig = [''];

  getAxes() {
    this.t1 = this.combineItems(this.axes1[0], undefined, undefined, ', ');
    this.t2 = this.combineItems(this.axes1[1], undefined, undefined, ', ');
    this.t3 = this.combineItems(this.axes1[2], undefined, undefined, ', ');
    this.t4 = this.combineItems(this.axes1[3], undefined, undefined, ', ');
    this.bookConfig = this.combineItems([this.t1, this.t2, this.t3, this.t4], undefined, undefined, ', ');

    // console.log(this.t1.join('\n'));
    // console.log(this.t2.join('\n'));
    // console.log(this.t3.join('\n'));
    // console.log(this.t4.join('\n'));
    // console.log(this.bookConfig.join('\n'));
    console.log(this.bookConfig);

  }

}
