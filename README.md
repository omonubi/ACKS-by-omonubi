# Roll20 Character Sheet for Adventurer Conqueror King System, by Autarch
This is a Roll20 specific character sheet designed for use with the *Adventurer Conqueror King System, Imperial Imprint (ACKS II)* OSR RGP, by Autarch.

## Version 3.3
- This is v3 of the character sheet, for supporting ACKS II.
- With ACKS II in beta, the current rules version refereced is v109.
- Many small changes to this sheet were needed.
- Several optional rules references not specifically included in ACKS II were removed from the sheet. E.G., base healing rate.
- Some changes made to how attacks are executed on the Combat tab.
- The Hirelings tab was overhauled to include loyalty and obedience checks.
- The sheet was styled.
- Sheet layout/tabs were changed for usability
- Class global modifiers was updated to reflect ACKS II class abilities.
- The Overview tab's Saving Throws section was completely overhauled.

## How to Install the Character Sheet
1. In Github, go to Code. Click the Code button and select "Download ZIP". Unzip to your local computer.
2. In Roll 20, click *Create New Game* and select *Custom* from the *Optional: Choose Character Sheet* drop-down menu.
3. Once the game is created, go to *Settings* > *Game Settings*.
4. Under *Character Sheet Template*...
    1. Within the *HTML Layout* tab, paste in the contents of charactersheet.html.
    2. Within the *CSS Styiling* tab, paste in the contents of charactersheet.css. If desired, update the .charsheet { background-image } style with an image URL of your choosing.
    3. Ensure that *Legacy Sanitation* is **NOT** checked.
5. Save your changes and launch the game.

Note that configuration of API scripts and macros is additional work not covered in these instructions. See Roll20 forums for more help.

**This sheet does not yet support translation.**

## How to Use the Character Sheet
1. Generate an ACKS character.
2. On the **Overview** tab, enter the character's basic info and its generated attributes. Save each attribute's Nominal value in the Max column of the Roll20 sheet's Attributes & Abilities tab. Generate the character's hit points and save the value in both Hit Point fields.
3. On the **Class** tab, input any class-specific modifiers and a desired class description.
4. On the **Studious** tab, enter class-specific spell slot and spell description information. (If the character is not a studious spellcaster, this tab can be hidden on the Settings tab.)
5. On the **Prayerful** tab, enter class-specific code of behavior, spell slot, and spell description information. (If the character is not a prayerful spellcaster, this tab can be hidden on the Settings tab.)
6. Enter the appropriate information on the **Combat** tab, based on the character's equipment and other characteristics. Enter the character's melee and missile attack options. Use one line-item for each attack type, combination, and/or damage formula. Check the (equipped) checkboxes to indicate which attacks are available at any given time.
7. On the **Skills** tab, enter the character's selected proficiency information and any additional ability information desired. (Note: Use the **!AddSkills** custom API script to pre-populate common abiltiies and proficiencies - see later in this document.)
8. On the **Equipment** tab, save the character's current equipment. This information is optional for NPCs and monsters.
9. On the **Wealth** tab, save the character's coinage info, monthly budget, and passive investments, if any. This information is optional for NPCs and monsters.
10. Use the **Hirelings** tab to keep track of Henchmen, Mercenaries, and Specialists in the character's employ.
11. Use the **Journal** tab to capture additional information such as background, appearance, languages spoken, injuries, and property. The Adventure Notes can be used by the player to keep track of miscellaneous details. The GM uses the Experience Log to input earned experience after the character completes an expedition.
11. The GM can use the **Settings** tab to customize or modify certain core base traits used in sheet calculations, such as bas movement rate, encumbrance thresholds, and earned XP modifiers.
12. Use the **whisper toggle** to send any Roll20 Chat window output as a whisper to oneself. Otherwise, any such Chat output is viewable by all.

## Sheet Variable Manifest
This section details all fields and controls on the sheet and how they are calculated, used, etc.

- **IMPORTANT:** All buttons on the sheet *require* that a token is selected in order to function. This is to support the use of the Actions macro (which is a highly recommended alternative for players to access their sheet buttons).
- *Why doesn't this sheet support more automation?* - ACKS II is a *sandbox* RPG system. This means that a GM may use an assortment of system-building tools in the ACKS system to create custom classes, monsters, etc. To maintain maximum flexibility in the spirit of this approach, the character sheet *intentionally* doesn't automate many functions, such as level dependent stat progressions (saving throws, attack throws, etc.)
- The term 'character' refers to any player character, NPC, or monster who this sheet is used to represent. When representing monsters, many of the fields described can be safely ignored.
- All field values are optional, unless otherwise specified.
- Attribute variable names shown below do not include the *attr_* portion of the name. The names for roll buttons and repeating sections include the full variable name.
- All *CAPS* text within a *variable_name* indicates a placeholder for that indicated value. E.G., '*some_LVL_variable*' indicates a level number for the *LVL* portion of the variable name.
- Some fields are included to hold "reference values". These are purely informational fields that aren't used any place else on the sheet, and are identified as such, below.
- Some sections of the character sheet employ checkbox toggles ("more...") used to show/hide sections of content or details specific to the item type in question.

---

### The Overview Tab
This tab contains all the general information for the character, including a summary of important key values used during play.

### How to Work with Saving Throws
- The sheet allows the character's saving throw base target and class modifiers to be entered individually, if desired.
- These two values are combined to set each save's throw target.
- The *saver_profile* field can be used to set all the characters base target saving throw values by entering a simple two-digit code, 'XY', where...
    - 'X' is a letter that represets one of the four basic ACKS saving throw progressions:
        - C: Crusader
        - F: Fighter
        - M: Mage
        - T: Thief
    - 'Y' is a number that represents a class level
        - Acceptable values are 0 - 15.
        - Non-monster character's should use their current level.
        - Monsters should use which ever level progression is specified in the ACKS Monstrous Manual
    - Using this feature WILL OVERWRITE ANY PREVIOUS VALUES.
- Modifier field values must be 0 or less.
- Class tab's *class_save_bonus* field can be used to automatically set all the saving throw target modifiers to a single number. THIS WILL OVERWRITE ANY PREVIOUS VALUES.

