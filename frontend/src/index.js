/*!

 =========================================================
 * Enterprise Web Software Development
 * Based on Light Bootstrap Dashboard React - v1.3.0
 * Based on Light Bootstrap Dashboard - v1.3.0
 =========================================================

*/
import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/sass/light-bootstrap-dashboard-react.scss?v=1.3.0";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";

import AdminLayout from "layouts/Admin.jsx";
import TutorLayout from "layouts/Tutor.jsx";
import StudentLayout from "layouts/Student.jsx";
import Login from "layouts/Login.jsx";
import ForgotPassword from "layouts/ForgotPassword.jsx";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/login" render={props => <Login {...props} />} />
      <Route path="/admin" render={props => <AdminLayout {...props} />} />
      <Route path="/tutor" render={props => <TutorLayout {...props} />} />
      <Route path="/students" render={props => <StudentLayout {...props} />} />
      <Route path="/forgot-password"  component={ForgotPassword} />
      <Redirect from="/" to="/login" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
