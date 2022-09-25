import { Component, OnInit, ViewEncapsulation } from '@angular/core';

type IStrValue = string;
type IStrValues = IStrValue[];
type IStrValuesCollection = IStrValues[];

type INumValue = number;
type INumValues = INumValue[];
type INumValuesCollection = INumValues[];

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

  combinations: IStrValues = [''];

  showIndex = false;

  axesAsStrings: IStrValuesCollection = [
    ['Свобода', 'Братерство', 'Рівність'],
    ['Війна', 'Релігія', 'Секс'],
    ['Наука', 'Містика', 'Ремесло'],
    ['Ієрархія', 'Гармонія', 'Хаос']
  ]

  axesAsNumbers: INumValuesCollection = [
    [0, 1],
    [0, 1],
  ]

  axesAObjects: IObjValuesCollection = [
    [{ label: 'Свобода', class: 'axe-1 val-1' }, { label: 'Братерство', class: 'axe-1 val-2' }],
    [{ label: 'Війна', class: 'axe-2 val-1' }, { label: 'Релігія', class: 'axe-2 val-2' }],
  ]

  ngOnInit() {
    this.combinations = this.getCombinations(0, [''], this.axesAObjects, '');
    this.combinations.shift();
  }

  getCombinations(pos: number, combinations: string[], obj: IObjValuesCollection, soFar: string): string[] {
    if (pos === obj.length) {
      combinations.push(soFar);
      return combinations;
    }
    for (let i = 0; i < obj[pos].length; i++) {
      const val = obj[pos][i];
      this.getCombinations(pos + 1, combinations, obj, soFar + this.formatOutput(i, val));
    }
    return combinations;
  }

  formatOutput = (i: number, val: iObj) => `<span class="${val.class}">${this.showIndex ? i + ': ' : ''}${val.label}.</span>`;
}
