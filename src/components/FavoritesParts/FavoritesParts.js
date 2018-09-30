import React from 'react'
import { connect } from 'react-redux'
/* material UI components */
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import IconPartOK from 'material-ui/svg-icons/action/check-circle'
import IconPartWarning from 'material-ui/svg-icons/alert/warning'
import IconPartEmpty from 'material-ui/svg-icons/action/highlight-off'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentRem from 'material-ui/svg-icons/content/remove'
import { remToFavorites } from '../../state/partsState'
import Container from '../UI/Container'
import Spinner from '../Utils/Spinner'



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
                                style={{ background: '#5b6164' }}
                            >
                                <TableRow style={{ fill: 'white' }}>
                                    <TableHeaderColumn>Dostępność</TableHeaderColumn>
                                    <TableHeaderColumn>Nazwa części</TableHeaderColumn>
                                    <TableHeaderColumn>Ilość w magazynie</TableHeaderColumn>
                                    <TableHeaderColumn>Grupa</TableHeaderColumn>
                                    <TableHeaderColumn>Usuń z obserowowanych</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody displayRowCheckbox={false} showRowHover={true}>
                                {this.props.parts.map((part, idx) => part.hasOwnProperty('isFavorite') && part.isFavorite == true ?
                                    <TableRow key={idx}>
                                        <TableRowColumn>
                                            {part.amount > 1 ? <IconPartOK style={{ fill: '#3e8432' }} />
                                                : part.amount === 1 ? <IconPartWarning style={{ fill: '#ff9900' }} />
                                                    : <IconPartEmpty style={{ fill: '#b10303' }} />}
                                        </TableRowColumn>
                                        <TableRowColumn>{part.part}</TableRowColumn>
                                        <TableRowColumn>{part.amount}</TableRowColumn>
                                        <TableRowColumn>{part.group}</TableRowColumn>
                                        <TableRowColumn>
                                            <FloatingActionButton
                                                mini={true}
                                                iconStyle={{ background: '#b88181', margin: 'auto' }}
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