
import React, { Component } from 'react';
import { Header } from 'semantic-ui-react'
import Divider from './divider';

class Headercomp extends Component {

  render() {
    return (
      <div style={{paddingTop:"55px"}}>
        <Header as='h1' textAlign="center">
          Your Dashboard
          <Header.Subheader> Welcome to your Dashboard. You can create and/or join sessions</Header.Subheader>
          <Divider />
        </Header>
      </div>
    )
  }
}

export default Headercomp;
