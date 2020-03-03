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
      userRole: []
    }
  }

  componentDidMount(){
    fetch(`../../json/Role/role.json`, {
      method: "GET",
    })
    .then(response =>  {
      console.log(response);
    })
    .then(resData => {
      var results = [
                     {
                        "id":1,
                        "roleName":"ADMIN",
                        "roleDescription":"Role Admin",
                        "users":[]
                     },
                     {
                        "id":2,
                        "roleName":"USER",
                        "roleDescription":"Role User",
                        "users":[]
                     },
                     {
                        "id":4,
                        "roleName":"UPDATE_ROLE",
                        "roleDescription":"Update role",
                        "users":[]
                     }
                  ]
      this.setState({ userRole: results });
      console.log(this.state.userRole);
    });
  }

  render() {
    const listUserRole = this.state.userRole;
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="User Role List"
                category="Here is a list of user role"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Role's Name</th>
                        <th>Role's Description</th>
                        <th>Users</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listUserRole.map((item, key) => {
                        return(
                          <tr>
                            <td className="id">{key}</td>
                            <td className="role-name">{item.roleName}</td>
                            <td className="role-desc">{item.roleDescription}</td>
                            <td className="user-infor">{item.users}</td>
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
