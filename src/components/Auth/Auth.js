import React from 'react'
import { connect } from 'react-redux'
import FormLoginOnStartup from "./FormLoginOnStartup"
import { logInByMailAndPass } from "../../state/authState";
import AppFooterColumnOne from '../AppFooter/AppFooterColumnOne';
import AppFooter from "../AppFooter/AppFooter"
class Auth extends React.Component {
    render() {
        return (
            <div >
                {
                    this.props.authState.isLoggedIn ?
                        this.props.children
                        :
                        <div className='auth'>
                            <FormLoginOnStartup />
                            <AppFooter />
                        </div>

                }

            </div>
        )
    }
}

const mapStateToProps = state => ({ ...state })


const mapDispatchToProps = (dispatch) => ({
    logInByMailAndPass: (email, password) => dispatch(logInByMailAndPass(email, password)),
}
)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Auth);