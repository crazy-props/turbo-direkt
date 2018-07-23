import React, {Component} from 'react';
import {connect} from 'react-redux';
import Paper from 'material-ui/Paper';

const style = {
    height: 100,
    width: 100,
    margin: 20,
    textAlign: 'center',
    display: 'inline-block',
};


class MyComponent extends Component {
    render() {
        return (
            <div>
                <Paper style={style} zDepth={2} rounded={false} />
                <div>
                    <div>Storage</div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(
    mapStateToProps,
)(MyComponent);
