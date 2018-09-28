import React from 'react';
import Checkbox from "material-ui/Checkbox";

const styles = {
    checkbox: {
        marginBottom: 16,
    },
    checked: {
        fill: '#b88181',
    },
    label:{
        color: '#fff',
        fontFamily: 'Lato',
    },
    
}

const CheckBoxes = (props) => (
        <div>
            <Checkbox
                disabled={props.stepIndex > 0}
                label="Pojazdy"
                checked={props.checked1}
                onCheck={props.onCheck1}
                style={styles.checkbox}
                iconStyle={styles.checked}
                labelStyle={styles.label}
            
            />
            <Checkbox
                disabled={props.stepIndex > 0}
                label="Części"
                checked={props.checked2}
                onCheck={props.onCheck2}
                style={styles.checkbox}
                iconStyle={styles.checked}
                labelStyle={styles.label}
            />
            <Checkbox
                disabled={props.stepIndex > 0}
                label="Turbiny"
                checked={props.checked3}
                onCheck={props.onCheck3}
                style={styles.checkbox}
                iconStyle={styles.checked}
                labelStyle={styles.label}
            />
        </div>
)

export default CheckBoxes