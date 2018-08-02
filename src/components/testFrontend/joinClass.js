import React, { Component } from 'react';
import axios from 'axios';
import { Button,
ButtonGroup,
DropdownButton,
MenuItem,
PageHeader,
Modal,
FormGroup,
FormControl } from 'react-bootstrap';

class JoinClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classId: '',
      password: '',
    };
  }

  async join() {
    try {
      await axios.post('/joinClass', {
        classId: this.state.lectureTitle,
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

        <form>
          <FormGroup controlId="formBasicText">
            <h4>Classroom Id:</h4>
            <FormControl
              type="text"
              value={this.state.classId}
              onChange={(e)=>this.setState({
                classId: e.target.value
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
        <Button type="submit" bsStyle="primary" bsSize="large" block onClick={() => this.join()}>Join Class</Button>
      </div>
    );
  }
}

export default JoinClass;
