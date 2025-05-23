import { Component } from '@angular/core';

export interface IConnection {
  source: any;
  target: any;
}
export interface ISample {
  name: string;
  interval?: number; // Set duration of one
  audioContext?: AudioContext;
  audioBuffer?: AudioBuffer;
  bufferSource?: AudioBufferSourceNode;
  mode?: 'default' | 'silent';
}
export interface IAudio {
  name?: string
  enabled: boolean
  interval: number
}

export interface IGeneratorState {
  audio: IAudio[];
  connections: IConnection[];
}

export const generatorState: IGeneratorState = {
  connections: [{
    source: 're:text',
    target: 'retext',
  }, {
    source: 're:size',
    target: 'resizeFont',
  }, {
    source: 're:color',
    target: 'recolor',
  }],
  audio: [{
    name: 're:text',
    enabled: true,
    interval: 300,
  }, {
    name: 're:size',
    enabled: false,
    interval: 600,
  }, {
    name: 're:color',
    enabled: false,
    interval: 1000,
  }],
}
@Component({
    selector: 'app-generator',
    templateUrl: './generator.component.html',
    styleUrls: ['./generator.component.scss'],
    standalone: false
})

export class GeneratorComponent {
  public generatorState = generatorState;

  public open(event: any) {
    event.enabled = true;
  }
}
