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
      listUserRole: []
    }
  }

  componentDidMount(){
    fetch(`http://localhost:8080/api/role/`, {
      method: "GET",
    })
    .then(response =>  response.json() )
    .then(data => {
      this.setState({ listUserRole: data });
    });
  }

  fnDeleteRole = (key) => {
    if (window.confirm("Do you really want to delete this item?")) { 
      fetch(`http://localhost:8080/api/role/delete/${key}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => response.json())
      .then((data) => {
        if(data.status === "OK"){
          alert(data.message);
          setTimeout(function(){ 
            window.location.reload();
          }, 500);
        }else {
          console.log("error"); 
        }
      })
    }
  }

  render() {
    const listUserRole = this.state.listUserRole;
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="User Role List"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <>
                    <div>
                      <a style={{margin: "10px"}} className="ui green button" href="/admin/add-new-role">
                        <i className="fa fa-plus" /> Add new Role
                      </a>
                    </div>
                    <Table striped hover>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Role's Name</th>
                          <th>Role's Description</th>
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
                              <td>
                                <span>
                                  <a className="ui yellow button" href={"/admin/edit-role?id=" + item.id}>
                                    <i className="fa fa-edit" />
                                  </a>
                                </span>
                                <span>
                                  <Button className="ui red button" onClick={() => this.fnDeleteRole(item.id)}>
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
