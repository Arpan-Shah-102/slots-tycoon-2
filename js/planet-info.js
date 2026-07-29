const allPlanetNames = [
  "Astra", "Vesper", "Nyxara", "Solis", "Caldera", "Orbis", "Zephra", "Luma", "Nereid", "Thalos",
  "Aurion", "Bellatrix", "Cyris", "Deltara", "Eryx", "Faron", "Galaxor", "Helion", "Ilyra", "Jorvak",
  "Kestrel", "Lyra", "Mavros", "Noctis", "Oryx", "Pyra", "Quorra", "Riven", "Sylos", "Taran",
  "Umbra", "Virel", "Wyver", "Xandor", "Yeltra", "Zorin", "Arctus", "Brimora", "Cydra", "Dravos",
  "Eldra", "Fylis", "Galdor", "Hesper", "Icaron", "Junoir", "Kylos", "Lorien", "Mystrix", "Nivara",
  "Ophel", "Phaera", "Quill", "Rhex", "Soryn", "Tyra", "Ulric", "Valtor", "Wexis", "Xylo",
  "Yara", "Zephyrion", "Alther", "Beryn", "Corvis", "Drax", "Eloria", "Fendrel", "Gryx", "Halcyon",
  "Ivara", "Jaxor", "Klyne", "Lethod", "Merix", "Nerith", "Ostel", "Prym", "Qelra", "Ralith",
  "Selyx", "Tovar", "Uldra", "Veyron", "Wyst", "Xelora", "Yondar", "Zaphos", "Asteron", "Bravus",
  "Cyral", "Denor", "Elixis", "Faronis", "Grel", "Hadria", "Iskar", "Jorn", "Kairon", "Lysir",

  "Aurelia", "Brontes", "Caelus", "Doria", "Elysia", "Fenris", "Gaiana", "Heros", "Ilyth", "Jorra",
  "Kaelis", "Lunara", "Morvyn", "Nysa", "Orelia", "Pheron", "Quasia", "Rydel", "Seren", "Tyrus",
  "Ulara", "Vion", "Wexara", "Xyra", "Ysolde", "Zarex", "Avelis", "Brion", "Cindar", "Doreth",
  "Evaris", "Fyra", "Galdis", "Halen", "Isolde", "Jorath", "Kytha", "Laris", "Myrax", "Noren",
  "Ophira", "Pylos", "Querin", "Rhovan", "Sytha", "Toren", "Umera", "Vales", "Wyrin", "Xeran",
  "Yavik", "Zelora", "Anther", "Brel", "Cerys", "Dovak", "Elaris", "Fyor", "Gralen", "Hyris",
  "Ithra", "Jalen", "Korrin", "Lyris", "Maveth", "Norel", "Orisa", "Prylor", "Quendal", "Rhovis",
  "Selen", "Tavar", "Ulyss", "Varek", "Wren", "Xalith", "Yorian", "Zivra", "Amon", "Beryllis",
  "Calar", "Deryn", "Eron", "Fexis", "Garen", "Hylia", "Isen", "Jovar", "Kres", "Lorax",
  "Mirel", "Nyth", "Orven", "Peryx", "Quen", "Ralor", "Syra", "Toris", "Uvren", "Vexa",

  "Waldor", "Xeris", "Yalor", "Zerin", "Arven", "Braska", "Cydon", "Delis", "Eryon", "Falis",
  "Gorim", "Helys", "Ivarn", "Jorik", "Kylian", "Lavor", "Miras", "Neris", "Othra", "Peryn",
  "Qorin", "Ralden", "Savor", "Theris", "Ulven", "Voris", "Wyra", "Xelus", "Yoran", "Zylis",
  "Aeral", "Beryx", "Cador", "Dymis", "Elven", "Fralon", "Gethra", "Havor", "Ilyon", "Jareth",
  "Koral", "Luthis", "Morax", "Nivis", "Oryon", "Phelis", "Quorin", "Retha", "Sylven", "Torax",
  "Uvrin", "Velis", "Wexor", "Xylen", "Ythra", "Zoris", "Alven", "Brisor", "Calyx", "Dareth",
  "Erion", "Fylor", "Gravis", "Hestra", "Ilvor", "Joryn", "Kares", "Lymis", "Mavon", "Nareth",
  "Oleris", "Phael", "Qyris", "Rovis", "Selyra", "Thavon", "Urel", "Vardon", "Wylis", "Xeron",
  "Ylvia", "Zorven", "Arthon", "Brexis", "Ceron", "Dovris", "Elysor", "Fyn", "Garon", "Hylor",
  "Ivron", "Jexis", "Kyra", "Loran", "Myris", "Nylor", "Orthon", "Pryxis", "Quelor", "Rhyv",

  "Saron", "Telys", "Uxen", "Vyris", "Walen", "Xorion", "Yavris", "Zelthis", "Auryx", "Brelis",
  "Cavor", "Delyx", "Evarn", "Fros", "Gralenor", "Hyrax", "Ivaris", "Joreth", "Klyra", "Lethon",
  "Morvax", "Nylis", "Orax", "Pylen", "Qavon", "Rylis", "Sylor", "Tovris", "Uther", "Voren",
  "Westra", "Xalor", "Yeth", "Zorax", "Aven", "Brionis", "Cerix", "Drovyn", "Elthra", "Fylen",
  "Gorax", "Hespera", "Ilyonis", "Juvor", "Keren", "Lysand", "Mervon", "Norax", "Othion", "Pheris",
  "Quovis", "Ralyn", "Sythor", "Tarenis", "Ulthor", "Vexor", "Wyris", "Xorax", "Yelvis", "Zoran",
  "Aelion", "Berynna", "Caldor", "Dorex", "Erylis", "Fendar", "Gylis", "Halvor", "Ithon", "Jaxis",
  "Kyren", "Lorvyn", "Myrith", "Norex", "Orvion", "Pelyx", "Qylen", "Rethis", "Sorel", "Torvin",
  "Ulyra", "Varn", "Wexis", "Xyphon", "Yordis", "Zylor", "Alaris", "Bravon", "Ceryn", "Dalsor",
  "Elaron", "Fyoris", "Gravison", "Hyral", "Ilen", "Jorvik", "Kalis", "Lyron", "Merath", "Nivor",

  "Osera", "Pryn", "Quarix", "Rylor", "Senva", "Theron", "Ulas", "Virex", "Wador", "Xerisor",
  "Yalven", "Zymis", "Aderis", "Johnathan", "Jotaro", "Josuke", "Elarix", "Fynor", "Grell", "Havoris",
  "Isera", "Jend", "Kavor", "Joseph", "Joleyne", "Giorno", "Othrax", "Josuke 2", "Quenor", "Ralvis",
  "Soryth", "Tyran", "Ulis", "Velsa", "Johnny", "Jodio", "Yelis", "Zorath", "Auren", "Brex",
  "Cydalis", "Deryx", "Evor", "Frith", "Star Plantinum", "Hylos", "Ivoris", "Jarel", "Kymis", "Lethis",
  "Mavor", "Neryx", "Orlin", "Osiris", "Gojo", "Horus", "Vanilla Ice", "Ceaser", "Ulin", "Vorath",
  "Weyra", "Xalion", "Sukana", "Zethra", "Alvyn", "Borsis", "Ceral", "Dymor", "Elysian", "Faronis",
  "Gyris", "Heston", "Ilyran", "Jovik", "Crazy Diamond", "Lorath", "Kars", "Noreth", "Orvenis", "Pylor",
  "Quyx", "Ralven", "Syris", "King Crimson", "Ulvara", "Vexis", "Wryth", "Xandra", "Yorin", "Zevra",
  "Astrax", "Belora", "Cindrel", "Killer Queen", "THE WORLD", "Falor", "Made in Heaven", "Hovra", "Ilyss", "Jorlen",

  "Kavora", "Lyther", "Myrora", "Nyxen", "Orlith", "Pryson", "Quavra", "Ralithon", "Sylora", "Terva",
  "Uloris", "Velyx", "Wystra", "Xelor", "Yavora", "Zeris", "Arloth", "Brevon", "Ceryx", "Dylora",
  "Elvor", "Fennix", "Garonis", "Helora", "Ivora", "Jaxel", "Keryx", "Lurion", "Morlis", "Nethra",
  "Orylis", "Phelora", "Quaris", "Ryndor", "Savel", "Therix", "Ulyron", "Vornis", "Wexara", "Xylena",
  "Yelora", "Zorvyn", "Aethra", "Brilon", "Cyrion", "Delyra", "Eryonis", "Flaris", "Gethor", "Hylara",
  "Iveris", "Jorlis", "Kymora", "Lethor", "Myrlen", "Norvax", "Orelis", "Pyrion", "Qelix", "Rhyla",
  "Syrion", "Tylor", "Uvera", "Vexel", "Wyrion", "Xalva", "Yoris", "Zelvyn", "Althor", "Beryla",
  "Cavoris", "Derion", "Elsyn", "Fynara", "Gralenis", "Herion", "Ilys", "Jorvex", "Keldra", "Lorvis",
  "Mythra", "Navor", "Oxis", "Peryla", "Quell", "Rovax", "Silen", "Tralor", "Uveris", "Vynra",
  "Worlen", "Xyrax", "Yelith", "Zorlen", "Avelor", "Bryn", "Cydor", "Dorith", "Elvora", "Farlis",

  "Grylon", "Havora", "Ilaris", "Jyn", "Kavoris", "Lyren", "Mavora", "Noris", "Ovel", "Pyron",
  "Quarris", "Relis", "Sylvena", "Theris", "Ulor", "Vayra", "Wexis", "Xorly", "Yaloris", "Zyris",
  "Aleron", "Brivis", "Ceryth", "Davora", "Elth", "Fyoris", "Grelis", "Hynor", "Iveron", "Jalis",
  "Kythor", "Lorex", "Myren", "Nivora", "Orys", "Pherax", "Quenlis", "Ralora", "Seryx", "Torlis",
  "Uvora", "Velon", "Wyral", "Xenor", "Ylora", "Zath", "Aronis", "Belyx", "Cydrax", "Dovelis",
  "Elaryn", "Farel", "Gorvyn", "Hylis", "Iorix", "Jorella", "Kymis", "Lavoris", "Meryx", "Norella",
  "Othar", "Prylis", "Quindra", "Rhelis", "Sovar", "Telyra", "Uxora", "Varex", "Wilis", "Xyora",
  "Yonis", "Zelar", "Athex", "Bris", "Cavora", "Delyn", "Evoris", "Faryn", "Grelora", "Haxis",
  "Ilyrax", "Jorvin", "Kales", "Lyrora", "Morven", "Nylora", "Orvis", "Pelyra", "Qaris", "Rylora",
  "Selyn", "Tavoris", "Ulix", "Vareth", "Wyra", "Xeloris", "Yavon", "Zeral", "Axiom", "Bravira",

  "Calyxis", "Drevon", "Elarith", "Fylora", "Gorn", "Hethis", "Ilyvon", "Joraxa", "Kelmor", "Loriva",
  "Mavrix", "Norith", "Orlena", "Pryv", "Quenla", "Rhovar", "Sylen", "Tyris", "Ulorin", "Vexora",
  "Wystis", "Xyland", "Yorel", "Zynor", "Alvora", "Brenn", "Cidra", "Dorvan", "Eryxis", "Floryn",
  "Gareth", "Hyloris", "Islen", "Javoris", "Kaira", "Lend", "Myrath", "Navoris", "Olyra", "Pheronx",
  "Queloris", "Rydra", "Serin", "Tervis", "Ulyx", "Vornax", "Welys", "Xaris", "Yelth", "Zorina",
  "Aleris", "Brelon", "Cyrava", "Delyxis", "Evorna", "Ferl", "Gravia", "Harlis", "Ilora", "Jenyx",
  "Kelis", "Loryn", "Maveth", "Nyvora", "Oris", "Pylara", "Quoris", "Rynel", "Solyn", "Tyvora",
  "Uveris", "Vylor", "Wrena", "Xelith", "Yaris", "Zovra", "Arlyn", "Belis", "Cerya", "Dovira",
  "Elora", "Fynis", "Gralyn", "Helis", "Ivorax", "Jorina", "Krys", "Lareth", "Miris", "Nora",
  "Othyn", "Peryn", "Quavis", "Relis", "Sylorax", "Tylis", "Urena", "Varelia", "Wexora", "Xyris",

  "Yavira", "Zelis", "Astryn", "Bravix", "Cyra", "Delora", "Erylin", "Farona", "Glyx", "Haris",
  "Ilythra", "Jorvyn", "Kalen", "Lorathis", "Myrava", "Nerison", "Orlix", "Prys", "Quaria", "Rhovel",
  "Seryn", "Torava", "Ulyth", "Vardis", "Wyn", "Xorila", "Yelsa", "Zorava", "Alvix", "Brella",
  "Cydora", "Davorin", "Elarisx", "Felyra", "Garlis", "Hovin", "Ivera", "Jalison", "Keryla", "Loris",
  "Mavora", "Nylex", "Oreliax", "Pyris", "Quendra", "Ralynx", "Sylorae", "Tivor", "Uxelis", "Vellor",
  "Wyrae", "Xalyn", "Yorava", "Zelyx", "Aeris", "Bronav", "Cerylis", "Dorelia", "Eryxen", "Fylis",
  "Grelva", "Halis", "Ivoren", "Jorvel", "Kymorax", "Lorae", "Myrison", "Norelia", "Othrix", "Pryva",
  "Quyra", "Rylis", "Savora", "Tyrel", "Ulyssa", "Vexira", "Wyndor", "Xeris", "Yelorae", "Zorix",
  "Arvyn", "Belorax", "Cydelis", "Dovarae", "Elarix", "Fynel", "Gresha", "Harvyn", "Ilyora", "Joralis",
  "Kelvor", "Lyriax", "Merva", "Norelis", "Oxara", "Phelis", "Quivra", "Ryndel", "Selyrae", "Toriva",

  "Ulyrax", "Vaylis", "Wexar", "Xyrion", "Yavelis", "Zorathis", "Arel", "Bralor", "Cydonis", "Derylis",
  "Elyx", "Faryn", "Gralor", "Heryx", "Ilaria", "Jorvax", "Kelora", "Lyven", "Mavris", "Norexis",
  "Olivra", "Peryth", "Quarlen", "Rhovis", "Selyx", "Tyrax", "Uvex", "Velorae", "Wyra", "Xalith",
  "Yorin", "Zelyra", "Asteris", "Borax", "Ciryx", "Delis", "Evarra", "Fyrel", "Gavor", "Hylora",
  "Ivera", "Jorae", "Kymelis", "Larethis", "Moryx", "Nylis", "Orvella", "Prylora", "Qyra", "Ravel",
  "Sorya", "Tavara", "Ulen", "Vyral", "Wexorae", "Xeris", "Yelvin", "Zorinae", "Alth", "Brenis",
  "Cydrae", "Dovix", "Elaronis", "Fylorae", "Grelisx", "Horva", "Ilys", "Jorena", "Kavorae", "Loryx",
  "Mavorae", "Nerisx", "Orlena", "Phexis", "Quorina", "Relyn", "Sylis", "Tyrae", "Uxorae", "Velyra",
  "Wyris", "Xenora", "Yalis", "Zoryn", "Avelis", "Brena", "Cydran", "Dovora", "Elyrax", "Faronisx",
  "Grelora", "Halyx", "Ivorisx", "Jorlyn", "Kymorae", "Lerva", "Myrel", "Norisx", "Orlora", "Pelyx",

  "Quavora", "Rylorae", "Serylis", "Tovara", "Ulyxen", "Varelis", "Wyron", "Xalora", "Yeris", "Zovelis",
  "Astrae", "Brevonis", "Cydorae", "Delvina", "Erylisx", "Farya", "Grelor", "Hylena", "Iverisx", "Jorvia",
  "Kelaryn", "Lorena", "Mavelis", "Norven", "Orelor", "Phelyx", "Quenara", "Rivis", "Sylorae", "Tyval",
  "Ulorisx", "Vynora", "Wexelis", "Xylar", "Yavorae", "Zelix", "Alvorae", "Breryn", "Cydelisx", "Dorex",
  "Elara", "Fyrae", "Garlon", "Herya", "Ilyvra", "Joralen", "Kylis", "Lorava", "Myriona", "Noryx",
  "Oralea", "Pryven", "Quis", "Ralorae", "Sylvenx", "Terva", "Uven", "Velisx", "Weryn", "Xorava",
  "Yelorax", "Zyran", "Aelora", "Brivon", "Cydrix", "Delyrae", "Erya", "Fylorin", "Gavoris", "Hylix",
  "Iveronis", "Jorax", "Kerylis", "Loryva", "Mavorax", "Norelae", "Orvix", "Pelyrae", "Quarion", "Ralvenx",
  "Seryra", "Tyrax", "Ulyorin", "Varexis", "Wyrae", "Xelorae", "Yorinx", "Zerva", "Arlora", "Beryn",
  "Cydara", "Dovelisx", "Elarisx", "Fylar", "Grelina", "Havorisx", "Ilyrena", "Jorav", "Kylora", "Leris"
];
const allPlanetAtmospheres = {
  "Ideal": [1, 5], "Toxic": [-5, 0], "Carbonic": [-2, 2], "Methane": [-3, 3], "Hydrogen": [-1, 1], "Helium": [-1, 2], "Nitrogen": [-2, 2], "Oxygen": [-1, 3],
  "Sulfuric": [-4, 0], "Radioactive": [-7, -2], "Oxygen-Rich": [0, 4]
};
const allPlanetStabilities = {
  "Unstable": [-3, 0], "Volatile": [-5, -1], "Exceptional": [1, 6], "Calm": [0, 2], "Balanced": [1, 3], "Fragile": [-3, -1], "Resilient": [-1, 4],
  "Chaotic": [-3, 3], "Stable": [0, 5]
};

