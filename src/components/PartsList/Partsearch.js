import {Component} from "react";
import TextField from "material-ui/TextField";
import React from "react";
import {searchParts} from "../../state/partsState";
import connect from "react-redux/es/connect/connect";


class Partsearch extends Component {

    state = {
        searchValue: this.props.search
    }


    setToState = (ev) => {
        this.setState({searchValue: ev.target.value})

    }

    useFilter = () => {
        this.props.searchParts(this.state.searchValue)

    }

    render() {
        return (
            <div>
                <TextField
                    id={'idForTextField'}
                    fullWidth={true}
                    floatingLabelText={'szukaj części'}
                    value={this.state.searchValue}
                    onChange={this.setToState}
                    onKeyPress={(ev) => {
                        if (ev.key === 'Enter') {
                            this.useFilter(ev)
                        }
                    }}
                    onBlur={this.useFilter}
                />
            </div>
        )
    }
}


const mapStateToProps = state => ({
    search: state.partsState.search
})

const mapDispatchToProps = dispatch => ({
    searchParts: (val) => dispatch(searchParts(val))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Partsearch)
