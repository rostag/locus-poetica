import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { latynize } from 'src/app/generator/generator-helpers';

/*
  Latynize Ukrainian Text
*/

@Component({
  selector: 'app-latynizator',
  templateUrl: './latynizator.component.html',
  styleUrls: ['./latynizator.component.css']
})
export class LatynizatorComponent implements OnInit {

  latForm: UntypedFormGroup;
  output: string;

  constructor(private fb: UntypedFormBuilder) {}

  
  public ngOnInit() {
    const textControl = this.fb.control('', Validators.required);
    this.latForm = this.fb.group({
      text: textControl
    })
    textControl.valueChanges.subscribe((val) => {
      this.output = latynize(val)
    })
  }


  // TODO - Move to helper
  public copyText(event: MouseEvent) {
    event.preventDefault;
    event.stopPropagation();
    let val = '';
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    const today = new Date().toDateString();
    // const framework = this.dictionary.name + ' / ' + this.rhyme.name;
    // selBox.value = `${framework} - ${today} \n\n${val} \n* * *\n\n`;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

}
