import React, { Component } from "react";

import { Client } from '@stomp/stompjs';
 
class ChatMessageBox extends Component {
  
  state = {
    serverTime: null,
  }

  componentDidMount() {
    console.log('Component did mount');
    // The compat mode syntax is totally different, converting to v5 syntax
    // Client is imported from '@stomp/stompjs'
    this.client = new Client();

    this.client.configure({
      brokerURL: 'wss://http://localhost:8080/chat/info',
      onConnect: () => {
        console.log('onConnect');

        this.client.subscribe('/queue/now', message => {
          console.log(message);
          this.setState({serverTime: message.body});
        });

        this.client.subscribe('/topic/greetings', message => {
          alert(message.body);
        });
      },
      // Helps during debugging, remove in production
      debug: (str) => {
        console.log(new Date(), str);
      }
    });

    this.client.activate();
  }

  clickHandler = () => {
    this.client.publish({destination: '/app/greetings', body: 'Hello world'});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <p>
            Server time: {this.state.serverTime ? this.state.serverTime : 'no data'}
          </p>
          <p>
            <button onClick={this.clickHandler}>Click me</button>
          </p>
        </header>
      </div>
    );
  }
}

export default ChatMessageBox;