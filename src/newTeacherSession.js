import React from 'react'
import { Image, List, Icon, Item } from 'semantic-ui-react'

const ListExampleHorizontal = () => (

  <List horizontal size='massive'>
    <List.Item icon>
      <Icon name='thumbs up' size='huge'/>
      <List.Description>
      6
      </List.Description>
    </List.Item>
    <List.Item>
      <Icon name='hand paper outline' size='huge'/>
      <List.Description>
      6
      </List.Description>
    </List.Item>
    <List.Item>
      <Icon name='thumbs down' size='huge'/>
      <List.Description>
      6
      </List.Description>
    </List.Item>
  </List>

)

export default ListExampleHorizontal
