import { signal } from "@angular/core";
import { BushModel, IDN } from "./toneflower.model";

// Init Config
export const IC = {
  bushId: 1,
  padAngle: 0.01,
  padAngleMax: 0.1,
  flowerButtSize: 12,
  flowerLeafWidth: 10,
};

export const BUSH_LOC = {
  marginTop: signal(20),
};

export const PLANT_POINTS = [
  [162, 231],
  [80, 137],
  [165, 60],
];

export const PLANT_CENTER = [125, 150];

/**
 * The 12-entry chromatic IDN (Identity-Number) table.
 *
 * Spec: openspec/specs/numerology-ordinal/spec.md — Requirement: IDN — color+note identity record
 *
 * Each IDN binds an ordinal (1–12) to a chromatic musical note (C, C#, D, …, B)
 * and a color (Ukrainian color name + hex). This table is the result side of
 * the ordinal reduction: any `ordinalByWord` / `ordinalByDate` output indexes
 * into here to yield the visual + audible identity of a leaf.
 */
export const IDNS: IDN[] = [
  { ordinal: 1, color: "čornyj", note: "C", colorHex: "#151210" }, // noop
  { ordinal: 2, color: "červonyj", note: "C#", colorHex: "#bd1e1e" }, // upd
  { ordinal: 3, color: "pomarančevyj", note: "D", colorHex: "#d9792b" }, // upd
  { ordinal: 4, color: "žovtyj", note: "D#", colorHex: "#e0a536" }, // upd
  { ordinal: 5, color: "zelenyj", note: "E", colorHex: "#32963a" }, // upd
  { ordinal: 6, color: "blakytnyj", note: "F", colorHex: "#56acc7" }, // upd
  { ordinal: 7, color: "synij", note: "F#", colorHex: "#266696" }, // upd
  { ordinal: 8, color: "fioletovyj", note: "G", colorHex: "#9091B6" }, // noop
  { ordinal: 9, color: "zolotyj", note: "G#", colorHex: "#BE9C5C" }, // noop
  { ordinal: 10, color: "perlynovyj", note: "A", colorHex: "#f2f2dc" }, // upd
  { ordinal: 11, color: "sribnyj", note: "A#", colorHex: "#DBDFE5" }, // noop
  { ordinal: 12, color: "bilyj", note: "B", colorHex: "#f5f5f5" }, // upd
];

const byIdnId = (idnid: number) =>
  IDNS.find((idn) => idn.ordinal === idnid) || IDNS[0];

export const SAMPLE_BUSHMODELS: BushModel[] = [
  {
    flowers: [
      {
        flowerX: PLANT_POINTS[0][0],
        flowerY: PLANT_POINTS[0][1] + BUSH_LOC.marginTop(),
        buttSize: IC.flowerButtSize,
        leafWidth: IC.flowerLeafWidth,
        leaves: [
          {
            leafIdn: byIdnId(1),
            leafNum: 1,
            leafOrder: 0,
          },
        ],
      },
    ],
  },
  {
    flowers: [
      {
        flowerX: 150,
        flowerY: 230,
        buttSize: IC.flowerButtSize,
        leafWidth: IC.flowerLeafWidth,
        leaves: [
          {
            leafIdn: byIdnId(3),
            leafNum: 3,
            leafOrder: 0,
          },
          {
            leafIdn: byIdnId(6),
            leafNum: 3,
            leafOrder: 1,
          },
          {
            leafIdn: byIdnId(6),
            leafNum: 6,
            leafOrder: 2,
          },
          {
            leafIdn: byIdnId(6),
            leafNum: 3,
            leafOrder: 3,
          },
          {
            leafIdn: byIdnId(9),
            leafNum: 9,
            leafOrder: 4,
          },
        ],
      },
      {
        flowerX: PLANT_POINTS[1][0],
        flowerY: PLANT_POINTS[1][1],
        buttSize: IC.flowerButtSize,
        leafWidth: IC.flowerLeafWidth,
        leaves: [
          {
            leafIdn: byIdnId(11),
            leafNum: 8,
            leafOrder: 0,
          },
          {
            leafIdn: byIdnId(2),
            leafNum: 8,
            leafOrder: 1,
          },
          {
            leafIdn: byIdnId(11),
            leafNum: 2,
            leafOrder: 2,
          },
          {
            leafIdn: byIdnId(10),
            leafNum: 7,
            leafOrder: 3,
          },
        ],
      },
      {
        flowerX: PLANT_POINTS[2][0],
        flowerY: PLANT_POINTS[2][1],
        buttSize: IC.flowerButtSize,
        leafWidth: IC.flowerLeafWidth,
        leaves: [
          {
            leafIdn: byIdnId(2),
            leafNum: 2,
            leafOrder: 0,
          },
          {
            leafIdn: byIdnId(8),
            leafNum: 2,
            leafOrder: 1,
          },
          {
            leafIdn: byIdnId(5),
            leafNum: 8,
            leafOrder: 2,
          },
          {
            leafIdn: byIdnId(1),
            leafNum: 1,
            leafOrder: 3,
          },
        ],
      },
    ],
  },
];

export const PLAY_BUSH: BushModel = SAMPLE_BUSHMODELS[0];
