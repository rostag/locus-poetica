import { Component, OnInit } from '@angular/core';

export interface Item {
  content: '',
}

interface GameAxis {
  axisName: string;
  axisValues: GameAxis[]
};

@Component({
  selector: 'app-model-axes',
  templateUrl: './model-axes.component.html',
  styleUrls: ['./model-axes.component.scss']
})

export class ModelAxesComponent implements OnInit {

  combos = [''];

  axes1: string[][] = [
    ['Свобода', 'Братерство', 'Рівність'],
    ['Війна', 'Релігія', 'Секс'],
    ['Наука', 'Містика', 'Ремесло'],
    ['Ієрархія', 'Гармонія', 'Хаос']
  ]

  axes: GameAxis[] = [{
    axisName: 'Модерн',
    axisValues: [
      { axisName: 'Свобода', axisValues: [] },
      { axisName: 'Братерство', axisValues: [] },
      { axisName: 'Рівність', axisValues: [] },
    ],
  }, {
    axisName: 'Архаїка',
    axisValues: [
      { axisName: 'Війна', axisValues: [] },
      { axisName: 'Релігія', axisValues: [] },
      { axisName: 'Секс', axisValues: [] },
    ]
  }, {
    axisName: 'Діло',
    axisValues: [
      { axisName: 'Наука', axisValues: [] },
      { axisName: 'Містика', axisValues: [] },
      { axisName: 'Ремесло', axisValues: [] },
    ]
  }, {
    axisName: 'Ідея',
    axisValues:
      [
        { axisName: 'Ієрархія', axisValues: [] },
        { axisName: 'Гармонія', axisValues: [] },
        { axisName: 'Хаос', axisValues: [] },
      ]
  }];

  maxIterations = 1000000;
  iteration = 0;

  ngOnInit() {
    this.getAxes();
    this.stackCombos(0, this.axes1, '');
    this.getAxesCombos(0, this.axes, {
      axisName: '',
      axisValues: [
        { axisName: '', axisValues: [] }
      ]
    });
    console.log(this.axesCombos);
  }


  stackCombos(pos: number, c: string[][], soFar: string) {
    if (pos == c.length) {
      this.combos.push(soFar);
      return;
    }
    for (let i = 0; i != c[pos].length; i++) {
      this.stackCombos(pos + 1, c, soFar + ' - ' + c[pos][i]);
    }
  }

  axesCombos: GameAxis[] = [];

  getAxesCombos(pos: number, axis: GameAxis[], soFar: GameAxis) {
    if (pos == axis.length) {
      this.axesCombos.push(soFar);
      return;
    }
    for (let i = 0; i != axis[pos].axisValues.length; i++) {
      this.getAxesCombos(pos + 1, axis, { axisName: soFar.axisName, axisValues: soFar.axisValues.concat(axis[pos].axisValues[i].axisValues) });
    }
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

  getValues(axes: GameAxis[]) {
    if (axes.length === 0) return [{
      axisName: '',
      axisValues: [
        { axisName: '', axisValues: [] }
      ]
    }] as GameAxis[];
    let result = {} as any;
    axes.forEach((axis, i) => {
      let remainingItems = axes.slice(0, i).concat(axes.slice(i + 1));
      this.getValues(remainingItems).forEach((remaining) => {
        const res = [axis].concat(remaining);
        const id = axis.axisName + remainingItems.map(ri => ri.axisName)
        result[id] = res;
      });
    })
    return Object.values(result) as [];
  }

  getAllAxes(axes: GameAxis[]) {
    if (axes.length === 0) return [{
      axisName: '',
      axisValues: [
        { axisName: '', axisValues: [] }
      ]
    }] as GameAxis[];
    let result = {} as any;
    for (let i = 0; i < axes.length; i++) {
      const val = axes[i].axisValues;
    }
    return Object.values(result) as [];
  }


  triangles: string[] = [];

  tModern = [''];
  tArchaic = [''];
  tCraft = [''];
  tIdea = [''];
  bookConfigs: any[];

  senses: string[][] = [];

  getSenses2() {
    for (let i = 0; i < 6; i += 2) {
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
      parsed.push([bc[0][0][0], bc[1][0][0], bc[2][0][0], bc[3][0][0]]);
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
