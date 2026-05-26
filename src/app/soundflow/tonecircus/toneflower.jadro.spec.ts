import { ABETKA_UA } from "./constants/abetka.constants";
import {
  cardinalByDate,
  cardinalByNumber,
  cardinalByWord,
  getIdnByNumber,
  ordinalByDate,
  ordinalByNumber,
  ordinalByWord,
} from "./helpers/abetka.helper";
import { FlowerModel, LeafModel } from "./toneflower.model";

// Spec: openspec/changes/tonecircus-numerology-rules/specs/flower-rendering/spec.md
// Requirement: Jadro — innermost ring is always the computed center
//
// These tests mirror the leaf-assembly convention used by GetOrdinalComponent
// and verify that jadro lands at index 0 of the leaves array (innermost ring).

describe("flower-rendering — jadro placement in name flower", () => {
  // Construct a name flower the same way GetOrdinalComponent.setData() does.
  const name = {
    imja: "Ростислав",
    pobat: "Олександрович",
    prizNeof: "Титаренко",
    priz: "Сірик",
  };

  const imjaNomer = ordinalByWord(ABETKA_UA, name.imja);
  const pobatNomer = ordinalByWord(ABETKA_UA, name.pobat);
  const prizNeofNomer = ordinalByWord(ABETKA_UA, name.prizNeof);
  const prizNomer = ordinalByWord(ABETKA_UA, name.priz);
  const jadroNomer = ordinalByNumber(
    "" + (imjaNomer + pobatNomer + prizNeofNomer + prizNomer)
  );

  const leafJadro: LeafModel = {
    leafOrder: 0,
    leafIdn: getIdnByNumber(jadroNomer)!,
    leafNum: cardinalByWord(ABETKA_UA, name.imja),
  };
  const leafImja: LeafModel = {
    leafOrder: 0,
    leafIdn: getIdnByNumber(imjaNomer)!,
    leafNum: cardinalByWord(ABETKA_UA, name.imja),
  };
  const leafPobat: LeafModel = {
    leafOrder: 0,
    leafIdn: getIdnByNumber(pobatNomer)!,
    leafNum: cardinalByWord(ABETKA_UA, name.pobat),
  };
  const leafPrizNeof: LeafModel = {
    leafOrder: 0,
    leafIdn: getIdnByNumber(prizNeofNomer)!,
    leafNum: cardinalByWord(ABETKA_UA, name.prizNeof),
  };
  const leafPriz: LeafModel = {
    leafOrder: 0,
    leafIdn: getIdnByNumber(prizNomer)!,
    leafNum: cardinalByWord(ABETKA_UA, name.priz),
  };

  const nameFlower: FlowerModel = {
    leaves: [leafJadro, leafImja, leafPobat, leafPrizNeof, leafPriz],
    flowerX: 0,
    flowerY: 0,
    buttSize: 12,
    leafWidth: 10,
  };

  it("name flower has exactly 5 leaves", () => {
    expect(nameFlower.leaves).toHaveLength(5);
  });

  it("leaves[0] is the jadro (computed center)", () => {
    expect(nameFlower.leaves[0].leafIdn.ordinal).toEqual(jadroNomer);
  });

  it("jadro ordinal equals (sum of part ordinals) % 12 || 12", () => {
    const expected =
      (imjaNomer + pobatNomer + prizNeofNomer + prizNomer) % 12 || 12;
    expect(jadroNomer).toEqual(expected);
  });
});

describe("flower-rendering — jadro placement in date flower", () => {
  // Construct a date flower the same way GetOrdinalComponent.setData() does.
  const date = { denj: "24", misjacj: "08", rik: "1991" };

  const denNomer = ordinalByNumber(date.denj);
  const misNomer = ordinalByNumber(date.misjacj);
  const rikNomer = ordinalByNumber(date.rik);
  const jadroNomer = ordinalByNumber("" + (denNomer + misNomer + rikNomer));

  const leafJadro: LeafModel = {
    leafOrder: 0,
    leafIdn: getIdnByNumber(jadroNomer)!,
    leafNum: cardinalByDate(`${date.denj}.${date.misjacj}.${date.rik}`),
  };
  const leafDen: LeafModel = {
    leafOrder: 0,
    leafIdn: getIdnByNumber(denNomer)!,
    leafNum: cardinalByNumber(date.denj),
  };
  const leafMis: LeafModel = {
    leafOrder: 0,
    leafIdn: getIdnByNumber(misNomer)!,
    leafNum: cardinalByNumber(date.misjacj),
  };
  const leafRik: LeafModel = {
    leafOrder: 0,
    leafIdn: getIdnByNumber(rikNomer)!,
    leafNum: cardinalByNumber(date.rik),
  };

  const dateFlower: FlowerModel = {
    leaves: [leafJadro, leafDen, leafMis, leafRik],
    flowerX: 0,
    flowerY: 0,
    buttSize: 12,
    leafWidth: 10,
  };

  it("date flower has exactly 4 leaves", () => {
    expect(dateFlower.leaves).toHaveLength(4);
  });

  it("leaves[0] is the jadro (computed center)", () => {
    expect(dateFlower.leaves[0].leafIdn.ordinal).toEqual(jadroNomer);
  });

  it("jadro ordinal matches ordinalByDate('24.08.1991') = 7", () => {
    expect(jadroNomer).toEqual(ordinalByDate("24.08.1991"));
    expect(jadroNomer).toEqual(7);
  });
});
