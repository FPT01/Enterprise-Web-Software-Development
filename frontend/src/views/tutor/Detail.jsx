/*!

 =========================================================
 * Enterprise Web Software Development
 * Based on Light Bootstrap Dashboard React - v1.3.0
 * Based on Light Bootstrap Dashboard - v1.3.0
 =========================================================

*/

import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { UserCard } from "components/UserCard/UserCard.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import Avatar from "../../assets/img/edit-profile.png";
import queryString from 'query-string';


class TutorDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      userProfile: null,
      fullname: '',
      username: '',
      password: '',
      gender: '',
      status: '',
      selectValue: "",
      isSuccessful: false,
      roleId: "",
      roleName: "",
      roleList: [],
    }

    this.updateState = field => ev => {
      const state = this.state;
      const newState = Object.assign({}, state, { [field]: ev.target.value });
      this.setState(newState);
    };

    this.submitEditForm = (roleId, fullname, username, email, gender) => ev => {
      ev.preventDefault();
      // const recaptcha = recaptchaRef.current.getValue();
      this.onSubmitEditProfile(roleId, fullname, username, email, gender);
      // recaptchaRef.current.reset();
    };
  }

  onSubmitEditProfile = (roleId, fullname, username, email, gender) => {
    const userObj= this.state.userProfile;
    const newRoleId = roleId;
    const newGender = (gender === "male") ? 1 : 0
    return fetch(`http://localhost:8080/api/user/changeprofile`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id: userObj.id, fullname: fullname, username: username, email: email, gender:newGender, roleDTO:{id: newRoleId}})
    })
    .then((response) => response.json())
    .then((data) => {
      if(data.status === "OK"){
        alert(data.message);
        // window.location.href = "/admin/user";
      }else {
        console.log("error"); 
      }
    })
  }


  componentDidMount(){
    const tutorObj=queryString.parse(this.props.location.search);
    fetch(`http://localhost:8080/api/user/findByUsername/${tutorObj.username}`, {
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
        gender: (data.gender === 0) ? 'female' : "male",
        email: data.email,
        roleName: data.roleDTO.roleName
      });
    });
  }

  render() {
    if(this.state.userProfile === null){
      return <></>
    }
    var data = this.state.userProfile;
    var roleId = data.roleDTO.id;
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={8}>
              <Card
                title="Edit User Profile"
                className="change-password"
                content={
                  <form onSubmit={this.submitEditForm(roleId, this.state.fullname, this.state.username, this.state.email, this.state.gender)}>
                    <fieldset>
                      <fieldset className="form-group">
                        <label>Role</label>
                        <input
                          className="form-control form-control-lg"
                          type="text"
                          placeholder="Role"
                          disabled
                          value={this.state.roleName} />
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
                        <input
                          className="form-control form-control-lg"
                          type="text"
                          placeholder="Gender"
                          value={this.state.gender} onChange={this.updateState('gender')} required />
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
                        <label>Email<span>*</span></label>
                        <input
                          className="form-control form-control-lg"
                          type="text"
                          placeholder="Email"
                          value={this.state.email} onChange={this.updateState('email')} required />
                      </fieldset>
                      <button
                        className="ui blue button"
                        type="submit" >
                        Update Profile
                      </button>

                    </fieldset>
                  </form>
                }
              />
            </Col>
            <Col md={4} style={{width: "100%"}}>
              <div className="fpt-greenwich-logo"><img src={Avatar} style={{width: "100%", height: "auto", "display": "block", "maxWidth": "300px", "margin": "10px auto"}}/></div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default TutorDetail;