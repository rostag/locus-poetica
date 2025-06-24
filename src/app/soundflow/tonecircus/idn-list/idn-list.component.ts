import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatSliderModule } from "@angular/material/slider";

import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";

import { RouterModule } from "@angular/router";
import { IDN } from "src/app/soundflow/tonecircus/toneflower.model";

import { ChangeDetectionStrategy } from "@angular/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { IDNS } from "src/app/soundflow/tonecircus/toneflower.constants";
import { IdnComponent } from "../idn/idn.component";

@Component({
  selector: "app-idn-list",
  imports: [
    RouterModule,
    MatSliderModule,
    FormsModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    IdnComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./idn-list.component.html",
  styleUrl: "./idn-list.component.css",
  standalone: true,
})
export class IdnListComponent implements OnInit {
  emitData() {
    this.onIdnUpdate.emit();
  }
  public JSON = JSON;
  IDNS: IDN[] = IDNS;

  @Output() onIdnUpdate = new EventEmitter();

  ngOnInit(): void {}
}
