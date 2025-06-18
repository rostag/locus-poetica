import {
  DataSample,
  IdnDateIn,
  IdnNameIn,
} from "src/app/soundflow/tonecircus/models/abetka.models";

const nameInMazepa: IdnNameIn = {
  imja: "Іван",
  pobatjkovi: "Степанович",
  prizvysceNeoficijne: "Колединський",
  prizvysce: "Мазепа",
};

const nameInMazepaNarodyny: IdnDateIn = {
  denj: "20",
  misjacj: "03",
  rik: "1639",
};

const dataMazepa: DataSample = "Іван,Степанович,Колединський,Мазепа,20,03,1639";
export const BUSH_SAMPLES = [
  "Іван,Степанович,Колединський,Мазепа,20,03,1639",
  "Ростислав Олександрович Титаренко Сірик 26.11.1978",
];
