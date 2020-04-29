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



class EditUser extends React.Component {
  constructor() {
    super();

    this.state = {
      fullname: '',
      username: '',
      password: '',
      email: '',
      status: '',
      selectValue: "",
      selectStatusOptions: "",
      selectGenderOptions: "",
      gender: [{id: 0, gender: 1}, {id:1, gender: 0}],
      enabled: [{id: 0, enabled: 1}, {id:1, enabled: 0}],
      isSuccessful: false,
      roleList: [],
    };

    this.updateState = field => ev => {
      const state = this.state;
      const newState = Object.assign({}, state, { [field]: ev.target.value });
      this.setState(newState);
    };

    this.submitEditForm = (roleId, fullname, username, password, status, email, gender) => ev => {
      ev.preventDefault();
      // const recaptcha = recaptchaRef.current.getValue();
      this.onSubmitEdit(roleId, fullname, username, password, status, email, gender);
      // recaptchaRef.current.reset();
    };
  }

  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }

  onSubmitEdit = (roleId, fullname, username, password, status, email, gender) => {
    const userObj=queryString.parse(this.props.location.search);

    return fetch(`http://localhost:8080/api/user/save`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id: userObj.id, fullname: fullname, username: username, password: password, enabled: status, email: email, gender:gender, roleDTO:{id: roleId}})
    })
    .then((response) => response.json())
    .then((data) => {
      if(data.status === "OK"){
        alert(data.message);
        setTimeout(function(){ 
          window.location.href = "/admin/user"; 
        }, 700);
      }else {
        console.log("error"); 
      }
    })
  }

  componentDidMount(){   
    const userObj = queryString.parse(this.props.location.search);
    fetch(`http://localhost:8080/api/user/findByUsername/${userObj.username}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response =>  response.json() )
    .then(data => {
      this.setState({ 
        userProfile: data,
        fullname: data.fullname,
        username: data.username,
        email: data.email,
      });
    }); 

    fetch(`http://localhost:8080/api/role/`, {
      method: "GET",
    })
    .then(response =>  response.json() )
    .then(data => {
      this.setState({ roleList: data });
    });
  }

  render() {
    const selectOptions = () => {
      return this.state.roleList.map(item => {
        return <option value={item.id}>{item.roleName}</option>
      })
    }
    const selectStatusOptions = () => {
      return this.state.enabled.map(item => {
        return <option value={item.enabled}>{(item.enabled === 1) ? "active" : "unactive"}</option>
      })
    }
    const selectGenderOptions = () => {
      return this.state.gender.map(item => {
        return <option value={item.id}>{(item.gender === 1) ? "male" : "female"}</option>
      })
    }
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Card
                title="Edit User"
                className="change-password"
                content={
                  <form onSubmit={this.submitEditForm(this.state.selectValue, this.state.fullname, this.state.username, this.state.password, this.state.selectStatusOptions, this.state.email, this.state.selectGenderOptions)}>
                    <fieldset>
                      <fieldset className="form-group">
                        <label>Roles Name<span>*</span></label>
                        <select className="form-control" value={this.state.selectValue} onChange={this.updateState('selectValue')} required >
                          <option value="">Please choose role</option>
                          {selectOptions()}
                        </select>
                      </fieldset>
                      <fieldset className="form-group">
                        <label>Fullname<span>*</span></label>
                        <input
                          className="form-control form-control-lg"
                          type="text"
                          placeholder="Fullname"
                          value={this.state.fullname} onChange={this.updateState('fullname')} required />
                      </fieldset>
                      <fieldset className="form-group">
                        <label>Gender<span>*</span></label>
                        <select className="form-control" value={this.state.selectGenderOptions} onChange={this.updateState('selectGenderOptions')} required >
                          <option value="">Gender</option>
                          {selectGenderOptions()}
                        </select>
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
                        <label>Email<span>*</span></label>
                        <input
                          className="form-control form-control-lg"
                          type="text"
                          placeholder="Email"
                          value={this.state.email} onChange={this.updateState('email')} required />
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

export default EditUser
