/*!

 =========================================================
 * Enterprise Web Software Development
 * Based on Light Bootstrap Dashboard React - v1.3.0
 * Based on Light Bootstrap Dashboard - v1.3.0
 =========================================================

*/

import React, { Component } from "react";
import { Grid, Row, Col, Table} from "react-bootstrap";
import Card from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

class BlogPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogPostList: []
    }
  }

  fnDeleteTutor = (key) => {
    fetch(`http://localhost:8080/api/tutor/delete/${key}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        if (data.status === "OK") {
          window.location.reload();
        } else {
          console.log("error");
        }
      })
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

  render() {
    const blogPostList = this.state.blogPostList;
    return (
      <div className="content">
      
      {blogPostList.map((item, key) => {
        return (
          <Grid fluid>
        <Row>
          <Col md={12}>
            <Card
              title={item.title}
              category=""
              ctTableFullWidth
              ctTableResponsive
              content={
                <>
                  <div>{item.content}</div>
                  
                  
                </>
              }
            />
          </Col>
        </Row>
        </Grid>
        )})}
      
    </div>

    );
  }
}

export default BlogPosts;
