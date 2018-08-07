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
import { Redirect } from 'react-router-dom';

class JoinClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classId: '',
      password: '',
      done: false
    };
  }

  async join() {
    try {
      await axios.post('/class/join', {
        lectureId: this.state.classId,
        password: this.state.password,
      })
      this.props.joinRoom(this.state.classId);
      this.setState({ done: true });
    } catch(error) {
      console.log(error);
    }
  }

  render() {
    if (this.state.done) {
      return <Redirect to='/user' />
    }
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
              type="password"
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
