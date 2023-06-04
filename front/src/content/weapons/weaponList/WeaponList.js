import React, { useEffect, useState } from "react";
import './weaponList.css';
import { Box, Pagination } from "@mui/material";
import { WeaponCard } from "../weaponCard/WeaponCard";

export const WeaponList = (props) => {

    const [weapons, setWeapons] = useState();
    const [loading, setLoading] = useState(true);
    const [position, setPosition] = useState(0);
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
        setPosition(30 * (value - 1));
        setOffset((30 * value) + 30);
    };

    useEffect(() => {
        setWeapons(props.data);
        setCharacter(props.character);
        setLoading(false);
    }, [props.character, props.data, page])

    return (loading ? "" :
        <Box>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                {
                    weapons.map((weapon, index) => {
                        if (index > position && index < position + offset) {
                            return <WeaponCard key={weapon.id} data={weapon} character={character} />
                        }
                    })
                }
            </Box>
            <Box>
                <Pagination sx={{ margin: "auto" }} count={parseInt(weapons.length / 30)} page={page} onChange={handlePageChange} />
            </Box>
        </Box>
    )

}