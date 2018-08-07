import React from 'react'
import { Button, TextArea, Comment, Form, Header, Icon, Segment, Grid, Container, Label} from 'semantic-ui-react'
import io from 'socket.io-client';
import { Emoji } from 'emoji-mart';
import Divider from './divider';

const panels = [
  {
    key: 'details',
    title: 'Reply',
    content: {
      as: Form.Input,
      placeholder: 'Type your response...',
    },
  },
]


class Comments extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      username: '',
      message: '',
      messages: [],
      reaction: '',
      allReactions: [],
      reply: false
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
      self.setState({messages: data})
    })

    const addMessage = data => {
      this.setState({messages: data});

    };

    this.sendMessage = ev => {
      ev.preventDefault();
      this.socket.emit('SEND_MESSAGE', {
        author: this.state.username,
        message: this.state.message
      });
      this.setState({message: ''});
    }
  }


  componentDidMount(){
    this.socket.emit('JOIN_ROOM', {
      message: '',
    })
  }

  likeMessage = (index) =>{
    this.socket.emit('LIKE_MESSAGE',{
      messages: this.state.messages,
      index: index
    })
  }

  toggleFormState = () => {

    return (this.state.reply === false ?
      this.setState({
      reply: true
    })

    :

      this.setState({
      reply: false
    })
  )

  }

  showForm = () => {
    return (this.state.reply ?

      <Grid.Column textAlign="left" verticalAlign="center" className="reply">
        <Form>
          <TextArea type="submit" onSubmit={() => this.sendMessage() } autoHeight placeholder='Type somehting' rows={1} style={{backgroundColor:'white', borderRadius: '15px', padding: '10px', outline:'none'}} unstackable/>
        </Form>
      </Grid.Column>

      :

      null)
   }

  render()   {

    return (
        <div id="commentcont">
          <Comment.Group threaded >
            <Header as='h1' dividing textAlign="center">
              Comments / Questions
              <Header.Subheader content='Ask Questions and respond to threads. Btw. Its all anonymous, so don´t shy away PUSSSAY!'/>
            </Header>
            {
              this.state.messages.map( (message, index) => {
                return (
                <Container className="container">
                  <Comment key={index} >
                    <Comment.Avatar as='a' src='/images/avatar/small/matt.jpg' />
                    <Comment.Content>
                      <Comment.Author  as='a'>{message.author}</Comment.Author>
                      <Comment.Metadata>
                        <span>Today at 5:42PM</span>
                      </Comment.Metadata>
                      <Comment.Text>
                        <div id="styling">
                          {message.message}
                        </div>
                      </Comment.Text>
                      <Label  as={Button} circular attached bottom right> <Emoji emoji="thumbsup" set='facebook' skin="4" size={12}/>{message.likes.length}</Label>
                      <Label as={Button} onClick={() => this.likeMessage(index) } circular attached bottom right>
                          <Emoji emoji="thumbsup" set='facebook' skin="4" size={12} />
                            I like it
                      </Label>
                      <Label as={Button} onClick={() => this.toggleFormState() } circular attached bottom right >
                        <i class="fas fa-comment"></i>
                        Reply
                      </Label>
                      <Comment.Actions>
                        {this.showForm()}
                        <Divider />
                      </Comment.Actions>
                    </Comment.Content>
                  </Comment>
                </Container>
                )
              })}
            </Comment.Group>
          </div>

      );
    }

  }

  export default Comments
