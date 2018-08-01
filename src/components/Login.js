import React from 'react';
import {FormControl, Form, Col, Button, FormGroup, ControlLabel, ToggleButton, ToggleButtonGroup} from 'react-bootstrap';
import axios from 'axios';

export default class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      type: 1
    }
  }

  async logIn(e) {
    e.preventDefault();
    try {
      console.log('hi')
      if (this.state.type === 1) {
        await axios.post('/loginStudent', {
          username: this.state.username,
          password: this.state.password,
        })
        console.log('logged in as student');
      } else {
        await axios.post('/loginTeacher', {
          username: this.state.username,
          password: this.state.password,
        })
        console.log('logged in as teacher');
      }
    }
    catch(error) {
      console.log(error);
    }
  }

  render() {
    return (
      // <div>
      //   <form method="POST">
      //     <h3>Login</h3>
      //     <div className="form-group">
      //       <label type="text">Username: </label>
      //       <input type="text" name="username" className="form-control" onChange={(e) => this.setState({username: e.target.value})} />
      //     </div>
      //     <div className="form-group">
      //       <label type="text">Password: </label>
      //       <input type="password" name="password" className="form-control" onChange={(e) => this.setState({password: e.target.value})}/>
      //     </div>
      //     <div className="form-group">
      //       <button className="btn btn-primary" onClick={() => this.props.goToRegister()}>Register</button>
      //       <button className="btn btn-success" type="button" onClick={() => this.logIn(this.state.username, this.state.password)}>Login</button>
      //     </div>
      //   </form>
      // </div>



      <Form horizontal>
        <FormGroup>
          <Col smOffset={3} sm={4}>
            <div className="h1">
              <h1>Login</h1>
            </div>
          </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel} sm={3}>
            Username
          </Col>
          <Col sm={6}>
            <FormControl type="text" placeholder="Username" onChange={(e) => this.setState({ username: e.target.value })}/>
          </Col>
        </FormGroup>
        {/* <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel} sm={3}>
            Email
          </Col>
          <Col sm={6}>
            <FormControl type="email" placeholder="Email" />
          </Col>
        </FormGroup> */}
        <FormGroup controlId="formHorizontalPassword">
          <Col componentClass={ControlLabel} sm={3}>
            Password
          </Col>
          <Col sm={6}>
            <FormControl type="password" placeholder="Password" onChange={(e) => this.setState({ password: e.target.value })}/>
          </Col>
        </FormGroup>
        <ToggleButtonGroup type="radio" name="options" block defaultValue={this.state.type}>
          <ToggleButton value={1} onClick={(e) => this.setState({ type: 1 })}>Student </ToggleButton>
          <ToggleButton value={2} onClick={(e) => this.setState({ type: 2 })}>Teacher </ToggleButton>
        </ToggleButtonGroup>
        <FormGroup>
          <Col smOffset={4} sm={4}>
            <Button type="submit" bsStyle="primary" bsSize="large" block onClick={(e) => this.logIn(e)} >Login</Button>
          </Col>
        </FormGroup>
        <FormGroup>
          <Col smOffset={4} sm={6}>
            <div> Not a user yet? Click for <a onClick={() => this.props.goToRegister()}>Register</a>  </div>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

{/* <a href='#' onClick={() => this.props.goToRegister()} >Register</a> */}
