import React from 'react'
import {
  Button,
  Comment,
  Form,
  Header,
  Container,
  Label,
  Grid,
  TextArea,
  Icon} from 'semantic-ui-react'
import io from 'socket.io-client';
import { Emoji } from 'emoji-mart';
import JSEMOJI from 'emoji-js';

//  // new instance
// jsemoji = new JSEMOJI();
// // set the style to emojione (default - apple)
// jsemoji.img_set = 'emojione';
// // set the storage location for all emojis
// jsemoji.img_sets.emojione.path = 'https://cdn.jsdelivr.net/emojione/assets/3.0/png/32/';

class Comments extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      username: '',
      message: '',
      messages: [],
      reaction: '',
      allReactions: [],
      reply:'',
      pressed: []
    };
    var self = this;

    this.socket = io('localhost:3001');

    this.socket.on('RECEIVE_MESSAGE', function(data){
      addMessage(data);
    });

    this.socket.on('UPDATE_LIKES', function(data){
      self.setState({messages: data})
      console.log(self.state.messages)
    })

    this.socket.on("UPDATE_MESSAGE", function(data){
      var pressArr = [];
      data.forEach(() => {
        pressArr.push(false)
      })
      self.setState({
        messages: data,
        pressed: pressArr
      })
    })

    this.socket.on('UPDATE_REPLIES', function(data) {
      self.setState({ messages: data, reply: '' })
    })

    const addMessage = data => {
      this.setState({ messages: data, pressed: [...this.state.pressed, false] });
    };

    this.sendMessage = ev => {
      ev.preventDefault();
      this.socket.emit('SEND_MESSAGE', {
        author: this.props.user.username,
        message: this.state.message,
        class: this.props.class
      });
      this.setState({message: ''});
    }
  }

            componentDidMount() {
            this.socket.emit('JOIN_ROOM', {
              message: '',
              class: this.props.class
            })
          }

          likeMessage = (id) =>{
            this.socket.emit('LIKE_MESSAGE',{
              messages: this.state.messages,
              index: id,
              user: this.props.user._id,
              class: this.props.class
            })
          }

          addReply(index) {
            var arr = this.state.pressed.slice();
            arr[index] = !arr[index];
            this.setState({ pressed : arr })
          }

          sendReply(id, index) {
            this.socket.emit('ADD_REPLY', {
              user: this.props.user.username,
              reply: this.state.reply,
              index: id,
              class: this.props.class
            })
            this.addReply(index);
          }

          render() {
            return (
              <div>
                <Comment.Group threaded>
                  <Header as='h1' dividing textAlign="center">
                    Comments / Questions
                    <Header.Subheader content='Ask Questions and respond to threads. Btw. Its all anonymous, so don´t shy away PUSSSAY!'/>
                  </Header>

                  {
                    this.state.messages.map( (message, index) => {
                      return (
                        <Container className="container">
                          <Comment key={index}>
                            <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/joe.jpg'  />
                            <Comment.Content>
                              <Comment.Author  as='a'>{message.author}</Comment.Author>
                              <Comment.Metadata>
                                <span>{message.date ? message.date.substring(0,21) : ''}</span>
                              </Comment.Metadata>
                              <Comment.Text>
                                <div id="styling">
                                  {message.message}
                                </div>

                              </Comment.Text>
                              <Comment.Actions>
                                <Label  as={Button} circular attached bottom right> <Emoji emoji="thumbsup" set='facebook' skin="4" size={12}/>{message.likes.length}</Label>
                                <Label as={Button} onClick={() => this.likeMessage(message._id) } circular attached bottom right>
                                  <Emoji emoji="thumbsup" set='facebook' skin="4" size={12} />
                                  I like it
                                </Label>
                                <Label as={Button} onClick={() => this.addReply(index)} circular attached bottom right >
                                  <i class="fas fa-comment"></i>
                                  Thread
                                </Label>
                              </Comment.Actions>

                            {this.state.pressed[index] ?
                                <Comment.Action>
                                  <Grid.Column textAlign="left" verticalAlign="center" className="reply" >
                                    <Form onChange={ (e) => this.setState({reply: e.target.value})} value={this.state.reply}>
                                      <TextArea type="submit" onSubmit={() => this.sendMessage() } autoHeight placeholder='Type somehting' rows={1} style={{backgroundColor:'white', borderRadius: '15px', padding: '10px', outline:'none'}} unstackable/>
                                    </Form>
                                  </Grid.Column>
                                  <Grid.Column>
                                      <Button onClick={() => this.sendReply(message._id, index)}>
                                        <i class="fas fa-reply"></i>
                                        Reply
                                      </Button>
                                  </Grid.Column>
                                </Comment.Action>
                                  : null}
                              </Comment.Content>

                            {this.state.messages[index].replies.map((replies) =>
                              <Comment.Group>
                                <Comment>
                                  <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />
                                  <Comment.Content>
                                    <Comment.Author as='a'>{replies.author}</Comment.Author>
                                    <Comment.Metadata>
                                      <span>{message.date ? message.date.substring(0,21) : ''}</span>
                                    </Comment.Metadata>
                                    <Comment.Text>{replies.reply}</Comment.Text>
                                  </Comment.Content>
                                </Comment>
                              </Comment.Group>
                                )}
                          </Comment>
                      </Container>
                    )
                  }
                )
              }
              </Comment.Group>
            </div>

            );
          }
        }

        export default Comments

                                  // {this.state.pressed[index] ?
                                  //   <Comment.Action>
                                  //     <Grid.Column textAlign="left" verticalAlign="center" className="reply">
                                  //       <Form onChange={ (e) => this.setState({reply: e.target.value})} value={this.state.reply}>
                                  //         <TextArea type="submit" onSubmit={() => this.sendMessage() } autoHeight placeholder='Type somehting' rows={1} style={{backgroundColor:'white', borderRadius: '15px', padding: '10px', outline:'none'}} unstackable/>
                                  //       </Form>
                                  //     </Grid.Column>
                                  //       <Grid.Column>
                                  //         <Button onClick={() => this.sendReply(message._id, index)} as={Icon} name="comment">
                                  //           Send
                                  //         </Button>
                                  //       </Grid.Column>
                                  //   </Comment.Action>
                                  //
                                  //     : null}




          // {this.state.pressed[index] ?
          //       <div>
          //       <input type="text" placeholder="Message" className="form-control" onChange={ (e) => this.setState({reply: e.target.value})} value={this.state.reply}/>
          //       <button onClick={() => this.sendReply(message._id, index)} >Send Reply</button>
          //     </div>
          //     : <div></div>
          //   }


            {/*
              <ul>
              {this.state.messages[index].replies.map((replies) =>
              <li>{replies.author}: {replies.reply}</li>
            )}
          </ul> */}
