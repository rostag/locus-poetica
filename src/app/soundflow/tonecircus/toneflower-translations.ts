export interface ToneflowerStrings {
  intro: string;
  labelKolir: string;
  labelCyslo: string;
  labelPjednannja: string;
  labelVidstupZgory: string;
  btnShowNumber: string;
  btnBgColor: string;
  panelInfoLabel: string;
  btnCopyLayout: string;
  btnCopied: string;
  labels: {
    imja: string;
    pobatjkovi: string;
    prizvysceNeoficijne: string;
    prizvysce: string;
    data: string;
    denj: string;
    misjacj: string;
    rik: string;
    selectUkrainska: string;
    selectUkrLatynka: string;
    selectMoskalska: string;
    selectAnglijska: string;
    selectKrymsjkotatarsjka: string;
    labelYadro: string;
    labelRozmir: string;
  };
  abetka: {
    panelTitle: string;
    h2ColorSound: string;
    ruleForWord: string;
    labelPryklad: string;
    autoResult: string;
    exName1result: string;
    exDate1result: string;
    h2Number: string;
    ruleForNumber: string;
    exDate2summary: string;
    h2Summary: string;
    summaryResult: string;
    h3ComboTitle: string;
    comboRules: string;
    h3ExColorSound: string;
    exColorSound: string;
    h3ExNumber: string;
    exNumber: string;
    ps: string;
    exPs: string;
    colorNoteTitle: string;
    colorNoteTable: string;
    rozpakovkaBlock: string;
    daliTitle: string;
    daliItems: string;
  };
  colors: Record<number, { name: string; description: string }>;
  numbers: Record<number, { meaning: string }>;
  combos: Record<string, string>;
}

