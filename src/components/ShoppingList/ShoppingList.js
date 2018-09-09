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
                    />
                    {this.props.productsToOrder ?
                        <div>
                            <List>
                                {this.props.productsToOrder.map(prod =>
                                    <ToOrder
                                        product={prod}
                                        removeProductFromShoppingList={this.props.removeProductFromShoppingList}
                                        addToOrdered={this.props.addToOrdered}
                                    />
                                )}
                            </List>

                        </div>
                        :
                        'loading'}
                </div>
                <div style={{width: '50%', paddingRight: '10%', marginLeft: '10px'}}>
                    <AppBar
                        title="Oczekujące na dostawę"
                        showMenuIconButton={false}
                    />
                    {this.props.ordered ?
                        <div>
                            <HeadersForOrderedList
                                removeMultipleFromShoppingList={this.props.removeMultipleFromShoppingList}/>
                            <List>
                                {this.props.ordered.map(prod => {
                                    return <AwaitingForDelivery
                                        prod={prod}
                                        removeProductFromShoppingList={this.props.removeProductFromShoppingList}
                                    />
                                })}
                            </List>

                        </div>
                        :
                        'loading'}
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    products: state.shoppingListState.products,
    ordered: state.shoppingListState.ordered,
    productsToOrder: state.shoppingListState.productsToOrder,
    parts: state.partsState.parts

})

const mapDispatchToProps = dispatch => ({
    removeProductFromShoppingList: (part) => dispatch(removeProductFromShoppingList(part)),
    addToOrdered: (prod, partsGroup) => dispatch(addToOrdered(prod, partsGroup)),
    removeMultipleFromShoppingList: (list) => dispatch(removeMultipleFromShoppingList(list)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShoppingList)