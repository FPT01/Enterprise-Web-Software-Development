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
import Moment from 'react-moment';

class Documents extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      documentList: [],
      currentLayout: "",
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

    var url = window.location.pathname;
    var arr = url.split("/");
    this.setState({
      currentLayout: arr[1]
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
                title="Documents"
                content={
                  <>
                    <div>
                      <a style={{margin: "0 0 10px"}} className="ui green button" href={"/" + this.state.currentLayout + "/add-new-document"}>
                        <i className="fa fa-plus" /> Add new Document
                      </a>
                    </div>
                    <div className="list-docs">
                        {documentList.map((item, key) => {
                          return(
                            <div className="row uploadDoc">
                              <div className="fileUpload btn btn-orange">
                                <img src="https://image.flaticon.com/icons/svg/136/136549.svg" className="icon" />
                                <span className="upl" id="upload">{(item.url === "") ? "file" : item.url}</span>
                              </div>
                              <fieldset className="doc-info">
                                <div>Written By: {item.owner.username} - At <Moment format="YYYY/MM/DD">{item.creationTime}</Moment></div>
                                <div>{item.title}</div>
                                <div>{item.content}</div>                                          
                              </fieldset>
                            </div>
                          )
                        })}
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

export default Documents;
