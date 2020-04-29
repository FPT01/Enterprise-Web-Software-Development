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
import { Card, Button, Divider, Form, Label } from 'semantic-ui-react'
import queryString from 'query-string';

class BlogPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      title: "",
      content: "",
    }
    this.updateState = field => ev => {
      const state = this.state;
      const newState = Object.assign({}, state, { [field]: ev.target.value });
      this.setState(newState);
    };

    this.submitForm = (title, content) => ev => {
      ev.preventDefault();
      this.onSubmit(title, content);
    };
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
      });
  }
  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }

  onSubmit = (title, content) => {
    const account = window.localStorage.getItem('account');
    const userid = JSON.parse(account).userid;
    return fetch(`http://localhost:8080/api/blogpost/save`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: this.state.id,
        title: title,
        content: content,
        user: {
          id: userid

        },
        creationTime: this.state.creationTime,
      })
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "OK") {
          window.location.href = `/${this.state.role}/blogdetail?id=` + this.state.id;
        } else {
          console.log("error");
        }
      })
  }

  render() {
    return (
      <div className="content">
        <Card fluid>
          <Card.Content>
            <Card.Description>
              <Button color="green" onClick={() => window.location.href = `/${this.state.role}/blogposts`}>
                Blog list
              </Button>
            </Card.Description>
          </Card.Content>
        </Card>

        <Card fluid>
          <Card.Content>
            <Card.Description>
              <form onSubmit={this.submitForm(this.state.title, this.state.content)} >
                <fieldset>
                  <fieldset className="form-group">
                    <label>Title<span>*</span></label>
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Blog title"
                      value={this.state.title} onChange={this.updateState('title')} required />
                  </fieldset>
                  <fieldset className="form-group">
                    <label>Content<span>*</span></label>
                    <textarea
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Blog content"
                      rows={10}
                      value={this.state.content} onChange={this.updateState('content')} required />
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
      </div>
    );
  }
}

export default BlogPosts;
