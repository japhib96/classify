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
      type: 1,
      done: '',
      isError: false,
      errorMsg: '',
      message: 'ui hidden error message'
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
                <Icon name='graduation' /> Log-in to your account
              </Header>
                <Form.Input
                  required
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='Username'
                  onChange={(e) => this.setState({ username: e.target.value })}
                />
                <Form.Input
                  required
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  onChange={(e) => this.setState({ password: e.target.value })}
                />

                <ToggleButtonGroup type="radio" name="options" inline-block required defaultValue={this.state.type}>
                  <ToggleButton value={1} onClick={(e) => this.setState({ type: 1 })}>Student </ToggleButton>
                  <ToggleButton value={2} onClick={(e) => this.setState({ type: 2 })}>Teacher </ToggleButton>
                </ToggleButtonGroup>

                <div className={this.state.message}>
                  <div className='content'>
                    <div className='header'>Error</div>
                    <p>Wrong username or password</p>
                    </div>
                </div>

                <div style={{paddingTop: 10}}>
                    <button class='ui inverted button' fluid size='large' onClick={(e) => this.logIn(e)}>
                      Log in
                    </button>
                </div>
              </Segment>
            </Form>
            <Message>
              New to us? <Link to={'/register'}>Sign Up</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>)
  }

}
