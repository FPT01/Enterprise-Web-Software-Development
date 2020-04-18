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



class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      userProfile: null
    }
  }

  componentDidMount(){
    const currentUser = JSON.parse(window.localStorage.getItem('account'));

    fetch(`http://localhost:8080/api/user/findByUsername/${currentUser.username}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response =>  response.json() )
    .then(data => {
      this.setState({ userProfile: data });
    });
  }

  render() {
    if(this.state.userProfile === null){
      return <></>
    }
    var data = this.state.userProfile;
    const gender = (data.gender === 0) ? "female" : "male";
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={8}>
              <Card
                title="Edit Profile"
                content={
                  <form>
                    <FormInputs
                      ncols={["col-md-12"]}
                      properties={[
                        {
                          label: "Full Name",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "",
                          defaultValue: `${data.fullname}`
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-12"]}
                      properties={[
                        {
                          label: "Username",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "",
                          defaultValue: `${data.username}`
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-12"]}
                      properties={[
                        {
                          label: "Email address",
                          type: "email",
                          bsClass: "form-control",
                          placeholder: "",
                          defaultValue: `${data.email}`
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-12"]}
                      properties={[
                        {
                          label: "Gender",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "",
                          defaultValue: `${gender}`
                        }
                      ]}
                    />
                    <Button bsStyle="info" pullRight fill type="submit">
                      Update Profile
                    </Button>
                    <div className="clearfix" />
                  </form>
                }
              />
            </Col>
            <Col md={4}>
              <UserCard
                bgImage="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400"
                avatar=""
                name="Mike Andrew"
                userName="michael24"
                description={
                  <span>
                    "Lamborghini Mercy
                    <br />
                    Your chick she so thirsty
                    <br />
                    I'm in that two seat Lambo"
                  </span>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default UserProfile;
