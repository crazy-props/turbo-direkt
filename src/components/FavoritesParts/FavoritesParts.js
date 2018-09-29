import React from 'react'
import { connect } from 'react-redux'
/* material UI components */
import Container from '../UI/Container'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentRem from 'material-ui/svg-icons/content/remove';

import Spinner from '../Utils/Spinner'
import { remToFavorites } from '../../state/partsState'

class FavoritesParts extends React.Component {

    render() {
        return (

            <React.Fragment>
                {this.props.parts && this.props.parts.length ?
                    <Container>
                        <Table >
                            <TableBody displayRowCheckbox={false}>
                                {this.props.parts.map((part, idx) => part.hasOwnProperty('isFavorite') && part.isFavorite == true ?
                                    <TableRow key={idx}>
                                        <TableRowColumn>{part.part}</TableRowColumn>
                                        <TableRowColumn>{part.amount}</TableRowColumn>
                                        <TableRowColumn>{part.key}</TableRowColumn>
                                        <TableRowColumn>
                                            <FloatingActionButton mini={true}
                                                onClick={() => this.props.remToFavorites(part)}

                                            >
                                                <ContentRem />
                                            </FloatingActionButton>
                                        </TableRowColumn>
                                    </TableRow>
                                    :
                                    null)
                                }
                            </TableBody>
                        </Table>

                    </Container>
                    :
                    <Spinner />
                }
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    parts: state.partsState.parts,
})

const mapDispatchToProps = dispatch => ({
    remToFavorites: (partsKey) => dispatch(remToFavorites(partsKey))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FavoritesParts)