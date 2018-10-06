import React, {Component} from "react";
import IconButton from "material-ui/IconButton";
import Remove from "material-ui/svg-icons/action/delete";
import AddToStorage from "material-ui/svg-icons/content/add-circle";
import SubtractFromStorage from "material-ui/svg-icons/content/remove-circle";
import {ListItem} from "material-ui/List";
import {removeMultipleFromShoppingList} from "../../state/shoppingList";
import connect from "react-redux/es/connect/connect";
import {addAmount, subtractAmount} from "../../state/partsState";
import Spinner from "../Utils/Spinner";


class AwaitingForDelivery extends Component {

    render() {
        let zmienna = this.props.parts.find(el => {
            if ((el.part === this.props.prod.value) && (el.group === this.props.prod.group)) {
                return {el}
            }else{return null}
        })
        let myArrayForState = ['actuator', 'back_plate', 'bearing_housing', 'compressor_wheel', 'gasket_kit', 'heat_shield', 'KODE_CHRA', 'nozzle', 'repair_kit', 'turbine_wheel']

        let arrayForHeadings = ['Actuator', 'Back plate', 'Bearing housing', 'Compressor wheel', 'Gasket kit', 'Heat shield', 'KODE CHRA', 'Nozzle', 'Repair kit', 'Turbine wheel'
        ]
        let partsGroup = arrayForHeadings[myArrayForState.indexOf(this.props.prod.group)]

        return (
            <ListItem>
                {zmienna ?
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <input type={'checkbox'}
                               className={'shoppingListChecked'}
                               value={this.props.prod.value}
                               name={'checkBoxForShoppingList'}
                               style={{
                                   top: '0',
                                   left: '0',
                                   height: '25px',
                                   width: '25px',
                                   backgroundColor: '#eee'
                               }}
                        />

                        {partsGroup} {this.props.prod.value}
                        <IconButton tooltip="usuń z listy zamówionych"
                                    onClick={() => this.props.removeProductFromShoppingList(this.props.prod.value)}>
                            <Remove/>
                        </IconButton>
                        <IconButton tooltip="odejmij ilość w magazynie"
                                    onClick={() => this.props.subtractAmount(zmienna.key)}>
                            <SubtractFromStorage/>
                        </IconButton>
                        {zmienna.amount}
                        <IconButton tooltip="zmień ilość w magazynie"
                                    onClick={() => this.props.addAmount(zmienna.key)}>
                            <AddToStorage/>
                        </IconButton>
                    </div>
                    : <Spinner/>
                }
            </ListItem>
        )
    }
}


const mapStateToProps = state => ({
    parts: state.partsState.parts

})

const mapDispatchToProps = dispatch => ({
    subtractAmount: (objectToSubtract, objectsGroup) => dispatch(subtractAmount(objectToSubtract, objectsGroup)),
    addAmount: (objectToAdd, groupOfObject) => dispatch(addAmount(objectToAdd, groupOfObject)),
    removeMultipleFromShoppingList: (list) => dispatch(removeMultipleFromShoppingList(list)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AwaitingForDelivery)