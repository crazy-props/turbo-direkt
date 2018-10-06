import React, {Component} from 'react'
import {connect} from "react-redux";
import {
    removeProductFromShoppingList, addToOrdered,
    removeMultipleFromShoppingList
} from '../../state/shoppingList';

import {List} from 'material-ui/List';
import ToOrder from "./ToOrder";
import HeadersForOrderedList from "./HeadersForOrderedList";
import AwaitingForDelivery from "./AwaitingForDelivery";
import AppBar from 'material-ui/AppBar';
import Spinner from '../Utils/Spinner'
import {Snackbar} from "material-ui";
import {clearError} from "../../state/alerts";


class ShoppingList extends Component {
    state = {
        listToRemove: []
    }

    render() {

        return (
            <div style={{display: 'flex'}}>
                <div style={{width: '50%', paddingLeft: '10%'}}>
                    <AppBar
                        title="Do zamówienia"
                        showMenuIconButton={false}
                        style={{backgroundColor: 'darkgrey'}}
                    />
                    {this.props.productsToOrder ?
                        <div>
                            <List>
                                {this.props.productsToOrder.map(prod =>
                                    <ToOrder
                                        key={Math.random()}
                                        product={prod}
                                        removeProductFromShoppingList={this.props.removeProductFromShoppingList}
                                        addToOrdered={this.props.addToOrdered}
                                    />
                                )}
                            </List>
                            <Snackbar
                                autoHideDuration={4000}
                                open={this.props.imWithAlert}
                                message={this.props.alert}
                                bodyStyle={{textAlign: 'center'}}
                                onRequestClose={this.props.clearError}
                            />
                        </div>
                        :
                        <Spinner/>}
                </div>
                <div style={{width: '50%', paddingRight: '10%', marginLeft: '10px'}}>
                    <AppBar
                        title="Oczekujące na dostawę"
                        showMenuIconButton={false}
                        style={{backgroundColor: 'darkgrey'}}

                    />
                    {this.props.ordered ?
                        <div>
                            <HeadersForOrderedList
                                removeMultipleFromShoppingList={this.props.removeMultipleFromShoppingList}/>
                            <List>
                                {this.props.ordered.map(prod => {
                                    return <AwaitingForDelivery
                                        key={Math.random()}
                                        prod={prod}
                                        removeProductFromShoppingList={this.props.removeProductFromShoppingList}
                                    />
                                })}
                            </List>
                            <Snackbar
                                autoHideDuration={4000}
                                open={this.props.imWithAlert}
                                message={this.props.alert}
                                bodyStyle={{textAlign: 'center'}}
                                onRequestClose={this.props.clearError}
                            />
                        </div>
                        :
                        <Spinner/>
                    }
                </div>

            </div>
        )
    }
}


const mapStateToProps = state => ({
    products: state.shoppingListState.products,
    ordered: state.shoppingListState.ordered,
    productsToOrder: state.shoppingListState.productsToOrder,
    parts: state.partsState.parts,
    alert: state.alerts.alert,
    imWithAlert: state.alerts.imWithAlert
})

const mapDispatchToProps = dispatch => ({
    removeProductFromShoppingList: (part) => dispatch(removeProductFromShoppingList(part)),
    addToOrdered: (prod, partsGroup) => dispatch(addToOrdered(prod, partsGroup)),
    removeMultipleFromShoppingList: (list) => dispatch(removeMultipleFromShoppingList(list)),
    clearError: () => dispatch(clearError())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShoppingList)