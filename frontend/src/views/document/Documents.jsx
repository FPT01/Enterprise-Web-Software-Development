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
        selectedFile: null
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

    formData.append("file", this.state.selectedFile.name);
   
    // Details of the uploaded file 
    console.log(this.state.selectedFile, formData); 
    // Request made to the backend api 
    // Send formData object 
    // axios.post("api/uploadfile", formData); 
    return fetch(`http://localhost:8080/api/document/savefile`, {
      method: "POST",
      body: formData
    })
    .then((response) => response.json())
    .then((data) => {
      
    })
  }; 
     
  // File content to be displayed after 
  // file upload is complete 
  fileData = () => { 
    if (this.state.selectedFile) { 
      return ( 
        <div> 
          <h2>File Details:</h2> 
          <p>File Name: {this.state.selectedFile.name}</p> 
          <p>File Type: {this.state.selectedFile.type}</p> 
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
    return ( 
      <div> 
          <div> 
              <input type="file" onChange={this.onFileChange} /> 
              <button onClick={this.onFileUpload}> 
                Upload! 
              </button> 
          </div> 
        {this.fileData()} 
      </div> 
    ); 
  } 
} 

export default Documents;

