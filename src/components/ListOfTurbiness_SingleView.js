import React from 'react'
import { connect } from 'react-redux'
const PartsColumn = props =>
    <td>
        <ul>
            {props.parts && props.parts.length ?
                props.parts.map(part =>
                    <li>
                        {part}{`:`}
                        <br />
                        {props.part && props.part.length ?
                            props.part
                                .filter(z => z.part === part)
                                .map(part => <span>{`amount: ${part.amount}`}</span>)
                            : ` Loading amount...`}
                    </li>)
                : props.parts}
        </ul>
    </td>

const mapStateToProps = state => ({
    turbo: state.turboState.turbo,
    part: state.partsState.parts,
})

const mapDispatchToProps = dispatch => ({
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PartsColumn)