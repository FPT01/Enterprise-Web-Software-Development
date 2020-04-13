/*!

 =========================================================
 * Enterprise Web Software Development
 * Based on Light Bootstrap Dashboard React - v1.3.0
 * Based on Light Bootstrap Dashboard - v1.3.0
 =========================================================

*/

import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import Card from "components/Card/Card.jsx";
import Moment from 'react-moment';

import queryString from 'query-string';

class BlogPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      title: "",
      content: "",
      creationTime: "",
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
  cutContentText(str) {
    return str.replace(/^(.{40}[^\s]*).*/, "$1");
  }
  componentDidMount() {
    console.log(this.props.location);
    const blogId=queryString.parse(this.props.location.search).id;
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
    console.log(JSON.stringify({ content: commenttext, user : { id : userid}, blogPost: { id: this.state.id} }));
    return fetch(`http://localhost:8080/api/blogcomment/save`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: commenttext, user : { id : 1}, blogPost: { id: this.state.id} })
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        if (data.status === "OK") {
          window.location.href = "/admin/blogdetail?id=" + this.state.id;
        } else {
          console.log("error");
        }
      })
  }

  render() {
    console.log(this.state)
    const prevBlog = this.state.id * 1 - 1;
    const nextBlog = this.state.id * 1 + 1;
    return (
      <div className="content">
        <div>
          <a href={"/admin/blogdetail?id=" + prevBlog}>
            <i className="fa fa-plus" /> Previous Blog
          </a>
          <a href={"/admin/blogdetail?id=" + nextBlog}>
            <i className="fa fa-plus" /> Next Blog
          </a>
        </div>
        <Grid fluid>
          <Row>
            <Col md={12} className="padding-bot">
              <Card
                title={this.state.title}
                category=""
                ctTableFullWidth
                ctTableResponsive
                content={
                  <>
                    <i>
                      <div className="blog-creator">Written By: {this.state.user?.username} - At :
                        <Moment format="YYYY/MM/DD">{this.state.creationTime}</Moment>
                      </div>
                    </i>
                    <div className="blog-content">{this.state.content}</div>
                    {this.state.blogComments?.map((item, key) => {
                      return (
                        <Grid fluid className="blog-comment-wrap" key={item.id}>
                          <Row>
                            <Col md={12} className="padding-bot">
                              <Card
                                title=""
                                category=""
                                ctTableFullWidth
                                ctTableResponsive
                                content={
                                  <>
                                    <i>
                                      <div className="blog-comment-creator">{item.user?.username} said at :
                                      <Moment format="YYYY/MM/DD">{item.creationTime}</Moment>
                                      </div>
                                    </i>
                                    <div className="blog-comment-content" >{item.content}</div>
                                  </>
                                }
                              />
                            </Col>
                          </Row>
                        </Grid>
                      )
                    })}
                    <Grid fluid className="blog-comment-wrap">
                      <Row>
                        <Col md={12} className="padding-bot">
                          <Card
                            title=""
                            category=""
                            ctTableFullWidth
                            ctTableResponsive
                            content={
                              <>
                                <form onSubmit={this.submitForm(this.state.commenttext)} className=" margin-lr">
                                  <fieldset>
                                    <fieldset className="form-group">
                                      <label>Input Comment<span>*</span></label>
                                      <textarea
                                        className="form-control form-control-lg"
                                        type="text"
                                        placeholder="Put your comment here"
                                        value={this.state.commenttext} onChange={this.updateState('commenttext')} />
                                    </fieldset>

                                    <button
                                      className="btn btn-primary login-btn"
                                      type="submit" >
                                      Save
                                    </button>

                                  </fieldset>
                                </form>

                              </>
                            }
                          />
                        </Col>
                      </Row>


                    </Grid>

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

export default BlogPosts;
