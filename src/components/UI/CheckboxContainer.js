import React from 'react'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import style from './styleUi'

const CheckboxContainer = (props) => (
    <Card style={style.checkboxContainer} >
        <CardHeader
            title="Dodaj do katalogu"
            actAsExpander={true}
            showExpandableButton={true}
            titleColor = {'#fff'}
            titleStyle={{fontFamily: 'Lato'}}
            iconStyle={{color: '#fff'}}
        />
        <CardText expandable={true}>
            {props.children}
        </CardText>
    </Card>)

export default CheckboxContainer
