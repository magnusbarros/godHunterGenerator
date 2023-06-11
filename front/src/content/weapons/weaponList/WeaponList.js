import React, { useEffect, useState } from "react";
import './weaponList.css';
import { Box, Divider, Button, Input, MenuItem, Select, Pagination, Typography, Autocomplete, TextField, InputLabel } from "@mui/material";
import { WeaponCard } from "../weaponCard/WeaponCard";
import SearchIcon from '@mui/icons-material/Search';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import { ItemSource } from "../../../data/constants/ItemConstants";
import RemoveIcon from '@mui/icons-material/Remove';

export const WeaponList = (props) => {

    const [weapons, setWeapons] = useState();
    const [filteredWeapons, setFilteredWeapons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [position, setPosition] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(60);
    const [offset, setOffset] = useState(60);
    const [page, setPage] = useState(1);
    const [weaponNames, setWeaponNames] = useState([]);
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
        "weapons": [],
        "accessories": [],
        "protectors": [],
        "favorites": [],
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

    const defaultFilter = {
        name: "",
        description: "",
        cost: "",
        effect: "",
        source: "*",
        element: "*",
        shift: "*",
        statIncrease: "*",
        otherIncreases: "*",
        form: "*",
        costMin: "0",
        costMax: "0"
    }
    const [filter, setFilter] = useState(defaultFilter);

    useEffect(() => {
        setWeapons(props.data);
        if (filteredWeapons.length === 0) {
            setFilteredWeapons(props.data);
        }
        let _weaponNames = [];
        props.data.forEach(weapon => {
            _weaponNames.push(weapon.name);
        });
        setWeaponNames(_weaponNames);
        setCharacter(props.character);
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

    const getIcon = (element) => {
        switch (element) {
            case "Flame":
                return "512px"
            case "Frost":
                return "480px"
            case "Shock":
                return "448px"
            case "Wind":
                return "352px"
            case "Force":
                return "320px"
            case "Radiant":
                return "256px"
            case "Blight":
                return "288px"
            case "Psychic":
                return "32px"
            default:
                return "0px"
        }
    }

    const getOption = (element) => {
        return (
            <div className="weapon-stat-icon-select"
                style={{
                    backgroundPositionX: getIcon(element),
                    backgroundPositionY: "3072px",
                    position: "relative",
                    float: "left"
                }}
            />
        )
    }

    const filterOptions = (weapon) => {
        let filterName = true;
        let filterEffect = true;
        let filterDescripton = true;
        let filterSource = true;
        let filterCost = true;
        let filterElement = true;
        let filterShift = true;
        let filterStatIncrease = true;
        let filterWeaponForm = true;

        if (filter.name !== "" && filter.name !== null) {
            if (weapon.name.toLowerCase().includes(filter.name.toLowerCase())) {
                filterName = true;
            } else filterName = false;
        }

        if (filter.effect !== "" && filter.effect !== null) {
            if (weapon.effect.toLowerCase().includes(filter.effect.toLowerCase())) {
                filterEffect = true;
            } else filterEffect = false;
        }

        /*if (filter.description !== "" && filter.description !== null) {
            if (weapon.description.toLowerCase().includes(filter.description.toLowerCase())) {
                filterDescripton = true;
            } else filterDescripton = false;
        }*/

        if (filter.source !== "" && filter.source !== null) {
            if (weapon.source.toLowerCase() === filter.source.toLowerCase() || filter.source === "*") {
                filterSource = true;
            } else filterSource = false;
        }

        if (filter.costMin !== "0" && filter.costMin !== null) {
            let cost = isNaN(weapon.cost.replace("G", "").replaceAll(": ", "").replaceAll(",", ""))
                ? 0 : parseFloat(weapon.cost.replace("G", "").replaceAll(": ", "").replaceAll(",", ""));

            if ((cost >= parseInt(filter.costMin)) &&
                (cost <= parseInt(
                    parseInt(filter.costMax) < parseInt(filter.costMin)
                        ? cost : filter.costMax))) {
                filterCost = true;
            } else filterCost = false;
        }

        if (filter.element !== "" && filter.element !== null) {
            if (weapon.attributes.element.toLowerCase() === filter.element.toLowerCase() || filter.element === "*") {
                filterElement = true;
            } else filterElement = false;
        }

        if (filter.form !== "" && filter.form !== null) {
            if (weapon.attributes.form.toLowerCase() === filter.form.toLowerCase() || filter.form === "*") {
                filterWeaponForm = true;
            } else filterWeaponForm = false;
        }

        /*if (filter.shift !== "" && filter.shift !== null) {
            if (weapon.shift.toLowerCase().includes(filter.shift.toLowerCase())) {
                filterShift = true;
            } else filterShift = false;
        }

        if (filter.statIncrease !== "" && filter.statIncrease !== null) {
            if (weapon.statIncrease.toLowerCase().includes(filter.statIncrease.toLowerCase())) {
                filterStatIncrease = true;
            } else filterStatIncrease = false;
        }*/

        return filterName &&
            filterDescripton &&
            filterEffect &&
            filterSource &&
            filterCost &&
            filterElement &&
            filterShift &&
            filterStatIncrease &&
            filterWeaponForm
    }

    const doFilter = () => {
        setFilteredWeapons([]);
        setFilteredWeapons(weapons.filter(filterOptions));
    }

    const clearFilter = () => {
        setFilter(defaultFilter);
        setFilteredWeapons(weapons);
    }

    return (loading ? "" :
        <Box >
            <Box className="weapon-filter">
                <Box className="weapon-filter-box">
                    <InputLabel id="weapon-name-label" className="talent-name">Name</InputLabel>
                    <Autocomplete
                        freeSolo
                        id="weapon-name"
                        options={weaponNames}
                        sx={{ width: 300 }}
                        value={filter.name}
                        renderInput={(params) => <TextField name="name" {...params} />}
                        onInputChange={(ev) => changeFilter(ev)}
                    />
                </Box>
                <Box className="weapon-filter-box">
                    <InputLabel id="weapon-effect-label" className="talent-effect">Effect</InputLabel>
                    <TextField
                        id="weapon-effect"
                        sx={{ width: 300 }}
                        value={filter.effect}
                        name="effect"
                        onChange={(ev) => changeFilter(ev)}
                    />
                </Box>
                <Box className="weapon-filter-box">
                    <InputLabel id="weapon-description-label" className="talent-description">Description</InputLabel>
                    <TextField
                        id="weapon-description"
                        sx={{ width: 300 }}
                        value={filter.description}
                        name="description"
                        onChange={(ev) => changeFilter(ev)}
                    />
                </Box>
                <Box className="talent-filter-box">
                    <InputLabel id="item-source-label">Source</InputLabel>
                    <Select
                        labelId="item-source-label"
                        id="weapon-source"
                        value={filter.source}
                        sx={{ width: 300 }}
                        label="Source"
                        name="source"
                        className="weapon-select"
                        onChange={(ev) => changeFilter(ev)}
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
                <Box className="talent-filter-box">
                    <InputLabel id="weapon-form-label">Form</InputLabel>
                    <Select
                        labelId="weapon-form-label"
                        id="weapon-form"
                        value={filter.form}
                        sx={{ width: 300 }}
                        label="Form"
                        name="form"
                        className="weapon-select"
                        onChange={(ev) => changeFilter(ev)}
                    >
                        <MenuItem value="*">All</MenuItem>
                        <MenuItem value="sword">Sword</MenuItem>
                        <MenuItem value="spear">Spear</MenuItem>
                        <MenuItem value="axe">Axe</MenuItem>
                        <MenuItem value="hammer">Hammer</MenuItem>
                        <MenuItem value="ranged">Ranged</MenuItem>
                        <MenuItem value="magic">Magic</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                    </Select>
                </Box>
                <Box className="talent-filter-box">
                    <InputLabel id="weapon-element-label">Element</InputLabel>
                    <Select
                        labelId="weapon-element-label"
                        id="weapon-element"
                        value={filter.element}
                        sx={{ width: 300 }}
                        label="Element"
                        name="element"
                        className="weapon-select"
                        onChange={(ev) => changeFilter(ev)}
                    >
                        <MenuItem value="*">All</MenuItem>
                        <MenuItem value="radiant">Radiant {getOption("Radiant")}</MenuItem>
                        <MenuItem value="frost">Frost{getOption("Frost")}</MenuItem>
                        <MenuItem value="flame">Flame{getOption("Flame")}</MenuItem>
                        <MenuItem value="shock">Shock{getOption("Shock")}</MenuItem>
                        <MenuItem value="force">Force{getOption("Force")}</MenuItem>
                        <MenuItem value="wind">Wind{getOption("Wind")}</MenuItem>
                        <MenuItem value="blight">Blight{getOption("Blight")}</MenuItem>
                        <MenuItem value="psychic">Psychic{getOption("Psychic")}</MenuItem>
                    </Select>
                </Box>
                <Box className="talent-filter-box">
                    <InputLabel id="weapon-element-label">Conditions</InputLabel>
                    <Select
                        labelId="weapon-element-label"
                        id="weapon-shift"
                        value={filter.shift}
                        sx={{ width: 300 }}
                        label="Shift"
                        name="shift"
                        className="weapon-select"
                        onChange={(ev) => changeFilter(ev)}
                    >
                        <MenuItem value="*">All</MenuItem>
                        <MenuItem value="" disabled>Negative</MenuItem>
                        <MenuItem value="staggered">Staggered</MenuItem>
                        <MenuItem value="blinded">Blinded</MenuItem>
                        <MenuItem value="poisoned">Poisoned</MenuItem>
                        <MenuItem value="pained">Pained</MenuItem>
                        <MenuItem value="paralyzed">Paralyzed</MenuItem>
                        <MenuItem value="immobilized">Immobilized</MenuItem>
                        <MenuItem value="downed">Downed</MenuItem>
                        <MenuItem value="takenOut">Taken Out</MenuItem>
                        <MenuItem value="dead">Dead</MenuItem>
                        <MenuItem value="" disabled>Positive</MenuItem>
                        <MenuItem value="covered">Covered</MenuItem>
                        <MenuItem value="hidden">Hidden</MenuItem>
                        <MenuItem value="primed">Primed</MenuItem>
                        <MenuItem value="flying">Flying</MenuItem>
                    </Select>
                </Box>
                <Box className="talent-filter-box">
                    <InputLabel id="weapon-element-label">Stat Increases</InputLabel>
                    <Select
                        labelId="weapon-element-label"
                        id="weapon-stat-increases"
                        value={filter.statIncrease}
                        sx={{ width: 300 }}
                        label="Stat Increases"
                        name="stat"
                        className="weapon-select"
                        onChange={(ev) => changeFilter(ev)}
                    >
                        <MenuItem value="*">All</MenuItem>
                        <MenuItem value="" disabled>Main Stats</MenuItem>
                        <MenuItem value="allMain">All Main Stats</MenuItem>
                        <MenuItem value="strenght">Strenght</MenuItem>
                        <MenuItem value="agility">Agility</MenuItem>
                        <MenuItem value="intellect">Intellect</MenuItem>
                        <MenuItem value="will">Will</MenuItem>
                        <MenuItem value="" disabled>Sub Stats</MenuItem>
                        <MenuItem value="subStats">All Sub Stats</MenuItem>
                        <MenuItem value="pd">Physical Damage</MenuItem>
                        <MenuItem value="md">Magical Damage</MenuItem>
                        <MenuItem value="hp">Health Points</MenuItem>
                        <MenuItem value="init">Initiative</MenuItem>
                        <MenuItem value="crest">Crest</MenuItem>
                        <MenuItem value="acc">Accuracy</MenuItem>
                        <MenuItem value="eva">Evasion</MenuItem>
                        <MenuItem value="ivc">Invocation</MenuItem>
                        <MenuItem value="res">Resistance</MenuItem>
                        <MenuItem value="ist">Instinct</MenuItem>
                    </Select>
                </Box>
                <Box className="talent-filter-box">
                    <InputLabel id="weapon-element-label">Other Changes</InputLabel>
                    <Select
                        labelId="weapon-element-label"
                        id="weapon-other"
                        value={filter.otherIncreases}
                        sx={{ width: 300 }}
                        label="Stat Increases"
                        name="stat"
                        className="weapon-select"
                        onChange={(ev) => changeFilter(ev)}
                    >
                        <MenuItem value="*">All</MenuItem>
                        <MenuItem value="range">Range</MenuItem>
                        <MenuItem value="area">Area</MenuItem>
                        <MenuItem value="form">Form</MenuItem>
                        <MenuItem value="target">Target</MenuItem>
                        <MenuItem value="resist">Resist</MenuItem>
                        <MenuItem value="element">Element</MenuItem>
                        <MenuItem value="rank">Rank</MenuItem>
                        <MenuItem value="overflow">Overflow</MenuItem>
                        <MenuItem value="dice">Spirit Dice</MenuItem>
                    </Select>
                </Box>
                <Box className="weapon-filter-box">
                    <Box sx={{ width: 300 }}>
                        <InputLabel id="weapon-cost-label">Cost (G)</InputLabel>
                        <Input sx={{ width: 130, height: "56px" }}
                            id="weapon-cost-min"
                            type="number"
                            name="costMin"
                            value={filter.costMin}
                            onChange={(ev) => changeFilter(ev)} />
                        <RemoveIcon sx={{ position: "relative", top: "10px", marginLeft: "5px", marginRight: "5px" }} />
                        <Input sx={{ width: 130, height: "56px" }}
                            id="weapon-cost-max"
                            type="number"
                            name="costMax"
                            value={filter.costMax}
                            onChange={(ev) => changeFilter(ev)} />
                    </Box>
                </Box>
                <Box className="weapon-filter-box">
                    <Box className="talent-filter-button-box">
                        <Button className="talent-filter-button" onClick={() => doFilter()}><SearchIcon className="talent-icon-label" />Search</Button>
                        <Button className="talent-filter-button" onClick={() => clearFilter()}><ClearAllIcon className="talent-icon-label" />Clear Filter</Button>
                    </Box>
                </Box>
                <Divider sx={{ width: "100%", marginBottom: "15px" }} />
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                {
                    filteredWeapons.map((weapon, index) => {
                        if (index >= position && index < offset) {
                            return <WeaponCard key={weapon.id} data={weapon} character={character} />
                        }
                        return "";
                    })
                }
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                <Box sx={{ margin: "auto", display: "flex", flexWrap: "wrap" }}>
                    <Pagination count={Math.round(filteredWeapons.length / itemsPerPage)} page={page} onChange={handlePageChange} />
                    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                        <Typography sx={{ fontSize: "14px", marginTop: "6px", marginRight: "5px" }}>Items per page: </Typography>
                        <Input sx={{ width: "40px" }} type="number" value={itemsPerPage} onChange={(ev) => setItemsPerPage(ev.target.value)} />
                    </Box>
                </Box>

            </Box>
        </Box>
    )

}