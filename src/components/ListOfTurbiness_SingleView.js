import React from 'react'
import { connect } from 'react-redux'
const PartsColumn = props =>
    <td>
        <ul>
            {props.parts && props.parts.length ?
                props.parts.map(x =>
                    <li>
                        {x}{`, `}
                        {props.part && props.part.length ?
                            props.part
                                .filter(z => z.part === x)
                                .map(x => <span>{`amount: ${x.amount}`}</span>)
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