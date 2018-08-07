
import React, { Component } from 'react'
import { Grid, Menu, Segment, Icon } from 'semantic-ui-react'
import CardGroups from './projectComponent';


export default class DashboardGridComponent extends Component {
  state = { activeItem: 'bio' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Grid>
        <Grid.Column width={4}>
          <Menu fluid vertical tabular size='large' className='column menu bar'>
            <Menu.Item className='menubar item' name='Current Sessions' active={activeItem === 'Current Sessions'} onClick={this.handleItemClick}>
              <i class="fas fa-file"/> Current Sessions
            </Menu.Item>
            <Menu.Item className='menubar item' name='Classes' active={activeItem === 'Classes'} onClick={this.handleItemClick}>
              <i class="fas fa-graduation-cap"/> Classes
            </Menu.Item>
            <Menu.Item className='menubar item' name='Recently' active={activeItem === 'Recently'} onClick={this.handleItemClick}>
              <i class="far fa-clock"/> Recently
            </Menu.Item>
          </Menu>
        </Grid.Column>
        <Grid.Column stretched width={12} className='column menu item'>
          <Segment stretched width={12} className='navbar'>
            <Segment stretched width={12} ></Segment>
              <CardGroups />
              <CardGroups />
              <CardGroups />
              <CardGroups />
              <CardGroups />
              <CardGroups />
              <CardGroups />
              <CardGroups />
              <CardGroups />
              <CardGroups />
              <CardGroups />
              <CardGroups />
              <CardGroups />
              <CardGroups />
              <CardGroups />
              <CardGroups />
              <CardGroups />
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}
