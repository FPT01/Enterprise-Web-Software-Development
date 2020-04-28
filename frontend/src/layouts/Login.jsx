/*!

 =========================================================
 * Enterprise Web Software Development
 * Based on Light Bootstrap Dashboard React - v1.3.0
 * Based on Light Bootstrap Dashboard - v1.3.0
 =========================================================

*/

import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Logo from "../logo.jpg";

const recaptchaRef = React.createRef();

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      error: false,
    };

    this.updateState = field => ev => {
      const state = this.state;
      const newState = Object.assign({}, state, { [field]: ev.target.value });
      this.setState(newState);
    };

    this.submitForm = (username, password) => ev => {
      ev.preventDefault();
      // const recaptcha = recaptchaRef.current.getValue();
      this.onSubmit(username, password);
      // recaptchaRef.current.reset();
    };
  }

  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }

  onSubmit = (username, password) => {
    return this.fetch(`http://localhost:8080/api/user/login/`, {
      method: "POST",
      body: JSON.stringify({ username: username, password: password })
    })
    .then((response) => response.json())
    .then((data) => {
      let account = {};
      account.username = data.username;
      account.role = data.roleDTO.roleName;
      account.userid = data.id;
      window.localStorage.setItem('account', JSON.stringify(account));
      if( data.roleDTO.roleName.toLowerCase() === "admin"){
        window.location.href = "/admin/dashboard";
      }else if(data.roleDTO.roleName.toLowerCase() === "tutor"){
        window.location.href = "/tutor/dashboard";
      }else if (data.roleDTO.roleName.toLowerCase() === "student"){
        window.location.href = "/students/dashboard";
      }else if(data.roleDTO.roleName.toLowerCase() === "staff"){
        window.location.href = "/admin/dashboard";
      }
    })
    .catch(function(err) {
      alert("Username or password is invalid");
    });
  }

  fetch = (url, options) => {
    // performs api calls sending the required authentication headers
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    // Setting Authorization header
    // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx

    return fetch(url, {
      headers,
      ...options
    })
    .then(this.checkStatus)
  };

  getToken = () => {
    // Retrieves the user token from localStorage
    return localStorage.getItem("id_token");
  };

  setToken = (userRole, username, idToken) => {
    // Saves user token to localStorage
    var account = {};
    account.role = userRole;
    account.email = username;
    account.token = idToken;
    localStorage.setItem('account', JSON.stringify(account));
  };

  checkStatus = response => {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) {
      // Success status lies between 200 to 300
      return response;
    } else {
      var error = new Error(response.statusText);
    }
  };

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    return (
      <div id="page">
        <div className="wrapper fadeInDown">
          <div className="login-page">
            <div className="container page">
              <div className="inner-form">
                <div className="heading-title text-xs-center">
                  <div className="fpt-greenwich-logo"><img src={Logo} /></div>
                  <div className="heading-title">
                    <h2 className="active">Login</h2>
                  </div>
                </div>
                {(this.state.error) ? "Incorrect username or password." : ""}
                <form onSubmit={this.submitForm(this.state.username, this.state.password)}>
                  <fieldset>
                    <fieldset className="form-group">
                      <label htmlFor="username">Username<span>*</span></label>
                      <input
                        className="form-control form-control-lg"
                        type="text"
                        placeholder="Username" required
                        value={this.state.username} onChange={this.updateState('username')} />
                    </fieldset>
                    <fieldset className="form-group">
                      <label htmlFor="password">Password<span>*</span></label>
                      <input
                        className="form-control form-control-lg"
                        type="password"
                        placeholder="Password" required
                        value={this.state.password} onChange={this.updateState('password')} />
                    </fieldset>

                    <button
                      className="ui blue button"
                      type="submit" >
                      Sign in
                    </button>
                    <div className="forgot-password-link">
                      <a href="/forgot-password">Forgot Password ?</a>
                    </div>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login