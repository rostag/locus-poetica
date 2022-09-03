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
        name: 'Модерн',
        values: [
          { label: 'Свобода' },
          { label: 'Братерство' },
          { label: 'Рівність' },
        ],
      },
      {
        name: 'Архаїка',
        values: [
          { label: 'Війна' },
          { label: 'Релігія' },
          { label: 'Секс' },
        ]
      },
      {
        name: 'Діло',
        values: [
          { label: 'Наука' },
          { label: 'Містика' },
          { label: 'Ремесло' },
        ]
      },
      {
        name: 'Ідея',
        values:
          [
            { label: 'Ієрархія' },
            { label: 'Гармонія' },
            { label: 'Хаос' },
          ]
      }
    ];

  getValues(axisValues: GameValue[] ) {
    if (axisValues.length === 0) return [{label: ''}];
    let result = {} as any;
    axisValues.forEach((val, i) => {
      let remainingItems = axisValues.slice(0, i).concat(axisValues.slice(i + 1));
      this.getValues(remainingItems).forEach((remaining) => {
        const res = [val].concat(remaining);
        const id = val.label + remainingItems.map(ri => ri.label)
        result[id] = res;
      });
    })
    return Object.values(result) as [];
  }

  // if (items.length === 0) return [''];
  // var result = {} as any;
  // items.forEach((item, i) => {
  //   var remainingItems = items.slice(0, i).concat(items.slice(i + 1));
  //   this.combineItems(remainingItems, max, start).forEach((remaining = '') => {
  //     const res = [item].concat(remaining);
  //     const id = item + remaining
  //     result[id] = res;
  //   });
  // });
  // return Object.values(result) as [];

  getCombos(){
    for(let a = 0; a < this.axes.length; a++) {
      const axeValues = this.axes[a].values;
      console.log(axeValues.map(v => v.label));
      const an = this.getValues(this.axes[a].values);
      console.log('an:', an);
    }
  }
  
  triangles: string[] = [];

  tModern = [''];
  tArchaic = [''];
  tCraft = [''];
  tIdea = [''];
  bookConfigs: any[];

  // combineAxes(axis: GameAxis, max = this.maxIterations, start = 0, divider = '') {
  //   const axeValues = axis.values;
  //   if (axeValues.length === 0) return [''];
  //   var result = {} as any;
  //   axeValues.forEach((axeValue, i) => {
  //     var remainingItems = axeValues.slice(0, i).concat(axeValues.slice(i + 1));
  //     this.combineItems(remainingItems, max, start).forEach((remaining = '') => {
  //       const res = [axeValue].concat(remaining);
  //       const id = axeValue + remaining
  //       result[id] = res;
  //     });
  //   });
  //   return Object.values(result) as [];
  // }

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
    const configsParsed: any[] = [];
    const configsParsed2: any[] = [];
    this.bookConfigs.forEach(bc => {
      const bookAxes = bc as [];
      configsParsed2.push([bc[0][0][0], bc[1][0][0], bc[2][0][0], bc[3][0][0]] );

      bookAxes.forEach(axis => {
        const axeValues = axis as [];
        // configsParsed2.push([axis[0][0][0], axis[1][0][0], axis[2][0][0], axis[3][0][0]] );
        
        if (typeof axeValues === 'object') {
          console.log('av:', axeValues);
          axeValues.forEach(value => {
                configsParsed.push(value[0])
          })
        }
        
      })
    })

    this.parsedConfigs = configsParsed2;
    
    return configsParsed as any;
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

    this.getCombos();
    
  }

}
