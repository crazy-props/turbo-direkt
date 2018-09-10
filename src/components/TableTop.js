import React from "react";

const TableTop = () => (
    <thead className="carsTableHead">
    <tr key={Math.random()}>
        <td>Marka</td>
        <td>Model</td>
        <td>Data</td>
        <td>Pojemność</td>
        <td>Ozn. fabryczne</td>
        <td>Moc</td>
        <td className="lastTh">Turbo OEM</td>
        <td></td>
    </tr>
    </thead>
)

export default TableTop