import React from "react";
import io from "socket.io-client";
import Emoji from 'react-emoji-render';
import { Button, Comment, Form, Header } from 'semantic-ui-react';
import axios from 'axios'

class Chat extends React.Component{
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
    })

    this.socket.on("UPDATE_MESSAGE", function(data){
      var pressArr=[]
      data.forEach(()=>{
        pressArr.push(false)
      })
      self.setState({
        messages: data,
        pressed: pressArr
    })
  })

  this.socket.on('UPDATE_REPLIES', function(data){
    self.setState({messages: data, reply: ''})


  })

    const addMessage = data => {
      this.setState({messages: data, pressed: [...this.state.pressed, false]});

    };

    this.sendMessage = ev => {
      ev.preventDefault();

      // this.socket.emit('SEND_MESSAGE', {
      //   author: this.props.user._id,
      //   message: this.state.message
      // });
      // this.setState({message: ''});
      console.log('hi')
      axios.get('/logout')
    }

    this.socket.on("ALL_REACTIONS", function(reactions){
      self.setState({allReactions: reactions})
    })


  }


  componentDidMount(){
    this.socket.emit('JOIN_ROOM', {
      message: '',
      class: '5b689caf57657f1271f1ae4d'
    })
    this.socket.emit('REACTION',{
      reaction: '',
      class: '5b689caf57657f1271f1ae4d'
    })

  }

  thumbsUp(){
    this.socket.emit('REACTION',{
      reaction: 1,
      user: this.props.user._id
    })
    this.setState({reaction: 'This makes total sense'})
  }

  okay(){
    this.socket.emit('REACTION',{
      reaction: 0,
      user: this.props.user._id
    })
    this.setState({reaction: 'I kind of understand'})
  }

  thumbsDown(){
    this.socket.emit('REACTION',{
      reaction: -1,
      user: this.props.user._id
    })
    this.setState({reaction: "This doesn't make sense"})
  }

  likeMessage = (index) =>{

    // var allMessages = this.state.messages;
    // allMessages[index].likes += 1;
    // this.setState({messsages: allMessages})
    this.socket.emit('LIKE_MESSAGE',{
      messages: this.state.messages,
      index: index,
      user: this.props.user._id

    })

  }

  addReply(index){
    var arr= this.state.pressed
    arr[index]= true;
    console.log(this.state.pressed)
    this.setState({pressed : arr})


  }

  sendReply(index){
    this.socket.emit('ADD_REPLY',{
      user: this.props.user.username,
      reply: this.state.reply,
      index: index
    })
    var arr1= this.state.pressed
    arr1[index]= false;
    console.log(this.state.pressed)
    this.setState({pressed : arr1})

    }




  render(){
    var color;
    if(this.state.reaction ===  "This doesn't make sense"){
      color={color: 'red'}
    }
    else if(this.state.reaction === 'This makes total sense'){
      color={color: 'green'}
    }
    else{
      color={color: 'black'}
    }

    var thumbsUp=0;
    var okay=0;
    var thumbsDown=0;
    this.state.allReactions.map( (reactionObj, index) =>{

      if(reactionObj.reaction === -1){
        thumbsDown += 1
      }
      else if(reactionObj.reaction === 0){
        okay += 1
      }
      else{
        thumbsUp += 1
      }
    })

    return (
      <div className="container">
        <div className="row">
          <div className="col-4">
            <div className="card">
              <div className="card-body">
                <div className="card-title">Global Chat</div>
                <hr/>

                <div className="card-footer">
                  <input type="text" placeholder="Username" className="form-control" onChange={ (e) => this.setState({username: e.target.value})} value={this.state.username}/>
                  <br/>
                  <input type="text" placeholder="Message" className="form-control" onChange={ (e) => this.setState({message: e.target.value})} value={this.state.message}/>
                  <br/>
                  <button onClick={this.sendMessage} className="btn btn-primary form-control">Send</button>
                </div>
                <div className="messages">
                  {
                    this.state.messages.map( (message, index) => {

                      return (
                        <div style={{border:"1px solid gray"}}  key={index} >
                          <p>{message.author}: {message.message}</p>
                          <ul>
                            {this.state.messages[index].replies.map((replies) =>
                              <li>{replies.author}: {replies.reply}</li>
                            )}
                          </ul>
                          <button onClick={() => this.likeMessage(index) } >LIKE</button>
                          <button onClick={() => this.addReply(index)}>Add Reply</button>
                          {this.state.pressed[index] ?
                            <div>
                          <input type="text" placeholder="Message" className="form-control" onChange={ (e) => this.setState({reply: e.target.value})} value={this.state.reply}/>
                          <button onClick={() => this.sendReply(index)} >Send Reply</button>
                          </div>
                          : <div></div>
                        }


                          <p>{message.likes.length}</p>

                        </div>
                      )
                    })}
                  </div>
                  <div style={{textAlign: "center", border: "5px solid black", margin:"40px"}}>
                    <Emoji onClick={() => this.thumbsDown()} style={{marginRight:"30px"}} text=":-1:" onlyEmojiClassName="make-emojis-large" />
                    <Emoji onClick={() => this.okay()} style={{marginLeft:"20px", marginRight:"20px"}} text=":ok_hand:" onlyEmojiClassName="make-emojis-large" />
                    <Emoji onClick={() => this.thumbsUp()} style={{marginLeft:"30px"}} text=":+1:" onlyEmojiClassName="make-emojis-large" />
                  </div>
                  <div style={{textAlign: "center"}}>
                    <h1 style={color}>{this.state.reaction}</h1>
                  </div>
                  <div style={{textAlign: "center"}}>
                    <h1 style={{color: "red", marginRight:"30px", display: "inline"}}>{thumbsDown}</h1>
                    <h1 style={{marginLeft:"20px", marginRight:"20px", display: "inline"}}>{okay}</h1>
                    <h1 style={{color: "green", marginLeft:"30px", display: "inline"}}>{thumbsUp}</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  export default Chat
