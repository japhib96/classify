import React, { Component } from 'react'
import axios from 'axios';
import {Menu, Segment, Icon, Header } from 'semantic-ui-react'
import CardGroups from './projectComponent';
import AddButton from './AddModal';
import { Redirect } from 'react-router-dom';
import { Grid, Container, Button, Input } from 'semantic-ui-react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faCoffee, faGraduationCap, faQuestion, faChartLine } from '@fortawesome/free-solid-svg-icons'
import Headercomp from './Headercomponent';
import Divider from './divider';
import Class from './Classes';
import Lecture from './Lecture'
import Modal from './AddModal';

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
        <Headercomp title={`Hi ${this.props.user.username}!`} />
          <div className="user grid">
            <div className="left col">
              <div>
                <Container textAlign="center" className="user dashboard menu">
                  <FontAwesomeIcon icon="graduation-cap" size="3x" /> <h2>Classes</h2>
                </Container>
              </div>
              <div>
                <Container textAlign="center" className="user dashboard menu">
                  <FontAwesomeIcon icon="question" size="3x" /> <h2>View Top Questions</h2>
                </Container>
              </div>
              <div>
                <Container textAlign="center" className="user dashboard menu">
                  <FontAwesomeIcon icon="chart-line" size="3x" /> <h2> Class Statistics</h2>
                </Container>
              </div>
            </div>
            <div className="right col wrapper">
              <header className="toolbar dashboard">
                <div className="right part">
                  <div><Modal/></div>
                  <div><h2>Join a Class</h2></div>
                </div>
                <div>
                  <Input icon='search' placeholder='Search for a Class...' />
                </div>
              </header>
              <div className="content dashboard">
                {
                  this.state.classes.map((classroom) => {
                    return (
                      <Grid.Column  width={12} floated="right" className="style">
                        <Grid  columns={1} className="head comp" >
                          <Grid.Row  stretched verticalAlign="top">
                            <Grid.Column className="dashboard card style" width={4}>
                              <CardGroups  title={classroom.name} setClass={this.props.setClass} classId={classroom._id} />
                            </Grid.Column>
                          </Grid.Row>
                        </Grid>
                      </Grid.Column>
                    )
                  })
                }
              </div>
          </div>
        </div>
      </div>
      )
    }
  }
