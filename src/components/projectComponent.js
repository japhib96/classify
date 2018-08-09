import React from 'react'
import { Button, Card, Image } from 'semantic-ui-react'

const CardGroups = (props) => (
  <Card.Group  itemsPerRow={3} >
    <Card className='cardItem' raised onClick={() => props.setClass(props.classId)}>
      <Card.Content>
        <Image floated='right' size='mini' src='https://react.semantic-ui.com/images/avatar/large/steve.jpg' />
        <Card.Header>{props.title}</Card.Header>
        <Card.Meta>Friends of Elliot</Card.Meta>
        <Card.Description>
          Steve wants to add you to the group <strong>best friends</strong>
        </Card.Description>
      </Card.Content>
    </Card>
  </Card.Group>
)

export default CardGroups
