import React, { Component } from 'react';
// import JoinClass from './testFrontend/joinClass'
// import RegisterClass from './testFrontend/registerClass'
import Login from './Login.js';
import Register from './Register.js';
import Navigationbar from './Navbar';
// import { Button,
// ButtonGroup,
// DropdownButton,
// MenuItem,
// PageHeader,
// Modal,
// FormGroup,
// FormControl,
// } from 'react-bootstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // title: '',
      // password: '',
      registered: true, // whether to load login screen or registration
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
      </div>
    );
  }
}

export default App;
