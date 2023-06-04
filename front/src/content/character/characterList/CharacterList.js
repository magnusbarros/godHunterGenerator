import React from "react";
import { useState } from "react";
import './characterList.css';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { FacetType } from "../../../data/constants/TalentConstants";
import RadarChart from 'react-svg-radar-chart';
import 'react-svg-radar-chart/build/css/index.css'

export const CharacterList = (props) => {

    const [selectedCharacter, setSelectedCharacter] = useState();

    const characterSelect = (ev, characterId) => {
        props.content.forEach(character => {
            if (character.id === characterId) {
                setSelectedCharacter(character);
            }
        });
    }

    const getFacet = (facet, type) => {

        let _type = ""
        if (type === FacetType.ALPHA) {
            _type = " Alpha";
        } else if (type === FacetType.BETA) {
            _type = " Beta";
        }

        let data = JSON.parse(localStorage.getItem("kg_facets"));

        let returnFacet = "";
        data.forEach((item) => {
            if (item.id === facet) {
                returnFacet = item.name + _type;
            }
        });

        if (returnFacet === "")
            returnFacet = "Custom" + _type;

        return returnFacet;
    }

    const renderChart = (character) => {

        let stats = character.stats
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
                size={250}
            />
        )
    }

    return (
        <Box className="chacater-list-page">
            <Box className="character-main">
                <List className="character-list">
                    <ListItem key="new"><ListItemButton><AddCircleIcon className="new-character-icon" /> <h3>Create New Character</h3></ListItemButton></ListItem>
                    {
                        props.content.map((character) => {
                            return (
                                <ListItem key={character.id}>
                                    <ListItemButton onClick={ev => characterSelect(ev, character.id)}>
                                        <h2>{character.name} </h2>
                                        <p>
                                            , LVL {character.level} {getFacet(character.facetA, character.facetAType)}, {getFacet(character.facetB, character.facetBType)}
                                        </p>
                                    </ListItemButton>
                                    <Button href={"character-edit?id=" + character.id} sx={{ float: "right", color: "#0e8a85" }}><EditIcon /></Button>
                                </ListItem>
                            )
                        })
                    }
                </List>
                <Box className="character-preview">
                    {
                        selectedCharacter ?
                            <Box className="char-preview-main" key={selectedCharacter.id}>
                                <Box className="char-info">
                                    <h1>Name: {selectedCharacter.name}</h1>
                                    <h3>Level: {selectedCharacter.level}</h3>
                                    <h4>Primary Class: {getFacet(selectedCharacter.facetA, selectedCharacter.facetAType)}</h4>
                                    <h4>Secondary Class: {getFacet(selectedCharacter.facetB, selectedCharacter.facetBType)}</h4>
                                </Box>
                                <Box className="char-name">
                                    <Box className="stat-chart">
                                        {
                                            renderChart(selectedCharacter)
                                        }
                                    </Box>
                                </Box>

                            </Box> : ""
                    }
                </Box>
            </Box>
        </Box>

    );
}

export default CharacterList;