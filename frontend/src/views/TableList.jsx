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

class TableList extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      person: []
    }
  }

  componentDidMount(){
    fetch('https://randomuser.me/api/?results=100')
    .then(response =>  response.json())
    .then(resData => {
       //console.log(JSON.stringify(resData))
       //do your logic here       
       //let person = resData.results
       this.setState({ person: resData.results }); //this is an asynchronous function
    })
  }

  render() {
    const listPerson = this.state.person;
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Striped Table with Hover"
                category="Here is a subtitle for this table"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table striped hover>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>DOB</th>
                        <th>Address</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Picture</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listPerson.map((item, key) => {
                        return(
                          <tr>
                            <td className="id">{key}</td>
                            <td className="name">{item.name.title} {item.name.first} {item.name.last}</td>
                            <td className="dob">{item.dob.date}</td>
                            <td className="address">{item.location.street.number} {item.location.street.name}</td>
                            <td className="email">{item.email}</td>
                            <td className="phone">{item.phone}</td>
                            <td className="picture">{item.picture.thumbnail}</td>
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

export default TableList;
