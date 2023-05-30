
let test = `Sanskrit Ring
Slot   : Hand
Cost   : 300G
A ring or bracelet engraved with a special sanskrit character.
While [Equipped], gain a +1 modifier to [Physical Damage].`

const importAcc = (data, bonus) => {

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

    let allData = {
        "stats": {
            "strenght": 0,
            "agility": 0,
            "intellect": 0,
            "will": 0,
            "luck": 0
        },
        "substats": {
            "pd": 0,
            "hp": 0,
            "md": 0,
            "init": 0,
            "crest": 0,
            "acc": 0,
            "eva": 0,
            "ivc": 0,
            "res": 0,
            "ist": 0
        },
        "rank": {
            "p": 0,
            "m": 0
        }
    }

    let accessory = {
        id: "",
        name: "",
        slot: "",
        cost: "",
        description: "",
        effect: "",
        bonus: bonus
    }

    let accessoryData = data.split("\n");
    accessory.id = uuidv4();
    accessory.name = accessoryData[0];
    accessory.slot = getInfo(accessoryData[1], "Slot");
    accessory.cost = getInfo(accessoryData[2], "Cost");
    accessory.description = getInfo(accessoryData[3], "");
    accessory.effect = getInfo(accessoryData[4], "");

    console.log(accessory);
}

importAcc(
    `Sanskrit Ring
    Slot   : Hand
    Cost   : 300G
    A ring or bracelet engraved with a special sanskrit character.
    While [Equipped], gain a +1 modifier to [Physical Damage].`,
    {
        "stats": {
            "strenght": 0,
            "agility": 0,
            "intellect": 0,
            "will": 0,
            "luck": 0
        },
        "substats": {
            "pd": 0,
            "hp": 0,
            "md": 0,
            "init": 0,
            "crest": 0,
            "acc": 0,
            "eva": 0,
            "ivc": 0,
            "res": 0,
            "ist": 0
        },
        "rank": {
            "p": 0,
            "m": 0
        }
    }
)