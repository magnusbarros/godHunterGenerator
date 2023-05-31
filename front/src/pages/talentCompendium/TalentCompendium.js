import React from "react";
import './talentCompendium.css'
import { Box, Breadcrumbs, Typography } from "@mui/material";
import TalentList from "../../content/talents/talentList/TalentList";

export const TalentCompendium = () => {

    return (
        <Box className="talent-page">
            <Box className="breadcrumb-box">
                <Breadcrumbs>
                    <Typography color={'text.secondary'}>
                        Main Menu
                    </Typography>
                    <Typography color={'text.primary'}>
                        Talent Compendium
                    </Typography>
                </Breadcrumbs>
            </Box>
            <Box>
                <TalentList />
            </Box>
        </Box>
    )
}

export default TalentCompendium;