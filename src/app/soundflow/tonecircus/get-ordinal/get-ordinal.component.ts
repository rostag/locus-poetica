import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
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
  cardinalByNumber,
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
import {
  BushModel,
  FlowerModel,
  LeafModel,
} from "src/app/soundflow/tonecircus/toneflower.model";
import { IC } from "src/app/soundflow/tonecircus/toneflower.constants";

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
  @Output() onBushUpdate = new EventEmitter<BushModel>();
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

    const leafImja: LeafModel = {
      leafOrder: 0,
      leafIdn: this.nameOut.imja!,
      leafNum: cardinalByWord(this.nameIn.imja),
    };
    const leafPob: LeafModel = {
      leafOrder: 0,
      leafIdn: this.nameOut.pobatjkovi!,
      leafNum: cardinalByWord(this.nameIn.pobatjkovi),
    };
    const leafPN: LeafModel = {
      leafOrder: 0,
      leafIdn: this.nameOut.prizvysceNeoficijne!,
      leafNum: cardinalByWord(this.nameIn.prizvysceNeoficijne),
    };
    const leafPriz: LeafModel = {
      leafOrder: 0,
      leafIdn: this.nameOut.prizvysce!,
      leafNum: cardinalByWord(this.nameIn.prizvysce),
    };
    const leafJadro: LeafModel = {
      leafOrder: 0,
      leafIdn: this.nameOut.jadro!,
      leafNum: cardinalByWord(this.nameIn.imja),
    };

    const nameFlower: FlowerModel = {
      leaves: [leafJadro, leafImja, leafPob, leafPN, leafPriz],
      flowerX: 150, // 150
      flowerY: 230, // 230
      buttSize: IC.flowerButtSize,
      leafWidth: IC.flowerLeafWidth,
    };

    // Data
    const leafDen: LeafModel = {
      leafOrder: 0,
      leafIdn: this.dateOut.denj!,
      leafNum: cardinalByNumber(this.dateIn.denj),
    };
    const leafMis: LeafModel = {
      leafOrder: 0,
      leafIdn: this.dateOut.misjacj!,
      leafNum: cardinalByNumber(this.dateIn.denj),
    };
    const leafRik: LeafModel = {
      leafOrder: 0,
      leafIdn: this.dateOut.rik!,
      leafNum: cardinalByNumber(this.dateIn.denj),
    };
    const leafJadroDate: LeafModel = {
      leafOrder: 0,
      leafIdn: this.dateOut.jadro!,
      leafNum: cardinalByDate(
        this.dateIn.denj + "." + this.dateIn.misjacj + "." + this.dateIn.rik
      ),
    };

    const dateFlower: FlowerModel = {
      leaves: [leafJadroDate, leafDen, leafMis, leafRik],
      flowerX: 80, // 150
      flowerY: 132, // 230
      buttSize: IC.flowerButtSize,
      leafWidth: IC.flowerLeafWidth,
    };

    const newBush: BushModel = {
      flowers: [nameFlower, dateFlower],
    };

    this.onBushUpdate.emit(newBush);
  }

  ngOnInit(): void {
    this.setResult();
  }
}
