/*!

 =========================================================
 * Enterprise Web Software Development
 * Based on Light Bootstrap Dashboard React - v1.3.0
 * Based on Light Bootstrap Dashboard - v1.3.0
 =========================================================

*/

import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
//import Card from "components/Card/Card.jsx";
import Moment from 'react-moment';

import queryString from 'query-string';

import { Card, Button, Divider, Form, Label } from 'semantic-ui-react'

class BlogPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      title: "",
      content: "",
      creationTime: "",
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
  componentDidMount() {
    this.fnGetBlog()
  }
  fnGetBlog = () => {
    console.log(this.props.location);
    const blogId = queryString.parse(this.props.location.search).id;
    fetch(`http://localhost:8080/api/blogpost/findById/${blogId}/`, {
      headers: {
        'Content-Type': 'application/json'
      }, method: "GET",
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);

        this.setState({
          ...data
        });
      });
  }
  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
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
        console.log('Success:', data);
        if (data.status === "OK") {
          this.setState({ commenttext: "" })
          this.fnGetBlog()

          //window.location.href = "/admin/blogdetail?id=" + this.state.id;
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
    return (
      <div className="content">
        <Card fluid>
          <Card.Content>
            <Card.Description>
              <Button color="blue" onClick={() => window.location.href = "/admin/blogdetail?id=" + prevBlog} disabled={prevBlogBtn}>
                Previous
              </Button>
              <Button color="blue" onClick={() => window.location.href = "/admin/blogdetail?id=" + nextBlog} disabled={nextBlogBtn}>
                Next 
              </Button>
              <Button color="yellow" onClick={() => window.location.href = "/admin/edit-blog?id=" + this.state.id}>
                Edit
              </Button>
            </Card.Description>
          </Card.Content>
        </Card>
        <Card fluid>
          <Card.Header><strong>{this.state.title}</strong></Card.Header>
          <Card.Content>

            <Card.Meta>Written By: {this.state.user?.fullname} - At <Moment format="YYYY/MM/DD">{this.state.creationTime}</Moment></Card.Meta>
            <Card.Description>
              {this.state.content}
            </Card.Description>
          </Card.Content>
        </Card>
        <Card fluid>
          <Card.Header><strong>Comment(s)</strong></Card.Header>
          <Card.Content>
            <Card.Description>
              {this.state.blogComments?.map((item, key) => {
                return (
                  <Card fluid>
                    <Card.Header><strong>{item.user?.username}</strong> said at :
                    <Moment format="YYYY/MM/DD">{item.creationTime}</Moment></Card.Header>
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
                            value={this.state.commenttext} onChange={this.updateState('commenttext')} />
                        </fieldset>

                        <button
                          className="btn btn-primary margin-lr"
                          type="submit" >
                          Save
                        </button>
                        <button
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