#### Descriptive Information
| Field | Variable(s) | Type | Description |
| --- | --- | --- | --- |
| Character Name | *character_fullname* | text | Provided to allow for more 'expressive' and complete names than either the standard *character_name* or *token_name* properties. |
| Token Name | *character_name* | text | The name used for both the sheet and the token. |
| Class | *class* | text | The character's class. |
| Gender | *gender* | text | The character's gender. |
| Title | *character_title* | text | The character's title. |
| Height | *height* | text | Ther character's height. |
| Alignment | *alignment* | text | The character's alignment. |
| Weight | *weight* | text | The character's weight. |
| Experience | *xp_bonus* | calculated | A percentage auto-calculated based on the character's prime requisite(s) attribute scores. Can be modified in Settings. Is **not** automatically applied to XP calculations (see Journal tab). |
| Experience | *xp* | calculated | The character's total experience points. Calculated by totalling Experience Log entries on the Journal tab. |
| Experience | *xp_next_level* | text | The amount of experience points needed by the character for next level. |
| Age | *age* | number | The character's current age. |
| Level | *level* | number | The character's current level. The minimum allowed is 0; the maximum is 14. Note: The sheet doesn't limit level based on class. |
| Hit Dice | *hit_dice* | text | The character's hit dice formula.  Validated for proper formatting; if not, the field is cleared and highlighted.  |
| Hit Dice | *roll_hit_dice* | button | Rolls the *hit_dice* formula above in the Roll20 Chat window. Automatically adds *con_mod* per die (level) specified in the formula. |
|||||

#### Atrributes Scores
| Field | Variable(s) | Type | Description |
| --- | --- | --- | --- |
| Attributes, Current | *str*, *int*, *wis*, *dex*, *con*, *chr*  | number | Minimum value for each is 0; maximum is 20. |
| Attributes, Nominal | *VAR_max* | number | Intended to preserve the character's un-modified score for each attribute during play, for reference. Values are set using the sheet's Roll20 Attributes & Abilities tab. |
| Attributes, Mod | *VAR_mod* | calculated | Each attribute's auto-calculated modifier. |
|||||

#### Summary Stats
| Field | Variable(s) | Type | Description |
| --- | --- | --- | --- |
| Hit Points | *hp* | number | The character's current amount of hit points. |
| HP Max | *hp_max* | number | The character's maximum amount of hit points. |from fatigue are automatically applied to sheet stats and rolls. |
| Needs Bedrest | *bedrest* | number | The amount of bedrest (in days) the character currently needs before they can heal. Purely informational. |
| Armor Class | *armor_class* | duplicate | See the Combat tab. |
| Attack Throw | *attack_throw* | duplicate | See the Combat tab. |
| Encumbrance | *encumbrance* | duplicate | See the Equipment tab. |
| Capacity, Max | *enc_capacity* | duplicate | See the Equipment tab. |
| Feet / Turn | *move_turn* | duplicate | See the Equipment tab. |
| Feet / Round | *move_round* | duplicate | See the Equipment tab. |
| Miles / Day | *miles_day* | calculated | *move_turn* / 5. |
| Miles / Hour | *miles_hour* | calculated | *move_turn* / 40. |
| Fatigue Level | *fatigue* | number | The character's current fatigue level. Modifiers
||||| 

#### Saving Throws
| Field | Variable(s) | Type | Description |
| --- | --- | --- | --- |
| (Save Profile) | *save_profile* | string | Optional. A two-digit code (see above). |
| (Saving Throw) | *roll_save_X* | button | Rolls the actual saving throw. 1 = Paralysis, 2 = Death, 3 = Blast, 4 = Implements, and 5 = Spells. |
| Base | *save_X_base* | number | Stores each save's base saving throw target value. Must be between 1 and 20. |
| Modifier | *save_X_mod* | number | Stores a modifer that is applied to the save's saving throw target value. Must be a value of 0 or less. |
| Target | *save_X* | number | The character's final, computed, saving throw target for each save. |
|||||

#### Monster Stats
| Field | Variable(s) | Type | Description |
| --- | --- | --- | --- |
| Alt Move X | *alt_mode_1*, *alt_mode_2*, *alt_mode_3* | text | The character's first, second, and third alternative forms of movement, if any. |
| Feet / Round | *alt_move_1*, *alt_move_2*, *alt_move_3* | text | Paried w. Alt Move X. The speed of the character's alternative form of movement, if any. |
| Morale | *morale* | number | The character's morale score (default is 0). |
| XP Value | *xp_value* | number | The character's value in experience points. |
| Treasure Type | *monster_treasuretype* | text | The character's treasure type, if any. |
| Size | *monster_size* | list | The monster's size. The default is 'medium' (man-sized). |
|||||

---

### The Class Tab
This tab keeps track of class-specific information, such as global modifiers and class description.

#### Global Class Bonuses
| Field | Variable(s) | Type | Description |
| --- | --- | --- | --- |
| Armor Class | *class_ac_bonus* | Number | Applied to all armor class calculations. Intended for tracking a natural armor class modifier. |
| Dmg, Melee | *class_damage_bonus* | number | Applied to all melee weapon damage rolls. |
| Dmg, Missile | *class_damage_bonus_missile* | number | Applied to all missile weapon damage rolls. |
| Hire Loyalty | *class_hireling_loyalty_bonus* | number | Applied to all henchmen and mercenary loyalty checks, as well as the henchmen hiring limit. |
| Initiative | *class_initiative_bonus* | number | Applied to all initiaitve rolls. |
| Saving Throws | *class_save_bonus* | number | Applied to all saving throws (see Overview tab). |
| Surprise | *class_surprise_bonus* | number | Applied to all surprise rolls. |
| Hench Morale | *class_henchmen_morale_bonus* | Applied to all henchmen morale checks. |
|||||

#### Class Proficiencies
| Field | Variable(s) | Type | Description |
| --- | --- | --- | --- |
| Very Light Armor | *class_ap_vlight* | checkbox | Is the class proficient in very light armor? |
| Light Armor | *class_ap_light* | checkbox | Is the class proficient in light armor? |
| Medium Armor | *class_ap_medium* | checkbox | Is the class proficient in medium armor? |
| Heavy Armor | *class_ap_heavy* | checkbox | Is the class proficient in heavy armor? |
|||||
| Single/Missile | (no var) | checkbox | Is the class proficient with single and/or missile weapon fighting style? (Hint: All ACKS classes are.) |
| Dual Weapon | *class_fs_dual* | checkbox | Is the class proficient with the dual weapon fighting style? |
| Two-Handed Weapon | *class_fs_2h* | checkbox | Is the class proficient with the two-handed weapon fighting style? |
| Weapon & Shield | *fs_weapshield* | checkbox | Is the class proficient with the weapon and shield fighting style? |
|||||
| Weapon Proficiencies | *wp* | text | The weapon types that the class is proficient in using. |
| Class Template | *class_template* | text | The ACKS class template (if any) used to initially generate the character. |
|||||

#### Code of Behavior
| Field | Variable(s) | Type | Description |
| --- | --- | --- | --- |
| Code of Behavior | *codeOfBehavior* | text | A text area to explicitly show a divine class's required behavioral restrictions and penalties. This may be hidden using a toggle on the Settings tab.
|||||

#### Class Description
| Field | Variable(s) | Type | Description |
| --- | --- | --- | --- |
| Class Description | *class_abilities* | text | A text area intended for displaying all class-specific details (except tabular data) for the character's class. I.e., copying in an ACKS class description. |

---

### The Studious Tab
This tab is used to track studious spell slots, spell usage, repertoire selection, and spell descriptions. The tab and its content can be hidden by the *hide_studious* setting on the Settings tab.

#### Studious Slots by Spell Level
| Field | Variable(s) | Type | Description |
| --- | --- | --- | --- |
| Spellcasting (Slots) | *studious_LVL_max* | number | The maximum number of spells available, by spell level. Min is 0; max is 6. |
| Spellcasting (Current) | *studious_LVL* | number | The current number of spells the character has remaining, by spell level. Min is 0; max is 6. |
| Caster Level | *caster_level* | number | The character's caster level. Min is 0; max is 14. |
|||||

#### Studios Spells / Invocations
| Field | Variable(s) | Type | Description |
| --- | --- | --- | --- |
|| *repeating_studious_arcane* | repeating | A list of the character's spells, if any. |
| Review | *roll_review_spell* | button | When clicked, whispers the spell's information (below) to the Roll20 Chat window (to the character).
| Cast | *roll_cast_spell* | button | When clicked, exports the spell's information (below) to the Roll20 Chat window. Asks the player to confirm the action. |
| (name) | *spell_name* | text | The name of the spell. |
| Level | *spell_level* | text | The spell's level, intended to be entered as 'A1' or ;D3' to reflect school and level. |
| Prepared | *spell_prepared* | checkbox | Whether the spell is currently prepared or not. Only prepared spells are listed if/when the Action macro is used (see below). |
| more... ||||
| Type | *spell_type* | text | The spell's type. |
| Range | *spell_range* | text | The spell's range description. |
| Duration | *spell_duration* | text | The spell's duration description. |
| Description | *spell_description* | text | The spell's text description. |
|||||

---

### The Prayerful Tab
This tab is used to track prayerful spell slots, spell usage, and spell descriptions. It also provides a prominent display location for the caster's prayerful code of behavior. The tab and its content can be hidden by the *hide_prayerful* setting on the Settings tab.

#### Prayerful Slots by Spell Level
| Field | Variable(s) | Type | Description |
| --- | --- | --- | --- |
| Spellcasting (Slots) | *prayerful_LVL_max* | number | The maximum number of spells available, by spell level. Min is 0; max is 6. |
| Spellcasting (Current) | *prayerful_LVL* | number | The current number of spells the character has remaining, by spell level. Min is 0; max is 6. |
| Caster Level | *caster_level* | number | The character's caster level. Min is 0; max is 14. |
|||||

#### Prayerful Spells / Invocations
| Field | Variable(s) | Type | Description |
| --- | --- | --- | --- |
|| *repeating_prayerful_arcane* | repeating | A list of the character's spells, if any. |
| Review | *roll_review_spell* | button | When clicked, whispers the spell's information (below) to the Roll20 Chat window (to the character).
| Cast | *roll_cast_spell* | button | When clicked, exports the spell's information (below) to the Roll20 Chat window. Asks the player to confirm the action. |
| (name) | *spell_name* | text | The name of the spell. |
| Level | *spell_level* | text | The spell's level, intended to be entered as 'A1' or ;D3' to reflect school and level. |
| more... ||||
| Type | *spell_type* | text | The spell's type. |
| Range | *spell_range* | text | The spell's range description. |
| Duration | *spell_duration* | text | The spell's duration description. |
| Description | *spell_description* | text | The spell's text description. |
|||||

---

### The Combat Tab
This tab contains all combat-specific data, including encounter-related rolls, armor class and attack information, melee attacks, and missile attacks.

### How to Use Melee and Missile Attack Lists
- Use the Melee Attacks list for melee attacks, and the Missile Attacks list for missile  and/or thrown attacks. Do not mix these.
- For each possible attack, attack combination, and/or damage formula, create a separate attack entry. For example, a spear could have up to 5 entries; 4 melee and 1 missile:
    - Melee: "Spear (One-Handed)", 1d6 damage
    - Melee: "Spear (Two-Handed)", 1d8 damage
    - Melee: "Spear (Broken, Tip), -1 bonus, 1d4 damage
    - Melee: "Spear (Broken, Haft), -1 bonus, 1d4 damage
    - Missile: "Spear (Thrown), isThrown, 1d6 damage
- If the character is proficient in the dual wield fighting style, creating entries for each weapon combination likely to be used:
    - "Mace +1 and Sword", +2 bonus, 1d6+1 damage
    - "Sword and Dagger", +1 bonus, 1d6 damage
    - Etc.
- The Melee Attacks > Long checkbox and the Missile Attacks > Range field are optional but provide helpful context for the player.
- Missile Attacks use an advanced Roll20 CRP sheet worker to both make the attack roll and automatically decrement the amount of ammo remaining by 1.
- Note: Use the **!AddActions** custom API script to automagically include common attacks to both Melee and Missile Attack lists. These entires can then be customized as needed for both monsters and characters.

