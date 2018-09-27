import React from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'
import TextField from 'material-ui/TextField'

const SearchInput = (props) =>
   <div>
      <Grid>
         <Row>
            <Col xs={12} sm={12} md={12} lg={12} >
               <div>
                  <span>{`Wyszukaj turbinę z listy: `}</span>
                  <TextField
                     onChange={props.handleTurbineNameChangeChandler }
                     hintText={'Wprowadź numer turbiny'}
                     type={'search'}
                  />
               </div>
            </Col>
         </Row>
      </Grid>
   </div>

export default SearchInput