import React, { useState } from "react";
import './talentCard.css';
import { Card, Typography, Box, Button, Modal } from "@mui/material";
import KeyIcon from '@mui/icons-material/Key'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import CasinoIcon from '@mui/icons-material/Casino';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import NotesIcon from '@mui/icons-material/Notes';

export const TalentCard = (props) => {

    const talent = props.talent ? props.talent : {
        name: 'null',
        source: '',
        tldr: '',
        timing: '',
        range: '',
        cost: '',
        effect: '',
        description: '',
        category: ''
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Card className="talent-card">
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="talent-inner-modal">
                    <Typography className="modal-text">
                        {talent.name} {talent.category === 'Key' ? (<KeyIcon sx={{ float: 'right', marginTop: '5px' }} />) : ''}
                    </Typography>
                    <Typography className="modal-text">
                        {talent.source} - {talent.category}
                    </Typography>
                    <Typography className="modal-text" color={'text.secondary'}>
                        TL;DR: {talent.tldr}
                    </Typography>
                    <Typography className="modal-text" >
                        <AccessTimeIcon className="talent-icon" />Timing: {talent.timing}
                    </Typography>
                    <Typography className="modal-text" >
                        <TrackChangesIcon className="talent-icon" />Range: {talent.range}
                    </Typography>
                    <Typography className="modal-text" >
                        <CasinoIcon className="talent-icon" />Cost: {talent.cost}
                    </Typography>
                    <Typography className="modal-text" >
                        <NotesIcon className="talent-icon" />Description: {talent.description}
                    </Typography>
                    <Typography className="modal-text" >
                        <AnnouncementIcon className="talent-icon" />Effect: {talent.effect}
                    </Typography>
                </Box>
            </Modal>
            <Typography className="title">
                <Button variant="text" onClick={handleOpen}>
                    {talent.name} {talent.category === 'Key' ? (<KeyIcon sx={{ float: 'right', marginTop: '5px' }} />) : ''}
                </Button>
            </Typography>
            <Typography className="subtitle">
                {talent.source} - {talent.category}
            </Typography>
            <Typography className="tldr" color={'text.secondary'}>
                TL;DR: {talent.tldr}
            </Typography>
            <Typography className="rules">
                <AccessTimeIcon className="talent-icon" /> {talent.timing}
            </Typography>
            <Typography className="rules">
                <TrackChangesIcon className="talent-icon" /> {talent.range}
            </Typography>
            <Typography className="rules">
                <CasinoIcon className="talent-icon" /> {talent.cost}
            </Typography>
            <Box className="effect">
                <Typography className="rules">
                    <AnnouncementIcon className="talent-icon" /> {talent.effect}
                </Typography>
            </Box>
        </Card>
    )
}

export default TalentCard;