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

class Tutors extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      tutorList: [],
    }
  }

  fnDeleteTutor = (key) => { 
    if (window.confirm("Do you really want to delete this item?")) { 
      fetch(`http://localhost:8080/api/tutor/delete/${key}`, {
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

  insertParams = (url, params) => { // url is string, params is object
    let paramUrl = url;
    const copyParams = Object.assign({}, params);

    Object.keys(copyParams).forEach(key => {
      const currentParam = copyParams[key];
      if (paramUrl.includes(key)) delete copyParams[key];
      paramUrl = paramUrl.replace(`:${key}`, currentParam);
    });
    return paramUrl;
  };

  componentDidMount(){    
    fetch(`http://localhost:8080/api/tutor/`, {
      method: "GET",
    })
    .then(response =>  response.json() )
    .then(data => {
      this.setState({ tutorList: data });
    });
  }

  render() {
    const tutorList = this.state.tutorList;
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
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tutorList.map((item, key) => {
                          return(
                            <tr>
                              <td className="id">{key + 1}</td>
                              <td className="fullname">{(item.user !== null) ? item.user.fullname : ""}</td>
                              <td className="username">{(item.user !== null) ? item.user.username : ""}</td>
                              <td className="password">{(item.user !== null) ? ((item.user.enabled == 1) ? "active" : "unactive") : ""}</td>
                              <td>
                                <span>
                                  <a className="ui yellow button" href={`/admin/edit-tutor/?id=${item.id}&userId=${item.user.id}&roleId=${item.user.roleDTO.id}&username=${item.user.username}`}>
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

export default Tutors;
