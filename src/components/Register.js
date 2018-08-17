import React from 'react';
import {ToggleButton, ToggleButtonGroup} from 'react-bootstrap'
import validator from 'validator';
import axios from 'axios';
import image2 from '../images/slack.png'
import { Redirect, Link } from 'react-router-dom';
import { Button, Form, Grid, Header, Image, Message, Segment, Icon} from 'semantic-ui-react'
export default class Register extends React.Component {
  constructor(props){
    super(props),
    this.state = {
      email: '',
      username: '',
      password: '',
      confirmP: '',
      type: "Student",
      error: false,
      done: false,
      message: 'ui hidden error message',
      emailMsg: 'ui hidden error message',
      lengthP: 'ui hidden error message',
      passwords: 'ui hidden error message',
      classname1: "student act",
      classname2: "",
      loading: false
    }
  }
  async makeAccount(e) {
    if(this.state.password.length<6){
      if(this.email1(this.state.email)){
        this.setState({ emailMsg: 'ui hidden error message'})
      }
      if(this.state.password===this.state.confirmP){
        this.setState({ passwords: 'ui hidden error message'})
      }
      this.setState({ lengthP: 'ui visible error message', message: 'ui visible error message'} )
    }
    if(!this.email1(this.state.email)){
      if(this.state.password===this.state.confirmP){
        this.setState({ passwords: 'ui hidden error message'})
      }
      if(this.state.password.length>6){
        this.setState({ lengthP: 'ui hidden error message'})
      }
      this.setState({ message:'ui visible error message', emailMsg: 'ui visible error message' })
    }
    if(this.state.password!==this.state.confirmP){
      this.setState({ message:'ui visible error message', passwords: 'ui visible error message' })
    }
    if(this.state.password.length>=6 && this.email1(this.state.email) && this.state.password===this.state.confirmP){
      this.setState({ message:'ui hidden error message', done: true })
      console.log('3')
      e.preventDefault();
      try {
        await axios.post('/saveUser', {
          email: this.state.email,
          username: this.state.username,
          password: this.state.password,
          passwordRepeat: this.state.confirmP,
          type: this.state.type
        })
        console.log('New user saved')
        this.setState({ done: true });
      }
      catch(error) {
        console.log(error);
      }
    }
  }

  confirm1 = (password, confirm) => {
    (password===confirm)?  'yo': <span className="error">Passwords are not equal.</span>
  }
  email1 = (value) => {
    if (!validator.isEmail(value)) {
      return false;
      //  return `${value} is not a valid email.`
    }else{
      return true;
    }
  };
  render() {
    if (this.state.done) {
      return <Redirect to='/login' />
    }
    return(
      <div className='login-form' style={{
          height: '100%',
          backgroundImage: `url(${image2})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
          height: 800
        }} >
        {/*
          Heads up! The styles below are necessary for the correct render of this example.
          You can do same with CSS, the main idea is that all the elements up to the `Grid`
          below must have a height of 100%.
          */}
          <style>{`
            body > div,
            body > div > div,
            body > div > div > div.login-form {
              height: 100%;
            }
            `}</style>
            <Grid textAlign='center' style={{ height: '100%', textAlign: "center"}} verticalAlign='middle'>
              <Grid.Column style={{ maxWidth: 450 }}>
                <Form className='ui error form' size='large' >
                  <Segment stacked style={{background: '#98dafc'}}>
                  <Header as='h2' style={{color:'#312c32'}} textAlign='center'>
                    Register an account as {this.state.type}
                  </Header>
                    <Form.Input
                      fluid
                      icon='inbox'
                      iconPosition='left'
                      placeholder='E-mail address'
                      onChange={(e)=>this.setState({ email: e.target.value })}
                    />
                    <Form.Input
                      fluid
                      icon='user'
                      iconPosition='left'
                      placeholder='Username'
                      onChange={(e)=>this.setState({ username: e.target.value })}
                    />
                    <Form.Input
                      fluid
                      icon='lock'
                      iconPosition='left'
                      placeholder='Password'
                      type='password'
                      onChange={(e)=>this.setState({ password: e.target.value })}
                    />
                    <Form.Input
                      fluid
                      icon='lock'
                      iconPosition='left'
                      placeholder='Confirm Password'
                      type='password'
                      onChange={(e)=>this.setState({ confirmP: e.target.value })}
                    />
                    <Button.Group defaultValue={this.state.type}>
                      <Button  className={this.state.classname1} value={1} onClick={(e) => this.setState({ type: "Student", classname1: "student act", classname2: ""})}>Student</Button>
                      <Button.Or />
                      <Button  className={this.state.classname2} value={2} onClick={(e) => this.setState({ type: "Teacher", classname2: "teacher act", classname1: ""})}>Teacher</Button>
                    </Button.Group>
                    <div className={this.state.message}>
                      <div className='content'>
                        <div className='header'>Error</div>
                        <div className={this.state.emailMsg}>
                          <p>Email is invalid</p>
                        </div>
                        <div className={this.state.passwords}>
                          <p>Passwords do not match</p>
                        </div>
                        <div className={this.state.lengthP}>
                          <p>Password Must be 6 or more characters</p>
                        </div>
                      </div>
                    </div>
                    <div className="register button">
                      <Button  style={{border: '1px solid'}} loading={this.state.loading} content="Register" className='user dropdown hvr-round-corners' fluid size='large' onClick={(e) => this.makeAccount(e)}>
                      </Button>
                    </div>
                  </Segment>
                </Form>
                <Message style={{width: "96%"}}>
                  Have an account? <Link to={'/login'}>Sign In</Link>
                </Message>
              </Grid.Column>
            </Grid>
          </div>
        )
      }
    }
