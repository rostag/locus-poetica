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
  IdnSlovoIn,
  IdnSlovoOut,
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
  selector: "app-slovo",
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
    MatCheckboxModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,

  templateUrl: "./slovo.component.html",
  styleUrl: "./slovo.component.css",
  standalone: true,
})
export class SlovoComponent implements OnInit {
  @Input() set refresh(val: number) {
    this.setData();
  }

  @Output() onBushUpdate = new EventEmitter<BushModel>();

  slovo: string;

  JSON = JSON;

  abetka: Abetka = abetkaByName("Ukrajinsjka");

  useName: boolean = true;

  slovoIn: IdnSlovoIn = {
    slovo: "РОСТ",
  };

  idnOut: IdnSlovoOut = {
    idnOut: [],
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
    this.slovo = sample.join("");
  }

  setRandomWord() {
    const dict = ukrMova1000.split("\n");
    const l = dict.length;
    this.slovoIn = {
      slovo: dict[Math.round(Math.random() * l)],
    };
  }

  /**
   * Spec: openspec/specs/jednotka-kombinatsiya/spec.md
   *   Requirement: SlovoComponent — variable-length word as per-character leaves
   *
   * Produces one leaf per character (capped at MAX_SLOVO_LEN) plus a jadro
   * center leaf computed from the sum of all character ordinals.
   */
  setData() {
    const MAX_SLOVO_LEN = 10000;
    const letters = (this.slovo || "").split("").slice(0, MAX_SLOVO_LEN);

    const letterOrdinals = letters.map((c) => ordinalByWord(this.abetka, c));
    const letterCardinals = letters.map((c) => cardinalByWord(this.abetka, c));

    const jadroNomer = ordinalByNumber(
      "" + letterOrdinals.reduce((a, b) => a + b, 0)
    );
    const jadroCyslo = cardinalByNumber(
      "" + letterCardinals.reduce((a, b) => a + b, 0)
    );

    this.idnOut.idnOut = letterOrdinals.map((o) => getIdnByNumber(o) || null);
    this.idnOut.jadro = getIdnByNumber(jadroNomer) || null;

    const leafJadro: LeafModel = {
      leafOrder: 0,
      leafIdn: this.idnOut.jadro!,
      leafNum: jadroCyslo,
    };
    const letterLeaves: LeafModel[] = letters.map((_c, i) => ({
      leafOrder: i + 1,
      leafIdn: this.idnOut.idnOut[i]!,
      leafNum: letterCardinals[i],
    }));

    const nameFlower: FlowerModel = {
      leaves: [leafJadro, ...letterLeaves],
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
