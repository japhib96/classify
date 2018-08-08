import Divider from './divider';
import Headercomp from './Headercomponent';
import React from 'react'
import { Grid, Segment, Sticky, TextArea, Form, Button, Icon, Popup} from 'semantic-ui-react'
import Comment from './Comments';
import Emotions from './EmotionBar';
import Statistics from './ClassStatistics';
import Navigationbar from './Navbar';
import io from 'socket.io-client';
import EmojiPicker from 'emoji-picker-react';
import jsemoji from 'emoji-js';

//  // new instance
// jsemoji = new JSEMOJI();
// // set the style to emojione (default - apple)
// jsemoji.img_set = 'emojione';
// // set the storage location for all emojis
// jsemoji.img_sets.emojione.path = 'https://cdn.jsdelivr.net/emojione/assets/3.0/png/32/';





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
        if (ev.key === 'Enter') {
          this.socket.emit('SEND_MESSAGE', {
            author: this.props.user.username,
            message: this.state.message,
            class: this.props.class
          });
          this.setState({
            message:""
          })
        }
      }
    }

    showPicker = (emojiCode, emojiObj) => {
      console.log(emojiCode,emojiObj);
    }

    render() {
      return (
        <div>
          <Grid columns='equal'>
              <Grid.Column stretched>
                  <Statistics  user={this.props.user} class={this.props.class} />
              </Grid.Column>
              <Grid.Column width={8} stretched>
                <Grid.Row className="usergrid">
                  <Comment user={this.props.user} class={this.props.class}  />
                </Grid.Row>
                <Grid.Row className="grid">
                  <Grid columns='equal' >
                    <Grid.Column width={12}>
                      <Form reply>
                        <Form.TextArea
                          autoHeight
                          placeholder='Type somehting'
                          rows={1}
                          style={{backgroundColor:'white', borderRadius: '15px', padding: '10px', outline:'none'}}
                          unstackable
                          onChange={ (e) => this.setState({message: e.target.value})}
                          value={this.state.message}
                          onKeyUp = {this.sendMessage}
                        />
                      </Form>
                    </Grid.Column>
                    <Grid.Column width={2}>
                      <Popup  on='click' trigger={<Button icon='add' circular />} content={<EmojiPicker onEmojiClick={this.showPicker} />} />
                    </Grid.Column>
                  </Grid>
                </Grid.Row>
              </Grid.Column>
              <Grid.Column>
                  <Emotions user={this.props.user} class={this.props.class}   />
              </Grid.Column>
          </Grid>
        </div>
      );
    }
  }
