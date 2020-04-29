/*!

 =========================================================
 * Enterprise Web Software Development
 * Based on Light Bootstrap Dashboard React - v1.3.0
 * Based on Light Bootstrap Dashboard - v1.3.0
 =========================================================

*/

import React, { Component } from "react";
//import Card from "components/Card/Card.jsx";
import { Card, Button, Message } from 'semantic-ui-react'
import axios, { post } from 'axios';
import saveAs from 'file-saver';

class Export extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      success: false,
      error: false,
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
  }
  componentDidMount() {

  }
  onFormSubmit(e) {
    e.preventDefault() // Stop form submit
    this.fileUpload(this.state.file).then((response) => {
      if (response.data.status == "OK") {
        alert('success')
      } else {
        alert('error')
      }
    })
  }
  onChange(e) {
    this.setState({ file: e.target.files[0] })
  }
  fileUpload(file) {
    const url = 'http://localhost:8080/api/importexport/savefile';
    const formData = new FormData();
    formData.append('file', file)
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    return post(url, formData, config)
  }
  fileDownload() {
    fetch('http://localhost:8080/api/importexport/loadfile', {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      },
      responseType: 'blob'
    }).then(response => response.blob())
      .then(blob => saveAs(blob, 'Export Data.xlsx'));
  }

  render() {
    return (
      <div className="content">
        <Card fluid>
          <Card.Header><strong>Export data from system</strong></Card.Header>
          <Card.Content>
            <Card.Description>
              Click button to download.<br />
              <Button color="green" onClick={this.fileDownload}>
                Download
              </Button>
            </Card.Description>
          </Card.Content>
        </Card>
        <Card fluid>
          <Card.Header><strong>File Upload</strong></Card.Header>
          <Card.Content>
            <Card.Description>
              <form onSubmit={this.onFormSubmit}>
                <input type="file" onChange={this.onChange} />
                <button type="submit">Upload</button>
              </form>
            </Card.Description>
          </Card.Content>
        </Card>
      </div>
    );
  }
}

export default Export;
