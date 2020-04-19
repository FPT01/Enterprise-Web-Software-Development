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

import { Dropdown, Button, Divider, Form, Label } from 'semantic-ui-react'

class UserRole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listRoomAllocated: [],
      listStudentAllocated: [],
      isExistRoomForAllocate: true,
      isExistStudentForAllocate: true,
    }
  }

  componentDidMount() {
    this.getRoom()
    this.getStudents()
  }

  getRoom = async () => {
    const listRoomAllocated = []
    await fetch(`http://localhost:8080/api/room/`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => data.forEach(async ({ id, name }) => {
        await fetch(`http://localhost:8080/api/allocate/findByRoomId/${id}`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(response => {
          const r = response.status == 200 ? listRoomAllocated.push({ id, name, }) : this.setState({ isExistRoomForAllocate: false })
          this.setState({ listRoomAllocated: listRoomAllocated })
        })
      }))
  }

  getStudents = async () => {
    let listStudentAllocated = []
    await fetch(`http://localhost:8080/api/student/`, {
      method: "GET",
    })
      .then(response => response.json())
      .then(data => data.forEach(async ({ id, user }) => {
        await fetch(`http://localhost:8080/api/allocate/checkStudentExist/${id}`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(response => response.text())
          .then(data => {
            const r = data != '' ? listStudentAllocated.push({ id }) : this.setState({ listStudentAllocated: false })
          })

      }))
  }


  fnDeleteAllocate = (id) => {
    fetch(`http://localhost:8080/api/allocate/deleteByRoomId/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        if (data.status === "OK") {
          window.location.reload();
        } else {
          console.log("error");
        }
      })
  }

  render() {
    const listRoom = this.state.listRoomAllocated;
    console.log('1', this.state.isExistRoomForAllocate)
    console.log('1', this.state.isExistStudentForAllocate)
    return (
      <div className="content" >
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Here is a list of allocated class"
                category=""
                ctTableFullWidth
                ctTableResponsive
                content={
                  <>
                    <div className="allocate-content">
                      <div>
                        <Button color="green" onClick={() => window.location.href = "/admin/add-allocate"} disabled={this.state.isExistStudentForAllocate && this.state.isExistRoomForAllocate}>
                          <i className="fa fa-plus" /> New allocation
                        </Button>
                      </div>
                      <br />
                      <Table striped hover>
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {listRoom.map((item, key) => {
                            return (
                              <tr key={key}>
                                <td className="id">{item.id}</td>
                                <td className="role-name">{item.name}</td>
                                <td>
                                  <span>
                                    <Button onClick={() => window.location.href = "/admin/edit-allocate?id=" + item.id}>
                                      Edit
                                    </Button>

                                  </span>
                                  <span>
                                    <Button onClick={() => this.fnDeleteAllocate(item.id)}>
                                      <i className="fa fa-trash" />
                                    </Button>
                                  </span>
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </Table>
                    </div>
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
