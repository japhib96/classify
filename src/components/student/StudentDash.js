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
import JoinClassModal from './JoinClassModal';
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
    props.setClass('');
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
    if (this.props.classId) { return <Redirect to='/student/class' />}

    return (
      <div className="viewport">
        <Headercomp title={`Hi ${this.props.user.username}!`}
          description={'Welcome to your Dashboard. You can view your classes and join new ones'}/>
          <div className="user grid">
            <div className="left col">
              <div style={{display: 'block'}}>
                <button style={{ width: '100%', padding: '10px', marginTop: '10px', backgroundColor: '#98dafc'}} className='block hvr-underline-from-left'>
                  <div stlye={{display: 'flex', flexDirection: 'row'}}>
                  <FontAwesomeIcon icon="graduation-cap" size="2x" />
                  <h2 style={{display: 'inline'}}> Classes </h2>
                  </div>

                </button>

              </div>

              <div style={{display: 'block'}}>
                <button style={{ width: '100%', padding: '10px', marginTop: '10px', backgroundColor: '#98dafc'}} className='block hvr-underline-from-left'>
                  <div stlye={{display: 'flex', flexDirection: 'row'}}>
                  <FontAwesomeIcon icon="question" size="1x" />
                  <h2 style={{display: 'inline'}}> View Top Questions</h2>
                  </div>

                </button>

              </div>

              <div style={{display: 'block'}}>
                <button style={{ width: '100%', padding: '10px', marginTop: '10px', backgroundColor: '#98dafc'}} className='block hvr-underline-from-left'>
                  <div stlye={{display: 'flex', flexDirection: 'row'}}>
                  <FontAwesomeIcon icon="chart-line" size="2x" />
                  <h2 style={{display: 'inline'}}> Class Statistics </h2>
                  </div>

                </button>

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
                      <div className="card container" >
                        <CardGroups  title={classroom.name} setClass={this.props.setClass} classId={classroom._id} date={classroom.created}/>
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
