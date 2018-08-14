import React, { Component } from 'react'
import axios from 'axios';
import {Menu, Segment, Icon, Header } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom';
import { Grid, Container, Button, Input } from 'semantic-ui-react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faCoffee, faGraduationCap, faQuestion, faChartLine } from '@fortawesome/free-solid-svg-icons'
import Headercomp from '../Headercomponent';
import Divider from '../divider';
import Modal from '../teacher/CreateLectureModal';
import CardGroups from '../projectComponent';
import Loading from '../Loader';

library.add(faCheckSquare, faCoffee, faGraduationCap, faQuestion, faChartLine)


export default class StudentDashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      classes: null,
      rerender: ''
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

  rerender(){
    this.setState({rerender: Math.random()})
  }

  render() {
    if (this.state.loading) { return <Loading message={'Retrieving Classes...'} /> };
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
                  <div><JoinClassModal setClass={this.props.setClass} /></div>
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
                      <div>
                        <CardGroups  title={classroom.name} setClass={this.props.setClass} classId={classroom._id} />
                      </div>
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
