import React from "react";
import io from "socket.io-client";
import Emoji from 'react-emoji-render';

class Chat extends React.Component{
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
              author: this.state.username,
              message: this.state.message
          });
          this.setState({message: ''});
        }

        this.socket.on("ALL_REACTIONS", function(reactions){
          self.setState({allReactions: reactions})
        })


    }


    componentDidMount(){
      this.socket.emit('JOIN_ROOM', {
        message: '',
      })
      this.socket.emit('REACTION',{
        reaction: ''
      })

    }

    thumbsUp(){
      this.socket.emit('REACTION',{
        reaction: 1
      })
      this.setState({reaction: 'This makes total sense'})
    }

    okay(){
      this.socket.emit('REACTION',{
        reaction: 0
      })
      this.setState({reaction: 'I kind of understand'})
    }

    thumbsDown(){
      this.socket.emit('REACTION',{
        reaction: -1
      })
      this.setState({reaction: "This doesn't make sense"})
    }

    likeMessage = (index) =>{

      // var allMessages = this.state.messages;
      // allMessages[index].likes += 1;
      // this.setState({messsages: allMessages})
      this.socket.emit('LIKE_MESSAGE',{
        messages: this.state.messages,
        index: index
      })

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
                                console.log(message.likes)
                                return (
                                    <div style={{border:"1px solid gray"}}  key={index} >
                                      <p>{message.author}: {message.message}</p>
                                      <button onClick={() => this.likeMessage(index) } >LIKE</button>
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
