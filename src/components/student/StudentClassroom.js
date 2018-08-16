
import React, { Component } from 'react'
import axios from 'axios';
import { Grid, Menu, Segment, Icon, Header, Container, Input } from 'semantic-ui-react'
import CardGroups from '../projectComponent';
import { Redirect } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faCoffee, faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import Headercomp from '../Headercomponent';
import Divider from '../divider';
import CreateLectureModal from '../teacher/CreateLectureModal';
import Loading from '../Loader';

library.add(faCheckSquare, faCoffee, faGraduationCap)


export default class StudentClassroom extends Component {
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
      lectures = resp.data.lectures;
      title = resp.data.title;
    });
    console.log(lectures)
    this.setState({ lectures, title, loading: false })
  }



  render() {
    if (this.props.lecture) {
      if (this.props.lecture.active) {
        return <Redirect to='/student/lecture' />
      } else {
        return <Redirect to='/student/feedback' />
      }
    }
    if (this.state.loading) { return <Loading message={'Retrieving Lectures...'}/> }

    return (

      <div>
        <Headercomp title={this.state.title} />
        <div className="user grid">
          <div className="left col">
            <div>
              <Container textAlign="center" className="teacher dashboard menu">
                <FontAwesomeIcon icon="graduation-cap" size="3x" /> <h2>Lectures</h2>
              </Container>
            </div>
            <div>
              <Container textAlign="center" className="teacher dashboard menu">
                <FontAwesomeIcon icon="question" size="3x" /> <h2>View Top Questions of {this.state.title} </h2>
              </Container>
            </div>
            <div>
              <Container textAlign="center" className="teacher dashboard menu">
                <FontAwesomeIcon icon="chart-line" size="3x" /> <h2> {this.state.title} Statistics</h2>
              </Container>
            </div>
          </div>
          <div className="right col wrapper">
            <header className="toolbar teacher dashboard">
              <div className="right part">
                <div><CreateLectureModal classId ={this.props.classId}/></div>
                <div><h2>Join a Lecture</h2></div>
              </div>
              <div>
                <Input icon='search' placeholder='Search for a Lecture...' />
              </div>
            </header>
            <div className="content dashboard">
              {
                this.state.lectures.map((lecture) => {
                  return (
                    <div>
                      <CardGroups
                        title={lecture.lectureTitle}
                        setLecture={this.props.setLecture}
                        lectureId={lecture._id}
                        active={lecture.active}
                        date={lecture.created}
                        reaction={lecture.reactions}
                      />
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
