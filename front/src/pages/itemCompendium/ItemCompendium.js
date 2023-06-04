import React, { useState, useEffect } from "react";
import './itemCompendium.css'
import {
    Breadcrumbs, Typography, Modal,
    Box, Select, MenuItem, InputLabel, SpeedDial, SpeedDialIcon,
    SpeedDialAction, Tab, Tabs
} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SaveIcon from '@mui/icons-material/Save';
import { ItemCart } from "../../content/items/ItemCart/ItemCart";
import { save } from '../../api/characters/CharacterAPI'
import TabPanel from "../../content/tables/TabPanel";
import CoreItems from '../../data/items/core.json';
import Expansion1Items from '../../data/items/expansion1.json';
import Expansion3Items from '../../data/items/expansion3.json';
import Expansion5Items from '../../data/items/expansion5.json';
import Expansion6Items from '../../data/items/expansion6.json';
import Expansion8Items from '../../data/items/expansion8.json';
import Expansion10Items from '../../data/items/expansion10.json';
import CharacterList from '../../data/characters/characters.json'
import Expansion1Weapons from '../../data/weapons/expansion1.json';
import { ItemList } from "../../content/items/ItemList/ItemList";
import { WeaponList } from "../../content/weapons/weaponList/WeaponList";

export const ItemCompendium = () => {

    const [items, setItems] = useState([]);
    const [weapons, setWeapons] = useState([]);
    const [loading, setLoading] = useState(true);

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
    const [open, setOpen] = useState(false);
    const [tab, setTab] = useState(0);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleTabSwitch = (ev, newTab) => {
        setTab(newTab);
    };

    useEffect(() => {
        setLoading(true);
        let storedItems = localStorage.getItem("kg_items");
        if (storedItems === null) {
            let _items = [].concat(
                CoreItems,
                Expansion1Items,
                Expansion3Items,
                Expansion5Items,
                Expansion6Items,
                Expansion8Items,
                Expansion10Items
            );
            localStorage.setItem("kg_items", JSON.stringify(_items));
            setItems(_items);
        } else {
            setItems(JSON.parse(storedItems));
        }

        let storedWeapons = localStorage.getItem("kg_weapons");
        if (storedWeapons === null) {
            let _weapons = [].concat(
                Expansion1Weapons
            );
            localStorage.setItem("kg_weapons", JSON.stringify(_weapons));
            setWeapons(_weapons);
        } else {
            setWeapons(JSON.parse(storedWeapons));
        }

        let _characterList = localStorage.getItem("kg_characters");
        if (_characterList === null || _characterList === undefined) {
            localStorage.setItem("kg_characters", JSON.stringify(CharacterList));
            setCharacterList(CharacterList);
        } else {
            setCharacterList(JSON.parse(_characterList));
        }
        setLoading(false);
    }, [])

    function tabProps(index) {
        return {
            id: `item-tab-${index}`,
            'aria-controls': `character-tabpanel-${index}`,
        };
    }

    const saveCharacter = () => {
        if (character.id !== 0)
            save(character);
    }

    const changeCharacter = (event, value) => {
        let _character = characterList.find(char => char.id === value.props.value)
        setCharacter(_character);
    }


    return (loading ? "Loading..." :
        <Box className="item-page">
            <Box className="breadcrumb-box">
                <Breadcrumbs>
                    <Typography color={'text.secondary'}>
                        Main Menu
                    </Typography>
                    <Typography color={'text.primary'}>
                        Item Compendium
                    </Typography>
                </Breadcrumbs>
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <ItemCart character={character.id} items={items} />
            </Modal>
            <InputLabel id="select-character-label">Character</InputLabel>
            <Select
                id="select-character"
                value={character.id}
                labelId="select-character-label"
                label="Character"
                className="select-character"
                defaultValue={0}
                onChange={(event, value) => changeCharacter(event, value)}
            >
                <MenuItem key={0} value={0} disabled>Select a character</MenuItem>
                {characterList.map((item) => {
                    return <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                })}
            </Select>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }} >
                <Tabs value={tab} onChange={handleTabSwitch} aria-label="Item Compendium">
                    <Tab sx={{ color: "#0e8a85" }} label="Consumables" {...tabProps(0)} />
                    <Tab sx={{ color: "#0e8a85" }} label="Weapons" {...tabProps(1)} />
                    <Tab sx={{ color: "#0e8a85" }} label="Protectors" {...tabProps(2)} />
                    <Tab sx={{ color: "#0e8a85" }} label="Accessories" {...tabProps(3)} />
                    <Tab sx={{ color: "#0e8a85" }} label="Materia" {...tabProps(4)} />
                </Tabs>
            </Box>
            <TabPanel value={tab} index={0}>
                <ItemList data={items} character={character} />
            </TabPanel>
            <TabPanel value={tab} index={1}>
                <WeaponList data={weapons} character={character} />
            </TabPanel>
            <TabPanel value={tab} index={2}>

            </TabPanel>
            <TabPanel value={tab} index={3}>

            </TabPanel>
            <TabPanel value={tab} index={4}>

            </TabPanel>
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
        </Box>)
}

export default ItemCompendium;