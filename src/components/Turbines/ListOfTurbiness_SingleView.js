import React from 'react'
import { connect } from 'react-redux'
const PartsColumn = props =>
    <td className="turboList">
        <ul>
            {props.parts && props.parts.length ?
                props.parts.map((part) =>
                    <li key={part}>
                        {part}{`:`}
                        <br />
                        {props.part && props.part.length ?
                            props.part
                                .filter(turbo => turbo.part === part)
                                .map(part => <span key={part.part}>{`ilość: ${part.amount}`}</span>)
                            : `Ładuję ilość...`}
                    </li>)
                : props.parts}
        </ul>
    </td>

const mapStateToProps = state => ({
    turbo: state.turboState.turbo,
    part: state.partsState.parts,
})

const mapDispatchToProps = dispatch => ({
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PartsColumn)