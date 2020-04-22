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
import queryString from 'query-string';



class EditRoom extends React.Component {
  constructor() {
    super();

    this.state = {
      roomName: '',
      isSuccessful: false,
    };

    this.updateState = field => ev => {
      const state = this.state;
      const newState = Object.assign({}, state, { [field]: ev.target.value });
      this.setState(newState);
    };

    this.submitEditForm = (roomName) => ev => {
      ev.preventDefault();
      // const recaptcha = recaptchaRef.current.getValue();
      this.onSubmitEdit(roomName);
      // recaptchaRef.current.reset();
    };
  }

  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }

  onSubmitEdit = (roomName) => {
    const roomObj=queryString.parse(this.props.location.search);
    return fetch(`http://localhost:8080/api/room/save`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id: roomObj.id, name: roomName})
    })
    .then((response) => response.json())
    .then((data) => {
      if(data.status === "OK"){
        alert(data.message);
        setTimeout(function(){ 
          window.location.href = "/admin/room";
        }, 700);
      }else {
        console.log("error"); 
      }
    })
  }

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Card
                title="Edit Room"
                className="change-password"
                content={
                  <form onSubmit={this.submitEditForm(this.state.roomName)}>
                    <fieldset>
                      <fieldset className="form-group">
                        <label>Room Name<span>*</span></label>
                        <input
                          className="form-control form-control-lg"
                          type="text"
                          placeholder="Room Name"
                          value={this.state.roomName} onChange={this.updateState('roomName')} required />
                      </fieldset>
                      <button
                        className="ui blue button"
                        type="submit" >
                        Save
                      </button>

                    </fieldset>
                  </form>
                }
              />
          </Row>
        </Grid>
      </div>
    );
  }
}

export default EditRoom
