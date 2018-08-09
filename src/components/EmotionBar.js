import React from 'react'
import { Header, Segment, Button, Grid} from 'semantic-ui-react'
import { Emoji } from 'emoji-mart';
import io from 'socket.io-client';


class Emotion extends React.Component {
  constructor(props) {
    super(props);
    var self = this;

    this.socket = io('localhost:3001');
  }

  componentDidMount() {
    this.socket.emit('JOIN_ROOM', {
      message: '',
      class: this.props.lecture
    })
  }

  thumbsUp() {
    this.socket.emit('REACTION',{
      reaction: 1,
      user: this.props.user._id,
      class: this.props.lecture
    })
  }

  okay(){
    this.socket.emit('REACTION',{
      reaction: 0,
      user: this.props.user._id,
      class: this.props.lecture
    })
  }

  thumbsDown(){
    this.socket.emit('REACTION',{
      reaction: -1,
      user: this.props.user._id,
      class: this.props.lecture
    })
  }

  confused(){
    this.socket.emit('REACTION',{
      reaction: -2,
      user: this.props.user._id,
      class: this.props.lecture
    })
  }

  render() {
    return (
      <div>
        <Header as='h1' dividing textAlign="center">
          Emotion Bar
          <Header.Subheader content='What is your understanding of the current situation?' />
        </Header>
        <Grid columns={1} centered  textAlign="center" verticalAlign="center">
          <Grid.Column>
            <Segment as={Button} circular size="big" color="youtube" textAlign="center" className="emoji top" onClick={() => this.thumbsUp()}>
              <Emoji  emoji='thumbsup' set='apple' skin="6" size={100} />
              {/* <p>I am comfortable, Go on Baby!</p> */}
            </Segment>
            <Segment as={Button} circular size="big" color="youtube" raised textAlign="center" className="emoji good" onClick={() => this.okay()}>
              <Emoji emoji="ok_hand" set='apple' skin="4" size={100} />
              {/* <p>On point Sir, Good to go!</p> */}
            </Segment>
            <Segment  as={Button} circular size="big" color="youtube" onClick={() => this.thumbsDown()}  raised textAlign="center" className="emoji confused">
              <Emoji emoji='thumbsdown' set='apple' skin="4" size={100} />
              {/* <p>Slightly confused!</p> */}
            </Segment>
            <Segment as={Button} circular size="big" color="youtube" onClick={() => this.confused()} raised textAlign="center" className="emoji out">
              <Emoji emoji='exploding_head' set='apple' skin='5' size={100} />
              {/* <p>I am out, I lost you!</p> */}
            </Segment>
          </Grid.Column>
        </Grid>
      </div>

    );
  }
}

export default Emotion;
