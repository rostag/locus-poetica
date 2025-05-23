import { Component, OnInit } from "@angular/core";
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import {
  latynka,
  setLatynka,
} from "src/app/generator/components/models/latynka.model";
import { latynize } from "src/app/generator/generator-helpers";

/*
  Latynize Ukrainian Text
*/

@Component({
    selector: "app-latynizator",
    templateUrl: "./latynizator.component.html",
    styleUrls: ["./latynizator.component.css"],
    standalone: false
})
export class LatynizatorComponent implements OnInit {
  latForm: UntypedFormGroup;
  output: string;
  replacements = Object.entries(latynka);

  constructor(private fb: UntypedFormBuilder) {}

  public ngOnInit() {
    const textControl = this.fb.control(
      `Не журюсь я, а не спиться
Часом до півночі,
Усе світять ті блискучі
Твої чорні очі. `,
      Validators.required
    );

    this.latForm = this.fb.group({
      text: textControl,
    });

    textControl.valueChanges.subscribe((val) => {
      this.updateOutput();
    });

    requestAnimationFrame(() => {
      this.updateOutput();
    });
  }

  switchDirection() {
    const rev = this.replacements.map((pair) => pair.reverse());
    setLatynka(Object.fromEntries(rev));
    this.replacements = Object.entries(latynka);
    this.updateOutput();
  }

  updateReplacement($event: any, index: number) {
    const value = $event.target.value;
    const targetPair = this.replacements[index];
    latynka[targetPair[0]] = value;
    this.updateOutput();
  }

  updateOutput() {
    this.output = latynize(this.latForm.get("text")?.value);
  }

  private setCopyBox(value: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = value;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand("copy");
    document.body.removeChild(selBox);
  }

  // TODO - Move to helper
  public copyToClipboard(event: MouseEvent) {
    event.preventDefault;
    event.stopPropagation();
    this.setCopyBox(this.output);
  }

  public replacementsToClipboard(event: MouseEvent) {
    event.preventDefault;
    event.stopPropagation();
    this.setCopyBox(JSON.stringify(latynka, null, 2));
  }

}
