import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatSliderModule } from "@angular/material/slider";
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";
import { MatButtonModule } from "@angular/material/button";
import { MatExpansionModule } from "@angular/material/expansion";

import { RouterModule } from "@angular/router";
import {
  cardinalByDate,
  cardinalByWord,
  ordinalByDate,
  ordinalByWord,
} from "src/app/soundflow/tonecircus/helpers/abetka.helper";

@Component({
  selector: "app-abetka",
  imports: [
    RouterModule,
    MatSliderModule,
    FormsModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatExpansionModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,

  templateUrl: "./abetka.component.html",
  styleUrl: "./abetka.component.css",
  standalone: true,
})
export class AbetkaComponent implements OnInit {
  readonly panelOpenState = signal(true);

  public example1 = "Ростислав";
  public example1date = "24.08.1991";
  public JSON = JSON;
  public ordinalByWord = ordinalByWord;
  public ordinalByDate = ordinalByDate;

  public example2 = "Ростислав";
  public example2date = "24.08.1991";
  public cardinalByWord = cardinalByWord;
  public cardinalByDate = cardinalByDate;

  ngOnInit(): void {}
}
