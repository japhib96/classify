
import React, { Component } from 'react'
import AddButton from './AddModal';
import { Grid, Container, Button, Input, Icon } from 'semantic-ui-react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faCoffee, faGraduationCap, faQuestion, faChartLine } from '@fortawesome/free-solid-svg-icons'
import Divider from './divider';
import Class from './Classes';
import Lecture from './Lecture'
import Modal from './AddModal';

library.add(faCheckSquare, faCoffee, faGraduationCap, faQuestion, faChartLine)


export default class DashboardGridComponent extends Component {


  render() {


    return (


      <div className="user grid">
        {/* <hr></hr> */}
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
            <Class  class={this.props.class}/>
          </div>
      </div>
    </div>
      )
    }
  }
