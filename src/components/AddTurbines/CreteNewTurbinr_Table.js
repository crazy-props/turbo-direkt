import React from 'react'
import Chip from 'material-ui/Chip';

const TableWithCreatingTurbine = (props) => {
    const _listOfParts = ['Turbo OEM', 'Compressor Wheel', 'Turbine Wheel', 'Bearing Housing', 'Back Plate', 'Heat Shield', 'Actuator', 'Noozles', 'Gasket Kit', 'Repair Kit', 'KODE CHRA']
    const _parts = ['compressor_wheel', 'turbine_wheel', 'bearing_housing', 'back_plate', 'heat_shield', 'nozzles', 'actuator', 'gasket_kit', 'repair_kit', 'KODE_CHRA']
    const styles = {
        chip: {
            margin: 4,
        },
    }
    console.log(props.creatingTurbine)
    return (
        <table className="carsTable">
            <thead className="carsTableHead">
                <tr>
                    {_listOfParts.map((el, idx) => <th key={idx}>{el}</th>)}
                </tr>
            </thead>
            <tbody >
                <tr className="trOne">
                    <td>{props.creatingTurbine.turboOEM}</td>
                    {_parts.map(part =>
                        <td> {
                            props.creatingTurbine[part] && props.creatingTurbine[part].length ?
                                props.creatingTurbine[part].map((singlePart, idx) =>
                                    < Chip
                                        onRequestDelete={()=>props.handleRequestPartsDelete(part, idx)}
                                        style={styles.chip}
                                    >
                                        {singlePart}
                                    </Chip >
                                ) : '-----'}
                        </td>)}
                </tr>
            </tbody>
        </table>)
}

export default TableWithCreatingTurbine

