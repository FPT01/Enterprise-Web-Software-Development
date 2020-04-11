import React, { Component } from "react";

import { Client } from '@stomp/stompjs';
 
var client = new Client();

class ChatMessageBox extends Component {
  constructor(props) {
    super(props);
    this.state =
      {
        username: 'tutor1',
      };
      this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    console.log('Component did mount');
    // The compat mode syntax is totally different, converting to v5 syntax
    // Client is imported from '@stomp/stompjs'
    

    client.configure({
      brokerURL: 'ws://localhost:8080/stomp',
      onConnect: () => {
        console.log('onConnect');

        client.subscribe('/queue/now', message => {
          console.log(message);
          this.setState({serverTime: message.body});
        });

        client.subscribe('/topic/greetings', message => {
          alert(message.body);
        });
      },
      // Helps during debugging, remove in production
      debug: (str) => {
        console.log(new Date(), str);
      }
    });

    client.activate();
  }

  handleSubmit = () => {
      console.log("hello", 1111);
      var from = document.getElementById('from').value;
      var text = document.getElementById('text').value;
      debugger;
      console.log("from", from);
      console.log("from", from);
      // this.client.send("/app/greetings", {}, JSON.stringify({'from':from, 'text':text}));
      console.log("this.client", client);
      client.publish({destination: '/app/greetings', body: JSON.stringify({'from':"hello", 'text':text})});
      // this.client.publish("/app/greetings", {}, "test");

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