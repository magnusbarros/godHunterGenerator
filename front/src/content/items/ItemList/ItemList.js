import React, { useEffect, useState } from "react";
import './itemList.css';
import {
    Box, Select, MenuItem, InputLabel, TextField, Autocomplete, Divider,
    Button, Input
} from "@mui/material";
import { ItemCard } from "../ItemCard/ItemCard";
import SearchIcon from '@mui/icons-material/Search';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import { ItemSource } from "../../../data/constants/ItemConstants";

export const ItemList = (props) => {

    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
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
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [effect, setEffect] = useState("");
    const [source, setSource] = useState("*");
    const [cost, setCost] = useState(0);
    const [itemNames, setItemNames] = useState([]);

    useEffect(() => {
        setItems(props.data);
        setFilteredItems(props.data);
        setCharacter(props.character);

        let _itemNames = [];
        props.data.forEach(item => {
            _itemNames.push(item.name);
        });
        setItemNames(_itemNames);

        setLoading(false);
    }, [props.character, props.data]);

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
            if (parseInt(item.cost.replace("G", "")) >= parseInt(cost)) {
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
        setFilteredItems([]);
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
                        <MenuItem value={ItemSource.EXPANSION_3}>Expansion 3</MenuItem>
                        <MenuItem value={ItemSource.EXPANSION_5}>Expansion 5</MenuItem>
                        <MenuItem value={ItemSource.EXPANSION_6}>Expansion 6</MenuItem>
                        <MenuItem value={ItemSource.EXPANSION_8}>Expansion 8</MenuItem>
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
                    return <ItemCard key={item.id} data={item} character={character} />
                })}
            </Box>
        </Box>
    )

}

export default ItemList;