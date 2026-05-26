import { ABETKA_UA } from "../constants/abetka.constants";
import {
  cardinalByNumber,
  cardinalByWord,
  getIdnByNumber,
  ordinalByDate,
  ordinalByNumber,
  ordinalByWord,
} from "./abetka.helper";

// Spec: openspec/changes/tonecircus-numerology-rules/specs/jednotka-kombinatsiya/spec.md

// Worked example from get-ordinal.component.ts comments:
//   imja=6 (blakytnyj/F), pobat=6, prizNeof=6, priz=9 (zolotyj/G#)
//   den=2 (červonyj/C#), mis=11 (sribnyj/A#), rik=10 (perlynovyj/A)
// Combinations:
//   1. imjaDen = (6+2) % 12 = 8 (fioletovyj/G)
//   2. pobatMis = (6+11) % 12 = 17 % 12 = 5 (zelenyj/E)
//   3. prizNeofPrizRik = (6+9+10) % 12 = 25 % 12 = 1 (čornyj/C)
//   4. jadro = (8+5+1) % 12 = 14 % 12 = 2 (červonyj/C#)

describe("jednotka-kombinatsiya — pojedOut ordinal calculation", () => {
  const imjaNomer = 6;
  const pobatNomer = 6;
  const prizNeofNomer = 6;
  const prizNomer = 9;
  const denNomer = 2;
  const misjacNomer = 11;
  const rikNomer = 10;

  const imjaDenNomer = ordinalByDate(`${imjaNomer}.${denNomer}`);
  const pobatMisjacNomer = ordinalByDate(`${pobatNomer}.${misjacNomer}`);
  const prizNeofPrizRikNomer = ordinalByDate(
    `${prizNeofNomer}.${prizNomer}.${rikNomer}`
  );
  const pojednanoJadroNomer = ordinalByDate(
    `${imjaDenNomer}.${pobatMisjacNomer}.${prizNeofPrizRikNomer}`
  );

  it("imjaDenNomer = (6 + 2) % 12 = 8 (fioletovyj/G)", () => {
    expect(imjaDenNomer).toEqual(8);
    expect(getIdnByNumber(imjaDenNomer)!.note).toEqual("G");
  });

  it("pobatMisjacNomer = (6 + 11) % 12 = 5 (zelenyj/E)", () => {
    expect(pobatMisjacNomer).toEqual(5);
    expect(getIdnByNumber(pobatMisjacNomer)!.note).toEqual("E");
  });

  it("prizNeofPrizRikNomer = (6 + 9 + 10) % 12 = 1 (čornyj/C)", () => {
    expect(prizNeofPrizRikNomer).toEqual(1);
    expect(getIdnByNumber(prizNeofPrizRikNomer)!.note).toEqual("C");
  });

  it("pojednanoJadroNomer = (8 + 5 + 1) % 12 = 2 (červonyj/C#)", () => {
    expect(pojednanoJadroNomer).toEqual(2);
    expect(getIdnByNumber(pojednanoJadroNomer)!.note).toEqual("C#");
  });
});

// Worked cardinal example from get-ordinal.component.ts comments:
//   1. 3+8=11. 1+1=2  (3 = імʼя Ростислав, 8 = денj 26)
//   2. 6+2=8           (6 = по батькові, 2 = misjacj 11 → 1+1=2)
//   3. 3+9+7=19 → 10 → 1  (PrNeof + PrOf + Rik)
//   4. 2+8+1=11 → 2

