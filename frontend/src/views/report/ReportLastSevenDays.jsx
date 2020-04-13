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

class ReportLastSevenDays extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      reportLastSevenDays: [],
      reportAvgMessage: [],
    }
  }

  componentDidMount(){    
    fetch(`http://localhost:8080/api/statistic/lastsevendays`, {
      method: "GET",
    })
    .then(response =>  response.json() )
    .then(data => {
      this.setState({ reportLastSevenDays: [] });
    });

    fetch(`http://localhost:8080/api/statistic/avgmsg`, {
      method: "GET",
    })
    .then(response =>  response.json() )
    .then(data => {
      this.setState({ reportAvgMessage: [] });
    });
  }

  render() {
    const tutorList = this.state.tutorList;
    return (
      <>
        <div className="content">
          <Grid fluid>
            <Row>
              <Col md={12}>
                <Card
                  title="View exception reports"
                  category=""
                  ctTableFullWidth
                  ctTableResponsive
                  content={
                    <>
                      <Table striped hover>
                        <thead>
                          <tr>
                            <th>Report's Name</th>
                            <th>Download</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr style={{background: "white"}}>
                            <td>Students without a personal tutor</td>
                            <td>
                              <a href="http://localhost:8080/api/statistic/export/studentwithouttutor">
                                <i className="fa fa-file-excel-o" />
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>Students with no interaction for 7 days and 28 days</td>
                            <td>
                              <a href="http://localhost:8080/api/statistic/export/studentwithnointeraction">
                                <i className="fa fa-file-excel-o" />
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </>
                  }
                />
              </Col>
            </Row>
          </Grid>
        </div>
        <div className="content">
          <Grid fluid>
            <Row>
              <Col md={12}>
                <Card
                  title="Total messages in 7 days"
                  category="Number of messages in last 7 days"
                  ctTableFullWidth
                  ctTableResponsive
                  content={
                    <>
                      <Table striped hover>
                        <thead>
                          <tr>
                            <th>No</th>
                            <th>Last Seven Days</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.reportLastSevenDays.map((item, key) => {
                            console.log(item);
                            return(
                              <tr>
                                <td className="id">{key + 1}</td>
                                <td className="fullname">{(item.lastSevenDays !== null) ? item.lastSevenDays : ""}</td>
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
        <div className="content">
          <Grid fluid>
            <Row>
              <Col md={12}>
                <Card
                  title="Average messages"
                  category="Average number of messages for each personal tutor"
                  ctTableFullWidth
                  ctTableResponsive
                  content={
                    <>
                      <Table striped hover>
                        <thead>
                          <tr>
                            <th>No</th>
                            <th>Fullname</th>
                            <th>Average messages</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.reportAvgMessage.map((item, key) => {
                            console.log(item);
                            return(
                              <tr>
                                <td className="id">{key + 1}</td>
                                <td className="fullname">{(item.fullname !== null) ? item.fullname : ""}</td>
                                <td>{(item.averageMsg !== null) ? item.averageMsg : ""}</td>
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
      </>
    );
  }
}

export default ReportLastSevenDays;
