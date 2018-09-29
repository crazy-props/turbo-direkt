import React from 'react'
import { connect } from 'react-redux'
import Container from '../UI/Container'
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentRem from 'material-ui/svg-icons/content/remove';


import Spinner from '../Utils/Spinner'

class FavoritesParts extends React.Component {

    render() {
        console.log(this.props.parts)
        return (

            <React.Fragment>
                {this.props.parts && this.props.parts.length ?
                    <Container>
                        <Table >
                            <TableBody displayRowCheckbox={false}>
                                {this.props.parts.splice(0, 10).map((part, idx) =>
                                    <TableRow key={idx}>
                                        <TableRowColumn>{idx + 1}</TableRowColumn>
                                        <TableRowColumn>{part.part}</TableRowColumn>
                                        <TableRowColumn>{part.amount}</TableRowColumn>
                                        <TableRowColumn>{part.key}</TableRowColumn>
                                        <TableRowColumn>
                                            <FloatingActionButton mini={true} >
                                                <ContentRem />
                                            </FloatingActionButton>
                                        </TableRowColumn>
                                    </TableRow>)



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

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FavoritesParts)