import React from 'react';

export default class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
    }
  }

  logIn(username, password) {
    console.log('hey')
  }


  render() {
    return (
      <div>
        <form method="POST">
          <h3>Login</h3>
          <div className="form-group">
            <label type="text">Username: </label>
            <input type="text" name="username" className="form-control" onChange={(e) => this.setState({username: e.target.value})} />
          </div>
          <div className="form-group">
            <label type="text">Password: </label>
            <input type="password" name="password" className="form-control" onChange={(e) => this.setState({password: e.target.value})}/>
          </div>
          <div className="form-group">
            <button className="btn btn-primary" onClick={() => this.props.goToRegister()}>Register</button>
            <button className="btn btn-success" type="button" onClick={() => this.logIn(this.state.username, this.state.password)}>Login</button>
          </div>
        </form>
      </div>
    );
  }
}
