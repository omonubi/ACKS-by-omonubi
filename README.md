# Roll20 Character Sheet for Autarch ACKS
This is a Roll20 specific character sheet designed for use with the Adventurer Conqueror King System (ACKS) OSR RGP, published under the OGL 1.0 license, by Autarch.

Hopefully, this documentation below comes in useful. I know I've struggled over the years when attempting to implement custom character sheets. Even the official sheets are sometimes difficult to divine.

---

## Installing
To use this sheet in your own games:

1. In Roll 20, click *Create New Game* and select *Custom* from the *Optional: Choose Character Sheet* drop-down menu.
2. Once the game is created, go to *Settings* > *Game Settings*.
3. Under *Character Sheet Template*...
    1. Within the *HTML Layout* tab, paste in the contents of charactersheet.html.
    2. Within the *CSS Styiling* tab, paste in the contents of charactersheet.css.
    3. Ensure that *Legacy Sanitation* is **NOT** checked.
4. Save your changes and launch the game.

**This sheet does not yet support translation.**

---

## Tabs
The sheet is divided into tabs to help isolate different bodies of information and simplify usage:

| Tab Title | Description |
| --- | ---|
| *Overview*     | The characters attributes, saves, key characteristics, names, and a summary of important combat stats and conditions. |
| *Class* | Class-specific information. By default, displays a generic set of editable 'class-specific' modifiers, as well as spellcasting slots and a repertoire. If an ACKS class is specified in the *class* field, is reconfigured with custom class abilities and SRD information from the ACKS source books. |
| *Skills* | The first section is for custom abilities, such as *Find Secret Door* and *Hear Noise*. The second is for listing proficiencies. Each section provides a throw and a description button (see below). |
| *Combat* | Contains buttons for initiative, surprise, etc., armor configuration, attack throw and type, melee attacks, missile attacks, and a few effects generators (crits and mortal wounds). |
| *Equipment* | Lists all equipment, calculates encumbrance and speed, currency (on hand, banked, and found recently), and standard of living and other monthly costs. |
| *Hirelings* | Used for tracking henchmen, mercenaires, and specialists in the employ of the character. |
| *Journal* | Tracks character background, languages, injuries. additional properties/debts, adventuring notes, and experience gains. |
| *Settings* | Use these settings to alter base movement/encumbrance functionality for non-humanoid creatures, such as horses, mules, etc. |

---

## Overview Tab

| Property | Description |
| --- | --- |
| *character_fullname* | Provided to allow for more 'expressive' and complete names than either the standard *character_name* or *token_name* properties. |
| *class* | As a text field, allows for any class. However, if an ACKS class name (currently, ACKS Core only) is entered, will enable SRD class descriptions and summary in the sheet's Class tab, as well as auto-calculation of several key stats. **Important:** Setting/changing this property to an ACKS class - at any time - will over-write several other field values on the sheet. Change with caution! This field can now be 'locked', to help prevent accidental changes. |
| *character_title* | If *class* is set to ACKS class, will display the appropriate title for the class and level in question. This field can now be 'locked', to help prevent accidental changes. |
| *level* | Minimum value allowed is 0; maximum is 14. Currently, the sheet doesn't limit level based on class, though auto-populated values are zeroed out if/when a particular class exceeds its level maximum. |
| attributes | Minimum value for each is 0; maximum is 20. Use/edit the 'Nominal' column to track (and preserve) the character's un-modified scores. This is done via the Roll20 character sheet 'Attributes & Abilities' tab by inputing 'Max' values for each attribute. Click the 'Prereq' checkbox(es) to auto-calculate the character's XP bonus, shown next to the 'Experience' field label, above. |
| saving throws | I have added an 'agility save' to assist the Judge with tracking agility-based DEX penalties seperate from the DEX attribute. Use if/when desired. All other save targets are configurable, though they will be autoset when *character_class* is set to an ACKS class (overwriting previous values). Use the modifier fields as needed. |
| conditions | These are used to track various common conditions. Their effects are automatically applied to the appropriate areas of the character sheet. Note that *fatigued* can by stacked. *Movement* can be used to increase/reduce the character's base movement per turn. |
| grayed-out fields | See Monster Stats, below. |

