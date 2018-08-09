import Divider from './divider';
import Headercomp from './Headercomponent';
import React from 'react'
import { Grid, Segment, Sticky, TextArea, Form, Button, Icon, Popup} from 'semantic-ui-react'
import Comment from './Comments';
import Emotions from './EmotionBar';
import Statistics from './ClassStatistics';
import Navigationbar from './Navbar';
import io from 'socket.io-client';




export default class TeacherInterface extends React.Component {
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

              </Grid.Column>
          </Grid>
        </div>
      );
    }
  }
