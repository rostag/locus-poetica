import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { latynka } from 'src/app/generator/components/models/latynka.model';
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

  replacements = Object.entries(latynka);

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
  public copyToClipboard(event: MouseEvent) {
    event.preventDefault;
    event.stopPropagation();
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.output;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

}
