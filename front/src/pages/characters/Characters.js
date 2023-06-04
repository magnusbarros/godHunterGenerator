import React, { useState, useEffect } from "react";
import './characters.css'
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Box } from "@mui/material";
import CharacterList from "../../content/character/characterList/CharacterList";
import CharacterJson from '../../data/characters/characters.json'

import CoreTalents from '../../data/talents/core.json';
import CoreAncestries from '../../data/ancestries/ancestries.json'
import CoreFacets from '../../data/facets/facets.json'

export const Characters = (props) => {

    const [characters, setCharacters] = useState([]);

    useEffect(() => {

        let storedTalents = localStorage.getItem("kg_talents");
        let storedAncestries = localStorage.getItem("kg_ancestries");
        let storedFacets = localStorage.getItem("kg_facets");
        let storedCharacters = localStorage.getItem("kg_characters");

        if (storedCharacters === null) {
            localStorage.setItem("kg_characters", JSON.stringify(CharacterJson));
        } else setCharacters(JSON.parse(storedCharacters));

        if (storedTalents === null) {
            localStorage.setItem("kg_talents", JSON.stringify(CoreTalents));
        }

        if (storedAncestries === null) {
            localStorage.setItem("kg_ancestries", JSON.stringify(CoreAncestries));
        }

        if (storedFacets === null) {
            localStorage.setItem("kg_facets", JSON.stringify(CoreFacets));
        }
    }, []);

    return (
        <Box className="character-page">
            <Box className="breadcrumb-box">
                <Breadcrumbs>
                    <Typography color={'text.secondary'}>
                        Main Menu
                    </Typography>
                    <Typography color={'text.primary'}>
                        Characters
                    </Typography>
                </Breadcrumbs>
            </Box>
            <Box className="character-list">
                <CharacterList content={characters} />
            </Box>
        </Box>
    )
}

export default Characters;