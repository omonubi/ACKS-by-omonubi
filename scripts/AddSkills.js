// Game: ACKS
// Adds common skills (detect traps, hear noise, etc.) to character sheet
// Select PC tokens and enter !AddSkills in the chat

var generateUUID = (function() {
    "use strict";

    var a = 0, b = [];
    return function() {
        var c = (new Date()).getTime() + 0, d = c === a;
        a = c;
        for (var e = new Array(8), f = 7; 0 <= f; f--) {
            e[f] = "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(c % 64);
            c = Math.floor(c / 64);
        }
        c = e.join("");
        if (d) {
            for (f = 11; 0 <= f && 63 === b[f]; f--) {
                b[f] = 0;
            }
            b[f]++;
        } else {
            for (f = 0; 12 > f; f++) {
                b[f] = Math.floor(64 * Math.random());
            }
        }
        for (f = 0; 12 > f; f++){
            c += "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(b[f]);
        }
        return c;
    };
}()),

generateRowID = function () {
    "use strict";
    return generateUUID().replace(/_/g, "Z");
};

on("ready", function() {

    on("chat:message", function (msg) {
        if (msg.type === "api" && playerIsGM(msg.playerid) &&  msg.content === "!AddSkills")  
        {
            addAbilities(msg);
        }
    });
});

// const sc = str => sendChat("", `${str}`) // Needed if not declared elsewhere

const addAbilities = msg =>
{
    if(!msg.selected) 
    {
        sc("Please select one or more representative tokens before running the api command") 
        return
    }
    
    msg.selected.forEach((token, index) =>
    {
        if(!getObj(msg.selected[index]._type,msg.selected[index]._id).get('represents'))
        {
            sc(`${getObj(msg.selected[index]._type,msg.selected[index]._id).get('name')} is not representative`)
            return
        }
        else
        {
            let reps = getObj(msg.selected[index]._type,msg.selected[index]._id).get('represents')
            generateAbilities(reps)
            generateProficiencies(reps)
        }
    })
}

const generateAbilities = reps =>
{
    abilities.forEach(item =>
    {
        const data = {};
        const repString = `repeating_abilities_${generateRowID()}`;
        Object.keys(item).forEach(field => {
            log(`field: ${field}`)
            data[`${repString}_${field}`] = item[field];
        });

        // set attributes
        setAttrs(reps, data);
        
    })
}

const generateProficiencies = reps =>
{
    proficiencies.forEach(item =>
    {
        const data = {};
        const repString = `repeating_skills_${generateRowID()}`;
        Object.keys(item).forEach(field => {
            log(`field: ${field}`)
            data[`${repString}_${field}`] = item[field];
        });

        // set attributes
        setAttrs(reps, data);
        
    })
}

const abilities =
[
        {
            ability_name: "Climb",
            ability_source: "Adventuring",
            ability_target: "8",
            ability_details: "Climb easy-to-scale obstacles such as ropes or branchy trees by succeeding on a Climbing proficiency throw."
        },
	    {
            ability_name: "Dungeonbash",
            ability_source: "Adventuring",
            ability_target: "18-@{str_mod}*4",
            ability_details: "Bash down stuck doors as a combat action by succeeding on a Dungeonbashing proficiency throw."
        },
	    {
            ability_name: "Find Firewood",
            ability_source: "Adventuring",
            ability_target: "?{Target|Normal,14|Forest,3}",
            ability_details: "Foraging for firewood is an ancillary activity that can be undertaken as often as desired. Each adventurer can attempt a Foraging proficiency throw. The target value is 3+ in forest terrain and 14+ in other terrain. If the throw succeeds, that adventurer gathers 10 st. of firewood (enough to maintain a campfire for 4 hours). An adventurer with Survival proficiency gains a +4 bonus to forage for firewood."
        },
	    {
            ability_name: "Find Food",
            ability_source: "Adventuring",
            ability_target: "?{Terrain|Normal,18|Desert,22}",
            ability_details: "Foraging for food is also an ancillary activity that can be undertaken once per day. For each day of travel while foraging, each adventurer can attempt a Foraging proficiency throw of 18+. If the throw succeeds, that adventurer gathers ½ stone of food, enough for three man-sized creatures. If the throw fails, the adventurer doesn’t find anything edible. An adventurer with the Survival proficiency automatically forages enough to feed himself and gains a +4 bonus on his Foraging proficiency throw to gather another ½ stone of food. Adventurers suffer a -4 penalty to forage in barrens or desert."
        },
	    {
            ability_name: "Find Water",
            ability_source: "Adventuring",
            ability_target: "?{Terrain|Normal,14|Desert,18}",
            ability_details: "Foraging for water is an ancillary activity that can be undertaken once per day. Adventurers can automatically gather as much water as they can carry in any hex they cross containing a river or lake. Otherwise the party as a whole (up to 30 man-sized creatures) can attempt a single Foraging proficiency throw to find water. The target value is 14+ in clear, forest, hills, jungle, mountains, or swamp terrain, or 18+ in barrens or desert. If the throw succeeds, the party finds enough water to meet three day’s rations for each character foraging. If the throw fails, the party does not find a source of drinkable water. If any of the adventurers in the party has the Survival proficiency, the party gains a +4 bonus on its Foraging proficiency throw. Parties larger than 30 man-sized creatures should make multiple rolls, with success finding water enough for that group only."
        },
	    {
            ability_name: "Hunting",
            ability_source: "Adventuring",
            ability_target: "14",
            ability_details: "Hunting for food is a dedicated activity. For each day dedicated to hunting, each adventurer can attempt a Hunting proficiency throw of 14+. If the throw succeeds, the character brings in 1 stone of game, e.g. enough to feed 6 man-sized creatures. Adventurers who hunt risk encountering wandering monsters, however, with the Judge rolling on his encounter table based on the terrain. An adventurer with the Survival proficiency gains a +4 bonus on his own Hunting proficiency throw."
        },
        {
            ability_name: "Listen",
            ability_source: "Adventuring",
            ability_target: "18+(@{has_helm}[helm]*4)",
            ability_details: "Pause and listen for noises by spending one round and succeeding on a Listening proficiency throw."
        },
        {
            ability_name: "Search",
            ability_source: "Adventuring",
            ability_target: "18",
            ability_details: "Methodically search for concealed traps, secret doors, buried treasure, and other hidden features by spending one turn (10 minutes) and succeeding on a Searching proficiency throw."
        }
]

const proficiencies =
[
        {
            skill_name: "Adventuring",
            skill_rank: "1",
            skill_type: "General",
            skill_target: "11",
            skill_details: "The character is well-equipped for a life of adventure. He knows how to clean and sharpen weapons, set up a camp, cook meals over open flame, saddle and ride a horse outside of combat, and perform rough-and-ready first aid. He has a rough idea of the value of common coins, trade goods, gems, and jewelry, and of the nature of different types of magic and monsters."
        },
        {
            skill_name: "TBD",
            skill_rank: "1",
            skill_type: "General",
            skill_target: "11"
        },
        {
            skill_name: "TBD",
            skill_rank: "1",
            skill_type: "Class",
            skill_target: "11"
        }
]