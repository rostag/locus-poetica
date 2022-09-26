import { Component, OnInit, ViewEncapsulation } from '@angular/core';

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
})

export class ModelAxesComponent implements OnInit {
  
  // axes: IObjValuesCollection = [
  //   [{ label: 'A', class: 'axe-1 val-1' }, { label: 'E', class: 'axe-1 val-2' }],
  //   [{ label: 'D', class: 'axe-2 val-1' }, { label: 'L', class: 'axe-2 val-2' }],
  // ]

  // axes: IObjValuesCollection = [
  //   [{ label: 'Свобода', class: 'axe-1 val-1' }, { label: 'Братерство', class: 'axe-1 val-2' }],
  //   [{ label: 'Війна', class: 'axe-2 val-1' }, { label: 'Релігія', class: 'axe-2 val-2' }],
  // ]
  
  sets: IObjValuesCollection = [];

  combinations: IObjValuesCollection = [];

  axes: IObjValuesCollection = [
    [{ label: 'Свобода', class: 'axe-1 val-1' }, { label: 'Братерство', class: 'axe-1 val-2' }, { label: 'Рівність', class: 'axe-1 val-3' }],
    [{ label: 'Війна', class: 'axe-2 val-1' }, { label: 'Релігія', class: 'axe-2 val-2' }, { label: 'Секс', class: 'axe-2 val-3' }],
    [{ label: 'Наука', class: 'axe-3 val-1' }, { label: 'Містика', class: 'axe-3 val-2' }, { label: 'Ремесло', class: 'axe-3 val-3' }],
    [{ label: 'Ієрархія', class: 'axe-4 val-1' }, { label: 'Гармонія', class: 'axe-4 val-2' }, { label: 'Хаос', class: 'axe-4 val-3' }],
  ]

  showIndex = false;
  
  ngOnInit() {
    this.sets = this.getSets(0, [], this.axes, []);
    const setDepth = this.sets[0].length;
    // for (let s = 0; s < this.sets.length; s += setDepth) {
    //   const row = this.sets.slice(s * setDepth, s * setDepth + setDepth);
    //   this.combinations = this.combinations.concat(this.getSets(0, [], row, []));
    // }
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

  getOrders(initialCollection: IObjValuesCollection, values: IObjValuesCollection): IObjValuesCollection {
    return initialCollection;
  }
}
