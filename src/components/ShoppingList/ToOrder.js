import React from "react";
import {ListItem} from "material-ui/List";
import IconButton from "material-ui/IconButton";
import RemoveFromCart from "material-ui/svg-icons/action/remove-shopping-cart";
import MoveToOrdered from "material-ui/svg-icons/content/forward";
import Divider from "material-ui/Divider";


const ToOrder = (props) => {
    return (
        <ListItem key={Math.random()}>
            {props.product.group} {props.product.value}

            <IconButton tooltip="usuń z koszyka"
                        onClick={() => props.removeProductFromShoppingList(props.product.value)}>
                <RemoveFromCart/>
            </IconButton>


            <IconButton tooltip="przenieś do zamówionych"
                        onClick={() => props.addToOrdered(props.product.value, props.product.group)}>
                <MoveToOrdered/>
            </IconButton>
            <Divider/>

        </ListItem>
    )
}

export default ToOrder