#### Encounter Stats
| Field | Variable(s) | Type | Description |
| --- | --- | --- | --- |
| Initiative | *roll_initiative* | button | When clicked, rolls 1d6 for the character's initiative. Includes modifiers from DEX modifier, class bonus, and temporary (see below) and roll-specific (queried) conditions. |
| Initiative | *mod_initiative* | number | Used to apply a temporary but persistent modifier to initiative rolls. |
| Surprise | *roll_surprise* | button | When clicked, rolls the character's 2d6 surprise check. Includes modifiers from class bonus, heavy helms, and temporary (see below) and roll-specific (queried) conditions. |
| Surprise | *mod_surprise* | number | Used to apply a temporary but persistent modifier to surprise rolls. |
| Reaction | *roll_reaction* | button | When clicked, rolls a 2d6 reaction check to the character. Includes modifiers from CHA modifier, and temporary (see below) and roll-specific (queried) conditions. |
| Reaction | *mod_reaction* | number | Used to apply a temporary but persistent modifier to reaction rolls. |
| Morale | *roll_morale* | button | When clicked, rolls a *whispered* 2d6 morale check for the character to the GM only. Includes the character's morale modifier (if any), and temporary (see below) and roll-specific (queried) conditions. Generally used only for NPCs and monsters. |
| Morale | *mod_morale* | number | Used to apply a temporary but persistent modifier to morale rolls. |
|||||

#### Armor and FSS
| Field | Variable(s) | Type | Description |
| --- | --- | --- | --- |
| Armor | *armor* | list | Used to select a character's currently worn armor. The default is *AC 0 - Clothing Only*. |
| Bonus | *armor_bonus* | number | Used to set an additional armor bonus. For example, penalties from cursed armor or bonuses from magical armor. The default is 0. Note: To set a character's natural AC, use the Class tab > Armor Bonus field. |
| Shield | *has_shield* | checkbox | Indicates whether the character is currently using a shield. |
| Helm | *has_helm* | checkbox | Indicates whether the character is currently wearing a **heavy** helm. |
| Armor Class | *armor_class* | Calculated | The character's current armor class. Calculated as (*armor* AC value) + (*armor* AC modifier) + (1, if shield) + (class AC bonus) + (*dex_mod*).
| Fighting Style Specialization | *fss* | list | The character's current fighting style specialization, if any. Selection is applied to the appropriate sheet roll. |
|||||

#### Attack Information
| Field | Variable(s) | Type | Description |
| --- | --- | --- | --- |
| Attack Throw | *attack_throw* | number | The character's base attack throw. The minimum value is -9; maximum is 12; default is 10. |
| Max Cleaves | *max_cleaves* | number | The character's number of maximum cleaves based on class and level. Other constraints are not include. The minimum value is 0; maximum is 14; default is 0. |
| Number of Attacks | *num_attacks* | text | The character's attack routine, used purely for reference. The default is "*1 (weapon)*".
|||||

#### Melee Attacks
| Field | Variable(s) | Type | Description |
| --- | --- | --- | --- |
|| *repeating_melee_attacks* | repeating | A list of the character's melee attacks. |
| Review | *roll_review_melee* | button | When clicked, outputs details of the attack to the Roll20 Chat window. |
| Attack | *roll_melee_attack* | button | When clicked, makes a 1d20 attack throw for the melee attack. The target value is set to the character's *attack_throw* value - the target's AC (queried). Modifiers to the roll include the character's STR modifier, the attack's melee attack modifier, fatigue, and a roll-specific (queried) modifer. Both natural 1s and 20s are emphasized in the roll results output. Additionally, the attack's damage is rolled as well (see below) and included in the results, whether or not the throw is successful. |
| (equipped) | *melee_equip* | checkbox | When checked, indicates that the attack is currently equipped (if a weapon) and the attack is available. Note that multiple attacks (E.G. a d6 sword attack and a d8 sword attack) may be listed as seperate attacks and equppied simultaneously. This checkbox is used to determine which attacks are displayed on the character's Actions macro (see below). |
| (name) | *melee_name* | text | The name of the melee attack. |
| Dmg | *melee_damage* | text | This is an inline roll formula expressing the attack's damage dice and modifier. E.G., "1d6+1". The field is validated for formatting and highlighted if invalid. | 
| long | *melee_is_long* | checkbox | Indicates if the attack has the *Long* characteristic (has reach). This value is purely for reference. |
| more... ||||
| Damage | *roll_melee_damage* | button | When clicked, rolls the attack's Damage formula (see below). The roll is modified by the character's STR modifier, its class damage bonus (if any), and fatigue effects. The total rolled can never be less than 1. |
| Attk Bonus | *melee_bonus* | number | An attack-specific modifier applied to the weapon's attack throw. E.G., a magical or cursed weapon's modifier. This modifier is **not** applied to the attack's damage roll. |
| dual | *melee_is_dual* | checkbox | If checked, adds +1 to the melee attack roll, as per ACKS dual wield rules. |
| finesse | *melee_is_finesse* | checkbox | If checked, the melee attack will use the character's DEX modifier instead of STR. |
| 2h | *melee_is_2h* | checkbox | Indicates that the melee attack is two-handed. |
| Effects | *melee_effects* | text | An optional field for describing any additional effects related to the attack, such as poison, paralysis, visual description, etc. This is output to the Roll20 Chat when the Attack button is clicked. |
|||||

#### Missile Attacks
| Field | Variable(s) | Type | Description |
| --- | --- | --- | --- |
|| *repeating_missile_attacks* | repeating | A list of the character's missile attacks. |
| Review | *roll_review_missile* | button | When clicked, outputs details of the attack to the Roll20 Chat window. |
| Attack | *roll_missile_attack* | button | When clicked, makes a 1d20 attack throw for the missile attack. The target value is set to the character's *attack_throw* value - the target's AC (queried). Modifiers to the roll include the character's DEX modifier, the attack's missile attack modifier, a range modifier (queried), a class accuracy bonus (if any), fatigue, and a roll-specific (queried) modifer. Both natural 1s and 20s are emphasized in the roll results output. Additionally, the attack's damage is rolled as well (see below) and included in the results, whether or not the throw is successful. |
| (equipped) | *missile_equip* | checkbox | When checked, indicates that the attack is currently equipped (if a weapon) and the attack is available. Note that multiple attacks (E.G. a d6 arrow attack and a d6+1 magic arrow attack) may be listed as seperate attacks and equppied simultaneously. This checkbox is used to determine which attacks are displayed on the character's Actions macro (see below). |
| (name) | *missile_name* | text | The name of the missile attack. |
| Dmg | *missile_damage* | text | This is an inline roll formula expressing the attack's damage dice and modifier. E.G., "1d6+1". The field is validated for formatting and highlighted if invalid. | 
| Rng | *missile_range* | text | Used to describe the missile attack's range bands. E.G, "15/30/45". This is used purely for reference. |
| Ammo | *missile_ammo* | number | Used to track the amount of ammo remaining. The sheet uses a R20 CRP to both roll the attack and reduce the weapon's remaining ammo count automatically. |
| more... ||||
| Damage | *roll_missile_damage* | button | When clicked, rolls the attack's Damage formula (see below). The roll is modified by the character's STR modifier (if Thrown - see below), its class damage bonus (if any), and fatigue effects. The total rolled can never be less than 1. |
| Attk Bonus | *missile_bonus* | number | An attack-specific modifier applied to the weapon's attack throw. E.G., a magical or cursed weapon's modifier. This modifier is **not** applied to the attack's damage roll. |
| Thrown | *missile_has_str_bonus* | checkbox | If checked, applies the character's STR modifier to the attack's damage roll. |
| Effects | *missile_effects* | text | An optional field for describing any additional effects related to the attack, such as poison, paralysis, visual description, etc. This is output to the Roll20 Chat when the Attack button is clicked. |
|||||

