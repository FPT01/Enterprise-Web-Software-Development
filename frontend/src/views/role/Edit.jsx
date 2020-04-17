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



class EditRole extends React.Component {
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

    this.submitEditForm = (roleName, roleDescription) => ev => {
      ev.preventDefault();
      // const recaptcha = recaptchaRef.current.getValue();
      this.onSubmitEdit(roleName, roleDescription);
      // recaptchaRef.current.reset();
    };
  }

  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }

  onSubmitEdit = (roleName, roleDescription) => {
    const roleId=queryString.parse(this.props.location.search);
    return fetch(`http://localhost:8080/api/role/save`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id: roleId.id, roleName: roleName, roleDescription: roleDescription })
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
                title="Edit Role"
                className="change-password"
                content={
                  <form onSubmit={this.submitEditForm(this.state.rolename, this.state.roleDescription)}>
                    <fieldset>
                      <fieldset className="form-group">
                        <label>Role Name<span>*</span></label>
                        <input
                          className="form-control form-control-lg"
                          type="text"
                          placeholder="Role Name"
                          value={this.state.rolename} onChange={this.updateState('rolename')} required />
                      </fieldset>

                      <fieldset className="form-group">
                        <label>Role Description<span>*</span></label>
                        <input
                          className="form-control form-control-lg"
                          type="text"
                          placeholder="Role Description"
                          value={this.state.roleDescription} onChange={this.updateState('roleDescription')} required />
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

export default EditRole
