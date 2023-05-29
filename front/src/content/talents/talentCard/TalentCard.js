import React, { useState } from "react";
import './talentCard.css';
import { Card, Typography, Box, Button, Modal } from "@mui/material";
import KeyIcon from '@mui/icons-material/Key'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import CasinoIcon from '@mui/icons-material/Casino';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import NotesIcon from '@mui/icons-material/Notes';
import { Cost, Timing, Range, Origin } from "../../../data/constants/TalentConstants";

export const TalentCard = (props) => {

    const talent = props.talent ? props.talent : {
        id: null,
        name: null,
        source: null,
        tldr: null,
        timing: null,
        range: null,
        squares: null,
        cost: [],
        numbers: null,
        effect: null,
        damageTypes: [],
        description: null,
        origin: null,
        category: null
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

    const getTiming = (timing, modal) => {
        switch (timing) {
            case Timing.ATTACK:
                return <Typography className={modal ? "modal-text" : "rules"} color="red"><AccessTimeIcon className="talent-icon" />{modal ? "Timing: " : ""} Attack</Typography>
            case Timing.DEFENSE:
                return <Typography className={modal ? "modal-text" : "rules"} color="blue"><AccessTimeIcon className="talent-icon" />{modal ? "Timing: " : ""} Defense</Typography>
            case Timing.CONSTANT:
                return <Typography className={modal ? "modal-text" : "rules"} color="orange"><AccessTimeIcon className="talent-icon" />{modal ? "Timing: " : ""} Constant</Typography>
            case Timing.START:
                return <Typography className={modal ? "modal-text" : "rules"} color="green"><AccessTimeIcon className="talent-icon" />{modal ? "Timing: " : ""} Start</Typography>
            case Timing.END:
                return <Typography className={modal ? "modal-text" : "rules"} color="brown"><AccessTimeIcon className="talent-icon" /> {modal ? "Timing: " : ""}End</Typography>
            case Timing.PREP:
                return <Typography className={modal ? "modal-text" : "rules"} color="yellow"><AccessTimeIcon className="talent-icon" /> {modal ? "Timing: " : ""}Prep</Typography>
            case Timing.FREE:
                return <Typography className={modal ? "modal-text" : "rules"} color="magenta"><AccessTimeIcon className="talent-icon" />{modal ? "Timing: " : ""} Free</Typography>
            case Timing.UNIQUE:
                return <Typography className={modal ? "modal-text" : "rules"} color="pink"><AccessTimeIcon className="talent-icon" />{modal ? "Timing: " : ""} Unique</Typography>
            default:
                return <Typography className={modal ? "modal-text" : "rules"} color="gray"><AccessTimeIcon className="talent-icon" />{modal ? "Timing: " : ""} Other</Typography>
        }
    }

    const getRange = (range, squares, modal) => {
        switch (range) {
            case Range.USER:
                return <Typography className={modal ? "modal-text" : "rules"} color="blue"><TrackChangesIcon className="talent-icon" />{modal ? "Range: " : ""} User</Typography>
            case Range.CHARGE:
                return <Typography className={modal ? "modal-text" : "rules"} color="green"><TrackChangesIcon className="talent-icon" />{modal ? "Range: " : ""} Charge</Typography>
            case Range.COMBAT_ZONE:
                return <Typography className={modal ? "modal-text" : "rules"} color="yellow"><TrackChangesIcon className="talent-icon" />{modal ? "Range: " : ""} Combat Zone</Typography>
            case Range.ENGAGED:
                return <Typography className={modal ? "modal-text" : "rules"} color="red"><TrackChangesIcon className="talent-icon" />{modal ? "Range: " : ""} Engaged</Typography>
            case Range.ITEM:
                return <Typography className={modal ? "modal-text" : "rules"} color="magenta"><TrackChangesIcon className="talent-icon" />{modal ? "Range: " : ""} Item</Typography>
            case Range.SQUARE:
                return <Typography className={modal ? "modal-text" : "rules"} color="red"><TrackChangesIcon className="talent-icon" />{modal ? "Range: " : ""} {squares} Square(s)</Typography>
            default:
                return <Typography className={modal ? "modal-text" : "rules"} color="gray"><TrackChangesIcon className="talent-icon" /> {modal ? "Range: " : ""}Other</Typography>
        }
    }

    const getSource = (source, origin) => {

        if ([Origin.GENERAL, Origin.HIGH, Origin.OTHER].includes(origin)) {
            return "";
        }

        let data = []
        if (origin === Origin.ANCESTRY) {
            data = JSON.parse(localStorage.getItem("kg_ancestries"));
        } else if (origin === Origin.FACET) {
            data = JSON.parse(localStorage.getItem("kg_facets"));
        }

        let name = ""
        data.forEach((item) => {
            if (item.id === source) {
                name = item.name;
            }
        });

        return name;
    }

    const getOrigin = (origin) => {
        switch (origin) {
            case Origin.ANCESTRY:
                return "Ancestry"
            case Origin.FACET:
                return "Facet"
            case Origin.GENERAL:
                return "General"
            case Origin.HIGH:
                return "High"
            default:
                return "Other"
        }
    }

    const getDiceValue = (input) => {
        switch (input) {
            case Cost.ODD:
                return "Odds"
            case Cost.EVEN:
                return "Evens"
            case Cost.DOUBLES:
                return "Doubles"
            case Cost.STEPS:
                return "STEPS"
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
                return input;
            default:
                return "None"
        }
    }

    const getDice = (costs, modal) => {
        let dieValue = null;
        let numbers = "";
        costs.forEach((n) => {
            numbers = numbers + " [" + getDiceValue(n) + "] "
        })
        dieValue = <Typography className={modal ? "modal-text" : "rules"} color="black"><CasinoIcon className="talent-icon" />{numbers}</Typography>
        return dieValue;
    }

    return (
        <Card className="talent-card" key={talent.id}>
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
                        {getOrigin(talent.origin)} ({getSource(talent.source, talent.origin)})
                    </Typography>
                    {talent.tldr !== null && talent.tldr !== "" ?
                        <Typography className="modal-text" color={'text.secondary'}>
                            TL;DR: {talent.tldr}
                        </Typography> : ""}
                    {getTiming(talent.timing, true)}
                    {getRange(talent.range, talent.squares, true)}
                    {getDice(talent.cost, true)}
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
                {getOrigin(talent.origin)} ({getSource(talent.source, talent.origin)})
            </Typography>
            {talent.tldr !== null && talent.tldr !== "" ?
                <Typography className="tldr" color={'text.secondary'}>
                    TL;DR: {talent.tldr}
                </Typography> : ""}
            {getTiming(talent.timing)}
            {getRange(talent.range, talent.squares)}
            {getDice(talent.cost)}
            <Box className="effect">
                <Typography className="rules">
                    <AnnouncementIcon className="talent-icon" /> {talent.effect}
                </Typography>
            </Box>
        </Card>
    )
}

export default TalentCard;