---

### The Skills Tab
This tab is used to keep track of proficiencies and derivative / supporting ability information. Many common, starting abilities and proficiencies can be automagically added using the !AddSkills script, detailed later in this document.

### How to Use the Proficiency and Ability Target Fields
- By default the each new Ability and Proficiency item's Target field value is empty.
- If the Target field value is empty and the Throw button is clicked, nothing will happen. This is by design.
- Any Roll20 inline roll formula (including roll queries) can be used to set the Target value of an Ability or Proficiency list item. Use the Variable Manifest, below, to find the names of specific sheet variables. Examples include:
    - 18
    - 18-4[elf]
    - 18-@{str_mod}*4
    - ?{Target|Normal,14|Forest,3}
    - 18+(@{has_helm}[helm]*4)
    - Etc.


#### Proficiencies
| Field | Variable(s) | Type | Description |
| --- | --- | --- | --- |
|| *repeating_skills* | repeating | A list of the character's proficiencies. |
| Review | *roll_review_skill* | button | When clicked, whispers the proficiency's information (below) to the Roll20 Chat window (to the character).
| Throw | *roll_skill_check* | button | When clicked, makes a 1d20 proficiency throw against the Target valie. If no Target is specified, the throw does not occur. Includes modifiers from fatigue and roll-specific (queried) conditions. |
| (name) | *skill_name* | text | The name of the proficiency. |
| Rank | *skill_rank* | number | The character's rank in the proficiency. Minimum value is '0'; maximum is '4'; default is '1'. Rank is automatically factored into the throw Target, if any. |
| Type | *skill_type* | list | The type of proficiency: *Bonus*, *Class*, *Class Power*, or *General*. The default is *General*. *Bonus* is intended for tracking additional proficiencies added via the *ACKS II RR "Gaining Proficiencies by Time and Training"* optional rule. |
| more... ||||
| Target | *skill_target* | text | Empty by default. If present, should be a formula used to set the proficiency's throw target (see below). |
| Description | *skill_details* | text | The proficiency's text description. |
|||||

#### Abilities
| Field | Variable(s) | Type | Description |
| --- | --- | --- | --- |
|| *repeating_abilities* | repeating | A list of the character's non-proficiency abilities. Can be used to add specific proficiency-driven abilities such as *Listen* (Adventuring) or *Diagnose Illness* (Healing), class-specific ability descriptions, or anything else desired. |
| Review | *roll_review_ability* | button | When clicked, whispers the ability's information (below) to the Roll20 Chat window (to the character).
| Throw | *roll_ability_check* | button | When clicked, makes a 1d20 ability throw against the Target value. If no Target is specified, the throw does not occur. Includes modifiers from fatigue and roll-specific (queried) conditions.  |
| (name) | *ability_name* | text | The name of the ability. |
| Source | *ability_source* | text | The source of the ability, for reference purposes. This is usually the name of a proficiency, but doesn't have to be. |
| more... ||||
| Target | *ability_target* | text | Empty by default. If present, should be a formula used to set the ability's throw target (see below). |
| Description | *ability_details* | text | The ability's text description. |
|||||

---

### The Equipment Tab
This tab keeps track of all equipment.

#### Movement & Encumbrance
| Field | Variable(s) | Type | Description |
| --- | --- | --- | --- |
| Max, Capacity | *enc_capacity* | calculated | This is the character's maximum carrying capacity. It is calculated as the *base_enc* (see Settings tab) + the character's STR modifier. |
| Encumbrance | *encumbrance* | calculated | This is the character's current encumbrance total, rounded up. Encumbrance is re-calculated each time an item's Weight or Count is changed, and each time Currency On Hand changes. |
| Feet / Turn | *move_turn* | calculated | This is the character's current movement rate per game turn. It is calculated by comparing the character's current encumbrance against the encumbrance thresholds defined on the Settings tab. By default, these thresholds are set to those for humanoid, man-sized characters, as per ACKS. |
| Feet / Round | *move_round* | calculated | This is the character's current movement rate per game round. It is computed as *move_turn* / 3. |
|||||

#### Equipment
| Field | Variable(s) | Type | Description |
| --- | --- | --- | --- |
|| *repeating_items* | repeating | A list of the character's equipment / inventory, both carried or otherwise. |
| (name) | *item_name* | text | The name of the equipment item. |
| # | *item_count* | number | A count of the number of items included. The minimum value is 0. There is no maximum. The default value is 1. |
| Wt | *item_weight* | number | The item's weight, in stone. The minimum value is 0. There is no maximum. The default weight for all new items in 0.17 (one-sixth of a stone, as per ACKS encumbrance for small items). |
| Value | *item_value* | number | An optional field for tracking the value of the item, for reference only. By default, this field is empty. Typically, used only for tracking the value of valuable and/or exceptional items. |
| Equipped | *item_equipped* | checkbox | If checked, the item's total *item_weight* x *item_count* is included in the character's encumbrance. Otherwise, it is not. The default value is *checked*. |
| more... ||||
| Details | *item_details* | text | An optional text area to add item details, for reference only. |
|||||

---

### The Wealth Tab
This tab keeps track of all coinage, monthly income/expenses, and passive investments made by the character.