describe("jednotka-kombinatsiya — pojedOut cardinal calculation", () => {
  const imjaCyslo = 3;
  const denCyslo = 8;
  const pobatCyslo = 6;
  const misjacCyslo = 2;
  const prizNeofCyslo = 3;
  const prizCyslo = 9;
  const rikCyslo = 7;

  const imjaDenCyslo = cardinalByNumber("" + imjaCyslo + denCyslo);
  const pobatMisjacCyslo = cardinalByNumber("" + pobatCyslo + misjacCyslo);
  const prizNeofPrizRikCyslo = cardinalByNumber(
    "" + prizNeofCyslo + prizCyslo + rikCyslo
  );
  const pojednanoJadroCyslo = cardinalByNumber(
    "" + imjaDenCyslo + pobatMisjacCyslo + prizNeofPrizRikCyslo
  );

  it("imjaDenCyslo: cardinalByNumber('38') = 3+8 = 11 → 2", () => {
    expect(imjaDenCyslo).toEqual(2);
  });

  it("pobatMisjacCyslo: cardinalByNumber('62') = 8", () => {
    expect(pobatMisjacCyslo).toEqual(8);
  });

  it("prizNeofPrizRikCyslo: cardinalByNumber('397') = 19 → 10 → 1", () => {
    expect(prizNeofPrizRikCyslo).toEqual(1);
  });

  it("pojednanoJadroCyslo: cardinalByNumber('281') = 11 → 2", () => {
    expect(pojednanoJadroCyslo).toEqual(2);
  });
});

// SlovoComponent's per-character analysis (legacy 4-char shorthand)
describe("jednotka-kombinatsiya — SlovoComponent 4-char word path", () => {
  // Mirrors the leaf-assembly logic in SlovoComponent.setData() for a 4-char word.
  function buildSlovoLeaves(abetka: typeof ABETKA_UA, word: string) {
    const imjaNomer = ordinalByWord(abetka, word[0]);
    const pobatNomer = ordinalByWord(abetka, word[1]);
    const prizNeofNomer = ordinalByWord(abetka, word[2]);
    const prizNomer = ordinalByWord(abetka, word[3]);
    const jadroNomer = ordinalByNumber(
      "" + (imjaNomer + pobatNomer + prizNeofNomer + prizNomer)
    );
    return {
      ordinals: { imjaNomer, pobatNomer, prizNeofNomer, prizNomer, jadroNomer },
      leaves: [
        { leafOrder: 0, leafIdn: getIdnByNumber(jadroNomer)!, leafNum: 0 },
        { leafOrder: 0, leafIdn: getIdnByNumber(imjaNomer)!, leafNum: 0 },
        { leafOrder: 0, leafIdn: getIdnByNumber(pobatNomer)!, leafNum: 0 },
        { leafOrder: 0, leafIdn: getIdnByNumber(prizNeofNomer)!, leafNum: 0 },
        { leafOrder: 0, leafIdn: getIdnByNumber(prizNomer)!, leafNum: 0 },
      ],
    };
  }

  it("4-character word 'РОСТ' produces a 5-leaf flower (jadro + 4 letters)", () => {
    const { leaves } = buildSlovoLeaves(ABETKA_UA, "РОСТ");
    expect(leaves).toHaveLength(5);
  });

  it("'РОСТ' jadro = (9+7+10+11) % 12 = 1 (чорний / C)", () => {
    const { ordinals } = buildSlovoLeaves(ABETKA_UA, "РОСТ");
    expect(ordinals.imjaNomer).toEqual(9);
    expect(ordinals.pobatNomer).toEqual(7);
    expect(ordinals.prizNeofNomer).toEqual(10);
    expect(ordinals.prizNomer).toEqual(11);
    expect(ordinals.jadroNomer).toEqual(1);
  });

  it("leaves[0] is the jadro", () => {
    const { leaves, ordinals } = buildSlovoLeaves(ABETKA_UA, "РОСТ");
    expect(leaves[0].leafIdn.ordinal).toEqual(ordinals.jadroNomer);
  });
});

// Cardinal helper smoke test for completeness
describe("jednotka-kombinatsiya — cardinal helper interplay", () => {
  it("cardinalByWord('Ростислав') + cardinalByNumber('26') reduce to 2", () => {
    // From the existing fixture: Ростислав → 3, 26 → 8; '38' → 11 → 2
    const ros = cardinalByWord(ABETKA_UA, "Ростислав");
    const den = cardinalByNumber("26");
    expect(cardinalByNumber("" + ros + den)).toEqual(2);
  });
});
