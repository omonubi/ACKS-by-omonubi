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
            ability_name: "Fish",
            ability_source: "common",
            ability_target: "14",
            ability_details: "A character can fish when stationary in a hex of river, lake, or ocean terrain. Fishing counts as a singular major activity. When fishing, each character may attempt a proficiency throw of 14+ on 1d20. Characters with the Survival proficiency gain a +4 bonus on their proficiency throw to fish. A successful result indicates that sufficient food to feed 2d6 man-sized creatures for one day has been caught."
        },
	    {
            ability_name: "Forage",
            ability_source: "common",
            ability_target: "18",
            ability_details: "Foraging for food is an activity that can be accomplished without hindering travel by gathering fruit, nuts, and vegetables. For each day of travel while foraging, a character should attempt a proficiency throw of 18+ on 1d20. A successful result indicates that sufficient food for 1d6 man-sized creatures has been acquired. Characters with the Survival proficiency gain a +4 bonus on their proficiency throws to forage."
        },
        {
            ability_name: "Force Door",
            ability_source: "common",
            ability_target: "18-@{str_mod}*4",
            ability_details: "A stuck door can be forced open with brute strength. Forcing open a door requires a proficiency throw of 18+. Doors of unusual material or size may impose a penalty on this proficiency throw. In addition, for each point of Strength adjustment, modify the result of the die roll by +/- 4. (A character with Strength 18 thus opens doors with a proficiency throw of 6+). If two characters cooperate to force open a door, use the stronger character’s Strength adjustment +4. A roll of 1 always fails to open a door. It takes only one combat round to force open a door, and characters may try again if they fail."
        },
        {
            ability_name: "Hide",
            ability_source: "common",
            ability_target: "18",
            ability_details: "To start hiding, a character must be out of line of sight or not be obvious to any enemy target(s), and must use a movement action or attack action to minimize his visibility by crouching, kneeling, pressing against a wall, etc. As long as the character remains stationary and does not take an attack action, he does not need to throw again. The base throw is 18+, with a botch on a natural roll of 1-3. A character proficient in Hiding, such as a thief, gains a +1 per level, can add his DEX modifier, and only botches on a natural 1. If the throw succeeds, the character becomes partially hidden or nigh indiscernible (depending on the illumination and cover). If the throw fails, the character may still be partially hidden if circumstances permit, but will not be nigh- indiscernible. If the throw botches, the character becomes obvious to everyone with line of sight to him, regardless of illumination or cover."
        },
	    {
            ability_name: "Hunt",
            ability_source: "common",
            ability_target: "14",
            ability_details: "Hunting succeeds on a proficiency throw of 14+ and indicates that sufficient food for 2d6 man-sized creatures has been acquired. However, hunting must be engaged as the sole activity for a day with no traveling possible. In addition, there will be one wandering monster check, from the table appropriate for the terrain, while the group is hunting. Characters with the Survival proficiency gain a +4 bonus on their proficiency throws to hunt."
        },
	    {
            ability_name: "Listen",
            ability_source: "common",
            ability_target: "18+(@{has_helm}*4)[helm]",
            ability_details: "The base throw is 18+, with a botch (automatic failure) occurring on a natural roll of 1-3. A character proficient in Listening, such as a thief, gains a +1 per level and only botches on a natural 1. A dwarf gains a +4 bonus to listening and only botches on a natural 1. When the ambient noise is distracting, characters suffer a -4 penalty to their Listening proficiency throw. When the ambient noise is silent, characters gain a +2 bonus to their Listening proficiency throws."
        },
	    {
            ability_name: "Probe",
            ability_source: "common",
            ability_target: "18",
            ability_details: "Probing is the visual-tactile investigation of a small area (up to 10’ squared) for hidden or partially hidden creatures or objects. A character often will probe an area after spotting a clue or hint, but a character can probe an area even if he has no evidence there’s anything there. The base throw is 18+, with a botch (automatic failure) occurring on a natural roll of 1-3. A character proficient in Probing, such as a thief, gains a +1 per level, can add his DEX bonus to his throws, and only botches on a natural 1. A dwarf gains a +4 bonus to Probing and only botches on a natural 1."
        },
	    {
            ability_name: "Sneak",
            ability_source: "common",
            ability_target: "18",
            ability_details: "A character can start sneaking anytime he takes a movement action simply by stating that he is attempting to move silently. The Judge makes a Sneaking proficiency throw for the character to determine the success of his effort. The base throw is 18+, with a botch on a natural roll of 1-3. A character proficient in Sneaking, such as a thief, gains a +1 per level, can add his DEX modifier, and only botches on a natural 1. The character may move at ½ his combat movement rate without penalty. If he moves greater than ½ speed, he takes a -5 penalty to the proficiency throw. If he runs, he takes a -10 penalty."
        },
	    {
            ability_name: "Spot",
            ability_source: "common",
            ability_target: "18",
            ability_details: "Spotting is the visual identification of nigh-indiscernible or partially hidden characters or objects. The base throw is 18+, with a botch (automatic failure) occurring on a natural roll of 1-3. A character proficient in Spotting, such as a thief, gains a +1 per level and only botches on a natural 1. An elf gains a +4 bonus to spotting and only botches on a natural 1."
        },
	    {
            ability_name: "Turn Undead",
            ability_source: "common",
            ability_target: "?{Target}",
            ability_details: "Many divine spellcasters have the ability to turn undead, calling upon the name and power of their deity to turn away, and even destroy, undead. The potency of this ability is determined by level. On the Turning Undead table, there will be a dash, a “T”, a “D”, or a number corresponding to the type of undead monster and the level of the character. A dash means that the character has not attained high enough level to turn the undead type. A “T” means that the character automatically turns the undead, and a “D” means that the undead will be destroyed automatically. A number indicates that the player must roll that number or higher on 1d20 in order to turn the undead. If this roll is successful, or there is a “T” in the chart, the player rolls 2d6 and the result equals the number of total Hit Dice of undead monsters turned. A “D” in the chart requires the same roll to determine how many HD of undead are destroyed. No matter what the dice roll result, at least one undead monster will always be turned or destroyed, as appropriate, on a successful use of turning."
        }
]

const proficiencies =
[
        {
            skill_name: "Adventuring",
            skill_rank: "1",
            skill_type: "General",
            skill_target: "11",
            skill_details: "The character is well-equipped for a life of adventure. He knows how to clean and sharpen weapons, saddle and ride a horse, set up a camp, and search for a secret door. He has a rough idea of the value of common coins, trade goods, gems, and jewelry. All player characters are assumed to have Adventuring for purposes of the proficiency throws of standard adventuring tasks."
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