---

## Class Tab

| Property | Description |
| --- | --- |
| class bonuses | These fields are intended to capture *global* bonuses specific to the *class* selection. If ACKS classes are selected (see below), the appropriate values will automatically be entered/overwritten. Class abilities that provide one or more of these bonuses but only under certain conditions should **not** be tracked here. Note that *class_damage_reduction* must be applied manually at the time of the damage roll. |
| spell slots | These can be used for any ACKS magic class, and they include a place to track cantrips and corruption (AXIOMS Shades of Magic). |
| spell list | These should be self-explanatory. Use the Prepared checkbox to indicate if a spell is in the characater's repertoire or not (in a spellbook). Obviously, divine magical classes should always have all spells Prepared. Shades of Magic are also included but are optional. |
| thieving abilities | These buttons' throw targets are determined by class and level, and will only be displayed if *class* is set to an appropriate ACKS class. |
| SRD content | This content will only be displayed if *class* is set to an ACKS class. For example, to see the SRD description of the Elven Spellsword class enter 'Elven Spellsword' as the characters class. Currently, only classes from the ACS Core rulebook are supported. |

---

## Skills Tab

| Property | Description |
| --- | --- |
| abilities | This repeating section is intended for use to track various additional skills that a character may possess, not explicitly captured on the sheet elsewhere. |
| *ability_source* | Used to indicate where the ability is derived from. I use 'common' to indicate an ability that all characters have, 'class' for additional class-specific abilities, 'proficiency' if derived from an ACKS proficiency, etc. |
| *ability_target* | Sets the throw target for the ability. The Throw button supports the use of optional sheet attritbutes so more complex auto-calculations can be performed here. For example, '14 - (@{level}-1) * 2', to set the initial target to 18 and subract 2 for every additional character level over 1. |
| proficiencies | Use this repeating section to track a character's ACKS proficiencies. |
| *proficiency_target* | Sets the throw target for the proficiency. Supports the use of skill attribute formulas, as per *ability_target*, above. However, *proficiency_rank* modifiers are already factored into the throw and don't need to be accounted for here. |

---

## Combat Tab

