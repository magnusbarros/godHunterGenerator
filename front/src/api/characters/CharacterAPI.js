import React from "react";
import DefaultCharacters from "../../data/characters/characters.json"

export const save = (character) => {
    try {
        let characterList = localStorage.getItem("kg_characters");
        if (characterList === null) {
            let charString = JSON.stringify(DefaultCharacters);
            localStorage.setItem("kg_characters", charString);
            characterList = charString;
        }

        let parsedCharacterList = JSON.parse(characterList);

        if (parsedCharacterList.find(char => char.id === character.id) !== undefined) {
            let index = parsedCharacterList.findIndex(char => char.id === character.id);
            parsedCharacterList[index] = character;
        } else {
            parsedCharacterList.push(character);
        }

        localStorage.setItem("kg_characters", JSON.stringify(parsedCharacterList));

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export default save;