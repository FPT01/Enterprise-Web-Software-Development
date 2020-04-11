import React, { Component } from "react";

import { Client } from '@stomp/stompjs';
 
var client = new Client();

class ChatMessageBox extends Component {
  constructor(props) {
    super(props);
    this.state =
      {
        username: "",
        textMessage: "",
      };
      this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    // The compat mode syntax is totally different, converting to v5 syntax
    // Client is imported from '@stomp/stompjs'
    client.configure({
      brokerURL: 'ws://localhost:8080/stomp',
      onConnect: () => {
        console.log('onConnect');
        client.subscribe('/queue/now', message => {
          this.setState({textMessage: message.body});
        });

        client.subscribe('/topic/greetings', message => {
          this.setState({textMessage: message.body});
          var response = JSON.parse(message.body);
          this.showMessageOutput(response);
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
    var response = document.getElementById('response');
    var p = document.createElement('p');
    p.style.wordWrap = 'break-word';
    p.appendChild(document.createTextNode(messageOutput.username + ": " + messageOutput.text));
    response.appendChild(p);
  }

  handleSubmit = () => {
      var account = window.localStorage.getItem('account');
      var username = JSON.parse(account).username;
      this.setState({
        username: username
      })
      var text = document.getElementById('text').value;
      var json = {'username':username, 'text':text};
      client.publish({destination: '/app/greetings', body: JSON.stringify(json)});
  }

  render() {
    return (
      <div className="App">
        <div>
          <input type="text" id="from" placeholder="Choose a nickname"/>
        </div>
        <br />
        <div>
            <button id="connect">Connect</button>
            <button id="disconnect" disabled="disabled" onclick="disconnect();">Disconnect</button>
        </div>
        <br />
        <div id="conversationDiv">
            <input type="text" id="text" placeholder="Write a message..."/>
            <button id="sendMessage" onClick={this.handleSubmit}>Send</button>
            <p id="response"></p>
        </div>
      </div>
    );
  }
}

export default ChatMessageBox;