import React from 'react'
import axios from 'axios';
import image2 from '../images/slack.png'
import {Link} from 'react-router-dom'
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import { Button, Form, Grid, Header, Image, Message, Segment, Icon } from 'semantic-ui-react'

export default class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      type: "Student",
      done: '',
      isError: false,
      errorMsg: '',
      message: 'ui hidden error message',
      classname1: "student act",
      classname2:"",
      loading: false,
    }
  }



  async logIn(e) {
    this.setState({
      loading: true
    })

    e.preventDefault();
    try {
      if (this.state.type === "Student") {
        await axios.post('/loginStudent', {
          username: this.state.username,
          password: this.state.password,
        })
        console.log('logged in as student');
        // this.setState({ message: 'ui hidden error message', done: 'student' });
      } else {
        await axios.post('/loginTeacher', {
          username: this.state.username,
          password: this.state.password,
        })
        console.log('logged in as teacher');
        // this.setState({ message: 'ui hidden error message', done: 'teacher' });
      }
      this.props.setUser();
    } catch(error) {
        this.setState({ message:'ui visible error message', isError: true, error: error});
        console.log(error);
    }

    if(this.state.isError === true) {
      this.setState({
        loading: false
      })
    }
  }

  render(){
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
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Form size='large'>
              <Segment stacked style={{background: '#98dafc'}}>
              <Header as='h2' style={{color:'black'}} textAlign='center'>
                Log-in to your {this.state.type} account
              </Header>
                <Form.Input
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='Username'
                  onChange={(e) => this.setState({ username: e.target.value })}
                />
                <Form.Input

                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  onChange={(e) => this.setState({ password: e.target.value })}
                />

                <Button.Group defaultValue={this.state.type}>
                  <Button  className={this.state.className1} value={1} onClick={(e) => this.setState({ type: "Student", classname1: "student act", classname2: ""})}>Student</Button>
                  <Button.Or />
                  <Button  className={this.state.classname2} value={2} onClick={(e) => this.setState({ type: "Teacher", classname2: "teacher act", classname1: ""})}>Teacher</Button>
                </Button.Group>


                <div className={this.state.message}>
                  <div className='content'>
                    <div className='header'>Error</div>
                    <p>Wrong username or password</p>
                    </div>
                </div>
                  <div className="login button">
                    <Button  style={{border: '1px solid'}} loading={this.state.loading} content="Login" className='user dropdown hvr-round-corners' fluid size='large' onClick={(e) => this.logIn(e)}>
                    </Button>
                  </div>
              </Segment>
            </Form>
            <Message style={{width: "96%"}}>
              New to us? <Link to={'/register'}>Sign Up</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>)
  }

}
