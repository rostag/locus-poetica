import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatSliderModule } from "@angular/material/slider";
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";
import { MatButtonModule } from "@angular/material/button";

import { RouterModule } from "@angular/router";
import { IDNS } from "src/app/soundflow/tonecircus/toneflower.constants";
import { LeafModel } from "src/app/soundflow/tonecircus/toneflower.model";
import { IdnComponent } from "src/app/soundflow/tonecircus/idn/idn.component";

@Component({
  selector: "app-flowerinput",
  imports: [
    RouterModule,
    MatSliderModule,
    FormsModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    IdnComponent,
  ],
  templateUrl: "./flowerinput.component.html",
  styleUrl: "./flowerinput.component.css",
  standalone: true,
})
export class FlowerInputComponent implements OnInit {
  public leaves: LeafModel[] = [
    {
      leafIdn: IDNS[0],
      leafNum: 1,
      leafOrder: 0,
    },
  ];

  private initForm() {
    console.log("iform");
  }

  ngOnInit(): void {
    this.initForm();
  }
}
