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
            ability_name: "Listen",
            ability_source: "Adventuring",
            ability_target: "18",
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