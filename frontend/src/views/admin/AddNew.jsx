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

import avatar from "assets/img/faces/face-3.jpg";

class AddNewRole extends React.Component {
  constructor() {
    super();

    this.state = {
      roleName: '',
      roleDescription: '',
      isSuccessful: false,
    };

    this.updateState = field => ev => {
      const state = this.state;
      const newState = Object.assign({}, state, { [field]: ev.target.value });
      this.setState(newState);
    };

    this.submitForm = (roleName, roleDescription) => ev => {
      ev.preventDefault();
      // const recaptcha = recaptchaRef.current.getValue();
      this.onSubmit(roleName, roleDescription);
      // recaptchaRef.current.reset();
    };
  }

  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }

  onSubmit = (roleName, roleDescription) => {
    return fetch(`http://localhost:8080/api/role/save`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ roleName: roleName, roleDescription: roleDescription })
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
      if(data.status === "OK"){
        window.location.href = "/admin/role";
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
                title="Add New Role"
                className="change-password"
                content={
                  <form onSubmit={this.submitForm(this.state.rolename, this.state.roleDescription)}>
                    <fieldset>
                      <fieldset className="form-group">
                        <label>Role Name<span>*</span></label>
                        <input
                          className="form-control form-control-lg"
                          type="text"
                          placeholder="Role Name"
                          value={this.state.rolename} onChange={this.updateState('rolename')} />
                      </fieldset>

                      <fieldset className="form-group">
                        <label>Role Description<span>*</span></label>
                        <input
                          className="form-control form-control-lg"
                          type="text"
                          placeholder="Role Description"
                          value={this.state.roleDescription} onChange={this.updateState('roleDescription')} />
                      </fieldset>
                      <button
                        className="btn btn-primary login-btn"
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

export default AddNewRole