### How to Work with Currency
- Each coin weighs 0.001 stone. Use the Banked column to externally store (i.e. not carry) coins. 
- Use the New column to add or remove coins from the On Hand column. The GM should use this feature to add or remove coins to a character, then ask the player to click the Claim button and move it to On Hand.

#### Currency
| Field | Variable(s) | Type | Description |
| --- | --- | --- | --- |
| Currency, On Hand | *platinum*, *gold*, *electrum*, *silver*, *copper* | number | The amount of coins (of each type) being carried. The weight of coins is factored into *encumbrance*. The minimum value is 0. |
| Currency, Banked | *TYPE_bank* | number | The amount of coins (of each type) not carried. The minimum value is 0. |
| Currency, New | *TYPE_found* | number | The balance of coins recently added and/or removed from On Hand. The GM should use this field when adding or deducting coins from the player's account. |
| Claim | *act_sheet_currency* | button | When clicked, adds each *TYPE_found* amount to its On Hand amount and zeros our the New value. Players should use this button to claim changes made to their currentcy pool by the GM. |
|||||

#### Monthly Budget
| Field | Variable(s) | Type | Description |
| --- | --- | --- | --- |
| Living Standard | *living_standard* | list | Contains a list of ACKS living standards. When selected, applies the corresponding monthly cost of living (in gp) to the Monthly Balance, below. The default value is *Adequate*. |
| Hireling Fees | *hireling_fees* | duplicate | See this Hirelings tab. |
| Professional Income | *professional_income* | number | A field for tracking the character's monthly income (gp) from proficiencies, jobs, etc. |
| Monthly Balance | **monthly_balance* | calculated | A total of the character's monthly costs shown above, in gp. A positive number is a negative cashflow and should be deducted from the character's currency every month. |
|||||

#### Passive Investments
| Field | Variable(s) | Type | Description |
| --- | --- | --- | --- |
| **Investments** | *repeating_investments* | repeating | A list of the character's passive investments (via mercantile adventures). |
| Amount | *investment_amount* | number | The amount of gold invested. The minimum value is 0. |
| Type | *investment_type* | list | The type of passive investment. |
| Level of Risk | *investment_risk* | list | The level of risk and matching rate of return. |
| more... ||||
| Details | *investment_details* | text | An optional text area to add investment details, for reference only. |
|||||

---

## Hirelings Tab
This tab keeps track of the character's hirelings and associated fees.

### Summary
| Field | Variable(s) | Type | Description |
| --- | --- | --- | --- |
| Henchmen Limit | *henchmen_limit* | calculated | Auto-calculated as 4 plus the character's CHA modifier. |
| Hireling Fees | *hireling_fees* | calculated | A subtotal of all monthly fees (gp) owed to the character's hired henchmen, mercenaries, and specialists. |

### Henchmen
| Field | Variable(s) | Type | Description |
| --- | --- | --- | --- |
|| *repeating_henchmen* | repeating | Contains a list of the character's henchmen. |
| (name) | *henchman_name* | text | The name of the henchman. |
| (Loyalty Check) | *roll_henchman_loyalty_check* | button | When clicked, makes a 2d6 loyalty check for the henchman, modified by the character's CHA modifier and a roll-specific modifier, if any. |
| Loyalty | *henchman_loyalty* | number | The henchman's base loyalty rating to the character, used to make loyalty checks. Minimum value is -4; maximum is +4, default is 0. |
| (Morale Check) | *roll_henchman_obedience_check* | button | When clicked, makes a 2d6 obedience check for the henchman, modified by any applicable class bonus and a roll-specific modifier, if any. |
| Morale | *henchman_morale* | number | The henchman's base morale rating, used to make obedience chacks. Minimum value is -4; maximum is +4, default is 0. |
| Wage (gp) | *henchman_fee* | calculated | The monthly wage that the character must pay the henchman. Determined based on the henchman level, as per the ACKS henchman wage structure. |
| more... ||||
| Class | *henchman_class* | text | The class name of the henchman. |
| Level | *henchman_level* | number | The class level of the henchman. |
| Notes | *henchman_details* | text | Additional notes about the henchman, typically related to its contract and/or relationship to the character. |

### Mercenaries
| Field | Variable(s) | Type | Description |
| --- | --- | --- | --- |
|| *repeating_mercenaries* | repeating | Contains a list of the character's hired mercenaries (by group). |
| (name) | *merc_name* | text | The name of the mercenary group. |
| Quantity | *merc_number* | number | The number of troops currently within the mercenary group. |
| (Loyalty Check) | *roll_merc_loyalty_check* | button | When clicked, makes a 2d6 loyalty check for the mercenary group, modified by the character's CHA modifier and a roll-specific modifier, if any. |
| Loyalty | *merc_loyalty* | number | The mercenary group's base loyalty rating to the character, used to make loyatly checks.  Minimum value is -4; maximum is +4, default is 0. |
| (Morale Check) | *roll_merc_obedience_check* | button | When clicked, makes a 2d6 morale  check for the mercenary group, modified by any applicable class bonus and a roll-specific modifier, if any. |
| Morale | *merc_morale* | number | The mercenary group's base morale rating, used to make obedience checks. Minimum value is -4; maximum is +4, default is 0. |
| Wage (gp) | *merc_fees* | calculated | The total monthly wages that the character must pay the mercenary group. Calculated as *merc_fee* x *merc_number*. |
| more... ||||
| Type | *merc_type* | text | The mercenary group's type. E.G., *Medium Calvary*. |
| Race | *merc_race* | text | The mercenary group's race. E.G., *Goblin*. |
| Set Wage (gp, per troop) | *merc_fee* | number | The wage per soldier within the mercenary group. Minimum value is 0; default value is 0. |
| Quantity | *merc_number* | number | The number of soldiers currently within the mercenary group. |
| Notes | *merc_details* | text | Additional notes about the mercenary group, such as armor and weapons, history, current health, etc. |

