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
        origin: null
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
                return <Typography className={modal ? "modal-text" : "rules"} color="red"><AccessTimeIcon className="talent-icon" /> Attack</Typography>
            case Timing.DEFENSE:
                return <Typography className={modal ? "modal-text" : "rules"} color="blue"><AccessTimeIcon className="talent-icon" /> Defense</Typography>
            case Timing.CONSTANT:
                return <Typography className={modal ? "modal-text" : "rules"} color="orange"><AccessTimeIcon className="talent-icon" /> Constant</Typography>
            case Timing.START:
                return <Typography className={modal ? "modal-text" : "rules"} color="green"><AccessTimeIcon className="talent-icon" /> Start</Typography>
            case Timing.END:
                return <Typography className={modal ? "modal-text" : "rules"} color="brown"><AccessTimeIcon className="talent-icon" /> End</Typography>
            case Timing.PREP:
                return <Typography className={modal ? "modal-text" : "rules"} color="yellow"><AccessTimeIcon className="talent-icon" /> Prep</Typography>
            case Timing.FREE:
                return <Typography className={modal ? "modal-text" : "rules"} color="magenta"><AccessTimeIcon className="talent-icon" /> Free</Typography>
            case Timing.UNIQUE:
                return <Typography className={modal ? "modal-text" : "rules"} color="pink"><AccessTimeIcon className="talent-icon" /> Unique</Typography>
            case Timing.OTHER:
                return <Typography className={modal ? "modal-text" : "rules"} color="gray"><AccessTimeIcon className="talent-icon" /> Other</Typography>
        }
    }

    const getRange = (range, squares, modal) => {
        switch (range) {
            case Range.USER:
                return <Typography className={modal ? "modal-text" : "rules"} color="blue"><TrackChangesIcon className="talent-icon" /> User</Typography>
            case Range.CHARGE:
                return <Typography className={modal ? "modal-text" : "rules"} color="green"><TrackChangesIcon className="talent-icon" /> Charge</Typography>
            case Range.COMBAT_ZONE:
                return <Typography className={modal ? "modal-text" : "rules"} color="yellow"><TrackChangesIcon className="talent-icon" /> Combat Zone</Typography>
            case Range.ENGAGED:
                return <Typography className={modal ? "modal-text" : "rules"} color="red"><TrackChangesIcon className="talent-icon" /> Engaged</Typography>
            case Range.ITEM:
                return <Typography className={modal ? "modal-text" : "rules"} color="magenta"><TrackChangesIcon className="talent-icon" /> Item</Typography>
            case Range.SQUARE:
                return <Typography className={modal ? "modal-text" : "rules"} color="red"><TrackChangesIcon className="talent-icon" /> {squares} Square(s)</Typography>
            default:
                return <Typography className={modal ? "modal-text" : "rules"} color="gray"><TrackChangesIcon className="talent-icon" /> Other</Typography>
        }
    }

    const getSource = (source) => {
        switch (source) {
            case 1:
                return "Paragon"
            case 2:
                return "Nightstalker"
            case 3:
                return "Hanyou"
            case 4:
                return "Magus"
            default:
                return "Natural"
        }
    }

    const getOrigin = (origin) => {
        switch (origin) {
            case Origin.ANCESTRY:
                return "Ancestry"
            case Origin.FACET:
                return "Facet"
            case Origin.OTHER:
                return "Other"
        }
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
                        {getOrigin(talent.origin)} ({getSource(talent.source)})
                    </Typography>
                    <Typography className="modal-text" color={'text.secondary'}>
                        TL;DR: {talent.tldr}
                    </Typography>
                    {getTiming(talent.timing, true)}
                    {getRange(talent.range, talent.squares, true)}
                    {talent.cost.map((item) => {
                        switch (item) {
                            case Cost.ODD:
                                return <Typography className="modal-text" color="blue"><CasinoIcon className="talent-icon" />Odds</Typography>
                            case Cost.EVEN:
                                return <Typography className="modal-text" color="red"><CasinoIcon className="talent-icon" />Evens</Typography>
                            case Cost.DOUBLES:
                                <Typography className="modal-text" color="yellow"><CasinoIcon className="talent-icon" />Doubles</Typography>
                                break;
                            case Cost.NUMBER:
                                let numbers = "";
                                talent.numbers.forEach((n) => {
                                    numbers = numbers + " [" + n + "] "
                                })
                                return <Typography className="modal-text" color="black"><CasinoIcon className="talent-icon" />{numbers}</Typography>
                            case Cost.STEPS:
                                return <Typography className="modal-text" color="orange"><CasinoIcon className="talent-icon" />Steps</Typography>
                            default:
                                return <Typography className="modal-text" color="gray"><CasinoIcon className="talent-icon" />None</Typography>
                        }
                    })}
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
                {getOrigin(talent.origin)} ({getSource(talent.source)})
            </Typography>
            <Typography className="tldr" color={'text.secondary'}>
                TL;DR: {talent.tldr}
            </Typography>
            {getTiming(talent.timing)}
            {getRange(talent.range, talent.squares)}
            {talent.cost.map((item) => {
                switch (item) {
                    case Cost.ODD:
                        return <Typography className="rules" color="blue"><CasinoIcon className="talent-icon" />Odds</Typography>
                    case Cost.EVEN:
                        return <Typography className="rules" color="red"><CasinoIcon className="talent-icon" />Evens</Typography>
                    case Cost.DOUBLES:
                        <Typography className="rules" color="yellow"><CasinoIcon className="talent-icon" />Doubles</Typography>
                        break;
                    case Cost.NUMBER:
                        let numbers = "";
                        talent.numbers.forEach((n) => {
                            numbers = numbers + " [" + n + "] "
                        })
                        return <Typography className="rules" color="black"><CasinoIcon className="talent-icon" />{numbers}</Typography>
                    case Cost.STEPS:
                        return <Typography className="rules" color="orange"><CasinoIcon className="talent-icon" />Steps</Typography>
                    default:
                        return <Typography className="rules" color="gray"><CasinoIcon className="talent-icon" />None</Typography>
                }
            })}
            <Box className="effect">
                <Typography className="rules">
                    <AnnouncementIcon className="talent-icon" /> {talent.effect}
                </Typography>
            </Box>
        </Card>
    )
}

export default TalentCard;