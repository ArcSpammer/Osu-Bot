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

bot.login(Tokens.botToken);

bot.on('ready', msg => {
  console.log("Logging in...");
})

bot.on("message", async msg => {
    //if (msg.channel.name !== "test") return;
    if (msg.bot == true) return;
    if (!msg.member.roles.cache.has("843898128855597156")) return;

    allMaps = [
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

    if (msg.author.id === "253163127494017034" && msg.content.startsWith("start ")) {

      function startRound(Player1, Player2) {
        var role = msg.member.guild.roles.cache.find(role => role.name === "In-Tourney");
        const list = bot.guilds.cache.get("843603850359078943");

        list.members.fetch(Player1).then(mem => {
          mem.roles.add(role);
        })
        list.members.fetch(Player2).then(mem => {
          mem.roles.add(role);
        })
        msg.member.fetch(Player1).then(mem => {
          mem.roles.add(role);
        })
        msg.member.fetch(Player2).then(mem => {
          mem.roles.add(role);
        })
      }
      game = msg.content.split("start ")[1]
      console.log(game);
      
      if (game === "game 1") {
        startRound("589743586829008907", "252536303051079680");
      } else if (game === "game 2") {
        startRound("399510208616988673", "411597191132741642");
      } else if (game === "game 3") {
        startRound("398597444075651072", "692493651653296189");
      } else if (game === "game 4") {
        startRound("404616305946132510", "255976796082667520");
      } else if (game === "game 5") {
        startRound("314381899810340865", "357467677717168128");
      } else if (game === "game 6") {
        startRound("521686496458178560", "371939111986266112");
      } else if (game === "game 7") {
        startRound("694429386396663839", "229366222498693131");
      } else if (game === "game 8") {
        startRound("212190355309854720", "227526554190741506");
      };
    };
    

    if (msg.author.id === "253163127494017034" && msg.content === "gameEnd") {
      bot.guilds.fetch("843603850359078943").then(guild => {
        guild.roles.fetch("845071848776794133").then(role => {
          role.members.fetch();
          console.log(role.members.size);
        })
      })
      //var role = (await list).roles.fetch("845071848776794133");
      //(await role).members.fetch().then(console.log);
      

      //var role = bot.guild.role.get("845071848776794133");
      
      //console.log(role.members.size)
      //role.members.forEach(mem => {
      //  console.log(mem);
      //})
    };


    /*msg.channel.messages.fetch({limit: 50}).then(messages => {
        for (messages of messages.values()) for(const embed of messages.embeds) {
            link = embed.description;

            step1 = link.split("(https://")[0]
            beatmap_name = step1.slice(1, step1.length - 1);

            ids = link.split("beatmapsets/")[1].replace(")", "");

            allMaps.push({beatmap_name, ids});
        }
        console.log(allMaps);
    }).catch(console.error);*/
    
    if (msg.content === "Testing...") msg.channel.send("Testing Complete");

    if (msg.author.id === "253163127494017034" && msg.content.startsWith("beatmap ")) {
        beatmap_id = msg.content.split(" ")[1];
        console.log(beatmap_id);
        msg.delete();
        osuApi.getBeatmaps({b: beatmap_id}).then(beatmap => {
            console.log(beatmap[0].length.total);
            console.log(beatmap[0].length.total%60);
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

    const user = await osuApi.getUser({u: msg.member.displayName.split("#")[0].toString()})
    if (msg.author.id === "253163127494017034") return;
      rankArray = user.pp.rank.split("");
    
      if (rankArray.length > 3) {
        rankArray.splice(rankArray.length - 3, 0, ".");
      } else if (rankArray.length > 7) {
        rankArray.splice(rankArray.length - 6, 0, ".");
        rankArray.splice(rankArray.length - 3, 0, ".");
      };
      msg.member.setNickname(msg.member.displayName.split("#")[0].toString() + "#" + rankArray.join(""))
      console.log(msg.member.displayName);
})