| Property | Description |
| --- | --- |
| *roll_initiative* | When the button is clicked, accepts a modifier and then applies it to a 1d6 roll, modified by *mod_initiative* field value if any. The number is then multiplied by 100 and a d99 added, in order to break down simultaneous actions more finely, if desired (if not, simply ignore the last two digits in the result.) The result is output in the Roll20 chat window and sent to the turn tracker. Use the modifier field to account for two-handed weapon penalties and/or other necessary modifications to the roll, as needed. |
| *roll_surprise* | When the button is clicked, accepts a modifier and then applies it to a 1d6 roll, modified by *mod_surprise* field value if any. A result of 1 or 2 results in 'surprised'; otheriwse 'ready', as per ACKS Core pg. 97. The result is output in the Roll20 chat window. |
| *roll_reaction* | When the button is clicked, accepts a modifier and then applies it to a 2d6 roll, modified by *mod_reaction* field value if any. The result is sent to the Roll20 chat window and includes a short-hand table to explain the result, as per ACKS Core pg. 99. |
| *roll_morale* | Intended for use with non-PC characters, when the button is clicked, accepts a modifier and then applies it to a 2d6 roll, modified by *mod_morale* field value if any. The result is sent to the Roll20 chat window and includes a short-hand table to explain the result, as per ACKS Core pg. 110. |
| *armor_class* | This value is determine by selecting the appriopriate armor from the drop-down list, providing a bonus if necessary (e.g. magical armor), checking the Shield checkbox if wielded, and then accounting for DEX bonus. This value may also be auto-adjusted based on current, applicable conditions (see Overview tab). |
| *has_helm* | If checked, activates heavy helm penalties and bonuses described in the ACKS Player's Companion sourcebook. |
| effects generators | See Roll Templates, below. |
| *attack_throw* | If *class* is set to an ACKS class, or if monster *xp_value* is set to any value, this is auto-calculated. The value is determined by *level* (for ACKS class) or *hit_dice* (for monster). The value is used as the base target for all melee and missile throws. |
| *num_attacks* | This is a text field used mainly to track monster attack patterns (e.g. 'claw/claw/bite, or breath'). Its default value is '1' and isn't used anywhere else on the sheet. |
| melee attacks | A repeating list to track a creature's hand-to-hand attacks. Use different melee attack entries to track one- vs. two-handed usage/damage for applicable weapons. |
| *melee_is_equipped* | Indicates that the weapon is currently equipped. |
| *melee_reach* | The weapon's reach, in feet. The default is 5. Not used elsewhere in the sheet - its only a visual reminder for the player. |
| *melee_throw* | When a throw is made, the user will be prompted for the target's AC, to select their fighting style (either 'Normal', 'Dual-Wield', or 'Finesse'), and provide any additional modifier. Note that the character's str and/or dex is included in the fighting style calculation. The throw supports Exploding 20s to determine citical hits from ACKS HF pg. 85. |
| *melee_is_twohanded* | Indicates that the weapon is exclusively used two-handed. If *melee_is_equipped* is also checked, triggers the ACKS -1 penalty to initiative rolls. |
| *melee_bonus* | Applies to attack throws, but not damage. |
| *melee_damage* | Use 'xdy+z' format. |
| missile attacks | A repeating list of a creature's missile attacks; the same as for melee attacks, above. Note that ammo consumption is not currently tracked/modified automatically. |
| *missile_is_equipped* | Indicates that the weapon is currently equipped. |
| *missile_range* | A text field to track a missile attack's range bands. For example, '10/20/30'. It is not used anywhere else in the sheet. |
| *melee_damage* | Use 'xdy+z' format. |
| *missile_ammo* | Two fields (optional). Used to keep track of ammo (*not* tracked under equipment). Use the hidden field to track total ammo on-hand prior to combat, and the unhidden field to track ammo remaining after making attacks. Before battle, the two fields should have the same value. After battle, compute the difference and allow the character to retrieve half of their fired ammo. |

### A note concerning melee weapons and thier attacks
This sheet was designed to accomodate the various ways in which ACKS allows characters to use different types of weapons in different modes of attacks, as follows:

- Change the *melee_reach* value, as appropriate. For example, a spear has a reach of 10.
- Check *melee_is_twohanded* checkbox to indicate that the weapon is exclusively for 2-handed use (and imparts a -1 initiative penalty).
- For weapons that may be used as one- or two-handed, create two melee attack entries. For example, 'Spear' for 1d6 damage and 'Spear (Two-Handed) for 1d8 damage.
- By default, anything can be thrown as 'Improvised' for 1d3 damage at 10/20/30 ranges (house rules); see ACKS pg. 103 for list of specialized throwing weapons and their ranges. These weapons should also have a dedicated missile attack line-item. For example, 'Spear (Thrown)' for 1d6 damage.
- Check appropriate *melee_is_equipped* or *missile_is_equipped* checkboxes to indicate the character's current weapons configuration. For example, there would be three equipped weapon attacks for a spear; melee:'Spear', melee:'Spear (Two-Handed)', and missile:'Spear (Thrown)'. Neither melee attack would be checked as *melee_is_twohanded*, because a spear is not exclusively a two-handed weapon.
- Finally, note that dual-wielding and/or Weapon FInnesse proficiency is a choice made during a melee strike, not melee configurations per se. These options are captured during each combat roll (Style = Normal|Dual|Finesse). Normal is the default.

---

## Equipment Tab

