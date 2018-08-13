
import React, { Component } from 'react';
import { Header } from 'semantic-ui-react'
import Divider from './divider';

class Headercomp extends Component {

  render() {
    return (
      <div>
        <Header as='h1' textAlign="center" style={{marginTop:"1em"}}>
          {this.props.title}
          <Header.Subheader>{this.props.description}</Header.Subheader>
          <Divider />
        </Header>
      </div>
    )
  }
}

export default Headercomp;
