import { Component, OnInit, ViewEncapsulation } from '@angular/core';

type iObj = {
  label: string;
  class: string;
  color?: string;
}

type IObjValue = iObj;
type IObjValues = IObjValue[];
type IObjValuesCollection = IObjValues[];

@Component({
  selector: 'app-model-axes',
  templateUrl: './model-axes.component.html',
  styleUrls: ['./model-axes.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class ModelAxesComponent implements OnInit {

  combinations: IObjValuesCollection = [];

  showIndex = false;

  axes: IObjValuesCollection = [
    [{ label: 'Свобода', class: 'axe-1 val-1' }, { label: 'Братерство', class: 'axe-1 val-2' }, { label: 'Рівність', class: 'axe-1 val-3' }],
    [{ label: 'Війна', class: 'axe-2 val-1' }, { label: 'Релігія', class: 'axe-2 val-2' }, { label: 'Секс', class: 'axe-2 val-3' }],
    [{ label: 'Наука', class: 'axe-3 val-1' }, { label: 'Містика', class: 'axe-3 val-2' }, { label: 'Ремесло', class: 'axe-3 val-3' }],
    [{ label: 'Ієрархія', class: 'axe-4 val-1' }, { label: 'Гармонія', class: 'axe-4 val-2' }, { label: 'Хаос', class: 'axe-4 val-3' }],
  ]

  ngOnInit() {
    this.combinations = this.getCombinations(0, [], this.axes, []);
  }

  getCombinations(pos: number, combinations: IObjValuesCollection, values: IObjValuesCollection, soFar: IObjValues): IObjValuesCollection {
    if (pos === values.length) {
      combinations.push(soFar);
      return combinations;
    }
    for (let i = 0; i < values[pos].length; i++) {
      const val = values[pos][i];
      this.getCombinations(pos + 1, combinations, values, soFar.concat(values[pos][i]));
    }
    return combinations;
  }
}
