
import React, { Component } from 'react'
import axios from 'axios';
import { Grid, Menu, Segment, Icon, Header, Container, Input, Button } from 'semantic-ui-react'
import CardGroups from '../projectComponent';
import { Redirect } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faCoffee, faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import Headercomp from '../Headercomponent';
import Divider from '../divider';
import CreateLectureModal from './CreateLectureModal';
import Loading from '../Loader';

library.add(faCheckSquare, faCoffee, faGraduationCap)


export default class TeacherClassroom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      lectures: null,
      title: ''
    }
    props.setLecture('');
  }

  componentDidMount() {
    console.log(this.props.classId)
    this.getLectures();
  }

  async getLectures() {
    let lectures;
    let title;
    // const self = this;
    await axios.post('/class/lectures', {
      classId: this.props.classId
    })
    .then((resp) => {
      console.log("hi",resp);
      lectures = resp.data.lectures;
      title = resp.data.title;
    });
    console.log(lectures)
    this.setState({ lectures, title, loading: false })
  }

  rerender(){
    this.forceUpdate()
  }



  render() {
    if (this.props.lecture) { return <Redirect to='/teacher/lecture' />}
    if (this.state.loading) { return <Loading message={'Retrieving Lectures...'}/> }

    return (

      <div>
        <Headercomp title={this.state.title}
          description={`Shareable Class ID: ${this.props.classId}`}/>
          <div className="user grid">
            <div className="left col">
              <div>
                <Button style={{backgroundColor:"#82ecff", marginBottom: "2em", marginLeft: "1em", color: "black"}} textAlign="center" className='hvr-underline-from-left'>
                  <FontAwesomeIcon icon="graduation-cap" size="3x" /> <h2> Your Lectures</h2>
                </Button>
              </div>
              <div>
                <Button style={{backgroundColor:"#82ecff", marginBottom: "2em", marginLeft: "1em", color: "black"}} textAlign="center" className='hvr-underline-from-left'>
                  <FontAwesomeIcon icon="question" size="3x" /> <h2>View Top Questions of {this.state.title} </h2>
                </Button>
              </div>
              <div>
                <Button style={{backgroundColor:"#82ecff", marginBottom: "2em", marginLeft: "1em", color: "black"}} textAlign="center"  className='hvr-underline-from-left'>
                  <FontAwesomeIcon icon="chart-line" size="3x" /> <h2> {this.state.title} Statistics</h2>
                </Button>
              </div>
            </div>
            <div className="right col wrapper">
              <header className="toolbar teacher dashboard">
                <div className="right part">
                  <div><CreateLectureModal classId ={this.props.classId} lecture={this.props.lecture} setLecture={this.props.setLecture}/></div>
                  <div><h2>Create a Lecture</h2></div>
                </div>
                <div>
                  <Input icon='search' placeholder='Search for a Lecture...' />
                </div>
              </header>

              {this.state.lectures[0] ?

                <div className="content dashboard">
                  {this.state.lectures.map((lecture) => {
                    return (
                      <div className="card container">
                        <CardGroups
                          title={lecture.lectureTitle}
                          setLecture={this.props.setLecture}
                          lectureId={lecture._id}
                          active={lecture.active}
                          date={lecture.created}
                        />
                      </div>
                    )
                  }
                )
              }
            </div>

            :

            <div className="content unactive">
              <h2 className="unactive content">Currently no Lecture available <br></br>
              Click the Create Lecture Button to begin a Lecture</h2>
            </div>
          }
        </div>
      </div>
    </div>

  )
}
}
