import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { connect } from 'react-redux'
import ListOfTurbines from './components/ListOfTurbines'
import ListOfCars from './components/ListOfCars'
import ListOfParts from './components/PartsList/ListOfParts'
import Dashboard from './components/Common/Dashboard'
import ShoppingList from './components/ShoppingList/ShoppingList'
import AppBarMini from "./components/Auth/DashboardAppBarFor";
import {logOut} from "./state/authState";


class App extends Component {
    render() {
        return (
            <div>
                <Router>
                    <div>
                        <AppBarMini logOutButton={this.props.logOut}/>
                        <Route
                            exact path={'/'}
                            component={Dashboard}
                        />

                        <Route
                            path={'/turbines'}
                            component={ListOfTurbines}
                        />

                        <Route
                            path={'/cars'}
                            component={ListOfCars}
                        />

                        <Route
                            path={'/parts'}
                            component={ListOfParts}
                            parts={this.props.partState}
                        />
                        <Route
                            path={'/shopping-list'}
                            component={ShoppingList}
                        />

                    </div>
                </Router>
            </div>
        )
    }
}


export default connect(
    state => ({

    }),
    dispatch => ({
        logOut: () => dispatch(logOut())

    })
)(App)