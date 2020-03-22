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
      blogPostList: []
    }
  }

  componentDidMount() {
    fetch(`http://localhost:8080/api/blogpost/`, {
      method: "GET",
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ blogPostList: data });
      });
  }

  cutContentText(str) {
    return str.replace(/^(.{400}[^\s]*).*/, "$1");
  }

  render() {
    const blogPostList = this.state.blogPostList;
    return (
      <div className="content">

        {blogPostList.map((item, key) => {
          return (
            <Grid fluid>
              <Row>
                <Col md={12} className="padding-bot">
                  <Card
                    title={item.title}
                    category=""
                    ctTableFullWidth
                    ctTableResponsive
                    content={
                      <>
                        <i><div className="blog-creator">Written By: {item.user.fullname} - At <Moment format="YYYY/MM/DD">
                          {item.creationTime}
                        </Moment></div>
                        </i>
                        <div className="blog-content">{this.cutContentText(item.content)}...<a href="">view more</a></div>
                        
                      </>
                    }
                  />
                </Col>
              </Row>
            </Grid>
          )
        })}

      </div>

    );
  }
}

export default BlogPosts;
