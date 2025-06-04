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
import { IdnNameSource } from "src/app/soundflow/tonecircus/models/abetka.models";
import { MatFormFieldModule } from "@angular/material/form-field";

@Component({
  selector: "app-get-ordinal",
  imports: [
    RouterModule,
    MatSliderModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatExpansionModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,

  templateUrl: "./get-ordinal.component.html",
  styleUrl: "./get-ordinal.component.css",
  standalone: true,
})
export class GetOrdinalComponent implements OnInit {
  public JSON = JSON;

  public nameSrc: IdnNameSource = {
    imja: "Ростислав",
    pobatjkovi: "Олександрович",
    prizvyščeNeoficijne: "Титаренко",
    prizvyščeOficijne: "Сірик",
  };

  public ordinalByWord = ordinalByWord;
  public ordinalByDate = ordinalByDate;

  public cardinalByWord = cardinalByWord;
  public cardinalByDate = cardinalByDate;

  ngOnInit(): void {}
}
