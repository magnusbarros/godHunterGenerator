import React, { useState, useEffect } from "react";
import { Box, Typography, Card, Modal, Button, TextField, Tooltip } from "@mui/material";
import './itemCard.css';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { save } from '../../../api/characters/CharacterAPI';
import { ItemSource } from "../../../data/constants/ItemConstants";

export const ItemCard = (props) => {

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
    const [item, setItem] = useState();
    const [open, setOpen] = useState(false);
    const [character, setCharacter] = useState();
    const [favorite, setFavorite] = useState(false);
    const [itemQty, setItemQty] = useState(0);
    const [loading, setLoading] = useState(true);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        setFavorite(false);
        setItem(props.data);
        if (props.character !== undefined) {
            setCharacter(props.character);
            props.character.items.forEach(fav => {
                if (fav.id === props.character.id && fav.fav) {
                    setFavorite(true);
                }
            });
        }
        setLoading(false);
    }, [props.character, props.data]);

    const favoriteItem = (itemId, favState) => {
        if (character !== undefined && character.id !== 0) {
            let _item = character.items.find(item => item.id === itemId);
            if (_item !== null && _item !== undefined) {
                character.items.find(item => item.id === itemId).fav = favState;
            } else {
                character.items.push({
                    id: item.id,
                    qty: 0,
                    equip: false,
                    fav: favState
                });
            }
            setFavorite(favState);
            save(character);
        }
    }

    const addToCart = (ammount) => {
        let qty = isNaN(ammount) ? parseInt(ammount.target.value) : ammount;
        if (character !== undefined && character.id !== 0) {
            if (qty > 0) {
                let cost = isNaN(item.cost.replace("G", "")) ? 0 : parseFloat(item.cost.replace("G", ""));
                if (character.cart === undefined || character.cart.items.length === 0) {
                    character.cart = {
                        items: [{ id: item.id, qty: qty }],
                        total: (cost * qty)
                    }
                } else {
                    let index = character.cart.items.findIndex(cItem => cItem.id === item.id);
                    if (index === -1) {
                        character.cart.items.push(
                            { id: item.id, qty: qty }
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

    const getSource = (src) => {
        switch (src) {
            case ItemSource.CORE:
                return <Typography className="item-source">Core</Typography>
            case ItemSource.EXPANSION_1:
                return <Typography className="item-source">Expansion 1</Typography>
            case ItemSource.EXPANSION_3:
                return <Typography className="item-source">Expansion 3</Typography>
            case ItemSource.EXPANSION_5:
                return <Typography className="item-source">Expansion 5</Typography>
            case ItemSource.EXPANSION_6:
                return <Typography className="item-source">Expansion 6</Typography>
            case ItemSource.EXPANSION_8:
                return <Typography className="item-source">Expansion 8</Typography>
            case ItemSource.EXPANSION_10:
                return <Typography className="item-source">Expansion 10</Typography>
            default:
                return <Typography className="item-source">Custom</Typography>
        }
    }

    return (loading ? "" :
        <div key={item.id ? item.id : 0}>
            <Card className="item-card" id={item.id}>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description">
                    <Box sx={style}>
                        <Box className="item-header-modal">
                            <Typography sx={{fontSize: "18px"}}>{item.name}</Typography>
                            <div className="item-icon-modal"
                                style={{
                                    backgroundPositionX: item.icon.x + "px",
                                    backgroundPositionY: item.icon.y + "px"
                                }}
                            />
                        </Box>
                        <Typography><b>Use:</b> {item.use}</Typography>
                        <Typography><b>Cost:</b> {item.cost}</Typography>
                        <Typography><b>Effect:</b> {item.effect}</Typography>
                        <Typography><b>Description:</b> {item.description}</Typography>
                        {
                            props.displayOnly ? '' :
                                <Box className="cart-add-item-modal">
                                    <TextField onChange={setItemQty} className="cart-add-ammount" label="Qty." inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                                    <Button onClick={() => addToCart(itemQty)} className="cart-add-button">
                                        <AddShoppingCartIcon sx={{ marginRight: "5px" }} /> Add to Cart
                                    </Button>
                                    <Button onClick={() => favoriteItem(item.id, !favorite)} className="cart-fav-button">
                                        {
                                            favorite ?
                                                <><FavoriteIcon /> Favorite</> :
                                                <><FavoriteBorderIcon sx={{ marginRight: "5px" }} /> Favorite</>
                                        }
                                    </Button>
                                </Box>
                        }
                    </Box>
                </Modal>
                <Box className="item-card-wrapper">
                    <Box className="item-header">
                        <div className="item-icon"
                            style={{
                                backgroundPositionX: item.icon.x + "px",
                                backgroundPositionY: item.icon.y + "px"
                            }} />
                        <Box>
                            <Button onClick={handleOpen}><Typography className="item-name">{item.name}</Typography></Button>
                            <Typography sx={{ fontSize: "12px", display: "grid", justifyContent: "space-around", alignContent: "center"}}>Cost: {item.cost}</Typography>
                        </Box>
                    </Box>
                    <Tooltip title={item.effect} placement="top" >
                        <Typography className="item-effect" sx={{ fontSize: "12px", height: "40px" }}>Effect: {item.effect}</Typography>
                    </Tooltip>
                    {
                        props.displayOnly ? '' :
                            <Box className="cart-add-item">
                                <Button onClick={() => addToCart(1)} className="cart-add-button">
                                    <AddShoppingCartIcon />
                                </Button>
                                <Button onClick={() => favoriteItem(item.id, !favorite)} className="cart-fav-button">
                                    {
                                        favorite ?
                                            <FavoriteIcon /> :
                                            <FavoriteBorderIcon />
                                    }
                                </Button>
                            </Box>
                    }
                    {getSource(item.source)}
                </Box>
            </Card>
        </div>
    )

}

export default React.forwardRef((props, ref) => <ItemCard {...props} forwardedRef={ref} />)