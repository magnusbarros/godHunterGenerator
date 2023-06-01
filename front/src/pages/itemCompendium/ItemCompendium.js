import React, { useState, useEffect } from "react";
import './itemCompendium.css'
import { Box, Breadcrumbs, Typography } from "@mui/material";
import CoreItems from '../../data/items/core.json';
import Expansion10Items from '../../data/items/expansion10.json';
import { ItemList } from "../../content/items/ItemList/ItemList";

export const ItemCompendium = () => {

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        let storedData = localStorage.getItem("kg_items");
        if (storedData === null) {
            let _items = [].concat(CoreItems, Expansion10Items);
            localStorage.setItem("kg_items", JSON.stringify(_items));
            setItems(_items);
        } else {
            setItems(JSON.parse(storedData));
        }
        setLoading(false);
    }, [])

    return (<Box className="item-page">
        <Box className="breadcrumb-box">
            <Breadcrumbs>
                <Typography color={'text.secondary'}>
                    Main Menu
                </Typography>
                <Typography color={'text.primary'}>
                    Item Compendium
                </Typography>
            </Breadcrumbs>
        </Box>
        {
            loading ? "Loading..." :
                <ItemList data={items} />
        }
    </Box>)
}

export default ItemCompendium;