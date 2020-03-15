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

class Students extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      studentList: []
    }
  }

  fnDeleteStudent = (key) => {
    fetch(`http://localhost:8080/api/student/delete/${key}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
      if(data.status === "OK"){
        window.location.reload();
      }else {
        console.log("error");
      }
    })
  }

  componentDidMount(){
    fetch(`http://localhost:8080/api/student/`, {
      method: "GET",
    })
    .then(response =>  response.json() )
    .then(data => {
      this.setState({ studentList: data });
    });
  }

  render() {
    const studentList = this.state.studentList;
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
                  <>
                    <div>
                      <a href="/admin/add-new-tutor">
                        <i className="fa fa-plus" /> Add new Tutor
                      </a>
                    </div>
                    <Table striped hover>
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>Fullname</th>
                          <th>Username</th>
                          <th>Password</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {studentList.map((item, key) => {
                          return(
                            <tr>
                              <td className="id">{key + 1}</td>
                              <td className="fullname">{(item.user !== null) ? item.user.fullname : ""}</td>
                              <td className="username">{(item.user !== null) ? item.user.username : ""}</td>
                              <td className="password">{(item.user !== null) ? item.user.password : ""}</td>
                              <td className="password">{(item.user !== null) ? ((item.user.enabled == 1) ? "active" : "unactive") : ""}</td>
                              <td>
                                <span>
                                  <a href={"/admin/edit-student?id=" + item.id}>
                                    <i className="fa fa-edit" />
                                  </a>
                                </span>
                                <span>
                                  <Button onClick={() => this.fnDeleteStudent(item.id)}>
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

export default Students;
