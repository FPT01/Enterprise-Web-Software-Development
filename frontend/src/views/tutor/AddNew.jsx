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



class AddNewTutor extends React.Component {
  constructor() {
    super();

    this.state = {
      fullname: '',
      username: '',
      password: '',
      roleId: '',
      status: 1,
      isSuccessful: false,
      roleList: [],
    };

    this.updateState = field => ev => {
      const state = this.state;
      const newState = Object.assign({}, state, { [field]: ev.target.value });
      this.setState(newState);
    };

    this.submitForm = (fullname, username, password, status) => ev => {
      ev.preventDefault();
      // const recaptcha = recaptchaRef.current.getValue();
      this.onSubmit(fullname, username, password, status);
      // recaptchaRef.current.reset();
    };
  }

  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }

  onSubmit = (fullname, username, password, status) => {
    var roleId = null;
    this.state.roleList.map(itm => {
      if(itm.roleName === "Tutor"){
        roleId = itm.id
      }
    });
    console.log("status", status);
    return fetch(`http://localhost:8080/api/tutor/save`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({user: {fullname: fullname, username: username, password: password, enabled: status, roleDTO:{id: roleId}}})
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
      if(data.status === "OK"){
        window.location.href = "/admin/tutor/";
      }else {
        console.log("error"); 
      }
    })
  }

  componentDidMount(){    
    fetch(`http://localhost:8080/api/role/`, {
      method: "GET",
    })
    .then(response =>  response.json() )
    .then(data => {
      this.setState({ roleList: data });
    });
  }

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Card
                title="Add New Tutor"
                className="change-password"
                content={
                  <form onSubmit={this.submitForm(this.state.fullname, this.state.username, this.state.password, this.state.status)}>
                    <fieldset>
                      <fieldset className="form-group">
                        <label>Fullname<span>*</span></label>
                        <input
                          className="form-control form-control-lg"
                          type="text"
                          placeholder="Fullname"
                          value={this.state.fullname} onChange={this.updateState('fullname')} required />
                      </fieldset>

                      <fieldset className="form-group">
                        <label>Username<span>*</span></label>
                        <input
                          className="form-control form-control-lg"
                          type="text"
                          placeholder="Username"
                          value={this.state.username} onChange={this.updateState('username')} required />
                      </fieldset>
                      <fieldset className="form-group">
                        <label>Password<span>*</span></label>
                        <input
                          className="form-control form-control-lg"
                          type="password"
                          placeholder="Password"
                          value={this.state.password} onChange={this.updateState('password')} required />
                      </fieldset>
                      <fieldset className="form-group">
                        <label>Status<span>*</span></label>
                        <input
                          className="form-control form-control-lg"
                          type="text"
                          placeholder="text"
                          value={this.state.status} onChange={this.updateState('status')} required />
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

export default AddNewTutor
