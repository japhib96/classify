import React, { Component } from 'react'
import axios from 'axios';
import { Grid, Menu, Segment, Icon, Header, Container } from 'semantic-ui-react'
import CardGroups from './projectComponent';
import AddButton from './AddModal';
import { Redirect } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faCoffee, faGraduationCap, faQuestion, faChartLine } from '@fortawesome/free-solid-svg-icons'
import Headercomp from './Headercomponent';
import Divider from './divider';

library.add(faCheckSquare, faCoffee, faGraduationCap, faQuestion, faChartLine)


export default class DashboardGridComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      classes: null,
    }
  }

  componentDidMount() {
    this.getClasses();
  }

  async getClasses() {
    let classes;
    // const self = this;
    await axios.get('/user/classes')
    .then((resp) => {
      classes = resp.data.classes;
    });
    console.log(classes)
    this.setState({ classes: classes, loading: false })
  }

  render() {
    if (this.state.loading) { return <h2>Retrieving Classes...</h2> };
    if (this.props.classId) { return <Redirect to='/class' />}

    return (
      <div>
      <Headercomp title={`Hi ${this.props.user.username}!`}
      description={'Welcome to your Dashboard. You can create and/or join sessions'}/>
      <div style={{height: '86.2%'}}>
        <Grid columns={2} doubling stretched className="style" >
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
            <Grid.Column stretched width={12} floated="right" color="blue" className="style">
              <Container>
                <Grid>
                {
                  this.state.classes.map((classroom) => {
                    return (
                      <Grid.Column className="dashboard style" width={4}>
                        <CardGroups title={classroom.name} setClass={this.props.setClass} classId={classroom._id} />
                      </Grid.Column>
                    )
                  })
                }
                </Grid>
              </Container>
            </Grid.Column>
        </Grid>
      </div>
    </div>
    )
  }
}
