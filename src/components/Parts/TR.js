import React from "react";
import {
    addAmount,
    addToFavorites,
    deletePart,
    remToFavorites,
    subtractAmount
} from "../../state/partsState";
import TurbinesWithCurrentPart from './TurbinesWithCurrentPart'
import {addProductToShoppingList} from "../../state/shoppingList";
import connect from "react-redux/es/connect/connect";
import More from 'material-ui/svg-icons/notification/more'
import AddToFavoritesIcon from 'material-ui/svg-icons/toggle/star-border'
import RemoveFromFavoritesIcon from 'material-ui/svg-icons/toggle/star'
import AddToShoppingListIcon from 'material-ui/svg-icons/action/shopping-cart'
import RemovePartIcon from 'material-ui/svg-icons/action/delete'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';


class TR extends React.Component {
    state = {
        turbinesDialogOpen: false
    }

    handleturbinesDialogOpen = () => {
        this.setState({turbinesDialogOpen: true});
    };

    handleturbinesDialogClose = () => {
        this.setState({turbinesDialogOpen: false});
    };

    render() {
        const actions = [
            <FlatButton
                label="Zamknij"
                primary={true}
                onClick={this.handleturbinesDialogClose}
            />,
        ];

        let partsGroup = this.props.arrayForHeadings[this.props.myArrayForState.indexOf(this.props.partInStateArray.group)]

        return (
            <tr id={`${this.props.partInStateArray.part}`}
                key={`${this.props.partInStateArray.part}${this.props.index}`}
                className="partsTr"
            >
                <td className="partsTd tdName">{partsGroup} {this.props.partInStateArray.part}</td>
                <td className="partsTd tdSubtract">
                    <button
                        className={'partsButton'}
                        onClick={() => this.props.subtractAmount(this.props.partInStateArray.key)}
                    >-
                    </button>
                </td>
                <td className="partsTd tdAmount">{this.props.partInStateArray.amount}</td>
                <td className="partsTd tdAdd">
                    <button
                        className={'partsButton'}
                        onClick={() => this.props.addAmount(this.props.partInStateArray.key)}
                    >+
                    </button>
                </td>
                <td className="partsTd tdShoppingCart">
                    {this.props.partInStateArray.isFavorite === true ?
                        <button
                            onClick={() => this.props.remToFavorites(this.props.partInStateArray)}
                            className={'partsButton partsAddToShoppingListButton'}
                        >
                            <RemoveFromFavoritesIcon/>
                        </button>
                        :
                        <button
                            className={'partsButton partsAddToShoppingListButton'}
                            onClick={() => this.props.addToFavorites(this.props.partInStateArray)}
                        >

                            <AddToFavoritesIcon/>
                        </button>
                    }
                </td>
                <td className="partsTd tdShoppingCart">
                    <button
                        className={'partsButton partsAddToShoppingListButton'}
                        onClick={() => this.props.addProductToShoppingList(this.props.partInStateArray.part, this.props.partInStateArray.group)}
                    >
                        <AddToShoppingListIcon/>
                    </button>
                    <button
                        className={'partsButton partsAddToShoppingListButton'}
                        onClick={() => {
                            this.props.handleDialogOpen(this.props.partInStateArray)
                        }}
                    >
                        <RemovePartIcon/>
                    </button>
                    <button
                        className={'partsButton partsAddToShoppingListButton'}
                        onClick={() => this.handleturbinesDialogOpen()}
                    >
                        <More/>
                    </button>
                </td>
                <Dialog
                    actions={actions}
                    modal={true}
                    open={this.state.turbinesDialogOpen}
                >
                    <TurbinesWithCurrentPart
                    currentPart={this.props.partInStateArray}/>
                </Dialog>
            </tr>

        )

    }
}


const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
    addAmount: (partKey) => dispatch(addAmount(partKey)),
    subtractAmount: (partKey) => dispatch(subtractAmount(partKey)),
    addProductToShoppingList: (part, group) => dispatch(addProductToShoppingList(part, group)),
    addToFavorites: (partKey) => dispatch(addToFavorites(partKey)),
    remToFavorites: (partKey) => dispatch(remToFavorites(partKey)),
    deletePart: (partKey, partName) => dispatch(deletePart(partKey, partName)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TR)
