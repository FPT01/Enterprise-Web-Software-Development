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



class EditStudent extends React.Component {
  constructor() {
    super();

    this.state = {
      fullname: '',
      username: '',
      password: '',
      roleId: '',
      selectStatusOptions: "",
      enabled: [{id: 0, enabled: 1}, {id:1, enabled: 0}],
      isSuccessful: false,
    };

    this.updateState = field => ev => {
      const state = this.state;
      const newState = Object.assign({}, state, { [field]: ev.target.value });
      this.setState(newState);
    };

    this.submitEditForm = (fullname, username, password, status) => ev => {
      ev.preventDefault();
      // const recaptcha = recaptchaRef.current.getValue();
      this.onSubmitEdit(fullname, username, password, status);
      // recaptchaRef.current.reset();
    };
  }

  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }

  onSubmitEdit = (fullname, username, password, status) => {
    const studentObj=queryString.parse(this.props.location.search);
    var newStatus = null;
    if(status == "active"){
      newStatus = 1
    }else {
      newStatus = 0
    }
    return fetch(`http://localhost:8080/api/student/save`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id: studentObj.id, user: {id: studentObj.userId, fullname: fullname, username: username, password: password, enabled: status, roleDTO:{id: studentObj.roleId}}})
    })
    .then((response) => response.json())
    .then((data) => {
      if(data.status === "OK"){
        alert(data.message);
        setTimeout(function(){ 
          window.location.href = "/admin/student";
        }, 700);
      }else {
        console.log("error"); 
      }
    })
  }

  render() {
    const selectStatusOptions = () => {
      return this.state.enabled.map(item => {
        return <option value={item.enabled}>{(item.enabled === 1) ? "active" : "unactive"}</option>
      })
    }
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Card
                title="Edit Student"
                className="change-password"
                content={
                  <form onSubmit={this.submitEditForm(this.state.fullname, this.state.username, this.state.password, this.state.selectStatusOptions)}>
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
                        <select className="form-control" value={this.state.selectStatusOptions} onChange={this.updateState('selectStatusOptions')} required >
                          <option value="">Please choose status</option>
                          {selectStatusOptions()}
                        </select>
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

export default EditStudent
