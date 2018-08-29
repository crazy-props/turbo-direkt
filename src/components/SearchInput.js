import React from 'react'

import TextField from 'material-ui/TextField';
import { Grid, Row, Col } from 'react-flexbox-grid';

const SearchInput = (props) =>
   <div>
      <Grid>
         <Row>
            <Col xs={12} sm={12} md={12} lg={12} >
               <div>
                  <h3>Search Turbine:</h3>
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