import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      password: '',
    };
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <form>
          <FormGroup controlId="formBasicText">
            <h4>Classroom Title:</h4>
            <FormControl
              type="text"
              value={this.state.title}
              onChange={(e)=>this.setState({
                newDoc: {
                  show: true,
                  title: e.target.value,
                  password: this.state.newDoc.password,
                }})}
            />
            <h4>Document Password:</h4>
            <FormControl
              type="text"
              value={this.state.newDoc.password}
              onChange={(e)=>this.setState({
                  password: e.target.value
                }})}
            />
          </FormGroup>
        </form>
      </div>
    );
  }
}

export default App;
