import React from 'react'
import { Button, Card, Image } from 'semantic-ui-react'



class CardGroups extends React.Component {
  constructor(props) {
    super(props)
  }

  setProperty() {
    if (this.props.setClass) {
      console.log('class')
      this.props.setClass(this.props.classId);
    } else {
      this.props.setLecture(this.props.lectureId, this.props.title, this.props.date, this.props.active);
    }
  }


  render() {

    return (
      <Card.Group  itemsPerRow={3} >
        <Card className="cardItem" raised onClick={() => this.setProperty()} >
          <Card.Content>
            <Card.Header>{this.props.title}</Card.Header>
            <Card.Meta>{this.props.active ? 'LIVE' : `Created: ${this.props.date.substring(4,15)}`}</Card.Meta>
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
