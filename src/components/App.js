// import React, { Component } from 'react';
// import JoinClass from './testFrontend/joinClass'
// import RegisterClass from './testFrontend/registerClass'
// import Login from './Login.js';
// import Register from './Register.js';
// import Navigationbar from './Navbar';
// import Divider from './divider';
// import Headercomp from './Headercomponent';
// import Comments from './comments';
// import DashboardGrid from './dashboardGrid';
//
// import { Button,
// ButtonGroup,
// DropdownButton,
// MenuItem,
// PageHeader,
// Modal,
// FormGroup,
// FormControl,
// } from 'react-bootstrap';
//
// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       // title: '',
//       // password: '',
//       registered: false, // whether to load login screen or registration
//       userId: '', // account id to pass in when logging in
//       classId: '',
//     };
//   }
//
//   render() {
//     return (
//       <div className="App">
//
//         <Navigationbar />
//         <Headercomp />
//         <Divider />
//         <DashboardGrid />
//         {/* <Sidebar /> */}
//         {/* <Comments /> */}
//
//
//         {/* {(this.state.registered) ?
//           // (this.state.userId) ?
//           <Register
//               goToLogin={() => this.setState({ registered: false })}
//               registerSuccess={() => this.setState({ registered: true })}
//             /> :
//             <Login
//               goToRegister={() => this.setState({ registered: true })}
//               loginSuccess={(userId) => this.setState({ userId: userId })}
//             />
//
//         } */}
//
//         {/* <form>
//           <FormGroup>
//             <h4>Classroom Title:</h4>
//             <FormControl
//               type="text"
//               value={this.state.title}
//               onChange={(e) => this.setState({ title: e.target.value })}
//             />
//             <h4>Classroom Password:</h4>
//             <FormControl
//               type="password"
//               value={this.state.password}
//               onChange={(e) => this.setState({ password: e.target.value })}
//             />
//           </FormGroup>
//         </form>
//         <Button onClick={(e) => this.newClass(e)}>Save</Button> */}
//       </div>
//     );
//   }
// }

// export default App;

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
import Comments from './comments';
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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registered: false, // whether to load login screen or registration
      userId: '', // account id to pass in when logging in
      classId: '',
      activeItem: 'home',
    };

    handleContextRef = contextRef => this.setState({ contextRef })

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  }

  render() {
    const { contextRef } = this.state

    const { activeItem } = this.state
    return (
      <BrowserRouter>
        <div ref={this.handleContextRef}>
          <Sticky context={contextRef}>
            <Navigationbar />
          </Sticky>
            <Headercomp />
            <Divider />
          {/* <DashboardGrid /> */}
          <User />
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
