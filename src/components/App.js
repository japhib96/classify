import _ from 'underscore';
import { Grid, Header, Image, Rail, Segment, Sticky } from 'semantic-ui-react'
import { Menu, Input, Dropdown, Icon } from 'semantic-ui-react'
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
      classId: '5b689caf57657f1271f1ae4d',
      loading: true
      // activeItem: 'home',
    };

    const handleContextRef = contextRef => this.setState({ contextRef })

  }

  componentWillMount() {
    this.getUser();
  }

  joinRoom(classId) {
    this.setState({ classId: classId });
  }

  async getUser() {
    let user;
    const self = this;
    await axios.get('/currentUser')
    .then((resp) => {
      user = resp.data;
    });
    console.log(user)
    this.setState({ user: user, loading: false })
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
          } />
          <Route path='/dashboard' render={() =>
            this.state.user ? <DashboardGrid user={this.state.user} /> : <Redirect to='/login' />
          } />
          {/* <Route path='/class' render={() =>
            this.state.user ? <Class /> : <Redirect to='/login' />
          } /> */}
          <Route path='/class/new' render={() =>
            this.state.user ? <RegisterClass /> : <Redirect to='/login' />
          } />
          <Route path='/class/join' render={() =>
            this.state.user ? <JoinClass joinRoom={this.joinRoom.bind(this)} /> : <Redirect to='/login' />
          } />

          {/* Chat and User are the same, need to be integrated */}
          <Route path='/class/room' render={() =>
            <Chat />
          } />
          <Route path='/user' render={() =>
            this.state.user ? <User user={this.state.user} class={this.state.classId}/> : <Redirect to='/login' />
          } />
        </div>
      </BrowserRouter>
      // <Chat user={this.state.user}/>
    );
  }
}
