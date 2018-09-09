import React from "react";
import {List, ListItem} from "material-ui/List";
import IconButton from "material-ui/IconButton";
import CheckBox from "material-ui/svg-icons/toggle/check-box";
import Unselect from "material-ui/svg-icons/toggle/indeterminate-check-box";
import RemoveSelected from "material-ui/svg-icons/content/delete-sweep";

const HeadersForOrderedList = (props) => {

    const removeAllSelected = () => {
        let arrayOfChecked = []
        let checkboxes = document.querySelectorAll('input[name=checkBoxForShoppingList]:checked')
        for (var i = 0; i < checkboxes.length; i++) {
            arrayOfChecked.push(checkboxes[i].value)
        }
        props.removeMultipleFromShoppingList(arrayOfChecked)
    }

    const selectAllCheckBoxes = () => {
        let mycheckboxes = document.getElementsByName('checkBoxForShoppingList');
        for (var i = 0; i < mycheckboxes.length; i++) {
            mycheckboxes[i].checked = true;
        }
    }

    const unSelectAllCheckBoxes = () => {
        let mycheckboxes = document.getElementsByName('checkBoxForShoppingList');
        for (var i = 0; i < mycheckboxes.length; i++) {
            mycheckboxes[i].checked = false;
        }
    }
    return (
        <List>
            <ListItem>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <IconButton tooltip="zaznacz wszystkie"
                                onClick={() => selectAllCheckBoxes()}>
                        <CheckBox/>
                    </IconButton>
                    <IconButton tooltip="usuń zaznaczenie"
                                onClick={() => unSelectAllCheckBoxes()}>
                        <Unselect/>
                    </IconButton>
                    <IconButton tooltip="usuń zaznaczone"
                                onClick={() => removeAllSelected()}>
                        <RemoveSelected/>
                    </IconButton>
                </div>
            </ListItem>
        </List>
    )
}

export default HeadersForOrderedList