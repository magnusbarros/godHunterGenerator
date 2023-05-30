let test = `Elemental Augment Drug
    Use    : Other ・ Distortion
    Cost   : 500G
    A magic drug that strengthens [Elements], which works by being spread over a weapon.
    Use as [Range: Engaged / Target: 1#]. For the rest of the combat, when one [Equipped] [Weapon] is bestowed with an [Element], the target gains +1 [Rank].`

const importItem = (data) => {
    function uuidv4() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }
    let itemData = data.split("\n");

    let item = {
        id: "",
        name: "",
        use: "",
        cost: "",
        description: "",
        effect: ""
    }

    item.id = uuidv4();

    item.name = itemData[0];
    // item.use = itemData[1].replaceAll(" ","").replace("Use:");

    let newUse = itemData[1].replace("Use", "").split("").reverse();
    let parsedUse = ""
    let useCount = newUse.length - 1;
    while (newUse[useCount] === " " || newUse[useCount] === ":") {
        newUse.pop()
        useCount--;
    }
    parsedUse = newUse.reverse().join("");
    item.use = parsedUse;


    // item.cost = itemData[2].replaceAll(" ","").replace("Cost:");

    let newCost = itemData[2].replace("Cost", "").split("").reverse();
    let parsedCost = ""
    let costCount = newCost.length - 1;
    while (newCost[costCount] === " " || newCost[costCount] === ":") {
        newCost.pop()
        costCount--;
    }
    parsedCost = newCost.reverse().join("");
    item.cost = parsedCost;

    // item.description = itemData[3];

    let newDesc = itemData[3].split("").reverse();
    let parsedDesc = ""
    let descCount = newDesc.length - 1;
    while (newDesc[descCount] === " " || descCount[costCount] === ":") {
        newDesc.pop()
        descCount--;
    }
    parsedDesc = newDesc.reverse().join("");
    item.description = parsedDesc;

    // item.effect = itemData[itemData.length === 3 ? 3 : 4];

    let newEff = itemData[itemData.length === 3 ? 3 : 4].split("").reverse();
    let parsedEff = ""
    let effCount = newEff.length - 1;
    while (newEff[effCount] === " " || newEff[effCount] === ":") {
        newEff.pop()
        effCount--;
    }
    parsedEff = newEff.reverse().join("");
    item.effect = parsedEff;

    console.log(item);
}

importItem(test);