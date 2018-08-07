import React from 'react'
import { Header, Segment, Button} from 'semantic-ui-react'
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
      class: this.props.class
    })
  }

  thumbsUp() {
    this.socket.emit('REACTION',{
      reaction: 1,
      user: this.props.user._id,
      class: this.props.class
    })
  }

  okay(){
    this.socket.emit('REACTION',{
      reaction: 0,
      user: this.props.user._id,
      class: this.props.class
    })
  }

  thumbsDown(){
    this.socket.emit('REACTION',{
      reaction: -1,
      user: this.props.user._id,
      class: this.props.class
    })
  }

  confused(){
    this.socket.emit('REACTION',{
      reaction: -2,
      user: this.props.user._id,
      class: this.props.class
    })
  }

  render() {
    return (
      <div>
        <Header as='h1' dividing textAlign="center">
          Emotion Bar
          <Header.Subheader content='What is your understanding of the current situation?' />
        </Header>

        <Segment raised textAlign="center" className="emoji top" onClick={() => this.thumbsUp()}>
          <Emoji  emoji='thumbsup' set='apple' skin="6" size={120} />
          <p>I am comfortable, Go on Baby!</p>
        </Segment>
        <Segment raised textAlign="center" className="emoji good" onClick={() => this.okay()}>
          <Emoji emoji="ok_hand" set='apple' skin="4" size={120} />
          <p>On point Sir, Good to go!</p>
        </Segment>
        <Segment onClick={() => this.thumbsDown()}  raised textAlign="center" className="emoji confused">
          <Emoji emoji='thumbsdown' set='apple' skin="4" size={120} />
          <p>Slightly confused!</p>
        </Segment>
        <Segment onClick={() => this.confused()} raised textAlign="center" className="emoji out">
          <Emoji emoji='exploding_head' set='apple' skin='5' size={120} />
          <p>I am out, I lost you!</p>
        </Segment>

      </div>

    );
  }
}

export default Emotion;
