import React from 'react';
import StatisticSection from '../ClassStatistics'
import PDFViewer from '../testFrontend/PDFViewer';
import EmotionBar from '../EmotionBar'
import Headercomp from '../Headercomponent';
import io from 'socket.io-client';
import { Header, List, Label} from 'semantic-ui-react'
import { Emoji } from 'emoji-mart';




class TeacherView extends React.Component {
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
      class: this.props.lectureId
    })

    this.socket.emit('REACTION',{
      reaction: '',
      user: this.props.user._id,
      class: this.props.lectureId
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
        <Headercomp title={this.props.lectureTitle}
        description={this.props.user.username} />
      <div className="teacher grid">
        <div className="left column teacher lecture">
          <div className="most viewed questions">
            <header class="header questions">
              <Header as='h1' dividing textAlign="center">
              Top 3 rated questions in the lecture:
              </Header>
            </header>
            <div className="main list content">
              <div className="list content"></div>
              <div className="list content"></div>
              <div className="list content"></div>
            </div>
          </div>
          <div className="emotions teacher view">
            <header class="header questions">
              <Header as='h1' dividing textAlign="center">
              How your class is feeling about the content:
              </Header>
            </header>
            <div className="main emoji content">
              <div>
                <Emoji  emoji='thumbsup' set='apple' skin="6" size={36} />
                <Label size="massive" >{thumbsUp}</Label>
                <Emoji  emoji='thumbsdown' set='apple' skin="6" size={36} />
                <Label size="massive" >{okay}</Label>
                <Emoji  emoji='ok_hand' set='apple' skin="6" size={36} />
                <Label size="massive" >{thumbsDown}</Label>
                <Emoji  emoji='exploding_head' set='apple' skin="6" size={36} />
                <Label size="massive" >{confused}</Label>
              </div>
            </div>
          </div>
        </div>

        <div className="right column teacher lecture">
           <PDFViewer lecture={this.props.lectureId}/>
        </div>
      </div>
    </div>
    );
  }
}

export default TeacherView;
