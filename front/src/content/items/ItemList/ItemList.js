import React, { useEffect, useState } from "react";
import './itemList.css';
import {
    Box, Select, MenuItem, InputLabel, SpeedDial, SpeedDialIcon,
    SpeedDialAction, Modal, Tab, Tabs, TextField, Autocomplete, Divider,
    Button, Input
} from "@mui/material";
import { ItemCard } from "../ItemCard/ItemCard";
import CharacterList from '../../../data/characters/characters.json'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SaveIcon from '@mui/icons-material/Save';
import { ItemCart } from "../ItemCart/ItemCart";
import { save } from '../../../api/characters/CharacterAPI'
import TabPanel from "../../tables/TabPanel";
import SearchIcon from '@mui/icons-material/Search';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import { ItemSource } from "../../../data/constants/ItemConstants";

export const ItemList = (props) => {

    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);

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
    const [tab, setTab] = useState(0);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [effect, setEffect] = useState("");
    const [source, setSource] = useState("*");
    const [cost, setCost] = useState(0);
    const [itemNames, setItemNames] = useState([]);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleTabSwitch = (ev, newTab) => {
        setTab(newTab);
    };
    function tabProps(index) {
        return {
            id: `item-tab-${index}`,
            'aria-controls': `character-tabpanel-${index}`,
        };
    }

    useEffect(() => {
        let _characterList = localStorage.getItem("kg_characters");
        if (_characterList === null || _characterList === undefined) {
            localStorage.setItem("kg_characters", JSON.stringify(CharacterList));
            setCharacterList(CharacterList);
        } else {
            setCharacterList(JSON.parse(_characterList));
        }
        setItems(props.data);
        setFilteredItems(props.data);

        let _itemNames = [];
        props.data.forEach(item => {
            _itemNames.push(item.name);
        });
        setItemNames(_itemNames);

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

    const changeFilter = (ev, value, field) => {
        switch (field) {
            case "item-name":
                setName(value);
                break;
            case "item-description":
                setDescription(ev.target.value);
                break;
            case "item-cost":
                setCost(ev.target.value);
                break;
            case "item-effect":
                setEffect(ev.target.value);
                break;
            case "item-source":
                setSource(ev.target.value);
                break;
            default:
                break;
        }
    }

    const filterOptions = (item) => {
        let filterName = true;
        let filterEffect = true;
        let filterDescripton = true;
        let filterSource = true;
        let filterCost = true;

        if (name !== "" && name !== null) {
            if (item.name.toLowerCase().includes(name.toLowerCase())) {
                filterName = true;
            } else filterName = false;
        }

        if (effect !== "" && effect !== null) {
            if (item.effect.toLowerCase().includes(effect.toLowerCase())) {
                filterEffect = true;
            } else filterEffect = false;
        }

        if (description !== "" && description !== null) {
            if (item.description.toLowerCase().includes(description.toLowerCase())) {
                filterDescripton = true;
            } else filterDescripton = false;
        }

        if (source !== "" && source !== null) {
            if (item.source.toLowerCase() === source.toLowerCase() || source === "*") {
                filterSource = true;
            } else filterSource = false;
        }

        if (cost !== "" && cost !== null) {
            if (parseInt(item.cost.replace("G","")) >= parseInt(cost)) {
                filterCost = true;
            } else filterCost = false;
        }

        return filterName &&
            filterDescripton &&
            filterEffect &&
            filterSource &&
            filterCost
    }

    const filter = () => {
        const newFilteredItems = items.filter(filterOptions)
        console.log(newFilteredItems)
        setFilteredItems(items.filter(filterOptions));
    }

    const clearFilter = () => {
        setName("");
        setDescription("");
        setCost(0);
        setSource("*");
        setFilteredItems(items);
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
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }} >
                <Tabs value={tab} onChange={handleTabSwitch} aria-label="Item Compendium">
                    <Tab sx={{ color: "#0e8a85" }} label="Items" {...tabProps(0)} />
                    <Tab sx={{ color: "#0e8a85" }} label="Weapons" {...tabProps(1)} />
                    <Tab sx={{ color: "#0e8a85" }} label="Protectors" {...tabProps(2)} />
                    <Tab sx={{ color: "#0e8a85" }} label="Accessories" {...tabProps(3)} />
                    <Tab sx={{ color: "#0e8a85" }} label="Materia" {...tabProps(4)} />
                </Tabs>
            </Box>
            <TabPanel value={tab} index={0}>
                <Box className="item-filter">
                    <Box className="item-filter-box">
                        <InputLabel id="item-name-label" className="talent-name">Name</InputLabel>
                        <Autocomplete
                            freeSolo
                            id="item-name"
                            options={itemNames}
                            sx={{ width: 300 }}
                            value={name}
                            renderInput={(params) => <TextField {...params} />}
                            onInputChange={(event, value) => changeFilter(event, value, "item-name")}
                        />
                    </Box>
                    <Box className="item-filter-box">
                        <InputLabel id="item-effect-label" className="item-effect">Effect</InputLabel>
                        <TextField
                            id="item-effect"
                            sx={{ width: 300 }}
                            value={effect}
                            onChange={(event, value) => changeFilter(event, value, "item-effect")}
                        />
                    </Box>
                    <Box className="item-filter-box">
                        <InputLabel id="item-description-label" className="item-description">Description</InputLabel>
                        <TextField
                            id="item-description"
                            sx={{ width: 300 }}
                            value={description}
                            onChange={(event, value) => changeFilter(event, value, "item-description")}
                        />
                    </Box>
                    <Box className="talent-filter-box">
                        <InputLabel id="item-source-label">Source</InputLabel>
                        <Select
                            labelId="item-source-label"
                            id="item-source"
                            value={source}
                            label="Source"
                            className="item-select"
                            onChange={(event, value) => changeFilter(event, value, "item-source")}
                        >
                            <MenuItem value="*">All</MenuItem>
                            <MenuItem value={ItemSource.CORE}>Core</MenuItem>
                            <MenuItem value={ItemSource.EXPANSION_1}>Expansion 1</MenuItem>
                            <MenuItem value={ItemSource.EXPANSION_2}>Expansion 2</MenuItem>
                            <MenuItem value={ItemSource.EXPANSION_3}>Expansion 3</MenuItem>
                            <MenuItem value={ItemSource.EXPANSION_4}>Expansion 4</MenuItem>
                            <MenuItem value={ItemSource.EXPANSION_5}>Expansion 5</MenuItem>
                            <MenuItem value={ItemSource.EXPANSION_6}>Expansion 6</MenuItem>
                            <MenuItem value={ItemSource.EXPANSION_7}>Expansion 7</MenuItem>
                            <MenuItem value={ItemSource.EXPANSION_8}>Expansion 8</MenuItem>
                            <MenuItem value={ItemSource.EXPANSION_9}>Expansion 9</MenuItem>
                            <MenuItem value={ItemSource.EXPANSION_10}>Expansion 10</MenuItem>
                        </Select>
                    </Box>
                    <Box className="item-filter-box">
                        <InputLabel id="item-cost-label" className="item-cost">Cost (G)</InputLabel>
                        <Input sx={{ width: 100, height: "56px" }}
                            id="item-cost"
                            type="number"
                            value={cost}
                            onChange={(event, value) => changeFilter(event, value, "item-cost")} />
                    </Box>
                    <Box className="item-filter-box">
                        <Box className="talent-filter-button-box">
                            <Button className="talent-filter-button" onClick={() => filter()}><SearchIcon className="talent-icon-label" />Search</Button>
                            <Button className="talent-filter-button" onClick={() => clearFilter()}><ClearAllIcon className="talent-icon-label" />Clear Filter</Button>
                        </Box>
                    </Box>
                    <Divider sx={{ width: "100%", marginBottom: "15px" }} />
                </Box>
                <Box className="item-list">
                    {filteredItems.map((item) => {
                        return <ItemCard data={item} character={character} />
                    })}
                </Box>
            </TabPanel>
            <TabPanel value={tab} index={1}>

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
        </Box>
    )

}