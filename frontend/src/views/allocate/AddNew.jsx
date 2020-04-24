/*!

 =========================================================
 * Enterprise Web Software Development
 * Based on Light Bootstrap Dashboard React - v1.3.0
 * Based on Light Bootstrap Dashboard - v1.3.0
 =========================================================

*/

import React, { Component } from "react";
import { Grid, Row, Col, FormControl, } from "react-bootstrap";
//import Card from "components/Card/Card.jsx";
import { Dropdown, Button, Card, Form, Label } from 'semantic-ui-react'

class Allocate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listRoom: [],
      listTutor: [],
      listStudent: [],
      selectedRoom: '',
      selectedStudents: [],
      selectedTutors: [],
    }
    this.updateState = field => ev => {
      const state = this.state;
      const newState = Object.assign({}, state, { [field]: ev.target.value });
      this.setState(newState);
    };
  }

  componentDidMount() {

    this.getRooms()
    this.getTutors()
    this.getStudents()
  }

  getRooms = async () => {
    const listRoom = []
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
        }).then(response =>{
            const r = response.status != 200 ? listRoom.push({ key: id, text: name, value: id }) : false
            this.setState({ listRoom: listRoom })
          })
      }))
  }

  getTutors = async () => {
    await fetch(`http://localhost:8080/api/tutor/`, {
      method: "GET",
    })
      .then(response => response.json())
      .then(data => data.map(({ id, user }) => ({ key: id, text: user.fullname, value: id })))
      .then(data => {
        this.setState({ listTutor: data });
      });
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
            const r = data == '' ? this.setState({ listStudent: this.state.listStudent.concat({ key: id, text: user.fullname, value: id }) }) : false
          })

      }))
  }
  resetAllField = () => {

    this.setState({
      selectedRoom: '',
      selectedStudents: [],
      selectedTutors: []
    })
  }
  saveAllocate = () => {
    const room = { id: this.state.selectedRoom }
    const tutors = this.state.selectedTutors.map(i => ({ id: i }))
    const students = this.state.selectedStudents.map(i => ({ id: i }))
    return fetch(`http://localhost:8080/api/allocate/save`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ room: room, tutors: tutors, students: students })
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "OK") {
          window.location.href = "/admin/allocate";
        } else {
          console.log("error");
        }
      })
  }

  onChangeStudent = (e, { value }) => {
    this.setState({ ['selectedStudents']: value })
  }
  onChangeTutor = (e, { value }) => {
    this.setState({ ['selectedTutors']: value })
  }
  onChangeRoom = (e, { value }) => {
    this.setState({ ['selectedRoom']: value })
  }
  render() {
    return (
      <div className="content">
        <Card fluid>
          <Card.Content>
            <Card.Description>
              <Button color="green" onClick={() => window.location.href = "/admin/allocate"} >
                <i className="fa fa-arrow-circle-left" /> To Allocated list
                        </Button>
            </Card.Description>
          </Card.Content>
        </Card>
        <Card fluid>
          <Card.Content>
            <Card.Description>
              <div>
                <Form>
                  <Form.Field>
                    <Label>Please select class</Label>
                    <Dropdown
                      placeholder='Class'
                      fluid
                      selection
                      search
                      onChange={this.onChangeRoom}
                      options={this.state.listRoom}
                      value={this.state.selectedRoom}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Label>Please select tutor</Label>
                    <Dropdown
                      placeholder='Tutor'
                      fluid
                      selection
                      multiple
                      search
                      onChange={this.onChangeTutor}
                      options={this.state.listTutor}
                      value={this.state.selectedTutors}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Label >Please select student(s)</Label>
                    <Dropdown
                      placeholder='Student'
                      fluid
                      selection
                      multiple
                      search
                      onChange={this.onChangeStudent}
                      options={this.state.listStudent}
                      value={this.state.selectedStudents}
                    />
                  </Form.Field>

                  <div>
                    <Button color='blue' onClick={this.saveAllocate}>Save</Button>
                    <Button color='red' onClick={this.resetAllField}>Reset</Button>
                  </div>
                </Form>

              </div>
            </Card.Description>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default Allocate;
