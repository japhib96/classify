import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Menu, Segment, Input, Dropdown, Icon} from 'semantic-ui-react';



export default class Navigationbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'home',
      goHome: false
    }
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  logout() {
    const self = this;
    axios.get('/logout')
    .then((resp) => {
      self.props.setUser();
    })
  }

  render() {
    const { activeItem } = this.state

    return (
      <div>
        <Menu className='ui navbar' size='massive'>
          <Menu.Item header name='Classify' active={activeItem === 'home'} onClick={() => this.setState({ goHome: true })} />
          <Menu.Menu position='right'>
            <Dropdown  className='ui icon' icon='user' floating labeled button className='icon' text='Settings' active={activeItem === 'logout'}
              onClick={this.handleItemClick}>
              <Dropdown.Menu>
                <Dropdown.Header content='Settings' />
                <Dropdown.Item >User Settings <Icon disabled name='user secret' /></Dropdown.Item>
                <Dropdown.Item >Information <Icon disabled name='info' /></Dropdown.Item>
                <Dropdown.Item onClick={() => this.logout()}> Logout <Icon disabled name='power off' /></Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        </Menu>
        {this.state.goHome ? <Redirect to='/dashboard' /> : null }
      </div>
    )
  }
}
