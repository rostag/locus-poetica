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
  IdnPojedOut,
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
    denj: "26",
    misjacj: "11",
    rik: "1978",
  };

  public dateOut: IdnDateOut = {
    denj: null,
    misjacj: null,
    rik: null,
    jadro: null,
  };

  public pojedOut: IdnPojedOut = {
    imjaDenj: null,
    pobatMisjacj: null,
    prNeofPrRik: null,
    jadro: null,
  };

  public ordinalByWord = ordinalByWord;
  public ordinalByDate = ordinalByDate;

  public cardinalByWord = cardinalByWord;
  public cardinalByDate = cardinalByDate;

  /**
   * Розрахунок кольору та звуку 
1 - A Ї Ф
2 - Б Й Х
3 - В К Ц
4 - Г Л Ч
5 - Ґ М Ш
6 - Д Н Щ
7 - Е О Ь
8 - Є П Ю
9 - Ж Р Я
10 - З С
11 - И Т
12 - І У 

Для слова (імені) – все складаємо і далі віднімаємо 12, поки не отримаємо число  від 1 до 12.
Для дати – від цілого числа віднімаємо 12, поки не отримаємо число  від 1 до 12. 

Приклад:
Ростислав
9+7+10+11+11+10+4+1+3=66. 
66-(12×5)=6 (блакитний колір/нота фа) 

24.08.1991 р.
24-12=12 (білий/сі); 
8 (фіолетовий/соль); 
1991-(12×165)=11 (срібний/ля#); 
сумма (серединка): 12+8+11=31. 31-(12×2)=7 (синій/фа#)
   */
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
    const obDen = ordinalByNumber(this.dateIn.denj);
    const obMisjac = ordinalByNumber(this.dateIn.misjacj);
    const obRik = ordinalByNumber(this.dateIn.rik);
    this.dateOut.denj = getIdnByNumber(obDen) || null;
    this.dateOut.misjacj = getIdnByNumber(obMisjac) || null;
    this.dateOut.rik = getIdnByNumber(obRik) || null;
    this.dateOut.jadro =
      getIdnByNumber(ordinalByNumber("" + (obDen + obMisjac + obRik))) || null;

    const leafImja: LeafModel = {
      leafOrder: 0,
      leafIdn: this.nameOut.imja!,
      leafNum: cardinalByWord(this.nameIn.imja),
    };
    const leafPobatkovi: LeafModel = {
      leafOrder: 0,
      leafIdn: this.nameOut.pobatjkovi!,
      leafNum: cardinalByWord(this.nameIn.pobatjkovi),
    };
    const leafPrizNeof: LeafModel = {
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
      leaves: [leafJadro, leafImja, leafPobatkovi, leafPrizNeof, leafPriz],
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
      leafNum: cardinalByNumber(this.dateIn.misjacj),
    };
    const leafRik: LeafModel = {
      leafOrder: 0,
      leafIdn: this.dateOut.rik!,
      leafNum: cardinalByNumber(this.dateIn.rik),
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
    // 1.⁠ ⁠3+8=11. 1+1=2
    // 2.⁠ ⁠6+2=8
    // 3.⁠ ⁠3+9+7=19. 1+9=10. 1+0=1
    // 4.⁠ ⁠2+8+1=11. 1+1=2

    // P.S. Jak variant, №4 možna skladaty naprjamu vid iznačaljnyh pokaznykiv jadra:
    // 4.⁠ ⁠3 (pomarančevyj/re) + 11 (sribnyj/lja#) = 14. 14 - 12 = 2 (červonyj/do#)
    //     3+8=11. 1+1=2

    const obImjaDen = ordinalByDate("" + obImja + "." + obDen);
    const obPoBatMisjac = ordinalByDate("" + obPobat + "." + obMisjac);
    const obPrizNeofPrizRik = ordinalByDate(
      "" + obPrNeof + "." + obPr + "." + obRik
    );
    const obPojednanoJadro = ordinalByDate(
      "" + obImjaDen + "." + obPoBatMisjac + "." + obPrizNeofPrizRik
    );

    this.pojedOut.imjaDenj = getIdnByNumber(obImjaDen)!;
    this.pojedOut.pobatMisjacj = getIdnByNumber(obPoBatMisjac)!;
    this.pojedOut.prNeofPrRik = getIdnByNumber(obPrizNeofPrizRik)!;
    this.pojedOut.jadro = getIdnByNumber(obPojednanoJadro)!;

    const leafImjaDen: LeafModel = {
      leafOrder: 0,
      leafIdn: this.pojedOut.imjaDenj,
      leafNum: 1, // cardinalByNumber("" + obImjaDen),
    };
    const leafPoBatMisjac: LeafModel = {
      leafOrder: 0,
      leafIdn: this.pojedOut.pobatMisjacj,
      leafNum: 1, // cardinalByNumber("" + obPoBatMisjac),
    };
    const leafPrizNeofPrizRik: LeafModel = {
      leafOrder: 0,
      leafIdn: this.pojedOut.prNeofPrRik,
      leafNum: 1, // cardinalByNumber("" + obPrizNeofPrizRik),
    };
    const leafPojednanoJadro: LeafModel = {
      leafOrder: 0,
      leafIdn: this.pojedOut.jadro,
      leafNum: 1, // cardinalByNumber("" + obPojednanoJadro),
    };

    const pojedFlower: FlowerModel = {
      leaves: [
        leafPojednanoJadro,
        leafImjaDen,
        leafPoBatMisjac,
        leafPrizNeofPrizRik,
      ],
      flowerX: 165, // 150
      flowerY: 60, // 230
      buttSize: IC.flowerButtSize,
      leafWidth: IC.flowerLeafWidth,
    };

    const newBush: BushModel = {
      flowers: [nameFlower, dateFlower, pojedFlower],
    };

    this.onBushUpdate.emit(newBush);
  }

  ngOnInit(): void {
    this.setResult();
  }
}
