import React from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'
import TextField from 'material-ui/TextField'

const SearchInput = (props) =>
    <div>
        <Grid>
            <Row>
                <Col xs={12} sm={12} md={12} lg={12} >
                    <div>
                        <span>{`Search Turbine: `}</span>
                        <TextField
                            onChange={props.handleTurbineNameChangeChandler }
                            hintText={'Turbine number:'}
                            type={'search'}
                        />
                    </div>
                </Col>
            </Row>
        </Grid>
    </div>

export default SearchInput