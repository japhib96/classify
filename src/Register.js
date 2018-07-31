import React from 'react';

export default class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      passwordRepeat: ''
    }
  }

  accountMade(username, password, passwordRepeat) {
    console.log(username, password, passwordRepeat);
    this.props.goToLogin();
  }

  render() {
    return (
      <div>
        <h1>Make an account!</h1>
        <div className="form-group">
          <label>Username: </label>
          <input type="text" name="username" className="form-control" onChange={(e) => this.setState({username: e.target.value})} />
        </div>
        <div className="form-group">
          <label>Password: </label>
          <input type="password" name="password" className="form-control" onChange={(e) => this.setState({password: e.target.value})} />
        </div>
        <div className="form-group">
          <label>Verify Password: </label>
          <input type="password" name="passwordRepeat" className="form-control" onChange={(e) => this.setState({passwordRepeat: e.target.value})}/>
        </div>
        <div className="form-group">
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => this.accountMade(this.state.username, this.state.password, this.state.passwordRepeat)}> Register </button>
            <button
              className="btn btn-success"
              type="button"
              onClick={() => this.props.goToLogin()}> Login </button>
            </div>
          </div>
        );
      }
    }
