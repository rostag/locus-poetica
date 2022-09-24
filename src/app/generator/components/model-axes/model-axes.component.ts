import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-model-axes',
  templateUrl: './model-axes.component.html',
  styleUrls: ['./model-axes.component.scss']
})

export class ModelAxesComponent implements OnInit {

  combinations = [''];

  axesAsStrings: string[][] = [
    ['Свобода'],
    ['Війна', 'Релігія'],
  ]

  // axesAsStrings: string[][] = [
  //   ['Свобода', 'Братерство', 'Рівність'],
  //   ['Війна', 'Релігія', 'Секс'],
  //   ['Наука', 'Містика', 'Ремесло'],
  //   ['Ієрархія', 'Гармонія', 'Хаос']
  // ]

  ngOnInit() {
    this.getCombinations(0, this.axesAsStrings, '');
    this.combinations.shift();
  }

  getCombinations(pos: number, c: string[][], soFar: string) {
    if (pos === c.length) {
      this.combinations.push(soFar);
      return;
    }
    for (let i = 0; i < c[pos].length; i++) {
      this.getCombinations(pos + 1, c, soFar + c[pos][i] + '. ');
    }
  }
}
