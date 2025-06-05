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
  ordinalByNumber,
  ordinalByWord,
} from "src/app/soundflow/tonecircus/helpers/abetka.helper";
import {
  IdnNameOut,
  IdnNameIn,
  IdnDateIn,
  IdnDateOut,
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
    prizvysce: "Сірик",
  };

  public nameOut: IdnNameOut = {
    imja: null,
    pobatjkovi: null,
    prizvysceNeoficijne: null,
    prizvysce: null,
    jadro: null,
  };

  public dateIn: IdnDateIn = {
    denj: "24",
    misjacj: "08",
    rik: "1991",
  };

  public dateOut: IdnDateOut = {
    denj: null,
    misjacj: null,
    rik: null,
    jadro: null,
  };

  public ordinalByWord = ordinalByWord;
  public ordinalByDate = ordinalByDate;

  public cardinalByWord = cardinalByWord;
  public cardinalByDate = cardinalByDate;

  setResult() {
    // Imja
    const obImja = ordinalByWord(this.nameIn.imja);
    const obPobat = ordinalByWord(this.nameIn.pobatjkovi);
    const obPrNeof = ordinalByWord(this.nameIn.prizvysceNeoficijne);
    const obPr = ordinalByWord(this.nameIn.prizvysce);
    this.nameOut.imja = getIdnByNumber(obImja) || null;
    this.nameOut.pobatjkovi = getIdnByNumber(obPobat) || null;
    this.nameOut.prizvysceNeoficijne = getIdnByNumber(obPrNeof) || null;
    this.nameOut.prizvysce = getIdnByNumber(obPr) || null;
    this.nameOut.jadro =
      getIdnByNumber(cardinalByWord(this.nameIn.imja)) || null;

    // Data
    const obd = ordinalByNumber(this.dateIn.denj);
    const obm = ordinalByNumber(this.dateIn.misjacj);
    const obr = ordinalByNumber(this.dateIn.rik);
    this.dateOut.denj = getIdnByNumber(obd) || null;
    this.dateOut.misjacj = getIdnByNumber(obm) || null;
    this.dateOut.rik = getIdnByNumber(obr) || null;
    this.dateOut.jadro =
      getIdnByNumber(ordinalByNumber("" + obd + obm + obr)) || null;

    console.log("res", obd, this.dateOut);
  }

  ngOnInit(): void {
    this.setResult();
  }
}
