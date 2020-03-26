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

    if (userName) {

      const Stomp = require('stompjs')

      var SockJS = require('sockjs-client')

      SockJS = new SockJS('/ws')

      stompClient = Stomp.over(SockJS);

      stompClient.connect({}, this.onConnected, this.onError);

      this.setState({
        username: userName,
      })
    }
  }

  onConnected = () => {

    this.setState({
      channelConnected: true
    })

    // Subscribing to the public topic
    stompClient.subscribe('http://localhost:8080/', this.onMessageReceived);

    // Registering user to server as a public chat user
    stompClient.send("http://localhost:3000/admin/chat-message-box", {}, JSON.stringify({ sender: this.state.username, type: 'JOIN' }))

  }

  sendMessage = (type, value) => {

    if (stompClient) {
      var chatMessage = {
        sender: this.state.username,
        content: type === 'TYPING' ? value : value,
        type: type

      };
      // send public message
      stompClient.send("http://localhost:3000/admin/chat-message-box", {}, JSON.stringify(chatMessage));
    }
  }

  onMessageReceived = (payload) => {

    var message = JSON.parse(payload.body);

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

  onError = (error) => {
    this.setState({
      error: 'Could not connect you to the Chat Room Server. Please refresh this page and try again!'
    })
  }

  fetchHostory = () => {
    alert('History Not Available!\nIt is Not Yet Implemented!');
  }

  scrollToBottom = () => {
    var object = this.refs.messageBox;
    if (object)
      object.scrollTop = object.scrollHeight;
  }

  // getRandomColor = () => {
  //   var letters = '0123456789ABCDEF';
  //   var color = '#';
  //   for (var i = 0; i < 6; i++) {
  //     color += letters[Math.floor(Math.random() * 16)];
  //   }
  //   return color;
  // }

  componentDidUpdate() {
    if (this.state.error) {
      throw new Error('Unable to connect to chat room server.');
    }
    else {
      this.scrollToBottom();
    }
  }

  componentDidMount() {
    this.setState({
      curTime: new Date().toLocaleString()
    })

    this.timerID = setInterval(
      () => this.state.bellRing ? this.setState({
        bellRing: false
      }) : "",
      10000
    );

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
               <input type="text" id="message" autocomplete="off"
                  placeholder="Type a message..."/>
               <button type="submit">Send</button>
            </div>
         </form>
      </div>
    )
  }

}

export default ChatMessageBox;