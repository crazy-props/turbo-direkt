import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import {withStyles} from "@material-ui/core";
import TableTop from "../TableTop";
import Chip from 'material-ui/Chip';
import {Row} from "react-flexbox-grid";

const CustomTableCell = withStyles(theme => ({
    head: {backgroundColor: theme.palette.common.black, color: theme.palette.common.white,},
    body: {fontSize: 14,},
}))(TableCell);
const styles = {
    block: {maxWidth: 250,}, step: {fontSize: "1.4vh",}, chip: {margin: 4,},
}

const AddCarOutcomeTable = (props)=>{

    return (
        <Row className={'partsTableDiv'}>
            <table className="carsTable">
                <TableTop/>
                <TableBody key={Math.random()}>
                    <TableRow style={styles.row}>
                        <CustomTableCell component="th" scope="row">{props.mark}</CustomTableCell>
                        <CustomTableCell>{props.model}</CustomTableCell>
                        <CustomTableCell>{props.date}</CustomTableCell>
                        <CustomTableCell>{props.capacity}</CustomTableCell>
                        <CustomTableCell>{props.factoryNo}</CustomTableCell>
                        <CustomTableCell>{props.power}</CustomTableCell>
                        <CustomTableCell className="turboList">
                            {props.turbo && props.turbo.length ?
                                props.turbo.filter(function (a, b, c) {
                                    return c.indexOf(a) === b;
                                }).map(el =>
                                    <Chip
                                        key={el}
                                        onRequestDelete={() => {
                                            props.removeTurbo(el)
                                        }}
                                        style={styles.chip}
                                    >
                                        {el}
                                    </Chip>
                                ) :
                                props.turbo
                            }
                        </CustomTableCell>
                    </TableRow>
                </TableBody>
            </table>
        </Row>
    )

}


export default AddCarOutcomeTable
