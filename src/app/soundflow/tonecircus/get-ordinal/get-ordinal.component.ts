import {
  ChangeDetectionStrategy,
  Component,
  effect,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { BushArrangementService } from "../bush-arrangement.service";
import { FormsModule } from "@angular/forms";
import { MatSliderModule } from "@angular/material/slider";
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";
import { MatButtonModule } from "@angular/material/button";
import { MatExpansionModule } from "@angular/material/expansion";

import { RouterModule } from "@angular/router";
import {
  abetkaByName,
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
  IdnPojedOut,
  IdnRozpakovkaOut,
  IdnRozpakovkaRingIn,
  Abetka,
  AbetkaName,
} from "src/app/soundflow/tonecircus/models/abetka.models";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { IdnComponent } from "../idn/idn.component";
import {
  BushModel,
  FlowerModel,
  LeafModel,
} from "src/app/soundflow/tonecircus/toneflower.model";
import {
  IC,
  BUSH_LOC,
  PLANT_CENTER,
} from "src/app/soundflow/tonecircus/toneflower.constants";
import { BUSH_SAMPLES } from "src/app/soundflow/tonecircus/constants/sample.constants";
import { MatCheckboxModule } from "@angular/material/checkbox";
import dayjs from "dayjs";
import { kobzar } from "src/app/generator/components/models/poetry.model.kob";
import { ukrMova1000 } from "src/app/generator/components/models/ukr.mova.1000.model";

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
    MatCheckboxModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,

  templateUrl: "./get-ordinal.component.html",
  styleUrl: "./get-ordinal.component.css",
  standalone: true,
})
export class GetOrdinalComponent implements OnInit {
  private arrangementService = inject(BushArrangementService);
  private _initialized = false;

  constructor() {
    effect(() => {
      this.arrangementService.mainPreset();
      this.arrangementService.rozpakovkaPreset();
      this.arrangementService.mainCustomPositions();
      this.arrangementService.rozpakovkaCustomPositions();
      if (this._initialized) this.setData();
    });
  }

  @Input() set refresh(val: number) {
    this.setData();
  }

  @Output() onBushUpdate = new EventEmitter<BushModel>();
  @Output() onRozpakovkaBushUpdate = new EventEmitter<BushModel>();

  JSON = JSON;

  abetka: Abetka = abetkaByName("Ukrajinsjka");

  useName: boolean = true;

  useDate: boolean = true;

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

  dateIn: IdnDateIn = {
    denj: "",
    misjacj: "",
    rik: "",
  };

  dateOut: IdnDateOut = {
    denj: null,
    misjacj: null,
    rik: null,
    jadro: null,
  };

  pojedOut: IdnPojedOut = {
    imjaDenj: null,
    pobatMisjacj: null,
    prNeofPrRik: null,
    jadro: null,
  };

  rozpakovkaOut: IdnRozpakovkaOut = {
    jadroImeniDen: null,
    imjaDen: null,
    pobatMisjacj: null,
    prNeofPrRik: null,
  };

  rozpakovkaRingIn: IdnRozpakovkaRingIn | null = null;

  ordinalByWord = ordinalByWord;
  ordinalByDate = ordinalByDate;
  cardinalByWord = cardinalByWord;
  cardinalByDate = cardinalByDate;

  handleAbetkaSelect(evt: Event) {
    const val = (evt.currentTarget as any)?.value;
    this.abetka = abetkaByName(val as AbetkaName);
    this.setData();
  }

  setUseDate(toUse: any) {
    this.useDate = toUse;
    this.setData();
  }

  setUseName(toUse: any) {
    this.useName = toUse;
    this.setData();
  }

  setInputs() {
    const sample = BUSH_SAMPLES[0].split(",");
    this.nameIn.imja = sample[0];
    this.nameIn.pobatjkovi = sample[1];
    this.nameIn.prizvysceNeoficijne = sample[2];
    this.nameIn.prizvysce = sample[3];
    this.dateIn.denj = sample[4];
    this.dateIn.misjacj = sample[5];
    this.dateIn.rik = sample[6];
  }

