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
}
export interface IAudio {
  name?: string,
  enabled: boolean
}

export interface IGeneratorState {
  audio: IAudio[];
  connections: IConnection[];
}

export const generatorState: IGeneratorState = {
  audio: [{
    enabled: true,
    name: 'kick'
  }, {
    enabled: false,
    name: 'speech1'
  }, {
    enabled: false,
    name: 'speech2'
  }],
  connections: [{
    source: 'kick',
    target: 'randomize',
  }, {
    source: 'speech1',
    target: 'resizeFont',
  }, {
    source: 'speech2',
    target: 'retext',
  }],
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
