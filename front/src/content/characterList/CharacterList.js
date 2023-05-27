import React from "react";
import { useState } from "react";
import './characterList.css';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';

export const CharacterList = (props) => {

    const [selectedCharacter, setSelectedCharacter] = useState()

    const characterSelect = (ev, characterId) => {
        props.content.forEach(character => {
            if (character.id === characterId) {
                setSelectedCharacter(character);
            }
        });
    }

    return (
        <Box className="character-main">
            <List className="character-list">
                {
                    props.content.length !== 0 ?
                        props.content.map((character) => {
                            return (
                                <ListItem>
                                    <ListItemButton onClick={ev => characterSelect(ev, character.id)}>
                                        <h2>{character.name} </h2>
                                        <p>
                                            , LVL {character.level} {character.mainClass}
                                            {character.secondaryClass ? ", " + character.secondaryClass : ""}
                                        </p>
                                    </ListItemButton>
                                </ListItem>
                            )
                        }) : <ListItem>Empty...</ListItem>
                }
            </List>
            <Box className="character-preview">
                {
                    selectedCharacter ?
                    <>
                        <h1>Name: {selectedCharacter.name}</h1>
                        <h3>Level: {selectedCharacter.level}</h3>
                        <h4>Primary Class: {selectedCharacter.mainClass}</h4>
                        <h4>Secondary Class: {selectedCharacter.secondaryClass}</h4>
                    </>:""
                }
            </Box>
        </Box>
    );
}

export default CharacterList;