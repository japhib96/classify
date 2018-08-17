import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Menu, Segment, Input, Dropdown, Icon, Item} from 'semantic-ui-react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

library.add(faUser)


export default class Navigationbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'home',
      goHome: false
    }
  }

  componentDidMount() {
    this.setState({ goHome: false });
  }


  logout() {
    const self = this;
    axios.get('/logout')
    .then((resp) => {
      self.props.setUser();
    })
  }


  render() {
    const { activeItem } = this.state

    const trigger = (
      <span>
        <Icon name="user" />
          Hello, {this.props.user.username}
      </span>
    )

    const options = [
      {key: 'user',
       text: (
         <span>
           Signed in as <strong>{this.props.user.username}</strong>
         </span>
       ),disabled: true,},
      { key: 'user', text: 'Account', icon: 'user'},
      { key: 'settings', text: 'Settings', icon: 'settings' },
      { key: 'sign-out', text: 'Sign Out', icon: 'sign out', onClick: () => this.logout() },
    ]

    return (
      <div>
        <Menu className='ui navbar' size='massive'>
          <Menu.Item header name='Classify' active={activeItem === 'home'} onClick={() => this.setState({ goHome: true })} />
          <div className="session">{this.props.user.teacher ? <i>Teacher</i> : <i>Student</i>}</div>
          <Menu.Menu position='right' style={{marginLeft:"0em"}}>
            <Dropdown trigger={trigger} options={options} pointing='top right' className="user dropdown"/>
          </Menu.Menu>
        </Menu>
        {this.state.goHome ? <Redirect to='/' /> : null }
      </div>
    )
  }
}
