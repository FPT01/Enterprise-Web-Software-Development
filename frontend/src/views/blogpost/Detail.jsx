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
      id: "",
      title: "",
      content: "",
      creationTime: "",
      modifiedTime: "",
      commenttext: "",
      prevBlog: 0,
      prevBlogBtn: true,
      nextBlog: 0,
      nextBlogBtn: true,
      currBlog: 0,
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
  cutContentText(str) {
    return str.replace(/^(.{40}[^\s]*).*/, "$1");
  }
  componentWillUnmount() {
    /*
      stop getData() from continuing to run even
      after unmounting this component. Notice we are calling
      'clearTimeout()` here rather than `clearInterval()` as
      in the previous example.
    */
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
    this.fnGetBlog()
  }
  fnGetBlog = () => {
    const blogId = queryString.parse(this.props.location.search).id;
    fetch(`http://localhost:8080/api/blogpost/findById/${blogId}/`, {
      headers: {
        'Content-Type': 'application/json'
      }, method: "GET",
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          ...data
        });
        this.intervalID = setTimeout(this.fnGetBlog.bind(this), 1000);
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
        console.log('Success:', data, id);
        if (data.status === "OK") {

          alert('Delete succesfully')
          this.fnGetBlog()
        } else {
          console.log("error");
        }
      })
  }
  onSubmit = (commenttext) => {
    const account = window.localStorage.getItem('account');
    const userid = JSON.parse(account).userid;
    return fetch(`http://localhost:8080/api/blogcomment/save`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: commenttext, user: { id: userid }, blogPost: { id: this.state.id } })
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "OK") {
          this.setState({ commenttext: "" })
          this.fnGetBlog()
        } else {
          console.log("error");
        }
      })
  }

  render() {
    const prevBlog = this.state.id * 1 - 1
    const prevBlogBtn = !(this.state.id * 1 - 1) > 0
    const nextBlog = this.state.id * 1 + 1
    const nextBlogBtn = !(this.state.id * 1 + 1) > 0
    const disabledEdit = this.state.userid != this.state.user?.id;
    let comments = this.state.blogComments

    comments = comments?.sort((a, b) => b.id - a.id)

    return (
      <div className="content">
        <Card fluid>
          <Card.Content>
            <Card.Description>
              <Button color="yellow" onClick={() => window.location.href = `/${this.state.role}/edit-blog?id=` + this.state.id} disabled={disabledEdit}>
                Edit
              </Button>
            </Card.Description>
          </Card.Content>
        </Card>
        <Card fluid>
          <Card.Header><strong>{this.state.title}</strong></Card.Header>
          <Card.Content>

            <Card.Meta>Written By: <strong>{this.state.user?.fullname}</strong> - create at <Moment format="YYYY/MM/DD hh:mm:ss">{this.state.creationTime}</Moment>,
                        last change at <Moment format="YYYY/MM/DD hh:mm:ss">{this.state.modifiedTime}</Moment>
            </Card.Meta>
            <Card.Description>
              {this.state.content}
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
                        <button
                          className="btn btn-danger margin-lr"
                          type="reset" 
                          onClick={()=>{this.setState({commenttext: ''})}}>
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
