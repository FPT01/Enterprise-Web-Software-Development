/*!

 =========================================================
 * Enterprise Web Software Development
 * Based on Light Bootstrap Dashboard React - v1.3.0
 * Based on Light Bootstrap Dashboard - v1.3.0
 =========================================================

*/

import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
//import Card from "components/Card/Card.jsx";

import { List, Button, Card, Form, Label } from 'semantic-ui-react'

class UserRole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listRoomAllocated: [],
      isAvailRoom: false,
      listStudent: [],
    }
  }

  componentDidMount() {
    this.initData()
  }
  initData = ()=>{
    this.fnGetRoomAllocated()
    this.getStudents()
  }
  fnGetRoomAllocated = async () => {
    this.setState({
      listRoomAllocated: []
    })
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
        }).then(response => response.json())
          .then(response => {
            if (response.room) {
              const room = {
                id,
                name,
                students: response.students.map(({ user }) => user.fullname),
                tutors: response.tutors.map(({ user }) => user.fullname),
              }
              this.setState({
                listRoomAllocated: this.state.listRoomAllocated.concat(room)
              })
            } else {

              this.setState({ isAvailRoom: true })
            }
          })
      }))
  }
  getStudents = async () => {
    let listStudent = []
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
        }).then(response => response.text())
          .then(data => {
            console.log(data)
            const r = data == '' ? this.setState({ listStudent: this.state.listStudent.concat({ key: id, text: user.fullname, value: id }) }) : false
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
          this.initData()
        } else {
          console.log("error");
        }
      })
  }

  render() {
    const listRoom = this.state.listRoomAllocated;
    const listStudent = this.state.listStudent;
    const isAvailStudent = listStudent.length > 0;

    const cantAddMore = !(isAvailStudent && this.state.isAvailRoom);

    console.log({
      listRoom,
      listStudent,
      isAvailStudent,
      cantAddMore,
    })
    return (
      <div className="content" >

        <Card fluid>
          <Card.Content>
            <Card.Description>
              <Button color="green" onClick={() => window.location.href = "/admin/add-allocate"} disabled={cantAddMore}>New</Button>
            </Card.Description>
          </Card.Content>
        </Card>
        <Card fluid>
          <Card.Header><strong>Here is a list of allocated class</strong></Card.Header>
          <Card.Content>
            <Card.Description>
              <div>
                <Table striped hover>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Tutor</th>
                      <th>Student</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listRoom.map((item, key) => {
                      return (
                        <tr key={key}>
                          <td className="id">{item.id}</td>
                          <td className="role-name">{item.name}</td>
                          <td className="role-name">
                            <List>
                              {item.tutors.map((s, key) => (<List.Item key={key}>{s}</List.Item>))}
                            </List>
                          </td>
                          <td className="role-name">
                            <List>
                              {item.students.map((s, key) => (<List.Item key={key}>{s}</List.Item>))}
                            </List>
                          </td>
                          <td>
                            <span>
                              <Button className="ui yellow button" onClick={() => window.location.href = "/admin/edit-allocate?id=" + item.id}>
                                Edit
                                    </Button>

                            </span>
                            <span>
                              <Button className="ui red button" onClick={() => this.fnDeleteAllocate(item.id)}>
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
            </Card.Description>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default UserRole;
