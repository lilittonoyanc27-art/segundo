export interface TextItem {
  id: string;
  es: string;
  arm: string;
}

export interface DetailedSection {
  id: number;
  titleEs: string;
  titleArm: string;
  items: {
    es: string;
    arm: string;
  }[];
  importantWord?: {
    wordEs: string;
    wordArm: string;
    descEs: string;
    descArm: string;
  };
  bulletHeader?: {
    es: string;
    arm: string;
  };
  bullets?: {
    es: string;
    arm: string;
  }[];
}

export interface VocabWord {
  id: number;
  es: string;
  arm: string;
  category?: string;
  icon?: string;
}

export interface QAItem {
  number: number;
  questionEs: string;
  questionArm: string;
  answerEs: string;
  answerArm: string;
}

export const UNIT_INFO = {
  unit: "UNIT 1: PREHISTORY",
  unitArm: "ՄԻԱՎՈՐ 1․ ՆԱԽԱՊԱՏՄՈՒԹՅՈՒՆ",
  titleEs: "2. THE PALEOLITHIC PERIOD — EL PALEOLÍTICO",
  titleArm: "ՊԱԼԵՈԼԻԹՅԱՆ ԺԱՄԱՆԱԿԱՇՐՋԱՆԸ",
  subtitleEs: "Texto para contar",
  subtitleArm: "Տեքստ՝ պատմելու համար",
};

export const HOME_OVERVIEW_DATA = {
  titleEs: "El Paleolítico",
  titleArm: "Պալեոլիթը",
  paragraphs: [
    {
      id: 1,
      es: "El Paleolítico fue la etapa más antigua de la Prehistoria.",
      arm: "Պալեոլիթը նախապատմության ամենահին ժամանակաշրջանն էր։",
    },
    {
      id: 2,
      es: "Durante este periodo, los seres humanos eran nómadas y se desplazaban buscando alimentos. Vivían de la caza, la pesca y la recolección.",
      arm: "Այս ժամանակաշրջանում մարդիկ քոչվոր էին և սնունդ գտնելու համար տեղափոխվում էին մի վայրից մյուսը։ Նրանք ապրում էին որսով, ձկնորսությամբ և հավաքչությամբ։",
    },
    {
      id: 3,
      es: "Utilizaban herramientas de piedra, madera y hueso. También aprendieron a controlar el fuego, que servía para calentarse, cocinar y protegerse.",
      arm: "Օգտագործում էին քարից, փայտից և ոսկորից պատրաստված գործիքներ։ Նրանք նաև սովորեցին վերահսկել կրակը, որը ծառայում էր տաքանալու, սնունդ պատրաստելու և պաշտպանվելու համար։",
    },
    {
      id: 4,
      es: "Vivían en cuevas o refugios sencillos y comenzaron a realizar pinturas rupestres.",
      arm: "Նրանք ապրում էին քարանձավներում կամ պարզ ապաստարաններում և սկսեցին ստեղծել ժայռապատկերներ։",
    },
  ],
  fullTextEs: `El Paleolítico fue la etapa más antigua de la Prehistoria.

Durante este periodo, los seres humanos eran nómadas y se desplazaban buscando alimentos. Vivían de la caza, la pesca y la recolección.

Utilizaban herramientas de piedra, madera y hueso. También aprendieron a controlar el fuego, que servía para calentarse, cocinar y protegerse.

Vivían en cuevas o refugios sencillos y comenzaron a realizar pinturas rupestres.`,
  fullTextArm: `Պալեոլիթը նախապատմության ամենահին ժամանակաշրջանն էր։

Այս ժամանակաշրջանում մարդիկ քոչվոր էին և սնունդ գտնելու համար տեղափոխվում էին մի վայրից մյուսը։ Նրանք ապրում էին որսով, ձկնորսությամբ և հավաքչությամբ։

Օգտագործում էին քարից, փայտից և ոսկորից պատրաստված գործիքներ։ Նրանք նաև սովորեցին վերահսկել կրակը, որը ծառայում էր տաքանալու, սնունդ պատրաստելու և պաշտպանվելու համար։

Նրանք ապրում էին քարանձավներում կամ պարզ ապաստարաններում և սկսեցին ստեղծել ժայռապատկերներ։`,
};

