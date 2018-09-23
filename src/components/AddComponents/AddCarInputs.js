import AutoComplete from "material-ui/AutoComplete";
import React from "react";
const styles = {
    block: {maxWidth: 250,}, step: {fontSize: "1.4vh"}, chip: {margin: '4'}
}

const AddCarInputs = (props) => {
    return (
        <div>
            <div className={'step'} style={{display: 'block'}}>
                <AutoComplete
                    floatingLabelText={"Szukaj"}
                    filter={AutoComplete.caseInsensitiveFilter}
                    menuStyle={styles.step}
                    type={"search"}
                    dataSource={props.stater.marks || ['Problem ze strukturą danych.']}
                    maxSearchResults={1}
                    onUpdateInput={props.handleUpdateInput}
                    onNewRequest={props.handleMarkRequest}
                />
            </div>
            <input
                className={'step'}
                value={props.stater.model}
                onChange={(ev) => props.setFromPropsToState({model: ev.target.value})}
            />
            <input
                className={'step'}
                value={props.stater.date}
                onChange={(ev) => props.setFromPropsToState({date: ev.target.value})}
            />
            <input
                className={'step'}
                value={props.stater.capacity}
                onChange={(ev) => props.setFromPropsToState({capacity: ev.target.value})}
            />
            <input
                className={'step'}
                value={props.stater.factoryNo}
                onChange={(ev) => props.setFromPropsToState({factoryNo: ev.target.value})}
            />
            <input
                className={'step'}
                value={props.stater.power}
                onChange={(ev) => props.setFromPropsToState({power: ev.target.value})}
            />
            <div className={'step'}>
                <AutoComplete
                    floatingLabelText={"Szukaj"}
                    filter={AutoComplete.caseInsensitiveFilter}
                    menuStyle={styles.step}
                    type={"search"}
                    dataSource={props.stater.list || ['Problem ze strukturą danych.']}
                    maxSearchResults={6}
                    onUpdateInput={props.handleUpdateInput}
                    onNewRequest={
                        props.handleNewRequest
                    }
                />
            </div>
        </div>
    )
}

export default AddCarInputs