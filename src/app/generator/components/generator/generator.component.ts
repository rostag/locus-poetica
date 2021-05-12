
import { Component } from '@angular/core';

export interface IGeneratorState {
  audio: [
    {
      name?: string,
      enabled: boolean
    }
  ]
}
export const generatorState = {
  audio: [{ enabled: true, name: 'kick' }, { enabled: false, name: 'speech2' }]
}
@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss']
})

export class GeneratorComponent {
  public generatorState = generatorState;

  public open(event: any) {
    event.enabled = true;
  }
}