export const EXAM_TEXT_PARAGRAPHS: {
  id: number;
  es: string;
  arm: string;
  sentences: { es: string; arm: string }[];
}[] = [
  {
    id: 1,
    es: "El Paleolítico fue la etapa más antigua de la Prehistoria. Comenzó hace millones de años y terminó con el inicio del Neolítico.",
    arm: "Պալեոլիթը նախապատմության ամենահին փուլն էր։ Այն սկսվել է միլիոնավոր տարիներ առաջ և ավարտվել է նեոլիթյան ժամանակաշրջանի սկզբով։",
    sentences: [
      {
        es: "El Paleolítico fue la etapa más antigua de la Prehistoria.",
        arm: "Պալեոլիթը նախապատմության ամենահին փուլն էր։",
      },
      {
        es: "Comenzó hace millones de años y terminó con el inicio del Neolítico.",
        arm: "Այն սկսվել է միլիոնավոր տարիներ առաջ և ավարտվել է նեոլիթյան ժամանակաշրջանի սկզբով։",
      },
    ],
  },
  {
    id: 2,
    es: "Durante el Paleolítico, los seres humanos eran nómadas. Esto significa que no vivían siempre en el mismo lugar. Se desplazaban de un sitio a otro buscando alimentos y mejores condiciones para vivir.",
    arm: "Պալեոլիթի ժամանակ մարդիկ քոչվոր էին։ Դա նշանակում է, որ նրանք մշտապես նույն վայրում չէին ապրում։ Նրանք մի վայրից մյուսն էին տեղափոխվում՝ սնունդ և ապրելու ավելի լավ պայմաններ գտնելու համար։",
    sentences: [
      {
        es: "Durante el Paleolítico, los seres humanos eran nómadas.",
        arm: "Պալեոլիթի ժամանակ մարդիկ քոչվոր էին։",
      },
      {
        es: "Esto significa que no vivían siempre en el mismo lugar.",
        arm: "Դա նշանակում է, որ նրանք մշտապես նույն վայրում չէին ապրում։",
      },
      {
        es: "Se desplazaban de un sitio a otro buscando alimentos y mejores condiciones para vivir.",
        arm: "Նրանք մի վայրից մյուսն էին տեղափոխվում՝ սնունդ և ապրելու ավելի լավ պայմաններ գտնելու համար։",
      },
    ],
  },
  {
    id: 3,
    es: "Vivían de la caza, la pesca y la recolección de frutos, raíces y plantas. Por eso dependían mucho de la naturaleza.",
    arm: "Նրանք ապրում էին որսով, ձկնորսությամբ և մրգերի, արմատների ու բույսերի հավաքմամբ։ Այդ պատճառով նրանք շատ կախված էին բնությունից։",
    sentences: [
      {
        es: "Vivían de la caza, la pesca y la recolección de frutos, raíces y plantas.",
        arm: "Նրանք ապրում էին որսով, ձկնորսությամբ և մրգերի, արմատների ու բույսերի հավաքմամբ։",
      },
      {
        es: "Por eso dependían mucho de la naturaleza.",
        arm: "Այդ պատճառով նրանք շատ կախված էին բնությունից։",
      },
    ],
  },
  {
    id: 4,
    es: "Los seres humanos del Paleolítico utilizaban herramientas sencillas hechas principalmente de piedra, madera y hueso. Las herramientas les servían para cazar, cortar carne, preparar alimentos y defenderse.",
    arm: "Պալեոլիթի մարդիկ օգտագործում էին պարզ գործիքներ, որոնք հիմնականում պատրաստված էին քարից, փայտից և ոսկորից։ Այդ գործիքներն օգտագործվում էին որսի, միս կտրելու, սնունդ պատրաստելու և պաշտպանվելու համար։",
    sentences: [
      {
        es: "Los seres humanos del Paleolítico utilizaban herramientas sencillas hechas principalmente de piedra, madera y hueso.",
        arm: "Պալեոլիթի մարդիկ օգտագործում էին պարզ գործիքներ, որոնք հիմնականում պատրաստված էին քարից, փայտից և ոսկորից։",
      },
      {
        es: "Las herramientas les servían para cazar, cortar carne, preparar alimentos y defenderse.",
        arm: "Այդ գործիքներն օգտագործվում էին որսի, միս կտրելու, սնունդ պատրաստելու և պաշտպանվելու համար։",
      },
    ],
  },
  {
    id: 5,
    es: "Uno de los avances más importantes fue el control del fuego. El fuego les daba calor y luz, servía para cocinar los alimentos y también para protegerse de los animales.",
    arm: "Ամենակարևոր ձեռքբերումներից մեկը կրակի վերահսկումն էր։ Կրակը տալիս էր ջերմություն և լույս, օգտագործվում էր սնունդ պատրաստելու և կենդանիներից պաշտպանվելու համար։",
    sentences: [
      {
        es: "Uno de los avances más importantes fue el control del fuego.",
        arm: "Ամենակարևոր ձեռքբերումներից մեկը կրակի վերահսկումն էր։",
      },
      {
        es: "El fuego les daba calor y luz, servía para cocinar los alimentos y también para protegerse de los animales.",
        arm: "Կրակը տալիս էր ջերմություն և լույս, օգտագործվում էր սնունդ պատրաստելու և կենդանիներից պաշտպանվելու համար։",
      },
    ],
  },
  {
    id: 6,
    es: "Vivían en pequeños grupos. A veces utilizaban cuevas y otras veces construían refugios sencillos con ramas, pieles de animales y otros materiales.",
    arm: "Մարդիկ ապրում էին փոքր խմբերով։ Երբեմն նրանք ապրում էին քարանձավներում, իսկ երբեմն կառուցում էին պարզ ապաստարաններ՝ ճյուղերից, կենդանիների մորթիներից և այլ նյութերից։",
    sentences: [
      {
        es: "Vivían en pequeños grupos.",
        arm: "Մարդիկ ապրում էին փոքր խմբերով։",
      },
      {
        es: "A veces utilizaban cuevas y otras veces construían refugios sencillos con ramas, pieles de animales y otros materiales.",
        arm: "Երբեմն նրանք ապրում էին քարանձավներում, իսկ երբեմն կառուցում էին պարզ ապաստարաններ՝ ճյուղերից, կենդանիների մորթիներից և այլ նյութերից։",
      },
    ],
  },
  {
    id: 7,
    es: "En el Paleolítico también apareció el arte. Los seres humanos pintaban animales y escenas de caza en las paredes de las cuevas. Estas pinturas se llaman pinturas rupestres.",
    arm: "Պալեոլիթի ժամանակաշրջանում առաջացավ նաև արվեստը։ Մարդիկ քարանձավների պատերին նկարում էին կենդանիներ և որսի տեսարաններ։ Այդ նկարները կոչվում են ժայռապատկերներ։",
    sentences: [
      {
        es: "En el Paleolítico también apareció el arte.",
        arm: "Պալեոլիթի ժամանակաշրջանում առաջացավ նաև արվեստը։",
      },
      {
        es: "Los seres humanos pintaban animales y escenas de caza en las paredes de las cuevas.",
        arm: "Մարդիկ քարանձավների պատերին նկարում էին կենդանիներ և որսի տեսարաններ։",
      },
      {
        es: "Estas pinturas se llaman pinturas rupestres.",
        arm: "Այդ նկարները կոչվում են ժայռապատկերներ։",
      },
    ],
  },
  {
    id: 8,
    es: "En resumen, el Paleolítico fue una etapa en la que los seres humanos eran nómadas, vivían de la caza, la pesca y la recolección, utilizaban herramientas de piedra, controlaban el fuego y comenzaron a crear arte.",
    arm: "Ամփոփելով՝ Պալեոլիթը այն ժամանակաշրջանն էր, երբ մարդիկ քոչվոր էին, ապրում էին որսով, ձկնորսությամբ և հավաքչությամբ, օգտագործում էին քարե գործիքներ, վերահսկում էին կրակը և սկսեցին ստեղծել արվեստ։",
    sentences: [
      {
        es: "En resumen, el Paleolítico fue una etapa en la que los seres humanos eran nómadas, vivían de la caza, la pesca y la recolección, utilizaban herramientas de piedra, controlaban el fuego y comenzaron a crear arte.",
        arm: "Ամփոփելով՝ Պալեոլիթը այն ժամանակաշրջանն էր, երբ մարդիկ քոչվոր էին, ապրում էին որսով, ձկնորսությամբ և հավաքչությամբ, օգտագործում էին քարե գործիքներ, վերահսկում էին կրակը և սկսեցին ստեղծել արվեստ։",
      },
    ],
  },
];

