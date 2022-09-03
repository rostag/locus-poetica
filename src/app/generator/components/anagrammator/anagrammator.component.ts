import { Component, OnInit } from '@angular/core';

export interface Item {
  content: '',
}

interface GameAxis {
  name: string;
  values: GameAxis[]
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
    this.stackCombos(0, this.axes1, '');
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
        name: 'Модерн',
        values: [
          { name: 'Свобода', values: [] },
          { name: 'Братерство', values: [] },
          { name: 'Рівність', values: [] },
        ],
      },
      {
        name: 'Архаїка',
        values: [
          { name: 'Війна', values: [] },
          { name: 'Релігія', values: [] },
          { name: 'Секс', values: [] },
        ]
      },
      {
        name: 'Діло',
        values: [
          { name: 'Наука', values: [] },
          { name: 'Містика', values: [] },
          { name: 'Ремесло', values: [] },
        ]
      },
      {
        name: 'Ідея',
        values:
          [
            { name: 'Ієрархія', values: [] },
            { name: 'Гармонія', values: [] },
            { name: 'Хаос', values: [] },
          ]
      }
    ];

  getValues(axes: GameAxis[] ) {
    if (axes.length === 0) return [{
        name: '',
        values: [
        {name: '', values: []}
      ]}] as GameAxis[];
    let result = {} as any;
    axes.forEach((axis, i) => {
      let remainingItems = axes.slice(0, i).concat(axes.slice(i + 1));
      this.getValues(remainingItems).forEach((remaining) => {
        const res = [axis].concat(remaining);
        const id = axis.name + remainingItems.map(ri => ri.name)
        result[id] = res;
      });
    })
    return Object.values(result) as [];
  }

  getAllAxes(axes: GameAxis[] ) {
    if (axes.length === 0) return [{
      name: '',
      values: [
      {name: '', values: []}
    ]}] as GameAxis[];
    let result = {} as any;
    for(let i = 0; i < axes.length; i++ ) {
      const val = axes[i].values;
    }
    return Object.values(result) as [];
  }

  combos = [''];

  stackCombos(pos: number, c: string[][], soFar: string) {
    if (pos == c.length) {
      this.combos.push(soFar);
      return;
    }
    for (let i = 0 ; i != c[pos].length ; i++) {
      this.stackCombos(pos + 1, c, soFar + ' - ' + c[pos][i]);
    }
  }
  
  triangles: string[] = [];

  tModern = [''];
  tArchaic = [''];
  tCraft = [''];
  tIdea = [''];
  bookConfigs: any[];

  senses: string[][] = [];

  getSenses2() {
    for (let i = 0; i < 6; i+=2) {
      const categoryModern = this.tModern[i][0];
      const categoryArchaic = this.tArchaic[i][0];
      const categoryCraft = this.tCraft[i][0];
      const categoryIdea = this.tIdea[i][0];
      this.senses.push([categoryModern, categoryArchaic, categoryCraft, categoryIdea])
    }
  }

  parsedConfigs: any[];

  parseBookConfigs() {
    const parsed: any[] = [];
    this.bookConfigs.forEach(bc => {
      const bookAxes = bc as [];
      parsed.push([bc[0][0][0], bc[1][0][0], bc[2][0][0], bc[3][0][0]] );
    })
    this.parsedConfigs = parsed;
  }

  getAxes() {
    this.tModern = this.combineItems(this.axes1[0], undefined, undefined, ', ');
    this.tArchaic = this.combineItems(this.axes1[1], undefined, undefined, ', ');
    this.tCraft = this.combineItems(this.axes1[2], undefined, undefined, ', ');
    this.tIdea = this.combineItems(this.axes1[3], undefined, undefined, ', ');

    this.bookConfigs = this.combineItems([this.tModern, this.tArchaic, this.tCraft, this.tIdea], undefined, undefined, ', ');

    console.log('TMOD:', this.tModern);

    console.log('BCS:', this.bookConfigs);

    this.getSenses2();

    // this.parseBookConfigs();
    
  }

}
