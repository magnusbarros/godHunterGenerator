import React, { useState, useEffect } from "react";
import { Box, Breadcrumbs, Typography, Button, Link, Tab, Tabs, TextField, InputLabel, Select, MenuItem, FormControl, FormControlLabel, RadioGroup, Radio, Divider } from "@mui/material";
import "./characterEdit.css";
import CharacterJson from "../../../data/characters/characters.json";
import CoreTalents from '../../../data/talents/core.json';
import CoreAncestries from '../../../data/ancestries/ancestries.json'
import CoreFacets from '../../../data/facets/facets.json'
import CoreFacades from '../../../data/facades/facades.json'
import AddIcon from '@mui/icons-material/Add';
import DensityLargeIcon from '@mui/icons-material/DensityLarge';
import RadarChart from 'react-svg-radar-chart';
import 'react-svg-radar-chart/build/css/index.css'
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

export const CharacterEdit = (props) => {

    const [character, setCharacter] = useState();
    const [tab, setTab] = useState(0);
    const [ancestries, setAncestries] = useState();
    const [facets, setFacets] = useState();
    const [facades, setFacades] = useState();
    const [talents, setTalents] = useState();
    const [characterFacetA, setCharacterFacetA] = useState(
        {
            "id": "",
            "name": "",
            "modifiers": {
                "acc": 0,
                "eva": 0,
                "ivc": 0,
                "res": 0,
                "ist": 0,
                "pd": 0,
                "md": 0,
                "ini": 0,
                "hp": 0
            }
        }
    );
    const [characterFacetB, setCharacterFacetB] = useState(
        {
            "id": "",
            "name": "",
            "difficulty": 0,
            "description": "",
            "trait": "",
            "items": [],
            "statIncreases": {
                "strenght": 0,
                "agility": 0,
                "intellect": 0,
                "will": 0,
                "luck": 0
            }
        }
    );
    const [characterFacade, setCharacterFacade] = useState(
        {
            "id": "",
            "name": "",
            "difficulty": 0,
            "description": "",
            "trait": "",
            "items": [],
            "statIncreases": {
                "strenght": 0,
                "agility": 0,
                "intellect": 0,
                "will": 0,
                "luck": 0
            }
        }
    );
    const [loading, setLoading] = useState(true);
    const [statTotals, setStatTotals] = useState({
        strenght: 0,
        agility: 0,
        intellect: 0,
        will: 0,
        luck: 0
    });

    const emptyCharacter = {
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
    }

    useEffect(() => {
        let myCharacter = null;
        if (character === undefined) {
            let _allCharacters = JSON.parse(localStorage.getItem("kg_characters"));
            if (_allCharacters == null) {
                localStorage.setItem("kg_characters", JSON.stringify(CharacterJson));
                _allCharacters = CharacterJson;
            }
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const id = urlParams.get("id")

            _allCharacters.forEach((item) => {
                if (item.id.toString() === id) {
                    myCharacter = item;
                }
            });

            if (myCharacter === null) {
                myCharacter = emptyCharacter;
                setCharacter(emptyCharacter);
            } else {
                setCharacter(myCharacter);
            };
        }

        if (myCharacter !== null) {
            let storedTalents = localStorage.getItem("kg_talents");
            let storedAncestries = localStorage.getItem("kg_ancestries");
            let storedFacets = localStorage.getItem("kg_facets");
            let storedFacades = localStorage.getItem("kg_facades");

            if (storedTalents === null) {
                setTalents(CoreTalents);
                localStorage.setItem("kg_talents", JSON.stringify(CoreTalents));
            } else {
                setTalents(JSON.parse(storedTalents));
            }

            if (storedAncestries === null) {
                setAncestries(CoreAncestries);
                localStorage.setItem("kg_ancestries", JSON.stringify(CoreAncestries));
            } else {
                setAncestries(JSON.parse(storedAncestries));
            }

            let myFacade = null;
            if (storedFacades === null) {
                setFacades(CoreFacades);
                localStorage.setItem("kg_facades", JSON.stringify(CoreFacades));

                myFacade = CoreFacades.find(item => item.id === myCharacter.facade);
                setCharacterFacade(myFacade);
            } else {
                let parsedStoredFacades = JSON.parse(storedFacades);
                setFacades(parsedStoredFacades);
                myFacade = parsedStoredFacades.find(item => item.id === myCharacter.facade);
            }

            setStatTotals(
                {
                    strenght: myCharacter.stats.strenght + (myFacade ? myFacade.statIncreases.strenght : 0) + myCharacter.stats.otherIncreases.strenght,
                    agility: myCharacter.stats.agility + (myFacade ? myFacade.statIncreases.agility : 0) + myCharacter.stats.otherIncreases.agility,
                    intellect: myCharacter.stats.intellect + (myFacade ? myFacade.statIncreases.intellect : 0) + myCharacter.stats.otherIncreases.intellect,
                    will: myCharacter.stats.will + (myFacade ? myFacade.statIncreases.will : 0) + myCharacter.stats.otherIncreases.will,
                    luck: myCharacter.stats.luck + (myFacade ? myFacade.statIncreases.luck : 0) + myCharacter.stats.otherIncreases.luck
                }
            );

            if (storedFacets === null) {
                setFacets(CoreFacets);
                localStorage.setItem("kg_facets", JSON.stringify(CoreFacets));
                setCharacterFacetA(CoreFacets.find(item => item.id === myCharacter.facetA));
                setCharacterFacetB(CoreFacets.find(item => item.id === myCharacter.facetB));
            } else {
                let parsedFacets = JSON.parse(storedFacets);
                setFacets(parsedFacets);
                setCharacterFacetA(parsedFacets.find(item => item.id === myCharacter.facetA));
                setCharacterFacetB(parsedFacets.find(item => item.id === myCharacter.facetB));
            }
        }

        setLoading(false);
    }, [])

    function tabProps(index) {
        return {
            id: `character-tab-${index}`,
            'aria-controls': `character-tabpanel-${index}`,
        };
    }

    const handleTabSwitch = (ev, newTab) => {
        setTab(newTab);
    };

    const changeFacetType = (ev, value, facet) => {
        if (facet === 1) {
            character.facetAType = value;
        } else character.facetBType = value;
        setCharacter(character)
    }

    const changeValue = (ev, prefix, params) => {
        const { name, value } = ev.target;
        if (prefix !== undefined) {
            if (params !== undefined) {
                if (prefix === "otherIncreases") {
                    let _number = value;
                    if (isNaN(parseInt(value)))
                        _number = 0;
                    character["stats"][prefix][params] = value;
                    statTotals[params] = parseInt(character["stats"][params]) + parseInt(characterFacade["statIncreases"][params]) + parseInt(_number);
                    setStatTotals({ ...statTotals })
                } else if (prefix === "subIncreases") {
                    character["substats"][prefix][params] = value;
                }
            } else {
                if (prefix === "stats" || prefix === "substats") {
                    let _number = value;
                    if (isNaN(parseInt(value)))
                        _number = 0;
                    character[prefix][name] = _number;
                } else character[prefix][name] = value;
            }
        } else {
            if (name === "facade") {
                let myFacade = facades.find(item => item.id === value);
                setCharacterFacade(myFacade);
                setStatTotals({
                    strenght: character.stats.strenght + myFacade.statIncreases.strenght,
                    agility: character.stats.agility + myFacade.statIncreases.agility,
                    intellect: character.stats.intellect + myFacade.statIncreases.intellect,
                    will: character.stats.will + myFacade.statIncreases.will,
                    luck: character.stats.luck + myFacade.statIncreases.intellect
                });
            }
            character[name] = value;
        }
        setCharacter({ ...character })
    }

    const renderChart = () => {

        let stats = statTotals;
        let statList = [stats.strenght, stats.agility, stats.intellect, stats.will, stats.luck];
        let biggestStat = Math.max(...statList);

        let data = [
            {
                data: {
                    strenght: stats.strenght !== 0 ? (stats.strenght / biggestStat) : 0,
                    agility: stats.agility !== 0 ? (stats.agility / biggestStat) : 0,
                    intellect: stats.intellect !== 0 ? (stats.intellect / biggestStat) : 0,
                    will: stats.will !== 0 ? (stats.will / biggestStat) : 0,
                    luck: stats.luck !== 0 ? (stats.luck / biggestStat) : 0
                },
                meta: { color: '#0e8a85' }
            }
        ]

        return (
            <RadarChart
                captions={{
                    strenght: 'Strenght (' + stats.strenght + ')',
                    agility: 'Agility (' + stats.agility + ')',
                    intellect: 'Intellect (' + stats.intellect + ')',
                    will: 'Will (' + stats.will + ')',
                    luck: 'Luck (' + stats.luck + ')'
                }}
                data={data}
                size={450}
            />
        )
    }

    return (
        <>{loading ? "Loading..." :
            <Box className="character-edit-page">
                <Box className="breadcrumb-box">
                    <Breadcrumbs>
                        <Typography color={'text.secondary'}>
                            Main Menu
                        </Typography>
                        <Link href="/characters" underlink="hover" color="inherit">
                            Characters
                        </Link>
                        <Typography color={'text.primary'}>
                            {character.id === 0 ? "New Character" : "Edit Character"}
                        </Typography>
                    </Breadcrumbs>
                </Box>

                <Box sx={{ borderBottom: 1, borderColor: 'divider' }} >
                    <Tabs value={tab} onChange={handleTabSwitch} aria-label="Character Sheet">
                        <Tab sx={{ color: "#0e8a85" }} label="Main Info" {...tabProps(0)} />
                        <Tab sx={{ color: "#0e8a85" }} label="Stas & Spirit" {...tabProps(1)} />
                        <Tab sx={{ color: "#0e8a85" }} label="Talents" {...tabProps(2)} />
                        <Tab sx={{ color: "#0e8a85" }} label="Equipment" {...tabProps(3)} />
                    </Tabs>
                </Box>
                <TabPanel value={tab} index={0}>
                    <Box className="main-info">
                        <Box className="basic-info">
                            <TextField className="info-text" label="Name" name="name" onChange={ev => changeValue(ev)} defaultValue={character.name} />
                            <TextField className="info-text" label="Faction" name="faction" onChange={ev => changeValue(ev)} defaultValue={character.faction} />
                            <Box id="facet-select-box" className="facet-box">
                                <InputLabel id="facet-label">Main Facet</InputLabel>
                                <Select
                                    labelId="facet-label"
                                    id="facet-select-a"
                                    name="facetA"
                                    value={character.facetA}
                                    className="facet-select"
                                    onChange={(event) => changeValue(event)}
                                >
                                    <MenuItem value={0}>All</MenuItem>
                                    {
                                        facets.map((item) => {
                                            return <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                                        })
                                    }
                                </Select>
                                <FormControl>
                                    <RadioGroup
                                        row
                                        className="select-facet-type"
                                        defaultValue={character.facetAType}
                                        onChange={(ev, value) => changeFacetType(ev, value, 1)}
                                    >
                                        <FormControlLabel value={1} control={<Radio />} label="α" />
                                        <FormControlLabel value={2} control={<Radio />} label="β" />
                                    </RadioGroup>
                                </FormControl>
                            </Box>
                            <Box id="facet-select-box" className="facet-box">
                                <InputLabel id="facet-label">Second Facet</InputLabel>
                                <Select
                                    labelId="facet-label"
                                    id="facet-select-b"
                                    name="facetB"
                                    value={character.facetB}
                                    className="facet-select"
                                    onChange={(event, value) => changeValue(event)}
                                >
                                    {
                                        facets.map((item) => {
                                            return <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                                        })
                                    }
                                </Select>
                                <FormControl>
                                    <RadioGroup
                                        row
                                        className="select-facet-type"
                                        defaultValue={character.facetBType}
                                        onChange={(ev, value) => changeFacetType(ev, value, 2)}
                                    >
                                        <FormControlLabel value={1} control={<Radio />} label="α" />
                                        <FormControlLabel value={2} control={<Radio />} label="β" />
                                    </RadioGroup>
                                </FormControl>
                            </Box>
                            <Box id="ancestry-select-box" className="facet-box">
                                <InputLabel id="ancestry-label">Ancestry</InputLabel>
                                <Select
                                    labelId="ancestry-label"
                                    id="ancestry-select"
                                    name="ancestry"
                                    value={character.ancestry}
                                    className="facet-select"
                                    onChange={(event) => changeValue(event)}
                                >
                                    {
                                        ancestries.map((item) => {
                                            return <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                                        })
                                    }
                                </Select>
                            </Box>
                            <Box id="facade-select-box" className="facet-box">
                                <InputLabel id="facade-label">Facade</InputLabel>
                                <Select
                                    labelId="facade-label"
                                    id="facade-select"
                                    name="facade"
                                    value={character.facade}
                                    className="facet-select"
                                    onChange={(event) => changeValue(event)}
                                >
                                    {
                                        facades.map((item) => {
                                            return <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                                        })
                                    }
                                </Select>
                            </Box>
                        </Box>
                        <Box className="more-info">
                            <TextField className="info-text" label="Age" name="age" onChange={ev => changeValue(ev, "info")} defaultValue={character.info.age} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                            <TextField className="info-text" label="Gender" name="gender" onChange={ev => changeValue(ev, "info")} defaultValue={character.info.gender} />
                            <TextField className="info-text" label="Height" name="height" onChange={ev => changeValue(ev, "info")} defaultValue={character.info.height} />
                            <TextField className="info-text" label="Weight" name="weight" onChange={ev => changeValue(ev, "info")} defaultValue={character.info.weight} />
                            <TextField className="info-text" label="Hair" name="hair" onChange={ev => changeValue(ev, "info")} defaultValue={character.info.hair} />
                            <TextField className="info-text" label="Eyes" name="eye" onChange={ev => changeValue(ev, "info")} defaultValue={character.info.eye} />
                            <TextField className="info-text" label="Skin" name="skin" onChange={ev => changeValue(ev, "info")} defaultValue={character.info.skin} />
                            <Box className="info-textbox">
                                <TextField multiline fullWidth label="Goals" name="goals" onChange={ev => changeValue(ev, "info")} defaultValue={character.info.goals} />
                            </Box>
                            <Box className="info-textbox">
                                <TextField multiline fullWidth label="Description" name="description" onChange={ev => changeValue(ev, "info")} defaultValue={character.info.description} />
                            </Box>
                            <Box className="info-textbox">
                                <TextField multiline fullWidth label="Personality" name="personality" onChange={ev => changeValue(ev, "info")} defaultValue={character.info.personality} />
                            </Box>
                        </Box>
                    </Box>
                </TabPanel>
                <TabPanel value={tab} index={1}>
                    <Box className="stats-spirit">
                        <Typography variant="h4">Main Stats</Typography>
                        <Box className="main-stat-wrapper">
                            <Box className="main-stats">
                                <Box className="str-row">
                                    <InputLabel htmlFor="total-strenght" >Strenght</InputLabel>
                                    <TextField
                                        id="total-strenght"
                                        disabled
                                        value={statTotals.strenght} />
                                    <DensityLargeIcon className="stat-equation-icon" />
                                    <TextField
                                        label="Strenght"
                                        name="strenght"
                                        className="stat-value"
                                        onChange={ev => changeValue(ev, "stats")}
                                        value={character.stats.strenght}
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                                    <AddIcon className="stat-equation-icon" />
                                    <TextField
                                        disabled
                                        className="stat-value"
                                        label="Facade"
                                        value={characterFacade.statIncreases.strenght} />
                                    <AddIcon className="stat-equation-icon" />
                                    <TextField
                                        disabled
                                        className="stat-value"
                                        label="Talents"
                                        value={0} />
                                    <AddIcon className="stat-equation-icon" />
                                    <TextField
                                        disabled
                                        className="stat-value"
                                        label="Items"
                                        value={0} />
                                    <AddIcon className="stat-equation-icon" />
                                    <TextField
                                        className="stat-value"
                                        label="Others"
                                        value={character.stats.otherIncreases.strenght}
                                        onChange={ev => changeValue(ev, "otherIncreases", "strenght")} />
                                </Box>
                                <Box className="agi-row">
                                    <InputLabel htmlFor="total-agility" >Agility</InputLabel>
                                    <TextField
                                        id="total-agility"
                                        disabled
                                        value={statTotals.agility} />
                                    <DensityLargeIcon className="stat-equation-icon" />
                                    <TextField
                                        label="Agility"
                                        name="agility"
                                        className="stat-value"
                                        onChange={ev => changeValue(ev, "stats")}
                                        value={character.stats.agility}
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                                    <AddIcon className="stat-equation-icon" />
                                    <TextField
                                        disabled
                                        className="stat-value"
                                        label="Facade"
                                        value={characterFacade.statIncreases.agility} />
                                    <AddIcon className="stat-equation-icon" />
                                    <TextField
                                        disabled
                                        className="stat-value"
                                        label="Talents"
                                        value={0} />
                                    <AddIcon className="stat-equation-icon" />
                                    <TextField
                                        disabled
                                        className="stat-value"
                                        label="Items"
                                        value={0} />
                                    <AddIcon className="stat-equation-icon" />
                                    <TextField
                                        className="stat-value"
                                        label="Others"
                                        value={character.stats.otherIncreases.agility}
                                        onChange={ev => changeValue(ev, "otherIncreases", "agility")} />
                                </Box>
                                <Box className="int-row">
                                    <InputLabel htmlFor="total-intellect" >Intellet</InputLabel>
                                    <TextField
                                        id="total-intellect"
                                        disabled
                                        value={statTotals.intellect} />
                                    <DensityLargeIcon className="stat-equation-icon" />
                                    <TextField
                                        label="Intellect"
                                        name="intellect"
                                        className="stat-value"
                                        onChange={ev => changeValue(ev, "stats")}
                                        value={character.stats.intellect}
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                                    <AddIcon className="stat-equation-icon" />
                                    <TextField
                                        disabled
                                        className="stat-value"
                                        label="Facade"
                                        value={characterFacade.statIncreases.intellect} />
                                    <AddIcon className="stat-equation-icon" />
                                    <TextField
                                        disabled
                                        className="stat-value"
                                        label="Talents"
                                        value={0} />
                                    <AddIcon className="stat-equation-icon" />
                                    <TextField
                                        disabled
                                        className="stat-value"
                                        label="Items"
                                        value={0} />
                                    <AddIcon className="stat-equation-icon" />
                                    <TextField
                                        className="stat-value"
                                        label="Others"
                                        value={character.stats.otherIncreases.intellect}
                                        onChange={ev => changeValue(ev, "otherIncreases", "intellect")} />
                                </Box>
                                <Box className="will-row">
                                    <InputLabel htmlFor="total-will" >Will</InputLabel>
                                    <TextField
                                        id="total-will"
                                        disabled
                                        value={statTotals.will} />
                                    <DensityLargeIcon className="stat-equation-icon" />
                                    <TextField
                                        label="Will"
                                        name="will"
                                        className="stat-value"
                                        onChange={ev => changeValue(ev, "stats")}
                                        value={character.stats.will}
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                                    <AddIcon className="stat-equation-icon" />
                                    <TextField
                                        disabled
                                        className="stat-value"
                                        label="Facade"
                                        value={characterFacade.statIncreases.will} />
                                    <AddIcon className="stat-equation-icon" />
                                    <TextField
                                        disabled
                                        className="stat-value"
                                        label="Talents"
                                        value={0} />
                                    <AddIcon className="stat-equation-icon" />
                                    <TextField
                                        disabled
                                        className="stat-value"
                                        label="Items"
                                        value={0} />
                                    <AddIcon className="stat-equation-icon" />
                                    <TextField
                                        className="stat-value"
                                        label="Others"
                                        value={character.stats.otherIncreases.will}
                                        onChange={ev => changeValue(ev, "otherIncreases", "will")} />
                                </Box>
                                <Box className="luck-row">
                                    <InputLabel htmlFor="total-luck" >Luck</InputLabel>
                                    <TextField
                                        id="total-luck"
                                        disabled
                                        value={statTotals.luck} />
                                    <DensityLargeIcon className="stat-equation-icon" />
                                    <TextField
                                        label="Luck"
                                        name="luck"
                                        className="stat-value"
                                        onChange={ev => changeValue(ev, "stats")}
                                        value={character.stats.luck}
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                                    <AddIcon className="stat-equation-icon" />
                                    <TextField
                                        disabled
                                        className="stat-value"
                                        label="Facade"
                                        value={characterFacade.statIncreases.luck} />
                                    <AddIcon className="stat-equation-icon" />
                                    <TextField
                                        disabled
                                        className="stat-value"
                                        label="Talents"
                                        value={0} />
                                    <AddIcon className="stat-equation-icon" />
                                    <TextField
                                        disabled
                                        className="stat-value"
                                        label="Items"
                                        value={0} />
                                    <AddIcon className="stat-equation-icon" />
                                    <TextField
                                        className="stat-value"
                                        label="Others"
                                        value={character.stats.otherIncreases.luck}
                                        onChange={ev => changeValue(ev, "otherIncreases", "luck")} />
                                </Box>
                            </Box>
                            <Box className="stat-graph">
                                {
                                    renderChart()
                                }
                            </Box>
                        </Box>
                    </Box>
                    <Typography variant="h4" sx={{ marginTop: "5px" }}>Sub Stats</Typography>
                    <Box className="sub-stats">
                        <Box className="sub-stat-wrapper">
                            <Box className="main-stat-subs">
                                <Box className="substat-row">
                                    <TextField
                                        label="Total Accuracy"
                                        name="totalAccuracy"
                                        className="substat-value"
                                        disabled
                                        value={statTotals.strenght + characterFacetA.modifiers.acc}
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                                    <DensityLargeIcon className="stat-equation-icon" />
                                    <TextField
                                        label="Total Strenght"
                                        name="totalStrenght"
                                        className="substat-value"
                                        disabled
                                        value={statTotals.strenght}
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                                    <AddIcon className="stat-equation-icon" />
                                    <TextField
                                        label="Main Facet"
                                        name="facadeBonus"
                                        className="substat-value"
                                        disabled
                                        value={characterFacetA.modifiers.acc}
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                                    <AddIcon className="stat-equation-icon" />
                                    <TextField
                                        className="substat-value"
                                        label="Others"
                                        value={character.substats.subIncreases.acc}
                                        onChange={ev => changeValue(ev, "subIncreases", "acc")} />
                                </Box>
                                <Box className="substat-row">
                                    <TextField
                                        label="Total Evasion"
                                        name="totalEvasion"
                                        className="substat-value"
                                        disabled
                                        value={statTotals.agility + characterFacetA.modifiers.eva}
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                                    <DensityLargeIcon className="stat-equation-icon" />
                                    <TextField
                                        label="Total Agility"
                                        name="totalStrenght"
                                        className="substat-value"
                                        disabled
                                        value={statTotals.agility}
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                                    <AddIcon className="stat-equation-icon" />
                                    <TextField
                                        label="Main Facet"
                                        name="facadeBonus"
                                        className="substat-value"
                                        disabled
                                        value={characterFacetA.modifiers.eva}
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                                    <AddIcon className="stat-equation-icon" />
                                    <TextField
                                        className="substat-value"
                                        label="Others"
                                        value={character.substats.subIncreases.eva}
                                        onChange={ev => changeValue(ev, "subIncreases", "eva")} />
                                </Box>
                                <Box className="substat-row">
                                    <TextField
                                        label="Total Invocation"
                                        name="totalInvocation"
                                        className="substat-value"
                                        disabled
                                        value={statTotals.intellect + characterFacetA.modifiers.ivc}
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                                    <DensityLargeIcon className="stat-equation-icon" />
                                    <TextField
                                        label="Total Intellect"
                                        name="totalStrenght"
                                        className="substat-value"
                                        disabled
                                        value={statTotals.agility}
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                                    <AddIcon className="stat-equation-icon" />
                                    <TextField
                                        label="Main Facet"
                                        name="facadeBonus"
                                        className="substat-value"
                                        disabled
                                        value={characterFacetA.modifiers.ivc}
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                                    <AddIcon className="stat-equation-icon" />
                                    <TextField
                                        className="substat-value"
                                        label="Others"
                                        value={character.substats.subIncreases.ivc}
                                        onChange={ev => changeValue(ev, "subIncreases", "ivc")} />
                                </Box>
                                <Box className="substat-row">
                                    <TextField
                                        label="Total Resistance"
                                        name="totalResist"
                                        className="substat-value"
                                        disabled
                                        value={statTotals.will + characterFacetA.modifiers.res}
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                                    <DensityLargeIcon className="stat-equation-icon" />
                                    <TextField
                                        label="Total Will"
                                        name="totalStrenght"
                                        className="substat-value"
                                        disabled
                                        value={statTotals.will}
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                                    <AddIcon className="stat-equation-icon" />
                                    <TextField
                                        label="Main Facet"
                                        name="facadeBonus"
                                        className="substat-value"
                                        disabled
                                        value={characterFacetA.modifiers.res}
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                                    <AddIcon className="stat-equation-icon" />
                                    <TextField
                                        className="substat-value"
                                        label="Others"
                                        value={character.substats.subIncreases.res}
                                        onChange={ev => changeValue(ev, "subIncreases", "res")} />
                                </Box>
                                <Box className="substat-row">
                                    <TextField
                                        label="Total Insight"
                                        name="totalResist"
                                        className="substat-value"
                                        disabled
                                        value={statTotals.luck + characterFacetA.modifiers.ist}
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                                    <DensityLargeIcon className="stat-equation-icon" />
                                    <TextField
                                        label="Total Luck"
                                        name="totalStrenght"
                                        className="substat-value"
                                        disabled
                                        value={statTotals.luck}
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                                    <AddIcon className="stat-equation-icon" />
                                    <TextField
                                        label="Main Facet"
                                        name="facadeBonus"
                                        className="substat-value"
                                        disabled
                                        value={characterFacetA.modifiers.ist}
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                                    <AddIcon className="stat-equation-icon" />
                                    <TextField
                                        className="substat-value"
                                        label="Others"
                                        value={character.substats.subIncreases.ist}
                                        onChange={ev => changeValue(ev, "subIncreases", "ist")} />
                                </Box>
                            </Box>
                            <Box className="sub-stat-subs">
                                <Box className="substat-row">
                                    <TextField
                                        label="Physical Damage"
                                        name="physDmg"
                                        className="substat-value"
                                        disabled
                                        value={characterFacetA.modifiers.pd +
                                            parseInt(character.substats.subIncreases.pd) +
                                            (Math.round(statTotals.strenght / 2))}
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                                    <DensityLargeIcon className="stat-equation-icon" />
                                    <TextField
                                        label="Total Strenght ÷ 2"
                                        name="totalStrenght"
                                        className="substat-value"
                                        disabled
                                        value={(Math.round(statTotals.strenght / 2))}
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                                    <AddIcon className="stat-equation-icon" />
                                    <TextField
                                        label="PD Bonus"
                                        name="facadeBonus"
                                        className="substat-value"
                                        disabled
                                        value={characterFacetA.modifiers.pd}
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                                    <AddIcon className="stat-equation-icon" />
                                    <TextField
                                        className="stat-value"
                                        label="Others"
                                        value={character.substats.subIncreases.pd}
                                        onChange={ev => changeValue(ev, "subIncreases", "pd")} />
                                </Box>
                                <Box className="substat-row">
                                    <TextField
                                        label="Magical Damage"
                                        name="magicDmg"
                                        className="substat-value"
                                        disabled
                                        value={characterFacetA.modifiers.md +
                                            (Math.round(statTotals.intellect / 2)) +
                                            parseInt(character.substats.subIncreases.md)}
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                                    <DensityLargeIcon className="stat-equation-icon" />
                                    <TextField
                                        label="Total Intellect ÷ 2"
                                        name="totalStrenght"
                                        className="substat-value"
                                        disabled
                                        value={(Math.round(statTotals.intellect / 2))}
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                                    <AddIcon className="stat-equation-icon" />
                                    <TextField
                                        label="MD Bonus"
                                        name="facadeBonus"
                                        className="substat-value"
                                        disabled
                                        value={characterFacetA.modifiers.md}
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                                    <AddIcon className="stat-equation-icon" />
                                    <TextField
                                        className="stat-value"
                                        label="Others"
                                        value={character.substats.subIncreases.md}
                                        onChange={ev => changeValue(ev, "subIncreases", "md")} />

                                </Box>
                                <Box className="substat-row">
                                    <TextField
                                        label="Initiative"
                                        name="init"
                                        className="substat-value"
                                        disabled
                                        value={characterFacetA.modifiers.ini +
                                            (statTotals.agility + 5) +
                                            parseInt(character.substats.subIncreases.init)}
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                                    <DensityLargeIcon className="stat-equation-icon" />
                                    <TextField
                                        label="Total Agility + 5"
                                        name="totalStrenght"
                                        className="substat-value"
                                        disabled
                                        value={statTotals.agility + 5}
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                                    <AddIcon className="stat-equation-icon" />
                                    <TextField
                                        label="Init. Bonus"
                                        name="facadeBonus"
                                        className="substat-value"
                                        disabled
                                        value={characterFacetA.modifiers.ini}
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                                    <AddIcon className="stat-equation-icon" />
                                    <TextField
                                        className="stat-value"
                                        label="Others"
                                        value={character.substats.subIncreases.init}
                                        onChange={ev => changeValue(ev, "subIncreases", "init")} />
                                </Box>
                                <Box className="substat-row">
                                    <TextField
                                        label="Health Points"
                                        name="hp"
                                        className="substat-value"
                                        disabled
                                        value={characterFacetA.modifiers.hp +
                                            (statTotals.strenght + statTotals.will + (character.level * 3)) +
                                            parseInt(character.substats.subIncreases.hp)}
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                                    <DensityLargeIcon className="stat-equation-icon" />
                                    <TextField
                                        label="Total Strenght"
                                        name="totalStrenght"
                                        className="substat-value"
                                        disabled
                                        value={statTotals.strenght}
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                                    <AddIcon className="stat-equation-icon" />
                                    <TextField
                                        label="Total Will"
                                        name="totalWill"
                                        className="substat-value"
                                        disabled
                                        value={statTotals.will}
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                                    <AddIcon className="stat-equation-icon" />
                                    <TextField
                                        label="Level x 3"
                                        name="totalWill"
                                        className="substat-value"
                                        disabled
                                        value={character.level * 3}
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                                    <AddIcon className="stat-equation-icon" />
                                    <TextField
                                        label="HP Bonus"
                                        name="facadeBonus"
                                        className="substat-value"
                                        disabled
                                        value={characterFacetA.modifiers.hp}
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                                    <AddIcon className="stat-equation-icon" />
                                    <TextField
                                        className="substat-value"
                                        label="Others"
                                        value={character.substats.subIncreases.hp}
                                        onChange={ev => changeValue(ev, "subIncreases", "hp")}
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </TabPanel>
                <TabPanel value={tab} index={2}>
                    Coming Soon...
                </TabPanel>
                <TabPanel value={tab} index={3}>
                    Coming Soon...
                </TabPanel>
            </Box >
        }</>)
}

export default CharacterEdit