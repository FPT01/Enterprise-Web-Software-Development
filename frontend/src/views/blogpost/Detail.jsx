/*!

 =========================================================
 * Enterprise Web Software Development
 * Based on Light Bootstrap Dashboard React - v1.3.0
 * Based on Light Bootstrap Dashboard - v1.3.0
 =========================================================

*/

import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import Card from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import Moment from 'react-moment';

class BlogPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogDetail: []
    }
  }

  componentDidMount() {
    fetch(`http://localhost:8080/api/blogpost/`, {
      method: "GET",
    })
      .then(response => response.json())
      .then(data => {
       // this.setState({ blogDetail: data });
      });
  }

  render() {
    const blogDetail = this.state.blogDetail;
    return (
      <div className="content">
            <Grid fluid>
              <Row>
                <Col md={12} className="padding-bot">
                  <Card
                    title={blogDetail.title}
                    category=""
                    ctTableFullWidth
                    ctTableResponsive
                    content={
                      <>
                        <i><div className="blog-creator">Written By: {blogDetail} - At <Moment format="YYYY/MM/DD">
                          {blogDetail.creationTime}
                        </Moment></div>
                        </i>
                        <div className="blog-content">{blogDetail.content}</div>
                        
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
