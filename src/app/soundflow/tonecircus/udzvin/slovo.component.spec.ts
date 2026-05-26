import { SlovoComponent } from "./slovo.component";
import { ABETKA_UA } from "../constants/abetka.constants";
import { BushModel } from "../toneflower.model";
import {
  ordinalByNumber,
  ordinalByWord,
} from "../helpers/abetka.helper";

// Spec: openspec/changes/tonecircus-numerology-rules/specs/jednotka-kombinatsiya/spec.md
// Requirement: SlovoComponent — variable-length word as per-character leaves

function runSetData(word: string): BushModel {
  const cmp = new SlovoComponent();
  cmp.abetka = ABETKA_UA;
  cmp.slovo = word;
  let emitted: BushModel | undefined;
  cmp.onBushUpdate.subscribe((b: BushModel) => (emitted = b));
  cmp.setData();
  if (!emitted) {
    throw new Error("SlovoComponent did not emit a BushModel");
  }
  return emitted;
}

describe("SlovoComponent — variable-length word support", () => {
  it("4-character word 'РОСТ' produces 5 leaves (jadro + 4 chars)", () => {
    const bush = runSetData("РОСТ");
    expect(bush.flowers[0].leaves).toHaveLength(5);
  });

  it("7-character word 'ДРУЖИНА' produces 8 leaves (jadro + 7 chars)", () => {
    const bush = runSetData("ДРУЖИНА");
    expect(bush.flowers[0].leaves).toHaveLength(8);
  });

  it("1-character word 'А' produces 2 leaves (jadro + 1 char)", () => {
    const bush = runSetData("А");
    expect(bush.flowers[0].leaves).toHaveLength(2);
  });

  it("leafOrder is monotonically increasing from jadro (0) outward", () => {
    const bush = runSetData("РОСТИСЛАВ");
    const orders = bush.flowers[0].leaves.map((l) => l.leafOrder);
    expect(orders).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it("jadro at leaf[0] equals (sum of character ordinals) % 12 || 12", () => {
    const word = "ДРУЖИНА";
    const expectedJadro = ordinalByNumber(
      "" +
        word
          .split("")
          .reduce((acc, c) => acc + ordinalByWord(ABETKA_UA, c), 0)
    );
    const bush = runSetData(word);
    expect(bush.flowers[0].leaves[0].leafIdn.ordinal).toEqual(expectedJadro);
  });

  it("'РОСТ' jadro ordinal = 1 (Р+О+С+Т = 9+7+10+11 = 37, 37 % 12 = 1)", () => {
    const bush = runSetData("РОСТ");
    expect(bush.flowers[0].leaves[0].leafIdn.ordinal).toEqual(1);
  });

  it("each character leaf carries the character's ordinal IDN", () => {
    const bush = runSetData("РОСТ");
    const leaves = bush.flowers[0].leaves;
    // leaves[0] is jadro; leaves[1..] correspond to letters in order
    expect(leaves[1].leafIdn.ordinal).toEqual(
      ordinalByWord(ABETKA_UA, "Р")
    );
    expect(leaves[2].leafIdn.ordinal).toEqual(
      ordinalByWord(ABETKA_UA, "О")
    );
    expect(leaves[3].leafIdn.ordinal).toEqual(
      ordinalByWord(ABETKA_UA, "С")
    );
    expect(leaves[4].leafIdn.ordinal).toEqual(
      ordinalByWord(ABETKA_UA, "Т")
    );
  });

  it("word longer than 10,000 characters is truncated to 10,000", () => {
    const longWord = "А".repeat(10500);
    const bush = runSetData(longWord);
    // jadro + 10000 characters = 10001 leaves
    expect(bush.flowers[0].leaves).toHaveLength(10001);
  });

  it("empty word produces a single jadro leaf", () => {
    const bush = runSetData("");
    expect(bush.flowers[0].leaves).toHaveLength(1);
    // jadro of empty word: sum=0, ordinalByNumber('0') = 12
    expect(bush.flowers[0].leaves[0].leafIdn.ordinal).toEqual(12);
  });
});
