import { Component, Input, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatSliderModule } from "@angular/material/slider";

import { MatDividerModule } from "@angular/material/divider";
import { MatButtonModule } from "@angular/material/button";

import { RouterModule } from "@angular/router";
import { IDN } from "src/app/soundflow/tonecircus/toneflower.model";

import { ChangeDetectionStrategy } from "@angular/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";

@Component({
  selector: "app-idn",
  imports: [
    RouterModule,
    MatSliderModule,
    FormsModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./idn.component.html",
  styleUrl: "./idn.component.css",
  standalone: true,
})
export class IdnComponent implements OnInit {
  public JSON = JSON;

  @Input({ required: true }) idn!: IDN;

  private initForm() {
    console.log("iform");
  }

  ngOnInit(): void {
    this.initForm();
  }
}
