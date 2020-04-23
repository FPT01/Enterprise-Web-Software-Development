/*!

 =========================================================
 * Enterprise Web Software Development
 * Based on Light Bootstrap Dashboard React - v1.3.0
 * Based on Light Bootstrap Dashboard - v1.3.0
 =========================================================

*/
import React, { Component } from "react";
import Moment from 'react-moment';
import { Card, Button } from 'semantic-ui-react'

class BlogPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogPostList: []
    }
  }

  componentDidMount() {
    fetch(`http://localhost:8080/api/blogpost/`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: "GET",
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ blogPostList: data });
      });
  }

  cutContentText(str) {
    return str?.replace(/^(.{400}[^\s]*).*/, "$1");
  }

  render() {
    const blogPostList = this.state.blogPostList;
    return (
      <div className="content">
        <Card fluid>
          <Card.Content>
            <Card.Description>
              <Button color="green" onClick={() => window.location.href = "/admin/add-new-blog"}>
                Create blog
              </Button>
            </Card.Description>
          </Card.Content>
        </Card>
        {blogPostList.map((item, key) => (
          <Card fluid link onClick={() => window.location.href = "/admin/blogdetail?id=" + item.id}>
            <Card.Header><strong>{item.title}</strong></Card.Header>
            <Card.Content>

              <Card.Meta>Written By: {item.user?.fullname} - At <Moment format="YYYY/MM/DD">{item.creationTime}</Moment></Card.Meta>
              <Card.Description>
                {this.cutContentText(item.content)}...
              </Card.Description>
            </Card.Content>
          </Card>
        )
        )}

      </div>

    );
  }
}

export default BlogPosts;
