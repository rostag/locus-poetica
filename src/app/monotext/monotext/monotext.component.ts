import { Component, OnInit } from '@angular/core';
import { MonotextService } from '../monotext.service';

@Component({
    selector: 'app-monotext',
    templateUrl: './monotext.component.html',
    styleUrls: ['./monotext.component.css'],
    standalone: false
})
export class MonotextComponent implements OnInit {

  constructor(
    protected monoService: MonotextService
  ) { }

  result = '';

  textInput = 'hi';

  flags = {
    monospace: true,
    script: false,
    fraktur: false,
    double: false,
    sans: false,
    greek: false,
  }

  flags2 = {
    bold: false,
    italic: false,
    underline: false,
    strike: false,
  }

  ngOnInit(): void {
    this.render();
  }

  setText(evt: InputEvent) {
    this.textInput = evt?.target?.['value'];
    this.render();
  }

  render() {
    const flags: any[] = [];
    for (let f in this.flags) {
      if (this.flags[f]) {
        flags.push('-' + f);
      }
    }
    for (let f in this.flags2) {
      if (this.flags2[f]) {
        flags.push('-' + f);
      }
    }
    
    this.result = this.monoService.mono(flags, this.textInput)!
  }

}
