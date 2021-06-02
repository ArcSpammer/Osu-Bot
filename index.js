const Discord = require("discord.js");
const bot = new Discord.Client();
const Tokens = require("./Tokens.json");

const osu = require("node-osu");

const osuApi = new osu.Api(Tokens.apiToken, {
	// baseUrl: sets the base api url (default: https://osu.ppy.sh/api)
	notFoundAsError: true, // Throw an error on not found instead of returning nothing. (default: true)
	completeScores: false, // When fetching scores also fetch the beatmap they are for (Allows getting accuracy) (default: false)
	parseNumeric: false // Parse numeric values into numbers/floats, excluding ids
});

const Participants = [
  "BlockerGames",
  "Flurchus",
  "Froxic",
  "jimmy_the_boss",
  "MrDinando",
  "raydamick",
  "Skipiolof",
  "Straatmeneer",
  "Timmieturnerrr",
  "Tychoman",
  "Vertox991",
  "Alecazem",
  "Kaajman",
  "KyranGe",
  "Mikachu_",
  "Hesselaar"
]
var timesBanned = new Map();

allMaps3_6 = [
  {
    beatmap_name: 'Cycle Hit by - Worminators (Home Run)',
    ids: '636839#osu/1351114'
  },
  {
    beatmap_name: 'YOU AND I by - Yamakudzi (DUET)',
    ids: '901170#osu/1881813'
  },
  {
    beatmap_name: '20k (Aero Chord Remix) by - TicClick (Insane)',
    ids: '283707#osu/641387'
  },
  {
    beatmap_name: 'Headphone Actor by - Amiya (Collab Expert)',
    ids: '936267#osu/1965897'
  },
  {
    beatmap_name: 'Uta by - deetz (Collab)',
    ids: '962562#osu/2015472'
  },
  {
    beatmap_name: 'Deep In The Night by - vanucik (Insane)',
    ids: '513194#osu/1129145'
  },
  {
    beatmap_name: "Tsukinami by - Reform (SMOKELIND's Insane)",
    ids: '896080#osu/1873147'
  },
  {
    beatmap_name: 'Battle Sirens (RIOT Remix) by - Marmowka (Insane)',
    ids: '727908#osu/1558497'
  },
  {
    beatmap_name: 'Rock, Scissors, Paper by - Haya (Insane)',
    ids: '82282#osu/229493'
  },
  {
    beatmap_name: "The Monk by - FCL (Slayed's Insane)",
    ids: '381529#osu/838063'
  },
  {
    beatmap_name: "Shinzou o Sasageyo! [TV Size] by - Monstrata (Haruto's Insane)",
    ids: '593620#osu/1256373'
  },
  {
    beatmap_name: 'Sound Chimera by - Nattu (Orthrus)',
    ids: '813569#osu/1821081'
  },
  {
    beatmap_name: 'Hitorigoto -Instrumental- by - DakiniBrave (Insane)',
    ids: '727392#osu/1535708'
  },
  {
    beatmap_name: 'Holdin On (Skrillex and Nero Remix) by - Sotarks (Insane)',
    ids: '701330#osu/1498150'
  },
  {
    beatmap_name: "Spider Dance by - Fatfan Kolek (cheesiest's Light Insane)",
    ids: '750458#osu/1580331'
  },
  {
    beatmap_name: "Brain Power by - Jacob (Exote's EXHAUST)",
    ids: '357777#osu/1017602'
  },
  {
    beatmap_name: 'Tornado (Original Mix) by - Shadren (Insane)',
    ids: '236292#osu/569636'
  },
  {
    beatmap_name: 'Circles by - Peter (Insane)',
    ids: '736339#osu/1554326'
  },
  {
    beatmap_name: "Gravity Falls Theme Song by - Alphabet (Bubblun's Insane)",
    ids: '527431#osu/1139717'
  },
  {
    beatmap_name: "Packet Hero by - Fuccho (Pho's Hard)",
    ids: '404910#osu/924562'
  },
  {
    beatmap_name: "Fire (feat. Max Marshall) by - Asphyxia (Fursum's Light Insane)",
    ids: '975615#osu/2043017'
  },
  {
    beatmap_name: 'Passcode 4854 -TV edit- by - Sotarks (Insane)',
    ids: '740068#osu/1561394'
  },
  {
    beatmap_name: "Good L_ck (Yo_'re F_cked) by - Daycore (Hard)",
    ids: '1069112#osu/2239676'
  },
  {
    beatmap_name: 'ReI by - Kagetsu (Hard (feat. Logic Agent))',
    ids: '754451#osu/1627623'
  },
  {
    beatmap_name: 'Cheat Codes VIP by - xChorse (Light Insane)',
    ids: '711420#osu/1506487'
  },
  {
    beatmap_name: "Make a Move (Speed Up Ver.) by - Sotarks (naonao's Hard)",
    ids: '765778#osu/1627149'
  },
  {
    beatmap_name: 'Chameleon Love / feat.Kano by - Tari (Hard)',
    ids: '264819#osu/603589'
  },
  {
    beatmap_name: 'Snow Drive(01.23) by - Kroytz (Hard)',
    ids: '478405#osu/1088291'
  },
  {
    beatmap_name: "One Step Closer by - h4d0uk3n1 (LMT's Hard)",
    ids: '909620#osu/1940889'
  },
  {
    beatmap_name: "The Noise of Rain by - Sotarks (Shunao's Hard)",
    ids: '859370#osu/1796153'
  },
  {
    beatmap_name: 'Ano Yume o Nazotte by - Maaadbot (Hard)',
    ids: '1192677#osu/2702114'
  },
  {
    beatmap_name: "Astronomia (Medieval Style) by - Seto Kousuke (Sir Enerugi's Insane)",
    ids: '1159452#osu/2420454'
  },
  {
    beatmap_name: 'Nasty (Spor Remix) by - Shadren (Light Insane)',
    ids: '288081#osu/652496'
  },
  {
    beatmap_name: `Chirality ("Dissymmetric" Long ver.) by - Len (Akitoshi's HD)`,
    ids: '753501#osu/1593614'
  },
  {
    beatmap_name: "Kan Saete Kuyashiiwa by - Nathan (Scub's Hard)",
    ids: '1001507#osu/2168735'
  },
  {
    beatmap_name: "MONSTER by - handsome (REGRAZ'S HARD)",
    ids: '366440#osu/819840'
  },
  {
    beatmap_name: "Kako ni Torawarete Iru by - Keqing (FuJu's Hard)",
    ids: '1245686#osu/2593879'
  },
  {
    beatmap_name: "Hoohah (VIP Edit) by - Yamicchi (Plaudible's Hard)",
    ids: '613961#osu/1295252'
  },
  {
    beatmap_name: 'Overtime by - W h i t e (Hard)',
    ids: '472143#osu/1015625'
  },
  {
    beatmap_name: 'Crier by - TheShadowOfDark (Hard)',
    ids: '974021#osu/2065919'
  },
  {
    beatmap_name: 'Days to Come feat. Fiora by - Mao (Hard)',
    ids: '1063786#osu/2315361'
  },
  {
    beatmap_name: 'Ashes of the Dawn by - pw384 (Advanced)',
    ids: '786141#osu/1701066'
  },
  {
    beatmap_name: 'Rightfully by - Okoratu (Normal)',
    ids: '875117#osu/1876170'
  }
];
allMaps3_4 = [{
beatmap_name: 'Passcode 4854 -TV edit- by - Sotarks (Insane)',
ids: '740068#osu/1561394'
},
{
beatmap_name: "Good L_ck (Yo_'re F_cked) by - Daycore (Hard)",
ids: '1069112#osu/2239676'
},
{
beatmap_name: 'ReI by - Kagetsu (Hard (feat. Logic Agent))',
ids: '754451#osu/1627623'
},
{
beatmap_name: 'Cheat Codes VIP by - xChorse (Light Insane)',
ids: '711420#osu/1506487'
},
{
beatmap_name: "Make a Move (Speed Up Ver.) by - Sotarks (naonao's Hard)",
ids: '765778#osu/1627149'
},
{
beatmap_name: 'Chameleon Love / feat.Kano by - Tari (Hard)',
ids: '264819#osu/603589'
},
{
beatmap_name: 'Snow Drive(01.23) by - Kroytz (Hard)',
ids: '478405#osu/1088291'
},
{
beatmap_name: "One Step Closer by - h4d0uk3n1 (LMT's Hard)",
ids: '909620#osu/1940889'
},
{
beatmap_name: "The Noise of Rain by - Sotarks (Shunao's Hard)",
ids: '859370#osu/1796153'
},
{
beatmap_name: 'Ano Yume o Nazotte by - Maaadbot (Hard)',
ids: '1192677#osu/2702114'
},
{
beatmap_name: "Astronomia (Medieval Style) by - Seto Kousuke (Sir Enerugi's Insane)",
ids: '1159452#osu/2420454'
},
{
beatmap_name: 'Nasty (Spor Remix) by - Shadren (Light Insane)',
ids: '288081#osu/652496'
},
{
beatmap_name: `Chirality ("Dissymmetric" Long ver.) by - Len (Akitoshi's HD)`,
ids: '753501#osu/1593614'
},
{
beatmap_name: "Kan Saete Kuyashiiwa by - Nathan (Scub's Hard)",
ids: '1001507#osu/2168735'
},
{
beatmap_name: "MONSTER by - handsome (REGRAZ'S HARD)",
ids: '366440#osu/819840'
},
{
beatmap_name: "Kako ni Torawarete Iru by - Keqing (FuJu's Hard)",
ids: '1245686#osu/2593879'
},
{
beatmap_name: "Hoohah (VIP Edit) by - Yamicchi (Plaudible's Hard)",
ids: '613961#osu/1295252'
},
{
beatmap_name: 'Overtime by - W h i t e (Hard)',
ids: '472143#osu/1015625'
},
{
beatmap_name: 'Crier by - TheShadowOfDark (Hard)',
ids: '974021#osu/2065919'
},
{
beatmap_name: 'Days to Come feat. Fiora by - Mao (Hard)',
ids: '1063786#osu/2315361'
},
{
beatmap_name: 'Ashes of the Dawn by - pw384 (Advanced)',
ids: '786141#osu/1701066'
},
{
beatmap_name: 'Rightfully by - Okoratu (Normal)',
ids: '875117#osu/1876170'
}]
allMaps3_45 = [{
beatmap_name: 'Hitorigoto -Instrumental- by - DakiniBrave (Insane)',
ids: '727392#osu/1535708'
},
{
beatmap_name: 'Holdin On (Skrillex and Nero Remix) by - Sotarks (Insane)',
ids: '701330#osu/1498150'
},
{
beatmap_name: "Spider Dance by - Fatfan Kolek (cheesiest's Light Insane)",
ids: '750458#osu/1580331'
},
{
beatmap_name: "Brain Power by - Jacob (Exote's EXHAUST)",
ids: '357777#osu/1017602'
},
{
beatmap_name: 'Tornado (Original Mix) by - Shadren (Insane)',
ids: '236292#osu/569636'
},
{
beatmap_name: 'Circles by - Peter (Insane)',
ids: '736339#osu/1554326'
},
{
beatmap_name: "Gravity Falls Theme Song by - Alphabet (Bubblun's Insane)",
ids: '527431#osu/1139717'
},
{
beatmap_name: "Packet Hero by - Fuccho (Pho's Hard)",
ids: '404910#osu/924562'
},
{
beatmap_name: "Fire (feat. Max Marshall) by - Asphyxia (Fursum's Light Insane)",
ids: '975615#osu/2043017'
},
{
beatmap_name: 'Passcode 4854 -TV edit- by - Sotarks (Insane)',
ids: '740068#osu/1561394'
},
{
beatmap_name: "Good L_ck (Yo_'re F_cked) by - Daycore (Hard)",
ids: '1069112#osu/2239676'
},
{
beatmap_name: 'ReI by - Kagetsu (Hard (feat. Logic Agent))',
ids: '754451#osu/1627623'
},
{
beatmap_name: 'Cheat Codes VIP by - xChorse (Light Insane)',
ids: '711420#osu/1506487'
},
{
beatmap_name: "Make a Move (Speed Up Ver.) by - Sotarks (naonao's Hard)",
ids: '765778#osu/1627149'
},
{
beatmap_name: 'Chameleon Love / feat.Kano by - Tari (Hard)',
ids: '264819#osu/603589'
},
{
beatmap_name: 'Snow Drive(01.23) by - Kroytz (Hard)',
ids: '478405#osu/1088291'
},
{
beatmap_name: "One Step Closer by - h4d0uk3n1 (LMT's Hard)",
ids: '909620#osu/1940889'
},
{
beatmap_name: "The Noise of Rain by - Sotarks (Shunao's Hard)",
ids: '859370#osu/1796153'
},
{
beatmap_name: 'Ano Yume o Nazotte by - Maaadbot (Hard)',
ids: '1192677#osu/2702114'
},
{
beatmap_name: "Astronomia (Medieval Style) by - Seto Kousuke (Sir Enerugi's Insane)",
ids: '1159452#osu/2420454'
},
{
beatmap_name: 'Nasty (Spor Remix) by - Shadren (Light Insane)',
ids: '288081#osu/652496'
},
{
beatmap_name: `Chirality ("Dissymmetric" Long ver.) by - Len (Akitoshi's HD)`,
ids: '753501#osu/1593614'
},
{
beatmap_name: "Kan Saete Kuyashiiwa by - Nathan (Scub's Hard)",
ids: '1001507#osu/2168735'
},
{
beatmap_name: "MONSTER by - handsome (REGRAZ'S HARD)",
ids: '366440#osu/819840'
},
{
beatmap_name: "Kako ni Torawarete Iru by - Keqing (FuJu's Hard)",
ids: '1245686#osu/2593879'
},
{
beatmap_name: "Hoohah (VIP Edit) by - Yamicchi (Plaudible's Hard)",
ids: '613961#osu/1295252'
},
{
beatmap_name: 'Overtime by - W h i t e (Hard)',
ids: '472143#osu/1015625'
},
{
beatmap_name: 'Crier by - TheShadowOfDark (Hard)',
ids: '974021#osu/2065919'
},
{
beatmap_name: 'Days to Come feat. Fiora by - Mao (Hard)',
ids: '1063786#osu/2315361'
},
{
beatmap_name: 'Ashes of the Dawn by - pw384 (Advanced)',
ids: '786141#osu/1701066'
},
{
beatmap_name: 'Rightfully by - Okoratu (Normal)',
ids: '875117#osu/1876170'
}]
allMaps3_5 = [{
beatmap_name: 'Deep In The Night by - vanucik (Insane)',
ids: '513194#osu/1129145'
},
{
beatmap_name: "Tsukinami by - Reform (SMOKELIND's Insane)",
ids: '896080#osu/1873147'
},
{
beatmap_name: 'Battle Sirens (RIOT Remix) by - Marmowka (Insane)',
ids: '727908#osu/1558497'
},
{
beatmap_name: 'Rock, Scissors, Paper by - Haya (Insane)',
ids: '82282#osu/229493'
},
{
beatmap_name: "The Monk by - FCL (Slayed's Insane)",
ids: '381529#osu/838063'
},
{
beatmap_name: "Shinzou o Sasageyo! [TV Size] by - Monstrata (Haruto's Insane)",
ids: '593620#osu/1256373'
},
{
beatmap_name: 'Sound Chimera by - Nattu (Orthrus)',
ids: '813569#osu/1821081'
},
{
beatmap_name: 'Hitorigoto -Instrumental- by - DakiniBrave (Insane)',
ids: '727392#osu/1535708'
},
{
beatmap_name: 'Holdin On (Skrillex and Nero Remix) by - Sotarks (Insane)',
ids: '701330#osu/1498150'
},
{
beatmap_name: "Spider Dance by - Fatfan Kolek (cheesiest's Light Insane)",
ids: '750458#osu/1580331'
},
{
beatmap_name: "Brain Power by - Jacob (Exote's EXHAUST)",
ids: '357777#osu/1017602'
},
{
beatmap_name: 'Tornado (Original Mix) by - Shadren (Insane)',
ids: '236292#osu/569636'
},
{
beatmap_name: 'Circles by - Peter (Insane)',
ids: '736339#osu/1554326'
},
{
beatmap_name: "Gravity Falls Theme Song by - Alphabet (Bubblun's Insane)",
ids: '527431#osu/1139717'
},
{
beatmap_name: "Packet Hero by - Fuccho (Pho's Hard)",
ids: '404910#osu/924562'
},
{
beatmap_name: "Fire (feat. Max Marshall) by - Asphyxia (Fursum's Light Insane)",
ids: '975615#osu/2043017'
},
{
beatmap_name: 'Passcode 4854 -TV edit- by - Sotarks (Insane)',
ids: '740068#osu/1561394'
},
{
beatmap_name: "Good L_ck (Yo_'re F_cked) by - Daycore (Hard)",
ids: '1069112#osu/2239676'
},
{
beatmap_name: 'ReI by - Kagetsu (Hard (feat. Logic Agent))',
ids: '754451#osu/1627623'
},
{
beatmap_name: 'Cheat Codes VIP by - xChorse (Light Insane)',
ids: '711420#osu/1506487'
},
{
beatmap_name: "Make a Move (Speed Up Ver.) by - Sotarks (naonao's Hard)",
ids: '765778#osu/1627149'
},
{
beatmap_name: 'Chameleon Love / feat.Kano by - Tari (Hard)',
ids: '264819#osu/603589'
},
{
beatmap_name: 'Snow Drive(01.23) by - Kroytz (Hard)',
ids: '478405#osu/1088291'
},
{
beatmap_name: "One Step Closer by - h4d0uk3n1 (LMT's Hard)",
ids: '909620#osu/1940889'
},
{
beatmap_name: "The Noise of Rain by - Sotarks (Shunao's Hard)",
ids: '859370#osu/1796153'
},
{
beatmap_name: 'Ano Yume o Nazotte by - Maaadbot (Hard)',
ids: '1192677#osu/2702114'
},
{
beatmap_name: "Astronomia (Medieval Style) by - Seto Kousuke (Sir Enerugi's Insane)",
ids: '1159452#osu/2420454'
},
{
beatmap_name: 'Nasty (Spor Remix) by - Shadren (Light Insane)',
ids: '288081#osu/652496'
},
{
beatmap_name: `Chirality ("Dissymmetric" Long ver.) by - Len (Akitoshi's HD)`,
ids: '753501#osu/1593614'
},
{
beatmap_name: "Kan Saete Kuyashiiwa by - Nathan (Scub's Hard)",
ids: '1001507#osu/2168735'
},
{
beatmap_name: "MONSTER by - handsome (REGRAZ'S HARD)",
ids: '366440#osu/819840'
},
{
beatmap_name: "Kako ni Torawarete Iru by - Keqing (FuJu's Hard)",
ids: '1245686#osu/2593879'
},
{
beatmap_name: "Hoohah (VIP Edit) by - Yamicchi (Plaudible's Hard)",
ids: '613961#osu/1295252'
},
{
beatmap_name: 'Overtime by - W h i t e (Hard)',
ids: '472143#osu/1015625'
},
{
beatmap_name: 'Crier by - TheShadowOfDark (Hard)',
ids: '974021#osu/2065919'
},
{
beatmap_name: 'Days to Come feat. Fiora by - Mao (Hard)',
ids: '1063786#osu/2315361'
},
{
beatmap_name: 'Ashes of the Dawn by - pw384 (Advanced)',
ids: '786141#osu/1701066'
},
{
beatmap_name: 'Rightfully by - Okoratu (Normal)',
ids: '875117#osu/1876170'
}]
allHDMaps = [
{
  beatmap_name: "Coffins by - NeilPerry (taku's Insane) +HD",
  ids: '823272#osu/1728697'
},
{
  beatmap_name: 'Blinding Lights by - Frostmourne (Insane) +HD',
  ids: '1124502#osu/2351162'
},
{
  beatmap_name: "MAYDAY (Nightcore Mix) by - Peter (hyper's Hyper) +HD",
  ids: '754219#osu/1588277'
},
{
  beatmap_name: 'TSLove by - Nuvolina (Hard) +HD',
  ids: '1206779#osu/2519581'
},
{
  beatmap_name: 'Toumei Elegy by - Awaken (Hard) +HD',
  ids: '219380#osu/637625'
},
{
  beatmap_name: "No title by - VINXIS (byfaR's Hard) +HD",
  ids: '320118#osu/713818'
},
{
  beatmap_name: "Highscore by - Fort (LGV's Insane) +HD",
  ids: '332532#osu/760034'
},
{
  beatmap_name: 'Marshmary by - Log Off Now (Hard) +HD',
  ids: '962088#osu/2014468'
},
{
  beatmap_name: 'Sirius (TV size ver.) by - deetz (Hard) +HD',
  ids: '267699#osu/636659'
},
{
  beatmap_name: 'Red Lips (Mendus Remix) by - Shmiklak (Collab Hard) +HD',
  ids: '721240#osu/1531508'
}
];
allHRMaps = [
{
  beatmap_name: "Cold Green Eyes feat. Roos Denayer by - Sotarks (Reform's Expert) +HR",
  ids: '1101976#osu/2304259'
},
{
  beatmap_name: 'Gigantic O.T.N by - Star Stream (Hard) +HR',
  ids: '80214#osu/250577'
},
{
  beatmap_name: "More One Night (Assertive Hardcore Bootleg) [short ver.] by - SquareTude (Arf's Hard) +HR",
  ids: '714239#osu/1525893'
},
{
  beatmap_name: 'Ghost Assassin VIP feat. Veela by - Plaudible (Hard) +HR',
  ids: '533298#osu/2337672'
},
{
  beatmap_name: "Kyouran Hey Kids!! by - monstrata (Milan-'s Hard) +HR",
  ids: '372510#osu/832611'
},
{
  beatmap_name: 'Mitarashi Platonic (feat. nicamoq) by - Pachiru (Hard) +HR',
  ids: '741912#osu/2070796'
},
{
  beatmap_name: 'Mizuoto to Curtain by - Log Off Now (Hard) +HR',
  ids: '968171#osu/2025939'
},
{
  beatmap_name: "Balalaika (TV Size) by - Yorita Yoshino (Regraz's Hard) +HR",
  ids: '1157137#osu/2503731'
},
{
  beatmap_name: "Legends Never Die (ft. Against The Current) by - Kalibe (Kalihas' Hard) +HR",
  ids: '669826#osu/1417261'
},
{
  beatmap_name: "Bass Slut (Original Mix) by - Secretpipe (grumd's Advanced) +HR",
  ids: '375648#osu/848511'
}
];
allDTMaps = [
{
  beatmap_name: 'KillerBeast by - Mir (Hard) +DT',
  ids: '1019290#osu/2132925'
},
{
  beatmap_name: "Haruka Kanata (TV Size) by - Xandit (Entry's Hard) +DT",
  ids: '876133#osu/1838985'
},
{
  beatmap_name: "Shiny Happy Days (TV Size) by - Nozhomi (Imakuri's Hard) +DT",
  ids: '1145925#osu/2401734'
},
{
  beatmap_name: 'Mermaid girl by - Stjpa (Hyper) +DT',
  ids: '715915#osu/1513044'
},
{
  beatmap_name: 'Dadadadadadadadadada by - spboxer3 (HARD) +DT',
  ids: '206750#osu/490679'
},
{
  beatmap_name: "Call You Mine (Hibell Remix) by - Asphyxia (KKip's Hard) +DT",
  ids: '1059539#osu/2240737'
},
{
  beatmap_name: 'Hopes and Dreams by - pkk (Hard) +DT',
  ids: '373373#osu/872455'
},
{
  beatmap_name: 'The Pressure by - Asserin (Advanced) +DT',
  ids: '325307#osu/749857'
},
{
  beatmap_name: "ya zhenyus' na devochke iz anime by - Daycore (piroshki's advanced) +DT",
  ids: '947717#osu/1996665'
},
{
  beatmap_name: "Zen Zen Zense (movie ver.) by - Monstrata (Akitoshi's Normal) +DT",
  ids: '513590#osu/1093244'
}
]

