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

class Documents extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      documentList: []
    }
  }

  componentDidMount(){
    fetch(`http://localhost:8080/api/document/`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response =>  response.json() )
    .then(data => {
      this.setState({
        documentList : data
      })
    });
  }

  render() {
    const documentList = this.state.documentList;

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
                      <a style={{margin: "10px"}} className="ui green button" href="/admin/add-new-document">
                        <i className="fa fa-plus" /> Add new Document
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
                        {documentList.map((item, key) => {
                          return(
                            <tr key={key}>
                              <td className="id">{item.id}</td>
                              <td className="role-name">{item.title}</td>
                              <td className="role-desc">{item.content}</td>
                              <td className="role-desc">{item.creationTime}</td>
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

export default Documents;
