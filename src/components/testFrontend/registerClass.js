import React, { Component } from 'react';
import { Button,
FormGroup,
FormControl } from 'react-bootstrap';
import axios from 'axios';

class RegisterClass extends Component {
  constructor(props){
    super(props);
    this.state = {
      classTitle: '',
      password: '',
    };
  }

  async saveClass() {
    try {
      await axios.post('/saveClass', {
        classTitle: this.state.classTitle,
        password: this.state.password
      })
      console.log('classroom saved')
    }
    catch(error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Registration</h1>
        <form>
          <FormGroup controlId="formBasicText">
            <h4>Classroom Title:</h4>
            <FormControl
              type="text"
              value={this.state.classTitle}
              onChange={(e)=>this.setState({
                classTitle: e.target.value
                })}
            />
            <h4>Document Password:</h4>
            <FormControl
              type="password"
              value={this.state.password}
              onChange={(e)=>this.setState({
                  password: e.target.value
                })}
            />
          </FormGroup>
        </form>
       <Button type="submit" bsStyle="primary" bsSize="large" block onClick={() => this.saveClass()}>Register</Button>
      </div>
    );
  }
}

export default RegisterClass;
