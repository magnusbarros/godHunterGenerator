let test = `■ Divine Bound Steed
Restrict : Contractor
Mode     : Two Hands
ACC      : None
PD       : +7
INIT     : +3
Cost     : 4,000G
[Range: Charge 6 Sq. / Target: 1#]. A high level bound steed summoned due to a special contract. This being is akin to a god. While [Equipped], the user is able to make [Ranged Attacks] and [Magical Attacks] after [Combat Moves]. Also, once per combat, make 1x [Weapon Attack] after [Damage Calculation].`

let test2 = `■ Wrecking Ball
Restrict : Martial・Utility
Mode     : Switch Hand
IVC      : None
MD       : +5 / +6
INIT     : -3 / -2
Cost     : 700G
[Form: Hammer / Range: Engaged / Target: 1#]. An Artificial Regalia that combines an iron ball with a chain.
While [Equipped], after spending x1 [Timing: Prep], the user may change an [Attack Action] into a [Ranged Attack], changing the [Range/Target] to [5 Sq./1#].`

const importWeapon = (data, att, isMagic, isSwitch) => {

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
        type: 0
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
    item.effect = getInfo(itemData[7], "")
    item.attributes = att;

    console.log(item);
}

importWeapon(
    test2,
    {
        form: "",
        range: "",
        target: "",
        resist: "",
        element: "",
        rank: ""
    },
    true,
    true)