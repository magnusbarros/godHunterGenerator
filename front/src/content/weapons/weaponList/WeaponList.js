import React, { useEffect, useState } from "react";
import './weaponList.css';
import { Box, Input, Pagination, Typography } from "@mui/material";
import { WeaponCard } from "../weaponCard/WeaponCard";

export const WeaponList = (props) => {

    const [weapons, setWeapons] = useState();
    const [loading, setLoading] = useState(true);
    const [position, setPosition] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(60);
    const [offset, setOffset] = useState(60);
    const [page, setPage] = useState(1);
    const [character, setCharacter] = useState({
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
        "weapons": [],
        "accessories": [],
        "protectors": [],
        "favorites": [],
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
    });

    const handlePageChange = (event, value) => {
        setPage(value);
        setPosition(itemsPerPage * (value - 1));
        setOffset(itemsPerPage * value);
    };

    useEffect(() => {
        setWeapons(props.data);
        setCharacter(props.character);
        setLoading(false);
    }, [props.character, props.data, page, itemsPerPage])

    return (loading ? "" :
        <Box >
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                {
                    weapons.map((weapon, index) => {
                        if (index > position && index < offset) {
                            return <WeaponCard key={weapon.id} data={weapon} character={character} />
                        }
                        return "";
                    })
                }
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                <Box sx={{ margin: "auto", display: "flex", flexWrap: "wrap" }}>
                    <Pagination count={Math.round(weapons.length / itemsPerPage)} page={page} onChange={handlePageChange} />
                    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                        <Typography sx={{ fontSize: "14px", marginTop: "6px", marginRight: "5px" }}>Items per page: </Typography>
                        <Input sx={{ width: "40px" }} type="number" value={itemsPerPage} onChange={(ev) => setItemsPerPage(ev.target.value)} />
                    </Box>
                </Box>

            </Box>
        </Box>
    )

}