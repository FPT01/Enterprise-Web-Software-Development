import React, { Component } from "react";

import { Client } from '@stomp/stompjs';
 
var client = new Client();

class ChatMessageBox extends Component {
  constructor(props) {
    super(props);
    this.state =
      {
        username: "",
        textMessage: null,
        listMessage: [],
        receiver: props.receiverName,
        listHistoryMessage: props.historyMessages,
      };
      this.handleSubmit = this.handleSubmit.bind(this)
  }


  componentDidMount() {
    // The compat mode syntax is totally different, converting to v5 syntax
    // Client is imported from '@stomp/stompjs';
    // fetch(`http://localhost:8080/api/message/`, {
    //   method: "GET",
    // })
    // .then(response =>  response.json() )
    // .then(data => {
    //   this.setState({ listHistoryMessage: data });
    // });

    var account = window.localStorage.getItem('account');
    var username = JSON.parse(account).username;
    this.setState({
      username: username
    })
    client.configure({
      brokerURL: 'ws://localhost:8080/stomp',
      onConnect: () => {
        client.subscribe('/queue/now', message => {
          this.setState({textMessage: message.body});
        });
        console.log("client", client);
        // test
        //stompClient.send('/app/addPrivateUser', {}, JSON.stringify({ sender: this.props.otherUser, type: 'JOIN' }))
        client.publish({destination: '/app/addPrivateUser', body: JSON.stringify({ sender: this.state.username, type: 'JOIN' }) });

        // '/user/' + this.props.otherUser.toString().toLowerCase() + '/reply'
        client.subscribe('/user/' + this.state.username + '/reply', message => {
          var response = JSON.parse(message.body);
          this.state.listMessage.push(response);
          this.setState({
            textMessage: response,
            listMessage: this.state.listMessage
          });
        });
      },
      // Helps during debugging, remove in production
      debug: (str) => {
        console.log(new Date(), str);
      }
    });

    client.activate();
  }

  showMessageOutput(messageOutput) {
    return(
      <>
        {
          messageOutput.map(item => {
            return (
              <div className={(item.sender !== this.state.username) ? "msg left-msg" : "msg right-msg"}>
                <div className="msg-img"></div>
                <div className="msg-bubble">
                  <div className="msg-info">
                    <div className="msg-info-name">{item.sender}</div>
                    <div className="msg-info-time">{item.dateTime}</div>
                  </div>
                  <div className="msg-text">
                    {item.content}
                  </div>
                </div>
              </div>
            )
          })
        }
      </>
    )
  }

  handleSubmit = () => {
    var username = this.state.username;
    var text = document.getElementById('text').value;
    var json = {'username':username, 'text':text};
    console.log(this.state.username, this.state.receiver);
    // test
    var chatMessage = {
      sender: this.state.username,
      receiver: this.state.receiver,
      content: text,
      type: 'CHAT'
    };
    this.state.listMessage.push(chatMessage);
    this.setState({
      textMessage: chatMessage,
      listMessage: this.state.listMessage
    });
    client.publish({destination: '/app/sendPrivateMessage', body: JSON.stringify(chatMessage)});
    document.getElementById('text').value = '';
  }

  render() {
    return (
      <div className="chatbox">
        <div id="chat">
          <div className="msger-chat">
            <div className="message" id="chat">
              {this.showMessageOutput(this.state.listHistoryMessage)};
              {
                (this.state.textMessage !== "") ? this.showMessageOutput(this.state.listMessage) : ""
              }
            </div>
          </div>
          <div id="conversationDiv" className="msger-inputarea">
            <input type="text" className="msger-input" id="text" placeholder="Write a message..."/>
            <button id="sendMessage" className="msger-send-btn" onClick={this.handleSubmit}>Send</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ChatMessageBox;