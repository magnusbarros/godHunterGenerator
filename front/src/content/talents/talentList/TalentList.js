import React, { useEffect, useState } from "react";
import './talentList.css';
import { Box } from "@mui/material";
import TalentCard from "../talentCard/TalentCard";
import { Typography, Card, Button } from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import CasinoIcon from '@mui/icons-material/Casino';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import NotesIcon from '@mui/icons-material/Notes';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import HelpIcon from '@mui/icons-material/Help';

export const TalentList = (props) => {

    const talents = [
        {
            id: 0,
            name: 'Keen Strike',
            source: 'Paragon',
            tldr: 'Physical attack with sword or range form weapon.',
            timing: 'Attack',
            range: 'Item',
            cost: 'Odds',
            effect: "Make a physical attack using a sword-form weapon or ranged-form weapon. When you calculate the attack's damage, add any one of your main stats.",
            description: "You strike with a piercing scream, drawing out the effectiveness of certain weapons to their fullest.",
            category: 'Ancestry'
        },
        {
            id: 1,
            name: 'Mussum Ipsum 1',
            source: 'Cacildis',
            tldr: 'Praesent malesuada urna nisi, quis volutpat erat hendrerit non.',
            timing: 'Ipsum',
            range: 'Musum',
            cost: 'Ipsum',
            effect: 'Mussum Ipsum, cacilds vidis litro abertis. Diuretics paradis num copo é motivis de denguis.Praesent malesuada urna nisi, quis volutpat erat hendrerit non. Nam vulputate dapibus.Vehicula non. Ut sed ex eros. Vivamus sit amet nibh non tellus tristique interdum.Delegadis gente finis, bibendum egestas augue arcu ut est.',
            description: 'Mussum Ipsum, cacilds vidis litro abertis. Diuretics paradis num copo é motivis de denguis.Praesent malesuada urna nisi, quis volutpat erat hendrerit non. Nam vulputate dapibus.Vehicula non. Ut sed ex eros. Vivamus sit amet nibh non tellus tristique interdum.Delegadis gente finis, bibendum egestas augue arcu ut est.',
            category: 'Ipsum'
        },
        {
            id: 2,
            name: 'Mussum Ipsum 2',
            source: 'Cacildis',
            tldr: 'Praesent malesuada urna nisi, quis volutpat erat hendrerit non.',
            timing: 'Ipsum',
            range: 'Musum',
            cost: 'Ipsum',
            effect: 'Mussum Ipsum, cacilds vidis litro abertis. Diuretics paradis num copo é motivis de denguis.Praesent malesuada urna nisi, quis volutpat erat hendrerit non. Nam vulputate dapibus.Vehicula non. Ut sed ex eros. Vivamus sit amet nibh non tellus tristique interdum.Delegadis gente finis, bibendum egestas augue arcu ut est.',
            description: 'Mussum Ipsum, cacilds vidis litro abertis. Diuretics paradis num copo é motivis de denguis.Praesent malesuada urna nisi, quis volutpat erat hendrerit non. Nam vulputate dapibus.Vehicula non. Ut sed ex eros. Vivamus sit amet nibh non tellus tristique interdum.Delegadis gente finis, bibendum egestas augue arcu ut est.',
            category: 'Ipsum'
        },
        {
            id: 3,
            name: 'Mussum Ipsum 3',
            source: 'Cacildis',
            tldr: 'Praesent malesuada urna nisi, quis volutpat erat hendrerit non.',
            timing: 'Ipsum',
            range: 'Musum',
            cost: 'Ipsum',
            effect: 'Mussum Ipsum, cacilds vidis litro abertis. Diuretics paradis num copo é motivis de denguis.Praesent malesuada urna nisi, quis volutpat erat hendrerit non. Nam vulputate dapibus.Vehicula non. Ut sed ex eros. Vivamus sit amet nibh non tellus tristique interdum.Delegadis gente finis, bibendum egestas augue arcu ut est.',
            description: 'Mussum Ipsum, cacilds vidis litro abertis. Diuretics paradis num copo é motivis de denguis.Praesent malesuada urna nisi, quis volutpat erat hendrerit non. Nam vulputate dapibus.Vehicula non. Ut sed ex eros. Vivamus sit amet nibh non tellus tristique interdum.Delegadis gente finis, bibendum egestas augue arcu ut est.',
            category: 'Ipsum'
        },
        {
            id: 4,
            name: 'Mussum Ipsum 4',
            source: 'Cacildis',
            tldr: 'Praesent malesuada urna nisi, quis volutpat erat hendrerit non.',
            timing: 'Ipsum',
            range: 'Musum',
            cost: 'Ipsum',
            effect: 'Mussum Ipsum, cacilds vidis litro abertis. Diuretics paradis num copo é motivis de denguis.Praesent malesuada urna nisi, quis volutpat erat hendrerit non. Nam vulputate dapibus.Vehicula non. Ut sed ex eros. Vivamus sit amet nibh non tellus tristique interdum.Delegadis gente finis, bibendum egestas augue arcu ut est.',
            description: 'Mussum Ipsum, cacilds vidis litro abertis. Diuretics paradis num copo é motivis de denguis.Praesent malesuada urna nisi, quis volutpat erat hendrerit non. Nam vulputate dapibus.Vehicula non. Ut sed ex eros. Vivamus sit amet nibh non tellus tristique interdum.Delegadis gente finis, bibendum egestas augue arcu ut est.',
            category: 'Ipsum'
        },
        {
            id: 5,
            name: 'Mussum Ipsum 5',
            source: 'Cacildis',
            tldr: 'Praesent malesuada urna nisi, quis volutpat erat hendrerit non.',
            timing: 'Ipsum',
            range: 'Musum',
            cost: 'Ipsum',
            effect: 'Mussum Ipsum, cacilds vidis litro abertis. Diuretics paradis num copo é motivis de denguis.Praesent malesuada urna nisi, quis volutpat erat hendrerit non. Nam vulputate dapibus.Vehicula non. Ut sed ex eros. Vivamus sit amet nibh non tellus tristique interdum.Delegadis gente finis, bibendum egestas augue arcu ut est.',
            description: 'Mussum Ipsum, cacilds vidis litro abertis. Diuretics paradis num copo é motivis de denguis.Praesent malesuada urna nisi, quis volutpat erat hendrerit non. Nam vulputate dapibus.Vehicula non. Ut sed ex eros. Vivamus sit amet nibh non tellus tristique interdum.Delegadis gente finis, bibendum egestas augue arcu ut est.',
            category: 'Ipsum'
        },
    ]

    const [talentList, setTalentList] = useState(talents);
    const [talentNames, setTalentNames] = useState(['']);

    useEffect(() => {
        const _talentNames = [];
        talents.forEach((item, index) => {
            _talentNames.push(item.name);
        })
        setTalentNames(_talentNames);
    }, []);

    const changeFilter = (ev, value, inputId) => {
        const newTalentList = [];

        if (value === null || value === undefined || value === "") {
            setTalentList(talents);
        } else {
            talents.forEach((item, index) => {
                let filterPass = false;
                switch (inputId) {
                    case "talent-name":
                        if (item.name.toLowerCase().includes(value.toLowerCase())) {
                            filterPass = true
                        }
                        break;
                    default:
                        break;
                }

                if (filterPass) {
                    newTalentList.push(item);
                }
            })

            setTalentList(newTalentList);
        }

    }

    const renderCards = (list) => {
        return (
            list.map((item, index) => (
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
                <Autocomplete
                    disablePortal
                    freeSolo
                    id="talent-name"
                    options={talentNames}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Name" />}
                    onChange={(event, value) => changeFilter(event, value, "talent-name")}
                />
            </Box>
            <Box className="talent-grid">
                {
                    renderCards(talentList)
                }
            </Box>
        </Box>
    )
}

export default TalentList;