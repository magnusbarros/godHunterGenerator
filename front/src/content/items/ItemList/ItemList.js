import React, { useEffect, useState } from "react";
import './itemList.css';
import {
    Box, Select, MenuItem, InputLabel, TextField, Autocomplete, Divider,
    Button, Input, Pagination, Typography
} from "@mui/material";
import { ItemCard } from "../ItemCard/ItemCard";
import SearchIcon from '@mui/icons-material/Search';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import RemoveIcon from '@mui/icons-material/Remove';
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

    const defaultFilter = {
        description: "",
        effect: "",
        source: "*",
        costMin: "0",
        costMax: "0",
        name: ""
    }
    const [filter, setFilter] = useState(defaultFilter);
    const [itemNames, setItemNames] = useState([]);
    const [position, setPosition] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(60);
    const [offset, setOffset] = useState(60);
    const [page, setPage] = useState(1);

    useEffect(() => {
        setItems(props.data);
        if (filteredItems.length === 0) {
            setFilteredItems(props.data);
        }
        setCharacter(props.character);
        let _itemNames = [];
        props.data.forEach(item => {
            _itemNames.push(item.name);
        });
        setItemNames(_itemNames.filter((value, index, array) => {
            return array.indexOf(value) === index;
        }));
        setLoading(false);
    }, [props.character, props.data, page, itemsPerPage]);

    const handlePageChange = (event, value) => {
        setPage(value);
        setPosition(itemsPerPage * (value - 1));
        setOffset(itemsPerPage * value);
    };

    const changeFilter = (ev) => {
        if (ev !== null) {
            let _filter = { ...filter };
            _filter[ev.target.name] = ev.target.value;
            setFilter(_filter);
        }
    }

    const filterOptions = (item) => {
        let filterName = true;
        let filterEffect = true;
        let filterDescripton = true;
        let filterSource = true;
        let filterCost = true;

        if (filter.name !== "" && filter.name !== null) {
            if (item.name.toLowerCase().includes(filter.name.toLowerCase())) {
                filterName = true;
            } else filterName = false;
        }

        if (filter.effect !== "" && filter.effect !== null) {
            if (item.effect.toLowerCase().includes(filter.effect.toLowerCase())) {
                filterEffect = true;
            } else filterEffect = false;
        }

        if (filter.description !== "" && filter.description !== null) {
            if (item.description.toLowerCase().includes(filter.description.toLowerCase())) {
                filterDescripton = true;
            } else filterDescripton = false;
        }

        if (filter.source !== "" && filter.source !== null) {
            if (item.source.toLowerCase() === filter.source.toLowerCase() || filter.source === "*") {
                filterSource = true;
            } else filterSource = false;
        }

        if (filter.costMin !== "0" && filter.costMin !== null) {
            let cost = isNaN(item.cost.replace("G", "").replaceAll(": ", "").replaceAll(",", ""))
                ? 0 : parseFloat(item.cost.replace("G", "").replaceAll(": ", "").replaceAll(",", ""));

            if ((cost >= parseInt(filter.costMin)) &&
                (cost <= parseInt(
                    parseInt(filter.costMax) < parseInt(filter.costMin)
                        ? cost : filter.costMax))) {
                filterCost = true;
            } else filterCost = false;
        }

        return filterName &&
            filterDescripton &&
            filterEffect &&
            filterSource &&
            filterCost
    }

    const doFilter = () => {
        setFilteredItems([]);
        setFilteredItems(items.filter(filterOptions));
    }

    const clearFilter = () => {
        setFilter(defaultFilter);
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
                        value={filter.name}
                        renderInput={(params) => <TextField name="name" {...params} />}
                        onInputChange={(event) => changeFilter(event)}
                    />
                </Box>
                <Box className="item-filter-box">
                    <InputLabel id="item-effect-label" className="item-effect">Effect</InputLabel>
                    <TextField
                        id="item-effect"
                        sx={{ width: 300 }}
                        name="effect"
                        value={filter.effect}
                        onChange={(event) => changeFilter(event)}
                    />
                </Box>
                <Box className="item-filter-box">
                    <InputLabel id="item-description-label" className="item-description">Description</InputLabel>
                    <TextField
                        id="item-description"
                        sx={{ width: 300 }}
                        name="description"
                        value={filter.description}
                        onChange={(event) => changeFilter(event)}
                    />
                </Box>
                <Box className="talent-filter-box">
                    <InputLabel id="item-source-label">Source</InputLabel>
                    <Select
                        labelId="item-source-label"
                        id="item-source"
                        name="source"
                        value={filter.source}
                        label="Source"
                        className="item-select"
                        onChange={(event) => changeFilter(event)}
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
                    <Box sx={{ width: 300 }}>
                        <InputLabel id="item-cost-label">Cost (G)</InputLabel>
                        <Input sx={{ width: 130, height: "56px" }}
                            id="item-cost-min"
                            type="number"
                            name="costMin"
                            value={filter.costMin}
                            onChange={(ev) => changeFilter(ev)} />
                        <RemoveIcon sx={{ position: "relative", top: "10px", marginLeft: "5px", marginRight: "5px" }} />
                        <Input sx={{ width: 130, height: "56px" }}
                            id="item-cost-max"
                            type="number"
                            name="costMax"
                            value={filter.costMax}
                            onChange={(ev) => changeFilter(ev)} />
                    </Box>
                </Box>
                <Box className="item-filter-box">
                    <Box className="talent-filter-button-box">
                        <Button className="talent-filter-button" onClick={() => doFilter()}><SearchIcon className="talent-icon-label" />Search</Button>
                        <Button className="talent-filter-button" onClick={() => clearFilter()}><ClearAllIcon className="talent-icon-label" />Clear Filter</Button>
                    </Box>
                </Box>
                <Divider sx={{ width: "100%", marginBottom: "15px" }} />
            </Box>
            <Box className="item-list">
                {filteredItems.map((item, index) => {
                    if (index >= position && index < offset) {
                        return <ItemCard key={item.id} data={item} character={character} />
                    }
                    return "";
                })}
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                <Box sx={{ margin: "auto", display: "flex", flexWrap: "wrap" }}>
                    <Pagination count={Math.round(filteredItems.length / itemsPerPage)} page={page} onChange={handlePageChange} />
                    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                        <Typography sx={{ fontSize: "14px", marginTop: "6px", marginRight: "5px" }}>Items per page: </Typography>
                        <Input sx={{ width: "40px" }} type="number" value={itemsPerPage} onChange={(ev) => setItemsPerPage(ev.target.value)} />
                    </Box>
                </Box>

            </Box>
        </Box>
    )

}

export default ItemList;