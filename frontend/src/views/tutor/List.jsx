/*!

 =========================================================
 * Enterprise Web Software Development
 * Based on Light Bootstrap Dashboard React - v1.3.0
 * Based on Light Bootstrap Dashboard - v1.3.0
 =========================================================

*/

import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import { thArray, tdArray } from "variables/Variables.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

class UserRole extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      tutorList: []
    }
  }

  componentDidMount(){
    fetch(`../../json/Tutor/list.json`, {
      method: "GET",
    })
    .then(response =>  {
      console.log(response);
    })
    .then(resData => {
      var results = [
                     {
                        "id":1,
                        "roleDescription":"turtor 1",
                        "user":{
                           "id":1,
                           "password":"123",
                           "username":"phonglh",
                           "enabled":1,
                           "fullname":"phong lh"
                        }
                     },
                     {
                        "id":2,
                        "roleDescription":"tutor 2",
                        "user":{
                           "id":2,
                           "password":"111",
                           "username":"test",
                           "enabled":1,
                           "fullname":"test user"
                        }
                     }
                  ]
      this.setState({ tutorList: results });
      console.log(this.state.tutorList);
    });
  }

  render() {
    const tutorList = this.state.tutorList;
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Tutor List"
                category="Here is a list of tutor"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Fullname</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Role</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tutorList.map((item, key) => {
                        return(
                          <tr>
                            <td className="id">{key}</td>
                            <td className="fullname">{item.user.fullname}</td>
                            <td className="username">{item.user.username}</td>
                            <td className="password">{item.user.password}</td>
                            <td className="password">{item.user.role}</td>
                            <td>
                              <span>
                                <Button simple>
                                  <i className="fa fa-edit" />
                                </Button>
                              </span>
                              <span>
                                <Button simple>
                                  <i className="fa fa-trash" />
                                </Button>
                              </span>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </Table>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default UserRole;
