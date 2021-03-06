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
            ability_name: "Estimate Value",
            ability_source: "common",
            ability_target: "18-(@{level}-1)",
            ability_details: "This skills is general knowledge of the value of non-magical or ancient things; goods common to the campaign setting that a person might know the value of, based on their life experience. All characters can successfully guesstimate the value of such things on a throw of 18+. This is reduced by 1 for each additional level beyond the first."
        },
        {
            ability_name: "Find Secret Door",
            ability_source: "common",
            ability_target: "18",
            ability_details: "Some doors are somehow concealed or hidden ??? these are secret doors. Common secret doors are sliding panels in a wall, trapdoors under rugs, and so on. Secret doors can only be spotted if characters are specifically looking for them. When a player declares that his character is looking for secret door, the Judge should make a proficiency throw on behalf of the character. All characters except elves will spot a secret door if one is present on a throw of 18+ on 1d20. Elves have keen eyes that allow them to detect hidden and secret doors with a proficiency throw of 8+ on 1d20 when actively searching, or 14+ on casual inspection. It takes 1 turn for a character to search a 10' x 10' area. Since the Judge rolls the dice, the players never know if the roll failed or if there simply is no door in the area searched. Each character has only one chance to find each secret door."
        },
        {
            ability_name: "Find Traps",
            ability_source: "common",
            ability_target: "18",
            ability_details: "While thieves have a special skill to detect traps, characters of all classes can search for non-magical traps with time and caution. All characters except dwarves succeed in spotting a trap with a proficiency throw of 18+ on 1d20. Dwarves succeed with a proficiency throw of 14+. Players must declare that their characters are actively looking for traps, and they must be looking in the right place. This roll may only be made once per character in a particular location, and it takes 1 turn per 10' x 10' area searched. The Judge secretly rolls the dice for these checks, because the players will never know if they failed to find the trap or if there is not one present."
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
            ability_details: "A stuck door can be forced open with brute strength. Forcing open a door requires a proficiency throw of 18+. Doors of unusual material or size may impose a penalty on this proficiency throw. In addition, for each point of Strength adjustment, modify the result of the die roll by +/- 4. (A character with Strength 18 thus opens doors with a proficiency throw of 6+). If two characters cooperate to force open a door, use the stronger character???s Strength adjustment +4. A roll of 1 always fails to open a door. It takes only one combat round to force open a door, and characters may try again if they fail."
        },
        {
            ability_name: "Hear Noise",
            ability_source: "common",
            ability_target: "18+(@{has_helm}*4)[helm]",
            ability_details: "Players will sometimes want their character to listen at a door or intersection to hear any noises beyond. Again, the Judge should make a proficiency throw on behalf of the character. A throw of 18+ on 1d20 succeeds. Dwarves and elves only need to throw 14+ due to their keen hearing. A thief has specially trained for this task, and has a different chance of success (refer to the Thief Skills table). This attempt may only be made one time at any door or intersection by a character. Note that some creatures, such as undead, do not make noise."
        },
	{
            ability_name: "Hunt",
            ability_source: "common",
            ability_target: "14",
            ability_details: "Hunting succeeds on a proficiency throw of 14+ and indicates that sufficient food for 2d6 man-sized creatures has been acquired. However, hunting must be engaged as the sole activity for a day with no traveling possible. In addition, there will be one wandering monster check, from the table appropriate for the terrain, while the group is hunting. Characters with the Survival proficiency gain a +4 bonus on their proficiency throws to hunt."
        }
]

const proficiencies =
[
        {
            skill_name: "Adventuring",
            skill_rank: "1",
            skill_type: "General",
            skill_target: "18",
            skill_details: "The character is well-equipped for a life of adventure. He knows how to clean and sharpen weapons, saddle and ride a horse, set up a camp, and search for a secret door. He has a rough idea of the value of common coins, trade goods, gems, and jewelry. All player characters are assumed to have Adventuring for purposes of the proficiency throws of standard adventuring tasks."
        },
        {
            skill_name: "TBD",
            skill_rank: "1",
            skill_type: "General",
            skill_target: "18"
        },
        {
            skill_name: "TBD",
            skill_rank: "1",
            skill_type: "Class",
            skill_target: "18"
        }
]