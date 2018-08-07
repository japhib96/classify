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
      userId: '', // account id to pass in when logging in
      classId: '',
    };

    const handleContextRef = contextRef => this.setState({ contextRef })

  }

  render() {
    const { contextRef } = this.state


    return (
      <BrowserRouter>
        <div>
          <Navigationbar />
          <Headercomp />
          {/* <DashboardGrid /> */}
          <User  />

          <Route path='/register' render={() =>
            <Register />
          } />
          <Route path='/login' render={() =>
            <Login />
          } />
          <Route path='/class/new' render={() =>
            <RegisterClass />
          } />
          <Route path='/class/join' render={() =>
            <JoinClass />
          } />
        </div>
      </BrowserRouter>
    );
  }
}
