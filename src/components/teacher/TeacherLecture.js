import React from 'react';
import StatisticSection from '../ClassStatistics'
import PDFViewer from '../testFrontend/PDFViewer';
import EmotionBar from '../EmotionBar'
import Headercomp from '../Headercomponent';
import Loading from '../Loader';
import TopComments from '../TopComments';
import CreateQuestion from '../teacher/CreateQuestionModal';
import io from 'socket.io-client';
import { Button, Header, List, Label } from 'semantic-ui-react'
import { Emoji } from 'emoji-mart';
import axios from 'axios'

class TeacherView extends React.Component {
  constructor(props) {
    super(props);

    let statusMessage;
    let classname;

    if (this.props.lecture.active) {
      statusMessage = 'Pause Lecture';
      classname = "button active"
    } else {
      statusMessage = 'Go Live'
      classname = "button unactive"
    }

    console.log(statusMessage)
    this.state = {
      allReactions: [],
      statusMessage: statusMessage,
      loading: true,
      loading2: false,
      classname: classname,
      lectureStatus: this.props.lecture.active
    };

    var self = this;

    this.socket = io('localhost:3001');

    this.socket.on("ALL_REACTIONS", function(reactions){
      console.log('all reactions')
      self.setState({allReactions: reactions})
    })

  }

  componentDidMount() {
    this.socket.emit('JOIN_ROOM', {
      message: '',
      class: this.props.lecture.id
    })

    this.socket.emit('REACTION',{
      reaction: '',
      user: this.props.user._id,
      class: this.props.lecture.id
    })
  }

  async toggleLecture() {
    this.setState({
      loading2:true
    })

    let active;
    try {
      await axios.post('/lecture/toggle', {
        lectureId: this.props.lecture.id
      }).then((resp) => {
        active = resp.data.status;
      })
      console.log('Lecture toggled')
      if (active) {
        this.setState({ statusMessage: 'Pause Lecture', loading: false, classname: "button active", loading2: false});
      } else {
        this.setState({ statusMessage: 'Go Live', loading: false , classname: "button unactive", loading2: false});
      }
    }
    catch(error) {
      console.log(error);
    }
  }

  render() {
    console.log(this.props.lecture.active)
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
    <div className="viewport">
      <Headercomp
        title={this.props.lecture.title}
        lectureStatus={this.state.lectureStatus}
        description={this.props.user.username}
      />
      <div className="lecture view grid">
        <div className="most outer left">
          <CreateQuestion socket={this.socket} lectureId={this.props.lecture.id} />
        </div>
        <div className="left column teacher lecture">
          <div className="most viewed questions">
            <header class="header questions">
              <h1 textAlign="center">
                Top 3 rated questions in the lecture:
              </h1>
            </header>
            <div className="main list content">
              <TopComments user={this.props.user} lecture={this.props.lecture.id} />
            </div>
          </div>
          <div className="emotions teacher view">
            <header class="header questions">
              <h1  textAlign="center">
                How your class is feeling about the content:
              </h1>
            </header>
            <div className="main emoji content">
              <div className="emoji container">
                <div className="emoji content">
                  <Emoji  emoji='thumbsup' set='apple' skin="1" size={50} />
                  <Label size="massive" >{thumbsUp}</Label>
                </div>
                <div className="emoji content">
                  <Emoji  emoji='ok_hand' set='apple' skin="2" size={50} />
                  <Label size="massive" >{okay}</Label>
                </div>
                <div className="emoji content">
                  <Emoji  emoji='thumbsdown' set='apple' skin="3" size={50} />
                  <Label size="massive" >{thumbsDown}</Label>
                </div>
                <div className="emoji content">
                  <Emoji  emoji='exploding_head' set='apple' skin="1" size={50} />
                  <Label size="massive" >{confused}</Label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="right column teacher lecture">
          <PDFViewer lectureId={this.props.lecture.id} user={this.props.user} lecture={this.props.lecture} reactions={{ thumbsUp: thumbsUp, okay: okay, thumbsDown: thumbsDown, confused: confused }}/>
          {/* <div className="right part">
            <div><CreateQuestion socket={this.socket} lectureId={this.props.lecture.id} /></div>
            <div><h2>Create a Question</h2></div>
          </div> */}
        </div>
        <Button className={this.state.classname} loading={this.state.loading2} onClick={()=>this.toggleLecture()}>{this.state.statusMessage}</Button>
      </div>
    </div>
  );
}
}

export default TeacherView;
