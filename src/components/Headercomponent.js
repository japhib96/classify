
import React, { Component } from 'react';
import { Header } from 'semantic-ui-react'
import Divider from './divider';

class Headercomp extends Component {

  render() {
    return (
      <div style={{height: '15%', paddingTop: '60px'}} >
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
