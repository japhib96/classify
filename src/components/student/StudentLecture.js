import Divider from '../divider';
import Headercomp from '../Headercomponent';
import React from 'react'
import { Grid, Segment, Sticky, TextArea, Form, Button, Icon, Popup, Header} from 'semantic-ui-react'
import Comment from '../Comments';
import Emotions from '../EmotionBar';
import Questions from './Questions';
import Navigationbar from '../Navbar';
import io from 'socket.io-client';
import EmojiPicker from 'emoji-picker-react';
import JSEMOJI from 'emoji-js';


export default class UserInterface extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      message: '',
    };

    var self = this;

    this.socket = io('localhost:3001');


      this.sendMessage = ev => {
        ev.preventDefault();

        if(ev.keyCode == 13 && ev.shiftKey !== true && ev.target.value.trim().length > 0) {
          this.socket.emit('SEND_MESSAGE', {
            author: this.props.user.username,
            message: this.state.message,
            class: this.props.lecture.id
          });
          this.setState({
            message:""
          })
        }
      }
    }


  showPicker = (emojiCode, emojiObj) => {
    console.log(emojiObj);
    var emoji = new JSEMOJI();
    this.setState({message: this.state.message + emoji.replace_colons(`:${emojiObj.name}:`)})
  }



  render() {

    return (


      <div className="viewport">
        <Headercomp
          title={this.props.lecture.title}
          description={this.props.user.username} />

          <div className="chat grid">
            <div className="question col">
              <Questions user={this.props.user} lecture={this.props.lecture.id} />
            </div>
            <div className="userinterface wrapper">
              <header class="header">
                <Header className="commentblock" as='h1' textAlign="center">
                Questions
                  <Header.Subheader content='Ask Questions and respond to threads.'/>
                </Header>
              </header>
              <div className="usergrid main">
                <Comment user={this.props.user} lecture={this.props.lecture.id}  />
              </div>
              <footer class="footer student">
                <Form reply className="input field">
                  <Form.TextArea
                    autoHeight
                    placeholder='Type somehting'
                    rows={1}
                    style={{backgroundColor:'white', borderRadius: '15px',border:"2px solid gray", padding: '10px', outline:'none', width: '100%',}}
                    unstackable
                    onChange={ (e) => this.setState({message: e.target.value})}
                    value={this.state.message}
                    onKeyUp = {this.sendMessage}
                    className="input textarea"
                  />
                </Form>
                <Popup  on='click' trigger={<Button className="emoji picker" icon='smile' circular />} content={<EmojiPicker onEmojiClick={this.showPicker} />} />
              </footer>
            </div>
            <div className="emotion col">
              <Emotions user={this.props.user} lecture={this.props.lecture.id}   />
            </div>
          </div>
        </div>
      );
    }
  }
