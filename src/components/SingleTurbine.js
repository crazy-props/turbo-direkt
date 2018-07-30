import React, {Component} from 'react'

export default class SingleTurbine extends Component {
    render() {
        return (
            <div>
                    <ul><li>{this.props.el}</li></ul>
            </div>
        )
    }
}
