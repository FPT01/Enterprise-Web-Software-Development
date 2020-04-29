/*!

 =========================================================
 * Enterprise Web Software Development
 * Based on Light Bootstrap Dashboard React - v1.3.0
 * Based on Light Bootstrap Dashboard - v1.3.0
 =========================================================

*/

import React, { Component } from "react";
//import { Grid, Row, Col, Table } from "react-bootstrap";

import { Card, Button } from 'semantic-ui-react'
import Moment from 'react-moment';

class Documents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documentList: [],
      currentLayout: "",

      role: ''
    }
  }

  componentDidMount() {
    const account = window.localStorage.getItem('account');
    let role = JSON.parse(account).role;
    switch (role) {
      case 'student':
        role = 'students'
        break;
      case 'staff':
        role = 'admin'
        break;
      default:
    }
    this.setState({ role: role })

    fetch(`http://localhost:8080/api/document/`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          documentList: data
        })
      });

    var url = window.location.pathname;
    var arr = url.split("/");
    this.setState({
      currentLayout: arr[1]
    });
  }
  
  render() { 
    
    let  documentList = []
    if ( this.state.documentList === undefined ) {
      documentList = []
    }else{
      documentList =  this.state.documentList;
    }
      
    return (
      <div className="content">
        <Card fluid>
          <Card.Content>
            <Card.Description>
              <Button color="green" onClick={() => window.location.href = `/${this.state.role}/add-new-document`}>
                Upload Document
              </Button>
            </Card.Description>
          </Card.Content>
        </Card>
        {documentList.map((item, key) => {
          return (
            <Card fluid>
              <Card.Header><strong>{item.title}</strong></Card.Header>
              <Card.Content>

                <Card.Meta>Written By:  {item.owner?.username} - At <Moment format="YYYY/MM/DD hh:mm:ss">{item.creationTime}</Moment></Card.Meta>
                <Card.Description>
                  {item.content}<br />
                  <a href={"http://localhost:8080/api/document/loadfile?filename=" + item.url} className="fileUpload btn btn-orange" style={{width: "150px"}} >
                    <img src="https://image.flaticon.com/icons/svg/136/136549.svg" className="icon"/>
                    <span className="upl" id="upload">{(item.url === "") ? "file" : item.url}</span>
                  </a>
                </Card.Description>
              </Card.Content>
            </Card>
          )
        })}
      </div>
    );
  }
}

export default Documents;
