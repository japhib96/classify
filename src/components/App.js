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
import StudentLecture from './student/StudentLecture';
import TeacherLecture from './teacher/TeacherLecture';
import Classroom from './testFrontend/Classroom';
import HomePage from './homepage.js'
import axios from 'axios';
import TeacherDashboard from './teacher/TeacherDash';

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

  setLecture(lectureId, lectureTitle) {
    console.log(lectureId)
    this.setState({ lecture: { id: lectureId, title: lectureTitle }});
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
    if (this.state.loading) { return <h2>Loading...</h2> }
    const { contextRef } = this.state


    return (

      <BrowserRouter>
        <div className="style">
          <Navigationbar  setUser={this.getUser.bind(this)} user={this.state.user}/>
          <Route path='/register' render={() =>
            this.state.user ? <Redirect to='/dashboard' /> : <Register />
          } />
          <Route path='/login' render={() =>
             this.state.user ? <Redirect to='/dashboard' /> : <Login setUser={this.getUser.bind(this)} />
            // <Login setUser={this.getUser.bind(this)} />
          } />
          <Route path='/dashboard' render={() =>
            this.state.user ? <StudentDashboard user={this.state.user} setClass={this.setClass.bind(this)} classId={this.state.classId} /> : <Redirect to='/login' />
          } />
          <Route exact={true} path='/class' render={() =>
            this.state.user ?
              this.state.classId
              ? <Classroom classId={this.state.classId} lecture={this.state.lecture} setLecture={this.setLecture.bind(this)} />
              : <Redirect to='/dashboard' />
            : <Redirect to='/login' />
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
          <Route path='/user' render={() =>
            this.state.user ?
             this.state.lecture &&  this.state.lecture.id
              ? <StudentLecture user={this.state.user} lectureId={this.state.lecture.id} lectureTitle={this.state.lecture.title} />
              : <Redirect to='/dashboard' />
            : <Redirect to='/login' />
          } />
          <Route path='/teacher' render={() =>
            <TeacherLecture  user={this.state.user} lectureId={'5b6dfa84a756233375d939f8'} /> }
           />
        </div>
      </BrowserRouter>

      // <TeacherView user={this.state.user} lecture={this.state.lectureId}/>

    );
  }
}
