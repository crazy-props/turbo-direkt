import AutoComplete from "material-ui/AutoComplete";
import React from "react";
const styles = {
    block: {maxWidth: 250,}, step: {fontSize: "1.4vh"}, chip: {margin: '4'}
}

const AddPartInputs = (props) => {
    return (
        <div>
            <div className={'step'} style={{display: 'block'}}>
                <AutoComplete
                    floatingLabelText={"Szukaj"}
                    filter={AutoComplete.caseInsensitiveFilter}
                    menuStyle={styles.step}
                    type={"search"}
                    dataSource={props.stater.groups || ['Problem ze strukturą danych.']}
                    maxSearchResults={3}
                    onUpdateInput={props.handleUpdateGroupInput}
                    onNewRequest={props.handleGroupRequest}
                />
            </div>

            <div className={'step'} style={{display: 'none'}}>
                <AutoComplete
                    floatingLabelText={"Szukaj"}
                    filter={AutoComplete.caseInsensitiveFilter}
                    menuStyle={styles.step}
                    type={"search"}
                    dataSource={props.stater.parts || ['Problem ze strukturą danych.']}
                    maxSearchResults={6}
                    onUpdateInput={props.handleUpdatePartInput}
                    onNewRequest={props.handlePartRequest}
                />
            </div>
            <div
                className={'step'}>
                Dodajesz część: {props.stater.group}: {props.stater.part}
            </div>
        </div>
    )
}

export default AddPartInputs