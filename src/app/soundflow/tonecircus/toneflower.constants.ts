import {
  BushCode,
  BushModel,
  IDN,
} from "src/app/soundflow/tonecircus/toneflower.model";

export const IC = {
  bushId: 0,
  padAngle: 0.01,
  padAngleMax: 2,
  flowerButtSize: 12,
  flowerLeafWidth: 10,
};

const places = [
  [150, 230],
  [80, 132],
  [165, 60],
];

export const IDNS: IDN[] = [
  { idn: 1, color: "čornyj", note: "C", colorHex: "#151210" },
  { idn: 2, color: "červonyj", note: "C#", colorHex: "#9F352B" },
  { idn: 3, color: "pomarančevyj", note: "D", colorHex: "#AA482E" },
  { idn: 4, color: "žovtyj", note: "D#", colorHex: "#D1B170" },
  { idn: 5, color: "zelenyj", note: "E", colorHex: "#366C2C" },
  { idn: 6, color: "blakytnyj", note: "F", colorHex: "#4D86B3" },
  { idn: 7, color: "synij", note: "F#", colorHex: "#163063" },
  { idn: 8, color: "fioletovyj", note: "G", colorHex: "#9091B6" },
  { idn: 9, color: "zolotyj", note: "G#", colorHex: "#BE9C5C" },
  { idn: 10, color: "perlynovyj", note: "A", colorHex: "#E5E3D5" },
  { idn: 11, color: "sribnyj", note: "A#", colorHex: "#DBDFE5" },
  { idn: 12, color: "bilyj", note: "B", colorHex: "#B7B9B4" },
];

const byIdnId = (idnid: number) =>
  IDNS.find((idn) => (idn.idn = idnid)) || IDNS[0];

export const SAMPLE_BUSHMODELS: BushModel[] = [
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
        flowerX: 80,
        flowerY: 132,
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
        flowerX: 165,
        flowerY: 60,
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

export const SAMPLE_BUSHES: BushCode[] = [
  {
    flowers: [
      [
        [3, 3],
        [6, 3],
        [6, 6],
        [6, 3],
        [9, 9],
      ],
      [
        [11, 8],
        [2, 8],
        [11, 2],
        [10, 7],
      ],
      [
        [2, 2],
        [8, 2],
        [5, 8],
        [1, 1],
      ],
    ],
    places,
  },
  {
    flowers: [
      [
        [1, 2],
        [2, 3],
        [3, 4],
        [4, 2],
      ],
      [
        [5, 2],
        [6, 3],
        [7, 4],
      ],
      [
        [8, 2],
        [9, 3],
        [10, 4],
      ],
    ],
    places,
  },
  {
    flowers: [
      [
        [12, 1],
        [11, 2],
        [10, 3],
        [9, 4],
        [8, 5],
        [7, 6],
        [6, 7],
        [5, 8],
        [4, 9],
        [3, 10],
        [2, 11],
        [1, 12],
        [2, 10],
        [3, 9],
        [4, 6],
        [5, 2],
        [6, 3],
        [7, 1],
        [8, 4],
        [9, 1],
        [10, 2],
        [11, 1],
        [12, 1],
        [11, 2],
        [10, 3],
        [9, 4],
        [8, 5],
        [7, 6],
        [6, 7],
        [5, 8],
        [4, 9],
        [3, 10],
        [2, 11],
        [1, 12],
        [2, 10],
        [3, 9],
        [4, 6],
        [5, 2],
        [6, 3],
        [7, 1],
        [8, 4],
        [9, 1],
        [10, 2],
        [11, 1],
        [12, 1],
        [11, 2],
        [10, 3],
        [9, 4],
        [8, 5],
        [7, 6],
        [6, 7],
        [5, 8],
        [4, 9],
        [3, 10],
        [2, 11],
        [1, 12],
      ],
    ],
    places,
  },
];

export const PLAY_BUSH: BushCode = {
  flowers: [[[1, 1]]],
  places: [[156, 170]],
};
