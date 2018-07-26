import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import ListOfTurbines from './components/ListOfTurbines'
import ListOfCars from './components/ListOfCars'
import Dashboard from './components/Dashboard'


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
                            path={'/turbines'}g
                            component={() => (
                                <ListOfTurbines/>)}
                        />

                        <Route
                            path={'/cars'}
                            component={() => (
                                <ListOfCars/>)}
                        />

                    </div>

                </Router>
            </div>
        )
    }
}

export default App
