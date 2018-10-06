import {Component} from "react";
import TextField from "material-ui/TextField";
import React from "react";
import {searchParts} from "../../state/partsState";
import connect from "react-redux/es/connect/connect";
import {Grid, Row, Col} from 'react-flexbox-grid'
import Backspace from "material-ui/svg-icons/content/backspace";
import IconButton from "material-ui/IconButton";


class PartSearch extends Component {

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
                <Grid>
                    <Row>
                        <Col xs={12} sm={12} md={12} lg={12}>
                            <div>
                                <TextField
                                    id={'idForTextField'}
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
                                <IconButton tooltip="czyść filtr"
                                            onClick={() => {this.props.searchParts(''), this.setState({searchValue: ''})}}
                                >
                                    <Backspace/>
                                </IconButton>
                            </div>
                        </Col>
                    </Row>
                </Grid>
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
)(PartSearch)