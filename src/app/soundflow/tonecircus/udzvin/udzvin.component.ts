import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { MatSliderModule } from "@angular/material/slider";

import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { RouterModule } from "@angular/router";
import { BUSH_SAMPLES } from "src/app/soundflow/tonecircus/constants/sample.constants";
import {
  abetkaByName,
  cardinalByNumber,
  cardinalByWord,
  getIdnByNumber,
  ordinalByNumber,
  ordinalByWord,
} from "src/app/soundflow/tonecircus/helpers/abetka.helper";
import {
  Abetka,
  AbetkaName,
  IdnNameIn,
  IdnNameOut,
} from "src/app/soundflow/tonecircus/models/abetka.models";
import {
  BUSH_LOC,
  IC,
  PLANT_CENTER,
} from "src/app/soundflow/tonecircus/toneflower.constants";
import {
  BushModel,
  FlowerModel,
  LeafModel,
} from "src/app/soundflow/tonecircus/toneflower.model";
import { IdnComponent } from "../idn/idn.component";

import { ukrMova1000 } from "src/app/generator/components/models/ukr.mova.1000.model";

@Component({
  selector: "app-udzvin",
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
    MatCheckboxModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,

  templateUrl: "./udzvin.component.html",
  styleUrl: "./udzvin.component.css",
  standalone: true,
})
export class UDzvinComponent implements OnInit {
  @Input() set refresh(val: number) {
    this.setData();
  }

  @Output() onBushUpdate = new EventEmitter<BushModel>();

  JSON = JSON;

  abetka: Abetka = abetkaByName("Ukrajinsjka");

  useName: boolean = true;

  nameIn: IdnNameIn = {
    imja: "",
    pobatjkovi: "",
    prizvysceNeoficijne: "",
    prizvysce: "",
  };

  nameOut: IdnNameOut = {
    imja: null,
    pobatjkovi: null,
    prizvysceNeoficijne: null,
    prizvysce: null,
    jadro: null,
  };

  ordinalByWord = ordinalByWord;
  cardinalByWord = cardinalByWord;

  handleAbetkaSelect(evt: Event) {
    const val = (evt.currentTarget as any)?.value;
    this.abetka = abetkaByName(val as AbetkaName);
    this.setData();
  }

  setInputs() {
    const sample = BUSH_SAMPLES[0].split(",");
    this.nameIn.imja = sample[0];
    this.nameIn.pobatjkovi = sample[1];
    this.nameIn.prizvysceNeoficijne = sample[2];
    this.nameIn.prizvysce = sample[3];
  }

  setRandomWord() {
    const dict = ukrMova1000.split("\n");
    const l = dict.length;
    const word1 = dict[Math.round(Math.random() * l)];
    const word2 = dict[Math.round(Math.random() * l)];
    const word3 = dict[Math.round(Math.random() * l)];
    const word4 = dict[Math.round(Math.random() * l)];
    this.nameIn = {
      imja: word1,
      pobatjkovi: word2,
      prizvysceNeoficijne: word3,
      prizvysce: word4,
    };
  }

  setData() {
    // Imja
    const imjaNomer = ordinalByWord(this.abetka, this.nameIn.imja);
    const pobatNomer = ordinalByWord(this.abetka, this.nameIn.pobatjkovi);
    const prizNeofNomer = ordinalByWord(
      this.abetka,
      this.nameIn.prizvysceNeoficijne
    );
    const prizNomer = ordinalByWord(this.abetka, this.nameIn.prizvysce);
    const jadroNomer = ordinalByNumber(
      "" + (imjaNomer + pobatNomer + prizNeofNomer + prizNomer)
    );
    const imjaCyslo = cardinalByWord(this.abetka, this.nameIn.imja);
    const pobatCyslo = cardinalByWord(this.abetka, this.nameIn.pobatjkovi);
    const prizNeofCyslo = cardinalByWord(
      this.abetka,
      this.nameIn.prizvysceNeoficijne
    );
    const prizCyslo = cardinalByWord(this.abetka, this.nameIn.prizvysce);
    const jadroCyslo = cardinalByNumber(
      "" + (imjaCyslo + pobatCyslo + prizNeofCyslo + prizCyslo)
    );
    this.nameOut.imja = getIdnByNumber(imjaNomer) || null;
    this.nameOut.pobatjkovi = getIdnByNumber(pobatNomer) || null;
    this.nameOut.prizvysceNeoficijne = getIdnByNumber(prizNeofNomer) || null;
    this.nameOut.prizvysce = getIdnByNumber(prizNomer) || null;
    this.nameOut.jadro = getIdnByNumber(jadroNomer) || null;

    const leafImja: LeafModel = {
      leafOrder: 0,
      leafIdn: this.nameOut.imja!,
      leafNum: imjaCyslo,
    };
    const leafPobatkovi: LeafModel = {
      leafOrder: 0,
      leafIdn: this.nameOut.pobatjkovi!,
      leafNum: pobatCyslo,
    };
    const leafPrizNeof: LeafModel = {
      leafOrder: 0,
      leafIdn: this.nameOut.prizvysceNeoficijne!,
      leafNum: prizNeofCyslo,
    };
    const leafPriz: LeafModel = {
      leafOrder: 0,
      leafIdn: this.nameOut.prizvysce!,
      leafNum: prizCyslo,
    };
    const leafJadro: LeafModel = {
      leafOrder: 0,
      leafIdn: this.nameOut.jadro!,
      leafNum: jadroCyslo,
    };

    const nameFlower: FlowerModel = {
      leaves: [leafJadro, leafImja, leafPobatkovi, leafPrizNeof, leafPriz],
      flowerX: PLANT_CENTER[0],
      flowerY: PLANT_CENTER[1] + BUSH_LOC.marginTop(),
      buttSize: IC.flowerButtSize,
      leafWidth: IC.flowerLeafWidth,
    };

    const flowers: FlowerModel[] = [];
    if (this.useName) {
      flowers.push(nameFlower);
    }
    const newBush: BushModel = {
      flowers,
    };

    this.onBushUpdate.emit(newBush);
  }

  ngOnInit(): void {
    this.setInputs();
    // this.setRandomWord();
    this.setData();
  }
}
