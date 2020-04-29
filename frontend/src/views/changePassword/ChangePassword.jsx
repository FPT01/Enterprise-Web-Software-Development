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


class ChangePassword extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      newPassword: '',
      oldPassword: '',
      error: false,
    };

    this.updateState = field => ev => {
      const state = this.state;
      const newState = Object.assign({}, state, { [field]: ev.target.value });
      this.setState(newState);
    };

    this.submitForm = (username, oldPassword, newPassword) => ev => {
      ev.preventDefault();
      // const recaptcha = recaptchaRef.current.getValue();
      this.onSubmit(username, oldPassword, newPassword);
      // recaptchaRef.current.reset();
    };
  }

  onSubmit = (username, oldPassword, newPassword) => {
    return this.fetch(`http://localhost:8080/api/user/changepassword`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, oldPassword: oldPassword, newPassword: newPassword})
    })
    .then((response) => response.json())
    .then((data) => {
      if(data.status === "OK"){
        alert(data.message);
      }else {
        console.log("error");
      }
    })
    .catch(function(err) {
      console.log('Request failed', err);
    });
  }

  fetch = (url, options) => {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };

    return fetch(url, {
      headers,
      ...options
    })
    .then(this.checkStatus)
  };

  checkStatus = response => {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) {
      // Success status lies between 200 to 300
      return response;
    } else {
      var error = new Error(response.statusText);
    }
  };

  render() {
    console.log("this.state.error", this.state.error);
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Card
                title="Change Password"
                className="change-password"
                content={
                  <form onSubmit={this.submitForm(this.state.username, this.state.oldPassword, this.state.newPassword)}>
                    <fieldset>
                      <fieldset className="form-group">
                        <label htmlFor="username">Username<span>*</span></label>
                        <input
                          className="form-control form-control-lg"
                          type="text"
                          placeholder="Username" required
                          value={this.state.username} onChange={this.updateState('username')} />
                      </fieldset>
                      <fieldset className="form-group">
                        <label htmlFor="oldPassword">Old Password<span>*</span></label>
                        <input
                          className="form-control form-control-lg"
                          type="password"
                          placeholder="Old Password" required
                          value={this.state.oldPassword} onChange={this.updateState('oldPassword')} />
                      </fieldset>
                      <fieldset className="form-group">
                        <label htmlFor="newPassword">New Password<span>*</span></label>
                        <input
                          className="form-control form-control-lg"
                          type="password"
                          placeholder="New Password" required
                          value={this.state.newPassword} onChange={this.updateState('newPassword')} />
                      </fieldset>
                      <button
                        className="ui button blue"
                        type="submit" >
                        Submit
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

export default ChangePassword