import React from "react";
import {
  Grid,
  Row,
  Col,
  ControlLabel,
  FormControl
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { UserCard } from "components/UserCard/UserCard.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import ChatMessageBox from "./ChatMessageBox.jsx";


class ChatRoom extends React.Component {
  constructor() {
    super();

    this.state = {
      roomName: '',
      isSuccessful: false,
      roleName: '',
      userChatList: [],
      selectValue: "",
      receiverName: '',
      sender: ''
    };

    this.updateState = field => ev => {
      const state = this.state;
      const newState = Object.assign({}, state, { [field]: ev.target.value });
      this.setState(newState);
    };

    this.submitForm = (username) => ev => {
      ev.preventDefault();
      // const recaptcha = recaptchaRef.current.getValue();
      this.onSubmit(username);
      // recaptchaRef.current.reset();
    };
  }

  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }

  onSubmit = (username) => {
    this.setState({
      receiverName: username,
    })
  }

  componentDidMount(){
    var account = window.localStorage.getItem('account');
    var username = JSON.parse(account).username;
    fetch(`http://localhost:8080/api/user/`, {
      method: "GET",
    })
    .then(response =>  response.json() )
    .then(data => {
      var dataWithoutSender = data.filter(item => item.username !== username);
      this.setState({ 
        userChatList: dataWithoutSender,
        sender: username
      });
    });
  }

  render() {
    const selectOptions = () => {
      return this.state.userChatList.map(item => {
        return <option value={item.username}>{item.username}</option>
      })
    }
    if(this.state.receiverName === ""){
      return (
        <div className="content">
          <Grid fluid>
            <Row>
              <Card
                  title="Add New Room"
                  className="change-password"
                  content={
                    <form onSubmit={this.submitForm(this.state.selectValue)}>
                      <fieldset>
                        <fieldset className="form-group">
                          <label>Roles Name<span>*</span></label>
                          <select className="form-control" value={this.state.selectValue} onChange={this.updateState('selectValue')} required >
                            <option value="">Please choose role</option>
                            {selectOptions()}
                          </select>
                        </fieldset>
                        <button
                          className="ui blue button"
                          type="submit" >
                          Add
                        </button>
                      </fieldset>
                    </form>
                  }
                />
            </Row>
          </Grid>
        </div>
      )
    }else {
      return (
        <ChatMessageBox receiverName={this.state.receiverName} />
      )
    }
  }
}

export default ChatRoom
