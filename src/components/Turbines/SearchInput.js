import React from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'
import TextField from 'material-ui/TextField'

const SearchInput = (props) =>
   <div>
      <Grid>
         <Row>
            <Col xs={12} sm={12} md={12} lg={12} >
               <div>
                  <TextField
                     onChange={props.handleTurbineNameChangeChandler }
                     hintText={'Szukaj turbiny'}
                     type={'search'}
                  />
               </div>
            </Col>
         </Row>
      </Grid>
   </div>

export default SearchInput