import React from 'react'
import { connect } from 'react-redux'
import FormLoginOnStartup from "./FormLoginOnStartup"

class Auth extends React.Component {
    render() {
        return (
            <div>
                {
                    this.props.authState.isLoggedIn ?
                        this.props.children
                        :
                        <FormLoginOnStartup />
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({...state})


const mapDispatchToProps = (dispatch) => ({})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Auth);