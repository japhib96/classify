import React from 'react'
import { Header, Segment, Button, Grid} from 'semantic-ui-react'
import { Emoji } from 'emoji-mart';
import io from 'socket.io-client';


class Emotion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allReactions: []
    };
    var self = this;

    this.socket = io('localhost:3001');

    this.socket.on("ALL_REACTIONS", function(reactions){
      self.setState({allReactions: reactions})
    })
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

  renderColor = (index) => {
    var check = this.state.allReactions.findIndex( (reactionObj) => {
      return reactionObj.id === this.props.user._id
    })
    if(this.state.allReactions[0] && this.state.allReactions[check].reaction === index) {
      switch(this.state.allReactions[check].reaction) {
        case 1: return 'thumbsup';
        case 0: return 'okay';
        case -1: return 'thumbsdown';
        case -2: return 'blown';
      }
    } else {
      return 'inactive'
    }
  }



  render() {
    return (

      <div className="emotiongrid wrapper">
         <header class="header">
           <Header  className="commentblock" as='h1' textAlign="center">
             Emotion Bar
             <Header.Subheader content='What is your understanding of the current situation?' />
           </Header>
         </header>
           <div className="emotion main">
             <Segment as={Button} circular size="big" textAlign="center" className={this.renderColor(1)} onClick={() => this.thumbsUp()}>
               <Emoji  emoji='thumbsup' set='apple' skin="6" size={60} />
             </Segment>
             <Segment as={Button} circular size="big" raised textAlign="center" className={this.renderColor(0)} onClick={() => this.okay()}>
               <Emoji emoji="ok_hand" set='apple' skin="4" size={60} />
             </Segment>
             <Segment  as={Button} circular size="big"  onClick={() => this.thumbsDown()}  raised textAlign="center" className={this.renderColor(-1)}>
               <Emoji emoji='thumbsdown' set='apple' skin="4" size={60} />
             </Segment>
             <Segment as={Button} circular size="big" onClick={() => this.confused()} raised textAlign="center" className={this.renderColor(-2)}>
               <Emoji emoji='exploding_head' set='apple' skin='5' size={60} />
             </Segment>
           </div>
      </div>

    );
  }
}

export default Emotion;