| Property | Description |
| --- | --- |
| *enc_capacity* | This value is automatically determined as per ACKS Core pg. 48. |
| *encumbrance* | This value is automatically determined as per ACKS Core pg. 48, based on the character's inventory (see below). |
| *move_turn* | This value is automatically determined as per ACKS Core pg. 48. The base movement is assumed to be 120 feet per turn. This value can be modified using the Overview > Conditions > Movement field. |
| *move_round* | *move_turn* divided by 3. |
| equipment | A repeating list of all gear the character possesses. |
| *item_weight* | Set this value equal to 0.17 for small items or bundles (ammo), or use smaller values for items like individual arrows, gems, holy symbols, etc. Include armor and weapons as well, as per ACKS Core pg. 48. |
| *item_value* | An optional field used to track an item's value, in gold pieces. It is not used any place else on the sheet. |
| *item_equipped* | A checkbox to indicate if the item(s) is being carried. If not, its weight is not factored into *encumbrance*. |
| Currency | Fields for tracking coins carried, banked (not carried), and found (and carried) but not yet returned to civilization (worth XP). The table includes a handy conversion rate for each coin type. |
| Cost of Living | Adds the monthly cost of living for the selected *living_standard* and adds any applicable monthly hireling fees. |

### Author's Note Regarding Equipment Assumptions
- I recommend tracking rations by day, instead of by week, with each day's rations weighing 0.17 stone. 
- I also simplify water by inventorying a single water skin, weighing 1 stone. If the characters are *not* in a dungeon, desert, or other locale where water isn't readily available at the end of the day, mark the skin as not equipped and observe penalties for thirst. My equipment script, described below, makes these assumptions. 
- Every 20 rounds of ammo counts as one container, weighing 0.17 stone. For example, a quiver may contain up to 20 arrows (tracked on Combat tab > Missile Attacks) for a fixed weight of 0.17 stone.

---

## Hirelings Tab

| Property | Description |
| --- | --- |
| *hireling_fees* | A caluclated value based on the contents of the following repeating lists. |
| Henchmen | Specify Name, Class, Level, Take (%), and Morale Bonus (if any). Enter additional Notes. *henchman_fee* is auto-set based on *henchman_level*. All other stats for each henchman should be tracked in a seperate NPC character sheet. Use the Morale Check button to check each henchman's morale, as needed. |
| Mercenaries | Specify Type, Quantity, Monthly Fee, and Morale Bonus. Enter additional Notes. *merc_fee* is multiplied by *mer_number* automatically. Use the Morale Check button to check each henchman's morale, as needed. |
| Specialists | Specify Occuptation and Monthly Fee. Enter additional Notes.

---

## Journal Tab
This tab contains text area fields for tracking additional character information, including:

* Background
* Languages spoken
* Injuries sustained (and their effects)
* Property & Debt
* Adventuring Notes
* Experience Gained

My recommendation is to add a new Experience Gained record to the repeating list each time the character returns to civilization and XP is calculated. This should include both monster and treasure XP, as well as any additional XP for decision-making, role-play, etc. Use the Date field to indicate the real date the character received the XP.

---

## Settings
This tab contains base values used in making encumbrance and movement calculations. These values should only be changed when using the sheet to represent non-humanoid NPCs, such as mounts, draft animals, etc.

| Property | Description |
| --- | --- |
| Max Encumbrance | Change to set the maximum limit that the creature can carry. Is modified by *str_mod*. |
| Enc Threshold X | Change to alter the encumbrance threshold at which point max movement rate is divided by 3/4, 1/2, or 1/4. The ACKS humanoid defaults are 5, 7, and 10 stone, respectively. Thresholds should never be descending in value, but can be the same value. The latest value to exceed the current capacity is the threshold that will be used. For example, a mule would use 20, 20, and 40; a 20 encumbrance would only trigger 1/2 movement, never 3/4. |
| Max Movement | Change to set the maximum movement value for the creature. The default is 120' per turn. |

---

## Embedded Class Information
If the following class names are entered into the *class* field, embedded descriptions, stats, saving throws, titles, XP goals, etc., with automagically be populated, based on the character's current level:

