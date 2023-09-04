// Game: ACKS
// Adds common universal melee and missile repeating list entries
// Select PC tokens tokens, enter !AddDefaults

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
        if (msg.type === "api" && playerIsGM(msg.playerid) &&  msg.content === "!AddMonster")  
        {
            meleeDefaultsAdd(msg);
        }
    });
});

const sc = str => sendChat("", `${str}`)

const meleeDefaultsAdd = msg =>
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
            generateMeleeDefaults(reps)
	        generateMissileDefaults(reps)
        }
    })
}

const generateMeleeDefaults = reps =>
{
    meleeDefaults.forEach(item =>
    {
        const data = {};
        const repString = `repeating_melee_${generateRowID()}`;
        Object.keys(item).forEach(field => {
            log(`field: ${field}`)
            data[`${repString}_${field}`] = item[field];
        });

        // set attributes
        setAttrs(reps, data);
        
    })
}

const generateMissileDefaults = reps =>
{
    missileDefaults.forEach(item =>
    {
        const data = {};
        const repString = `repeating_missile_${generateRowID()}`;
        Object.keys(item).forEach(field => {
            log(`field: ${field}`)
            data[`${repString}_${field}`] = item[field];
        });

        // set attributes
        setAttrs(reps, data);
        
    })
}

const meleeDefaults =
[
        {
            melee_name: "d10 Melee",
            melee_damage: "1d10",
            melee_bonus: "0"
        },
        {
            melee_name: "d8 Melee",
            melee_damage: "1d8",
            melee_bonus: "0"
        },
        {
            melee_name: "d6 Melee",
            melee_damage: "1d6",
            melee_bonus: "0"
        },
        {
            melee_name: "d4 Melee",
            melee_damage: "1d4",
            melee_bonus: "0"
        },
        {
            melee_name: "Punch",
            melee_reach: "5",
            melee_damage: "1d3",
            melee_bonus: "0"
        },
        {
            melee_name: "Kick",
            melee_reach: "5",
            melee_damage: "1d4",
            melee_bonus: "-2"
        },
        {
            melee_name: "Torch",
            melee_reach: "5",
            melee_damage: "1d4",
            melee_bonus: "0"
        },
        {
            melee_name: "Improvised Melee",
            melee_reach: "5",
            melee_damage: "1d3",
            melee_bonus: "0"
        }
]

const missileDefaults =
[
        {
            missile_name: "d6 Missile",
            missile_damage: "1d6",
            missile_bonus: "0",
            missile_has_str_bonus: "0"
        },
        {
            missile_name: "d6 Thrown",
            missile_damage: "1d6",
            missile_bonus: "0",
            missile_has_str_bonus: "1"
        },
        {
            missile_name: "d4 Thrown",
            missile_damage: "1d4",
            missile_bonus: "0",
            missile_has_str_bonus: "1"
        },
        {
            missile_name: "d3 Thrown",
            missile_damage: "1d3",
            missile_bonus: "0",
            missile_has_str_bonus: "1"
        },
        {
            missile_name: "Improvised Throw",
            missile_range: "10/20/30",
            missile_damage: "1d3",
            missile_bonus: "0",
            missile_has_str_bonus: "1"
        }
]