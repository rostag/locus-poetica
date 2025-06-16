import {
  cardinalByDate,
  cardinalByNumber,
  cardinalByWord,
  ordinalByDate,
  ordinalByWord,
} from "./abetka.helper";

// On NG Jest testing: https://dev.to/fransaoco/testing-angular-simple-components-with-jest-47c

type NameCase = [string, number, string];

describe("Abetka", () => {
  beforeEach(async () => {});

  /**
   * 1. Там, де має бути число 1, виходить 10 - де має бути коло без поділок, показує 10 поділок.
   * 2. Зробити імʼя білим: Басова - білий колір, ядро має бути також білим, а вийшло - помаранчевим.
   */

  /**
    Ірина: 3 (помаранчевий); 18.9 (запис — якщо одна цифра, 
    це буде колір, якщо число з крапкою, то це розрахунок портретного числа)
    Ірина: 3+3+2+9+1=18. 1+8=9
    Вікторівна: 7; 37.1
    Юлія: 9; 21.3
    Василівна: 3; 33.6
    Григорій: 10; 25.7
    Вікторович: 10; 28.1
  */

  const nameCases: NameCase[] = [
    ["Ірина", 3, "18.9"],
    ["Вікторівна", 7, "37.1"],
    ["Юлія", 9, "21.3"],
    ["Василівна", 3, "33.6"],
    ["Григорій", 10, "25.7"],
    ["Вікторович", 10, "28.1"],
    ["Ростислав", 6, "30.3"],
  ];

  it("should get ordinal and cardinal by word", () => {
    nameCases.forEach((nameCase: NameCase) => {
      const name = nameCase[0];
      const ordinal = nameCase[1];
      const portraitNum = parseInt(nameCase[2].split(".")[1], 10);
      expect(ordinalByWord(name)).toEqual(ordinal);
      expect(cardinalByWord(name)).toEqual(portraitNum);
    });
  });

  /**
   * 09.07.1972: 8; 17.8
   * 24.08.1992: 8; 17.8
   * 20.02.2014: 8; 11.2
   * 24.02.2022: 8; 14.5
   * 22.03.1993: 2; 11.2
   * 27.10.1997: 6; 18.9
   */
  const dateCases = [
    ["24.08.1991", 7, "30.7"],
    ["09.07.1972", 8, "17.8"],
    ["24.08.1992", 8, "17.8"],
    ["20.02.2014", 8, "11.2"],
    ["24.02.2022", 8, "14.5"],
    ["22.03.1993", 2, "11.2"],
    ["27.10.1997", 6, "18.9"],
    // ["09.11.2014", ],
    // ["01.10.2023", ],
    ["28.06.2022", 4, "???.4"],
  ];
  it("should get ordinal by date", () => {
    expect(ordinalByDate("24.08.1991")).toEqual(7);
    dateCases.forEach((dateCase: NameCase) => {
      expect(ordinalByDate(dateCase[0])).toEqual(dateCase[1]);
      expect(cardinalByDate(dateCase[0])).toEqual(
        parseInt(dateCase[2].split(".")[1], 10)
      );
    });
  });

  // Cardinal by number
  const cardinalCases = [
    // 28.06.2022
    ["28", 1],
  ];

  it("should get cardinalByNumber", () => {
    cardinalCases.forEach((c: [string, number]) => {
      expect(cardinalByNumber(c[0])).toEqual(c[1]);
    });
  });
});