- ACKS Core:
    - Assassin
    - Bard
    - Bladedancer
    - Cleric
    - Dwarven Craftpriest
    - Dwarven Vaultguard
    - Elven Nightblade
    - Elven Spellsword
    - Explorer
    - Fighter
    - Mage
    - Thief
- ACKS Player's Companion:
    - Anti-Paladin
    - Barbarian
    - Dwarven Delver
    - Dwarven Fury
    - Dwarven Machinist
    - Elven Courtier
    - Elven Enchanter
    - Elven Ranger
    - Gnomish Trickster
    - Mystic

**Important:** If when an ACKS class listed above is entered into the *class* field, any/all relevant data/values listed above will be immediately *overwritten*. Use cautiously!

---

## Monster Sheets
Four additional, gray-labeled fields are used mainly for creature (non-PC or NPC) character sheets:

### Creature Morale & XP Value
If/when an 'XP Value' is entered on the Overview tab, the sheet will assume the character data represents a monster or other 'non-class' creature, and the following constraints are implemented:

* *attack_throw* is auto-calculated using the creature's *hit_dice* value, instead of class/level.
* *class_damage_bonus* is not auto-calculated based on level
* *character_title* is not set

Use the class and level fields to set the creatures saving throw profile, as necessary.

### Creature Movement
Use the Conditions > Movement field to increase/decrease the creatures base movement, as necessary.

Use these fields to track an additional mode of movement (E.G. 'Fly' & 40).

### Armor Class
The Combat > Armor Class > Bonus field should be used to set a monter's natural AC (or any creature's AC if its armor type is undetermined but the AC is.)

---

## Roll Templates

### 'Custom' Template
The ACKS sheet leverages a custom roll template that supports the following properties:

- *title*: the title to be displayed
- *subtitle*: an optional subtitle to be displayed
- *color*: the default header color is gray, but additional colors may be specified: blakc, brown, blue, gold, green, orange, and red
- *effects*: an optional effects field, used to provide flavor
- *desc*: an optional description field, used to provide details
- *roll* plus *target*: if roll is **less** than target, will indicate *success*; otheriwse, *failure*
- Support for Combat > *roll_surprise* outcomes (see above)
- Any additional parameters via the *allprops* roll template feature

### 'Custom' Template Banners
The roll template supports the use of an image banner in its header. However, to respect artist intellectual property, these are not included in the sheet by default. You will need to supply such banners yourself, if desired. The list of template headers that can be customized can be found at the end of the sheet HTML just before the sheet worker section. Hopefully, the *name* properties (SOMECONTEXT, below) are intuitive.

![Sample Roll Template Banner](images/roll_template.png)

Use the following syntax to embed your own banner header graphics:

> \<input type='hidden' name='attr_banner_SOMECONTEXT' value='\[x](BANNERURL#.png)'/>

If the banners are located in your Roll20 library, you can obtain its *Banner_URL* by dragging it to any Roll20 page, selecting it, and pressing SHFT+Z to display it in the Roll20 image modal view. Then, right click the image and choose *Copy image address*. Replace the *BANNERURL* portion, abover, with the copied URL (keep the '\[x]', the parentheses, and the '#.png').

I recommend that banners be 300px-by-80px and PNG format.

### Other Templates
The sheet uses additional roll templates to provide results when rolling on the Combat > Effects Generators for critical hits (character or monster) as per ACKS HF pg. 85, and the Mortal Wounds table from ACKS Core pg. 106. The ACKS Core Tampering With Mortality table has **not** been included by-design.

---

## Supporting Macros
The following macros can be found in the /macros sub-directory of the git. They are *highly* recommended:

