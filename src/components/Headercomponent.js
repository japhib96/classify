
import React, { Component } from 'react';
import { Header } from 'semantic-ui-react'

class Headercomp extends Component {

  render() {
    return (
      <Header as='h1' textAlign="center">
        Your Dashboard
        <Header.Subheader> Welcome to your Dashboard. You can create and/or join sessions</Header.Subheader>
      </Header>
    )
  }
}

export default Headercomp;