function randomIntInRange(minMaxList) {
  const [min, max] = minMaxList;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomPlanetName() {
  return allPlanetNames[Math.floor(Math.random() * allPlanetNames.length)]; 
}
function generateRandomPlanetPopulation() {
  const roll = Math.random(); 
  const randomIn = (min, max) => Math.floor(Math.random() * (max - min)) + min;

  if (roll < 0.05) return [randomIn(0, 1000), [-1, 1]];
  if (roll < 0.15) return [randomIn(1000, 10000), [-1, 1]];
  if (roll < 0.40) return [randomIn(10000, 100000), [-1, 1]];
  if (roll < 0.60) return [randomIn(100000, 1000000), [-1, 1]];
  if (roll < 0.75) return [randomIn(1000000, 10000000), [-2, 2]];
  if (roll < 0.85) return [randomIn(10000000, 100000000), [-3, 3]];
  if (roll < 0.90) return [randomIn(100000000, 1000000000), [-4, 4]];
  if (roll < 0.95) return [randomIn(1000000000, 10000000000), [-5, 5]];
  return [randomIn(10000000000, 100000000000), [-6, 6]];
}
function getPlanetResourceBonus(resourceAmount) {
  if (resourceAmount < 150) return [-5, 0];
  if (resourceAmount < 300) return [-3, 1];
  if (resourceAmount < 500) return [-2, 2];
  if (resourceAmount < 750) return [-1, 3];
  if (resourceAmount < 900) return [0, 4];
  return [1, 5];
}
function getRandomPlanetAtmosphere() {
  const atmospheres = Object.keys(allPlanetAtmospheres);
  return atmospheres[Math.floor(Math.random() * atmospheres.length)];
}
function getRandomPlanetStability() {
  const stabilities = Object.keys(allPlanetStabilities);
  return stabilities[Math.floor(Math.random() * stabilities.length)];
}
function getPlanetEfficiencyBonus(efficiency) {
  if (efficiency < 15) return [-5, 0];
  if (efficiency < 30) return [-4, 0];
  if (efficiency < 50) return [-3, 1];
  if (efficiency < 70) return [-1, 2];
  if (efficiency < 90) return [0, 3];
  return [1, 4];
}
function getRandomPlanetIconClass() {
  const roll = Math.random();
  if (roll < 0.05) return "planet-icon-11";
  if (roll < 0.1) return "planet-icon-1";
  if (roll < 0.15) return "planet-icon-12";
  if (roll < 0.2) return "planet-icon-2";
  if (roll < 0.25) return "planet-icon-13";
  if (roll < 0.3) return "planet-icon-3";
  if (roll < 0.35) return "planet-icon-14";
  if (roll < 0.4) return "planet-icon-4";
  if (roll < 0.45) return "planet-icon-15";
  if (roll < 0.5) return "planet-icon-5";
  if (roll < 0.55) return "planet-icon-16";
  if (roll < 0.6) return "planet-icon-6";
  if (roll < 0.65) return "planet-icon-17";
  if (roll < 0.7) return "planet-icon-7";
  if (roll < 0.75) return "planet-icon-18";
  if (roll < 0.8) return "planet-icon-8";
  if (roll < 0.85) return "planet-icon-19";
  if (roll < 0.9) return "planet-icon-9";
  if (roll < 0.95) return "planet-icon-20";
  return "planet-icon-10";
}
