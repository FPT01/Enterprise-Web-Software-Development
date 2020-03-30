/*!

 =========================================================
 * Enterprise Web Software Development
 * Based on Light Bootstrap Dashboard React - v1.3.0
 * Based on Light Bootstrap Dashboard - v1.3.0
 =========================================================

*/

import React, { Component } from "react"; import { Grid, Row, Col, Table } from "react-bootstrap";
import Card from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import Moment from 'react-moment';

class BlogPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      title: "",
      content: "",
      creationTime: "",


    }
  }
  cutContentText(str) {
    return str.replace(/^(.{40}[^\s]*).*/, "$1");
  }
  componentDidMount() {
    fetch(`http://localhost:8080/api/blogpost/findById/1/`, {
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

  render() {
    console.log(this.state)
    return (
      <div className="content">
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
                    { this.state.blogComments?.map((item, key) => {
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
                        </Grid>)
                    })}

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
