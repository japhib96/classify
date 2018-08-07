import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import JoinClass from './testFrontend/joinClass'
import RegisterClass from './testFrontend/registerClass'
import Login from './Login.js';
import Register from './Register.js';
import SideBarExample from './sideBar.js'
import Teacher from './teacherView.js'
import Main from './mainPage.js'
import TeacherSession from './newTeacherSession.js'
import { Button, Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'

 //import { //Button,
// ButtonGroup,
// DropdownButton,
// MenuItem,
// PageHeader,
// Modal,
// FormGroup,
 //FormControl, Glyphicon } from 'react-bootstrap';

let sidebarstyle = {
   display: 'block'
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      // title: '',
      // password: '',
      registered: false, // whether to load login screen or registration
      userId: '', // account id to pass in when logging in
      classId: '',
      sidebarStyle: {
        display: "none"
      }
    };
    this.changeStyle = this.changeStyle.bind(this)
  }

  changeStyle() {
    let prevStyle = Object.assign({}, this.state.sidebarStyle);
    prevStyle.display = prevStyle.display === "block" ? "none" : "block";
    this.setState({
      sidebarStyle: prevStyle
    })
  }

//   function w3_open() {
//     document.getElementById("mySidebar").style.display = "block";
// }
// function w3_close() {
//     document.getElementById("mySidebar").style.display = "none";
// }
  render() {
    return (

      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <h1 className="App-title">Classify</h1>
      //   </header>
      //   {(this.state.registered) ?
      //     // (this.state.userId) ?
      //       <Login
      //         goToRegister={() => this.setState({ registered: false })}
      //         loginSuccess={(userId) => this.setState({ userId: userId })}
      //       />
      //     : <Register
      //         goToLogin={() => this.setState({ registered: true })}
      //         registerSuccess={() => this.setState({ registered: true })}
      //       />
      //   }
        /* <form>
          <FormGroup>
            <h4>Classroom Title:</h4>
            <FormControl
              type="text"
              value={this.state.title}
              onChange={(e) => this.setState({ title: e.target.value })}
            />
            <h4>Classroom Password:</h4>
            <FormControl
              type="password"
              value={this.state.password}
              onChange={(e) => this.setState({ password: e.target.value })}
            />
          </FormGroup>
        </form>
        <Button onClick={(e) => this.newClass(e)}>Save</Button> */
        <div>


    
          <Main/>
        </div>
    //  </div>
    );
  }
}

export default App;
