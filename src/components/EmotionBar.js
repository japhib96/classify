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
      class: this.props.lecture,
      user: this.props.user._id,
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

      <div className="emotiongrid wrapper">
         <header class="header">
           <Header as='h1' textAlign="center">
             Emotion Bar
             <Header.Subheader content='What is your understanding of the current situation?' />
           </Header>
         </header>
           <div className="emotion main">
             <Segment as={Button} circular size="big" textAlign="center" className="emoji top" onClick={() => this.thumbsUp()}>
               <Emoji  emoji='thumbsup' set='apple' skin="6" size={60} />
             </Segment>
             <Segment as={Button} circular size="big" raised textAlign="center" className="emoji good" onClick={() => this.okay()}>
               <Emoji emoji="ok_hand" set='apple' skin="4" size={60} />
             </Segment>
             <Segment  as={Button} circular size="big"  onClick={() => this.thumbsDown()}  raised textAlign="center" className="emoji confused">
               <Emoji emoji='thumbsdown' set='apple' skin="4" size={60} />
             </Segment>
             <Segment as={Button} circular size="big" onClick={() => this.confused()} raised textAlign="center" className="emoji out">
               <Emoji emoji='exploding_head' set='apple' skin='5' size={60} />
             </Segment>
           </div>
      </div>

    );
  }
}

export default Emotion;
