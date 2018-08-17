
import React, { Component } from 'react';
import { Header } from 'semantic-ui-react'
import Divider from './divider';

class Headercomp extends Component {

  constructor(props) {
    super(props);

    let statusmessage;

    console.log("hey status",this.props.lectureStatus);

    if (this.props.lectureStatus === true) {
      statusmessage = " is active"
    } else {
      statusmessage = ""
    }

    this.state = {
      statusmessage: statusmessage
    };
  }


  render() {
    return (
      <div>
        <Header as='h1' textAlign="center" >
          {this.props.title} <i>{this.state.statusmessage}</i>
          <Header.Subheader>{this.props.description}</Header.Subheader>
          <Divider />
        </Header>
      </div>
    )
  }
}

export default Headercomp;
