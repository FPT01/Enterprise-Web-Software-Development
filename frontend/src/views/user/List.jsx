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

  fnDeleteUser = (key) => {
    fetch(`http://localhost:8080/api/user/delete/${key}`, {
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
                    <a style={{margin: "10px"}} className="ui green button" href="/admin/add-new-user">
                      <i className="fa fa-plus" /> Add new User
                    </a>
                  </div>
                  <Table striped hover>
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Fullname</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Gender</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userList.map((item, key) => {
                        return(
                          <tr key={key}>
                            <td className="id">{key + 1}</td>
                              <td className="fullname">{(item.fullname !== null) ? item.fullname : ""}</td>
                              <td className="username">{(item.username !== null) ? item.username : ""}</td>
                              <td className="password">{(item.password !== null) ? item.password : ""}</td>
                              <td className="gender">{(item.gender !== null) ? ((item.gender == 1) ? "male" : "female") : ""}</td>
                              <td className="email">{(item.email !== null) ? item.email : ""}</td>
                              <td className="roleId">{(item.roleDTO !== null) ? item.roleDTO.roleName : ""}</td>
                              <td className="password">{(item.enabled !== null) ? ((item.enabled == 1) ? "active" : "unactive") : ""}</td>
                            <td>
                              <span>
                                  <a className="ui yellow button" href={"/admin/edit-user?id=" + item.id}>
                                    <i className="fa fa-edit" />
                                  </a>
                                </span>
                              <span>
                                <Button className="ui red button" onClick={() => this.fnDeleteUser(item.id)}>
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
