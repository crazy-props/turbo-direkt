import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import ListOfTurbines from './components/Turbines/ListOfTurbines'
import ListOfCars from './components/Cars/ListOfCars'
import ListOfParts from './components/Parts/ListOfParts'
import Dashboard from './components/Dashboard'
import ShoppingList from './components/ShoppingList/ShoppingList'
import AppFooter from "./components/AppFooter/AppFooter";
import AppBarMini from "./components/AppBar/AppBarMini";
import InputForm from "./components/Cars/InputFormListofCars";
import CheckboxContainer from './components/UI/CheckboxContainer';


class App extends Component {
    render() {
        return (
            <div>
                <Router>
                    <div className='router'>
                        <AppBarMini/>
                        <CheckboxContainer>
                            <InputForm/>
                        </CheckboxContainer>

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
                        />
                        <Route
                            path={'/shopping-list'}
                            component={ShoppingList}
                        />
                        <AppFooter/>
                    </div>
                </Router>
            </div>
        )
    }
}

export default App
