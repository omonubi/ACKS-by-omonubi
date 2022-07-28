// Game: ACKS
// Adds item packs to character sheets, by class name; including items (equipment) and melee/missile defaults (melee and/or missile)
// Select PC tokens, and enter !AddItems [ClassName] in Roll20 chat. 
// ClassName must not contain spaces or symbols/hyphens, and each word in the name must be capitalized.

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
        if (msg.type === "api" && playerIsGM(msg.playerid) &&  msg.content.split(" ",1) == "!AddItems")  
        {
            addItems(msg);
        }
    });
});

// const sc = str => sendChat("", `${str}`) // Needed if not declared elsewhere

const addItems = msg =>
{
    if(!msg.selected) 
    {
        sc("Select one or more representative tokens before running the api command.") 
        return
    }
    
    const itemList = msg.content.split(" ",2)[1];
    log('itemList: ' + itemList);
    if (itemList == undefined) {
        sc("No list property found.");
        return;
    }

    msg.selected.forEach((token, index) =>
    {
        if(!getObj(msg.selected[index]._type,msg.selected[index]._id).get('represents'))
        {
            sc(`${getObj(msg.selected[index]._type,msg.selected[index]._id).get('name')} is not representative`);
            return;
        }
        else
        {
            let reps = getObj(msg.selected[index]._type,msg.selected[index]._id).get('represents');
            if (itemList == 'AntiPaladin') generateListAntiPaladin(reps)
            else if (itemList == 'Assassin') generateListAssassin(reps)
            else if (itemList == 'Barbarian') generateListBarbarian(reps)
            else if (itemList == 'Bard') generateListBard(reps)
            else if (itemList == 'Bladedancer') generateListBladedancer(reps)
            else if (itemList == 'Cleric') generateListCleric(reps)
            else if (itemList == 'DwarvenCraftpriest') generateListDwarvenCraftpriest(reps)
            else if (itemList == 'DwarvenDelver') generateListDwarvenDelver(reps)
            else if (itemList == 'DwarvenFury') generateListDwarvenFury(reps)
            else if (itemList == 'DwarvenMachinist') generateListDwarvenMachinist(reps)
            else if (itemList == 'DwarvenVaultguard') generateListDwarvenVaultguard(reps)
            else if (itemList == 'ElvenCourtier') generateListElvenCourtier(reps)
            else if (itemList == 'ElvenEnchanter') generateListElvenEnchanter(reps)
            else if (itemList == 'ElvenNightblade') generateListElvenNightblade(reps)
            else if (itemList == 'ElvenRanger') generateListElvenRanger(reps)
            else if (itemList == 'ElvenSpellsword') generateListElvenSpellsword(reps)
            else if (itemList == 'Explorer') generateListExplorer(reps)
            else if (itemList == 'Fighter') generateListFighter(reps)
            else if (itemList == 'GnomishTrickster') generateListGnomishTrickster(reps)
            else if (itemList == 'Mage') generateListMage(reps)
            else if (itemList == 'Thief') generateListThief(reps)
            else sc("Invalid list '" + itemList + "'.");
        }
    })
}

