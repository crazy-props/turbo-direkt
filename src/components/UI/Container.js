import React from 'react'
import Paper from 'material-ui/Paper'
import style from './styleUi'

const Container = (props) => <Paper style={style.container} zDepth={2}>{props.children}</Paper>

export default Container