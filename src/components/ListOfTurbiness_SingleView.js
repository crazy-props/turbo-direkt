import React from 'react'

export const PartsColumn = props =>
    <td>
        <ul>
            {props.parts && props.parts.length ? props.parts.map(x => <li>{x}</li>) : props.parts}
        </ul>
    </td>