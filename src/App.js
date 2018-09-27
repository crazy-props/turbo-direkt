import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import ListOfTurbines from './components/Turbines/ListOfTurbines'
import ListOfCars from './components/Cars/ListOfCars'
import ListOfParts from './components/ListOfParts'
import Dashboard from './components/Dashboard'
import ShoppingList from './components/ShoppingList'
import AppBarMini from './components/AppBar/DashboardAppBarFor';
import AppFooter from './components/AppFooter/AppFooter';


class App extends Component {
    render() {
        return (
            <div>
                <Router>
                    <div>
                        <AppBarMini />

                        <Route
                            exact path={'/'}
                            component={() => (
                                <Dashboard />)}
                        />

                        <Route
                            path={'/turbines'}
                            component={() => (
                                <ListOfTurbines />)}
                        />

                        <Route
                            path={'/cars'}
                            component={() => (
                                <ListOfCars />)}
                        />

                        <Route
                            path={'/parts'}
                            component={() => (
                                <ListOfParts />)}
                        />
                        <Route
                            path={'/shopping-list'}
                            component={() => (
                                <ShoppingList />)}
                        />
                        <AppFooter />
                    </div>
                </Router>
            </div>
        )
    }
}

export default App
