import React, {Component} from 'react'
import {connect} from "react-redux";
import {
    removeProductFromShoppingList, addToOrdered,
    removeMultipleFromShoppingList
} from '../state/shoppingList';


class ShoppingList extends Component {
    state = {
        listToRemove: []
    }

    removeAllSelected() {
        let arrayOfChecked = []
        let checkboxes = document.querySelectorAll('input[name=checkBoxForShoppingList]:checked')
        for (var i = 0; i < checkboxes.length; i++) {
            arrayOfChecked.push(checkboxes[i].value)
        }
        this.props.removeMultipleFromShoppingList(arrayOfChecked)
    }

    selectAllCheckBoxes() {
        let mycheckboxes = document.getElementsByName('checkBoxForShoppingList');
        for (var i = 0; i < mycheckboxes.length; i++) {
            mycheckboxes[i].checked = true;
        }
    }

    render() {
        return (
            <div>
                <div>
                    {this.props.productsToOrder && this.props.productsToOrder.length ?
                        <div>
                            <table>
                                <thead>
                                <tr>
                                    <th>do zamówienia</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.props.productsToOrder.map(prod => {
                                    console.log(prod)
                                    return (
                                        <tr>
                                            <td>{prod.value}</td>
                                            <td>
                                                <button
                                                    onClick={() => this.props.removeProductFromShoppingList(prod.value)}>usuń
                                                </button>
                                            </td>
                                            <td>
                                                <button onClick={() => this.props.addToOrdered(prod.value)}>
                                                    zamówione
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>

                        </div>
                        :
                        'loading'}
                </div>
                <div>
                    {this.props.ordered && this.props.ordered.length ?
                        <div>
                            <table>
                                <thead>
                                <tr>
                                    <th>
                                        <button
                                            onClick={() => this.selectAllCheckBoxes()}>zaznacz wszystkie
                                        </button>
                                    </th>
                                    <th>zamówione</th>
                                    <th>
                                        <button
                                            onClick={() => this.removeAllSelected()}
                                        >
                                            usuń wiele
                                        </button>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.props.ordered.map(prod => {
                                    return (
                                        <tr>
                                            <td>
                                                <input type={'checkbox'}
                                                       className={'shoppingListChecked'}
                                                       value={prod.value}
                                                       name={'checkBoxForShoppingList'}
                                                />
                                            </td>
                                            <td>{prod.value}</td>
                                            <td>
                                                <button
                                                    onClick={() => this.props.removeProductFromShoppingList(prod.value)}>usuń
                                                    z listy
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>

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

})

const mapDispatchToProps = dispatch => ({
    removeProductFromShoppingList: (part) => dispatch(removeProductFromShoppingList(part)),
    addToOrdered: (prod) => dispatch(addToOrdered(prod)),
    removeMultipleFromShoppingList: (list) => dispatch(removeMultipleFromShoppingList(list)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShoppingList)