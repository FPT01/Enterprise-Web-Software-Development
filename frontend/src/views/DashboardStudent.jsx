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
import queryString from 'query-string';

class DashboardStudent extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      summaryList: [],
    }
  }

  componentDidMount(){   
    const studentObj = queryString.parse(this.props.location.search);
    var username = ""; 
    if(studentObj === null || studentObj === undefined || studentObj === ""){
      var account = window.localStorage.getItem('account');
      username = JSON.parse(account).username; 
    }else {
      username = studentObj.username
    }
    fetch(`http://localhost:8080/api/statistic/summary/${username}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response =>  response.json() )
    .then(data => {
      this.setState({ summaryList: data });
    });
  }

  render() {
    var summaryReceiversList = this.state.summaryList.receivers;
    var summarySendersList = this.state.summaryList.senders;
    if(summaryReceiversList === undefined || summaryReceiversList === undefined){
      return <></>
    }
    return (
      <div className="content">

        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Summary"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <>
                    <Table striped hover>
                      <thead>
                        <tr>
                          <th>Total Blog Comment</th>
                          <th>Total Blog Post</th>
                          <th>Total Meetings</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{this.state.summaryList.totalBlogComment}</td>
                          <td>{this.state.summaryList.totalBlogPost}</td>
                          <td>{this.state.summaryList.totalMeetings}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </>
                }
              />
            </Col>
          </Row>
        </Grid>
        <br />
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Receivers"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <>
                    <Table striped hover>
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>Fullname</th>
                          <th>Username</th>
                          <th>Time</th>
                          <th>Total Messages</th>
                        </tr>
                      </thead>
                      <tbody>
                        {summaryReceiversList.map((item, key) => {
                          return(
                            <tr key={key}>
                              <td className="id">{key + 1}</td>
                              <td className="id">{item.fullname}</td>
                              <td className="role-name">{item.username}</td>
                              <td className="role-desc">{item.time}</td>
                              <td className="role-desc">{item.counter}</td>
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
        <br />
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Senders"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <>
                    <Table striped hover>
                      <thead>
                        <tr>
                          <th>No</th>
                          <th>Fullname</th>
                          <th>Username</th>
                          <th>Time</th>
                          <th>Total Messages</th>
                        </tr>
                      </thead>
                      <tbody>
                        {summarySendersList.map((item, key) => {
                          return(
                            <tr key={key}>
                              <td className="id">{key + 1}</td>
                              <td className="id">{item.fullname}</td>
                              <td className="role-name">{item.username}</td>
                              <td className="role-desc">{item.time}</td>
                              <td className="role-desc">{item.counter}</td>
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

export default DashboardStudent;
