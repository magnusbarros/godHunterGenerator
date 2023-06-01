import React, { useEffect, useState } from "react";
import './itemList.css';
import { Box, Select, MenuItem, InputLabel, SpeedDial, SpeedDialIcon, SpeedDialAction, Modal, Typography, List } from "@mui/material";
import { ItemCard } from "../ItemCard/ItemCard";
import CharacterList from '../../../data/characters/characters.json'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SaveIcon from '@mui/icons-material/Save';
import { ItemCart } from "../ItemCart/ItemCart";
import { save } from '../../../api/characters/CharacterAPI'

export const ItemList = (props) => {

    const [items, setItems] = useState([]);

    const [characterList, setCharacterList] = useState();
    const [character, setCharacter] = useState({
        "id": 0,
        "name": "",
        "faction": "",
        "ancestry": "",
        "ancestryTrait": "",
        "facade": "",
        "facadeTrait": "",
        "facetA": "",
        "facetAType": 0,
        "facetB": "",
        "facetBType": 0,
        "level": 0,
        "xp": 0,
        "statType": 0,
        "stats": {
            "strenght": 0,
            "agility": 0,
            "intellect": 0,
            "will": 0,
            "luck": 8,
            "otherIncreases": {
                "strenght": 0,
                "agility": 0,
                "intellect": 0,
                "will": 0,
                "luck": 0
            }
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
            "ist": 0,
            "subIncreases": {
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
            }
        },
        "items": [],
        "talents": [],
        "info": {
            "age": 0,
            "gender": "",
            "height": "",
            "weight": "",
            "hair": "",
            "eye": "",
            "skin": "",
            "description": "",
            "origins": "",
            "personality": ""
        },
        "bonds": []
    });

    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        let _characterList = localStorage.getItem("kg_characters");
        if (_characterList === null || _characterList === undefined) {
            localStorage.setItem("kg_characters", JSON.stringify(CharacterList));
            setCharacterList(CharacterList);
        } else {
            setCharacterList(JSON.parse(_characterList));
        }
        setItems(props.data);
        setLoading(false);
    }, []);

    const changeCharacter = (event, value) => {
        let _character = characterList.find(char => char.id === value.props.value)
        setCharacter(_character);
    }

    const saveCharacter = () => {
        if (character.id !== 0)
            save(character);
    }

    return (loading ? "" :
        <Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <ItemCart character={character} items={items} />
            </Modal>
            <Box className="item-filter">
                <InputLabel id="select-character-label">Character</InputLabel>
                <Select
                    id="select-character"
                    value={character.id}
                    labelId="select-character-label"
                    label="Character"
                    className="select-character"
                    onChange={(event, value) => changeCharacter(event, value)}
                >
                    <MenuItem key={0} value={0} disabled>Select a character</MenuItem>
                    {characterList.map((item) => {
                        return <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                    })}
                </Select>
            </Box>
            <Box className="item-list">
                {items.map((item) => {
                    return <ItemCard data={item} character={character} />
                })}
            </Box>
            <Box>
                <SpeedDial
                    ariaLabel="Options"
                    className="speed-dial-items"
                    sx={{ position: 'fixed', bottom: 16, right: 16 }}
                    icon={<SpeedDialIcon />}
                >
                    <SpeedDialAction
                        key="save"
                        icon={<SaveIcon />}
                        tooltipTitle="Save Character"
                        onClick={() => saveCharacter(character)}
                    />
                    <SpeedDialAction
                        key="cart"
                        icon={<ShoppingCartIcon />}
                        tooltipTitle="Cart"
                        onClick={handleOpen}
                    />
                </SpeedDial>
            </Box>
        </Box>
    )

}