export const DETAILED_SECTIONS: DetailedSection[] = [
  {
    id: 1,
    titleEs: "1. ¿Qué es el Paleolítico?",
    titleArm: "1. Ի՞նչ է Պալեոլիթը։",
    items: [
      {
        es: "El Paleolítico es la etapa más antigua de la Prehistoria.",
        arm: "Պալեոլիթը նախապատմության ամենահին ժամանակաշրջանն է։",
      },
      {
        es: "La palabra Paleolítico significa aproximadamente “piedra antigua”.",
        arm: "«Պալեոլիթ» բառը մոտավորապես նշանակում է «հին քար»։",
      },
      {
        es: "Se llama así porque las personas utilizaban herramientas de piedra tallada.",
        arm: "Այն այդպես է կոչվում, որովհետև մարդիկ օգտագործում էին կոպիտ մշակված քարե գործիքներ։",
      },
    ],
  },
  {
    id: 2,
    titleEs: "2. Los seres humanos eran nómadas",
    titleArm: "2. Մարդիկ քոչվոր էին",
    items: [
      {
        es: "Los grupos humanos no vivían siempre en el mismo lugar.",
        arm: "Մարդկային խմբերը մշտապես նույն վայրում չէին ապրում։",
      },
      {
        es: "Se desplazaban buscando comida, agua y animales para cazar.",
        arm: "Նրանք տեղափոխվում էին սնունդ, ջուր և որսի կենդանիներ գտնելու համար։",
      },
    ],
    importantWord: {
      wordEs: "nómada",
      wordArm: "քոչվոր",
      descEs: "persona que cambia de lugar de residencia.",
      descArm: "մարդ, որը բնակության վայրը հաճախ փոխում է։",
    },
  },
  {
    id: 3,
    titleEs: "3. La alimentación",
    titleArm: "3. Սնունդը",
    items: [
      {
        es: "Los seres humanos del Paleolítico eran cazadores y recolectores.",
        arm: "Պալեոլիթի մարդիկ որսորդներ և հավաքարարներ էին։",
      },
      {
        es: "Cazaban animales, pescaban y recogían frutos, semillas, raíces y plantas.",
        arm: "Նրանք որսում էին կենդանիներ, ձուկ էին որսում և հավաքում էին մրգեր, սերմեր, արմատներ ու բույսեր։",
      },
      {
        es: "No cultivaban la tierra y todavía no practicaban la agricultura.",
        arm: "Նրանք հող չէին մշակում և դեռ չէին զբաղվում գյուղատնտեսությամբ։",
      },
    ],
  },
  {
    id: 4,
    titleEs: "4. Las herramientas",
    titleArm: "4. Գործիքները",
    items: [
      {
        es: "Fabricaban herramientas principalmente de piedra, madera y hueso.",
        arm: "Նրանք գործիքներ էին պատրաստում հիմնականում քարից, փայտից և ոսկորից։",
      },
      {
        es: "Algunas herramientas eran lanzas, cuchillos, raspadores y puntas de piedra.",
        arm: "Որոշ գործիքներ էին նիզակները, դանակները, քերիչները և քարե սրածայրերը։",
      },
      {
        es: "Las herramientas servían para cazar, cortar, trabajar pieles y preparar alimentos.",
        arm: "Գործիքներն օգտագործվում էին որսի, կտրելու, կաշի մշակելու և սնունդ պատրաստելու համար։",
      },
    ],
  },
  {
    id: 5,
    titleEs: "5. El fuego",
    titleArm: "5. Կրակը",
    items: [
      {
        es: "El control del fuego fue fundamental.",
        arm: "Կրակի վերահսկումը շատ կարևոր էր։",
      },
    ],
    bulletHeader: {
      es: "El fuego servía para:",
      arm: "Կրակը ծառայում էր՝",
    },
    bullets: [
      {
        es: "calentarse",
        arm: "տաքանալ",
      },
      {
        es: "cocinar alimentos",
        arm: "սնունդ պատրաստել",
      },
      {
        es: "tener luz",
        arm: "լույս ունենալ",
      },
      {
        es: "protegerse de animales",
        arm: "կենդանիներից պաշտպանվել",
      },
      {
        es: "reunirse en grupo",
        arm: "խմբով հավաքվել",
      },
    ],
  },
  {
    id: 6,
    titleEs: "6. La vivienda",
    titleArm: "6. Բնակավայրը",
    items: [
      {
        es: "Los seres humanos podían vivir en cuevas o refugios sencillos.",
        arm: "Մարդիկ կարող էին ապրել քարանձավներում կամ պարզ ապաստարաններում։",
      },
      {
        es: "Los refugios podían construirse con ramas, pieles y otros materiales naturales.",
        arm: "Ապաստարանները կարող էին կառուցվել ճյուղերից, կենդանիների մորթիներից և բնական այլ նյութերից։",
      },
      {
        es: "Como eran nómadas, estas viviendas no eran permanentes.",
        arm: "Քանի որ նրանք քոչվոր էին, այդ բնակավայրերը մշտական չէին։",
      },
    ],
  },
  {
    id: 7,
    titleEs: "7. La sociedad",
    titleArm: "7. Հասարակությունը",
    items: [
      {
        es: "Vivían en pequeños grupos.",
        arm: "Նրանք ապրում էին փոքր խմբերով։",
      },
      {
        es: "Los miembros del grupo colaboraban para conseguir alimentos y protegerse.",
        arm: "Խմբի անդամները համագործակցում էին սնունդ ձեռք բերելու և պաշտպանվելու համար։",
      },
      {
        es: "La cooperación era muy importante para sobrevivir.",
        arm: "Համագործակցությունը շատ կարևոր էր գոյատևելու համար։",
      },
    ],
  },
  {
    id: 8,
    titleEs: "8. El arte rupestre",
    titleArm: "8. Ժայռապատկերային արվեստը",
    items: [
      {
        es: "En el Paleolítico aparecieron algunas de las primeras manifestaciones artísticas.",
        arm: "Պալեոլիթի ժամանակ առաջացան արվեստի առաջին ձևերից մի քանիսը։",
      },
      {
        es: "Pintaban en las paredes de las cuevas.",
        arm: "Նրանք նկարում էին քարանձավների պատերին։",
      },
      {
        es: "Representaban sobre todo animales y escenas relacionadas con la caza.",
        arm: "Նրանք հիմնականում պատկերում էին կենդանիներ և որսի հետ կապված տեսարաններ։",
      },
      {
        es: "Estas pinturas se llaman pinturas rupestres.",
        arm: "Այս նկարները կոչվում են ժայռապատկերներ։",
      },
    ],
  },
];

