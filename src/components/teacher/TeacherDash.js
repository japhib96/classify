import Divider from '../divider';
import Headercomp from '../Headercomponent';
import React from 'react'
import { Grid, Container, Input } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom';
import Comment from '../Comments';
import Statistics from '../ClassStatistics';
import Navigationbar from '../Navbar';
import io from 'socket.io-client';
import Slides from '../testFrontend/PDFViewer';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faCoffee, faGraduationCap, faQuestion, faChartLine } from '@fortawesome/free-solid-svg-icons'
import CreateClass from '../teacher/CreateClassModal';
import CardGroups from '../projectComponent';
import Loading from '../Loader';
import axios from 'axios';

library.add(faCheckSquare, faCoffee, faGraduationCap, faQuestion, faChartLine)



export default class TeacherInterface extends React.Component {
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
      if (this.state.loading) { return <Loading message={'Retrieving Classes...'} /> };
      if (this.props.classId) { return <Redirect to='/teacher/class' />}

      return (
        <div className="viewport">
        <Headercomp title={`Hi ${this.props.user.username}!`}
          description={'Welcome to your Dashboard. You can view your classes and create new ones'}/>
        <div className="teacher grid">
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
          <div className="right col">
            <header className="toolbar dashboard">
              <div className="right part">
                <div><CreateClass setClass={this.props.setClass} /></div>
                <div><h2>Create a Class</h2></div>
              </div>
              <div>
                <Input icon='search' placeholder='Search for a Class...' />
              </div>
            </header>
            <div className="content dashboard">
              {
                this.state.classes.map((classroom) => {
                  return (
                    <div className="card container">
                      <CardGroups  title={classroom.name} setClass={this.props.setClass} classId={classroom._id} />
                    </div>
                  )
                }
              )
            }
            </div>
          </div>
        </div>
      </div>
      );
    }
  }
