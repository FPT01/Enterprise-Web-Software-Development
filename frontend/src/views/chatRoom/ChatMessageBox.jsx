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
      };
      this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    // The compat mode syntax is totally different, converting to v5 syntax
    // Client is imported from '@stomp/stompjs';
    var account = window.localStorage.getItem('account');
    var username = JSON.parse(account).username;
    this.setState({
      username: username
    })
    client.configure({
      brokerURL: 'ws://localhost:8080/stomp',
      onConnect: () => {
        console.log('onConnect');
        client.subscribe('/queue/now', message => {
          this.setState({textMessage: message.body});
        });

        client.subscribe('/topic/greetings', message => {
          var response = JSON.parse(message.body);
          var oldMessage = this.state.textMessage;
          console.log("oldMessage", oldMessage);
          var newListMessage = [];
          if(oldMessage !== null){
            newListMessage.push(oldMessage);
          }
          newListMessage.push(response);
          this.setState({
            textMessage: response,
            listMessage: newListMessage
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
              <div className="msg left-msg">
                <div className="msg-img"></div>
                <div className="msg-bubble">
                  <div className="msg-info">
                    <div className="msg-info-name">{item.from}</div>
                    <div className="msg-info-time">{item.time}</div>
                  </div>
                  <div className="msg-text">
                    {item.text}
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
      client.publish({destination: '/app/greetings', body: JSON.stringify(json)});
      document.getElementById('text').value = '';
  }

  render() {
    console.log("this.state.listMessage", this.state.listMessage);
    return (
      <div className="chatbox">
        <div id="chat">
          <div className="msger-chat">
            <div className="message" id="chat">
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