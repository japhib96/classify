
import React, { Component } from 'react';
import { Header } from 'semantic-ui-react'
import Divider from './divider';

class Headercomp extends Component {

  render() {
    return (
      <div style={{height: '9%'}} >
        <Header as='h1' textAlign="center">
          {this.props.title}
          <Header.Subheader>{this.props.description}</Header.Subheader>
          <Divider />
        </Header>
      </div>
    )
  }
}

export default Headercomp;
