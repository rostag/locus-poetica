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
  marginTop: signal(45),
};

export const PLANT_POINTS = [
  [162, 231],
  [80, 137],
  [165, 60],
];

export const PLANT_CENTER = [125, 150];

export const ROZP_POINTS = [
  [125, 50], // flower 1 — top
  [75, 140], // flower 2 — left
  [175, 140], // flower 3 — right
  [125, 240], // flower 4 — bottom
];

export const BUSH_PRESETS: Array<{ name: string; points: [number, number][] }> = [
  { name: 'Kompozytsija', points: [[163, 68], [73, 148], [118, 235]] },
  { name: 'Duga',      points: [[60, 200],  [125, 80],  [190, 200]] },
  { name: 'Linija',    points: [[125, 230], [125, 145], [125, 60]] },
  { name: 'Romb',      points: [[125, 240], [60, 145],  [125, 50]] },
  { name: 'Klaster',   points: [[125, 175], [95, 120],  [155, 120]] },
];

export const ROZP_PRESETS: Array<{ name: string; points: [number, number][] }> = [
  { name: 'Kompozytsija', points: [[132, 60], [73, 148], [178, 148], [128, 238]] },
  { name: 'Khryst',  points: [[125, 40],  [40, 140],  [210, 140], [125, 250]] },
  { name: 'Kvadrat', points: [[80, 70],   [170, 70],  [80, 200],  [170, 200]] },
  { name: 'Linija',  points: [[125, 50],  [125, 110], [125, 180], [125, 240]] },
  { name: 'Klaster', points: [[100, 110], [150, 110], [100, 170], [150, 170]] },
];

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

// ─── Arc Info Panel ────────────────────────────────────────────────────────────

export interface ArcHoverInfo {
  colorOrdinal: number;
  leafNum: number;
  colorHex: string;
}