const generateListAntiPaladin = reps =>
{
    itemsAntiPaladin.forEach(item =>
    {
        const data = {};
        const repString = `repeating_items_${generateRowID()}`;
        Object.keys(item).forEach(field => {
            log(`field: ${field}`)
            data[`${repString}_${field}`] = item[field];
        });

        // set attributes
        setAttrs(reps, data);
        
    })
    meleeAntiPaladin.forEach(item =>
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

const generateListAssassin = reps =>
{
    itemsAssassin.forEach(item =>
    {
        const data = {};
        const repString = `repeating_items_${generateRowID()}`;
        Object.keys(item).forEach(field => {
            log(`field: ${field}`)
            data[`${repString}_${field}`] = item[field];
        });

        // set attributes
        setAttrs(reps, data);
        
    })
    meleeAssassin.forEach(item =>
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
    missileAssassin.forEach(item =>
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

const generateListBarbarian = reps =>
{
    itemsBarbarian.forEach(item =>
    {
        const data = {};
        const repString = `repeating_items_${generateRowID()}`;
        Object.keys(item).forEach(field => {
            log(`field: ${field}`)
            data[`${repString}_${field}`] = item[field];
        });

        // set attributes
        setAttrs(reps, data);
        
    })
    meleeBarbarian.forEach(item =>
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
    missileBarbarian.forEach(item =>
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

const generateListBard = reps =>
{
    itemsBard.forEach(item =>
    {
        const data = {};
        const repString = `repeating_items_${generateRowID()}`;
        Object.keys(item).forEach(field => {
            log(`field: ${field}`)
            data[`${repString}_${field}`] = item[field];
        });

        // set attributes
        setAttrs(reps, data);
        
    })
    meleeBard.forEach(item =>
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
    missileBard.forEach(item =>
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

const generateListBladedancer = reps =>
{
    itemsBladedancer.forEach(item =>
    {
        const data = {};
        const repString = `repeating_items_${generateRowID()}`;
        Object.keys(item).forEach(field => {
            log(`field: ${field}`)
            data[`${repString}_${field}`] = item[field];
        });

        // set attributes
        setAttrs(reps, data);
        
    })
    meleeBladedancer.forEach(item =>
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

const generateListCleric = reps =>
{
    itemsCleric.forEach(item =>
    {
        const data = {};
        const repString = `repeating_items_${generateRowID()}`;
        Object.keys(item).forEach(field => {
            log(`field: ${field}`)
            data[`${repString}_${field}`] = item[field];
        });

        // set attributes
        setAttrs(reps, data);
        
    })
    meleeCleric.forEach(item =>
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

const generateListDwarvenCraftpriest = reps =>
{
    itemsDwarvenCraftpriest.forEach(item =>
    {
        const data = {};
        const repString = `repeating_items_${generateRowID()}`;
        Object.keys(item).forEach(field => {
            log(`field: ${field}`)
            data[`${repString}_${field}`] = item[field];
        });

        // set attributes
        setAttrs(reps, data);
        
    })
    meleeDwarvenCraftpriest.forEach(item =>
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

const generateListDwarvenDelver = reps =>
{
    itemsDwarvenDelver.forEach(item =>
    {
        const data = {};
        const repString = `repeating_items_${generateRowID()}`;
        Object.keys(item).forEach(field => {
            log(`field: ${field}`)
            data[`${repString}_${field}`] = item[field];
        });

        // set attributes
        setAttrs(reps, data);
        
    })
    meleeDwarvenDelver.forEach(item =>
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
    missileDwarvenDelver.forEach(item =>
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

const generateListDwarvenFury = reps =>
{
    itemsDwarvenFury.forEach(item =>
    {
        const data = {};
        const repString = `repeating_items_${generateRowID()}`;
        Object.keys(item).forEach(field => {
            log(`field: ${field}`)
            data[`${repString}_${field}`] = item[field];
        });

        // set attributes
        setAttrs(reps, data);
        
    })
    meleeDwarvenFury.forEach(item =>
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
    missileDwarvenFury.forEach(item =>
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

const generateListDwarvenMachinist = reps =>
{
    itemsDwarvenMachinist.forEach(item =>
    {
        const data = {};
        const repString = `repeating_items_${generateRowID()}`;
        Object.keys(item).forEach(field => {
            log(`field: ${field}`)
            data[`${repString}_${field}`] = item[field];
        });

        // set attributes
        setAttrs(reps, data);
        
    })
    meleeDwarvenMachinist.forEach(item =>
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

const generateListDwarvenVaultguard = reps =>
{
    itemsDwarvenVaultguard.forEach(item =>
    {
        const data = {};
        const repString = `repeating_items_${generateRowID()}`;
        Object.keys(item).forEach(field => {
            log(`field: ${field}`)
            data[`${repString}_${field}`] = item[field];
        });

        // set attributes
        setAttrs(reps, data);
        
    })
    meleeDwarvenVaultguard.forEach(item =>
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
    missileDwarvenVaultguard.forEach(item =>
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

const generateListElvenCourtier = reps =>
{
    itemsElvenCourtier.forEach(item =>
    {
        const data = {};
        const repString = `repeating_items_${generateRowID()}`;
        Object.keys(item).forEach(field => {
            log(`field: ${field}`)
            data[`${repString}_${field}`] = item[field];
        });

        // set attributes
        setAttrs(reps, data);
        
    })
    meleeElvenCourtier.forEach(item =>
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
const generateListElvenEnchanter = reps =>
{
    itemsElvenEnchanter.forEach(item =>
    {
        const data = {};
        const repString = `repeating_items_${generateRowID()}`;
        Object.keys(item).forEach(field => {
            log(`field: ${field}`)
            data[`${repString}_${field}`] = item[field];
        });

        // set attributes
        setAttrs(reps, data);
        
    })
    meleeElvenEnchanter.forEach(item =>
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
    missileElvenEnchanter.forEach(item =>
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

const generateListElvenNightblade = reps =>
{
    itemsElvenNightblade.forEach(item =>
    {
        const data = {};
        const repString = `repeating_items_${generateRowID()}`;
        Object.keys(item).forEach(field => {
            log(`field: ${field}`)
            data[`${repString}_${field}`] = item[field];
        });

        // set attributes
        setAttrs(reps, data);
        
    })
    meleeElvenNightblade.forEach(item =>
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
    missileElvenNightblade.forEach(item =>
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

const generateListElvenRanger = reps =>
{
    itemsElvenRanger.forEach(item =>
    {
        const data = {};
        const repString = `repeating_items_${generateRowID()}`;
        Object.keys(item).forEach(field => {
            log(`field: ${field}`)
            data[`${repString}_${field}`] = item[field];
        });

        // set attributes
        setAttrs(reps, data);
        
    })
    meleeElvenRanger.forEach(item =>
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
    missileElvenRanger.forEach(item =>
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

const generateListElvenSpellsword = reps =>
{
    itemsElvenSpellsword.forEach(item =>
    {
        const data = {};
        const repString = `repeating_items_${generateRowID()}`;
        Object.keys(item).forEach(field => {
            log(`field: ${field}`)
            data[`${repString}_${field}`] = item[field];
        });

        // set attributes
        setAttrs(reps, data);
        
    })
    meleeElvenSpellsword.forEach(item =>
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
    missileElvenSpellsword.forEach(item =>
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

const generateListExplorer = reps =>
{
    itemsExplorer.forEach(item =>
    {
        const data = {};
        const repString = `repeating_items_${generateRowID()}`;
        Object.keys(item).forEach(field => {
            log(`field: ${field}`)
            data[`${repString}_${field}`] = item[field];
        });

        // set attributes
        setAttrs(reps, data);
        
    })
    meleeExplorer.forEach(item =>
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
    missileExplorer.forEach(item =>
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

const generateListFighter = reps =>
{
    itemsFighter.forEach(item =>
    {
        const data = {};
        const repString = `repeating_items_${generateRowID()}`;
        Object.keys(item).forEach(field => {
            log(`field: ${field}`)
            data[`${repString}_${field}`] = item[field];
        });

        // set attributes
        setAttrs(reps, data);
        
    })
    meleeFighter.forEach(item =>
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
    missileFighter.forEach(item =>
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

const generateListGnomishTrickster = reps =>
{
    itemsGnomishTrickster.forEach(item =>
    {
        const data = {};
        const repString = `repeating_items_${generateRowID()}`;
        Object.keys(item).forEach(field => {
            log(`field: ${field}`)
            data[`${repString}_${field}`] = item[field];
        });

        // set attributes
        setAttrs(reps, data);
        
    })
    meleeGnomishTrickster.forEach(item =>
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
    missileGnomishTrickster.forEach(item =>
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

const generateListMage = reps =>
{
    itemsMage.forEach(item =>
    {
        const data = {};
        const repString = `repeating_items_${generateRowID()}`;
        Object.keys(item).forEach(field => {
            log(`field: ${field}`)
            data[`${repString}_${field}`] = item[field];
        });

        // set attributes
        setAttrs(reps, data);
        
    })
    meleeMage.forEach(item =>
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

const generateListThief = reps =>
{
    itemsThief.forEach(item =>
    {
        const data = {};
        const repString = `repeating_items_${generateRowID()}`;
        Object.keys(item).forEach(field => {
            log(`field: ${field}`)
            data[`${repString}_${field}`] = item[field];
        });

        // set attributes
        setAttrs(reps, data);
        
    })
    meleeThief.forEach(item =>
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
    missileThief.forEach(item =>
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

const itemsAntiPaladin =
[
        {
            item_name: "Morning Star",
            item_weight: "1",
            item_count: "1",
            item_value: "10"
        },
        {
            item_name: "Two-Handed Sword",
            item_weight: "1",
            item_count: "1",
            item_value: "15"
        },
        {
            item_name: "Banded Plate Armor",
            item_weight: "5",
            item_count: "1",
            item_value: "50"
        },
        {
            item_name: "Tunic and Pants",
            item_weight: "0.17",
            item_count: "1",
            item_value: "4"
        },
        {
            item_name: "Leather Belt",
            item_weight: "0.17",
            item_count: "1",
            item_value: "0.4"
        },
        {
            item_name: "Boots",
            item_weight: "0.17",
            item_count: "1",
            item_value: ".6"
        },
        {
            item_name: "Backpack",
            item_weight: "0.17",
            item_count: "1",
            item_value: "2"
        },
        {
            item_name: "Tinderbox",
            item_weight: "0.17",
            item_count: "1",
            item_value: ".8"
        },
        {
            item_name: "Torch",
            item_weight: "0.17",
            item_count: "12",
            item_value: ""
        },
        {
            item_name: "Rations (1 Day)",
            item_weight: "0.17",
            item_count: "14",
            item_value: ".2"
        },
        {
            item_name: "Waterskin",
            item_weight: "1",
            item_count: "1",
            item_value: ""
        },
        {
            item_name: "12 gp",
            item_weight: "0",
            item_count: "0",
            item_value: ""
        }
]

const meleeAntiPaladin =
[
        {
            melee_name: "Morningstar",
            melee_damage: "1d10",
            melee_bonus: "0",
            melee_2hand: "on"
        },
        {
            melee_name: "Two-Handed Sword",
            melee_damage: "1d10",
            melee_bonus: "0",
            melee_2hand: "on"
        }
]

const itemsAssassin =
[
        {
            item_name: "Sword",
            item_weight: "0.17",
            item_count: "1",
            item_value: "10"
        },
        {
            item_name: "Dagger",
            item_weight: "0.17",
            item_count: "1",
            item_value: "3"
        },
        {
            item_name: "Leather Armor",
            item_weight: "2",
            item_count: "1",
            item_value: "20"
        },
        {
            item_name: "Tunic and Pants",
            item_weight: "0.17",
            item_count: "1",
            item_value: "4"
        },
        {
            item_name: "Cloak",
            item_weight: "0.17",
            item_count: "1",
            item_value: "1"
        },
        {
            item_name: "Boots",
            item_weight: "0.17",
            item_count: "1",
            item_value: ".6"
        },
        {
            item_name: "Belt Pouch",
            item_weight: "0.17",
            item_count: "1",
            item_value: ".5"
        },
        {
            item_name: "Dice",
            item_weight: ".01",
            item_count: "2",
            item_value: ""
        },
        {
            item_name: "Backpack",
            item_weight: "0.17",
            item_count: "1",
            item_value: "2"
        },
        {
            item_name: "Tinderbox",
            item_weight: "0.17",
            item_count: "1",
            item_value: ".8"
        },
        {
            item_name: "Torch",
            item_weight: "0.17",
            item_count: "12",
            item_value: ""
        },
        {
            item_name: "Rations (1 Day)",
            item_weight: "0.17",
            item_count: "14",
            item_value: ".2"
        },
        {
            item_name: "Waterskin",
            item_weight: "1",
            item_count: "1",
            item_value: ""
        },
        {
            item_name: "36 gp",
            item_weight: "0",
            item_count: "0",
            item_value: ""
        }
]

const meleeAssassin =
[
        {
            melee_name: "Sword",
            melee_damage: "1d6",
            melee_bonus: "0"
        },
        {
            melee_name: "Sword, 2-Handed",
            melee_damage: "1d8",
            melee_bonus: "0"
        },
        {
            melee_name: "Dagger",
            melee_damage: "1d4",
            melee_bonus: "0"
        }
]

const missileAssassin =
[
        {
            missile_name: "Dagger (Thrown)",
            missile_range: "10/20/30",
            missile_damage: "1d4",
            missile_bonus: "0",
            missile_ammo: "1"
        }
]

const itemsBarbarian =
[
        {
            item_name: "Two-Handed Sword",
            item_weight: "1",
            item_count: "1",
            item_value: "15"
        },
        {
            item_name: "Hand Axe",
            item_weight: "1",
            item_count: "1",
            item_value: "4"
        },
        {
            item_name: "Chainmail Armor",
            item_weight: "4",
            item_count: "1",
            item_value: "40"
        },
        {
            item_name: "Tunic and Pants",
            item_weight: "0.17",
            item_count: "1",
            item_value: "4"
        },
        {
            item_name: "Leather Belt",
            item_weight: "0.17",
            item_count: "1",
            item_value: "0.4"
        },
        {
            item_name: "Boots",
            item_weight: "0.17",
            item_count: "1",
            item_value: ".6"
        },
        {
            item_name: "Silver Arm Bands",
            item_weight: "0.17",
            item_count: "1",
            item_value: "25"
        },
        {
            item_name: "Backpack",
            item_weight: "0.17",
            item_count: "1",
            item_value: "2"
        },
        {
            item_name: "Sack, Small",
            item_weight: "0.17",
            item_count: "1",
            item_value: ".3"
        },
        {
            item_name: "Rope, 50'",
            item_weight: "0.17",
            item_count: "1",
            item_value: "1"
        },
        {
            item_name: "Grappling Hook",
            item_weight: "0.17",
            item_count: "1",
            item_value: "25"
        },
        {
            item_name: "Tinderbox",
            item_weight: "0.17",
            item_count: "1",
            item_value: ".8"
        },
        {
            item_name: "Torch",
            item_weight: "0.17",
            item_count: "12",
            item_value: ""
        },
        {
            item_name: "Rations (1 Day)",
            item_weight: "0.17",
            item_count: "14",
            item_value: ".2"
        },
        {
            item_name: "Waterskin",
            item_weight: "1",
            item_count: "1",
            item_value: ""
        },
        {
            item_name: "Wineskin",
            item_weight: "1",
            item_count: "1",
            item_value: ""
        },
        {
            item_name: "1 gp",
            item_weight: "0",
            item_count: "0",
            item_value: ""
        }
]

const meleeBarbarian =
[
        {
            melee_name: "Two-Handed Sword",
            melee_damage: "1d10",
            melee_bonus: "0",
            melee_2hand: "on"
        },
        {
            melee_name: "Hand Axe",
            melee_damage: "1d6",
            melee_bonus: "0"
        }
]

const missileBarbarian =
[
        {
            missile_name: "Hand Axe (Thrown)",
            missile_range: "10/20/30",
            missile_damage: "1d6",
            missile_bonus: "0",
            missile_ammo: "1"
        }
]

const itemsBard =
[
        {
            item_name: "Crossbow",
            item_weight: "1",
            item_count: "1",
            item_value: "30"
        },
        {
            item_name: "Case (20 Bolts)",
            item_weight: ".17",
            item_count: "1"
        },
        {
            item_name: "Short Sword",
            item_weight: "0.17",
            item_count: "1",
            item_value: "7"
        },        
        {
            item_name: "Dagger",
            item_weight: "0.17",
            item_count: "1",
            item_value: "3"
        },
        {
            item_name: "Leather Armor",
            item_weight: "2",
            item_count: "1",
            item_value: "20"
        },
        {
            item_name: "Tunic and Pants",
            item_weight: "0.17",
            item_count: "1",
            item_value: "4"
        },
        {
            item_name: "Boots",
            item_weight: "0.17",
            item_count: "1",
            item_value: ".6"
        },
        {
            item_name: "Backpack",
            item_weight: "0.17",
            item_count: "1",
            item_value: "2"
        },
        {
            item_name: "Musical Instrument",
            item_weight: "0.17",
            item_count: "1",
            item_value: "25"
        },
        {
            item_name: "Tinderbox",
            item_weight: "0.17",
            item_count: "1",
            item_value: ".8"
        },
        {
            item_name: "Torch",
            item_weight: "0.17",
            item_count: "12",
            item_value: ""
        },
        {
            item_name: "Rations (1 Day)",
            item_weight: "0.17",
            item_count: "14",
            item_value: ".2"
        },
        {
            item_name: "Waterskin",
            item_weight: "1",
            item_count: "1",
            item_value: ""
        },
        {
            item_name: "20 sp",
            item_weight: "0",
            item_count: "0",
            item_value: ""
        }
]

const meleeBard =
[
        {
            melee_name: "Short Sword",
            melee_damage: "1d6",
            melee_bonus: "0"
        },
        {
            melee_name: "Dagger",
            melee_damage: "1d4",
            melee_bonus: "0"
        }
]

const missileBard =
[
        {
            missile_name: "Crossbow",
            missile_range: "80/160/240",
            missile_damage: "1d6",
            missile_bonus: "0",
            missile_ammo: "20"
        },
        {
            missile_name: "Dagger (Thrown)",
            missile_range: "10/20/30",
            missile_damage: "1d4",
            missile_bonus: "0",
            missile_ammo: "1"
        }
]

const itemsBladedancer =
[,
        {
            item_name: "Sword",
            item_weight: "0.17",
            item_count: "2",
            item_value: "10"
        },
        {
            item_name: "Leather Armor",
            item_weight: "2",
            item_count: "1",
            item_value: "20"
        },
        {
            item_name: "Cloak, Silk",
            item_weight: "0.17",
            item_count: "1",
            item_value: "15"
        },
        {
            item_name: "Bladedancer's Head Dress",
            item_weight: "0.17",
            item_count: "1",
            item_value: "20"
        },
        {
            item_name: "Holy Symbol",
            item_weight: "0",
            item_count: "1",
            item_value: ""
        },
        {
            item_name: "Backpack",
            item_weight: "0.17",
            item_count: "1",
            item_value: "2"
        },
        {
            item_name: "Tinderbox",
            item_weight: "0.17",
            item_count: "1",
            item_value: ".8"
        },
        {
            item_name: "Torch",
            item_weight: "0.17",
            item_count: "12",
            item_value: ""
        },
        {
            item_name: "Rations (1 Day)",
            item_weight: "0.17",
            item_count: "14",
            item_value: ".2"
        },
        {
            item_name: "Waterskin",
            item_weight: "1",
            item_count: "1",
            item_value: ""
        },
        {
            item_name: "20 sp",
            item_weight: "0",
            item_count: "0",
            item_value: ""
        }
]

const meleeBladedancer =
[
        {
            melee_name: "Sword",
            melee_damage: "1d6",
            melee_bonus: "0"
        },
        {
            melee_name: "Sword, 2-Handed",
            melee_damage: "1d8",
            melee_bonus: "0"
        }
]

const itemsCleric =
[
        {
            item_name: "Mace",
            item_weight: "0.17",
            item_count: "1",
            item_value: "5"
        },
        {
            item_name: "Shield",
            item_weight: "1",
            item_count: "1",
            item_value: "10"
        },
        {
            item_name: "Banded Plate Armor",
            item_weight: "5",
            item_count: "1",
            item_value: "50"
        },
        {
            item_name: "Priest's Cassock",
            item_weight: "0.17",
            item_count: "1",
            item_value: "7"
        },
        {
            item_name: "Shoes",
            item_weight: "0.17",
            item_count: "1",
            item_value: ".4"
        },
        {
            item_name: "Backpack",
            item_weight: "0.17",
            item_count: "1",
            item_value: "2"
        },
        {
            item_name: "Holy Symbol",
            item_weight: "0",
            item_count: "1",
            item_value: ""
        },
        {
            item_name: "Holy Book",
            item_weight: "0.17",
            item_count: "1",
            item_value: ""
        },
        {
            item_name: "Tinderbox",
            item_weight: "0.17",
            item_count: "1",
            item_value: ".8"
        },
        {
            item_name: "Torch",
            item_weight: "0.17",
            item_count: "12",
            item_value: ""
        },
        {
            item_name: "Rations (1 Day)",
            item_weight: "0.17",
            item_count: "14",
            item_value: ".2"
        },
        {
            item_name: "Waterskin",
            item_weight: "1",
            item_count: "1",
            item_value: ""
        },
        {
            item_name: "20 sp",
            item_weight: "0",
            item_count: "0",
            item_value: ""
        }
]

const meleeCleric =
[
        {
            melee_name: "Mace",
            melee_damage: "1d6",
            melee_bonus: "0"
        },
        {
            melee_name: "Mace, 2-Handed",
            melee_damage: "1d8",
            melee_bonus: "0"
        }
]

const itemsDwarvenCraftpriest =
[
        {
            item_name: "War Hammer",
            item_weight: "0.17",
            item_count: "1",
            item_value: "5"
        },
        {
            item_name: "Banded Plate Armor",
            item_weight: "5",
            item_count: "1",
            item_value: "50"
        },
        {
            item_name: "Shield",
            item_weight: "1",
            item_count: "1",
            item_value: "10"
        },
        {
            item_name: "Holy Symbol",
            item_weight: "0",
            item_count: "1",
            item_value: ""
        },
        {
            item_name: "Backpack",
            item_weight: "0.17",
            item_count: "1",
            item_value: "2"
        },
        {
            item_name: "Craftman's Tools",
            item_weight: "0.17",
            item_count: "1",
            item_value: "25"
        },
        {
            item_name: "Tinderbox",
            item_weight: "0.17",
            item_count: "1",
            item_value: ".8"
        },
        {
            item_name: "Torch",
            item_weight: "0.17",
            item_count: "12",
            item_value: ""
        },
        {
            item_name: "Rations (1 Day)",
            item_weight: "0.17",
            item_count: "14",
            item_value: ".2"
        },
        {
            item_name: "Waterskin",
            item_weight: "1",
            item_count: "1",
            item_value: ""
        },
        {
            item_name: "20 sp",
            item_weight: "0",
            item_count: "0",
            item_value: ""
        }
]

const meleeDwarvenCraftpriest =
[
        {
            melee_name: "Warhammer",
            melee_damage: "1d6",
            melee_bonus: "0"
        },
        {
            melee_name: "Warhammer, 2-Handed",
            melee_damage: "1d8",
            melee_bonus: "0"
        }
]

const itemsDwarvenDelver =
[
        
        {
            item_name: "Battle Axe",
            item_weight: "0.17",
            item_count: "1",
            item_value: "7"
        },
        {
            item_name: "Hand Axe",
            item_weight: "0.17",
            item_count: "2",
            item_value: "4"
        },
        {
            item_name: "Crossbow",
            item_weight: "1",
            item_count: "1",
            item_value: "30"
        },
        {
            item_name: "Case (20 Bolts)",
            item_weight: ".17",
            item_count: "1"
        },
        {
            item_name: "Leather Armor",
            item_weight: "2",
            item_count: "1",
            item_value: "20"
        },
        {
            item_name: "Cloak",
            item_weight: "0.17",
            item_count: "1",
            item_value: "1"
        },
        {
            item_name: "Tunic and Pants",
            item_weight: "0.17",
            item_count: "1",
            item_value: "4"
        },
        {
            item_name: "Leather Belt",
            item_weight: "0.17",
            item_count: "1",
            item_value: "0.4"
        },
        {
            item_name: "Boots",
            item_weight: "0.17",
            item_count: "1",
            item_value: ".6"
        },
        {
            item_name: "Backpack",
            item_weight: "0.17",
            item_count: "1",
            item_value: "2"
        },
        {
            item_name: "Sack, Large",
            item_weight: "0.17",
            item_count: "2",
            item_value: ".8"
        },
        {
            item_name: "Pole, 10'",
            item_weight: "1",
            item_count: "1",
            item_value: ".1"
        },
        {
            item_name: "Rope, 50'",
            item_weight: "0.17",
            item_count: "1",
            item_value: "1"
        },
        {
            item_name: "Tinderbox",
            item_weight: "0.17",
            item_count: "1",
            item_value: ".8"
        },
        {
            item_name: "Lantern",
            item_weight: "0.17",
            item_count: "1",
            item_value: "10"
        },
        {
            item_name: "Oil, Military",
            item_weight: "0.17",
            item_count: "2",
            item_value: "2"
        },
        {
            item_name: "Hammer",
            item_weight: "0.17",
            item_count: "1",
            item_value: "2"
        },
        {
            item_name: "Iron Spike",
            item_weight: ".01",
            item_count: "12",
            item_value: ""
        },
        {
            item_name: "Rations (1 Day)",
            item_weight: "0.17",
            item_count: "14",
            item_value: ".2"
        },
        {
            item_name: "Waterskin",
            item_weight: "1",
            item_count: "1",
            item_value: ".6"
        },
        {
            item_name: "1 gp",
            item_weight: "0",
            item_count: "0",
            item_value: ""
        }
]

const meleeDwarvenDelver =
[
        {
            melee_name: "Battle Axe",
            melee_damage: "1d6",
            melee_bonus: "0"
        },
        {
            melee_name: "Battle Axe, 2-Handed",
            melee_damage: "1d8",
            melee_bonus: "0"
        },
        {
            melee_name: "Hand Axe",
            melee_damage: "1d6",
            melee_bonus: "0"
        }
]

const missileDwarvenDelver =
[
        {
            missile_name: "Crossbow",
            missile_range: "80/160/240",
            missile_damage: "1d6",
            missile_bonus: "0",
            missile_ammo: "20"
        },
        {
            missile_name: "Battle Axe (Thrown)",
            missile_range: "10/20/30",
            missile_damage: "1d6",
            missile_bonus: "0",
            missile_ammo: "1"
        },
        {
            missile_name: "Hand Axe (Thrown)",
            missile_range: "10/20/30",
            missile_damage: "1d6",
            missile_bonus: "0",
            missile_ammo: "2"
        }
]

const itemsDwarvenFury =
[
        {
            item_name: "Battle Axe",
            item_weight: "0.17",
            item_count: "2",
            item_value: "7"
        },
        {
            item_name: "Hand Axe",
            item_weight: "0.17",
            item_count: "2",
            item_value: "4"
        },
        {
            item_name: "Cloak",
            item_weight: "0.17",
            item_count: "1",
            item_value: "1"
        },
        {
            item_name: "Tunic and Pants",
            item_weight: "0.17",
            item_count: "1",
            item_value: "4"
        },
        {
            item_name: "Leather Belt",
            item_weight: "0.17",
            item_count: "1",
            item_value: "0.4"
        },
        {
            item_name: "Boots",
            item_weight: "0.17",
            item_count: "1",
            item_value: ".6"
        },
        {
            item_name: "Backpack",
            item_weight: "0.17",
            item_count: "1",
            item_value: "2"
        },
        {
            item_name: "Tinderbox",
            item_weight: "0.17",
            item_count: "1",
            item_value: ".8"
        },
        {
            item_name: "Torch",
            item_weight: "0.17",
            item_count: "12",
            item_value: ""
        },
        {
            item_name: "Oil, Military",
            item_weight: "0.17",
            item_count: "2",
            item_value: "2"
        },
        {
            item_name: "Rations (1 Day)",
            item_weight: "0.17",
            item_count: "14",
            item_value: ".2"
        },
        {
            item_name: "Waterskin",
            item_weight: "1",
            item_count: "1",
            item_value: ".6"
        },
        {
            item_name: "43 gp",
            item_weight: "0",
            item_count: "0",
            item_value: ""
        }
]

const meleeDwarvenFury =
[
        {
            melee_name: "Battle Axe",
            melee_damage: "1d6",
            melee_bonus: "0"
        },
        {
            melee_name: "Battle Axe (2-Handed)",
            melee_damage: "1d8",
            melee_bonus: "0"
        },
        {
            melee_name: "Hand Axe",
            melee_damage: "1d6",
            melee_bonus: "0"
        }
]

const missileDwarvenFury =
[
        {
            missile_name: "Battle Axe (Thrown)",
            missile_range: "10/20/30",
            missile_damage: "1d6",
            missile_bonus: "0",
            missile_ammo: "2"
        },
        {
            missile_name: "Hand Axe (Thrown)",
            missile_range: "10/20/30",
            missile_damage: "1d6",
            missile_bonus: "0",
            missile_ammo: "2"
        }
]

const itemsDwarvenMachinist =
[
        {
            item_name: "Warhammer",
            item_weight: "0.17",
            item_count: "1",
            item_value: "5"
        },
        {
            item_name: "Chainmail Armor",
            item_weight: "4",
            item_count: "1",
            item_value: "40"
        },
        {
            item_name: "Shield",
            item_weight: "1",
            item_count: "1",
            item_value: "10"
        },
        {
            item_name: "Workman's Apron",
            item_weight: "0.17",
            item_count: "1",
            item_value: "1"
        },
        {
            item_name: "Tunic and Pants",
            item_weight: "0.17",
            item_count: "1",
            item_value: "4"
        },
        {
            item_name: "Leather Belt",
            item_weight: "0.17",
            item_count: "1",
            item_value: "0.4"
        },
        {
            item_name: "Boots",
            item_weight: "0.17",
            item_count: "1",
            item_value: ".6"
        },
        {
            item_name: "Backpack",
            item_weight: "0.17",
            item_count: "1",
            item_value: "2"
        },
        {
            item_name: "Machinists' Tools",
            item_weight: "1",
            item_count: "1",
            item_value: "25"
        },
        {
            item_name: "Stonemasons' Tools",
            item_weight: "1",
            item_count: "1",
            item_value: "25"
        },
        {
            item_name: "Tinderbox",
            item_weight: "0.17",
            item_count: "1",
            item_value: ".8"
        },
        {
            item_name: "Torch",
            item_weight: "0.17",
            item_count: "12",
            item_value: ""
        },
        {
            item_name: "Hammer",
            item_weight: "0.17",
            item_count: "1",
            item_value: "2"
        },
        {
            item_name: "Iron Spike",
            item_weight: ".01",
            item_count: "12",
            item_value: ""
        },
        {
            item_name: "Rations (1 Day)",
            item_weight: "0.17",
            item_count: "14",
            item_value: ".2"
        },
        {
            item_name: "Waterskin",
            item_weight: "1",
            item_count: "1",
            item_value: ".6"
        },
        {
            item_name: "1 gp",
            item_weight: "0",
            item_count: "0",
            item_value: ""
        }
]

const meleeDwarvenMachinist =
[
        {
            melee_name: "Warhammer",
            melee_damage: "1d6",
            melee_bonus: "0"
        },
        {
            melee_name: "Warhammer (2-Handed)",
            melee_damage: "1d8",
            melee_bonus: "0"
        }
]

const itemsDwarvenVaultguard =
[
        {
            item_name: "Battle Axe",
            item_weight: "0.17",
            item_count: "1",
            item_value: "7"
        },
        {
            item_name: "Hand Axe",
            item_weight: "0.17",
            item_count: "3",
            item_value: "4"
        },
        {
            item_name: "Banded Plate Armor",
            item_weight: "5",
            item_count: "1",
            item_value: "50"
        },
        {
            item_name: "Shield",
            item_weight: "1",
            item_count: "1",
            item_value: "10"
        },
        {
            item_name: "Backpack",
            item_weight: "0.17",
            item_count: "1",
            item_value: "2"
        },
        {
            item_name: "Tinderbox",
            item_weight: "0.17",
            item_count: "1",
            item_value: ".8"
        },
        {
            item_name: "Lantern",
            item_weight: "0.17",
            item_count: "1",
            item_value: "10"
        },
        {
            item_name: "Oil (Military)",
            item_weight: "0.17",
            item_count: "2",
            item_value: "2"
        },
        {
            item_name: "Oil (Common)",
            item_weight: "0.17",
            item_count: "3",
            item_value: ".3"
        },
        {
            item_name: "Rations (1 Day)",
            item_weight: "0.17",
            item_count: "14",
            item_value: ".2"
        },
        {
            item_name: "Waterskin",
            item_weight: "1",
            item_count: "1",
            item_value: ""
        }
]

const meleeDwarvenVaultguard =
[
        {
            melee_name: "Battle Axe",
            melee_damage: "1d6",
            melee_bonus: "0"
        },
        {
            melee_name: "Battle Axe, 2-Handed",
            melee_damage: "1d8",
            melee_bonus: "0"
        },
        {
            melee_name: "Hand Axe",
            melee_damage: "1d6",
            melee_bonus: "0"
        }
]

const missileDwarvenVaultguard =
[
        {
            missile_name: "Battle Axe (Thrown)",
            missile_range: "10/20/30",
            missile_damage: "1d6",
            missile_bonus: "0",
            missile_ammo: "1"
        },
        {
            missile_name: "Hand Axe (Thrown)",
            missile_range: "10/20/30",
            missile_damage: "1d6",
            missile_bonus: "0",
            missile_ammo: "1"
        }
]

const itemsElvenCourtier =
[
        {
            item_name: "Sword",
            item_weight: "0.17",
            item_count: "1",
            item_value: "10"
        },
        {
            item_name: "Chainmail Armor",
            item_weight: "4",
            item_count: "1",
            item_value: "40"
        },
        {
            item_name: "Shield",
            item_weight: "1",
            item_count: "1",
            item_value: "10"
        },
        {
            item_name: "Cloak",
            item_weight: "0.17",
            item_count: "1",
            item_value: "1"
        },
        {
            item_name: "Tunic and Pants (Armiger)",
            item_weight: "0.17",
            item_count: "1",
            item_value: "20"
        },
        {
            item_name: "Boots (High)",
            item_weight: "0.17",
            item_count: "1",
            item_value: "3"
        },
        {
            item_name: "Backpack",
            item_weight: "0.17",
            item_count: "1",
            item_value: "2"
        },
        {
            item_name: "Rations (1 Day)",
            item_weight: "0.17",
            item_count: "14",
            item_value: ".2"
        },
        {
            item_name: "Waterskin",
            item_weight: "1",
            item_count: "1",
            item_value: ""
        },
        {
            item_name: "30 gp",
            item_weight: "0",
            item_count: "0",
            item_value: ""
        }
]

const meleeElvenCourtier =
[
        {
            melee_name: "Sword",
            melee_damage: "1d6",
            melee_bonus: "0"
        },
        {
            melee_name: "Sword, 2-Handed",
            melee_damage: "1d8",
            melee_bonus: "0"
        }
]

const itemsElvenEnchanter =
[
        {
            item_name: "Quarterstaff",
            item_weight: "1",
            item_count: "1",
            item_value: "1"
        },
        {
            item_name: "Darts (5)",
            item_weight: "0.17",
            item_count: "1",
            item_value: "2"
        },
        {
            item_name: "Mage's Cassock",
            item_weight: "0.17",
            item_count: "1",
            item_value: "7"
        },
        {
            item_name: "Leather Belt",
            item_weight: "0.17",
            item_count: "1",
            item_value: "0.4"
        },
        {
            item_name: "Boots",
            item_weight: "0.17",
            item_count: "1",
            item_value: ".6"
        },
        {
            item_name: "Backpack",
            item_weight: "0.17",
            item_count: "1",
            item_value: "2"
        },
        {
            item_name: "Spell Book",
            item_weight: "0.17",
            item_count: "1",
            item_value: "20"
        },
        {
            item_name: "Quill & Ink",
            item_weight: "0.17",
            item_count: "1",
            item_value: "8"
        },
        {
            item_name: "Rations (1 Day)",
            item_weight: "0.17",
            item_count: "14",
            item_value: ".2"
        },
        {
            item_name: "Waterskin",
            item_weight: "1",
            item_count: "1",
            item_value: ""
        },
        {
            item_name: "57 gp",
            item_weight: "0",
            item_count: "0",
            item_value: ""
        }
]

const meleeElvenEnchanter =
[
        {
            melee_name: "Quarterstaff",
            melee_damage: "1d4",
            melee_bonus: "0"
        },
        {
            melee_name: "Quarterstaff, 2-Handed",
            melee_damage: "1d6",
            melee_bonus: "0"
        }
]

const missileElvenEnchanter =
[
        {
            missile_name: "Dart (Thrown)",
            missile_range: "15/30/45",
            missile_damage: "1d4",
            missile_bonus: "0",
            missile_ammo: "5"
        }
]

const itemsElvenNightblade =
[
        {
            item_name: "Crossbow",
            item_weight: "1",
            item_count: "1",
            item_value: "30"
        },
        {
            item_name: "Case (20 Bolts)",
            item_weight: ".17",
            item_count: "1",
            item_value: ""
        },
        {
            item_name: "Sword",
            item_weight: "0.17",
            item_count: "1",
            item_value: "10"
        },
        {
            item_name: "Dagger",
            item_weight: "0.17",
            item_count: "1",
            item_value: "3"
        },
        {
            item_name: "Leather Armor",
            item_weight: "2",
            item_count: "1",
            item_value: "20"
        },
        {
            item_name: "Cloak",
            item_weight: "0.17",
            item_count: "1",
            item_value: "1"
        },
        {
            item_name: "Backpack",
            item_weight: "0.17",
            item_count: "1",
            item_value: "2"
        },
        {
            item_name: "Grappling Hook",
            item_weight: "0.17",
            item_count: "1",
            item_value: "25"
        },
        {
            item_name: "Rope, 50'",
            item_weight: "0.17",
            item_count: "1",
            item_value: "1"
        },
        {
            item_name: "Crowbar",
            item_weight: "0.17",
            item_count: "1",
            item_value: "1"
        },
        {
            item_name: "Oil, Military",
            item_weight: "0.17",
            item_count: "1",
            item_value: "2"
        },
        {
            item_name: "Tinderbox",
            item_weight: "0.17",
            item_count: "1",
            item_value: ".8"
        },
        {
            item_name: "Torch",
            item_weight: "0.17",
            item_count: "12",
            item_value: ""
        },
        {
            item_name: "Rations (1 Day)",
            item_weight: "0.17",
            item_count: "14",
            item_value: ".2"
        },
        {
            item_name: "Waterskin",
            item_weight: "1",
            item_count: "1",
            item_value: ""
        },
        {
            item_name: "20 sp",
            item_weight: "0",
            item_count: "0",
            item_value: ""
        }
]

const meleeElvenNightblade =
[
        {
            melee_name: "Sword",
            melee_damage: "1d6",
            melee_bonus: "0"
        },
        {
            melee_name: "Sword, 2-Handed",
            melee_damage: "1d8",
            melee_bonus: "0"
        },
        {
            melee_name: "Dagger",
            melee_damage: "1d6",
            melee_bonus: "0"
        }
]

const missileElvenNightblade =
[
        {
            missile_name: "Crossbow",
            missile_range: "80/60/120",
            missile_damage: "1d6",
            missile_bonus: "0",
            missile_ammo: "20"
        },
        {
            missile_name: "Dagger (Thrown)",
            missile_range: "10/20/30",
            missile_damage: "1d6",
            missile_bonus: "0",
            missile_ammo: "1"
        }
]

const itemsElvenRanger =
[
        {
            item_name: "Longbow",
            item_weight: "1",
            item_count: "1",
            item_value: "7"
        },
        {
            item_name: "Quiver (20 Arrows)",
            item_weight: ".17",
            item_count: "1"
        },
        {
            item_name: "Spear",
            item_weight: "1",
            item_count: "1",
            item_value: "3"
        },
        {
            item_name: "Short Sword",
            item_weight: "0.17",
            item_count: "1",
            item_value: "7"
        },
        {
            item_name: "Dagger",
            item_weight: "0.17",
            item_count: "1",
            item_value: "3"
        },
        {
            item_name: "Chainmail Armor",
            item_weight: "4",
            item_count: "1",
            item_value: "40"
        },
        {
            item_name: "Cloak (Fur)",
            item_weight: "0.17",
            item_count: "1",
            item_value: "15"
        },
        {
            item_name: "Tunic and Pants",
            item_weight: "0.17",
            item_count: "1",
            item_value: "4"
        },
        {
            item_name: "Leather Belt",
            item_weight: "0.17",
            item_count: "1",
            item_value: "0.4"
        },
        {
            item_name: "Boots",
            item_weight: "0.17",
            item_count: "1",
            item_value: ".6"
        },
        {
            item_name: "Backpack",
            item_weight: "0.17",
            item_count: "1",
            item_value: "2"
        },
        {
            item_name: "Tinderbox",
            item_weight: "0.17",
            item_count: "1",
            item_value: ".8"
        },
        {
            item_name: "Lantern",
            item_weight: "0.17",
            item_count: "1",
            item_value: "10"
        },
        {
            item_name: "Oil, Common",
            item_weight: "0.17",
            item_count: "2",
            item_value: ".3"
        },
        {
            item_name: "Blanket",
            item_weight: "0.17",
            item_count: "1",
            item_value: "2"
        },
        {
            item_name: "Rope, 50'",
            item_weight: "0.17",
            item_count: "1",
            item_value: "1"
        },
        {
            item_name: "Iron Spikes",
            item_weight: ".01",
            item_count: "12",
            item_value: ""
        },
        {
            item_name: "Small Hammer",
            item_weight: "0.17",
            item_count: "1",
            item_value: "2"
        },
        {
            item_name: "Rations (1 Day)",
            item_weight: "0.17",
            item_count: "14",
            item_value: ".2"
        },
        {
            item_name: "Waterskin",
            item_weight: "1",
            item_count: "1",
            item_value: ""
        },
        {
            item_name: "20 sp",
            item_weight: "0",
            item_count: "0",
            item_value: ""
        }
]

const meleeElvenRanger =
[
        {
            melee_name: "Short Sword",
            melee_damage: "1d6",
            melee_bonus: "0"
        },
        {
            melee_name: "Spear",
            melee_damage: "1d6",
            melee_bonus: "0"
        },
        {
            melee_name: "Spear, 2-Handed",
            melee_damage: "1d8",
            melee_bonus: "0"
        },
        {
            melee_name: "Dagger",
            melee_damage: "1d6",
            melee_bonus: "0"
        }
]

const missileElvenRanger =
[
        {
            missile_name: "Longbow",
            missile_range: "70/140/210",
            missile_damage: "1d6",
            missile_bonus: "0",
            missile_ammo: "20"
        },
        {
            missile_name: "Spear (Thrown)",
            missile_range: "20/40/60",
            missile_damage: "1d6",
            missile_bonus: "0",
            missile_ammo: "1"
        },
        {
            missile_name: "Dagger (Thrown)",
            missile_range: "10/20/30",
            missile_damage: "1d6",
            missile_bonus: "0",
            missile_ammo: "1"
        }
]

const itemsElvenSpellsword =
[,
        {
            item_name: "Sword",
            item_weight: "0.17",
            item_count: "1",
            item_value: "10"
        },
        {
            item_name: "Dagger",
            item_weight: "0.17",
            item_count: "1",
            item_value: "3"
        },
        {
            item_name: "Composite Bow",
            item_weight: "1",
            item_count: "1",
            item_value: ""
        },
        {
            item_name: "Quiver (20 Arrows)",
            item_weight: ".17",
            item_count: "1",
            item_value: ""
        },
        {
            item_name: "Chainmail Armor",
            item_weight: "4",
            item_count: "1",
            item_value: "40"
        },
        {
            item_name: "Cloak",
            item_weight: "0.17",
            item_count: "1",
            item_value: "1"
        },
        {
            item_name: "Boots",
            item_weight: "0.17",
            item_count: "1",
            item_value: ".6"
        },
        {
            item_name: "Backpack",
            item_weight: "0.17",
            item_count: "1",
            item_value: "2"
        },
        {
            item_name: "Spell Book",
            item_weight: "0.17",
            item_count: "1",
            item_value: ""
        },
        {
            item_name: "Tinderbox",
            item_weight: "0.17",
            item_count: "1",
            item_value: ".8"
        },
        {
            item_name: "Torch",
            item_weight: "0.17",
            item_count: "12",
            item_value: ""
        },
        {
            item_name: "Rations (1 Day)",
            item_weight: "0.17",
            item_count: "14",
            item_value: ".2"
        },
        {
            item_name: "Waterskin",
            item_weight: "1",
            item_count: "1",
            item_value: ""
        },
        {
            item_name: "20 sp",
            item_weight: "0",
            item_count: "0",
            item_value: ""
        }
]

const meleeElvenSpellsword =
[
        {
            melee_name: "Sword",
            melee_damage: "1d6",
            melee_bonus: "0"
        },
        {
            melee_name: "Sword, 2-Handed",
            melee_damage: "1d8",
            melee_bonus: "0"
        },
        {
            melee_name: "Dagger",
            melee_damage: "1d6",
            melee_bonus: "0"
        }
]

const missileElvenSpellsword =
[
        {
            missile_name: "Composite Bow",
            missile_range: "70/140/210",
            missile_damage: "1d6",
            missile_bonus: "0",
            missile_ammo: "20"
        },
        {
            missile_name: "Dagger (Thrown)",
            missile_range: "10/20/30",
            missile_damage: "1d6",
            missile_bonus: "0",
            missile_ammo: "1"
        }
]

const itemsExplorer =
[
        {
            item_name: "Longbow",
            item_weight: "1",
            item_count: "1",
            item_value: "7"
        },
        {
            item_name: "Quiver (20 Arrows)",
            item_weight: ".17",
            item_count: "1"
        },
        {
            item_name: "Spear",
            item_weight: "1",
            item_count: "1",
            item_value: "3"
        },
        {
            item_name: "Short Sword",
            item_weight: "0.17",
            item_count: "1",
            item_value: "7"
        },
        {
            item_name: "Dagger",
            item_weight: "0.17",
            item_count: "1",
            item_value: "3"
        },
        {
            item_name: "Chainmail Armor",
            item_weight: "4",
            item_count: "1",
            item_value: "40"
        },
        {
            item_name: "Cloak (Fur)",
            item_weight: "0.17",
            item_count: "1",
            item_value: "15"
        },
        {
            item_name: "Boots",
            item_weight: "0.17",
            item_count: "1",
            item_value: ".6"
        },
        {
            item_name: "Backpack",
            item_weight: "0.17",
            item_count: "1",
            item_value: "2"
        },
        {
            item_name: "Tinderbox",
            item_weight: "0.17",
            item_count: "1",
            item_value: ".8"
        },
        {
            item_name: "Lantern",
            item_weight: "0.17",
            item_count: "1",
            item_value: "10"
        },
        {
            item_name: "Oil, Common",
            item_weight: "0.17",
            item_count: "2",
            item_value: ".3"
        },
        {
            item_name: "Blanket",
            item_weight: "0.17",
            item_count: "1",
            item_value: "2"
        },
        {
            item_name: "Rope, 50'",
            item_weight: "0.17",
            item_count: "1",
            item_value: "1"
        },
        {
            item_name: "Iron Spikes",
            item_weight: ".01",
            item_count: "12",
            item_value: ""
        },
        {
            item_name: "Small Hammer",
            item_weight: "0.17",
            item_count: "1",
            item_value: "2"
        },
        {
            item_name: "Rations (1 Day)",
            item_weight: "0.17",
            item_count: "14",
            item_value: ".2"
        },
        {
            item_name: "Waterskin",
            item_weight: "1",
            item_count: "1",
            item_value: ""
        },
        {
            item_name: "20 sp",
            item_weight: "0",
            item_count: "0",
            item_value: ""
        }
]

const meleeExplorer =
[
        {
            melee_name: "Short Sword",
            melee_damage: "1d6",
            melee_bonus: "0"
        },
        {
            melee_name: "Spear",
            melee_damage: "1d6",
            melee_bonus: "0"
        },
        {
            melee_name: "Spear, 2-Handed",
            melee_damage: "1d8",
            melee_bonus: "0"
        },
        {
            melee_name: "Dagger",
            melee_damage: "1d6",
            melee_bonus: "0"
        }
]

const missileExplorer =
[
        {
            missile_name: "Longbow",
            missile_range: "70/140/210",
            missile_damage: "1d6",
            missile_bonus: "0",
            missile_ammo: "20"
        },
        {
            missile_name: "Spear (Thrown)",
            missile_range: "20/40/60",
            missile_damage: "1d6",
            missile_bonus: "0",
            missile_ammo: "1"
        },
        {
            missile_name: "Dagger (Thrown)",
            missile_range: "10/20/30",
            missile_damage: "1d6",
            missile_bonus: "0",
            missile_ammo: "1"
        }
]

const itemsFighter =
[
        {
            item_name: "Sword",
            item_weight: "0.16",
            item_count: "1",
            item_value: "10"
        },
        {
            item_name: "Shield",
            item_weight: "1",
            item_count: "1",
            item_value: "10"
        },
        {
            item_name: "Chainmal Armor",
            item_weight: "4",
            item_count: "1",
            item_value: "40"
        },
        {
            item_name: "Crossbow",
            item_weight: "1",
            item_count: "1",
            item_value: "30"
        },
        {
            item_name: "Case (20 Bolts)",
            item_weight: ".17",
            item_count: "1"
        },
        {
            item_name: "Tunic and Pants",
            item_weight: "0.17",
            item_count: "1",
            item_value: "4"
        },
        {
            item_name: "Boots",
            item_weight: "0.17",
            item_count: "1",
            item_value: ".3"
        },
        {
            item_name: "Backpack",
            item_weight: "0.17",
            item_count: "1",
            item_value: "2"
        },
        {
            item_name: "Tinderbox",
            item_weight: "0.17",
            item_count: "1",
            item_value: ".8"
        },
        {
            item_name: "Torch",
            item_weight: "0.17",
            item_count: "12",
            item_value: ""
        },
        {
            item_name: "Rations (1 Day)",
            item_weight: "0.17",
            item_count: "14",
            item_value: ".2"
        },
        {
            item_name: "Waterskin",
            item_weight: "1",
            item_count: "1",
            item_value: ""
        },
        {
            item_name: "20 sp",
            item_weight: "0",
            item_count: "0",
            item_value: ""
        }
]

const meleeFighter =
[
        {
            melee_name: "Sword",
            melee_damage: "1d6",
            melee_bonus: "0"
        },
        {
            melee_name: "Sword, 2-Handed",
            melee_damage: "1d8",
            melee_bonus: "0"
        }
]

const missileFighter =
[
        {
            missile_name: "Crossbow",
            missile_range: "80/160/240",
            missile_damage: "1d6",
            missile_bonus: "0",
            missile_ammo: "20"
        }
]

const itemsGnomishTrickster =
[
        {
            item_name: "Short Sword",
            item_weight: "0.17",
            item_count: "1",
            item_value: "7"
        },
        {
            item_name: "Dagger",
            item_weight: "0.17",
            item_count: "2",
            item_value: "3"
        },
        {
            item_name: "Crossbow",
            item_weight: "1",
            item_count: "1",
            item_value: "30"
        },
        {
            item_name: "Case (20 Bolts)",
            item_weight: ".17",
            item_count: "1"
        },
        {
            item_name: "Leather Armor",
            item_weight: "2",
            item_count: "1",
            item_value: "20"
        },
        {
            item_name: "Mummer's Mask",
            item_weight: "0.01",
            item_count: "1",
            item_value: ""
        },
        {
            item_name: "Cloak",
            item_weight: "0.17",
            item_count: "1",
            item_value: "1"
        },
        {
            item_name: "Tunic and Pants",
            item_weight: "0.17",
            item_count: "1",
            item_value: "4"
        },
        {
            item_name: "Boots",
            item_weight: "0.17",
            item_count: "1",
            item_value: ".6"
        },
        {
            item_name: "Backpack",
            item_weight: "0.17",
            item_count: "1",
            item_value: "2"
        },
        {
            item_name: "Disguise Kit",
            item_weight: "0.17",
            item_count: "1",
            item_value: "25"
        },
        {
            item_name: "Rations (1 Day)",
            item_weight: "0.17",
            item_count: "14",
            item_value: ".2"
        },
        {
            item_name: "Waterskin",
            item_weight: "1",
            item_count: "1",
            item_value: ".6"
        },
        {
            item_name: "10 gp",
            item_weight: "0",
            item_count: "0",
            item_value: ""
        }
]

const meleeGnomishTrickster =
[
        {
            melee_name: "Short Sword",
            melee_damage: "1d6",
            melee_bonus: "0"
        },
        {
            melee_name: "Dagger",
            melee_damage: "1d4",
            melee_bonus: "0"
        }
]

const missileGnomishTrickster =
[
        {
            missile_name: "Crossbow",
            missile_range: "80/160/240",
            missile_damage: "1d6",
            missile_bonus: "0",
            missile_ammo: "20"
        },
        {
            missile_name: "Dagger (Thrown)",
            missile_range: "10/20/30",
            missile_damage: "1d4",
            missile_bonus: "0",
            missile_ammo: "1"
        }
]

const itemsMage =
[
        {
            item_name: "Quarterstaff",
            item_weight: "1",
            item_count: "1",
            item_value: "1"
        },
        {
            item_name: "Mage's Cassock",
            item_weight: "0.17",
            item_count: "1",
            item_value: "7"
        },
        {
            item_name: "Shoes",
            item_weight: "0.17",
            item_count: "1",
            item_value: ".4"
        },
        {
            item_name: "Backpack",
            item_weight: "0.17",
            item_count: "1",
            item_value: "2"
        },
        {
            item_name: "Spell Book",
            item_weight: "0.17",
            item_count: "1",
            item_value: "20"
        },
        {
            item_name: "Tinderbox",
            item_weight: "0.17",
            item_count: "1",
            item_value: ".8"
        },
        {
            item_name: "Torch",
            item_weight: "0.17",
            item_count: "12",
            item_value: ""
        },
        {
            item_name: "Rations (1 Day)",
            item_weight: "0.17",
            item_count: "14",
            item_value: ".2"
        },
        {
            item_name: "Waterskin",
            item_weight: "1",
            item_count: "1",
            item_value: ""
        },
        {
            item_name: "85 gp",
            item_weight: "0",
            item_count: "0",
            item_value: ""
        }
]

const meleeMage =
[
        {
            melee_name: "Quarterstaff",
            melee_damage: "1d4",
            melee_bonus: "0"
        },
        {
            melee_name: "Quarterstaff, 2-Handed",
            melee_damage: "1d6",
            melee_bonus: "0"
        }
]

const itemsThief =
[
        {
            item_name: "Short Sword",
            item_weight: "0.17",
            item_count: "1",
            item_value: "7"
        },
        {
            item_name: "Dagger",
            item_weight: "0.17",
            item_count: "2",
            item_value: "3"
        },
        {
            item_name: "Crossbow",
            item_weight: "1",
            item_count: "1",
            item_value: "30"
        },
        {
            item_name: "Case (20 Bolts)",
            item_weight: ".17",
            item_count: "1"
        },
        {
            item_name: "Leather Armor",
            item_weight: "2",
            item_count: "1",
            item_value: "20"
        },
        {
            item_name: "Cloak",
            item_weight: "0.17",
            item_count: "1",
            item_value: "1"
        },
        {
            item_name: "Tunic and Pants",
            item_weight: "0.17",
            item_count: "1",
            item_value: "4"
        },
        {
            item_name: "Boots",
            item_weight: "0.17",
            item_count: "1",
            item_value: ".6"
        },
        {
            item_name: "Backpack",
            item_weight: "0.17",
            item_count: "1",
            item_value: "2"
        },
        {
            item_name: "Sack, Large",
            item_weight: "0.17",
            item_count: "2",
            item_value: ".8"
        },
        {
            item_name: "Thieves' Tools",
            item_weight: "0.17",
            item_count: "1",
            item_value: "25"
        },
        {
            item_name: "Pole, 10'",
            item_weight: "1",
            item_count: "1",
            item_value: ".1"
        },
        {
            item_name: "Rope, 50'",
            item_weight: "0.17",
            item_count: "1",
            item_value: "1"
        },
        {
            item_name: "Hammer",
            item_weight: "0.17",
            item_count: "1",
            item_value: "2"
        },
        {
            item_name: "Iron Spike",
            item_weight: ".01",
            item_count: "12",
            item_value: ""
        },
        {
            item_name: "Tinderbox",
            item_weight: "0.17",
            item_count: "1",
            item_value: ".8"
        },
        {
            item_name: "Lantern",
            item_weight: "0.17",
            item_count: "1",
            item_value: "10"
        },
        {
            item_name: "Oil, Military",
            item_weight: "0.17",
            item_count: "2",
            item_value: "2"
        },
        {
            item_name: "Rations (1 Day)",
            item_weight: "0.17",
            item_count: "14",
            item_value: ".2"
        },
        {
            item_name: "Waterskin",
            item_weight: "1",
            item_count: "1",
            item_value: ".6"
        },
        {
            item_name: "20 sp",
            item_weight: "0",
            item_count: "0",
            item_value: ""
        }
]

const meleeThief =
[
        {
            melee_name: "Short Sword",
            melee_damage: "1d6",
            melee_bonus: "0"
        },
        {
            melee_name: "Dagger",
            melee_damage: "1d4",
            melee_bonus: "0"
        }
]

const missileThief =
[
        {
            missile_name: "Crossbow",
            missile_range: "80/160/240",
            missile_damage: "1d6",
            missile_bonus: "0",
            missile_ammo: "20"
        },
        {
            missile_name: "Dagger (Thrown)",
            missile_range: "10/20/30",
            missile_damage: "1d4",
            missile_bonus: "0",
            missile_ammo: "1"
        }
]