### Specialists
| Field | Variable(s) | Type | Description |
| --- | --- | --- | --- |
|| *repeating_specialists* | repeating | Contains a list of the character's hired specialists. |
| (name) | *spec_name* | text | The name of the specialist. |
| Type | *spec_type* | text | The specialist's type/occupation. |
| (Loyalty Check) | *roll_spec_loyalty_check* | button | When clicked, makes a 2d6 loyalty check for the specialist, modified by the character's CHA modifier and a roll-specific modifier, if any. |
| Loyalty | *spec_loyalty* | number | The specialist's base loyalty rating to the character, used to make loyatly checks.  Minimum value is -4; maximum is +4, default is 0. |
| (Morale Check) | *roll_spec_obedience_check* | button | When clicked, makes a 2d6 morale check for the specialist, modified by any applicable class bonus and a roll-specific modifier, if any. |
| Morale | *spec_morale* | number | The specialist's base morale rating, used to make obedience checks. Minimum value is -4; maximum is +4, default is 0. |
| Wage (gp) | *spec_fee* | duplicate | Same value as Set Wage (gp), below. |
| more... ||||
| Type | *spec_type* | text | The type of the specialist. |
| Set Wage (gp) | *spec_fee* | number | The monthly wage that the character must pay the specialist. Mimimum value is 0; default is 0. |
| Notes | *spec_details* | text | Additional notes about the specialist, typically its description from the ACKS rule book. |

---

## Journal Tab
This tab contains text area fields for tracking additional character information, such as background, appearance, languages, etc. It is also used to log XP and apply prerequisite bonuses to that XP.

### How to Work with Experience Points
- ACKS II uses an "adventure"-based experience points system. While the precious definition of an "adventure" is left to the GM, the XP awards system only gives earned XP to characters once the "adventure" ends and they have returned to "civilization" (i.e., a settlement).
- Use the Experience Log repeating list to award XP at the conclusion of each "adventure".
- The Bonus % is *not* automatically pulled from their current bonus on the Overview tab, since its possible that character injury, aging, attribute score alteration, etc., could change this during the character's lifetime.

### Character Details
| Field | Variable(s) | Type | Description |
| --- | --- | --- | --- |
| Character Background | *background* | text | A desciption of the character's background. Typically used by the player to detail "private" information not published on the character's Roll20 public bio. |
| Appearance | *appearance* | text | A description of the character's appearance. Might contain hidden details not specified on the character's public Roll20 bio. |
| Languages | *languages* | text | A list of languages spoken by the character. |
| Injuries | *injuries* | text | A list of injuries suffered by the character, typically including any modifiers applied to its performance. |
| Property & Debts | *property* | text | A list of property (not shown on the Equipment tab) that the character owns, as well as any outstanding debts to others. |
|||||

### Adventuring Notes
| Field | Variable(s) | Type | Description |
| --- | --- | --- | --- |
|| *repeating_journal* | repeating | A list of notes, managed by the player. |
| Title | *journal_title* | text | A short text description of the note. |
| more... ||||
| Details | *journal_details* | text | The details of the note. |
|||||

### Experience Log
| Field | Variable(s) | Type | Description |
| --- | --- | --- | --- |
|| *repeating_experience* | repeating | A list of all the character's Experience Points, by expedition. |
| Date | *xp_date* | text | The date the XP entry was added to the Experience Log. For reference only. |
| XP | *xp_amount* | number | The amount of XP awarded (without bonuses). |
| Bonus % | *xp_bonus* | number | The percentage of bonus XP awarded, typically from the character's attribute prime requisite bonus. |
| Note | *xp_description* | text | A short description of the entry. Typically, the name of the module and a session reference. E.G., "Buried Temple, 4th Expedition". |
|||||

---

## Settings
This tab contains base values used in some sheet worker calculations; mainly when using the hseet for characters with non-standard movement and encumbrance capabilites (E.G., mounts, dragons, etc.) **These values should only be changed by the GM.**

### Sheet Settings
| Field | Variable(s) | Type | Description |
| --- | --- | --- | --- |
| Save Attributes | *act_save_attrs* | button | When clicked, copies the character's Current attribute values to their Nominal fields. |
| Experience % Modifier | *xp_modifier* | number | Used to change the character's displayed XP bonus from its prime requisite attribute score(s). Typically used if the character has suffered an organic impediment or injury that nagtively impacts its intellectual / reasoning capability. |
| Damage Attribute | *damage_attr* | list | Used to change the attribute modifier applied to all strength-based (the default) damage rolls. For example, a bladedancer's Strength of Faith class power. |
| Roll Attributes | *act_role_PC* | button | When clicked, rolls a set of stats for a PC. 5d6d2, 4d6d1, and 3d6 4 times. These stats are then randomly applied to Overview > Attributes. THIS WILL OVERWRITE ALL ATTRIBUTES. |
| Roll Attributes | *act_role_0th* | button | When clicked, rolls a set of stats for a 0th level character = 3d6 6 times. These stats are then randomly applied to Overview > Attributes. THIS WILL OVERWRITE ALL ATTRIBUTES. |
|||||
| Hide Studious Tab | *toggle_studious* | checkbox | If checked, hides the Studious spellcasting tab. |
| Hide Prayerful Tab | *toggle_studious* | checkbox | If checked, hides the Prayerful spellcasting tab. |
| Hide Code of Behavior | *toggle_code* | checkbox | If checked, hides the Code of Behavior text callout on the Class tab. |
| Enc Alert | *enc_alert_toggle* | checkbox | If enabled, highlights the character's encumbrance value any time it exceeds its *move_alertThresh*. This is to assist players with characters that have encumbrance-based abilities which require travelling light to take advantage of (e.g. tumbling, skirmishing, or a bladedancer's Graceful Fighting class power). |
| Enc Alert Threshold | *move_alertThresh* | number | The encumbrance threshold over which the character's current encumbrance is highlighted on the sheet. The default value is 5. |
|||||
| Enc Thresholds | *move_thresh1*, *move_thresh2*, *move_thresh3* | number | These fields set the encumbrance thresholds that define decreases in the character's maximum movement speed. The default values are those for humanoid characters described in the ACKS rulebook; 5, 7, and 10 stone. These align with movement rate reductions of 1/4, 1/2, and 3/4, respectively. The highest *move_threshX* value to exceed the current capacity is the threshold that will be used. For example, a mule would use 20, 20, and 40; a 20 encumbrance would only trigger 1/2 movement reduction, never 1/4. |
| Max Encumbrance | *base_enc* | number | The character's base maximum encumbrance threshold, which is the point at which the character can no longer move. The default is the humanoid maximum base limit of 20 stone. |
| Max Movement | *base_movement* | number | Change to set the maximum movement value per turn for the character. The default is the humanoid base movement of 120' per turn. |
|||||

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
- Support for Combat > *roll_surprise* outcomes
- Any additional parameters via the *allprops* roll template feature