  setDateInput(date: Date) {
    const day = dayjs(date).date();
    const month = dayjs(date).month();
    const year = dayjs(date).year();
    this.dateIn = {
      denj: "" + day,
      misjacj: "" + (month + 1),
      rik: "" + year,
    };
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
      this.nameIn.prizvysceNeoficijne,
    );
    const prizNomer = ordinalByWord(this.abetka, this.nameIn.prizvysce);
    const jadroNomer = ordinalByNumber(
      "" + (imjaNomer + pobatNomer + prizNeofNomer + prizNomer),
    );
    const imjaCyslo = cardinalByWord(this.abetka, this.nameIn.imja);
    const pobatCyslo = cardinalByWord(this.abetka, this.nameIn.pobatjkovi);
    const prizNeofCyslo = cardinalByWord(
      this.abetka,
      this.nameIn.prizvysceNeoficijne,
    );
    const prizCyslo = cardinalByWord(this.abetka, this.nameIn.prizvysce);
    const jadroCyslo = cardinalByNumber(
      "" + (imjaCyslo + pobatCyslo + prizNeofCyslo + prizCyslo),
    );
    this.nameOut.imja = getIdnByNumber(imjaNomer) || null;
    this.nameOut.pobatjkovi = getIdnByNumber(pobatNomer) || null;
    this.nameOut.prizvysceNeoficijne = getIdnByNumber(prizNeofNomer) || null;
    this.nameOut.prizvysce = getIdnByNumber(prizNomer) || null;
    this.nameOut.jadro = getIdnByNumber(jadroNomer) || null;

    // Data
    const denNomer = ordinalByNumber(this.dateIn.denj);
    const denCyslo = cardinalByNumber(this.dateIn.denj);
    const misjacNomer = ordinalByNumber(this.dateIn.misjacj);
    const misjacCyslo = cardinalByNumber(this.dateIn.misjacj);
    const rikNomer = ordinalByNumber(this.dateIn.rik);
    const rikCyslo = cardinalByNumber(this.dateIn.rik);
    const jadroDateNomer = ordinalByNumber(
      "" + (denNomer + misjacNomer + rikNomer),
    );
    const jadroDateCyslo = cardinalByDate(
      this.dateIn.denj + "." + this.dateIn.misjacj + "." + this.dateIn.rik,
    );
    this.dateOut.denj = getIdnByNumber(denNomer) || null;
    this.dateOut.misjacj = getIdnByNumber(misjacNomer) || null;
    this.dateOut.rik = getIdnByNumber(rikNomer) || null;
    this.dateOut.jadro = getIdnByNumber(jadroDateNomer) || null;

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

    const namePos = this.useDate
      ? this.arrangementService.positionsForFlower("main", 0)
      : (PLANT_CENTER as [number, number]);
    const nameFlower: FlowerModel = {
      leaves: [leafJadro, leafImja, leafPobatkovi, leafPrizNeof, leafPriz],
      flowerX: namePos[0],
      flowerY: namePos[1] + BUSH_LOC.marginTop(),
      buttSize: IC.flowerButtSize,
      leafWidth: IC.flowerLeafWidth,
    };

    // Data
    const leafDen: LeafModel = {
      leafOrder: 0,
      leafIdn: this.dateOut.denj!,
      leafNum: denCyslo,
    };
    const leafMis: LeafModel = {
      leafOrder: 0,
      leafIdn: this.dateOut.misjacj!,
      leafNum: misjacCyslo,
    };
    const leafRik: LeafModel = {
      leafOrder: 0,
      leafIdn: this.dateOut.rik!,
      leafNum: rikCyslo,
    };
    const leafJadroDate: LeafModel = {
      leafOrder: 0,
      leafIdn: this.dateOut.jadro!,
      leafNum: cardinalByDate(
        this.dateIn.denj + "." + this.dateIn.misjacj + "." + this.dateIn.rik,
      ),
    };

    const datePos = this.useName
      ? this.arrangementService.positionsForFlower("main", 1)
      : (PLANT_CENTER as [number, number]);
    const dateFlower: FlowerModel = {
      leaves: [leafJadroDate, leafDen, leafMis, leafRik],
      flowerX: datePos[0],
      flowerY: datePos[1] + BUSH_LOC.marginTop(),
      buttSize: IC.flowerButtSize,
      leafWidth: IC.flowerLeafWidth,
    };

    // Поєднання
    // Pokazuju na prykladi tvogo portretu, jak rahuvaty pojednannja
    // Rozrahunok pojednannja imeni ta daty narodžennja

    // 1.⁠ ⁠vlasne im'ja + denj narodžennja
    // 2.⁠ ⁠po batjkovi + masjacj narodžennja
    // 3.⁠ ⁠prizvyšče neoficijne + prizvyšče + rik narodžennja
    // 4.⁠ ⁠jadro = summa pokaznykiv

    // Pryklad (kolir/zvuk)
    // 1.⁠ ⁠6 (blakytnyj/fa) + 2 (červonyj/do#) = 8 (fioletovyj/solj)
    // 2.⁠ ⁠6 (blakytnyj/fa) + 11 (sribnyj/lja#) = 17. 17 - 12 = 5 (zelenyj/mi)
    // 3.⁠ ⁠6 (blakytnyj/fa) + 9 (zolotyj/solj#) + 10 (perlynovyj/lja) = 25. 25 - (12×2) = 1 (čornyj/do)
    // 4.⁠ ⁠8 (fioletovyj/solj) + 5 (zelenyj/mi) + 1 (čornyj/do) = 14. 14 - 12 = 2 (červonyj/do#)

