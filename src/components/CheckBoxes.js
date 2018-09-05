import React from 'react';
import Checkbox from "material-ui/Checkbox";

const styles = {
    checkbox: {
        marginBottom: 16,

    }
}

const CheckBoxes = (props) => (
        <div>
            <Checkbox
                disabled={props.stepIndex > 0}
                label="Dodaj pojazd"
                checked={props.checked1}
                onCheck={props.onCheck1}
                style={styles.checkbox}
            />
            <Checkbox
                disabled={props.stepIndex > 0}
                label="Dodaj część"
                checked={props.checked2}
                onCheck={props.onCheck2}
                style={styles.checkbox}
            />
            <Checkbox
                disabled={props.stepIndex > 0}
                label="Dodaj turbine"
                checked={props.checked3}
                onCheck={props.onCheck3}
                style={styles.checkbox}
            />
        </div>
)

export default CheckBoxes