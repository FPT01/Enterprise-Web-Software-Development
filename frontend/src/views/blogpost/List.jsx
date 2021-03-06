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
  intervalID;
  constructor(props) {
    super(props);
    this.state = {
      blogPostList: [],
      role: ''
    }
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
    this.fnGetBlogs();

  }

  fnGetBlogs = () => {
    fetch(`http://localhost:8080/api/blogpost/`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: "GET",
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ blogPostList: data });
        this.intervalID = setTimeout(this.fnGetBlogs.bind(this), 1000);
      });
  }

  cutContentText(str) {
    return str.split(' ').slice(0, 100).join(' ')
  }

  render() {
    let blogPostList = this.state.blogPostList;
    blogPostList = blogPostList.sort((a, b) => b.id - a.id)
    console.table(blogPostList)
    return (
      <div className="content">
        <Card fluid>
          <Card.Content>
            <Card.Description>
              <Button color="green" onClick={() => window.location.href = `/${this.state.role}/add-new-blog`}>
                Create Blog
              </Button>
            </Card.Description>
          </Card.Content>
        </Card>
        {blogPostList.map((item, key) => (
          <Card fluid link onClick={() => window.location.href = `/${this.state.role}/blogdetail?id=` + item.id}>
            <Card.Header><strong>{item.title}</strong></Card.Header>
            <Card.Content>

              <Card.Meta>Written By: {item.user?.fullname} - At <Moment format="YYYY/MM/DD hh:mm:ss">{item.creationTime}</Moment></Card.Meta>
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