    // Pryklad (čyslo)
    // 1.⁠ ⁠3+8=11. 1+1=2 (де 3 - число Ростислава, 8 - число дня народження (26))
    // 2.⁠ ⁠6+2=8 (6 - число Олександрович, 2 - число місяця (11: 1+1 = 2))
    // 3.⁠ ⁠3+9+7=19. 1+9=10. 1+0=1 (ПрНеоф + ПрОф + Рік)
    // 4.⁠ ⁠2+8+1=11. 1+1=2 ()

    // P.S. Jak variant, №4 možna skladaty naprjamu vid iznačaljnyh pokaznykiv jadra:
    // 4.⁠ ⁠3 (pomarančevyj/re) + 11 (sribnyj/lja#) = 14. 14 - 12 = 2 (červonyj/do#)
    //     3+8=11. 1+1=2

    const imjaDenNomer = ordinalByDate("" + imjaNomer + "." + denNomer);
    const imjaDenCyslo = cardinalByNumber("" + imjaCyslo + denCyslo);
    const poBatMisjacNomer = ordinalByDate("" + pobatNomer + "." + misjacNomer);
    const poBatMisjacCyslo = cardinalByNumber("" + pobatCyslo + misjacCyslo);
    const prizNeofPrizRikNomer = ordinalByDate(
      "" + prizNeofNomer + "." + prizNomer + "." + rikNomer,
    );
    const prizNeofPrizRikCyslo = cardinalByNumber(
      "" + prizNeofCyslo + prizCyslo + rikCyslo,
    );
    const pojednanoJadroNomer = ordinalByDate(
      "" + imjaDenNomer + "." + poBatMisjacNomer + "." + prizNeofPrizRikNomer,
    );
    const pojednanoJadroCyslo = cardinalByNumber(
      "" + imjaDenCyslo + poBatMisjacCyslo + prizNeofPrizRikCyslo,
    );

    this.pojedOut.imjaDenj = getIdnByNumber(imjaDenNomer)!;
    this.pojedOut.pobatMisjacj = getIdnByNumber(poBatMisjacNomer)!;
    this.pojedOut.prNeofPrRik = getIdnByNumber(prizNeofPrizRikNomer)!;
    this.pojedOut.jadro = getIdnByNumber(pojednanoJadroNomer)!;

    // Розпаковка
    const jadroImeniDenNomer = ordinalByDate(
      "" + jadroNomer + "." + jadroDateNomer,
    );
    const jadroImeniDenCyslo = cardinalByNumber(
      "" + jadroCyslo + jadroDateCyslo,
    );
    this.rozpakovkaOut.jadroImeniDen = getIdnByNumber(jadroImeniDenNomer)!;
    this.rozpakovkaOut.imjaDen = getIdnByNumber(imjaDenNomer)!;
    this.rozpakovkaOut.pobatMisjacj = getIdnByNumber(poBatMisjacNomer)!;
    this.rozpakovkaOut.prNeofPrRik = getIdnByNumber(prizNeofPrizRikNomer)!;

    const leafImjaDen: LeafModel = {
      leafOrder: 0,
      leafIdn: this.pojedOut.imjaDenj,
      leafNum: imjaDenCyslo,
    };
    const leafPoBatMisjac: LeafModel = {
      leafOrder: 0,
      leafIdn: this.pojedOut.pobatMisjacj,
      leafNum: poBatMisjacCyslo,
    };
    const leafPrizNeofPrizRik: LeafModel = {
      leafOrder: 0,
      leafIdn: this.pojedOut.prNeofPrRik,
      leafNum: prizNeofPrizRikCyslo,
    };
    const leafPojednanoJadro: LeafModel = {
      leafOrder: 0,
      leafIdn: this.pojedOut.jadro,
      leafNum: pojednanoJadroCyslo,
    };

    const pojedPos = this.arrangementService.positionsForFlower("main", 2);
    // 3
    const pojedFlower: FlowerModel = {
      leaves: [
        leafPojednanoJadro,
        leafImjaDen,
        leafPoBatMisjac,
        leafPrizNeofPrizRik,
      ],
      flowerX: pojedPos[0],
      flowerY: pojedPos[1] + BUSH_LOC.marginTop(),
      buttSize: IC.flowerButtSize,
      leafWidth: IC.flowerLeafWidth,
    };

