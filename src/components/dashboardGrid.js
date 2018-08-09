
import React, { Component } from 'react'
import AddButton from './AddModal';
import { Grid, Container, Button } from 'semantic-ui-react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faCoffee, faGraduationCap, faQuestion, faChartLine } from '@fortawesome/free-solid-svg-icons'
import Divider from './divider';
import Class from './Classes';
import Lecture from './Lecture';

library.add(faCheckSquare, faCoffee, faGraduationCap, faQuestion, faChartLine)


export default class DashboardGridComponent extends Component {


  render() {


    return (
      <div style={{height: '83%'}}>
        <Grid celled columns={2} doubling stretched className="style" >
            <Grid.Column className="style" stretched width={4} floated='left' >
              <Container >
                <Grid columns={1} centered  textAlign="center" verticalAlign="middle">
                  <Grid.Row className="menu style"  width={4} verticalAlign="middle" >
                      <Container textAlign="center" className="user dashboard menu">
                        <FontAwesomeIcon icon="graduation-cap" size="3x" /> <h2>Classes</h2>
                      </Container>
                  </Grid.Row>
                  <Grid.Row className="menu style"  width={4} verticalAlign="middle" >
                    <Container textAlign="center" className="user dashboard menu">
                      <FontAwesomeIcon icon="question" size="3x" /> <h2> Most Asked Q´s</h2>
                    </Container>
                  </Grid.Row>
                  <Grid.Row className="menu style"  width={4} verticalAlign="middle" >
                    <Container textAlign="center" className="user dashboard menu">
                      <FontAwesomeIcon icon="chart-line" size="3x" /> <h2> Personal Stats</h2>
                    </Container>
                  </Grid.Row>
                </Grid>
              </Container>
            </Grid.Column>
            <Class />
            {/* <Lecture /> */}
        </Grid>
      </div>
    )
  }
}
