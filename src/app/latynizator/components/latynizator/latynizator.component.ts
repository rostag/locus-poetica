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

  updateReplacement($event: any, index: number) {
    const value = $event.target.value;
    const targetPair = this.replacements[index];
    latynka[targetPair[0]] = value;
    this.updateOutput();
  }

  latForm: UntypedFormGroup;
  output: string;

  replacements = Object.entries(latynka);

  constructor(private fb: UntypedFormBuilder) {}

  public ngOnInit() {
    const textControl = this.fb.control(`Не журюсь я, а не спиться
Часом до півночі,
Усе світять ті блискучі
Твої чорні очі. `, Validators.required);
    this.latForm = this.fb.group({
      text: textControl
    })
    textControl.valueChanges.subscribe((val) => {
      this.updateOutput()
    })

    requestAnimationFrame(() => {
      this.updateOutput();
    })
  }

  updateOutput() {
    this.output = latynize(this.latForm.get('text')?.value);
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
