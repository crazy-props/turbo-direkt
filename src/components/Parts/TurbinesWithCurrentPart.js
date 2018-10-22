import React from "react";
import connect from "react-redux/es/connect/connect";
import * as _ from 'lodash'

class TurbinesWithCurrentPart extends React.Component {
    state = {
        filteredTurbines: []
    }

    componentDidMount() {
        this.getAllTrubinesWithCurrentPart()
    }

    getAllTrubinesWithCurrentPart() {
        const turbinesWithCurrentPartGroup = this.props.turbo.filter(turbine => {
            if ((turbine[this.props.currentPart.group] !== undefined) && turbine[this.props.currentPart.group].length > 0) {
                return turbine[this.props.currentPart.group]


            }

        })
        let arrayOfFilteredTurbines = []
        turbinesWithCurrentPartGroup.filter(el => {
            if (el[this.props.currentPart.group].filter(elek => elek === this.props.currentPart.part).length > 0) {
                arrayOfFilteredTurbines.push(el)
            }
        })
        this.setState({filteredTurbines: _.uniqBy(arrayOfFilteredTurbines, 'turboOEM')})
    }


    render() {

        return (
            <div>
                <h3>Turbiny, zbudowane z użyciem {this.props.currentPart.group} {this.props.currentPart.part}</h3>
                {this.state.filteredTurbines.map((turbine, index) => {
                    return (
                        <div key={index}
                             style={{margin: 'auto', padding: '5px'}}>
                            {turbine.turboOEM}
                        </div>
                    )
                })}
            </div>

        )
    }
}


const mapStateToProps = state => ({
    turbo: state.turboState.turbo

})

const mapDispatchToProps = dispatch => ({})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TurbinesWithCurrentPart)