    const flowers: FlowerModel[] = [];
    if (this.useName) {
      flowers.push(nameFlower);
    }
    if (this.useDate) {
      flowers.push(dateFlower);
    }
    if (this.useDate && this.useName) {
      flowers.push(pojedFlower);

      const rp0 = this.arrangementService.positionsForFlower("rozpakovka", 0);
      const rp1 = this.arrangementService.positionsForFlower("rozpakovka", 1);
      const rp2 = this.arrangementService.positionsForFlower("rozpakovka", 2);
      const rp3 = this.arrangementService.positionsForFlower("rozpakovka", 3);
      const rozpakovkaBush: BushModel = {
        flowers: [
          {
            leaves: [
              {
                leafOrder: 0,
                leafIdn: this.rozpakovkaOut.jadroImeniDen!,
                leafNum: jadroImeniDenCyslo,
              },
              {
                leafOrder: 0,
                leafIdn: this.nameOut.jadro!,
                leafNum: jadroCyslo,
              },
              {
                leafOrder: 0,
                leafIdn: this.dateOut.jadro!,
                leafNum: jadroDateCyslo,
              },
            ],
            flowerX: rp0[0],
            flowerY: rp0[1] + BUSH_LOC.marginTop(),
            buttSize: IC.flowerButtSize,
            leafWidth: IC.flowerLeafWidth,
          },
          {
            leaves: [
              {
                leafOrder: 0,
                leafIdn: this.rozpakovkaOut.imjaDen!,
                leafNum: imjaDenCyslo,
              },
              { leafOrder: 0, leafIdn: this.nameOut.imja!, leafNum: imjaCyslo },
              { leafOrder: 0, leafIdn: this.dateOut.denj!, leafNum: denCyslo },
            ],
            flowerX: rp1[0],
            flowerY: rp1[1] + BUSH_LOC.marginTop(),
            buttSize: IC.flowerButtSize,
            leafWidth: IC.flowerLeafWidth,
          },
          {
            leaves: [
              {
                leafOrder: 0,
                leafIdn: this.rozpakovkaOut.pobatMisjacj!,
                leafNum: poBatMisjacCyslo,
              },
              {
                leafOrder: 0,
                leafIdn: this.nameOut.pobatjkovi!,
                leafNum: pobatCyslo,
              },
              {
                leafOrder: 0,
                leafIdn: this.dateOut.misjacj!,
                leafNum: misjacCyslo,
              },
            ],
            flowerX: rp2[0],
            flowerY: rp2[1] + BUSH_LOC.marginTop(),
            buttSize: IC.flowerButtSize,
            leafWidth: IC.flowerLeafWidth,
          },
          {
            leaves: [
              {
                leafOrder: 0,
                leafIdn: this.rozpakovkaOut.prNeofPrRik!,
                leafNum: prizNeofPrizRikCyslo,
              },
              {
                leafOrder: 0,
                leafIdn: this.nameOut.prizvysceNeoficijne!,
                leafNum: prizNeofCyslo,
              },
              {
                leafOrder: 0,
                leafIdn: this.nameOut.prizvysce!,
                leafNum: prizCyslo,
              },
              { leafOrder: 0, leafIdn: this.dateOut.rik!, leafNum: rikCyslo },
            ],
            flowerX: rp3[0],
            flowerY: rp3[1] + BUSH_LOC.marginTop(),
            buttSize: IC.flowerButtSize,
            leafWidth: IC.flowerLeafWidth,
          },
        ],
      };
      this.onRozpakovkaBushUpdate.emit(rozpakovkaBush);

      this.rozpakovkaRingIn = {
        rows: [
          {
            inputs: [this.dateOut.jadro!, this.nameOut.jadro!],
            result: this.rozpakovkaOut.jadroImeniDen!,
          },
          {
            inputs: [this.dateOut.denj!, this.nameOut.imja!],
            result: this.rozpakovkaOut.imjaDen!,
          },
          {
            inputs: [this.dateOut.misjacj!, this.nameOut.pobatjkovi!],
            result: this.rozpakovkaOut.pobatMisjacj!,
          },
          {
            inputs: [
              this.dateOut.rik!,
              this.nameOut.prizvysce!,
              this.nameOut.prizvysceNeoficijne!,
            ],
            result: this.rozpakovkaOut.prNeofPrRik!,
          },
        ],
      };
    } else {
      this.rozpakovkaRingIn = null;
      this.onRozpakovkaBushUpdate.emit({ flowers: [] });
    }
    const newBush: BushModel = {
      flowers,
    };

    this.onBushUpdate.emit(newBush);
  }

  ngOnInit(): void {
    this.setInputs();
    // this.setDateInput(new Date());
    // this.setRandomWord();
    this.setData();
    this._initialized = true;
  }
}
