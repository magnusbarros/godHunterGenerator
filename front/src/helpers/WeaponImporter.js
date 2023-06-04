let test = `Divine Bound Steed
Restrict : Contractor
Mode     : Two Hands
ACC      : None
PD       : +7
INIT     : +3
Cost     : 4,000G
[Range: Charge 6 Sq. / Target: 1#]. A high level bound steed summoned due to a special contract. This being is akin to a god. While [Equipped], the user is able to make [Ranged Attacks] and [Magical Attacks] after [Combat Moves]. Also, once per combat, make 1x [Weapon Attack] after [Damage Calculation].`

let test2 = `Wrecking Ball
Restrict : Martial・Utility
Mode     : Switch Hand
IVC      : None
MD       : +5 / +6
INIT     : -3 / -2
Cost     : 700G
[Form: Hammer / Range: Engaged / Target: 1#]. An Artificial Regalia that combines an iron ball with a chain.
While [Equipped], after spending x1 [Timing: Prep], the user may change an [Attack Action] into a [Ranged Attack], changing the [Range/Target] to [5 Sq./1#].`

let all = [
    `Defensive Sword
Restrict : None
Mode     : One Hand
ACC      : None
PD       : +2
INIT     : -1
Cost     : 500G
[Form: Sword / Range: Engaged / Target: 1#]. A short sword Artificial Regalia adapted for defense. While [Equipped], +2 to [Armor].
 `,
    `Killing Dagger
Restrict : None
Mode     : One Hand
ACC      : None
PD       : +4
INIT     : -3
Cost     : 500G
[Form: Sword / Range: Engaged / Target: 1#]. A unique dagger Artificial Regalia with a sinister-looking blade. While [Equipped], gain +10 to [Physical Damage] dealt against Mononoke with "x#" in their [Name].
 `,
    `Small Sword
Restrict : None
Mode     : Switch Hand
ACC      : None
PD       : +3 / +4
INIT     : -1 / None
Cost     : 1,000G
[Form: Sword / Range: Engaged / Target: 1#]. A thrusting blade or saber-type Artificial Regalia. While [Equipped], the [Target] of the user's [Physical Attack] reduces their [Armor] by 5 (to a minimum of 0).
 `,
    `Goumaken
Restrict : Martial
Mode     : Switch Hand
ACC      : None
PD       : +6 / +7
INIT     : -4 / -3
Cost     : 1,000G
[Form: Sword / Range: Engaged / Target: 1#]. A long, sharp switch hand sword-type Artificial Regalia. While [Equipped], once per combat, when making a [Physical Attack], gain +1 [Physical Rank].
 `,
    `Creation Blade
Restrict : Elemental Adept
Mode     : Two Hands
ACC      : None
PD       : +7
INIT     : -4
Cost     : 1,500G
[Form: Sword / Range: Engaged / Target: 1#]. An odachi Artificial Regalia with a transparent blade. While [Equipped], when bestowed with an [Element] due to the effect of a Talent, gain +3 at [Damage Calculation].
 `,
    `Giant Sword
Restrict : Martial
Mode     : Two Hands
ACC      : None
PD       : +9
INIT     : -6
Cost     : 1,500G
[Form: Sword / Range: Engaged / Target: 1#]. A massive two-handed sword Artificial Regalia like a mass of iron. While [Equipped], once per combat, gain +5 [Armor].
 `,
    `Ancient Sword
Restrict : Martial
Mode     : Two Hands
ACC      : +1
PD       : +7
INIT     : None
Cost     : 3,000G
[Form: Sword / Range: Engaged / Target: 1#]. A long sword or odachi-type Artificial Regalia once possessed by a legendary knight or samurai. While [Equipped], once per combat, make 1x [Weapon Attack] after [Damage Calculation].
 `,
    `Zantetsu
Restrict : Arc Slayer
Mode     : Two Hands
ACC      : None
PD       : +9
INIT     : None
Cost     : 3000G
[Form: Sword / Range: Engaged / Target: 1#]. An odachi Artificial Regalia that displays incredible cleaving power. While [Equipped], wielder may destroy any [Obstacle] they deal at least 1 point of [Physical Damage] to.
`,
    `Dokkosho
    Restrict : None
    Mode     : One Hand
    ACC      : None
    PD       : +2
    INIT     : -2
    Cost     : 300G
    [Form: Spear / Range: Engaged / Target: 1#]. A spear Artificial Regalia in the shape of a Buddhist tool. While [Equipped], when making [Attack Actions] against [Class: Chaos], gain +1 [Rank].
     `,
    `Strengthened Sai
    Restrict : None
    Mode     : One Hand
    ACC      : None
    PD       : +3
    INIT     : -3
    Cost     : 300G
    [Form: Spear / Range: Engaged / Target: 1#]. A sai-type Artificial Regalia. While [Equipped], [Targets] of the user's [Physical Attacks] reduce their [Armor] by 3 (to a minimum of 0).
     `,
    `Mancatcher Fork
    Restrict : None
    Mode     : Switch Hand
    ACC      : None
    PD       : +3 / +4
    INIT     : -5 / -4
    Cost     : 800G
    [Form: Spear / Range: Engaged / Target: 1#]. A spear-type Artificial Regalia with a crescent moon shape at its tip. While [Equipped], increase the [Range] of the user's [Physical Attacks] by 1 Sq. ([Engaged] becomes 2 Sq., [Charge 2 Sq.] becomes [Charge 3 Sq.], etc).
     `,
    `Zanbaken
    Restrict : Martial
    Mode     : Switch Hand
    ACC      : None
    PD       : +4 / +5
    INIT     : -2 / -1
    Cost     : 800G
    [Form: Spear / Range: Engaged / Target: 1#]. An Artificial Regalia with a long and wide blade. While [Equipped], once per combat, when making a [Physical Attack], gain +1 [Physical Rank].
     `,
    `Long-Haft Weapon
    Restrict : Martial
    Mode     : Two Hands
    ACC      : +1
    PD       : +3
    INIT     : -2
    Cost     : 1,200G
    [Form: Spear / Range: Engaged / Target: 1#]. A long-handled weapon Artificial Regalia, which can be installed with a variety of functions. While [Equipped], gain +5 [Armor].
     `,
    `Double Hooked Spear
    Restrict : Martial・Utility
    Mode     : Two Hands
    ACC      : +1
    PD       : +4
    INIT     : -3
    Cost     : 1,200G
    [Form: Spear / Range: Engaged / Target: 1#]. A spear-type Artificial Regalia where the spearhead is a cross-shaped blade. While [Equipped], once per round, the [Target] of the user's [Physical Attack] reduces the result of their {Evasion} check by 2.
     `,
    `Glaive
    Restrict : None
    Mode     : Two Hands
    ACC      : +1
    PD       : +6
    INIT     : -1
    Cost     : 2,800G
    [Form: Spear / Range: Engaged / Target: 1#]. An Artificial Regalia topped with a wide blade. While [Equipped], increase the [Target] of the user's [Physical Attacks] by +1#.
     `,
    `Goumasou
    Restrict : Martial
    Mode     : Two Hands
    ACC      : +1
    PD       : +7
    INIT     : -2
    Cost     : 2,800G
    [Form: Spear / Range: Engaged / Target: 1#]. A masterwork heavy and sturdy spear that has been Artificial Regaliaized. While [Equipped], increase the [Range] of the user's [Physical Attacks] by 2 Sq ([Engaged] becomes 3 Sq., [Charge 2 Sq.] becomes [Charge 4 Sq.]).
`,
    `Sickle
Restrict : None
Mode     : One Hand
ACC      : None
PD       : +3
INIT     : -2
Cost     : 600G
[Form: Axe / Range: Engaged / Target: 1#]. A one-handed scythe-type Artificial Regalia. While [Equipped], once per round, gain +1 modifier to result of {Accuracy} checks.
 `,
    `Nata
Restrict : None
Mode     : One Hand
ACC      : None
PD       : +4
INIT     : -3
Cost     : 600G
[Form: Axe / Range: Engaged / Target: 1#]. A nata-type Artificial Regalia. While [Equipped], once per combat, while making a [Physical Attack], gain +1 [Physical Rank].
 `,
    `Machete
Restrict : None
Mode     : Switch Hand
ACC      : -1
PD       : +5 / +6
INIT     : -2 / -1
Cost     : 1,200G
[Form: Axe / Range: Engaged / Target: 1#]. A type of Artificial Regalia patterned after a forestry knife. While [Equipped], increase the [Range] of the user's [Physical Attacks] by 1 Sq. ([Engaged] becomes 2 Sq., [Charge 2 Sq.] becomes [Charge 3 Sq.])
 `,
    `Harpe
Restrict : None
Mode     : Switch Hand
ACC      : -1
PD       : +6 / +7
INIT     : -3 / -2
Cost     : 1,200G
[Form: Axe / Range: Engaged / Target: 1#]. An Artificial Regalia that combines a sword and a sickle. While [Equipped], once per round, the [Target] of the user's [Physical Attack] reduces the result of their {Evasion} check by 1.
 `,
    `Spirit Buzzsaw
Restrict : Martial
Mode     : Two Hands
ACC      : None
PD       : +6
INIT     : -5
Cost     : 1,800G
[Form: Axe / Range: Engaged / Target: 1#]. A buzzsaw-type Artificial Regalia that is powered by spirit energy. While [Equipped], the [Target] of the user's [Physical Attack] reduces their [Armor] by 3 (to a minimum of 0).
 `,
    `Chainsaw
Restrict : Martial
Mode     : Two Hands
ACC      : -1
PD       : +7
INIT     : -4
Cost     : 1,800G
[Form: Axe / Range: Engaged / Target: 1#]. A chainsaw-type Artificial Regalia. While [Equipped], once per combat, the [Target] of the user's [Physical Attack] [Halves] their [Armor].
 `,
    `Banishing Chainsaw
Restrict : Martial
Mode     : Two Hands
ACC      : None
PD       : +11
INIT     : -2
Cost     : 3,800G
[Form: Axe / Range: Engaged / Target: 1#]. A chainsaw-type Artificial Regalia with a pure white blade that holds the power to slay evil. While [Equipped], once per combat, the [Target] of the user's [Physical Attack] [Halves] their [Armor].
 `,
    `Battle Axe
Restrict : Martial
Mode     : Two Hands
ACC      : None
PD       : +13
INIT     : -3
Cost     : 5,500G
[Form: Axe / Range: Engaged / Target: 1#]. A huge axe Artificial Regalia, designed for combat. While [Equipped], gain +2 to [Armor] and [Barrier].
`,
    `Chain
Restrict : None
Mode     : One Hand
ACC      : None
PD       : +2
INIT     : -1
Cost     : 400G
[Form: Hammer / Range: Engaged / Target: 1#]. A length of chain that is an Artificial Regalia.
While [Equipped], after spending x1 [Timing: Prep], the user may change an [Attack Action] into a [Ranged Attack], changing its [Range/Target] to [6 Sq./1#].
 `,
    `Knuckle Duster
Restrict : None
Mode     : One Hand
ACC      : None
PD       : +3
INIT     : -2
Cost     : 400G
[Form: Hammer / Range: Engaged / Target: 1#]. A set of metal rings made into an Artificial Regalia, worn on the hand and strengthened for striking. While [Equipped], treat as though [Equipped] with [Unarmed].
 `,
    `Nunchaku
Restrict : Martial・Utility
Mode     : Switch Hand
ACC      : None
PD       : +2 / +3
INIT     : None / +1
Cost     : 700G
[Form: Hammer / Range: Engaged / Target: 1#]. An Artificial Regalia that appears as metal rods joined by a length of chain. While [Equipped], increase the [Target] of the user's [Physical Attack] by 1#. Also, treat as though [Equipped] with [Unarmed].
 `,
    `Wrecking Ball
Restrict : Martial・Utility
Mode     : Switch Hand
ACC      : None
PD       : +5 / +6
INIT     : -3 / -2
Cost     : 700G
[Form: Hammer / Range: Engaged / Target: 1#]. An Artificial Regalia that combines an iron ball with a chain.
While [Equipped], after spending x1 [Timing: Prep], the user may change an [Attack Action] into a [Ranged Attack], changing the [Range/Target] to [5 Sq./1#].
 `,
    `Spirit Baton
Restrict : Martial・Utility
Mode     : Two Hands
ACC      : None
PD       : +6
INIT     : -5
Cost     : 1,300G
[Form: Hammer / Range: Engaged / Target: 1#]. A large extendable baton Artificial Regalia with a sharpened tip. When charged with spirit energy, it glows. While [Equipped], the [Target] of the user's [Physical Attack] reduces their [Armor] by 5 (to a minimum of 0).
 `,
    `Battle Hammer
Restrict : Martial
Mode     : Two Hands
ACC      : None
PD       : +8
INIT     : -7
Cost     : 1,300G
[Form: Hammer / Range: Engaged / Target: 1#]. A hammer Artificial Regalia designed for combat, with a huge hammerhead. While [Equipped], once per combat, make 1x [Weapon Attack] against [Range: Engaged / Target: 1#] that performed [Damage Calculation].
 `,
    `Arm Guard
Restrict : Martial
Mode     : Two Hands
ACC      : +1
PD       : +7
INIT     : -3
Cost     : 3,400G
[Form: Hammer / Range: Engaged / Target: 1#]. An Artificial Regalia that, when equipped to both arms and legs, aids with both offense and defense. While [Equipped], treat as though [Equipped] with [Unarmed], and gain +2 [Armor].
 `,
    `Improvised Weapon
Restrict : God Hand
Mode     : Two Hands
ACC      : None
PD       : +8
INIT     : -2
Cost     : Unsellable
[Form: Hammer / Range: Engaged / Target: 1#]. An improvised Artificial Regalia like an electric pole or road sign infused with spirit energy made using «Spirit Armament».
While [Equipped], treat as though [Unarmed]. This [Weapon] cannot have the [Arms System] applied to it, and is lost when [Combat Ends].
`,
    `※Enhanced Handgun
Restrict : None
Mode     : One Hand
ACC      : None
PD       : (3)
INIT     : -2
Cost     : 500G
[Range: 6 Sq. / Target: 1#]. A handgun-style Artificial Regalia that has unique modifications installed, allowing it to bestow bullets with spirit energy. While [Equipped], once per combat, when making a [Physical Attack], gain +1 [Rank].
 `,
    `Bound Steed
Restrict : Contractor
Mode     : Two Hands
ACC      : -1
PD       : +5
INIT     : -3
Cost     : 1,000G
[Range: Charge 4 Sq. / Target: 1#]. A bound steed that formed a contract and was summoned. It can have a variety of appearances. While [Equipped], the user is able to make [Ranged Attacks] and [Magical Attacks] after [Combat Moves].
 `,
    `Enhanced Bound Steed
Restrict : Contractor
Mode     : Two Hands
ACC      : None
PD       : +6
INIT     : -5
Cost     : 1,500G
[Range: Charge 5 Sq. / Target: 1#]. A bound steed that was summoned due to an even stronger contract. While [Equipped], the user is able to make [Ranged Attacks] and [Magical Attacks] after [Combat Moves]. Also, once per round, the [Target] of the user's [Physical Attack] reduce their {Evasion} check by 1.
 `,
    `Hunting Bow
Restrict : Dark Hunter
Mode     : Two Hands
ACC      : +1
PD       : +4
INIT     : -5
Cost     : 1,500G
[Range: 10 Sq. / Target: 1#]. A long bow Artificial Regalia designed for power. While [Equipped], by spending 1x [Start] and 1x [Prep], for the rest of that round, when making [Attack Actions], gain +1 [Rank].
 `,
    `Spirit Assassin Tools
Restrict : Martial
Mode     : Two Hands
ACC      : None
PD       : +4
INIT     : -2
Cost     : 2,000G
[Range: {Strength} Sq. / Target: 1#]. Assassin tool Artificial Regalia that come in a variety of forms. While [Equipped], treat as though [Equipped] with [Unarmed]. Also, when this [Weapon] is thrown, it does not become unavailable.
 `,
    `Elite Bound Steed
Restrict : Contractor
Mode     : Two Hands
ACC      : None
PD       : +7
INIT     : -4
Cost     : 2,500G
[Range: Charge 5 Sq. / Target: 1#]. A special bound steed summoned through a high level contract. While [Equipped], the user is able to make [Ranged Attacks] and [Magical Attacks] after [Combat Moves]. Also, gain +10 to [Physical Damage] dealt to Mononoke with "x#" written in their [Name].
 `,
    `Dragon Drive
Restrict : Martial・Utility
Mode     : Two Hands
ACC      : None
PD       : +6
INIT     : +4
Cost     : 4,000G
[Range: Charge 6 Sq. / Target: 1#]. A special combat motorcycle for anti-divinity combat, under development by B.E.G. and Far East Heavy Industries. While [Equipped], the user is able to make [Ranged Attacks] and [Magical Attacks] after [Combat Moves].
 `,
    `Divine Bound Steed
Restrict : Contractor
Mode     : Two Hands
ACC      : None
PD       : +7
INIT     : +3
Cost     : 4,000G
[Range: Charge 6 Sq. / Target: 1#]. A high level bound steed summoned due to a special contract. This being is akin to a god. While [Equipped], the user is able to make [Ranged Attacks] and [Magical Attacks] after [Combat Moves]. Also, once per combat, make 1x [Weapon Attack] after [Damage Calculation].
`,
    `Spell Tags
Restrict : Elder Mage
Mode     : One Hand
CNJ      : None
MD       : +3
INIT     : -2
Cost     : 1,000G
[Magical Attack / Range: 6 Sq. / Target: 1# / Resist: Cancel / Element: None / Rank: 1]. A bundle of tags with spells written on them. Pull a couple off and throw them. While [Equipped], once per combat, increase the [Target] of the user's [Magical Attacks] by 1#.
 `,
    `Spirit Instrument
Restrict : Divine Talker
Mode     : Switch Hand
CNJ      : None
MD       : +4 / +5
INIT     : -2 / -1
Cost     : 1,500G
[Magical Attack / Range: 6 Sq. / Target: 1# / Resist: Cancel / Element: Wind / Rank: 2]. A musical instrument Artificial Regalia that enhances the power of kotodama, the soul of words. While [Equipped], once per combat, change one [Spirit] die to "3".
 `,
    `Unique Bound Steed
Restrict : Contractor
Mode     : Two Hands
CNJ      : None
MD       : +4
INIT     : -2
Cost     : 1,500G
[Magical Attack / Range: Charge 4 Sq. / Target: 1# / Resist: Cancel / Element: None / Rank: 2]. A unique bound steed, its whole body wreathed in spirit energy. While [Equipped], the user is able to make [Ranged Attacks] and [Magical Attacks] after [Combat Moves].
 `,
    `Magic Gun
Restrict : Contractor
Mode     : Switch Hand
CNJ      : None
MD       : +4 / +5
INIT     : -3 / -2
Cost     : 2,000G
[Magical Attack / Range: 7 Sq. / Target: 1# / Resist: Cancel / Element: None / Rank: 2]. A handgun-type Artificial Regalia that fires spirit energy. By shooting their own spirit energy out, it excites spirit circulation, aiding magecraft and summoning. While [Equipped], [Bound Primals] gain a +1d6 modifier to the [Damage Calculation] of their [Attack Actions].
 `,
    `Advanced Spell Tags
Restrict : Arcane
Mode     : Two Hands
CNJ      : None
MD       : +5
INIT     : -3
Cost     : 2,000G
[Magical Attack / Range: 7 Sq. / Target: 1# / Resist: Cancel / Element: None / Rank: 2]. A bundle of tags inscribed with advanced spells. Pull a couple off and throw them. While [Equipped], once per combat, increase the [Target] of the user's [Magical Attacks] by 1#.
 `,
    `Kotodama Bow
Restrict : Divine Talker
Mode     : Two Hands
CNJ      : None
MD       : +5
INIT     : -2
Cost     : 2,000G
[Magical Attack / Range: 7 Sq. / Target: 1# / Resist: Cancel / Element: Light / Rank: 2]. A catalpa bow Artificial Regalia specialized in exorcism. While [Equipped], the user gains +5 to the [Recovery] effect from [Magical Attacks].
 `,
    `Summoning Smartgun
Restrict : Contractor
Mode     : Two Hands
CNJ      : None
MD       : +6
INIT     : -2
Cost     : 3,000G
[Magical Attack / Range: 10 Sq. / Target: 1# / Resist: Cancel / Element: Shock / Rank: 2]. A spirit gun equipped with cyber functions. While [Equipped], treat as though [Equipped] with a [Restrict: Digital Sorcerer] [Item], and [Bound Primals] gain a +1d6 modifier to the [Damage Calculation] of their [Attack Actions].
 `,
    `Rare Bound Steed
Restrict : Contractor
Mode     : Two Hands
CNJ      : None
MD       : +7
INIT     : -3
Cost     : 3,000G
[Magical Attack / Range: Charge 5 Sq. / Target: 1# / Resist: Cancel / Element: None / Rank: 2]. A rare bound steed, its entire body spirit energy. While [Equipped], the user is able to make [Ranged Attacks] and [Magical Attacks] after [Combat Moves]. Also, once per combat, the [Target] of the user's [Magical Attack] [Halves] their [Barrier].
`]
const importWeapon = (data, source) => {

    let item = {
        id: "",
        name: "",
        restrict: "",
        mode: "",
        bonus: {
            acc: 0,
            ivc: 0,
            pd: 0,
            pd2: 0,
            md: 0,
            md2: 0,
            init: 0,
            init2: 0
        },
        cost: "",
        effect: "",
        attributes: {
            form: "",
            range: "",
            target: "",
            resist: "",
            element: "",
            rank: ""
        },
        type: 0,
        icon: {
            x: 0,
            y: 0
        },
        source: source
    }

    function uuidv4() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }

    function getInfo(itemData, replace) {
        let newUse = itemData.replace(replace, "").split("").reverse();
        let parsedUse = ""
        let useCount = newUse.length - 1;
        while (newUse[useCount] === " " || newUse[useCount] === ":") {
            newUse.pop()
            useCount--;
        }
        parsedUse = newUse.reverse().join("");
        return parsedUse
    }

    let itemData = data.split("\n");

    item.effect = getInfo(itemData[7], "");

    let effects = item.effect.substring(
        item.effect.indexOf("[") + 1, item.effect.indexOf("]")
    )

    item.effect = item.effect.substring(item.effect.indexOf("]") + 2)

    let attributes = {
        form: "",
        range: "",
        target: "",
        resist: "",
        element: "",
        rank: ""
    }

    effects.split("/").forEach(effect => {
        let eff = effect.split(":");
        if (eff[0].replaceAll(" ", "") === "MagicalAttack") {
            eff = ["Form"
                , "Magic"];
        } else {
            eff = [eff[0].replaceAll(" ", "")
                , eff[1].replaceAll(" ", "")];
        }

        switch (eff[0]) {
            case "Form":
                attributes.form = eff[1];
                break;
            case "Range":
                attributes.range = eff[1].replace("Charge", "Charge ");
                break;
            case "Target":
                attributes.target = eff[1];
                break;
            case "Resist":
                attributes.resist = eff[1];
                break;
            case "Element":
                attributes.element =
                    eff[1]
                        .replace("Light", "Radiant")
                        .replace("Frost", "Frost")
                        .replace("Fire", "Flame")
                        .replace("Shock", "Shock")
                        .replace("Force", "Force")
                        .replace("Wind", "Wind")
                        .replace("Blight", "Blight")
                        .replace("Mind", "Psychic");
                break;
            case "Rank":
                attributes.rank = eff[1];
                break;
            default:
                break;
        }
    });

    if (attributes.form === "") {
        attributes.form = "Ranged";
        /*On the Pastebin expansions, Range form weapons do not have their forms on their texts.*/
    }

    switch (attributes.form) {
        case "Sword":
            item.icon.x = 96;
            item.icon.y = 992;
            break;
        case "Spear":
            item.icon.x = 96;
            item.icon.y = 672;
            break;
        case "Axe":
            item.icon.x = 96;
            item.icon.y = 928;
            break;
        case "Hammer":
            item.icon.x = 480;
            item.icon.y = 2976;
            break;
        case "Ranged":
            item.icon.x = 96;
            item.icon.y = 832;
            break;
        case "Magic":
            item.icon.x = 512;
            item.icon.y = 864;
            break;
        default:
            /*Uses the sword icon if the weapon form is not found*/
            item.icon.x = 96;
            item.icon.y = 992;
            break;
    }

    item.attributes = attributes;

    item.id = uuidv4();
    item.name = itemData[0];
    item.restrict = getInfo(itemData[1], "Restrict");
    item.mode = getInfo(itemData[2], "Mode");
    /*
        weapon types (item.type)
        1 - pd
        2 - pd switch
        3 - md
        4 - md switch
    */

    let isMagic = attributes.form === "Magic";
    let isSwitch = item.mode.toLowerCase().includes("switch");

    if (isMagic) {
        item.bonus.ivc = isNaN(getInfo(itemData[3], "IVC")) ? 0 : parseInt(getInfo(itemData[3], "IVC"));
        if (isSwitch) {
            let md = getInfo(itemData[4], "MD").split("/");
            item.bonus.md = isNaN(md[0]) ? 0 : parseInt(md[0]);
            item.bonus.md2 = isNaN(md[1]) ? 0 : parseInt(md[1]);
            item.type = 4;
        } else {
            item.bonus.md = isNaN(getInfo(itemData[4], "MD")) ? 0 : parseInt(getInfo(itemData[4], "MD"));
            item.type = 3;
        }
    } else {
        item.bonus.acc = isNaN(getInfo(itemData[3], "ACC")) ? 0 : parseInt(getInfo(itemData[3], "ACC"));
        if (isSwitch) {
            let pd = getInfo(itemData[4], "PD").split("/");
            item.bonus.pd = isNaN(pd[0]) ? 0 : parseInt(pd[0]);
            item.bonus.pd2 = isNaN(pd[1]) ? 0 : parseInt(pd[1]);
            item.type = 2;
        } else {
            item.bonus.pd = isNaN(getInfo(itemData[4], "PD")) ? 0 : parseInt(getInfo(itemData[4], "PD"));
            item.type = 1;
        }
    }

    if (isSwitch) {
        let init = getInfo(itemData[5], "INIT").split("/");
        item.bonus.init = isNaN(init[0]) ? 0 : parseInt(init[0]);
        item.bonus.init2 = isNaN(init[1]) ? 0 : parseInt(init[1]);
    } else {
        item.bonus.init = isNaN(getInfo(itemData[5], "INIT")) ? 0 : parseInt(getInfo(itemData[5], "INIT"));
    }

    item.cost = getInfo(itemData[6], "Cost");

    return item;
}

let parsedItems = [];
all.forEach(weap => {
    parsedItems.push(importWeapon(
        weap, "ex1"
    ));
})

console.log(
    JSON.stringify(parsedItems)
)