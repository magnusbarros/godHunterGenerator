import React from "react";
import './characters.css'
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Box } from "@mui/material";
import CharacterList from "../../content/characterList/CharacterList";

export const Characters = (props) => {

    const content = [
        {
            id: 1,
            name: "Vincent",
            level: 7,
            mainClass: "God Fist Alpha",
            secondaryClass: "God Fist Beta"
        },
        {
            id: 2,
            name: "Starlight Princess Asuka",
            level: 4,
            mainClass: "Legacy User Alpha",
            secondaryClass: "Elder Mage Beta"
        }
    ];

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
                <CharacterList content={content} />
            </Box>
        </Box>
    )
}

export default Characters;