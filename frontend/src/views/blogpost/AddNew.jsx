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
  }
  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }

  onSubmit = (title, content) => {
    
    return fetch(`http://localhost:8080/api/blogpost/save`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({title: title, content: content , user : { id : 1}})
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        if (data.status === "OK") {
          window.location.href = "/admin/blogposts";
        } else {
          console.log("error");
        }
      })
  }

  render() {
    console.log(this.state)
    return (
      <div className="content">
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
                    <form onSubmit={this.submitForm(this.state.title, this.state.content)} className=" margin-lr">
                      <fieldset>
                      <fieldset className="form-group">
                          <label>Title<span>*</span></label>
                          <input
                            className="form-control form-control-lg"
                            type="text"
                            placeholder="Blog title"
                            value={this.state.fullname} onChange={this.updateState('title')} required />
                        </fieldset>
                        <fieldset className="form-group">
                          <label>Content<span>*</span></label>
                          <textarea
                            className="form-control form-control-lg"
                            type="text"
                            placeholder="Blog content"
                            value={this.state.fullname} onChange={this.updateState('content')} required />
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
      </div>
    );
  }
}

export default BlogPosts;
