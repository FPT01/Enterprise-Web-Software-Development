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
import Button from "components/CustomButton/CustomButton.jsx";

class UserRole extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      studentList: []
    }
  }
  
  handleRouteChange = (event) => {
    
  }

  componentDidMount(){
    fetch(`../../json/Student/list.json`, {
      method: "GET",
    })
    .then(response =>  {
      console.log(response);
    })
    .then(resData => {
      var results = [
                     {
                        "id":1,
                        "roleDescription":"student 1",
                        "user":{
                           "id":2,
                           "password":"111",
                           "username":"test",
                           "enabled":1,
                           "fullname":"test user"
                        }
                     }
                  ];
      this.setState({ studentList: results });
    });
  }

  render() {
    const studentList = this.state.studentList;
    if(studentList){
      return (
        <div className="content">
          <Grid fluid>
            <Row>
              <Col md={12}>
                <Card
                  title="Student List"
                  category="Here is a list of student"
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
                        {studentList.map((item, key) => {
                          return(
                            <tr>
                              <td className="id">{key}</td>
                              <td className="fullname">{item.user.fullname}</td>
                              <td className="username">{item.user.username}</td>
                              <td className="password">{item.user.password}</td>
                              <td className="password">{item.user.role}</td>
                              <td>
                                <span>
                                  <Button onClick={this.handleRouteChange()}>
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
}

export default UserRole;