export const TRANSLATIONS: Record<"uk" | "lat", ToneflowerStrings> = {
  lat: {
    intro:
      "Naveditj kursor na koljorove kiljce kvitky, ščob pobačyty jogo značennja.\n\nNatysnitj na kiljce, ščob zakripyty informaciju.",
    labelKolir: "KOLIR",
    labelCyslo: "ČYSLO",
    labelPjednannja: "POJEDNANNJA",
    labelVidstupZgory: "Vidstup zgory:",
    btnShowNumber: "pokazuvaty čyslo",
    btnBgColor: "kolir fonu",
    panelInfoLabel: "info",
    btnCopyLayout: "copy layout JSON",
    btnCopied: "copied!",
    labels: {
      imja: "Im'ja",
      pobatjkovi: "Po-batjkovi",
      prizvysceNeoficijne: "Prizvyšče neoficijne",
      prizvysce: "Prizvyšče",
      data: "Data",
      denj: "Denj",
      misjacj: "Misjacj",
      rik: "Rik",
      selectUkrainska: "Ukrajinsjka",
      selectUkrLatynka: "Ukrajinsjka Latynka",
      selectMoskalska: "Moskaljsjka",
      selectAnglijska: "Anglijsjka",
      selectKrymsjkotatarsjka: "Krymsjkotatarsjka",
      labelYadro: "Jadro",
      labelRozmir: "Rozmir",
    },
    abetka: {
      panelTitle: "Algorytmy",
      h2ColorSound: "Rozrahunok koljoru ta zvuku",
      ruleForWord:
        "Dlja slova (imeni) – vse skladajemo i dali vidnimajemo 12, poky ne otrymajemo čyslo  vid 1 do 12.\nDlja daty – vid cilogo čysla vidnimajemo 12, poky ne otrymajemo čyslo  vid 1 do 12.",
      labelPryklad: "Pryklad:",
      autoResult: "Avtomatyčnyj rezuljtat:",
      exName1result: "66-(12×5)=6 (blakytnyj kolir/nota fa)",
      exDate1result:
        "24-12=12 (bilyj/si); \n8 (fioletovyj/solj); \n1991-(12×165)=11 (sribnyj/lja#); \nsuma (seredynka): 12+8+11=31. 31-(12×2)=7 (synij/fa#)",
      h2Number: "2. Rozrahunok čysla",
      ruleForNumber: "Vse skladajemo, poky ne otrymajemo čyslo vid 1 do 9.",
      exDate2summary: "summa (seredynka): 6+8+2=16. 1+6=7",
      h2Summary: "3. Pidsumok",
      summaryResult:
        "Ростислав: blakytna 3 (trijka); fa \n\ndenj 24: bila 6 (šistj); si\nmisjacj 08: fioletova 8 (visim);solj\nrik 1991: sribna 2 (dvijka); lja#\nseredyna: synja 7 (sim); fa#",
      h3ComboTitle: "Rozrahunok pojednannja imeni ta daty narodžennja",
      comboRules:
        "1. vlasne im'ja + denj narodžennja\n2. po batjkovi + masjacj narodžennja\n3. prizvyšče neoficijne + prizvyšče + rik narodžennja\n4. jadro = summa pokaznykiv",
      h3ExColorSound: "Pryklad (kolir/zvuk)",
      exColorSound:
        "1. 6 (blakytnyj/fa) + 2 (červonyj/do#) = 8 (fioletovyj/solj)\n2. 6 (blakytnyj/fa) + 11 (sribnyj/lja#) = 17. 17 - 12 = 5 (zelenyj/mi)\n3. 6 (blakytnyj/fa) + 9 (zolotyj/solj#) + 10 (perlynovyj/lja) = 25. 25 - (12×2) = 1 (čornyj/do)\n4. 8 (fioletovyj/solj) + 5 (zelenyj/mi) + 1 (čornyj/do) = 14. 14 - 12 = 2 (červonyj/do#)",
      h3ExNumber: "Pryklad (čyslo)",
      exNumber:
        "1. 3+8=11. 1+1=2\n2. 6+2=8\n3. 3+9+7=19. 1+9=10. 1+0=1\n4. 2+8+1=11. 1+1=2",
      ps: "P.S. Jak variant, №4 možna skladaty naprjamu vid iznačaljnyh pokaznykiv jadra:",
      exPs: "4. 3 (pomarančevyj/re) + 11 (sribnyj/lja#) = 14. 14 - 12 = 2 (červonyj/do#)\n 3+8=11. 1+1=2",
      colorNoteTitle: "KOLIR – NOTA",
      colorNoteTable:
        "1 •⁠ čornyй — do\n2 •⁠ červonyй – do#\n3 •⁠ pomarančevyй – re\n4 •⁠ žovtyй – re#\n5 •⁠ zelenyй – mi\n6 •⁠ blakytnyй – fa\n7 •⁠ syniй – fa#\n8 •⁠ fioletovyй – solj\n9 •⁠ zolotyй – solj#\n10 •⁠ perlynovyй – lja\n11 •⁠ sribnyй – lja#\n12 •⁠ bilyй – si",
      rozpakovkaBlock:
        'Rozrahunok "rozpakovky" \n\n1. jadro imeni + jadro dnja narodžennja\n2. vlasne im\'ja + denj narodžennja\n3. po batjkovi + misjacj narodžennja\n4. neoficijne prizvyšče + prizvyšče + rik narodžennja \n\nPryklad (kolir/zvuk)\n1. 3 (pomarančevyj/re) + 11 (sribnyj/lja#) = 14. 14 - 12 = 2 (červonyj/do#)\n2. 6 (blakytnyj/fa) + 2 (červonyj/do#) = 8 (fioletovyj/solj)\n3. 6 (blakytnyj/fa) + 11 (sribnyj/lja#) = 17. 17 - 12 = 5 (zelenyj/mi)\n4. 6 (blakytnyj/fa) + 9 (zolotyj/solj#) + 10 (perlynovyj/lja) = 25. 25 - (12×2) = 1 (čornyj/do) \n\nPryklad (čyslo)\n1. 3+8=11. 1+1=2\n2. 3+8=11. 1+1=2\n3. 6+2=8\n4. 3+9+7=19. 1+9=10. 1+0=1',
      daliTitle: "Dali",
      daliItems:
        "- nalaštuvannja koljoriv\n- kulja - obʼjekt, ščo nese na sobi parametry i zvuku takoje (частота, gučnitj, dovžyna)\n- mitka vysoty i potočnoji gučnosti na kuli\n- pry zitknenni menšyj ne zvučytj\n- zaležnistj gučnosti vid rozmiru\n- pry zitknenni menšyj rozdiljajetjsja",
    },
    colors: {
      1: {
        name: "Čornyj",
        description:
          'Zazemlennja i karma.\nKolir ĝruntu: substanciji, jaka pererobljuje vidhody i je rodjučoju rečovynoju, tym, ščo daje žyttja. Kolir Tini po K.G. Jungu: arhetyp, jakyj uosobljuje ljudsjki potajemni bažannja i strahy, ta jogo projav čerez "karmični" žyttjevi sytuaciji. Ogyda; dystancija. Vakuum; Pramaterija; Kosmos. Temrjava. Travmatyka, jaka znahodytcja v nesvidomomu.\n3 rivni: vnutrišnja travmatyka; Tinj; nesvidome jak pidkazka (do prykladu, snovydinnja).',
      },
      2: {
        name: "Červonyj",
        description:
          "Kohannja i borotjba.\nKolir bazovyh bažanj: žyty, kohatysja, zahyščaty i projavljaty sebe. Kolir vojiniv, prystrasti, kohannja, žagy do žyttja. Instynktyvnistj. Gniv.",
      },
      3: {
        name: "Pomarančevyj",
        description:
          "Ščastja i gra.\nKolir radosti, nasolody, rozslablenosti, zadovolennja, grajlyvosti. Smih, gra, masaži, tanci toščo... vse, ščo rozslabljae ta daje vidčuttja vdovolennja. Estetyzm. Tantryčnistj.",
      },
      4: {
        name: "Žovtyj",
        description:
          "Samistj.\nKolir grošej. Pravyljnyj (egojistyčnyj, ale ne egocentryčnyj) rozpodil energiji; rozuminnja, de moji kordony, a de čuži; vminnja vidstojuvaty svoji kordony. Samostijnistj; zv'jazok zi svojeju avtentyčnistju; vidčuttja i rozuminnja svogo miscja v jedynij systemi. Biznes-myslennja: ty – meni, ja – tobi; orijentacija na vygidnu dlja oboh storin spivpracju, vminnja domovljatysja.\n3 rivni: egocentryzm (zacyklenistj na sobi); egojizm (kordony); samistj (cilisnistj).",
      },
      5: {
        name: "Zelenyj",
        description:
          'Ljubov i dobrota.\nKolir bazovoji dobroty i ljubovi do usjogo žyvogo; kolir počuttiv, emocij i staniv. Turbota, dbajlyvistj, spivčuttja na emocijnomu ta fizyčnomu rivnjah. Takož možlyvi: stan "bolota"; žalislyvistj, zazdrisnistj.',
      },
      6: {
        name: "Blakytnyj",
        description:
          'Tvorčistj.\nKolir "gradusu" emocij, napryklad, spokij/legke hvyljuvannja/"štorm" toščo. Kolir projavu emocij, staniv ta dumok, jaki je vseredyni ljudyny. Budj-jaka tvorčistj, osoblyvo oratorsjke mystectvo, projav čerez govorinnja čy zvučannja.',
      },
      7: {
        name: "Synij",
        description:
          'Tyša i mudristj.\nKolir medytacij, glybynnyh i tajemnyh, malodostupnyh znanj, vnutrišnjoji usvidomlenoji tyši, mudrosti. Rivenj svidomoji propracjovky "tinjovyh" aspektiv. Sum. Zanurennja v glybynu. Tyša, jak peršopočatok zvuku, slova, movy.',
      },
      8: {
        name: "Fioletovyj",
        description:
          "Vlada i magija.\nKolir istynnoji vlady, pojednannja voli ta žagy do žyttja z mudristju ta žyttjevym dosvidom. Vminnja pravyljno rozporjadžatysja tym, čym volodiješ, pryvodyty do puttja, do ladu; vminnja pidtrymuvaty porjadok, lad. Mistyčnistj, magija.",
      },
      9: {
        name: "Zolotyj",
        description:
          "Bagatstvo i slava.\nKolir alhimiji, majsternogo upravlinnja energijamy, najvyščyj stupinj materialjnogo bagatstva. Pojednannja duhovnoji ta materialjnoji storin buttja. Slava, vidomistj.",
      },
      10: {
        name: "Perlynovyj",
        description:
          "Garmonija i zv'jazok.\nKolir psyhičnogo zdorov'ja; usvidomlennja, ščo vsi žyvi istoty pov'jazani miž soboju. Rozuminnja pryčynno-naslidkovyh zv'jazkiv, mudra dobrota, tonki čutlyvistj i spivčutlyvistj. Psyhologija, psyhoterapija.",
      },
      11: {
        name: "Sribnyj",
        description:
          "Jasnistj.\nKolir centrovanosti, rivnovagy, pojednannja čornogo ta bilogo. Vnutrišnij spokij ta vidčuttja bezpeky. Zv'jazok zi svojim centrom, koly žodni zovnišni kolyvannja ne zib'jutj z nig. Kolir \"džereljnoji vody\", jaka zmyvaje use brehlyve, vykryvlene ta čužeridne, daje jasnistj, bačennja pravdy. Spokij, jak pervynnyj stan. Takož možlyvi vidčuttja porožnečy, bajdužosti, zamoroženosti počuttiv.",
      },
      12: {
        name: "Bilyj",
        description:
          "Pervynne svitlo.\nBožestvennyj kolir. Česnistj; vysvitlennja usjogo takym, jakym vono je naspravdi; čyste dzerkalo. Pervynne svitlo.",
      },
    },
    numbers: {
      1: {
        meaning:
          'Cilj, meta, "pocilennja strily v centr kola", sfokusovanistj, bezapeljacijnistj, bez sumniviv, zibranistj. Orijentacija na samostijnistj.',
      },
      2: {
        meaning:
          "Kolyvannja, vybir, analiz ta zvažennja variantiv. Orijentacija na partnerstvo.",
      },
      3: {
        meaning:
          "Materializacija, vtilennja bažanogo, zadumanogo; udača; uspih.",
      },
      4: {
        meaning:
          "Čotyry peršoelementa (zemlja, voda, vogonj, povitrja), čotyry storony svitu (shid, zahid, pivdenj, pivnič); odnočasno stijkistj/rivnovaga i rozšyrennja/povnota; vsebičnyj vektor naprjamku (vlivo–vpravo, vpered–nazad | vverh–vnyz, vseredynu–nazovni); kompas, orijentyr po naprjamku.",
      },
      5: {
        meaning:
          "P'jatj organiv čuttja, tilo; usvidomlennja, hto ty je; vlastyvosti | možlyvosti tila.",
      },
      6: {
        meaning:
          '"Zolota seredyna", centrovanistj, balans. Garmonija jak sutj; sercevyna, oseredok; točka, de vse shodytcja; "zolotyj peretyn". Doveršenistj, doskonalistj formy.',
      },
      7: {
        meaning:
          "Lad; bačennja garmoniji (napryklad, muzyčnoji), togo, jak vlaštovan porjadok (roztašuvannja, poslidovnistj elementiv) vseredyni ta u Vsesviti (sim dniv tyžnja, sim čakr, sim not, sim koljoriv veselky toščo); sposterežennja i glybynne piznannja cjogo porjadku; mehanizm, godynnykovyh sprav majster.",
      },
      8: {
        meaning:
          "Kub; stijkistj; važkistj, vidčuttja vagy; materija; osnova; zamknutyj, usamitnenyj prostir dlja samousvidomlennja ta samodyscypliny (može staty klitkoju); vidpovidaljnistj; usvidomlennja naslidkiv svojih dij.",
      },
      9: {
        meaning:
          "Najvyščyj projav elementu; maksymaljne rozšyrennja; materializacija bažanogo na trjoh rivnjah.",
      },
    },
    combos: {
      "1_1":
        "Nesvidome; Tinj; pervynna temrjava; peršoosnova; pramaterija; kosmos.",
      "1_4": "Nesvidome, Tinj, karma i vnutrišnja travmatyka jak kompas.",
      "1_7": "Porjadok i lad nesvidomogo; vnutrišnij mehanizm travmatyky.",
      "2_2":
        "Kohannja, palka vzajemodija, supernyctvo, borotjba; analiz kohannja, prystrasti | borotjby, agresiji; kolyvannja ta sumnivy, zvažennja variantiv v pytannjah kohannja ta projavu agresiji.",
      "2_5":
        "Vidčuttja povnocinnogo projavu tila, žyttjevoji energiji; vidčuttja dojednannja do svogo genetyčnogo kodu, z kym zv'jazani po krovi; kohannja | borotjba rozkryvaje te, hto ja je, projavljaie možlyvosti | vlastyvosti tila.",
      "2_8":
        "Vminnja strymuvaty sebe u projavi prystrasti čy agresyvnosti; usvidomlennja naslidkiv ta vidpovidaljnosti za projav fizyčnoji blyzjkosti čy agresiji; koncentruvannja, zbyrannja žyttjevoji syly.",
      "3_3":
        "Materializacija radosti, nasolody, estetyzmu; uspih ta ščaslyva vdača, jaki vtiljujutcja švydko i grajučysj.",
      "3_6":
        'Vidčuttja "zolotoji seredyny", rivnovagy u projavi nasolody, zadovolennja, grajlyvosti, rozslablenosti; bačennja suti ta iznačaljnogo džerela radosti, udači ta vdovolennja.',
      "3_9":
        "Najglybšyj ta najšyršyj projav radosti, ščastja, gry, nasolody; udača na vsih rivnjah.",
      "4_1":
        "Sfokusovanistj, sprjamovanistj na svoje misce v žytti; orijentacija na vlasnu avtentyčnistj; samostijne zarobljannja grošej.",
      "4_4":
        "Rozuminnja, jak same teče grošova energija, vminnja sprjamovuvaty jiji v potribnomu naprjamku (vidčuvannja, do kogo potribno zvernutysja, ščob energija tekla efektyvniše); avtentyčnistj i grošova energija jak orijentyr, kompas; energija grošej daje odnočasno vidčuttja stijkosti ta rozšyrennja.",
      "4_7":
        "Grošova energija jak častyna zagaljnoji systemy; bačennja, jak same vlaštovan porjadok v systemi grošej; rozuminnja, hto de znahodytcja, na jakomu misci, i jak ce vplyvaje na zagaljnu systemu.",
      "5_2":
        "Ljubov ta dobrota, ščo projavljajutcja v partnerstvi; analiz ta kolyvannja u vidčutti, prožyvanni emocij ta staniv.",
      "5_5":
        "Ljubov i dobrota do svogo tila, do togo, hto ja je; emocijni stany, jaki projavljajutcja čerez tilo, vplyvajutj na tilo, je častynoju togo, hto ja je.",
      "5_8":
        'Obmežennja, jaki nakladajutcja na projav ljubovi ta dobroty, ščob ne vpasty v žalistj čy zverhnju pozyciju; rozuminnja včasnosti vidpuskannja emocijnyh staniv, ščob ne opynytysja v "emocijnomu boloti" čy spryčynyty škodu; usvidomlennja naslidkiv ta vidpovidaljnosti za znahodžennja vseredyni sebe pevnyh emocijnyh staniv ("vaj-faj").',
      "6_3":
        "Materialjnyj projav tvorčosti (pysjmennyctvo, maljuvannja, stvorennja estetyčnogo kontentu toščo); zanjattja oratorsjkym mystectvom; fizyčne projavlennja usjogo spektru počuttiv (kryk, plač, govorinnja pro stany toščo).",
      "6_6":
        'Znahodžennja balansu, "zolotoji seredyny" u projavi staniv ta emocij; znahodžennja ta dolučennja do džerela tvorčogo nathnennja; vminnja pravyljno vyslovljuvatysja (gramotno i točno, vlučno).',
      "6_9":
        "Najpovniše vtilennja tvorčoji energiji; maksymaljno projavlene krasnomovstvo z usima tonkoščamy; piznannja škaly ta rytmiky svojih emocijnyh staniv.",
      "7_1":
        "Znannja jak meta, sprjamovanistj do cilisnogo znannja; samostijna propracjovka tinjovyh aspektiv; otrymannja znanj zavdjaky pošuku vidpovidej vseredyni sebe.",
      "7_4": "Mudristj, ščo služytj kompasom, vkazuje u pravyljnomu naprjamku.",
      "7_7":
        "Znannja, jaki pokazujutj spravžnij porjadok, istynnu garmoniju Vsesvitu.",
      "8_2":
        "Rozdilennja vlady z partnerom — usvidomlennja, jaka moja diljanka obov'jazkiv ta vplyvu, i jaka partnera; domovlenistj ta vzajemopovaga pry rozdilenni vlady z partnerom.",
      "8_5":
        "Volodinnja možlyvostjamy svogo tila; genetyčne dojednannja do pravljačoji gilky.",
      "8_8":
        "Usvidomlennja svojeji vidpovidaljnosti za diji ta jihni naslidky pry zajmanni vladnoji posady; obmežennja svojeji vlady — deleguvannja obov'jazkiv, včasne usunennja sebe vid vladnyh obov'jazkiv, peredača prav nastupnyku.",
      "9_3":
        "Udača ta uspih v dosjagnenni bagatstva ta vidomosti, slavy; vminnja dosjagty bažanogo rivnja dostatku.",
      "9_6":
        'Balans, vidčuttja "zolotoji seredyny" v dosjagnenni bagatstva ta vidomosti; rozuminnja suti "zolotogo potoku", majsterne upravlinnja energijeju zavdjaky jiji glybynnomu piznannju.',
      "9_9":
        "Maksymaljne dosjagnennja v pytanni bagatstva ta slavy, svitova vidomistj; alhimija, vidjomstvo.",
      "10_1":
        "Ja je Odyn/ my je Odne; bačyty vsih navkrugy jak svoju projekciju; oči Boga; zv'jazok iz samym soboju.",
      "10_4":
        "Ruh po emocijnym zv'jazkam; vidčuvaty, do kogo ruhatysja — do sebe čy do inšogo, do kogo konkretno, koly ta jak same.",
      "10_7":
        "Bačyty zv'jazok miž usima; spryjmaty vsih jak jedynyj žyvyj organizm; bačyty misce kožnogo v cjomu organizmi.",
      "11_2":
        "Balans v partnerstvi; jasnistj, prozoristj u vzajemynah, jaki dozvoljajutj bačyty sutj vzajemodiji; analiz, zvažennja variantiv pry obgovorenni pytanj z partnerom.",
      "11_5":
        "Zbalansovanistj tilesnyh možlyvostej; čitke usvidomlennja, hto ja je; vnutrišnij spokij, jasnistj u vzajemodiji z samym soboju.",
      "11_8":
        'Samozanurennja, medytacija; zaglyblennja u porožneču jak peršopočatok vsih staniv; stan "džereljnoji vody", jaka zmyvaje usi vykryvlennja, brehnju, omanu; čystota pervynnogo stanu buttja.',
      "12_3":
        "Duhovne pojednujetcja z materialjnym i ce narodžuje Dyvo; pervynna syla, ščo z'javljajetcja, koly dosjagajetcja cilisnistj; nadpryrodnistj.",
      "12_6":
        "Dojednannja do pervynnogo džerela svitla; vidčuttja vlasnoji sercevyny svitla; česnistj.",
      "12_9":
        'Svitlo (jasnistj, česnistj, zasvidčennja), jake zahodytj na usih rivnjah; vysvitlennja vsih momentiv žyttja; vidsutnistj "skeletiv u šafah", vidsutnistj Tini.',
    },
  },

  uk: {
    intro:
      "Наведіть курсор на кольорове кільце квітки, щоб побачити його значення.\n\nНатисніть на кільце, щоб закріпити інформацію.",
    labelKolir: "КОЛІР",
    labelCyslo: "ЧИСЛО",
    labelPjednannja: "ПОЄДНАННЯ",
    labelVidstupZgory: "Відступ згори:",
    btnShowNumber: "показувати число",
    btnBgColor: "колір фону",
    panelInfoLabel: "інфо",
    btnCopyLayout: "Копіювати код розкладки",
    btnCopied: "скопійовано!",
    labels: {
      imja: "Ім'я",
      pobatjkovi: "По-батькові",
      prizvysceNeoficijne: "Прізвище неофіційне",
      prizvysce: "Прізвище",
      data: "Дата",
      denj: "День",
      misjacj: "Місяць",
      rik: "Рік",
      selectUkrainska: "Українська",
      selectUkrLatynka: "Українська Латинка",
      selectMoskalska: "Московська",
      selectAnglijska: "Англійська",
      selectKrymsjkotatarsjka: "Кримськотатарська",
      labelYadro: "Ядро",
      labelRozmir: "Розмір",
    },
    abetka: {
      panelTitle: "Алгоритми",
      h2ColorSound: "Розрахунок кольору та звуку",
      ruleForWord:
        "Для слова (імені) – все складаємо і далі віднімаємо 12, поки не отримаємо число від 1 до 12.\nДля дати – від цілого числа віднімаємо 12, поки не отримаємо число від 1 до 12.",
      labelPryklad: "Приклад:",
      autoResult: "Автоматичний результат:",
      exName1result: "66-(12×5)=6 (блакитний колір/нота фа)",
      exDate1result:
        "24-12=12 (білий/сі); \n8 (фіолетовий/соль); \n1991-(12×165)=11 (срібний/ля#); \nсума (серединка): 12+8+11=31. 31-(12×2)=7 (синій/фа#)",
      h2Number: "2. Розрахунок числа",
      ruleForNumber: "Все складаємо, поки не отримаємо число від 1 до 9.",
      exDate2summary: "сума (серединка): 6+8+2=16. 1+6=7",
      h2Summary: "3. Підсумок",
      summaryResult:
        "Ростислав: блакитна 3 (трійка); фа\n\nдень 24: біла 6 (шість); сі\nмісяць 08: фіолетова 8 (вісім); соль\nрік 1991: срібна 2 (двійка); ля#\nсередина: синя 7 (сім); фа#",
      h3ComboTitle: "Розрахунок поєднання імені та дати народження",
      comboRules:
        "1. власне ім'я + день народження\n2. по батькові + місяць народження\n3. прізвище неофіційне + прізвище + рік народження\n4. ядро = сума показників",
      h3ExColorSound: "Приклад (колір/звук)",
      exColorSound:
        "1. 6 (блакитний/фа) + 2 (червоний/до#) = 8 (фіолетовий/соль)\n2. 6 (блакитний/фа) + 11 (срібний/ля#) = 17. 17 - 12 = 5 (зелений/мі)\n3. 6 (блакитний/фа) + 9 (золотий/соль#) + 10 (перлиновий/ля) = 25. 25 - (12×2) = 1 (чорний/до)\n4. 8 (фіолетовий/соль) + 5 (зелений/мі) + 1 (чорний/до) = 14. 14 - 12 = 2 (червоний/до#)",
      h3ExNumber: "Приклад (число)",
      exNumber:
        "1. 3+8=11. 1+1=2\n2. 6+2=8\n3. 3+9+7=19. 1+9=10. 1+0=1\n4. 2+8+1=11. 1+1=2",
      ps: "P.S. Як варіант, №4 можна складати напряму від ізначальних показників ядра:",
      exPs: "4. 3 (помаранчевий/ре) + 11 (срібний/ля#) = 14. 14 - 12 = 2 (червоний/до#)\n 3+8=11. 1+1=2",
      colorNoteTitle: "КОЛІР – НОТА",
      colorNoteTable:
        "1 • чорний — до\n2 • червоний – до#\n3 • помаранчевий – ре\n4 • жовтий – ре#\n5 • зелений – мі\n6 • блакитний – фа\n7 • синій – фа#\n8 • фіолетовий – соль\n9 • золотий – соль#\n10 • перлиновий – ля\n11 • срібний – ля#\n12 • білий – сі",
      rozpakovkaBlock:
        'Розрахунок "розпаковки"\n\n1. ядро імені + ядро дня народження\n2. власне ім\'я + день народження\n3. по батькові + місяць народження\n4. неофіційне прізвище + прізвище + рік народження\n\nПриклад (колір/звук)\n1. 3 (помаранчевий/ре) + 11 (срібний/ля#) = 14. 14 - 12 = 2 (червоний/до#)\n2. 6 (блакитний/фа) + 2 (червоний/до#) = 8 (фіолетовий/соль)\n3. 6 (блакитний/фа) + 11 (срібний/ля#) = 17. 17 - 12 = 5 (зелений/мі)\n4. 6 (блакитний/фа) + 9 (золотий/соль#) + 10 (перлиновий/ля) = 25. 25 - (12×2) = 1 (чорний/до)\n\nПриклад (число)\n1. 3+8=11. 1+1=2\n2. 3+8=11. 1+1=2\n3. 6+2=8\n4. 3+9+7=19. 1+9=10. 1+0=1',
      daliTitle: "Далі",
      daliItems:
        "- налаштування кольорів\n- куля - об'єкт, що несе на собі параметри і звуку також (частота, гучність, довжина)\n- мітка висоти і поточної гучності на кулі\n- при зіткненні менший не звучить\n- залежність гучності від розміру\n- при зіткненні менший розділяється",
    },
    colors: {
      1: {
        name: "Чорний",
        description:
          'Заземлення і карма.\nКолір ґрунту: субстанції, яка перероблює відходи і є родючою речовиною, тим, що дає життя. Колір Тіні по К.Г. Юнгу: архетип, який уособлює людські потаємні бажання і страхи, та його прояв через "кармічні" життєві ситуації. Огида; дистанція. Вакуум; Праматерія; Космос. Темрява. Травматика, яка знаходиться в несвідомому.\n3 рівні: внутрішня травматика; Тінь; несвідоме як підказка (до прикладу, сновидіння).',
      },
      2: {
        name: "Червоний",
        description:
          "Кохання і боротьба.\nКолір базових бажань: жити, кохатися, захищати і проявляти себе. Колір воїнів, пристрасті, кохання, жаги до життя. Інстинктивність. Гнів.",
      },
      3: {
        name: "Помаранчевий",
        description:
          "Щастя і гра.\nКолір радості, насолоди, розслабленості, задоволення, грайливості. Сміх, гра, масажі, танці тощо... все, що розслабляє та дає відчуття вдоволення. Естетизм. Тантричність.",
      },
      4: {
        name: "Жовтий",
        description:
          "Самість.\nКолір грошей. Правильний (егоїстичний, але не егоцентричний) розподіл енергії; розуміння, де мої кордони, а де чужі; вміння відстоювати свої кордони. Самостійність; зв'язок зі своєю автентичністю; відчуття і розуміння свого місця в єдиній системі. Бізнес-мислення: ти – мені, я – тобі; орієнтація на вигідну для обох сторін співпрацю, вміння домовлятися.\n3 рівні: егоцентризм (зацикленість на собі); егоїзм (кордони); самість (цілісність).",
      },
      5: {
        name: "Зелений",
        description:
          'Любов і доброта.\nКолір базової доброти і любові до усього живого; колір почуттів, емоцій і станів. Турбота, дбайливість, співчуття на емоційному та фізичному рівнях. Також можливі: стан "болота"; жалісливість, заздрісність.',
      },
      6: {
        name: "Блакитний",
        description:
          'Творчість.\nКолір "градусу" емоцій, наприклад, спокій/легке хвилювання/"шторм" тощо. Колір прояву емоцій, станів та думок, які є всередині людини. Будь-яка творчість, особливо ораторське мистецтво, прояв через говоріння чи звучання.',
      },
      7: {
        name: "Синій",
        description:
          'Тиша і мудрість.\nКолір медитацій, глибинних і таємних, малодоступних знань, внутрішньої усвідомленої тиші, мудрості. Рівень свідомої пропрацьовки "тіньових" аспектів. Сум. Занурення в глибину. Тиша як першопочаток звуку, слова, мови.',
      },
      8: {
        name: "Фіолетовий",
        description:
          "Влада і магія.\nКолір істинної влади, поєднання волі та жаги до життя з мудрістю та життєвим досвідом. Вміння правильно розпоряджатися тим, чим володієш, приводити до пуття, до ладу; вміння підтримувати порядок, лад. Містичність, магія.",
      },
      9: {
        name: "Золотий",
        description:
          "Багатство і слава.\nКолір алхімії, майстерного управління енергіями, найвищий ступінь матеріального багатства. Поєднання духовної та матеріальної сторін буття. Слава, відомість.",
      },
      10: {
        name: "Перлиновий",
        description:
          "Гармонія і зв'язок.\nКолір психічного здоров'я; усвідомлення, що всі живі істоти пов'язані між собою. Розуміння причинно-наслідкових зв'язків, мудра доброта, тонкі чутливість і співчутливість. Психологія, психотерапія.",
      },
      11: {
        name: "Срібний",
        description:
          "Ясність.\nКолір центрованості, рівноваги, поєднання чорного та білого. Внутрішній спокій та відчуття безпеки. Зв'язок зі своїм центром, коли жодні зовнішні коливання не зіб'ють з ніг. Колір \"джерельної води\", яка змиває усе брехливе, викривлене та чужерідне, дає ясність, бачення правди. Спокій, як первинний стан. Також можливі відчуття порожнечи, байдужості, замороженості почуттів.",
      },
      12: {
        name: "Білий",
        description:
          "Первинне світло.\nБожественний колір. Чесність; висвітлення усього таким, яким воно є насправді; чисте дзеркало. Первинне світло.",
      },
    },
    numbers: {
      1: {
        meaning:
          'ціль, мета, "поцілення стріли в центр кола", сфокусованість, безапеляційність, без сумнівів, зібраність. Орієнтація на самостійність.',
      },
      2: {
        meaning:
          "коливання, вибір, аналіз та зваження варіантів. Орієнтація на партнерство.",
      },
      3: {
        meaning: "матеріалізація, втілення бажаного, задуманого; удача; успіх.",
      },
      4: {
        meaning:
          "чотири першоелемента (земля, вода, вогонь, повітря), чотири сторони світу (схід, захід, південь, північ); одночасно стійкість/рівновага і розширення/повнота; всебічний вектор напрямку (вліво–вправо, вперед–назад або вверх–вниз, всередину–назовні); компас, орієнтир по напрямку.",
      },
      5: {
        meaning:
          "п'ять органів чуття, тіло; усвідомлення, хто ти є; властивості/можливості тіла.",
      },
      6: {
        meaning:
          '"золота середина", центрованість, баланс. Гармонія як суть; серцевина, осередок; точка, де все сходиться; "золотий перетин". Довершеність, досконалість форми.',
      },
      7: {
        meaning:
          "лад; бачення гармонії (наприклад, музичної), того, як влаштован порядок (розташування, послідовність елементів) всередині та у Всесвіті (сім днів тижня, сім чакр, сім нот, сім кольорів веселки тощо); спостереження і глибинне пізнання цього порядку; механізм, годинникових справ майстер.",
      },
      8: {
        meaning:
          "куб; стійкість; важкість, відчуття ваги; матерія; основа; замкнутий, усамітнений простір для самоусвідомлення та самодисципліни (може стати кліткою); відповідальність; усвідомлення наслідків своїх дій.",
      },
      9: {
        meaning:
          "найвищий, найповніший прояв елементу; максимальне розширення; матеріалізація бажаного на трьох рівнях.",
      },
    },
    combos: {
      "1_1":
        "несвідоме; Тінь; первинна темрява; першооснова; праматерія; космос.",
      "1_4": "несвідоме, Тінь, карма і внутрішня травматика як компас.",
      "1_7": "порядок і лад несвідомого; внутрішній механізм травматики.",
      "2_2":
        "кохання, палка взаємодія, суперництво, боротьба; аналіз кохання, пристрасті чи боротьби, агресії; коливання та сумніви, зваження варіантів в питаннях кохання та прояву агресії.",
      "2_5":
        "відчуття повноцінного прояву тіла, життєвої енергії; відчуття доєднання до свого генетичного коду, з ким зв'язані по крові; кохання/боротьба розкриває те, хто я є, проявляє можливості/властивості тіла.",
      "2_8":
        "вміння стримувати себе у прояві пристрасті чи агресивності; усвідомлення наслідків та відповідальності за прояв фізичної близькості чи агресії; концентрування, збирання життєвої сили.",
      "3_3":
        "матеріалізація радості, насолоди, естетизму; успіх та щаслива вдача, які втілюються швидко і граючись.",
      "3_6":
        'відчуття "золотої середини", рівноваги у прояві насолоди, задоволення, грайливості, розслабленості; бачення суті та ізначального джерела радості, удачі та вдоволення.',
      "3_9":
        "найглибший та найширший прояв радості, щастя, гри, насолоди; удача на всіх рівнях.",
      "4_1":
        "сфокусованість, спрямованість на своє місце в житті; орієнтація на власну автентичність; самостійне заробляння грошей.",
      "4_4":
        "розуміння, як саме тече грошова енергія, вміння спрямовувати її в потрібному напрямку (відчування, до кого потрібно звернутися, щоб енергія текла ефективніше); автентичність і грошова енергія як орієнтир, компас; енергія грошей дає одночасно відчуття стійкості та розширення.",
      "4_7":
        "грошова енергія як частина загальної системи; бачення, як саме влаштован порядок в системі грошей; розуміння, хто де знаходиться, на якому місці, і як це впливає на загальну систему.",
      "5_2":
        "любов та доброта, що проявляються в партнерстві; аналіз і коливання у відчутті, проживанні емоцій та станів.",
      "5_5":
        "любов і доброта до свого тіла, до того, хто я є; емоційні стани, які проявляються через тіло, впливають на тіло, є частиною того, хто я є.",
      "5_8":
        'обмеження, які накладаються на прояв любові та доброти, щоб не впасти в жалість чи зверхню позицію; розуміння вчасності відпускання емоційних станів, щоб не опинитися в "емоційному болоті" чи спричинити шкоду; усвідомлення наслідків та відповідальності за знаходження всередині себе певних емоційних станів ("вай-фай").',
      "6_3":
        "матеріальний прояв творчості (письменництво, малювання, створення естетичного контенту тощо); заняття ораторським мистецтвом; фізичне проявлення усього спектру почуттів (крик, плач, говоріння про стани тощо).",
      "6_6":
        'знаходження балансу, "золотої середини" у прояві станів та емоцій; знаходження та долучення до джерела творчого натхнення; вміння правильно висловлюватися (грамотно і точно, влучно).',
      "6_9":
        "найповніше втілення творчої енергії; максимально проявлене красномовство з усіма тонкощами; пізнання шкали та ритміки своїх емоційних станів.",
      "7_1":
        "знання як мета, спрямованість до цілісного знання; самостійна пропрацьовка тіньових аспектів; отримання знань завдяки пошуку відповідей всередині себе.",
      "7_4": "мудрість, що служить компасом, вказує у правильному напрямку.",
      "7_7":
        "знання, які показують справжній порядок, істинну гармонію Всесвіту.",
      "8_2":
        "розділення влади з партнером — усвідомлення, яка моя ділянка обов'язків та впливу і яка партнера; домовленість та взаємоповага при розділенні влади з партнером.",
      "8_5":
        "володіння можливостями свого тіла; генетичне доєднання до правлячої гілки.",
      "8_8":
        "усвідомлення своєї відповідальності за дії та їхні наслідки при займанні владної посади; обмеження своєї влади — делегування обов'язків, вчасне усунення себе від владних обов'язків, передача прав наступнику.",
      "9_3":
        "удача та успіх в досягненні багатства та відомості, слави; вміння досягти бажаного рівня достатку.",
      "9_6":
        'баланс, відчуття "золотої середини" в досягненні багатства та відомості; розуміння суті "золотого потоку", майстерне управління енергією завдяки її глибинному пізнанню.',
      "9_9":
        "максимальне досягнення в питанні багатства та слави, світова відомість; алхімія, відьомство.",
      "10_1":
        "я є Один/ми є Одне; бачити всіх навкруги як свою проєкцію; очі Бога; зв'язок із самим собою.",
      "10_4":
        "рух по емоційним зв'язкам; відчувати, до кого рухатися — до себе чи до іншого, до кого конкретно, коли та як саме.",
      "10_7":
        "бачити зв'язок між усіма; сприймати всіх як єдиний живий організм; бачити місце кожного в цьому організмі.",
      "11_2":
        "баланс в партнерстві; ясність, прозорість у взаєминах, які дозволяють бачити суть взаємодії; ясність аналізу, зваження варіантів при обговоренні питань з партнером.",
      "11_5":
        "збалансованість тілесних можливостей; чітке усвідомлення, хто я є; внутрішній спокій, ясність у взаємодії з самим собою.",
      "11_8":
        'самозанурення, медитація; заглиблення у порожнечу як першопочаток всіх станів; стан "джерельної води", яка змиває усі викривлення, брехню, оману; чистота первинного стану буття.',
      "12_3":
        "духовне поєднується з матеріальним і це народжує Диво; первинна сила, що з'являється, коли досягається цілісність; надприродність.",
      "12_6":
        "доєднання до первинного джерела світла; відчуття власної серцевини світла; чесність.",
      "12_9":
        'світло (ясність, чесність, засвідчення), яке заходить на усіх рівнях; висвітлення всіх моментів життя; відсутність "скелетів у шафах", відсутність Тіні.',
    },
  },
};
