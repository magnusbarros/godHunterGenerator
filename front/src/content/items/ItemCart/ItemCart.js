import React, { useState, useEffect } from "react";
import { save } from '../../../api/characters/CharacterAPI';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Box, Button, List, Typography, ListItemAvatar, ListItemText, ListItem, ListItemButton, Input } from "@mui/material";
import './itemCart.css'

export const ItemCart = (props) => {

    const [character, setCharacter] = useState();
    const [items, setItems] = useState();
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        setCharacter(props.character);
        setItems(props.items);
        cartTotal(props.character, props.items);
        setLoading(false);
    }, [props.character]);

    const removeItem = (itemId) => {
        let index = character.cart.items.findIndex(idx => idx.id === itemId);
        character.cart.items.splice(index, 1);
        save(character);
        setCharacter({ ...character });
        cartTotal({ ...character }, items);
    }

    const changeCartItemAmmount = (ev, itemId) => {
        let index = character.cart.items.findIndex(idx => idx.id === itemId);
        let value = parseInt(ev.target.value);
        character.cart.items[index].qty = value;
        if (character.cart.items[index].qty === 0) {
            removeItem(itemId);
        } else {
            save(character);
            setCharacter({ ...character });
            cartTotal({ ...character }, items);
        }
    }

    const cartTotal = (char, itemList) => {
        if (char.cart === null || char.cart === undefined) {
            setTotal(0);
        } else {
            let value = 0;

            char.cart.items.forEach(cItem => {
                value += (parseFloat(itemList.find(it => it.id === cItem.id).cost.replace("G", "")) * cItem.qty);
            });

            setTotal(value);
        }
    }

    const checkout = () => {
        if (total !== 0 && total <= character.gold) {
            character.gold = character.gold - total;
            character.cart.items.forEach(item => {
                let _item = items.find(listItem => listItem.id === item.id);
                if (character.items.findIndex(it => it.id === item.id) !== -1) {
                    character.items.find(it => it.id === item.id).qty += item.qty;
                    
                } else {
                    _item.qty = item.qty;
                    character.items.push(_item);
                }
            })
            clearCart();
        }
    }

    const clearCart = () => {
        character.cart.items = [];
        character.cart.total = 0;
        setTotal(0);
        setCharacter({ ...character });
        save(character)
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        height: 500,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const messages = [
        "Try to get some items!",
        "Buy something or leave!",
        "Cry to your GM to get some gold!",
        "Go grab something NOW!",
        "Protip: Don't fight a god without packing some items!",
        "Better sell that kushimitama!"
    ]

    return (loading ? "" :
        <Box sx={style}>
            <Box>
                {
                    character.cart !== null && character.cart !== undefined && character.cart.items.length !== 0 ?
                        <List sx={{overflowY: "scroll", maxHeight: "420px"}}>
                            {character.cart.items.map(cItem => {
                                return (
                                    <ListItem className="cart-list" key={cItem.id} >
                                        <ListItemAvatar>
                                            <div className="item-icon-cart"
                                                style={{
                                                    backgroundPositionX: items.find(lItem => lItem.id === cItem.id).icon.x + "px",
                                                    backgroundPositionY: items.find(lItem => lItem.id === cItem.id).icon.y + "px"
                                                }} />
                                        </ListItemAvatar>
                                        <ListItemText>
                                            <Typography sx={{ fontSize: "14px", width: "110px" }}>
                                                {items.find(lItem => lItem.id === cItem.id).name}</Typography>
                                        </ListItemText>
                                        <ListItemText>
                                            <Typography sx={{ fontSize: "12px", width: "50px" }}>
                                                {items.find(lItem => lItem.id === cItem.id).cost}</Typography>
                                        </ListItemText>
                                        <ListItemText>
                                            <Input sx={{ width: "30px", fontSize: "12px" }}
                                                type="number" value={cItem.qty}
                                                onChange={(ev) => changeCartItemAmmount(ev, cItem.id)} />
                                        </ListItemText>
                                        <ListItemButton onClick={() => removeItem(cItem.id)}><DeleteOutlineIcon /></ListItemButton>
                                    </ListItem>
                                )
                            })}
                        </List>
                        : <Box sx={{
                            position: "absolute",
                            margin: "auto",
                            left: "25%",
                            right: "25%",
                            top: "45%"
                        }}>
                            <Typography>Your cart is empty</Typography>
                            <Typography>{messages[Math.floor(Math.random() * 6)]}</Typography>
                        </Box>
                }
            </Box>
            <Box className="cart-menu">
                <Button onClick={() => clearCart()} ><RemoveShoppingCartIcon /> Clear </Button>
                <Button disabled={total === 0 || total > character.gold} onClick={() => checkout()} ><ShoppingCartIcon /> Checkout </Button>
                <Typography>Total: {total}G</Typography>
                <Typography>Your gold: {character.gold}G</Typography>
            </Box>
        </Box>
    )
} 