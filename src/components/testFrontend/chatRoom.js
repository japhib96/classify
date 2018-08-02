import React from "react";
import io from "socket.io-client";

class Chat extends React.Component{
  constructor(props){
        super(props);

        this.state = {
            username: '',
            message: '',
            messages: []
        };
        var self = this;

        this.socket = io('localhost:3001');

        this.socket.on('RECEIVE_MESSAGE', function(data){
            addMessage(data);
        });

        this.socket.on("UPDATE_MESSAGE", function(data){
          self.setState({messages: data})
        })

        const addMessage = data => {
            console.log('add message', data)
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

    render(){

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
                                    <div key={index} >{message.author}: {message.message}</div>
                                )
                            })}
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
