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
      userRole: []
    }
  }

  componentDidMount(){
    fetch(`http://localhost:8080/api/role/`, {
      method: "GET",
    })
    .then(response =>  response.json() )
    .then(data => {
      this.setState({ userRole: data });
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
                          <tr key={key}>
                            <td className="id">{item.id}</td>
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