export const VOCABULARY_LIST: VocabWord[] = [
  { id: 1, es: "Paleolítico", arm: "Պալեոլիթ", category: "Época / Դարաշրջան", icon: "🗿" },
  { id: 2, es: "nómada", arm: "քոչվոր", category: "Modo de vida / Կենսակերպ", icon: "🏕️" },
  { id: 3, es: "caza", arm: "որս", category: "Actividad / Գործունեություն", icon: "🏹" },
  { id: 4, es: "pesca", arm: "ձկնորսություն", category: "Actividad / Գործունեություն", icon: "🐟" },
  { id: 5, es: "recolección", arm: "հավաքչություն", category: "Actividad / Գործունեություն", icon: "🌾" },
  { id: 6, es: "cazador", arm: "որսորդ", category: "Persona / Մարդ", icon: "🏹" },
  { id: 7, es: "recolector", arm: "հավաքարար", category: "Persona / Մարդ", icon: "🧺" },
  { id: 8, es: "herramienta", arm: "գործիք", category: "Objetos / Առարկաներ", icon: "🔨" },
  { id: 9, es: "piedra", arm: "քար", category: "Materiales / Նյութեր", icon: "🪨" },
  { id: 10, es: "hueso", arm: "ոսկոր", category: "Materiales / Նյութեր", icon: "🦴" },
  { id: 11, es: "madera", arm: "փայտ", category: "Materiales / Նյութեր", icon: "🪵" },
  { id: 12, es: "fuego", arm: "կրակ", category: "Elemento / Տարր", icon: "🔥" },
  { id: 13, es: "cueva", arm: "քարանձավ", category: "Vivienda / Բնակավայր", icon: "⛰️" },
  { id: 14, es: "refugio", arm: "ապաստարան", category: "Vivienda / Բնակավայր", icon: "🛖" },
  { id: 15, es: "piel", arm: "կենդանու մորթի", category: "Materiales / Նյութեր", icon: "🦊" },
  { id: 16, es: "pinturas rupestres", arm: "ժայռապատկերներ", category: "Arte / Արվեստ", icon: "🎨" },
  { id: 17, es: "sobrevivir", arm: "գոյատևել", category: "Verbo / Բայ", icon: "🌱" },
  { id: 18, es: "naturaleza", arm: "բնություն", category: "Entorno / Բնություն", icon: "🌳" },
];

