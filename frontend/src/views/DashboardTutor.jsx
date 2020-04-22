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
import { Link } from 'react-router-dom';

class DashboardTutor extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      summaryList: [],
    }
  }

  componentDidMount(){   
    var account = window.localStorage.getItem('account');
    var username = JSON.parse(account).username; 
    fetch(`http://localhost:8080/api/statistic/summary/${username}`, {
      method: "GET",
    })
    .then(response =>  response.json() )
    .then(data => {
      this.setState({ summaryList: data });
    });
  }

  render() {
    const summaryList = this.state.summaryList;
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Tutor List"
                category="Here is a list of tutor"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <>
                    <div>
                      <a style={{margin: "10px"}} className="ui green button" href="/admin/add-new-tutor">
                        <i className="fa fa-plus" /> Add new Tutor
                      </a>
                    </div>
                    <Table striped hover>
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>Fullname</th>
                          <th>Username</th>
                          <th>Password</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {summaryList.map((item, key) => {
                          return(
                            <tr>
                              <td className="id">{key + 1}</td>
                              <td className="fullname">{(item.user !== null) ? item.user.fullname : ""}</td>
                              <td className="username">{(item.user !== null) ? item.user.username : ""}</td>
                              <td className="password">{(item.user !== null) ? item.user.password : ""}</td>
                              <td className="password">{(item.user !== null) ? ((item.user.enabled == 1) ? "active" : "unactive") : ""}</td>
                              <td>
                                <span>
                                  <a className="ui yellow button" href={`/admin/edit-tutor/?id=${item.id}&userId=${item.user.id}&roleId=${item.user.roleDTO.id}`}>
                                    <i className="fa fa-edit" />
                                  </a>
                                </span>
                                <span>
                                  <Button className="ui red button" onClick={() => this.fnDeleteTutor(item.id)}>
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

export default DashboardTutor;