export const COLOR_INFO: Record<number, { name: string; description: string }> = {
  1:  { name: 'Čornyj', description: "Zazemlennja i karma.\nKolir ĝruntu: substanciji, jaka pererobljuje vidhody i je rodjučoju rečovynoju, tym, ščo daje žyttja. Kolir Tini po K.G. Jungu: arhetyp, jakyj uosobljuje ljudsjki potajemni bažannja i strahy, ta jogo projav čerez \"karmični\" žyttjevi sytuaciji. Ogyda; dystancija. Vakuum; Pramaterija; Kosmos. Temrjava. Travmatyka, jaka znahodytcja v nesvidomomu.\n3 rivni: vnutrišnja travmatyka; Tinj; nesvidome jak pidkazka (do prykladu, snovydinnja)." },
  2:  { name: 'Červonyj', description: "Kohannja i borotjba.\nKolir bazovyh bažanj: žyty, kohatysja, zahyščaty i projavljaty sebe. Kolir vojiniv, prystrasti, kohannja, žagy do žyttja. Instynktyvnistj. Gniv." },
  3:  { name: 'Pomarančevyj', description: "Ščastja i gra.\nKolir radosti, nasolody, rozslablenosti, zadovolennja, grajlyvosti. Smih, gra, masaži, tanci toščo... vse, ščo rozslabljae ta daje vidčuttja vdovolennja. Estetyzm. Tantryčnistj." },
  4:  { name: 'Žovtyj', description: "Samistj.\nKolir grošej. Pravyljnyj (egojistyčnyj, ale ne egocentryčnyj) rozpodil energiji; rozuminnja, de moji kordony, a de čuži; vminnja vidstojuvaty svoji kordony. Samostijnistj; zv'jazok zi svojeju avtentyčnistju; vidčuttja i rozuminnja svogo miscja v jedynij systemi. Biznes-myslennja: ty – meni, ja – tobi; orijentacija na vygidnu dlja oboh storin spivpracju, vminnja domovljatysja.\n3 rivni: egocentryzm (zacyklenistj na sobi); egojizm (kordony); samistj (cilisnistj)." },
  5:  { name: 'Zelenyj', description: "Ljubov i dobrota.\nKolir bazovoji dobroty i ljubovi do usjogo žyvogo; kolir počuttiv, emocij i staniv. Turbota, dbajlyvistj, spivčuttja na emocijnomu ta fizyčnomu rivnjah. Takož možlyvi: stan \"bolota\"; žalislyvistj, zazdrisnistj." },
  6:  { name: 'Blakytnyj', description: "Tvorčistj.\nKolir \"gradusu\" emocij, napryklad, spokij/legke hvyljuvannja/\"štorm\" toščo. Kolir projavu emocij, staniv ta dumok, jaki je vseredyni ljudyny. Budj-jaka tvorčistj, osoblyvo oratorsjke mystectvo, projav čerez govorinnja čy zvučannja." },
  7:  { name: 'Synij', description: "Tyša i mudristj.\nKolir medytacij, glybynnyh i tajemnyh, malodostupnyh znanj, vnutrišnjoji usvidomlenoji tyši, mudrosti. Rivenj svidomoji propracjovky \"tinjovyh\" aspektiv. Sum. Zanurennja v glybynu. Tyša, jak peršopočatok zvuku, slova, movy." },
  8:  { name: 'Fioletovyj', description: "Vlada i magija.\nKolir istynnoji vlady, pojednannja voli ta žagy do žyttja z mudristju ta žyttjevym dosvidom. Vminnja pravyljno rozporjadžatysja tym, čym volodiješ, pryvodyty do puttja, do ladu; vminnja pidtrymuvaty porjadok, lad. Mistyčnistj, magija." },
  9:  { name: 'Zolotyj', description: "Bagatstvo i slava.\nKolir alhimiji, majsternogo upravlinnja energijamy, najvyščyj stupinj materialjnogo bagatstva. Pojednannja duhovnoji ta materialjnoji storin buttja. Slava, vidomistj." },
  10: { name: 'Perlynovyj', description: "Garmonija i zv'jazok.\nKolir psyhičnogo zdorov'ja; usvidomlennja, ščo vsi žyvi istoty pov'jazani miž soboju. Rozuminnja pryčynno-naslidkovyh zv'jazkiv, mudra dobrota, tonki čutlyvistj i spivčutlyvistj. Psyhologija, psyhoterapija." },
  11: { name: 'Sribnyj', description: "Jasnistj.\nKolir centrovanosti, rivnovagy, pojednannja čornogo ta bilogo. Vnutrišnij spokij ta vidčuttja bezpeky. Zv'jazok zi svojim centrom, koly žodni zovnišni kolyvannja ne zib'jutj z nig. Kolir \"džereljnoji vody\", jaka zmyvaje use brehlyve, vykryvlene ta čužeridne, daje jasnistj, bačennja pravdy. Spokij, jak pervynnyj stan. Takož možlyvi vidčuttja porožnečy, bajdužosti, zamoroženosti počuttiv." },
  12: { name: 'Bilyj', description: "Pervynne svitlo.\nBožestvennyj kolir. Česnistj; vysvitlennja usjogo takym, jakym vono je naspravdi; čyste dzerkalo. Pervynne svitlo." },
};

export const NUMBER_INFO: Record<number, { meaning: string }> = {
  1: { meaning: "Cilj, meta, \"pocilennja strily v centr kola\", sfokusovanistj, bezapeljacijnistj, bez sumniviv, zibranistj. Orijentacija na samostijnistj." },
  2: { meaning: "Kolyvannja, vybir, analiz ta zvažennja variantiv. Orijentacija na partnerstvo." },
  3: { meaning: "Materializacija, vtilennja bažanogo, zadumanogo; udača; uspih." },
  4: { meaning: "Čotyry peršoelementa (zemlja, voda, vogonj, povitrja), čotyry storony svitu (shid, zahid, pivdenj, pivnič); odnočasno stijkistj/rivnovaga i rozšyrennja/povnota; vsebičnyj vektor naprjamku (vlivo–vpravo, vpered–nazad | vverh–vnyz, vseredynu–nazovni); kompas, orijentyr po naprjamku." },
  5: { meaning: "P'jatj organiv čuttja, tilo; usvidomlennja, hto ty je; vlastyvosti | možlyvosti tila." },
  6: { meaning: "\"Zolota seredyna\", centrovanistj, balans. Garmonija jak sutj; sercevyna, oseredok; točka, de vse shodytcja; \"zolotyj peretyn\". Doveršenistj, doskonalistj formy." },
  7: { meaning: "Lad; bačennja garmoniji (napryklad, muzyčnoji), togo, jak vlaštovan porjadok (roztašuvannja, poslidovnistj elementiv) vseredyni ta u Vsesviti (sim dniv tyžnja, sim čakr, sim not, sim koljoriv veselky toščo); sposterežennja i glybynne piznannja cjogo porjadku; mehanizm, godynnykovyh sprav majster." },
  8: { meaning: "Kub; stijkistj; važkistj, vidčuttja vagy; materija; osnova; zamknutyj, usamitnenyj prostir dlja samousvidomlennja ta samodyscypliny (može staty klitkoju); vidpovidaljnistj; usvidomlennja naslidkiv svojih dij." },
  9: { meaning: "Najvyščyj projav elementu; maksymaljne rozšyrennja; materializacija bažanogo na trjoh rivnjah." },
};

