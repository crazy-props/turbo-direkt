import React, {Component} from 'react'
import {connect} from "react-redux";


class ListOfParts extends Component {
    render() {
        return (
            <div>
                {/* {console.log(this.props.parts)} */}
            </div>
        )
    }
}


const mapStateToProps = state => ({
    parts: state.partsState.parts,

})

const mapDispatchToProps = dispatch => ({
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListOfParts)
