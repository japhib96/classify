import React, { Component } from 'react';
import { Button,
ButtonGroup,
DropdownButton,
MenuItem,
PageHeader,
Modal,
FormGroup,
FormControl } from 'react-bootstrap';
import axios from 'axios';

class RegisterClass extends Component {
  constructor(props){
    super(props);
    this.state = {
      lectureTitle: '',
      password: '',
    };
  }

  async saveLecture() {
    try {
      await axios.post('/saveLecture', {
          lectureTitle: this.state.lectureTitle,
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
              value={this.state.lectureTitle}
              onChange={(e)=>this.setState({
                lectureTitle: e.target.value
                })}
            />
            <h4>Document Password:</h4>
            <FormControl
              type="text"
              value={this.state.password}
              onChange={(e)=>this.setState({
                  password: e.target.value
                })}
            />
          </FormGroup>
        </form>
       <Button type="submit" bsStyle="primary" bsSize="large" block onClick={() => this.saveLecture()}>Register</Button>
      </div>
    );
  }
}

export default RegisterClass;

                
