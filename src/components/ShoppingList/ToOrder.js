import React from "react";
import {ListItem} from "material-ui/List";
import IconButton from "material-ui/IconButton";
import RemoveFromCart from "material-ui/svg-icons/action/remove-shopping-cart";
import MoveToOrdered from "material-ui/svg-icons/content/forward";
import Divider from "material-ui/Divider";


const ToOrder = (props) => {
    let myArrayForState = ['actuator', 'back_plate', 'bearing_housing', 'compressor_wheel', 'gasket_kit', 'heat_shield', 'KODE_CHRA', 'nozzle', 'repair_kit', 'turbine_wheel']

    let arrayForHeadings = ['Actuator', 'Back plate', 'Bearing housing', 'Compressor wheel', 'Gasket kit', 'Heat shield', 'KODE CHRA', 'Nozzle', 'Repair kit', 'Turbine wheel'
    ]
    let partsGroup = arrayForHeadings[myArrayForState.indexOf(props.product.group)]

    return (
        <ListItem key={Math.random()}>
            {partsGroup} {props.product.value}

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