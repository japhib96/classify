import React from 'react'
import { Button, Comment, Form, Header, Icon} from 'semantic-ui-react'
import io from 'socket.io-client';



class Comments extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      username: '',
      message: '',
      messages: [],
      reaction: '',
      allReactions: []
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
        author: this.props.user.username,
        message: this.state.message
      });
      this.setState({message: ''});
    }
  }


  componentDidMount() {
    this.socket.emit('JOIN_ROOM', {
      message: '',
    })
  }

  likeMessage = (index) =>{
    this.socket.emit('LIKE_MESSAGE',{
      messages: this.state.messages,
      index: index,
      user: this.props.user._id
    })
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
                <Comment key={index}>
                  <Comment.Avatar as='a' src='/images/avatar/small/matt.jpg' />
                  <Comment.Content>
                    <Comment.Author  as='a'>{message.author}</Comment.Author>
                    <Comment.Metadata>
                      <span>{message.date ? message.date.substring(0,21) : ''}</span>
                    </Comment.Metadata>
                    <Comment.Text>{message.message}</Comment.Text>
                    <Comment.Actions>
                      <Button onClick={() => this.likeMessage(index) }>
                        <Icon  name="smile" content="Likes" />
                      </Button>
                      {message.likes.length}
                    </Comment.Actions>
                  </Comment.Content>
                </Comment>
              )
            })}
            <Form reply>
              <Form.TextArea onChange={ (e) => this.setState({message: e.target.value})} value={this.state.message}/>
              <Button content='Add Reply' labelPosition='center' icon='edit' primary onClick={this.sendMessage} />
            </Form>
          </Comment.Group>
        </div>
      );
    }

  }

  export default Comments
