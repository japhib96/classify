
import React, { Component } from 'react'
import { Grid, Menu, Segment, Icon, Header, Container } from 'semantic-ui-react'
import CardGroups from './projectComponent';
import AddButton from './AddModal';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faCoffee, faGraduationCap } from '@fortawesome/free-solid-svg-icons'

library.add(faCheckSquare, faCoffee, faGraduationCap)


export default class DashboardGridComponent extends Component {




  render() {


    return (
      <div style={{height: '86.2%'}}>
        <Grid columns={2} doubling stretched className="style" >
            <Grid.Column className="style" stretched width={4} floated='left' >
              <Container>
                <Grid columns={1} centered  textAlign="center" verticalAlign="middle">
                  <Grid.Row className="menu style" color="pink" width={4} verticalAlign="middle" >
                    <Container textAlign="center" className="user dashboard menu">
                      <FontAwesomeIcon icon="graduation-cap" size="3x" /> <h2>Classes</h2>
                    </Container>
                  </Grid.Row>
                  <Grid.Row className="menu style" color="pink" width={4} verticalAlign="middle" >
                    <Container textAlign="center" className="user dashboard menu">
                      <FontAwesomeIcon icon="graduation-cap" size="3x" /> <h2>Classes</h2>
                    </Container>
                  </Grid.Row>
                  <Grid.Row className="menu style" color="pink" width={4} verticalAlign="middle" >
                    <Container textAlign="center" className="user dashboard menu">
                      <FontAwesomeIcon icon="graduation-cap" size="3x" /> <h2>Classes</h2>
                    </Container>
                  </Grid.Row>
                </Grid>
              </Container>
            </Grid.Column>
            <Grid.Column stretched width={12} floated="right" color="blue" className="style">
              <Container>
                <Grid>
                  <Grid.Column className="dashboard style" color="red" width={4}>
                    <CardGroups />
                  </Grid.Column>
                  <Grid.Column className="dashboard style" color="red" width={4}>

                  </Grid.Column>
                  <Grid.Column className="dashboard style" color="red" width={4}>

                  </Grid.Column>
                  <Grid.Column className="dashboard style" color="red" width={4}>

                  </Grid.Column>
                  <Grid.Column className="dashboard style" color="red" width={4}>

                  </Grid.Column>

                  <Grid.Column className="dashboard style" color="red" width={4}>

                  </Grid.Column>
                </Grid>
              </Container>
            </Grid.Column>
        </Grid>
      </div>
    )
  }
}
