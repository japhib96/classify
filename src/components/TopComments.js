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


  class TopComments extends React.Component {

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
          class: this.props.lecture
        });
        this.setState({message: ''});
      }
    }

    componentDidMount() {
      this.socket.emit('JOIN_ROOM', {
        message: '',
        class: this.props.lecture
      })
    }

    likeMessage = (id) =>{
      this.socket.emit('LIKE_MESSAGE',{
        messages: this.state.messages,
        index: id,
        user: this.props.user._id,
        class: this.props.lecture
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
        class: this.props.lecture
      })
      this.addReply(index);
    }

    topQuestions(a, b) {
      if (a.likes.length < b.likes.length)
      return 1;
      if (a.likes.length > b.likes.length)
      return -1;
      return 0;
    }

    render() {
      let messagesCopy = this.state.messages.slice();
      messagesCopy.sort(this.topQuestions);
      const topThree = messagesCopy.slice(0,3);
      return (

        <div className="list content wrapper">


          {
            topThree.map( (message, index) => {
              return (
                    <div className="list content">
                      <Container className="container">
                        <Comment.Group>
                          <Comment key={index}>
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
                                <Label  as={Button} circular attached bottom right> <Emoji emoji="thumbsup" set='facebook' skin="4" size={12}/>23</Label>
                              </Comment.Actions>
                            </Comment.Content>
                          </Comment>
                        </Comment.Group>
                      </Container>
                    </div>
                    )
                  }
                )
              }
            </div>
          )
        }
      }

      export default TopComments
