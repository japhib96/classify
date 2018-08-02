
import React, { Component } from 'react'
import { Menu, Segment, Input, Dropdown, Icon} from 'semantic-ui-react'


export default class Navigationbar extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <div>
        <Menu className='ui navbar' size='massive'>
          <Menu.Item header name='Classify' active={activeItem === 'home'} onClick={this.handleItemClick} />
          <Menu.Menu position='right'>
            <Dropdown  className='ui icon' icon='user' floating labeled button className='icon' text='Settings' active={activeItem === 'logout'}
              onClick={this.handleItemClick}>
              <Dropdown.Menu>
                <Dropdown.Header content='Settings' />
                <Dropdown.Item >User Settings <Icon disabled name='user secret' /></Dropdown.Item>
                <Dropdown.Item >Information <Icon disabled name='info' /></Dropdown.Item>
                <Dropdown.Item > Logout <Icon disabled name='power off' /></Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}
