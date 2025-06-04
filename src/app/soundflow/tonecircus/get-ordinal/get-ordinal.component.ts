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
  getIdnByNumber,
  ordinalByDate,
  ordinalByWord,
} from "src/app/soundflow/tonecircus/helpers/abetka.helper";
import {
  IdnNameOut,
  IdnNameIn,
} from "src/app/soundflow/tonecircus/models/abetka.models";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { IdnComponent } from "../idn/idn.component";

@Component({
  selector: "app-get-ordinal",
  imports: [
    RouterModule,
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatExpansionModule,
    IdnComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,

  templateUrl: "./get-ordinal.component.html",
  styleUrl: "./get-ordinal.component.css",
  standalone: true,
})
export class GetOrdinalComponent implements OnInit {
  public JSON = JSON;

  public nameIn: IdnNameIn = {
    imja: "Ростислав",
    pobatjkovi: "Олександрович",
    prizvysceNeoficijne: "Титаренко",
    prizvyšče: "Сірик",
  };

  public nameOut: IdnNameOut = {
    imja: null,
    pobatjkovi: null,
    prizvysceNeoficijne: null,
    prizvysce: null,
  };

  public ordinalByWord = ordinalByWord;
  public ordinalByDate = ordinalByDate;

  public cardinalByWord = cardinalByWord;
  public cardinalByDate = cardinalByDate;

  setResult() {
    const ona = ordinalByWord(this.nameIn.imja);
    this.nameOut.imja = getIdnByNumber(ona) || null;
    this.nameOut.pobatjkovi =
      getIdnByNumber(ordinalByWord(this.nameIn.pobatjkovi)) || null;
    this.nameOut.prizvysceNeoficijne =
      getIdnByNumber(ordinalByWord(this.nameIn.prizvysceNeoficijne)) || null;
    this.nameOut.prizvysce =
      getIdnByNumber(ordinalByWord(this.nameIn.prizvyšče)) || null;

    console.log("res", ona, this.nameOut.imja);
  }

  ngOnInit(): void {
    this.setResult();
  }
}
