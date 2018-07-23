import React, {Component} from 'react'
import ListOfTurbines from './components/ListOfTurbines'
import ListOfCars from './components/ListOfCars'

class App extends Component {
    render() {
        return (
            <div>
                <ListOfTurbines/>
                <ListOfCars/>
            </div>
        )
    }
}

export default App
