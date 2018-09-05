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
                label="Add new car"
                checked={props.checked1}
                onCheck={props.onCheck1}
                style={styles.checkbox}
            />
            <Checkbox
                disabled={props.stepIndex > 0}
                label="Add new part"
                checked={props.checked2}
                onCheck={props.onCheck2}
                style={styles.checkbox}
            />
            <Checkbox
                disabled={props.stepIndex > 0}
                label="Add new turbo"
                checked={props.checked3}
                onCheck={props.onCheck3}
                style={styles.checkbox}
            />
        </div>
)

export default CheckBoxes