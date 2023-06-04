import React, { useEffect, useState } from "react";
import './weaponCard.css';
import { Card, Typography, Box, Button, Table, TableHead, TableContainer, TableRow, TableCell, Tooltip, TableBody } from "@mui/material";
import { ItemSource } from '../../../data/constants/ItemConstants';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { save } from '../../../api/characters/CharacterAPI';

export const WeaponCard = (props) => {

    const [weapon, setWeapon] = useState();
    const [character, setCharacter] = useState();
    const [favorite, setFavorite] = useState(false);
    const [weaponQty, setWeaponQty] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setWeapon(props.data);
        if (props.character !== undefined) {
            setCharacter(props.character);
            props.character.weapons.forEach(fav => {
                if (fav.id === props.data.id && fav.fav) {
                    setFavorite(true);
                }
            });
        }
        setLoading(false);
    }, [props.data, props.character]);

    const getIcon = () => {
        switch (weapon.attributes.element) {
            case "Flame":
                return "512px"
            case "Frost":
                return "480px"
            case "Shock":
                return "448px"
            case "Wind":
                return "352px"
            case "Force":
                return "320px"
            case "Radiant":
                return "256px"
            case "Blight":
                return "288px"
            case "Psychic":
                return "32px"
            default:
                return "0px"
        }
    }

    const getSource = (src) => {
        switch (src) {
            case ItemSource.CORE:
                return <Typography className="item-source">Core</Typography>
            case ItemSource.EXPANSION_1:
                return <Typography className="item-source">Expansion 1</Typography>
            case ItemSource.EXPANSION_2:
                return <Typography className="item-source">Expansion 2</Typography>
            case ItemSource.EXPANSION_3:
                return <Typography className="item-source">Expansion 3</Typography>
            case ItemSource.EXPANSION_4:
                return <Typography className="item-source">Expansion 4</Typography>
            case ItemSource.EXPANSION_5:
                return <Typography className="item-source">Expansion 5</Typography>
            case ItemSource.EXPANSION_6:
                return <Typography className="item-source">Expansion 6</Typography>
            case ItemSource.EXPANSION_7:
                return <Typography className="item-source">Expansion 7</Typography>
            case ItemSource.EXPANSION_8:
                return <Typography className="item-source">Expansion 8</Typography>
            case ItemSource.EXPANSION_9:
                return <Typography className="item-source">Expansion 9</Typography>
            case ItemSource.EXPANSION_10:
                return <Typography className="item-source">Expansion 10</Typography>
            default:
                return <Typography className="item-source">Custom</Typography>
        }
    }

    const addToCart = (ammount) => {
        let qty = isNaN(ammount) ? parseInt(ammount.target.value) : ammount;
        if (character !== undefined && character.id !== 0) {
            if (qty > 0) {
                let cost = isNaN(weapon.cost.replace("G", "").replaceAll(": ", "").replaceAll(",", ""))
                    ? 0 : parseFloat(weapon.cost.replace("G", "").replaceAll(": ", "").replaceAll(",", ""));
                if (character.cart === undefined || character.cart.items.length === 0) {
                    character.cart = {
                        items: [{ id: weapon.id, qty: qty }],
                        total: (cost * qty)
                    }
                } else {
                    let index = character.cart.items.findIndex(cItem => cItem.id === weapon.id);
                    if (index === -1) {
                        character.cart.items.push(
                            { id: weapon.id, qty: qty }
                        );
                    } else {
                        character.cart.items[index].qty += qty;
                        character.cart.total += (cost * qty);
                    }
                }
                save(character);
            }
        }

    }

    const favoriteItem = (itemId, favState) => {
        if (character !== undefined && character.id !== 0) {
            console.log(character.weapons)
            let _item = character.weapons ? character.weapons.find(item => item.id === itemId) : null;
            if (_item !== null && _item !== undefined) {
                character.weapons.find(item => item.id === itemId).fav = favState;
            } else {
                character.weapons.push({
                    id: weapon.id,
                    qty: 0,
                    equip: false,
                    fav: favState
                });
            }
            setFavorite(favState);
            save(character);
        }
    }

    return (loading ? "" :
        <Card className="weapon-card">
            <Box className="weapon-header">
                <Tooltip title={weapon.attributes.form}>
                    <div className="weapon-icon"
                        style={{
                            backgroundPositionX: weapon.icon.x + "px",
                            backgroundPositionY: weapon.icon.y + "px"
                        }}
                    />
                </Tooltip>
                <Box className="weapon-name-header">
                    <Tooltip title={weapon.name}>
                        <Button sx={{ maxHeight: "33px" }}>
                            <Typography className="weapon-name">{weapon.name}</Typography>
                            {
                                weapon.type === 3 || weapon.type === 4 ?
                                    <Tooltip title={"Element: " + weapon.attributes.element}>
                                        {
                                            weapon.attributes.element === "None" ? <div></div> :
                                                <div className="weapon-stat-icon"
                                                    style={{
                                                        backgroundPositionX: getIcon(),
                                                        backgroundPositionY: "3072px",
                                                        position: "relative",
                                                        marginTop: "-6px"
                                                    }}
                                                />
                                        }
                                    </Tooltip>
                                    : ""
                            }
                        </Button>
                    </Tooltip>
                    <Typography className="weapon-cost">
                        {weapon.cost.replaceAll(": ", "").replaceAll(",", "")}
                    </Typography>
                </Box>
            </Box>
            <Box>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ maxHeight: "15px", padding: 0, margin: "auto" }}>
                                    {
                                        weapon.type === 3 || weapon.type === 4 ?
                                            <Tooltip title="Magic Damage (MD)">
                                                <div className="weapon-stat-icon" style={{
                                                    backgroundPositionX: "256px",
                                                    backgroundPositionY: "2720px"
                                                }} />
                                            </Tooltip>
                                            :
                                            <Tooltip title="Physical Damage (PD)">
                                                <div className="weapon-stat-icon" style={{
                                                    backgroundPositionX: "192px",
                                                    backgroundPositionY: "2720px"
                                                }} />
                                            </Tooltip>
                                    }
                                </TableCell>
                                {
                                    weapon.type === 3 || weapon.type === 4 ?
                                        <TableCell sx={{ maxHeight: "15px", padding: 0, margin: "auto" }}>
                                            <Tooltip title="Invocation">
                                                <div className="weapon-stat-icon" style={{
                                                    backgroundPositionX: "32px",
                                                    backgroundPositionY: "3072px"
                                                }} />
                                            </Tooltip>
                                        </TableCell>
                                        :
                                        <TableCell sx={{ maxHeight: "15px", padding: 0, margin: "auto" }}>
                                            <Tooltip title="Accuracy">
                                                <div className="weapon-stat-icon" style={{
                                                    backgroundPositionX: "480px",
                                                    backgroundPositionY: "2944px"
                                                }} />
                                            </Tooltip>
                                        </TableCell>
                                }
                                <TableCell sx={{ maxHeight: "15px", padding: 0, margin: "auto" }}>
                                    <Tooltip title="Initiative">
                                        <div className="weapon-stat-icon" style={{
                                            backgroundPositionX: "448px",
                                            backgroundPositionY: "3040px"
                                        }} />
                                    </Tooltip>
                                </TableCell>
                                <TableCell sx={{ maxHeight: "15px", padding: 0, margin: "auto" }}>
                                    <Tooltip title="Range">
                                        <div className="weapon-stat-icon" style={{
                                            backgroundPositionX: "320px",
                                            backgroundPositionY: "3008px"
                                        }} />
                                    </Tooltip>
                                </TableCell>
                                <TableCell sx={{ maxHeight: "15px", padding: 0, margin: "auto" }}>
                                    <Tooltip title="Target">
                                        <div className="weapon-stat-icon" style={{
                                            backgroundPositionX: "160px",
                                            backgroundPositionY: "3040px"
                                        }} />
                                    </Tooltip>
                                </TableCell>
                                {
                                    weapon.type === 3 || weapon.type === 4 ?
                                        <TableCell sx={{ maxHeight: "15px", padding: 0, margin: "auto" }}>
                                            <Tooltip title="Rank">
                                                <div className="weapon-stat-icon" style={{
                                                    backgroundPositionX: "288px",
                                                    backgroundPositionY: "3040px"
                                                }} />
                                            </Tooltip>
                                        </TableCell>
                                        : ""
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell sx={{ maxHeight: "15px", padding: 0 }}>
                                    {
                                        weapon.type === 3 || weapon.type === 4 ?
                                            <Typography sx={{ textAlign: "center", fontSize: "14px" }}>{weapon.type === 3 ? weapon.bonus.md : weapon.bonus.md + "/" + weapon.bonus.md2}</Typography>
                                            :
                                            <Typography sx={{ textAlign: "center", fontSize: "14px" }}>{weapon.type === 1 ? weapon.bonus.pd : weapon.bonus.pd + "/" + weapon.bonus.pd2}</Typography>
                                    }
                                </TableCell>
                                <TableCell sx={{ maxHeight: "15px", padding: 0 }}>
                                    <Typography sx={{ textAlign: "center", fontSize: "14px" }}>{weapon.attributes.type === 3 || weapon.attributes.type === 4 ? weapon.bonus.ivc : weapon.bonus.acc}</Typography>
                                </TableCell>
                                <TableCell sx={{ maxHeight: "15px", padding: 0 }}>
                                    <Typography sx={{ textAlign: "center", fontSize: "14px" }}>{weapon.type === 3 || weapon.type === 1 ? weapon.bonus.init : weapon.bonus.init + "/" + weapon.bonus.init2}</Typography>
                                </TableCell>
                                <TableCell sx={{ maxHeight: "15px", padding: 0 }}>
                                    <Typography sx={{ textAlign: "center", fontSize: "14px" }}>{weapon.attributes.range}</Typography>
                                </TableCell>
                                <TableCell sx={{ maxHeight: "15px", padding: 0 }}>
                                    <Typography sx={{ textAlign: "center", fontSize: "14px" }}>{weapon.attributes.target}</Typography>
                                </TableCell>
                                {
                                    weapon.type === 3 || weapon.type === 4 ?
                                        <TableCell sx={{ maxHeight: "15px", padding: 0 }}>
                                            <Typography sx={{ textAlign: "center", fontSize: "14px" }}>{weapon.attributes.rank}</Typography>
                                        </TableCell>
                                        : ""
                                }
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>


            </Box>
            <Box className="weapon-effect-wrapper">
                <Tooltip title={weapon.effect}>
                    <Typography className="weapon-effect">{weapon.effect}</Typography>
                </Tooltip>
            </Box>
            {
                props.displayOnly ? '' :
                    <Box className="weapon-add-item">
                        <Button onClick={() => addToCart(1)} className="cart-add-button">
                            <AddShoppingCartIcon />
                        </Button>
                        <Button onClick={() => favoriteItem(weapon.id, !favorite)} className="cart-fav-button">
                            {
                                favorite ?
                                    <FavoriteIcon /> :
                                    <FavoriteBorderIcon />
                            }
                        </Button>
                    </Box>
            }
            {getSource(weapon.source)}
        </Card>
    )
}