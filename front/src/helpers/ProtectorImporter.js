let test = `Psychic Jacket
Restrict : Esper
EVA : None
INIT : None
ARMOR : +1
BARRIER : +2
Cost : 2000G
A jacket-type artificial regalia equipped with a psychic-sensitive device. In addition to its defensive performance, it has a function to accelerate the body and mind.
While [Equipped], once per combat, gain +3 {Initiative}.`;

const importProtector = (data, suit) => {

    let item = {
        id: "",
        name: "",
        restrict: "",
        bonus: {
            eva: 0,
            init: 0,
            armor: 0,
            barrier: 0
        },
        cost: "",
        description: "",
        effect: "",
        type: ""
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
    item.id = uuidv4()
    item.name = itemData[0];
    item.restrict = getInfo(itemData[1], "Restrict");

    let numEva = itemData[2]
        .replace("EVA", "")
        .replace(":", "")
        .replace(" ", "");
    item.bonus.eva = isNaN(numEva) ? 0 : parseInt(numEva);

    let numInit = itemData[3]
        .replace("INIT", "")
        .replace(":", "")
        .replace(" ", "");
    item.bonus.init = isNaN(numInit) ? 0 : parseInt(numInit);

    let numArmor = itemData[4]
        .replace("ARMOR", "")
        .replace(":", "")
        .replace(" ", "");
    item.bonus.armor = isNaN(numArmor) ? 0 : parseInt(numArmor);

    let numBarrier = itemData[5]
        .replace("BARRIER", "")
        .replace(":", "")
        .replace(" ", "");
    item.bonus.barrier = isNaN(numBarrier) ? 0 : parseInt(numBarrier);

    item.cost = getInfo(itemData[6], "Cost");
    item.description = getInfo(itemData[7], "");
    item.effect = getInfo(itemData[8], "");
    item.type = suit ? 1 : 2

    console.log(item);
}

importProtector(test, true)