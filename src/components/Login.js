import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import {FormControl, Form, Col, Button, FormGroup, ControlLabel, ToggleButton, ToggleButtonGroup} from 'react-bootstrap';

import axios from 'axios';

export default class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      type: 1,
      done: '',
    }
  }

  async logIn(e) {
    e.preventDefault();
    try {
      if (this.state.type === 1) {
        await axios.post('/loginStudent', {
          username: this.state.username,
          password: this.state.password,
        })
        // this.setState({ done: 'student' });
        console.log('hey')
      } else {
        await axios.post('/loginTeacher', {
          username: this.state.username,
          password: this.state.password,
        })
        console.log('logged in as teacher');
        // this.setState({ done: 'teacher' });
      }
      this.props.setUser();
    } catch(error) {
      console.log(error);
    }
  }

  render() {
    // if (this.props.user) {
    //   return <Redirect to='/dashboard' />
    // }
    return (
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
            <div>Not a user yet? Click for <Link to={'/register'}>Register</Link></div>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}
