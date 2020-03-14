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
      tutorList: []
    }
  }

  fnDeleteTutor = (key) => {
    fetch(`http://localhost:8080/api/tutor/delete/${key}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  componentDidMount(){
    fetch(`http://localhost:8080/api/tutor/`, {
      method: "GET",
    })
    .then(response =>  response.json() )
    .then(data => {
      this.setState({ tutorList: data });
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
                  <>
                    <div>
                      <a href="/tutor/addnewtutor">
                        <i className="fa fa-plus" /> Add new Role
                      </a>
                    </div>
                    <Table striped hover>
                      <thead>
                        <tr>
                          <th>No</th>
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
                              <td className="id">{key + 1}</td>
                              <td className="fullname">{item.user.fullname}</td>
                              <td className="username">{item.user.username}</td>
                              <td className="password">{item.user.password}</td>
                              <td className="password">{item.user.role}</td>
                              <td>
                                <span>
                                  <a href={"/admin/edittutor?id=" + item.id}>
                                    <i className="fa fa-edit" />
                                  </a>
                                </span>
                                <span>
                                  <Button onClick={() => this.fnDeleteTutor(item.id)}>
                                    <i className="fa fa-trash" />
                                  </Button>
                                </span>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </Table>
                  </>
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
