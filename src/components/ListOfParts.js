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
                                <th>part</th>
                                <th>amount</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.props.parts.map((part, index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            {part.part}
                                        </td>
                                        <td>
                                            {part.amount}
                                        </td>
                                    </tr>
                                )
                            })
                            }
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
