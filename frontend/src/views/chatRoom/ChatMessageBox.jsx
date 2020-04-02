import React, { Component } from "react";
import StompClient from "react-stomp-client";
 
var stompClient = null;
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
        bellRing: false
      };
  }

  connect = (userName) => {

    var socket = new WebSocket("ws://localhost:8080/api/ws");

    socket.onopen = function(e) {
      alert("[open] Connection established");
      alert("Sending to server");
      socket.send("My name is John");
    };

    // const Stomp = require('stompjs');

    // var SockJS = require('sockjs-client');

    // SockJS = new SockJS('/ws');

    // stompClient = Stomp.over(SockJS);

    // stompClient.connect({}, this.onConnected, this.onError);

    // this.setState({
    //   username: userName,
    // })
  }

  onConnected = () => {
    this.setState({
      channelConnected: true
    })
    // Subscribing to the public topic
    stompClient.subscribe('ws://localhost:8080/api/', this.onMessageReceived);
    // Registering user to server as a public chat user
    stompClient.send("http://localhost:3000/admin/chat-message-box", {}, JSON.stringify({ sender: this.state.username, type: 'JOIN' }))
  }

  onMessageReceived = (payload) => {

    var message = JSON.parse(payload.body);

    console.log("onMessageReceived", message);

    if (message.type === 'JOIN') {

      this.state.roomNotification.push({ 'sender': message.sender + " ~ joined", 'status': 'online', 'dateTime': message.dateTime })
      this.setState({
        roomNotification: this.state.roomNotification,
        bellRing: true
      })

    }
    else if (message.type === 'LEAVE') {
      this.state.roomNotification.map((notification, i) => {
        if (notification.sender === message.sender + " ~ joined") {
          notification.status = "offline";
          notification.sender = message.sender + " ~ left";
          notification.dateTime = message.dateTime;
        }
      })
      this.setState({
        roomNotification: this.state.roomNotification,
        bellRing: true
      })
    }
    else if (message.type === 'TYPING') {

      this.state.roomNotification.map((notification, i) => {
        if (notification.sender === message.sender + " ~ joined") {
          if (message.content)
            notification.status = "typing...";
          else
            notification.status = "online";
        }

      })
      this.setState({
        roomNotification: this.state.roomNotification
      })
    }
    else if (message.type === 'CHAT') {

      this.state.roomNotification.map((notification, i) => {
        if (notification.sender === message.sender + " ~ joined") {
          notification.status = "online";
        }
      })
      this.state.broadcastMessage.push({
        message: message.content,
        sender: message.sender,
        dateTime: message.dateTime
      })
      this.setState({
        broadcastMessage: this.state.broadcastMessage,

      })
    }
    else {
      // do nothing...
    }
  }


  componentDidMount() {
    this.connect();
  }

  render() {
    return (
      <div id="chat-container">
         <div className="chat-header">
            <div className="user-container">
               <span id="username"></span>
            </div>
            <h3>Spring WebSocket Chat Demo</h3>
         </div>
          
         <hr/>
          
         <div id="connecting">Connecting...</div>
         <ul id="messageArea">
         </ul>
         <form id="messageForm" name="messageForm">
            <div className="input-message">
               <input type="text" id="message"
                  placeholder="Type a message..."/>
               <button type="submit">Send</button>
            </div>
         </form>
      </div>
    )
  }
}

export default ChatMessageBox;