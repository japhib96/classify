import React, { Component } from 'react';
import JoinClass from './testFrontend/joinClass'
import RegisterClass from './testFrontend/registerClass'
import Chat from './testFrontend/chatRoom'
import Login from './Login.js';
import Register from './Register.js';
import Navigationbar from './Navbar';
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
    };
  }

  render() {
    console.log(this.props)
    return (
    <BrowserRouter>
      <div className="App">
        <Navigationbar />
        {/* {(this.state.registered) ? */}
          {/* // (this.state.userId) ? */}
          <Route path='/register' render={() =>
            <Register
              // goToLogin={() => this.setState({ registered: false })}
              // registerSuccess={() => this.setState({ registered: true })}
            />
          } />
          <Route path='/login' render={() =>
            <Login
              // goToRegister={() => this.props.history.push('/register')}
              // loginSuccess={(userId) => this.setState({ userId: userId })}
            />
          } />
          <Route path='/class/new' render={() =>
            <RegisterClass />
          } />
          <Route path='/class/join' render={() =>
            <JoinClass />
          } />
        {/* } */}
      </div>
    </BrowserRouter>
    );
  }
}

export default App;
