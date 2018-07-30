import React, {Component} from 'react'
import {connect} from "react-redux";


class ListOfParts extends Component {
    render() {
        return (
            <div>
                {
                    this.props.parts ?
                        <table>
                            <thead>
                            <tr>
                                <th>group</th>
                                <th>part</th>
                                <th>amount</th>
                            </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>

                        : "loading"}
            </div>
        )
    }
}


const mapStateToProps = state => ({
    parts: state.partsState.parts,

})

const mapDispatchToProps = dispatch => ({})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListOfParts)