export const COMBO_INFO: Record<string, string> = {
  '1_1': "Nesvidome; Tinj; pervynna temrjava; peršoosnova; pramaterija; kosmos.",
  '1_4': "Nesvidome, Tinj, karma i vnutrišnja travmatyka jak kompas.",
  '1_7': "Porjadok i lad nesvidomogo; vnutrišnij mehanizm travmatyky.",
  '2_2': "Kohannja, palka vzajemodija, supernyctvo, borotjba; analiz kohannja, prystrasti | borotjby, agresiji; kolyvannja ta sumnivy, zvažennja variantiv v pytannjah kohannja ta projavu agresiji.",
  '2_5': "Vidčuttja povnocinnogo projavu tila, žyttjevoji energiji; vidčuttja dojednannja do svogo genetyčnogo kodu, z kym zv'jazani po krovi; kohannja | borotjba rozkryvaje te, hto ja je, projavljaie možlyvosti | vlastyvosti tila.",
  '2_8': "Vminnja strymuvaty sebe u projavi prystrasti čy agresyvnosti; usvidomlennja naslidkiv ta vidpovidaljnosti za projav fizyčnoji blyzjkosti čy agresiji; koncentruvannja, zbyrannja žyttjevoji syly.",
  '3_3': "Materializacija radosti, nasolody, estetyzmu; uspih ta ščaslyva vdača, jaki vtiljujutcja švydko i grajučysj.",
  '3_6': "Vidčuttja \"zolotoji seredyny\", rivnovagy u projavi nasolody, zadovolennja, grajlyvosti, rozslablenosti; bačennja suti ta iznačaljnogo džerela radosti, udači ta vdovolennja.",
  '3_9': "Najglybšyj ta najšyršyj projav radosti, ščastja, gry, nasolody; udača na vsih rivnjah.",
  '4_1': "Sfokusovanistj, sprjamovanistj na svoje misce v žytti; orijentacija na vlasnu avtentyčnistj; samostijne zarobljannja grošej.",
  '4_4': "Rozuminnja, jak same teče grošova energija, vminnja sprjamovuvaty jiji v potribnomu naprjamku (vidčuvannja, do kogo potribno zvernutysja, ščob energija tekla efektyvniše); avtentyčnistj i grošova energija jak orijentyr, kompas; energija grošej daje odnočasno vidčuttja stijkosti ta rozšyrennja.",
  '4_7': "Grošova energija jak častyna zagaljnoji systemy; bačennja, jak same vlaštovan porjadok v systemi grošej; rozuminnja, hto de znahodytcja, na jakomu misci, i jak ce vplyvaje na zagaljnu systemu.",
  '5_2': "Ljubov ta dobrota, ščo projavljajutcja v partnerstvi; analiz ta kolyvannja u vidčutti, prožyvanni emocij ta staniv.",
  '5_5': "Ljubov i dobrota do svogo tila, do togo, hto ja je; emocijni stany, jaki projavljajutcja čerez tilo, vplyvajutj na tilo, je častynoju togo, hto ja je.",
  '5_8': "Obmežennja, jaki nakladajutcja na projav ljubovi ta dobroty, ščob ne vpasty v žalistj čy zverhnju pozyciju; rozuminnja včasnosti vidpuskannja emocijnyh staniv, ščob ne opynytysja v \"emocijnomu boloti\" čy spryčynyty škodu; usvidomlennja naslidkiv ta vidpovidaljnosti za znahodžennja vseredyni sebe pevnyh emocijnyh staniv (\"vaj-faj\").",
  '6_3': "Materialjnyj projav tvorčosti (pysjmennyctvo, maljuvannja, stvorennja estetyčnogo kontentu toščo); zanjattja oratorsjkym mystectvom; fizyčne projavlennja usjogo spektru počuttiv (kryk, plač, govorinnja pro stany toščo).",
  '6_6': "Znahodžennja balansu, \"zolotoji seredyny\" u projavi staniv ta emocij; znahodžennja ta dolučennja do džerela tvorčogo nathnennja; vminnja pravyljno vyslovljuvatysja (gramotno i točno, vlučno).",
  '6_9': "Najpovniše vtilennja tvorčoji energiji; maksymaljno projavlene krasnomovstvo z usima tonkoščamy; piznannja škaly ta rytmiky svojih emocijnyh staniv.",
  '7_1': "Znannja jak meta, sprjamovanistj do cilisnogo znannja; samostijna propracjovka tinjovyh aspektiv; otrymannja znanj zavdjaky pošuku vidpovidej vseredyni sebe.",
  '7_4': "Mudristj, ščo služytj kompasom, vkazuje u pravyljnomu naprjamku.",
  '7_7': "Znannja, jaki pokazujutj spravžnij porjadok, istynnu garmoniju Vsesvitu.",
  '8_2': "Rozdilennja vlady z partnerom — usvidomlennja, jaka moja diljanka obov'jazkiv ta vplyvu, i jaka partnera; domovlenistj ta vzajemopovaga pry rozdilenni vlady z partnerom.",
  '8_5': "Volodinnja možlyvostjamy svogo tila; genetyčne dojednannja do pravljačoji gilky.",
  '8_8': "Usvidomlennja svojeji vidpovidaljnosti za diji ta jihni naslidky pry zajmanni vladnoji posady; obmežennja svojeji vlady — deleguvannja obov'jazkiv, včasne usunennja sebe vid vladnyh obov'jazkiv, peredača prav nastupnyku.",
  '9_3': "Udača ta uspih v dosjagnenni bagatstva ta vidomosti, slavy; vminnja dosjagty bažanogo rivnja dostatku.",
  '9_6': "Balans, vidčuttja \"zolotoji seredyny\" v dosjagnenni bagatstva ta vidomosti; rozuminnja suti \"zolotogo potoku\", majsterne upravlinnja energijeju zavdjaky jiji glybynnomu piznannju.",
  '9_9': "Maksymaljne dosjagnennja v pytanni bagatstva ta slavy, svitova vidomistj; alhimija, vidjomstvo.",
  '10_1': "Ja je Odyn/ my je Odne; bačyty vsih navkrugy jak svoju projekciju; oči Boga; zv'jazok iz samym soboju.",
  '10_4': "Ruh po emocijnym zv'jazkam; vidčuvaty, do kogo ruhatysja — do sebe čy do inšogo, do kogo konkretno, koly ta jak same.",
  '10_7': "Bačyty zv'jazok miž usima; spryjmaty vsih jak jedynyj žyvyj organizm; bačyty misce kožnogo v cjomu organizmi.",
  '11_2': "Balans v partnerstvi; jasnistj, prozoristj u vzajemynah, jaki dozvoljajutj bačyty sutj vzajemodiji; analiz, zvažennja variantiv pry obgovorenni pytanj z partnerom.",
  '11_5': "Zbalansovanistj tilesnyh možlyvostej; čitke usvidomlennja, hto ja je; vnutrišnij spokij, jasnistj u vzajemodiji z samym soboju.",
  '11_8': "Samozanurennja, medytacija; zaglyblennja u porožneču jak peršopočatok vsih staniv; stan \"džereljnoji vody\", jaka zmyvaje usi vykryvlennja, brehnju, omanu; čystota pervynnogo stanu buttja.",
  '12_3': "Duhovne pojednujetcja z materialjnym i ce narodžuje Dyvo; pervynna syla, ščo z'javljajetcja, koly dosjagajetcja cilisnistj; nadpryrodnistj.",
  '12_6': "Dojednannja do pervynnogo džerela svitla; vidčuttja vlasnoji sercevyny svitla; česnistj.",
  '12_9': "Svitlo (jasnistj, česnistj, zasvidčennja), jake zahodytj na usih rivnjah; vysvitlennja vsih momentiv žyttja; vidsutnistj \"skeletiv u šafah\", vidsutnistj Tini.",
};
