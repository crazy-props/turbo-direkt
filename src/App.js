import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import ListOfTurbines from './components/ListOfTurbines'
import ListOfCars from './components/ListOfCars'
import ListOfParts from './components/PartsList/ListOfParts'
import Dashboard from './components/Dashboard'
import ShoppingList from './components/ShoppingList/ShoppingList'


class App extends Component {
    render() {
        return (
            <div>
                <Router>
                    <div>

                        <Route
                            exact path={'/'}
                            component={() => (
                                <Dashboard/>)}
                        />

                        <Route
                            path={'/turbines'}
                            component={() => (
                                <ListOfTurbines/>)}
                        />

                        <Route
                            path={'/cars'}
                            component={() => (
                                <ListOfCars/>)}
                        />

                        <Route
                            path={'/parts'}
                            component={() => (
                                <ListOfParts/>)}
                        />
                        <Route
                            path={'/shopping-list'}
                            component={() => (
                                <ShoppingList/>)}
                        />

                    </div>
                </Router>
            </div>
        )
    }
}

export default App
