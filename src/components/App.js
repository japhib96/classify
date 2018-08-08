import _ from 'underscore';
import { Grid, Header, Image, Rail, Segment, Sticky } from 'semantic-ui-react'
import { Menu, Input, Dropdown, Icon} from 'semantic-ui-react'
import React, { Component } from 'react';
import JoinClass from './testFrontend/joinClass'
import RegisterClass from './testFrontend/registerClass'
import Chat from './testFrontend/chatRoom'
import Login from './Login.js';
import Register from './Register.js';
import Navigationbar from './Navbar';
import Divider from './divider';
import Headercomp from './Headercomponent';
import EmotionBar from './EmotionBar';
import Comments from './Comments';
import DashboardGrid from './dashboardGrid';
import User from './UserGrid';
import axios from 'axios';

import { BrowserRouter, Route } from 'react-router-dom';
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
      user: {}, // account id to pass in when logging in
      classId: '5b689caf57657f1271f1ae4d',
    };

    const handleContextRef = contextRef => this.setState({ contextRef })

  }

  componentDidMount() {
    const self = this;
    axios.get('/currentUser')
    .then((resp) => {
      self.setState({ user: resp.data });
    });
  }

  joinRoom(classId) {
    console.log(classId)
    this.setState({ classId: classId });
  }

  // getUser() {
  //   console.log('hi')
  //   axios.get('/currentUser')
  //   .then(resp => console.log(resp.data))
  // }

  render() {
    console.log(this.state.user)
    const { contextRef } = this.state


    return (
      <BrowserRouter>
        <div className="style">
          <Navigationbar />
          <Headercomp />
          <Route path='/register' render={() =>
            <Register />
          } />
          <Route path='/login' render={() =>
            <Login />
          } />
          <Route path='/dashboard' render={() =>
            <DashboardGrid />
          } />
          <Route path='/class/new' render={() =>
            <RegisterClass />
          } />
          <Route path='/class/join' render={() =>
            <JoinClass joinRoom={this.joinRoom.bind(this)} />
          } />

          {/* Chat and User are the same, need to be integrated */}
          <Route path='/class/room' render={() =>
            <Chat />
          } />
          <Route path='/user' render={() =>
            <User user={this.state.user} class={this.state.classId}/>
          } />
        </div>
      </BrowserRouter>
      // <Chat user={this.state.user}/>
    );
  }
}
