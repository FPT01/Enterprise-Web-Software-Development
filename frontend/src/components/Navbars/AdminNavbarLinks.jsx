/*!

 =========================================================
 * Enterprise Web Software Development
 * Based on Light Bootstrap Dashboard React - v1.3.0
 * Based on Light Bootstrap Dashboard - v1.3.0
 =========================================================

*/

import React, { Component } from "react";
import { NavItem, Nav, NavDropdown, MenuItem } from "react-bootstrap";

class AdminNavbarLinks extends Component {
  onClickLogout = () => {
    window.localStorage.setItem('account', null);
    window.location.href = "/login";
  }
  render() {
    const currentUser = JSON.parse(window.localStorage.getItem('account'));
    return (
      <>
      <NavItem eventKey={1} href="#" className="welcome-item">
        <h4><i className="fa fa-user-circle-o" aria-hidden="true"></i> {currentUser.username}</h4>
      </NavItem>
      <NavItem eventKey={3} href="#" onClick={this.onClickLogout} className="welcome-item">
        <i className="fa fa-sign-out" aria-hidden="true"></i> Logout
      </NavItem>
      </>
    );
  }
}

export default AdminNavbarLinks;
