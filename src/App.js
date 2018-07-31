import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import JoinClass from './testFrontend/joinClass'
import RegisterClass from './testFrontend/registerClass'
import Login from './Login.js';
import Register from './Register.js';
import Navigationbar from './components/Navbar';
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
  constructor(props){
    super(props);
    this.state = {
      // title: '',
      // password: '',
      registered: false, // whether to load login screen or registration
      userId: '', // account id to pass in when logging in
      classId: '',
    };
  }

  render() {
    return (
      <div className="App">
        <Navigationbar />
        {(this.state.registered) ?
          // (this.state.userId) ?
            <Login
              goToRegister={() => this.setState({ registered: false })}
              loginSuccess={(userId) => this.setState({ userId: userId })}
            />
          : <Register
              goToLogin={() => this.setState({ registered: true })}
              registerSuccess={() => this.setState({ registered: true })}
            />
        }
      
        {/* <form>
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
        <Button onClick={(e) => this.newClass(e)}>Save</Button> */}
      </div>
    );
  }
}

export default App;
