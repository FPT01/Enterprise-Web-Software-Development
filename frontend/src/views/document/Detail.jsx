/*!

 =========================================================
 * Enterprise Web Software Development
 * Based on Light Bootstrap Dashboard React - v1.3.0
 * Based on Light Bootstrap Dashboard - v1.3.0
 =========================================================

*/

import React, { Component } from "react";
//import { Grid, Row, Col } from "react-bootstrap";
//import Card from "components/Card/Card.jsx";
import Moment from 'react-moment';

import queryString from 'query-string';

import { Card, Button, Divider, Form, Label, Grid } from 'semantic-ui-react'

class BlogPosts extends Component {
  intervalID;
  constructor(props) {
    super(props);
    this.state = {
      role: '',
      userid: '',
      commenttext: "",
    }
    this.updateState = field => ev => {
      const state = this.state;
      const newState = Object.assign({}, state, { [field]: ev.target.value });
      this.setState(newState);
    };

    this.submitForm = (fullname, username, password, status) => ev => {
      ev.preventDefault();
      this.onSubmit(fullname, username, password, status);
    };
  }
  componentWillUnmount() {
    clearTimeout(this.intervalID);
  }
  componentDidMount() {
    const account = window.localStorage.getItem('account');
    let role = JSON.parse(account).role;
    const userid = JSON.parse(account).userid;
    switch (role) {
      case 'student':
        role = 'students'
        break;
      case 'staff':
        role = 'admin'
        break;
      default:
    }
    this.setState({ role: role, userid: userid })
    this.fnGetDocument()
  }
  fnGetDocument = () => {
    const blogId = queryString.parse(this.props.location.search).id;
    fetch(`http://localhost:8080/api/document/findById/${blogId}/`, {
      headers: {
        'Content-Type': 'application/json'
      }, method: "GET",
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          ...data
        });
        this.intervalID = setTimeout(this.fnGetDocument.bind(this), 100000);
      });
  }
  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }
  fnDeleteBlog = (id) => {
    fetch(`http://localhost:8080/api/blogpost/delete/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        if (data.status === "OK") {

          alert('Delete succesfully')
          window.location.href = `/${this.state.role}/blogposts`
        } else {
          console.log("error");
        }
      })
  }
  fnDeleteComment = (id) => {
    fetch(`http://localhost:8080/api/blogcomment/delete/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        if (data.status === "OK") {

          alert('Delete succesfully')
          this.fnGetDocument()
        } else {
          console.log("error");
        }
      })
  }
  onSubmit = (commenttext) => {
    const account = window.localStorage.getItem('account');
    const userid = JSON.parse(account).userid;
    console.log(JSON.stringify({ content: commenttext, user: { id: userid }, documentDTO: { id: this.state.id } }))
    return fetch(`http://localhost:8080/api/documentComment/save`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: commenttext, user: { id: userid }, documentDTO: { id: this.state.id } })
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "OK") {
          this.setState({ commenttext: "" })
          this.fnGetDocument()
        } else {
          console.log("error");
        }
      })
  }

  render() {
    let comments = this.state.documentCommentDTOS
    comments = comments?.sort((a, b) => b.id - a.id)

    return (
      <div className="content">
        <Card fluid>
          <Card.Header><strong>{this.state.title}</strong></Card.Header>
          <Card.Content>
            <Card.Meta>Written By: {this.state.owner?.username} - At <Moment format="YYYY/MM/DD">{this.state.creationTime}</Moment>
            </Card.Meta>
            <Card.Description>
              {this.state.content}<br />
              <div className="fileUpload btn btn-orange">
                <img src="https://image.flaticon.com/icons/svg/136/136549.svg" className="icon" />
                <span className="upl" id="upload">{(this.state.url === "") ? "file" : this.state.url}</span>
              </div>
            </Card.Description>
          </Card.Content>
        </Card>
        <Card fluid>
          <Card.Header><strong>Comment(s)</strong></Card.Header>
          <Card.Content>
            <Card.Description>
              {comments?.map((item, key) => {
                const disabledComment = this.state.userid != item.user?.id;
                return (
                  <Card fluid>
                    <Card.Header>
                      <strong>{item.user?.username}</strong> said at: <Moment format="YYYY/MM/DD hh:mm:ss">{item.creationTime}</Moment>
                    </Card.Header>
                    <Card.Content>
                      <Card.Description>
                        {item.content}
                      </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      <Button color="red" onClick={() => this.fnDeleteComment(item.id)} disabled={disabledComment}>
                        Delete
                      </Button>
                    </Card.Content>
                  </Card>
                )
              })}
              <Card fluid>
                <Card.Content>
                  <Card.Description>
                    <form onSubmit={this.submitForm(this.state.commenttext)} className=" margin-lr">
                      <fieldset>
                        <fieldset className="form-group">
                          <label>Input Comment<span>*</span></label>
                          <textarea
                            className="form-control form-control-lg"
                            type="text"
                            rows={4}
                            placeholder="Put your comment here"
                            value={this.state.commenttext} onChange={this.updateState('commenttext')}
                            required
                          />
                        </fieldset>

                        <button
                          className="btn btn-primary margin-lr"
                          type="submit" >
                          Save
                        </button>
                        <button onClick={()=>{this.setState({commenttext: ''})}}
                          className="btn btn-danger margin-lr"
                          type="reset" >
                          Reset
                        </button>
                      </fieldset>
                    </form>
                  </Card.Description>
                </Card.Content>
              </Card>
            </Card.Description>
          </Card.Content>
        </Card>

      </div>

    );
  }
}

export default BlogPosts;
