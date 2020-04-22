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

class Rooms extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      listRoom: []
    }
  }

  componentDidMount(){
    fetch(`http://localhost:8080/api/room/`, {
      method: "GET",
    })
    .then(response =>  response.json() )
    .then(data => {
      this.setState({ listRoom: data });
    });
  }

  fnDeleteRoom = (key) => {
    if (window.confirm("Do you really want to delete this item?")) { 
      fetch(`http://localhost:8080/api/room/delete/${key}`, {
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
  }

  render() {
    const listRoom = this.state.listRoom;
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Room List"
                category="Here is a list of Room"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <>
                    <div>
                      <a style={{margin: "10px"}} className="ui green button" href="/admin/add-new-room">
                        <i className="fa fa-plus" /> Add new Room
                      </a>
                    </div>
                    <Table striped hover>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Room's Name</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {listRoom.map((item, key) => {
                          return(
                            <tr key={key}>
                              <td className="id">{item.id}</td>
                              <td className="room-name">{item.name}</td>
                              <td>
                                <span>
                                  <a className="ui yellow button" href={"/admin/edit-room?id=" + item.id}>
                                    <i className="fa fa-edit" />
                                  </a>
                                </span>
                                <span>
                                  <Button className="ui red button" onClick={() => this.fnDeleteRoom(item.id)}>
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

export default Rooms;
