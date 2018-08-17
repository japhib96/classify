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

    render() {
      if (this.state.loading) { return <Loading message={'Retrieving Classes...'} /> };
      if (this.props.classId) { return <Redirect to='/teacher/class' />}

      return (
        <div className="viewport">
        <Headercomp title={`Hi ${this.props.user.username}!`}
          description={'Welcome to your Dashboard. You can view your classes and create new ones'}/>
        <div className="teacher grid">
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
                      {console.log(classroom.classDescription)}
                      <CardGroups  description={classroom.classDescription} title={classroom.name} setClass={this.props.setClass} classId={classroom._id} date={classroom.created}/>
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
