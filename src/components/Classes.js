import React, { Component, Segment } from 'react'
import { Grid, Container } from 'semantic-ui-react'
import CardGroups from './projectComponent';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus} from '@fortawesome/free-solid-svg-icons'



library.add(faPlus)



export default class Class extends React.Component {


  render() {
    return (
        <Grid.Column  width={12} floated="right" className="style">
          <Grid  columns={1} className="head comp" >
            <Grid.Row  stretched verticalAlign="top">
              <Grid.Column className="dashboard card style" width={4}>
                <CardGroups  />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid.Column>
    );
  }
}
