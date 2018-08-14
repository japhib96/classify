import _ from 'underscore';
import { Grid, Header, Image, Rail, Segment, Sticky } from 'semantic-ui-react'
import { Menu, Input, Dropdown, Icon } from 'semantic-ui-react'
import React, { Component } from 'react';
import JoinClass from './testFrontend/joinClass'
import RegisterClass from './testFrontend/registerClass'
import Chat from './testFrontend/chatRoom'
// import PDFViewer from './testFrontend/PDFViewer'
// import TeacherView from './testFrontend/teacherView'
import Login from './Login.js';
import Register from './Register.js';
import Navigationbar from './Navbar';
import Divider from './divider';
import Headercomp from './Headercomponent';
import EmotionBar from './EmotionBar';
import Comments from './Comments';
import StudentDashboard from './student/StudentDash';
import StudentClassroom from './student/StudentClassroom';
import StudentLecture from './student/StudentLecture';
import TeacherDashboard from './teacher/TeacherDash';
import TeacherClassroom from './teacher/TeacherClassroom';
import TeacherLecture from './teacher/TeacherLecture';
// import TeacherLecture from './teacher/TeacherLecture';
import HomePage from './homepage.js'
import Loading from './Loader';
import axios from 'axios';
import TeacherStats from './testFrontend/TeacherStats.js'

import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { Button,
ButtonGroup,
DropdownButton,
MenuItem,
PageHeader,
Modal,
FormGroup,
FormControl,
} from 'react-bootstrap';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registered: false, // whether to load login screen or registration
      user: '', // account id to pass in when logging in
      classId: '',
      lectureId: '',
      loading: true
    };

    const handleContextRef = contextRef => this.setState({ contextRef })

  }

  componentWillMount() {
    this.getUser();
  }

  setClass(classId) {
    console.log(classId)
    this.setState({ classId: classId });
  }

  setLecture(lectureId, lectureTitle, lectureDate, lectureStatus) {
    console.log(lectureId)
    this.setState({ lecture: { id: lectureId, title: lectureTitle, date: lectureDate, active: lectureStatus }});
  }

  async getUser() {
    let user;
    const self = this;
    await axios.get('/currentUser')
    .then((resp) => {
      user = resp.data;
    });
    console.log(user)
    this.setState({ user, loading: false })
  }

  render() {
    console.log(this.state.user)
    if (this.state.loading) { return <Loading message={'Loading...'}/> }
    const { contextRef } = this.state


    return (

      <BrowserRouter>
        <div className="style">
          <Route exact={true} path='/' render={ () =>
            <HomePage />
          } />
          <Route path='/register' render={() =>
            this.state.user ? <Redirect to='/login' /> : <Register />
          } />
          <Route path='/login' render={() =>
            this.state.user
              ? this.state.user.teacher
                ? <Redirect to='/teacher/dashboard' />
                : <Redirect to='/student/dashboard' />
              :
              <Login setUser={this.getUser.bind(this)} />
          } />
          <Route path='/class/new' render={() =>
            this.state.user ? <RegisterClass /> : <Redirect to='/login' />
          } />
          <Route path='/class/join' render={() =>
            this.state.user ? <JoinClass setClass={this.setClass.bind(this)} /> : <Redirect to='/login' />
          } />

          {/* Chat and User are the same, need to be integrated */}
          <Route path='/class/room' render={() =>
            <Chat />
          } />
          <Route path='/student' render={() =>
            this.state.user
              ? this.state.user.teacher
                ? <Redirect to='/teacher/dashboard' />
                : <Navigationbar  setUser={this.getUser.bind(this)} user={this.state.user}/>
              : <Redirect to='/' />
          } />
          <Route path='/student/dashboard' render={() =>
            <StudentDashboard user={this.state.user} setClass={this.setClass.bind(this)} classId={this.state.classId} />
          } />
          <Route exact={true} path='/student/class' render={() =>
            this.state.classId
              ? <StudentClassroom classId={this.state.classId} lecture={this.state.lecture} setLecture={this.setLecture.bind(this)} />
              : <Redirect to='/student/dashboard' />
          } />
          <Route path='/student/lecture' render={() =>
            this.state.lecture
              ? <StudentLecture user={this.state.user} lecture={this.state.lecture} />
              : <Redirect to='/student/dashboard' />
          } />
          <Route path='/student/feedback' render={() =>
            this.state.lecture
              ? <div>Feedback for {this.state.lecture.title} coming soon!</div>
              : <Redirect to='/student/dashboard' />
          } />
          <Route path='/teacher' render={() =>
            this.state.user
              ? !this.state.user.teacher
                ? <Redirect to='/student/dashboard' />
                : <Navigationbar  setUser={this.getUser.bind(this)} user={this.state.user}/>
              : <Redirect to='/' />
          } />
          <Route path='/teacher/dashboard' render={() =>
            <TeacherDashboard user={this.state.user} setClass={this.setClass.bind(this)} classId={this.state.classId} />
          } />
          <Route path='/teacher/class' render={() =>
            this.state.classId
              ? <TeacherClassroom classId={this.state.classId} lecture={this.state.lecture} setLecture={this.setLecture.bind(this)} />
              : <Redirect to='/teacher/dashboard' />
          } />
          <Route path='/teacher/lecture' render={() =>
            this.state.lecture
              ? <TeacherLecture user={this.state.user} lecture={this.state.lecture} />
              : <Redirect to='/teacher/dashboard' />
          } />
        </div>
      </BrowserRouter>

      // <TeacherView user={this.state.user} lecture={this.state.lectureId}/>

    );
  }
}