* **actions**: uses the Roll20 [ChatMenu](https://app.roll20.net/forum/post/7474530/script-call-for-testers-universal-chat-menus/?pagenum=1) API script to whisper a list of nearly all sheet buttons into the Roll20 chat. Buttons are organzied by type: Combat Rolls, Attack Throws (only if *melee_wielded* and *missile_wielded* are checked), Skill & Proficiency Throws, Attribute Throws, and Saving Throws. This script saves the players a **lot** of time and is highly recommended. Specify 'Show as Token Action' to apply the macro to every sheet token. Select the token, and then click the macro to use it.
* **repertoire**: also uses ChatMenu API script to output the character's repertoire (*spell_prepared* checkbox = on) to the Roll20 chat as clickable links. This macro should be added to specific character sheets via the Roll20 Attributes & Abilities tab.
* **spellbook**: same as for repertoire, above, but outputs a list of all spells in the character's spell list, regardless of *spell_prepared* status.

---

## Supporting API Scripts
The following scripts can be found in the /scripts directory of the git. They are also *highly* recommended:

* **AddDefaults** : Invoked by selecting one or more tokens on the map and then typing '!AddDefaults' in the Roll20 chat window. This will add 'generic' melee and missile attacks to each selected tokens' character sheet > Combat > Melee/Missile Attacks repeating lists. For example, Punch, Kick, Improvised, etc.

* **AddItems** : Invoked by selecting one or more tokens on the map and then typing '!AddItems CLASSNAME' in the Roll20 chat window. This will add the specified class's generic pack contents (including armor and weapons) to the selected tokens' character sheet > Equipment > Equipment repeating list. It will also create corresponding melee and missile attack entries, similar to !AddDefaults, above. The equipment data includes Wieght, Count, and Value, each marked as Equipped. The character's *encumbrance* and all derived values will be automatically updated after the script runs. **Important:** CLASSNAME is the capitalized class name without any spaces, hyphens, or special characters in between. For example, 'Elven Spellsowrd' should be entered as 'ElvenSpellsword'.

* **AddSkills**: Invoked by selecting one or more tokens on the map and then typing '!AddAbilities' in the Roll20 chat window. This will add common ACKS abilities to each selected tokens' character sheet > Skills > Abilities repeating list. For example, Find Secret Doors, Hear Noise, etc.

### Author's Note
These scripts were derived from the same source found in the Roll20 forums. I did not author this script and do not recall who on the forums did. If anyone knows, please contact me so I can provide the proper credit.

---

## Technical/Design Notes
I came of age with computers in the 1980's. Though I made a career early on with ECMA-262 scripts and web dev, it was an awful, bloody affair. I eventually went into management and promptly gave up staying current with code sometime around 2009. So much has changed in recent years and I'm learning a lot of new stuff (ES6, git, React).

That said, I'm a firm believer in code readability over terseness. In the past, I often couldn't fathon how/why I may have written something the way I did because I endeavored to write my code as terse as possible. However, clarity matters so the sheet worker code for this project is intentionally verbose. I realize there are speed trade-offs, but this being a character sheet, I don't think speed is as important as maintainability and understandability.

Additionally, I believe strongly in function berfore form, especially if/when the deliverable is changing rapidly. Without tools such as React available, its just not worth all the extra effort (IMO) to make things look overly pretty if its going to cause additional work every time a change to the sheet needs to be made. My motto is to honor the whitespace and use good, simple layout (CSS Grid, in this case).

Of course, your preferences may differ.

---

## Built With

* [Roll20](https://roll20.net/)
* [VS Code](https://code.visualstudio.com/)
* [CSS Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)

---

## Contributing

Please contact me directly if you'd like to be a contributor.

---

## Authors

* **omonubi** - *Initial work* - [omonubi.com](https://www.omonubi.com)

---

## License

This project is currently not licensed in the git.

The ACKS intellectual property contained within the character sheet is covered under the [OGL 1.0 License](OGL.md) and used with full permission of Alexander Macris, Autuarch.

---

## Acknowledgments

* Alexander Macris, author of ACKS and owner of Autarch
* GiGs, TheAaron, Kraynic, and everyone else in the [Roll20 Forums](https://app.roll20.net/forum/) that have helped me progress to where I am in sheet development over the years.
* My Friday night ACKS gaming group, who have put up with me for far too long. ;)