### 'Custom' Template Banners
The roll template supports the use of an image banner in its header. However, to respect artist intellectual property, those present in the sheet HTML should be replaced with ones of your own. The list of template headers that can be customized can be found at the end of the sheet HTML just before the sheet worker section. Hopefully, the *name* properties (SOMECONTEXT, below) are intuitive.

![Sample Roll Template Banner](images/roll_template.png)

Use the following syntax to embed your own banner header graphics:

> \<input type='hidden' name='attr_banner_SOMECONTEXT' value='\[x](BANNERURL#.png)'/>

If the banners are located in your Roll20 library, you can obtain its *Banner_URL* by dragging it to any Roll20 page, selecting it, and pressing SHFT+Z to display it in the Roll20 image modal view. Then, right click the image and choose *Copy image address*. Replace the *BANNERURL* portion, abover, with the copied URL (keep the '\[x]', the parentheses, and the '#.png').

I recommend that banners be 300px-by-80px and PNG format.

---

## Supporting Macros
The following macros can be found in the /macros sub-directory of the git. They are *highly* recommended:

* **actions**: The macro uses the Roll20 [ChatMenu](https://app.roll20.net/forum/post/7474530/script-call-for-testers-universal-chat-menus/?pagenum=1) API script to whisper a list of nmany sheet buttons into the Roll20 chat. Buttons are organzied by type. Note that melee and missile attacks will only appear in the output if they've been marked as "equipped" This script saves the players a **lot** of time and is highly recommended. Specify 'Show as Token Action' to apply the macro to every sheet token. Select the token, and then click the macro to use it. (The corallary here is that a token **must** be selected for many of the sheet buttons to work, with our without the macro...)

* **conditions**: This macro uses the Roll20 [TokenMod](https://wiki.roll20.net/Script:Token_Mod) API add-on to apply/remove ACKS condition token icons with a click of a button. Note that my version relies on additional custom icons that I created and imported into the game (see the \images folder for a PNG of these), but the script can be modified to use only the stock icons, as desired.

* **roll macros**: These are simple macros that allow the players and the GM to send custom, formatted dice rolls to the Roll20 Chat. They prompt for a Reason for the roll or throw, the Roll 20 dice formula to be rolled, an optional Modifier, and an optional Target value. The rollWhisper macro allows the GM to whisper themself (by default), or a specific party member. Intended to be used to track why misc. non-sheet dice rolls are being made in the Roll20 chat window.

* **morale**: This macro uses the Roll20 [TokenMod](https://wiki.roll20.net/Script:Token_Mod) API add-on to apply/remove ACKS reaction and morale token icons with a click of a button. Note that my version relies on additional custom icons that I created and imported into the game (see the \images folder for a PNG of these).

* **newToken**: The macro uses the Roll20 [TokenMod](https://wiki.roll20.net/Script:Token_Mod) to pre-configure a new token that's already bound to a character sheet. This is intended for use when creating a new, standardized "master token" that will be bound to a character sheet. (Make sure game-wide token settings are already configured before use.) The current macro sets the token size to 85% of 1 unit (usually 70 px, a man-sized ACKS character), and binds the three bar fields to *hp* (and *hp_max*), *move_round*, and *armor_class*. This can be further customized as needed.

* **newMonster**: This macro is intended to be applied **at game time** to a monster token. This will use [TokenMod](https://wiki.roll20.net/Script:Token_Mod) to randomize the token's *hp*=*hp_max* to the bound character sheet's *hit_dice* value, add 60' nightvision to the token, and append a random 3-digit number to the token's name. As with initToken, this can be further customized, as desired. **Important:** For proper results, this macro must be applied to **each** instantiated monster token individually. IMPORTANT: Generic monster sheets should **not** have their *hp* bound to *bar1* when applying this macro.

* **repertoire**: This macro uses [ChatMenu](https://app.roll20.net/forum/post/7474530/script-call-for-testers-universal-chat-menus/?pagenum=1) API script to output the character's repertoire (*spell_prepared* checkbox = on) to the Roll20 chat as clickable links. Links are provided to review each spell as well as cast. This macro should be added to specific character sheets via the Roll20 Attributes & Abilities tab.

* **rollInit**: This macro uses [GroupInitiative](https://wiki.roll20.net/Script:Group_Initiative) API script to roll ACKS initiative for all selected tokens on the current Roll20 page. Takes into consideration modifiers from the character's dexterity attribute, any class modifier, and any additional modifer entered on the Combat tab. Requires additional configuration detailed in the .txt file.

* **spellbook**: This macro is similar to *repertoire*, above, but outputs a list of all spells in the character's spell list, regardless of *spell_prepared* status. This macro should be added to specific character sheets via the Roll20 Attributes & Abilities tab.

---

## Supporting API Scripts
The following scripts can be found in the /scripts directory of the git. They are also *highly* recommended:

* **AddActions** : Invoked by selecting one or more tokens on the map and then typing '!AddActions' in the Roll20 chat window. This will add 'generic' melee and missile attacks to each selected tokens' character sheet > Combat > Melee/Missile Attacks repeating lists. For example, Punch, Kick, Improvised, etc.

* **AddSkills**: Invoked by selecting one or more tokens on the map and then typing '!AddSkills' in the Roll20 chat window. This will add common ACKS abilities to each selected tokens' character sheet > Skills > Abilities repeating list. For example, Find Secret Doors, Hear Noise, etc.

### Author's Note
These scripts were derived from the Roll20 forums. I did not author this script and do not recall who on the forums did. If anyone knows, please contact me so I can provide the proper credit.

---

## Built With

* [Roll20](https://roll20.net/)
* [VS Code](https://code.visualstudio.com/)
* [CSS Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)

---

## Authors

* **omonubi** - *Initial work and all updates to-date.* - [omonubi.com](https://www.omonubi.com)

---

## License

This project is currently not licensed in the git.

The ACKS intellectual property contained within the character sheet is covered under the ACKS SRD/OGL and used with full permission of Alexander Macris, Autuarch.

---

## Acknowledgments

* Alexander Macris, author of ACKS and owner of Autarch
* GiGs, TheAaron, Kraynic, and everyone else in the [Roll20 Forums](https://app.roll20.net/forum/) that have helped me progress to where I am in sheet development over the years.
* My Wednesday night ACKS gaming group, who have put up with me for far too long. ;)