export const QA_LIST: QAItem[] = [
  {
    number: 1,
    questionEs: "¿Qué fue el Paleolítico?",
    questionArm: "Ի՞նչ էր Պալեոլիթը։",
    answerEs: "Fue la etapa más antigua de la Prehistoria.",
    answerArm: "Այն նախապատմության ամենահին ժամանակաշրջանն էր։",
  },
  {
    number: 2,
    questionEs: "¿Qué significa Paleolítico?",
    questionArm: "Ի՞նչ է նշանակում Պալեոլիթ։",
    answerEs: "Significa aproximadamente “piedra antigua”.",
    answerArm: "Այն մոտավորապես նշանակում է «հին քար»։",
  },
  {
    number: 3,
    questionEs: "¿Los seres humanos eran nómadas o sedentarios?",
    questionArm: "Մարդիկ քոչվո՞ր էին, թե՞ նստակյաց։",
    answerEs: "Eran nómadas.",
    answerArm: "Նրանք քոչվոր էին։",
  },
  {
    number: 4,
    questionEs: "¿Qué significa ser nómada?",
    questionArm: "Ի՞նչ է նշանակում քոչվոր լինել։",
    answerEs: "Significa cambiar de lugar de residencia.",
    answerArm: "Դա նշանակում է հաճախ փոխել բնակության վայրը։",
  },
  {
    number: 5,
    questionEs: "¿De qué vivían los seres humanos del Paleolítico?",
    questionArm: "Ինչո՞վ էին ապրում Պալեոլիթի մարդիկ։",
    answerEs: "Vivían de la caza, la pesca y la recolección.",
    answerArm: "Նրանք ապրում էին որսով, ձկնորսությամբ և հավաքչությամբ։",
  },
  {
    number: 6,
    questionEs: "¿Practicaban la agricultura?",
    questionArm: "Արդյո՞ք նրանք զբաղվում էին գյուղատնտեսությամբ։",
    answerEs: "No, todavía no practicaban la agricultura.",
    answerArm: "Ոչ, նրանք դեռ չէին զբաղվում գյուղատնտեսությամբ։",
  },
  {
    number: 7,
    questionEs: "¿De qué materiales hacían herramientas?",
    questionArm: "Ի՞նչ նյութերից էին պատրաստում գործիքները։",
    answerEs: "De piedra, madera y hueso.",
    answerArm: "Քարից, փայտից և ոսկորից։",
  },
  {
    number: 8,
    questionEs: "¿Para qué utilizaban las herramientas?",
    questionArm: "Ինչի՞ համար էին օգտագործում գործիքները։",
    answerEs: "Para cazar, cortar y preparar alimentos.",
    answerArm: "Որսի, կտրելու և սնունդ պատրաստելու համար։",
  },
  {
    number: 9,
    questionEs: "¿Por qué era importante el fuego?",
    questionArm: "Ինչո՞ւ էր կրակը կարևոր։",
    answerEs: "Porque daba calor y luz, permitía cocinar y ayudaba a protegerse.",
    answerArm: "Որովհետև այն տալիս էր ջերմություն և լույս, թույլ էր տալիս սնունդ պատրաստել և օգնում էր պաշտպանվել։",
  },
  {
    number: 10,
    questionEs: "¿Dónde vivían?",
    questionArm: "Որտե՞ղ էին նրանք ապրում։",
    answerEs: "En cuevas y refugios sencillos.",
    answerArm: "Քարանձավներում և պարզ ապաստարաններում։",
  },
  {
    number: 11,
    questionEs: "¿Vivían solos?",
    questionArm: "Նրանք մենա՞կ էին ապրում։",
    answerEs: "No, vivían en pequeños grupos.",
    answerArm: "Ոչ, նրանք ապրում էին փոքր խմբերով։",
  },
  {
    number: 12,
    questionEs: "¿Por qué era importante vivir en grupo?",
    questionArm: "Ինչո՞ւ էր կարևոր խմբով ապրելը։",
    answerEs: "Porque podían colaborar para conseguir alimentos y protegerse.",
    answerArm: "Քանի որ նրանք կարող էին համագործակցել՝ սնունդ ձեռք բերելու և պաշտպանվելու համար։",
  },
  {
    number: 13,
    questionEs: "¿Qué es el arte rupestre?",
    questionArm: "Ի՞նչ է ժայռապատկերային արվեստը։",
    answerEs: "Son pinturas realizadas en las paredes de las cuevas.",
    answerArm: "Դրանք քարանձավների պատերին արված նկարներ են։",
  },
  {
    number: 14,
    questionEs: "¿Qué representaban en las pinturas rupestres?",
    questionArm: "Ի՞նչ էին պատկերում ժայռապատկերներում։",
    answerEs: "Principalmente animales y escenas de caza.",
    answerArm: "Հիմնականում կենդանիներ և որսի տեսարաններ։",
  },
  {
    number: 15,
    questionEs: "¿Dependían mucho de la naturaleza?",
    questionArm: "Նրանք շա՞տ էին կախված բնությունից։",
    answerEs: "Sí, porque conseguían de la naturaleza sus alimentos y materiales.",
    answerArm: "Այո, որովհետև բնությունից էին ստանում իրենց սնունդն ու նյութերը։",
  },
];

