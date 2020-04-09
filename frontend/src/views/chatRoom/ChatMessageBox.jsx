import React, { Component } from "react";
import Websocket from 'react-websocket';
 
var stompClient = null;
var ws = new WebSocket('ws://localhost:8080/ws');

class ChatMessageBox extends Component {
  constructor(props) {
    super(props);
    this.state =
      {
        username: 'tutor1',
        channelConnected: false,
        chatMessage: '',
        roomNotification: [],
        broadcastMessage: [],
        error: '',
        bottom: false,
        curTime: '',
        openNotifications: false,
        bellRing: false,
        count: 90,
        isWS: false,
        message: '',
      };
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
  }

  showGreeting(message) {
    console.log("message", message);
    const newMessage = this.state;
    this.setState({
      newMessage : message
    });
    console.log(this.state.message);
  } 

  handleInputChange(event){
    
  }

  handleData(data) {
    let result = JSON.parse(data);
    this.setState({count: this.state.count + result.movement});
  }

  connect(){
    ws.onopen = function(data){
      console.log("connect roi nha");
      console.log(data);
      if(data.length){
        this.state.isWS = true
      }
    }
    ws.onmessage = function(data){
      console.log("data", data);
      this.showGreeting("Hello lala");
    }
    this.setState({
      isWS: this.state.isWS
    })
  }

  handleChange(e) {
    this.setState({
      message: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.message);
    var data = JSON.stringify({'userId': 1, 'msg': this.state.message})
    ws.send(data);
    this.setState({
      message: this.state.message
    });

  }

  componentDidMount(){
    this.connect();
  }

  render() {
    return (
      <div id="chat-container">
         <div className="chat-header">
            <div className="user-container">
               <span id="username"></span>
            </div>
            <h3>CHAT</h3>
         </div>
         <hr/>
         {this.state.isWS ? <div id="connecting">Connecting...</div> : ""}
         
         <ul id="messageArea">
          {(this.state.newMessage !== undefined) ? this.state.newMessage : ""}
         </ul>

         <form onSubmit={this.handleSubmit} className="send-message-form">
            <input
              onChange={this.handleChange}
              value={this.state.message}
              placeholder="Type your message and hit ENTER"
              type="text" />
            <button type="submit" >Send</button>
          </form>
      </div>
    )
  }
}

export default ChatMessageBox;