import React from 'react'
import Paper from 'material-ui/Paper'


const style = {
    container: {
        padding: '30px',
        background: '#E0E0E0',
        margin: '10px'
    }
}

const Container = (props) => <Paper style={style.container} zDepth={2}>{props.children}</Paper>

export default Container