bot.login(Tokens.botToken);

bot.on('ready', msg => {
  console.log("Logging in...");
})

bot.on("message", async msg => {
    if (msg.author.bot == true) return;

    if (msg.author.id === "253163127494017034" && msg.content === "deleteAll") {
      msg.channel.messages.fetch().then(messages => {
        messages.forEach(mem => {
          mem.delete();
        })
      })

    };

  if (msg.author.id === "253163127494017034" && msg.content.startsWith("start ")) {
      msg.delete();
      var startCat = msg.content.split("start ")[1];

      var role = msg.member.guild.roles.cache.find(role => role.name === "In-Tourney");
      const list = bot.guilds.cache.get("843603850359078943");
      
      var poolMaps = [];
      async function mapCats(Cat) {
        for (i = 0; i < 3; i++) {
          var firstMap = await Cat[Math.floor(Cat.length*Math.random())]
          poolMaps.push(firstMap);
          var a1 = await Cat.indexOf(firstMap);
          Cat.splice(a1, a1+1);
        };
        for (i = 0; i < 2; i++) {
            var a2 = Math.floor((Math.random())*2)
            if (a2 === 0) {
              var secondMap = allHDMaps[Math.floor(allHDMaps.length*Math.random())];
              poolMaps.push(secondMap);
              var a1 = await allHDMaps.indexOf(secondMap);
              allHDMaps.splice(a1, a1+1);
            } else if (a2 === 1) {
              var secondMap = allHRMaps[Math.floor(allHRMaps.length*Math.random())];
              poolMaps.push(secondMap);
              var a1 = await allHRMaps.indexOf(secondMap);
              allHRMaps.splice(a1, a1+1);
            } else if (a2 === 2) {
              var secondMap = allDTMaps[Math.floor(allDTMaps.length*Math.random())];
              poolMaps.push(secondMap);
              var a1 = await allDTMaps.indexOf(secondMap);
              allDTMaps.splice(a1, a1+1);
            };
            console.log(a1);
        };
        counter = 0;
        for (p = 0; p < 5; p++) {
          counter++;
          var bm = bot.channels.cache.find(channel => channel.name === "beatmaps-bannen");
          iBeatmap = poolMaps[p];
          var iIds = iBeatmap.ids.split("#osu/")[1];
          await osuApi.getBeatmaps({b: iIds}).then(beatmap => {
            var beatmapSec = beatmap[0].length.total%60;
            if (beatmap[0].length.total%60 < 10) beatmapSec = "0" + beatmap[0].length.total%60;
            bm.send(counter, {embed: {
              color: 15687591,
              description: "[" + iBeatmap.beatmap_name + "](https://osu.ppy.sh/beatmapsets/" + beatmap[0].beatmapSetId + "#osu/" + iIds + ")",
              fields: [
                  {
                      name: "⭐",
                      value: "Star Difficulty: " + beatmap[0].difficulty.rating.toString().substring(0, 4),
                      inline: true
                  },
                  {
                      name: "⌚",
                      value: "Map Duration: " + Math.floor(beatmap[0].length.total/60) + ":" + beatmapSec,
                      inline: true
                  },
                  {
                      name: "👓",
                      value: "Approach Rate: " + beatmap[0].difficulty.approach,
                      inline: true
                  },
                  {
                      name: "❤️",
                      value: "HP Drain: " + beatmap[0].difficulty.drain,
                      inline: true
                  },
                  {
                      name: "📏",
                      value: "Circle Size: " + beatmap[0].difficulty.size,
                      inline: true
                  },
                  {
                      name: "🎶",
                      value: "Overall Difficulty: " + beatmap[0].difficulty.overall,
                      inline: true
                  }
              ]
            }}).then(mes => {
              mes.react("⛔");

              const filter = (reaction, user) => {
                return reaction.emoji.name === '⛔';
              };
              
              var collector = mes.createReactionCollector(filter, { time: 360000 })

              collector.on('collect', (reaction, user) => {
                if (user.bot) return;
                if (!timesBanned.has(user.id)) {
                  timesBanned.set(user.id, {times: 1});
                  reaction.message.delete();
                } else if (timesBanned.get(user.id).times === 1) {
                  timesBanned.set(user.id, {times: 0});
                  return;
                  reaction.message.delete();
                };
              })
              
            }).catch()
            });
        }
      };

      async function mapCatsF(Cat) {
        for (i = 0; i < 5; i++) {
          var firstMap = await Cat[Math.floor(Cat.length*Math.random())]
          poolMaps.push(firstMap);
          var a1 = await Cat.indexOf(firstMap);
          Cat.splice(a1, a1+1);
        };
        for (i = 0; i < 4; i++) {
            var a2 = Math.floor((Math.random())*2)
            if (a2 === 0) {
              var secondMap = allHDMaps[Math.floor(allHDMaps.length*Math.random())];
              poolMaps.push(secondMap);
              var a1 = await allHDMaps.indexOf(secondMap);
              allHDMaps.splice(a1, a1+1);
            } else if (a2 === 1) {
              var secondMap = allHRMaps[Math.floor(allHRMaps.length*Math.random())];
              poolMaps.push(secondMap);
              var a1 = await allHRMaps.indexOf(secondMap);
              allHRMaps.splice(a1, a1+1);
            } else if (a2 === 2) {
              var secondMap = allDTMaps[Math.floor(allDTMaps.length*Math.random())];
              poolMaps.push(secondMap);
              var a1 = await allDTMaps.indexOf(secondMap);
              allDTMaps.splice(a1, a1+1);
            };
        };
        counter = 0;
        for (p = 0; p < 9; p++) {
          counter++;
          var bm = bot.channels.cache.find(channel => channel.name === "beatmaps-bannen");
          iBeatmap = poolMaps[p];
          var iIds = iBeatmap.ids.split("#osu/")[1];
          await osuApi.getBeatmaps({b: iIds}).then(beatmap => {
            var beatmapSec = beatmap[0].length.total%60;
            if (beatmap[0].length.total%60 < 10) beatmapSec = "0" + beatmap[0].length.total%60;
            bm.send(counter, {embed: {
              color: 15687591,
              description: "[" + iBeatmap.beatmap_name + "](https://osu.ppy.sh/beatmapsets/" + beatmap[0].beatmapSetId + "#osu/" + iIds + ")",
              fields: [
                  {
                      name: "⭐",
                      value: "Star Difficulty: " + beatmap[0].difficulty.rating.toString().substring(0, 4),
                      inline: true
                  },
                  {
                      name: "⌚",
                      value: "Map Duration: " + Math.floor(beatmap[0].length.total/60) + ":" + beatmapSec,
                      inline: true
                  },
                  {
                      name: "👓",
                      value: "Approach Rate: " + beatmap[0].difficulty.approach,
                      inline: true
                  },
                  {
                      name: "❤️",
                      value: "HP Drain: " + beatmap[0].difficulty.drain,
                      inline: true
                  },
                  {
                      name: "📏",
                      value: "Circle Size: " + beatmap[0].difficulty.size,
                      inline: true
                  },
                  {
                      name: "🎶",
                      value: "Overall Difficulty: " + beatmap[0].difficulty.overall,
                      inline: true
                  }
              ]
            }}).then(mes => {
              mes.react("⛔");

              const filter = (reaction, user) => {
                return reaction.emoji.name === '⛔';
              };
        
              var collector = mes.createReactionCollector(filter, { time: 360000 })
        
              collector.on('collect', (reaction, user) => {
                if (user.bot) return;

                if (!timesBanned.has(user.id)) {
                  timesBanned.set(user.id, {times: 1});
                  reaction.message.delete();
                } else if (timesBanned.get(user.id).times === 1) {
                  timesBanned.set(user.id, {times: 2});
                  reaction.message.delete();
                } else if (timesBanned.get(user.id).times === 2) {
                  timesBanned.set(user.id, {times: 0});
                  return;
                };
              })
            }).catch()
            })
        }
      }
      
      if (startCat === "round") {
        mapCats(allMaps3_4);
        console.log("Started a normal round!");
      } else if (startCat === "kf") {
        mapCats(allMaps3_45);
        console.log("Started a normal Quarter-Final!");
      } else if (startCat === "hf") {
        mapCats(allMaps3_5);
        console.log("Started a normal Semi-Final!");
      } else if (startCat === "f") {
        mapCatsF(allMaps3_6);
        console.log("Started a normal Final!");
      };
    };


    
  if (msg.author.id === "253163127494017034" && msg.content.startsWith("beatmap ")) {
      beatmap_id = msg.content.split("beatmap ")[1];
      console.log(beatmap_id);
      msg.delete();

      osuApi.getBeatmaps({b: beatmap_id}).then(beatmap => {
          var beatmapSec = beatmap[0].length.total%60;
          if (beatmap[0].length.total%60 < 10) beatmapSec = "0" + beatmap[0].length.total%60;
          msg.channel.send({embed: {
              color: 15687591,
              description: "[" + beatmap[0].title + " by - " + beatmap[0].creator + " (" + beatmap[0].version + ")](https://osu.ppy.sh/beatmapsets/" + beatmap[0].beatmapSetId + "#osu/" + beatmap_id + ")",
              fields: [
                  {
                      name: "⭐",
                      value: "Star Difficulty: " + beatmap[0].difficulty.rating.toString().substring(0, 4),
                      inline: true
                  },
                  {
                      name: "⌚",
                      value: "Map Duration: " + Math.floor(beatmap[0].length.total/60) + ":" + beatmapSec,
                      inline: true
                  },
                  {
                      name: "👓",
                      value: "Approach Rate: " + beatmap[0].difficulty.approach,
                      inline: true
                  },
                  {
                      name: "❤️",
                      value: "HP Drain: " + beatmap[0].difficulty.drain,
                      inline: true
                  },
                  {
                      name: "📏",
                      value: "Circle Size: " + beatmap[0].difficulty.size,
                      inline: true
                  },
                  {
                      name: "🎶",
                      value: "Overall Difficulty: " + beatmap[0].difficulty.overall,
                      inline: true
                  }
              ]
            }});
      })
  };

  if (msg.author.id === "253163127494017034" && msg.content.startsWith("hd-beatmap ")) {
        beatmap_id = msg.content.split("hd-beatmap ")[1];
        console.log(beatmap_id);
        msg.delete();
        osuApi.getBeatmaps({b: beatmap_id}).then(beatmap => {
            var beatmapSec = beatmap[0].length.total%60;
            if (beatmap[0].length.total%60 < 10) beatmapSec = "0" + beatmap[0].length.total%60;
            msg.channel.send({embed: {
                color: 15687591,
                description: "[" + beatmap[0].title + " by - " + beatmap[0].creator + " (" + beatmap[0].version + ")](https://osu.ppy.sh/beatmapsets/" + beatmap[0].beatmapSetId + "#osu/" + beatmap_id + ") +HD",
                fields: [
                    {
                        name: "⭐",
                        value: "Star Difficulty: " + beatmap[0].difficulty.rating.toString().substring(0, 4),
                        inline: true
                    },
                    {
                        name: "⌚",
                        value: "Map Duration: " + Math.floor(beatmap[0].length.total/60) + ":" + beatmapSec,
                        inline: true
                    },
                    {
                        name: "👓",
                        value: "Approach Rate: " + beatmap[0].difficulty.approach,
                        inline: true
                    },
                    {
                        name: "❤️",
                        value: "HP Drain: " + beatmap[0].difficulty.drain,
                        inline: true
                    },
                    {
                        name: "📏",
                        value: "Circle Size: " + beatmap[0].difficulty.size,
                        inline: true
                    },
                    {
                        name: "🎶",
                        value: "Overall Difficulty: " + beatmap[0].difficulty.overall,
                        inline: true
                    }
                ]
              }});
        })
  };

  if (msg.author.id === "253163127494017034" && msg.content.startsWith("hr-beatmap ")) {
      beatmap_id = msg.content.split("hr-beatmap ")[1];
      console.log(beatmap_id);
      msg.delete();
      osuApi.getBeatmaps({b: beatmap_id}).then(beatmap => {
          var beatmapSec = beatmap[0].length.total%60;
          if (beatmap[0].length.total%60 < 10) beatmapSec = "0" + beatmap[0].length.total%60;
          msg.channel.send({embed: {
              color: 15687591,
              description: "[" + beatmap[0].title + " by - " + beatmap[0].creator + " (" + beatmap[0].version + ")](https://osu.ppy.sh/beatmapsets/" + beatmap[0].beatmapSetId + "#osu/" + beatmap_id + ") +HR (Waardes door HR niet aangepast)",
              fields: [
                  {
                      name: "⭐",
                      value: "Star Difficulty: " + beatmap[0].difficulty.rating.toString().substring(0, 4),
                      inline: true
                  },
                  {
                      name: "⌚",
                      value: "Map Duration: " + Math.floor(beatmap[0].length.total/60) + ":" + beatmapSec,
                      inline: true
                  },
                  {
                      name: "👓",
                      value: "Approach Rate: " + beatmap[0].difficulty.approach,
                      inline: true
                  },
                  {
                      name: "❤️",
                      value: "HP Drain: " + beatmap[0].difficulty.drain,
                      inline: true
                  },
                  {
                      name: "📏",
                      value: "Circle Size: " + beatmap[0].difficulty.size,
                      inline: true
                  },
                  {
                      name: "🎶",
                      value: "Overall Difficulty: " + beatmap[0].difficulty.overall,
                      inline: true
                  }
              ]
            }});
      })
  };

  if (msg.author.id === "253163127494017034" && msg.content.startsWith("dt-beatmap ")) {
    beatmap_id = msg.content.split("dt-beatmap ")[1];
    console.log(beatmap_id);
    msg.delete();
    osuApi.getBeatmaps({b: beatmap_id}).then(beatmap => {
        var beatmapSec = beatmap[0].length.total%60;
        if (beatmap[0].length.total%60 < 10) beatmapSec = "0" + beatmap[0].length.total%60;
        msg.channel.send({embed: {
            color: 15687591,
            description: "[" + beatmap[0].title + " by - " + beatmap[0].creator + " (" + beatmap[0].version + ")](https://osu.ppy.sh/beatmapsets/" + beatmap[0].beatmapSetId + "#osu/" + beatmap_id + ") +DT (Waardes door DT niet aangepast)",
            fields: [
                {
                    name: "⭐",
                    value: "Star Difficulty: " + beatmap[0].difficulty.rating.toString().substring(0, 4),
                    inline: true
                },
                {
                    name: "⌚",
                    value: "Map Duration: " + Math.floor(beatmap[0].length.total/60) + ":" + beatmapSec,
                    inline: true
                },
                {
                    name: "👓",
                    value: "Approach Rate: " + beatmap[0].difficulty.approach,
                    inline: true
                },
                {
                    name: "❤️",
                    value: "HP Drain: " + beatmap[0].difficulty.drain,
                    inline: true
                },
                {
                    name: "📏",
                    value: "Circle Size: " + beatmap[0].difficulty.size,
                    inline: true
                },
                {
                    name: "🎶",
                    value: "Overall Difficulty: " + beatmap[0].difficulty.overall,
                    inline: true
                }
            ]
          }});
    })
};

    const user = await osuApi.getUser({u: msg.member.displayName.split("#")[0].toString()})
    if (msg.author.id === "253163127494017034") return;
      rankArray = user.pp.rank.split("");
    
      if (rankArray.length > 3) {
        rankArray.splice(rankArray.length - 3, 0, ".");
      } else if (rankArray.length > 6) {
        rankArray = rankArray.splice(rankArray.length - 6, 0, ".");
        rankArray.splice(rankArray.length - 3, 0, ".");
      };
      msg.member.setNickname(msg.member.displayName.split("#")[0].toString() + "#" + rankArray.join(""))
})