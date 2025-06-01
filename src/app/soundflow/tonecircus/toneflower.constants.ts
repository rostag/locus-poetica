import { BushModel } from "src/app/soundflow/tonecircus/toneflower.model";

const ASSIGNED_SEED = [1, 2, 3];

const places = [
  [150, 230],
  [80, 132],
  [165, 60],
];

export const SAMPLE_BUSHES: BushModel[] = [
  {
    flowers: [
      [6, 6, 6, 9],
      [2, 11, 10],
      [8, 5, 1],
    ],
    places,
  },
  {
    flowers: [
      [1, 2, 3, 4],
      [5, 6, 7],
      [8, 9, 10],
    ],
    places,
  },
  {
    flowers: [
      [
        12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
        12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
        12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1,
      ],
    ],
    places,
  },
];

export const PLAY_BUSH: BushModel = {
  flowers: [[1]],
  places: [[156, 170]],
};
