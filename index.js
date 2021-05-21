const Discord = require("discord.js");
const bot = new Discord.Client();
const Tokens = require("./Tokens/Tokens.json");

const osu = require("node-osu");

const osuApi = new osu.Api(Tokens.apiToken, {
	// baseUrl: sets the base api url (default: https://osu.ppy.sh/api)
	notFoundAsError: true, // Throw an error on not found instead of returning nothing. (default: true)
	completeScores: false, // When fetching scores also fetch the beatmap they are for (Allows getting accuracy) (default: false)
	parseNumeric: false // Parse numeric values into numbers/floats, excluding ids
});

bot.login(Tokens.botToken);

console.log("Logging in...");

bot.on("message", msg => {
    if (msg.channel.name !== "beatmap-pool") return;
    //if (msg.author.id !== 253163127494017034) return;
    if (msg.bot == true) return;
    if (!msg.member.roles.cache.has("843898128855597156")) return;

    msg.delete();

    allMaps = {
            'Cycle Hit by - Worminators (Home Run)': '636839#osu/1351114',
            'YOU AND I by - Yamakudzi (DUET)': '901170#osu/1881813',
            '20k (Aero Chord Remix) by - TicClick (Insane)': '283707#osu/641387',
            'Headphone Actor by - Amiya (Collab Expert)': '936267#osu/1965897',
            'Uta by - deetz (Collab)': '962562#osu/2015472',
            'Deep In The Night by - vanucik (Insane)': '513194#osu/1129145',
            "Tsukinami by - Reform (SMOKELIND's Insane)": '896080#osu/1873147',
            'Battle Sirens (RIOT Remix) by - Marmowka (Insane)': '727908#osu/1558497',
            'Rock, Scissors, Paper by - Haya (Insane)': '82282#osu/229493',
            "The Monk by - FCL (Slayed's Insane)": '381529#osu/838063',
            "Shinzou o Sasageyo! [TV Size] by - Monstrata (Haruto's Insane)": '593620#osu/1256373',
            'Sound Chimera by - Nattu (Orthrus)': '813569#osu/1821081',
            'Hitorigoto -Instrumental- by - DakiniBrave (Insane)': '727392#osu/1535708',
            'Holdin On (Skrillex and Nero Remix) by - Sotarks (Insane)': '701330#osu/1498150',
            "Spider Dance by - Fatfan Kolek (cheesiest's Light Insane)": '750458#osu/1580331',
            "Brain Power by - Jacob (Exote's EXHAUST)": '357777#osu/1017602',
            'Tornado (Original Mix) by - Shadren (Insane)': '236292#osu/569636',
            'Circles by - Peter (Insane)': '736339#osu/1554326',
            "Gravity Falls Theme Song by - Alphabet (Bubblun's Insane)": '527431#osu/1139717',
            "Packet Hero by - Fuccho (Pho's Hard)": '404910#osu/924562',
            "Fire (feat. Max Marshall) by - Asphyxia (Fursum's Light Insane)": '975615#osu/2043017',
            'Passcode 4854 -TV edit- by - Sotarks (Insane)': '740068#osu/1561394',
            "Good L_ck (Yo_'re F_cked) by - Daycore (Hard)": '1069112#osu/2239676',
            'ReI by - Kagetsu (Hard (feat. Logic Agent))': '754451#osu/1627623',
            'Cheat Codes VIP by - xChorse (Light Insane)': '711420#osu/1506487',
            "Make a Move (Speed Up Ver.) by - Sotarks (naonao's Hard)": '765778#osu/1627149',
            'Chameleon Love / feat.Kano by - Tari (Hard)': '264819#osu/603589',
            'Snow Drive(01.23) by - Kroytz (Hard)': '478405#osu/1088291',
            "One Step Closer by - h4d0uk3n1 (LMT's Hard)": '909620#osu/1940889',
            "The Noise of Rain by - Sotarks (Shunao's Hard)": '859370#osu/1796153',
            'Ano Yume o Nazotte by - Maaadbot (Hard)': '1192677#osu/2702114',
            "Astronomia (Medieval Style) by - Seto Kousuke (Sir Enerugi's Insane)": '1159452#osu/2420454',
            'Nasty (Spor Remix) by - Shadren (Light Insane)': '288081#osu/652496',
            "Chirality ('Dissymmetric' Long ver.) by - Len (Akitoshi's HD)": '753501#osu/1593614',
            "Kan Saete Kuyashiiwa by - Nathan (Scub's Hard)": '1001507#osu/2168735',
            "MONSTER by - handsome (REGRAZ'S HARD)": '366440#osu/819840',
            "Kako ni Torawarete Iru by - Keqing (FuJu's Hard)": '1245686#osu/2593879',
            "Hoohah (VIP Edit) by - Yamicchi (Plaudible's Hard)": '613961#osu/1295252',
            'Overtime by - W h i t e (Hard)': '472143#osu/1015625',
            'Crier by - TheShadowOfDark (Hard)': '974021#osu/2065919',
            'Days to Come feat. Fiora by - Mao (Hard)': '1063786#osu/2315361',
            'Ashes of the Dawn by - pw384 (Advanced)': '786141#osu/1701066',
            'Rightfully by - Okoratu (Normal)': '875117#osu/1876170'
    };

    msg.channel.messages.fetch({limit: 50}).then(messages => {
        for (messages of messages.values()) for(const embed of messages.embeds) {
            link = embed.description;

            step1 = link.split("(https://")[0]
            beatmap_name = step1.slice(1, step1.length - 1);

            ids = link.split("beatmapsets/")[1].replace(")", "");

            allMaps[beatmap_name] = ids;
        }
    }).catch(console.error);
    

    msg.channel.messages.fetch(msg.id)
    .then(message => console.log(message.content))
    .catch(console.error);

    
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

    let osu_name = msg.member.displayName.split("#")[0].toString();

    osuApi.getUser({u: osu_name}).then(user => {
        console.log(user.pp.rank);
        rankArray = user.pp.rank.split("");
    
        if (rankArray.length > 3) {
            rankArray.splice(rankArray.length - 3, 0, ".");
        } else if (rankArray.length > 7) {
            rankArray.splice(rankArray.length - 6, 0, ".");
            rankArray.splice(rankArray.length - 3, 0, ".");
        };
        msg.member.setNickname(osu_name + "#" + rankArray.join(""))
        console.log(msg.member.displayName);
    }).catch(() => {
        
    })

    

})
