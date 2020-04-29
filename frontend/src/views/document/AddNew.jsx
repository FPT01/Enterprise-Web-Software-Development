import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  ControlLabel,
  FormControl
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { UserCard } from "components/UserCard/UserCard.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import queryString from 'query-string';



class AddNewDocument extends Component {
  constructor(props) {
    super(props);
    this.state =
    {
      username: "",
      textMessage: null,
      listMessage: [],
      listHistoryMessage: [],
      selectedFile: null,
      listDocuments: [],
      docTitle: "",
      urlFile: "",
      contents: "",
      ownerName: "",
    };

    this.updateState = field => ev => {
      const state = this.state;
      const newState = Object.assign({}, state, { [field]: ev.target.value });
      this.setState(newState);
    };

    this.submitForm = (title, url, content) => ev => {
      ev.preventDefault();
      // const recaptcha = recaptchaRef.current.getValue();
      this.onSubmit(title, url, content);
      // recaptchaRef.current.reset();
    };
  }

  // On file select (from the pop up) 
  onFileChange = event => {
    // Update the state 
    this.setState({ selectedFile: event.target.files[0] });

  };

  // On file upload (click the upload button) 
  onFileUpload = () => {
    // Create an object of formData 
    var formData = new FormData();

    formData.append("file", this.state.selectedFile);

    return fetch(`http://localhost:8080/api/document/savefile`, {
      method: "POST",
      body: formData
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "OK") {
          alert(data.message);
        } else {
          console.log("error");
        }
      })
  };

  downloadFile = (name) => {
    console.log("name", name);
    return fetch(`http://localhost:8080/api/document/loadfile?filename=${name}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((data) => {
        if (data.status === "OK") {
          alert(data.message);
        } else {
          console.log("error");
        }
      })
  }

  onSubmit = (title, url, content) => {
    const currentUser = JSON.parse(window.localStorage.getItem('account'));
    const newUrl = this.state.selectedFile.name;
    var url = window.location.pathname;
    var arr = url.split("/");
    return fetch(`http://localhost:8080/api/document/save`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: title, url: newUrl, content: content, user: { id: currentUser.userid } })
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        if (data.status === "OK") {
          alert(data.message);
          setTimeout(function () {
            window.location.href = "/" + arr[1] + "/documents";
          }, 700);
        } else {
          console.log("error");
        }
      })
  }


  // File content to be displayed after 
  // file upload is complete 
  fileData = () => {
    if (this.state.selectedFile) {
      return (
        <div>
          <p>File Name: {this.state.selectedFile.name}</p>
        </div>
      );
    } else {
      return (
        <div></div>
      );
    }
  };

  render() {
    var fileName = "";
    if (this.state.selectedFile) {
      fileName = this.state.selectedFile.name;
    }
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Card
              title="Add New Document"
              content={
                <div className="container">
                  <form onSubmit={this.submitForm(this.state.docTitle, this.state.urlFile, this.state.contents)}>
                    <div>
                      <div className="row uploadDoc">
                        <div className="col-sm-4">
                          <div className="fileUpload btn btn-orange">
                            <img src="https://image.flaticon.com/icons/svg/136/136549.svg" className="icon" />
                            <span className="upl" id="upload">Upload document</span>
                            <input type="file" className="upload up" id="up" onChange={this.onFileChange} />
                          </div>
                          <button className="ui button green" onClick={this.onFileUpload} style={{ margin: "10px 0 0" }}>
                            Upload
                              </button>
                        </div>
                        <fieldset className="col-sm-8">
                          <fieldset className="form-group">
                            <input
                              className="form-control form-control-lg"
                              type="text"
                              placeholder="Title"
                              value={this.state.docTitle} onChange={this.updateState('docTitle')} required />
                          </fieldset>

                          <fieldset className="form-group">
                            <input
                              className="form-control form-control-lg"
                              type="text"
                              placeholder="Contents"
                              value={this.state.contents} onChange={this.updateState('contents')} required />
                          </fieldset>
                        </fieldset>
                      </div>
                    </div>
                    <div className="text-center">
                      <button className="ui button blue" type="submit" >Submit</button>
                    </div>
                  </form>
                </div>
              }
            />
          </Row>
        </Grid>
      </div>
    );
  }
}

export default AddNewDocument;

