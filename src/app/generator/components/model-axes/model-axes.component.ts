import { Component, OnInit } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import * as _ from 'lodash';

type iObj = {
  label: string;
  class: string;
  color?: string;
  axe?: number;
  id?: number;
}

type IObjValue = iObj;
type IObjValues = IObjValue[];
type IObjValuesCollection = IObjValues[];

@Component({
    selector: 'app-model-axes',
    templateUrl: './model-axes.component.html',
    styleUrls: ['./model-axes.component.scss'],
    standalone: false
})

export class ModelAxesComponent implements OnInit {

  onAxesChange(axes: MatButtonToggleChange) {
    this.axes = this.axesMap.get(axes.value) as IObjValuesCollection;
}
  onDisplayModeChange(displayMode: MatButtonToggleChange) {
    this.displayMode = displayMode.value;
  }
  
  // кот, шот, чи ляр, чи лар
  shotbular: IObjValuesCollection = [
    [{ label: 'КОТ', class: 'axe-1 val-1' }, { label: 'ШОТ', class: 'axe-1 val-2' }, { label: 'ШЬОТ', class: 'axe-1 val-2' }],
    [{ label: 'БУ', class: 'axe-2 val-1' }],
    [{ label: 'ЛАР', class: 'axe-2 val-1' }, { label: 'ЛЯР', class: 'axe-2 val-2' }],
  ]

  // axes: IObjValuesCollection = [
  //   [{ label: 'A', class: 'axe-1 val-1' }, { label: 'B', class: 'axe-1 val-2' }, { label: 'C', class: 'axe-1 val-3' }],
  //   [{ label: 'D', class: 'axe-2 val-1' }, { label: 'E', class: 'axe-2 val-2' }, { label: 'F', class: 'axe-2 val-3' }],
  //   [{ label: 'D', class: 'axe-2 val-1' }, { label: 'E', class: 'axe-2 val-2' }, { label: 'F', class: 'axe-2 val-3' }],
  // ]

  // axes: IObjValuesCollection = [
  //   [{ label: 'Свобода', class: 'axe-1 val-1' }, { label: 'Братерство', class: 'axe-1 val-2' }],
  //   [{ label: 'Війна', class: 'axe-2 val-1' }, { label: 'Релігія', class: 'axe-2 val-2' }],
  // ]
  
  sets: IObjValuesCollection = [];

  priorities: IObjValuesCollection = [];

  axesLibrary: IObjValuesCollection = [
    [{ label: 'Свобода', class: 'axe-1 val-1' }, { label: 'Братерство', class: 'axe-1 val-2' }, { label: 'Рівність', class: 'axe-1 val-3' }],
    [{ label: 'Війна', class: 'axe-2 val-1' }, { label: 'Релігія', class: 'axe-2 val-2' }, { label: 'Секс', class: 'axe-2 val-3' }],
    [{ label: 'Наука', class: 'axe-3 val-1' }, { label: 'Містика', class: 'axe-3 val-2' }, { label: 'Ремесло', class: 'axe-3 val-3' }],
    [{ label: 'Ієрархія', class: 'axe-4 val-1' }, { label: 'Гармонія', class: 'axe-4 val-2' }, { label: 'Хаос', class: 'axe-4 val-3' }],
  ];

  axesPoetry: IObjValuesCollection = [
    [{ label: 'війна', class: 'axe-1 val-1' }, { label: 'мир', class: 'axe-1 val-2' }],
    [{ label: 'безкінечно', class: 'axe-2 val-1' }, { label: 'швидко', class: 'axe-2 val-2' }],
    [{ label: 'летить', class: 'axe-3 val-1' }, { label: 'іде', class: 'axe-3 val-2' }],
    // [{ label: 'правдиво', class: 'axe-4 val-1' }, { label: 'лихо', class: 'axe-4 val-2' }],
  ]

  axesMap = new Map<string, IObjValuesCollection>();

  axes: IObjValuesCollection = this.shotbular;

  showIndex = false;

  displayMode: 'grid' | 'sentences' = 'grid';
  
  ngOnInit() {
    this.sets = this.getSets(0, [], this.axes, []);
    this.axesMap.set('axesLibrary', this.axesLibrary);
    this.axesMap.set('axesPoetry', this.axesPoetry);

    for (let s = 0; s < this.sets.length; s += 1) {
      const sset = this.sets[s];
      const combos = this.getPermutations(sset as unknown as _.List<IObjValues>, sset.length);
      // const combos = _.flatMap(sset, (v, i, a) => this.getPriorities(a as unknown as _.List<IObjValues>, i + 1));
      this.priorities = this.priorities.concat(combos);
    }
  }

  getSets(index: number, initialCollection: IObjValuesCollection, values: IObjValuesCollection, previous: IObjValues): IObjValuesCollection {
    if (index === values.length) {
      initialCollection.push(previous);
      return initialCollection;
    }
    for (let i = 0; i < values[index].length; i++) {
      this.getSets(index + 1, initialCollection, values, previous.concat(values[index][i]));
    }
    return initialCollection;
  }

  getCombinations(collection: _.List<IObjValues>, n: number): IObjValues {
    let array = _.values(collection);    
    if (array.length < n) {
      return [];
    }
    let recur = ((array: any[], n: number) => {
      if (--n < 0) {
        return [[]];
      }
      let combinations: any[] = [];
      array = array.slice();
      while (array.length - n) {
        let value = array.shift();
        recur(array, n).forEach((combination) => {
          combination.unshift(value);
          combinations.push(combination);
        });
      }
      return combinations;
    });
    return recur(array, n);
  }

  getPermutations(collection: _.List<IObjValues>, n: number) {
    let array = _.values(collection);
    if (array.length < n) {
      return [];
    }
    let recur = ((array: any[], n: number) => {
      if (--n < 0) {
        return [[]];
      }
      let permutations: any[] = [];
      array.forEach((value, index, array) => {
        array = array.slice();
        array.splice(index, 1);
        recur(array, n).forEach(permutation => {
          permutation.unshift(value);
          permutations.push(permutation);
        });
      });
      return permutations;
    });
    return recur(array, n);
  }
}
