import React from 'react'
import {connect} from 'react-redux'
/* material UI components */
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import IconPartOK from 'material-ui/svg-icons/action/check-circle'
import IconPartWarning from 'material-ui/svg-icons/alert/warning'
import IconPartEmpty from 'material-ui/svg-icons/action/highlight-off'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentRem from 'material-ui/svg-icons/content/remove'
import {remToFavorites} from '../../state/partsState'
import Container from '../UI/Container'
import Spinner from '../Utils/Spinner'
import {addProductToShoppingList} from "../../state/shoppingList";


class FavoritesParts extends React.Component {

    render() {
        return (
            <React.Fragment>
                {this.props.parts && this.props.parts.length ?
                    <Container>
                        <Table>
                            <TableHeader
                                displaySelectAll={false}
                                adjustForCheckbox={false}
                                style={{background: '#5b6164'}}
                            >
                                <TableRow style={{fill: 'white'}}>
                                    <TableHeaderColumn>Dostępność</TableHeaderColumn>
                                    <TableHeaderColumn>Nazwa części</TableHeaderColumn>
                                    <TableHeaderColumn>Ilość w magazynie</TableHeaderColumn>
                                    <TableHeaderColumn>Grupa</TableHeaderColumn>
                                    <TableHeaderColumn>Usuń z obserowowanych</TableHeaderColumn>
                                    <TableHeaderColumn>Dodaj do zakupów</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody displayRowCheckbox={false} showRowHover={true}>
                                {this.props.parts.map((part, idx) => part.hasOwnProperty('isFavorite') && part.isFavorite == true ?
                                    <TableRow key={idx}>
                                        <TableRowColumn>
                                            {part.amount > 1 ? <IconPartOK style={{fill: '#3e8432'}}/>
                                                : part.amount === 1 ? <IconPartWarning style={{fill: '#ff9900'}}/>
                                                    : <IconPartEmpty style={{fill: '#b10303'}}/>}
                                        </TableRowColumn>
                                        <TableRowColumn>{part.part}</TableRowColumn>
                                        <TableRowColumn>{part.amount}</TableRowColumn>
                                        <TableRowColumn>{part.group}</TableRowColumn>
                                        <TableRowColumn>
                                            <FloatingActionButton
                                                mini={true}
                                                iconStyle={{background: '#b88181', margin: 'auto'}}
                                                onClick={() => this.props.remToFavorites(part)}
                                            >
                                                <ContentRem/>
                                            </FloatingActionButton>
                                        </TableRowColumn>
                                        <TableRowColumn>
                                            {!this.props.shoppingListState.find(el => el.value === part.part) ?
                                                <button
                                                    className={'partsButton partsAddToShoppingListButton'}
                                                    onClick={() => this.props.addProductToShoppingList(part.part, part.group)}
                                                >
                                                    <svg id="search-icon" className="search-icon"
                                                         style={{margin: 'auto'}}
                                                         height="20"
                                                         viewBox="0 0 576 512"
                                                    >
                                                        <title>dodaj do listy zakupów</title>
                                                        <path
                                                            d='M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z'/>
                                                    </svg>
                                                </button>
                                                : null
                                            }
                                        </TableRowColumn>
                                    </TableRow>
                                    :
                                    null)
                                }
                            </TableBody>
                        </Table>
                    </Container>
                    :
                    <Spinner/>
                }
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    parts: state.partsState.parts,
    shoppingListState: state.shoppingListState.products
})

const mapDispatchToProps = dispatch => ({
    remToFavorites: (partsKey) => dispatch(remToFavorites(partsKey)),
    addProductToShoppingList: (part, group) => dispatch(addProductToShoppingList(part, group)),

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FavoritesParts)