export const SUMMARY_INFO = {
  titleEs: "Resumen muy corto para memorizar",
  titleArm: "Շատ կարճ ամփոփում՝ հիշելու համար",
  es: "En el Paleolítico, los seres humanos eran nómadas. Vivían de la caza, la pesca y la recolección. Utilizaban herramientas de piedra, controlaban el fuego, vivían en cuevas o refugios y realizaban pinturas rupestres.",
  arm: "Պալեոլիթի ժամանակ մարդիկ քոչվոր էին։ Նրանք ապրում էին որսով, ձկնորսությամբ և հավաքչությամբ։ Օգտագործում էին քարե գործիքներ, վերահսկում էին կրակը, ապրում էին քարանձավներում կամ ապաստարաններում և ստեղծում էին ժայռապատկերներ։",
  keyPoints: [
    { es: "Eran nómadas", arm: "Քոչվոր էին" },
    { es: "Caza, pesca y recolección", arm: "Որս, ձկնորսություն և հավաքչություն" },
    { es: "Herramientas de piedra", arm: "Քարե գործիքներ" },
    { es: "Controlaban el fuego", arm: "Վերահսկում էին կրակը" },
    { es: "Cuevas o refugios", arm: "Քարանձավներ կամ ապաստարաններ" },
    { es: "Pinturas rupestres", arm: "Ժայռապատկերներ" },
  ],
};

export interface ImportantTextItem {
  id: number;
  es: string;
  arm: string;
  highlightEs?: string;
  highlightArm?: string;
}

export interface ImportantQAItem {
  id: number;
  questionEs: string;
  questionArm: string;
  answerEs: string;
  answerArm: string;
}

export const IMPORTANT_SECTION_DATA = {
  headerEs: "2. El Paleolítico",
  headerArm: "Հին քարի դար",
  subHeaderEs: "Texto para memorizar",
  subHeaderArm: "Տեքստ՝ անգիր սովորելու համար",
  qaHeaderEs: "Preguntas y respuestas",
  qaHeaderArm: "Հարցեր և պատասխաններ",
  texts: [
    {
      id: 1,
      es: "El Paleolítico es la primera etapa de la Prehistoria. Comenzó hace unos 2,5 millones de años y terminó aproximadamente hacia el año 10.000 a. C., aunque las fechas varían según la región.",
      arm: "Հին քարի դարը նախապատմության առաջին փուլն է։ Այն սկսվել է մոտ 2,5 միլիոն տարի առաջ և ավարտվել մոտավորապես մ.թ.ա. 10 000 թվականին, թեև տարեթվերը տարբեր են՝ կախված տարածաշրջանից։",
    },
    {
      id: 2,
      es: "Los seres humanos eran nómadas: se desplazaban de un lugar a otro en busca de alimentos. Vivían en pequeños grupos y se refugiaban en cuevas o en campamentos con cabañas.",
      arm: "Մարդիկ քոչվոր էին․ սնունդ փնտրելու համար տեղափոխվում էին մի վայրից մյուսը։ Նրանք ապրում էին փոքր խմբերով և պատսպարվում էին քարանձավներում կամ խրճիթներով ճամբարներում։",
      highlightEs: "nómadas",
      highlightArm: "քոչվոր",
    },
    {
      id: 3,
      es: "Se alimentaban de la caza, la pesca y la recolección de frutos, raíces y semillas. Su economía era depredadora, porque obtenían los alimentos directamente de la naturaleza. Todavía no practicaban la agricultura ni la ganadería.",
      arm: "Նրանք սնվում էին որսորդության, ձկնորսության և հավաքչության միջոցով՝ հավաքելով պտուղներ, արմատներ ու սերմեր։ Նրանց տնտեսությունը յուրացնող էր, քանի որ սնունդը վերցնում էին անմիջապես բնությունից։ Նրանք դեռ չէին զբաղվում երկրագործությամբ և անասնապահությամբ։",
      highlightEs: "caza, la pesca y la recolección | depredadora",
      highlightArm: "որսորդության, ձկնորսության և հավաքչության | յուրացնող",
    },
    {
      id: 4,
      es: "Fabricaban herramientas de piedra tallada, hueso y madera. Utilizaban estas herramientas para cazar, cortar carne y trabajar las pieles. Se protegían del frío con pieles de animales.",
      arm: "Նրանք գործիքներ էին պատրաստում տաշած քարից, ոսկորից և փայտից։ Այդ գործիքներն օգտագործում էին որս անելու, միս կտրելու և կաշիները մշակելու համար։ Ցրտից պաշտպանվում էին կենդանիների մորթիներով։",
      highlightEs: "piedra tallada",
      highlightArm: "տաշած քարից",
    },
    {
      id: 5,
      es: "Durante el Paleolítico aprendieron a controlar el fuego. Lo utilizaban para calentarse, cocinar, iluminar y protegerse de los animales.",
      arm: "Հին քարի դարում մարդիկ սովորեցին կառավարել կրակը։ Այն օգտագործում էին տաքանալու, սնունդ պատրաստելու, լուսավորելու և կենդանիներից պաշտպանվելու համար։",
      highlightEs: "fuego",
      highlightArm: "կրակը",
    },
    {
      id: 6,
      es: "También crearon arte rupestre: pintaban animales y otros motivos en las paredes de las cuevas. Además, fabricaban pequeñas esculturas. Algunos grupos enterraban a sus muertos.",
      arm: "Նրանք ստեղծեցին նաև ժայռապատկերներ․ քարանձավների պատերին նկարում էին կենդանիներ և այլ պատկերներ։ Բացի այդ, պատրաստում էին փոքր քանդակներ։ Որոշ խմբեր թաղում էին իրենց մահացածներին։",
      highlightEs: "arte rupestre",
      highlightArm: "ժայռապատկերներ",
    },
  ],
  qa: [
    {
      id: 1,
      questionEs: "¿Qué es el Paleolítico?",
      questionArm: "Ի՞նչ է հին քարի դարը։",
      answerEs: "Es la primera etapa de la Prehistoria.",
      answerArm: "Դա նախապատմության առաջին փուլն է։",
    },
    {
      id: 2,
      questionEs: "¿Cuándo comenzó el Paleolítico?",
      questionArm: "Ե՞րբ է սկսվել հին քարի դարը։",
      answerEs: "Comenzó hace unos 2,5 millones de años.",
      answerArm: "Այն սկսվել է մոտ 2,5 միլիոն տարի առաջ։",
    },
    {
      id: 3,
      questionEs: "¿Qué significa ser nómada?",
      questionArm: "Ի՞նչ է նշանակում քոչվոր լինել։",
      answerEs: "Significa desplazarse de un lugar a otro, sin vivir permanentemente en un mismo lugar.",
      answerArm: "Դա նշանակում է տեղափոխվել մի վայրից մյուսը՝ մշտապես նույն վայրում չապրելով։",
    },
    {
      id: 4,
      questionEs: "¿Por qué eran nómadas?",
      questionArm: "Ինչո՞ւ էին մարդիկ քոչվոր։",
      answerEs: "Porque se desplazaban en busca de alimentos.",
      answerArm: "Որովհետև սնունդ փնտրելու համար տեղափոխվում էին։",
    },
    {
      id: 5,
      questionEs: "¿Dónde vivían?",
      questionArm: "Որտե՞ղ էին նրանք ապրում։",
      answerEs: "Vivían en cuevas o en campamentos con cabañas.",
      answerArm: "Նրանք ապրում էին քարանձավներում կամ խրճիթներով ճամբարներում։",
    },
    {
      id: 6,
      questionEs: "¿Cómo conseguían los alimentos?",
      questionArm: "Ինչպե՞ս էին նրանք սնունդ ձեռք բերում։",
      answerEs: "Mediante la caza, la pesca y la recolección.",
      answerArm: "Որսորդության, ձկնորսության և հավաքչության միջոցով։",
    },
    {
      id: 7,
      questionEs: "¿Por qué su economía era depredadora?",
      questionArm: "Ինչո՞ւ էր նրանց տնտեսությունը յուրացնող։",
      answerEs: "Porque obtenían los alimentos directamente de la naturaleza y no los producían.",
      answerArm: "Որովհետև սնունդը վերցնում էին անմիջապես բնությունից և իրենք չէին արտադրում այն։",
    },
    {
      id: 8,
      questionEs: "¿Practicaban la agricultura y la ganadería?",
      questionArm: "Նրանք զբաղվո՞ւմ էին երկրագործությամբ և անասնապահությամբ։",
      answerEs: "No, todavía no practicaban la agricultura ni la ganadería.",
      answerArm: "Ոչ, նրանք դեռ չէին զբաղվում երկրագործությամբ և անասնապահությամբ։",
    },
    {
      id: 9,
      questionEs: "¿De qué materiales fabricaban las herramientas?",
      questionArm: "Ի՞նչ նյութերից էին պատրաստում գործիքները։",
      answerEs: "De piedra tallada, hueso y madera.",
      answerArm: "Տաշած քարից, ոսկորից և փայտից։",
    },
    {
      id: 10,
      questionEs: "¿Para qué utilizaban el fuego?",
      questionArm: "Ինչի՞ համար էին օգտագործում կրակը։",
      answerEs: "Para calentarse, cocinar, iluminar y protegerse de los animales.",
      answerArm: "Տաքանալու, սնունդ պատրաստելու, լուսավորելու և կենդանիներից պաշտպանվելու համար։",
    },
    {
      id: 11,
      questionEs: "¿Cómo se protegían del frío?",
      questionArm: "Ինչպե՞ս էին պաշտպանվում ցրտից։",
      answerEs: "Se protegían con pieles de animales y con el fuego.",
      answerArm: "Պաշտպանվում էին կենդանիների մորթիներով և կրակի օգնությամբ։",
    },
    {
      id: 12,
      questionEs: "¿Qué es el arte rupestre?",
      questionArm: "Ի՞նչ են ժայռապատկերները։",
      answerEs: "Son imágenes realizadas sobre las rocas, por ejemplo, en las paredes de las cuevas.",
      answerArm: "Դրանք ժայռերի վրա, օրինակ՝ քարանձավների պատերին ստեղծված պատկերներ են։",
    },
  ],
};
