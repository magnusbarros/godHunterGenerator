import React, { useEffect, useState } from "react";
import './weaponList.css';
import { Box, Card } from "@mui/material";
import { WeaponCard } from "../weaponCard/WeaponCard";

export const WeaponList = (props) => {

    const [weapons, setWeapons] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setWeapons(props.data);
        setLoading(false);
    }, [props.data])

    return (
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            {loading ? "Loading..." :
                weapons.map(weapon => {
                    return <WeaponCard data={weapon} />
                })
            }
        </Box>
    )

}