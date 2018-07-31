import React, { Component } from 'react';
import { Button,
ButtonGroup,
DropdownButton,
MenuItem,
PageHeader,
Modal,
FormGroup,
FormControl } from 'react-bootstrap';

class JoinClass extends Component {
  constructor(props){
    super(props);
    this.state = {
      classId: '',
      password: '',
    };
  }
  render() {
    return (
      <div className="App">

        <form>
          <FormGroup controlId="formBasicText">
            <h4>Classroom Title:</h4>
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
      </div>
    );
  }
}

export default JoinClass;
