let weapons = [

];
let expansion = "";

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
        while (newUse[useCount] === " " || newUse[useCount] === ":" || newUse[useCount] === "	") {
            newUse.pop()
            useCount--;
        }
        parsedUse = newUse.reverse().join("");
        return parsedUse
    }

    let itemData = data.split("\n");

    item.effect = getInfo(itemData[7], "");
    if (itemData.length > 8) {
        item.effect += getInfo(itemData[8], "");
    }

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
        console.log(itemData[0])
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
                        .replace("Cold", "Frost")
                        .replace("Fire", "Flame")
                        .replace("Shock", "Shock")
                        .replace("Magnet", "Force")
                        .replace("Wind", "Wind")
                        .replace("Toxin", "Blight").replace("Toxic", "Blight")
                        .replace("Phantom", "Psychic");
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
    let isSwitch = item.mode.toLowerCase().includes("switch") 
    || getInfo(itemData[4], "MD").split("/").length > 1
    || getInfo(itemData[4], "PD").split("/").length > 1;

    if (isMagic) {
        item.bonus.ivc = isNaN(getInfo(itemData[3], "IVC")) ? 0 : parseInt(getInfo(itemData[3], "IVC"));
        if (isSwitch) {
            let md = getInfo(itemData[4], "MD").split("/");
            if (md[0] === "None") {
                md = ["0","0"]
            } else if (md.length === 1) {
                md = [md[0], md[0]]
            }
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
            if (pd[0] === "None") {
                pd = ["0","0"]
            } else if (pd.length === 1) {
                pd = [pd[0], pd[0]]
            }
            item.bonus.pd = isNaN(pd[0].replaceAll("(","").replaceAll(")","")) ? 0 : parseInt(pd[0].replaceAll("(","").replaceAll(")",""));
            item.bonus.pd2 = isNaN(pd[1].replaceAll("(","").replaceAll(")","")) ? 0 : parseInt(pd[1].replaceAll("(","").replaceAll(")",""));
            item.type = 2;
        } else {
            console.log(getInfo(itemData[4], "PD"))
            item.bonus.pd = isNaN(getInfo(itemData[4], "PD").replaceAll("(","").replaceAll(")","")) ? 0 : parseInt(getInfo(itemData[4], "PD").replaceAll("(","").replaceAll(")",""));
            item.type = 1;
        }
    }

    if (isSwitch) {
        let init = getInfo(itemData[5], "INIT").split("/");
        if (init[0] === "None") {
            init = ["0","0"]
        } else if (init.length === 1) {
            init = [init[0], init[0]]
        }
        item.bonus.init = isNaN(init[0].replaceAll("(","").replaceAll(")","")) ? 0 : parseInt(init[0].replaceAll("(","").replaceAll(")",""));
        item.bonus.init2 = isNaN(init[1].replaceAll("(","").replaceAll(")","")) ? 0 : parseInt(init[1].replaceAll("(","").replaceAll(")",""));
    } else {
        item.bonus.init = isNaN(getInfo(itemData[5], "INIT").replaceAll("(","").replaceAll(")","")) ? 0 : parseInt(getInfo(itemData[5], "INIT").replaceAll("(","").replaceAll(")",""));
    }

    item.cost = getInfo(itemData[6], "Cost");

    return item;
}

let parsedItems = [];
weapons.forEach(weap => {
    parsedItems.push(importWeapon(
        weap, expansion
    ));
})

console.log(
    JSON.stringify(parsedItems)
)