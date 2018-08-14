import React from 'react'
import { Button, Card, Image } from 'semantic-ui-react'
import randomColor from  'randomcolor';


class CardGroups extends React.Component {
  constructor(props) {
    super(props)
  }

  setProperty() {
    if (this.props.setClass) {
      console.log('class')
      this.props.setClass(this.props.classId);
    } else {
      this.props.setLecture(this.props.lectureId, this.props.title);
    }
  }


  render() {

    return (
      <Card.Group  itemsPerRow={3} >
        <Card className="cardItem" raised onClick={() => this.setProperty()} >
          <Card.Content>
            <Image floated='right' size='mini' src='https://react.semantic-ui.com/images/avatar/large/steve.jpg' />
            <Card.Header>{this.props.title}</Card.Header>
            <Card.Meta>Friends of Elliot</Card.Meta>
            <Card.Description>
              Steve wants to add you to the group <strong>best friends</strong>
            </Card.Description>
          </Card.Content>
        </Card>
      </Card.Group>
    )
  }
}


export default CardGroups
