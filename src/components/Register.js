import React from 'react';
import axios from 'axios';
import { Button,
ButtonToolbar,
FormGroup,
FormControl,
ToggleButton,
ToggleButtonGroup,
Form,
Col,
ControlLabel
} from 'react-bootstrap';

export default class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      passwordRepeat: '',
      type: 1
    }
  }

  async makeAccount(e) {
    e.preventDefault();
    try {
      await axios.post('/saveUser', {
        username: this.state.username,
        password: this.state.password,
        passwordRepeat: this.state.passwordRepeat,
        type: this.state.type
      })
      console.log('New user saved')
      this.props.goToLogin();
    }
    catch(error) {
      console.log(error);
    }
  }

  render() {
    return (
      // <div>
      //   <h1>Make an account!</h1>
      //   <div className="form-group">
      //     <label>Username: </label>
      //     <input type="text" name="username" className="form-control" onChange={(e) => this.setState({ username: e.target.value })} />
      //   </div>
      //   <div className="form-group">
      //     <label>Password: </label>
      //     <input type="password" name="password" className="form-control" onChange={(e) => this.setState({ password: e.target.value })} />
      //   </div>
      //   <div className="form-group">
      //     <label>Verify Password: </label>
      //     <input type="password" name="passwordRepeat" className="form-control" onChange={(e) => this.setState({ passwordRepeat: e.target.value })}/>
      //   </div>
      //   {/* <ToggleButtonGroup type="radio" name="options" defaultValue={this.state.type}>
      //     <ToggleButton value={1} onClick={(e) => this.setState({ type: 1 })}>Student </ToggleButton>
      //     <ToggleButton value={2} onClick={(e) => this.setState({ type: 2 })}>Teacher </ToggleButton>
      //   </ToggleButtonGroup> */}
      //   <div className="form-group">
      //     <button
      //       className="btn btn-primary"
      //       type="button"
      //       onClick={() => this.makeAccount()}>Register</button>
      //       <button
      //         className="btn btn-success"
      //         type="button"
      //         onClick={() => this.props.goToLogin()}>Login</button>
      //       </div>
      //     </div>



          <Form horizontal>
            <FormGroup>
              <Col smOffset={3} sm={4}>
                <div className="h1">
                  <h1>Register</h1>
                </div>
              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalEmail">
              <Col componentClass={ControlLabel} sm={3}>
                Username
              </Col>
              <Col sm={6}>
                <FormControl type="text" placeholder="Username" onChange={(e) => this.setState({username: e.target.value})}/>
              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalPassword">
              <Col componentClass={ControlLabel} sm={3}>
                Password
              </Col>
              <Col sm={6}>
                <FormControl type="password" placeholder="Password" onChange={(e) => this.setState({password: e.target.value})}/>
              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalPassword">
              <Col componentClass={ControlLabel} sm={3}>
                Verify Password
              </Col>
              <Col sm={6}>
                <FormControl type="password" placeholder="Password" onChange={(e) => this.setState({password: e.target.value})}/>
              </Col>
            </FormGroup>
            <ToggleButtonGroup block type="radio" name="options" defaultValue={this.state.type}>
              <ToggleButton value={1} onClick={(e) => this.setState({ type: 1 })}>Student </ToggleButton>
              <ToggleButton value={2} onClick={(e) => this.setState({ type: 2 })}>Teacher </ToggleButton>
            </ToggleButtonGroup>
            <FormGroup>
              <Col smOffset={4} sm={4}>
                <Button type="submit" bsStyle="primary" bsSize="large" block onClick={(e) => this.makeAccount(e)}>Register</Button>
              </Col>
            </FormGroup>
          </Form>

        );
      }
    }
