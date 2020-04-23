/*!

 =========================================================
 * Enterprise Web Software Development
 * Based on Light Bootstrap Dashboard React - v1.3.0
 * Based on Light Bootstrap Dashboard - v1.3.0
 =========================================================

*/

import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import AdminNavbarLinks from "../Navbars/AdminNavbarLinks.jsx";

import logo from "assets/img/greenwich-logo.png";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      userRole: '',
    };
  }
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  updateDimensions() {
    this.setState({ width: window.innerWidth });
  }
  componentDidMount() {
    const currentUser = JSON.parse(window.localStorage.getItem('account'));
    this.setState({
      userRole: currentUser.role
    });
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }
  render() {
    const sidebarBackground = {
      backgroundImage: "url(" + this.props.image + ")"
    };
    var role = `${this.state.userRole}`;
    return (
      <div
        id="sidebar"
        className="sidebar"
        data-color={this.props.color}
        data-image={this.props.image}
      >
          {this.props.hasImage ? (
            <div className="sidebar-background" />
          ) : (
            null
          )}
        <div className="logo">
          <a
            href="#"
            className="simple-text logo-mini"
          >
            <div className="logo-img">
              <img src={logo} alt="logo_image" />
            </div>
          </a>
          <a
            href="#"
            className="simple-text logo-normal"
          >
            Enterprise
          </a>
        </div>
        <div className="sidebar-wrapper">
          <ul className="nav">
            {this.state.width <= 991 ? <AdminNavbarLinks /> : null}
            {this.props.routes.map((prop, key) => {
              if(role.toLowerCase() === prop.role){
                if (!prop.redirect)
                  if(prop.subNav){
                    return (
                      <></>
                    );
                  }else {
                    return (
                      <li key={key}
                        className={
                          prop.subNav
                            ? ""
                            : this.activeRoute(prop.layout + prop.path)
                        }
                        key={key}
                      >
                        <NavLink
                          style={{"display": "flex"}}
                          to={prop.layout + prop.path}
                          className="nav-link"
                          activeClassName="active"
                        >
                          <i className={prop.icon} />
                          <p>{prop.name}</p>
                        </NavLink>
                      </li>
                    );
                  }
                  return (
                    <li style={(prop.subNav) ? {display: "none"} : {display: "block"}}
                      className={prop.subNav ? "sub-nav" : this.activeRoute(prop.layout + prop.path)}
                    >
                      <NavLink style={{"display": "flex"}} to={prop.layout + prop.path} className="nav-link" activeClassName="active">
                        <i className={prop.icon} />
                        <p>{prop.name}</p>
                      </NavLink>
                    </li>
                  );
                return null;
              }
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default Sidebar;
