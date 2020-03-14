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

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      userList: []
    }
  }

  fnDeleteTutor = (key) => {
    fetch(`http://localhost:8080/api/user/delete/${key}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  componentDidMount(){
    fetch(`http://localhost:8080/api/user/`, {
      method: "GET",
    })
    .then(response =>  response.json() )
    .then(data => {
      this.setState({ userList: data });
    });
  }

  render() {
    const userList = this.state.userList;
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="User List"
                category="Here is a list of User"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <>
                  <div>
                    <a href="/tutor/add-new-user">
                      <i className="fa fa-plus" /> Add new User
                    </a>
                  </div>
                  <Table striped hover>
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Fullname</th>
                        <th>Username</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userList.map((item, key) => {
                        return(
                          <tr>
                            <td className="id">{key + 1}</td>
                            <td className="fullname">{item.fullname}</td>
                            <td className="username">{item.username}</td>
                            <td className="password">{(item.enabled == 1) ? "active" : "unactive"}</td>
                            <td className="password">{item.roleDTO.roleDescription}</td>
                            <td>
                              <span>
                                  <a href={"/admin/edit-user?id=" + item.id}>
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

export default Users;
