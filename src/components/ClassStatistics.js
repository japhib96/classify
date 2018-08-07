import React from 'react'
import { Header, Segment } from 'semantic-ui-react'
import io from 'socket.io-client';



class StatisticSection extends React.Component {
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
      class: this.props.class
    })
    
    this.socket.emit('REACTION',{
      reaction: '',
      user: this.props.user._id,
      class: this.props.class
    })
  }

  render() {
    var thumbsUp=0;
    var okay=0;
    var thumbsDown=0;
    var confused =0;
    this.state.allReactions.map( (reactionObj, index) =>{

      if(reactionObj.reaction === -1){
        thumbsDown += 1
      }
      else if(reactionObj.reaction === 0){
        okay += 1
      }
      else if(reactionObj.reaction === +1){
        thumbsUp += 1
      }
      else{
        confused += 1
      }
    }
  )

      return (
        <div>
          <Header as='h1' dividing textAlign="center">
            Stats Section
            <Header.Subheader content='Check out your stats!' />
            <Segment centered>
              <Header >{thumbsUp} </Header>
              <Header >{okay} </Header>
              <Header >{thumbsDown} </Header>
              <Header >{confused} </Header>
            </Segment>
          </Header>
        </div>
      );
  }
}

export default StatisticSection
