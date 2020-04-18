import React, { Component } from "react";
import ReactUploadFile from 'react-upload-file';


class Documents extends Component {
  constructor(props) {
    super(props);
    this.state =
      {
        username: "",
        textMessage: null,
        listMessage: [],
        listHistoryMessage: [],
        selectedFile: null,
        listDocuments: []
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
   
    // Update the formData object 
    // formData.append( 
    //   "myFile", 
    //   this.state.selectedFile, 
    //   this.state.selectedFile.name 
    // ); 

    formData.append("file", this.state.selectedFile);
   
    // Details of the uploaded file 
    // Request made to the backend api 
    // Send formData object 
    // axios.post("api/uploadfile", formData); 
    return fetch(`http://localhost:8080/api/document/savefile`, {
      method: "POST",
      body: formData
    })
    .then((response) => response.json())
    .then((data) => {
      if(data.status === "OK"){
        alert(data.message);
      }else {
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
      if(data.status === "OK"){
        alert(data.message);
      }else {
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
          <p> 
            Last Modified:{" "} 
            {this.state.selectedFile.lastModifiedDate.toDateString()} 
          </p> 

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
    if(this.state.selectedFile){
      fileName = this.state.selectedFile.name;
    }
    return ( 
      <div> 
          <div> 
              <input type="file" onChange={this.onFileChange} /> 
              <button onClick={this.onFileUpload}> 
                Upload! 
              </button> 
          </div> 
        {this.fileData()} 
        <a href={`http://localhost:8080/api/document/loadfile?filename=${fileName}`} className="ui blue button">Download</a>
      </div> 
    ); 
  } 
} 

export default Documents;

