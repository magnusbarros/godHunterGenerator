import React, { useEffect, useState } from "react";
import './talentList.css';
import { Box, Tooltip } from "@mui/material";
import TalentCard from "../talentCard/TalentCard";
import { Typography, Card, Button, Select, InputLabel, MenuItem, Checkbox, FormGroup, FormControlLabel } from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import CasinoIcon from '@mui/icons-material/Casino';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import NotesIcon from '@mui/icons-material/Notes';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import HelpIcon from '@mui/icons-material/Help';
import SearchIcon from '@mui/icons-material/Search';
import ClearAllIcon from '@mui/icons-material/ClearAll';

import CoreTalents from '../../../data/talents/core.json';
import { Cost, Timing, Range, Origin, Facet, Ancestry, Damage_Type } from "../../../data/constants/TalentConstants";

export const TalentList = (props) => {

    const [talents, setTalents] = useState()
    const [talentList, setTalentList] = useState();
    const [talentNames, setTalentNames] = useState(['']);
    const [timing, setTiming] = useState("*");
    const [range, setRange] = useState("*");
    const [name, setName] = useState("");
    const [squares, setSquares] = useState(null);
    const [loading, setLoading] = useState(true);
    const [facet, setFacet] = useState(false);
    const [ancestry, setAncestry] = useState(false);
    const [selectedFacet, setSelectedFacet] = useState(0);
    const [selectedAncestry, setSelectedAncestry] = useState(0);
    const [damageType, setDamageType] = useState("*");
    const [diceInput, setDiceInput] = useState("");
    const [selectedDice, setSelectedDice] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        try {
            setTalents(CoreTalents);
            setTalentList(CoreTalents);
            loadNames(CoreTalents);
            setLoading(false);
        } catch (error) {
            console.log("Error loading talents", error);
        }
    };

    const loadNames = (data) => {
        const _talentNames = [];
        data.forEach((item) => {
            _talentNames.push(item.name);
        })
        setTalentNames(_talentNames);
    }

    const changeFilter = (ev, value, inputId) => {
        switch (inputId) {
            case "talent-name":
                console.log(value)
                setName(value);
                break;
            case "talent-timing":
                setTiming(value.props.value);
                break;
            case "talent-range":
                setRange(value.props.value);
                if (value.props.value === "s") {
                    document.getElementById('range-squares-box').classList.remove('disabled');
                } else {
                    document.getElementById('range-squares-box').classList.add('disabled');
                }
                break;
            case "talent-range-squares":
                setSquares(value);
                break;
            case "talent-ancestry":
                setAncestry(value);
                if (value) {
                    document.getElementById('talent-ancestry-select-box').classList.remove('disabled');
                } else {
                    document.getElementById('talent-ancestry-select-box').classList.add('disabled');
                }
                break;
            case "talent-facet":
                setFacet(value);
                if (value) {
                    document.getElementById('talent-facet-select-box').classList.remove('disabled');
                } else {
                    document.getElementById('talent-facet-select-box').classList.add('disabled');
                }
                break;
            case "talent-facet-select":
                setSelectedFacet(value.props.value);
                break;
            case "talent-ancestry-select":
                setSelectedAncestry(value.props.value);
                break;
            case "talent-damage":
                setDamageType(value.props.value);
                break;
            case "talent-dice":
                let inputDice = ev.target.value.replaceAll(" ", "").toLowerCase().split(",");
                if (inputDice.length !== 0) {
                    let _selectedDie = []
                    inputDice.forEach(die => {
                        switch (die) {
                            case "odd":
                            case "odds":
                            case "o":
                                _selectedDie.push("o");
                                break;
                            case "even":
                            case "evens":
                            case "e":
                                _selectedDie.push("e");
                                break;
                            case "1":
                            case "2":
                            case "3":
                            case "4":
                            case "5":
                            case "6":
                                _selectedDie.push(die)
                                break;
                        }
                    })
                    setSelectedDice(_selectedDie);
                } else setSelectedDice([]);

                setDiceInput(ev.target.value);
                break;
            default:
                break;
        }
    }

    function arraysMatch(arr1, arr2) {
        if (arr1.length !== arr2.length) {
            return false;
        }

        return arr1.every((item, index) => item === arr2[index]);
    }

    const filterOptions = (item) => {
        let filterName = true;
        let filterTiming = true;
        let filterRange = true;
        let filterSquare = true;
        let filterFacet = true;
        let filterAncestry = true;
        let filterDamageType = true;
        let filterDice = true;

        //Name
        if (name !== "" && name !== null) {
            if (item.name.toLowerCase().includes(name.toLowerCase())) {
                filterName = true;
            } else filterName = false;
        }

        //Timing
        if (timing !== "*" && timing !== null) {
            if (item.timing.toLowerCase().includes(timing.toLowerCase())) {
                filterTiming = true;
            } else filterTiming = false;
        }

        //Range
        if (range !== "*" && range !== null) {
            if (item.range.toLowerCase().includes(range.toLowerCase())) {
                filterRange = true;
            } else filterRange = false;
        }

        if (item.squares !== null && item.squares !== "") {
            if (item.squares === squares) {
                filterSquare = true;
            } else filterSquare = false;
        }

        //Facet and/or Ancestry
        if (facet) {
            if (item.source === selectedFacet) {
                filterFacet = true;
            } else if (selectedFacet === 0) {
                filterFacet = true;
            } else filterFacet = false;
        } else if (!facet && ancestry && item.origin === Origin.FACET) {
            filterFacet = false;
        }

        if (ancestry) {
            if (item.source === selectedAncestry) {
                filterAncestry = true;
            } else if (selectedAncestry === 0) {
                filterAncestry = true;
            } else filterAncestry = false;
        } else if (!ancestry && facet && item.origin === Origin.ANCESTRY) {
            filterFacet = false;
        }

        //Damage Type
        if (damageType !== "*"
            && (item.damageTypes !== undefined
                || item.damageTypes !== null
                || item.damageTypes.length === 0)) {
            if (item.damageTypes.filter(dmg => dmg === damageType).length === 0) {
                filterDamageType = false;
            }
        }

        //Spirit Dice
        if (selectedDice.length !== 0) {
            if (arraysMatch(selectedDice, item.cost)) {
                filterDice = true;
            } else filterDice = false;
        }

        //End
        return filterName &&
            filterTiming &&
            filterRange &&
            filterSquare &&
            filterFacet &&
            filterAncestry &&
            filterDamageType &&
            filterDice;
    }

    const filter = () => {
        const newTalentList = talents.filter(filterOptions);
        setTalentList(newTalentList);
    }

    const clearFilter = () => {
        setName("");
        setRange("*");
        setSquares();
        setTiming("*");
        setTalentList(talents);
        setSquares(null);
        setFacet(false);
        setAncestry(false);
        setSelectedAncestry(0);
        setSelectedFacet(0);
        setDamageType("*");
        setSelectedDice([]);
        setDiceInput("");
        document.getElementById('talent-facet-select-box').classList.add('disabled');
        document.getElementById('talent-ancestry-select-box').classList.add('disabled');
    }

    const renderCards = (list) => {
        return (
            list.map((item) => (
                <TalentCard talent={item} key={'card-' + item.id} />
            ))
        )
    }

    const closeExplanationCard = (ev) => {
        document.getElementById('explanationCard').classList.add('disabled');
        document.getElementById('help').classList.remove('disabled');
    }

    const openExplanationCard = (ev) => {
        document.getElementById('explanationCard').classList.remove('disabled');
        document.getElementById('help').classList.add('disabled');
    }

    return (
        <Box className="talent-list">
            <Card id="explanationCard" className="explanation-card">
                <Box className="inner-explanation-card">
                    <Button variant="text" className="closeBtn" onClick={closeExplanationCard}><CloseIcon /></Button>
                    <Typography color={'text.primary'}>Explanation:</Typography>
                    <Typography color={'text.secondary'}><AccessTimeIcon className="talent-icon" /> Timing: A resource that represents the window in wich you can perform the action. (Core Rulebook, Pg 174)</Typography>
                    <Typography color={'text.secondary'}><TrackChangesIcon className="talent-icon" /> Range: The distance out to wich the target can be activated. (Core Rulebook, Pg 175) </Typography>
                    <Typography color={'text.secondary'}><CasinoIcon className="talent-icon" />Cost: The value and amount of spirit dice required to activate the talent. (Core Rulebook, Pg 71) </Typography>
                    <Typography color={'text.secondary'}><AnnouncementIcon className="talent-icon" />Effect: A detailed explanation of what the talent does in game. (Core Rulebook, Pg 72)</Typography>
                    <Typography color={'text.secondary'}><NotesIcon className="talent-icon" />Description: Flavor text to describe what an attack looks like. Does not necessarily represent the effect. (Core Rulebook, Pg 71) </Typography>
                </Box>
            </Card>
            <Button variant="text" id="help" className="helpBtn disabled" onClick={openExplanationCard}>
                <HelpIcon />
            </Button>
            <Box className="talent-filter">
                <Box className="talent-filter-box">
                    <InputLabel id="talent-name-label" className="talent-name">Name</InputLabel>
                    <Autocomplete
                        freeSolo
                        id="talent-name"
                        options={talentNames}
                        sx={{ width: 300 }}
                        value={name}
                        renderInput={(params) => <TextField {...params} />}
                        onInputChange={(event, value) => changeFilter(event, value, "talent-name")}
                    />
                </Box>
                <Box className="talent-filter-box">
                    <InputLabel id="talent-timing-label"><AccessTimeIcon className="talent-icon-label" /> Timing</InputLabel>
                    <Select
                        labelId="talent-timing-label"
                        id="talent-timing"
                        value={timing}
                        label="Timing"
                        className="talent-select"
                        onChange={(event, value) => changeFilter(event, value, "talent-timing")}
                    >
                        <MenuItem value="*">All</MenuItem>
                        <MenuItem value={Timing.START}>Start</MenuItem>
                        <MenuItem value={Timing.PREP}>Prep</MenuItem>
                        <MenuItem value={Timing.ATTACK}>Attack</MenuItem>
                        <MenuItem value={Timing.DEFENSE}>Defense</MenuItem>
                        <MenuItem value={Timing.END}>End</MenuItem>
                        <MenuItem value={Timing.CONSTANT}>Constant</MenuItem>
                        <MenuItem value={Timing.FREE}>Free</MenuItem>
                        <MenuItem value={Timing.UNIQUE}>Unique</MenuItem>
                        <MenuItem value={Timing.OTHER}>Other</MenuItem>
                    </Select>
                </Box>
                <Box className="talent-filter-box">
                    <InputLabel id="talent-range-label"><TrackChangesIcon className="talent-icon-label" /> Range</InputLabel>
                    <Select
                        labelId="talent-range-label"
                        id="talent-range"
                        value={range}
                        label="Range"
                        className="talent-select"
                        onChange={(event, value) => changeFilter(event, value, "talent-range")}
                    >
                        <MenuItem value="*">All</MenuItem>
                        <MenuItem value={Range.USER}>User</MenuItem>
                        <MenuItem value={Range.ENGAGED}>Engaged</MenuItem>
                        <MenuItem value={Range.SQUARE}>Square</MenuItem>
                        <MenuItem value={Range.CHARGE}>Charge</MenuItem>
                        <MenuItem value={Range.COMBAT_ZONE}>Combat Zone</MenuItem>
                        <MenuItem value={Range.ITEM}>Item</MenuItem>
                        <MenuItem value={Range.OTHER}>Other</MenuItem>
                    </Select>
                </Box>
                <Box className="talent-filter-box disabled" id="range-squares-box">
                    <InputLabel id="talent-range-squares-label">Squares</InputLabel>
                    <TextField
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        onChange={(event, value) => changeFilter(event, value, "talent-range-squares")}
                    />
                </Box>
                <Box className="talent-filter-box">
                    <InputLabel id="talent-damage-label">Damage Type</InputLabel>
                    <Select
                        labelId="talent-damage-label"
                        id="talent-damage"
                        value={damageType}
                        label="Damage Type"
                        className="talent-select"
                        onChange={(event, value) => changeFilter(event, value, "talent-damage")}
                    >
                        <MenuItem value="*">All</MenuItem>
                        <MenuItem value={Damage_Type.MAGIC}>Magic Damage</MenuItem>
                        <MenuItem value={Damage_Type.MELEE}>Meelee Physical Damage</MenuItem>
                        <MenuItem value={Damage_Type.RANGED}>Ranged Physical Damage</MenuItem>
                        <MenuItem value={Damage_Type.SPECIAL}>Special Damage</MenuItem>
                        <MenuItem value={Damage_Type.OTHER}>Other</MenuItem>
                        <MenuItem value={Damage_Type.NONE}>No Damage</MenuItem>
                    </Select>
                </Box>
                <Box className="talent-filter-box" id="dice-box">
                    <Tooltip title="Example: If you need to search for 'Odds, 3 and 5 ', type 'odds, 3, 5'.">
                        <InputLabel id="talent-dice-label">Spirit Dice (Separated by comma) <HelpIcon sx={{ fontSize: "16px" }} /></InputLabel>
                    </Tooltip>
                    <TextField
                        value={diceInput}
                        onChange={(event) => changeFilter(event, null, "talent-dice")}
                    />
                </Box>
                <Box className="talent-filter-box talent-type-select">
                    <FormGroup>
                        <FormControlLabel control={<Checkbox checked={ancestry} onChange={(ev, value) => changeFilter(ev, value, "talent-ancestry")} />} label="Ancestry" />
                        <FormControlLabel control={<Checkbox checked={facet} onChange={(ev, value) => changeFilter(ev, value, "talent-facet")} />} label="Facet" />
                    </FormGroup>
                </Box>
                <Box id="talent-facet-select-box" className="talent-filter-box talent-facet disabled">
                    <InputLabel id="talent-facet-label">Facet</InputLabel>
                    <Select
                        labelId="talent-facet-label"
                        id="talent-facet-select"
                        value={selectedFacet}
                        label="Facet"
                        className="talent-select"
                        onInputChange={(event, value) => changeFilter(event, value, "talent-facet-select")}
                    >
                        <MenuItem value={0}>All</MenuItem>
                        <MenuItem value={Facet.ARCHSLAYER}>Archslayer</MenuItem>
                        <MenuItem value={Facet.DRAGON_CARRIER}>Dragon Carrier</MenuItem>
                        <MenuItem value={Facet.DARK_HUNTER}>Dark Hunter</MenuItem>
                        <MenuItem value={Facet.ELEMENTAL_ADEPT}>Elemental Adept</MenuItem>
                        <MenuItem value={Facet.DIGITAL_SORCERER}>Digital Sorcerer</MenuItem>
                    </Select>
                </Box>
                <Box id="talent-ancestry-select-box" className="talent-filter-box talent-ancestry disabled">
                    <InputLabel id="talent-ancestry-label">Ancestry</InputLabel>
                    <Select
                        labelId="talent-ancestry-label"
                        id="talent-ancestry-select"
                        value={selectedAncestry}
                        label="Ancestry"
                        className="talent-select"
                        onChange={(event, value) => changeFilter(event, value, "talent-ancestry-select")}
                    >
                        <MenuItem value={0}>All</MenuItem>
                        <MenuItem value={Ancestry.PARAGON}>Paragon</MenuItem>
                        <MenuItem value={Ancestry.NIGHTSTALKER}>Nightstalker</MenuItem>
                        <MenuItem value={Ancestry.HANYOU}>Hanyou</MenuItem>
                        <MenuItem value={Ancestry.MAGUS}>Magus</MenuItem>
                        <MenuItem value={Ancestry.NATURAL}>Natural</MenuItem>
                    </Select>
                </Box>
                <Box className="talent-filter-button-box">
                    <Button className="talent-filter-button" onClick={filter}><SearchIcon className="talent-icon-label" />Search</Button>
                    <Button className="talent-filter-button" onClick={clearFilter}><ClearAllIcon className="talent-icon-label" />Clear Filter</Button>
                </Box>
            </Box>
            <Box className="talent-grid">
                {
                    loading ? "Loading..." : renderCards(talentList)
                }
            </Box>
        </Box >
    )
}

export default TalentList;