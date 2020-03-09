/*!

 =========================================================
 * Enterprise Web Software Development
 * Based on Light Bootstrap Dashboard React - v1.3.0
 * Based on Light Bootstrap Dashboard - v1.3.0
 =========================================================

*/

import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

const recaptchaRef = React.createRef();

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
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
    return this.fetch(`http://localhost:8080/api/user/login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, password: password })
    })
      .then((response) => response.json())
      .then((data) => {
        let account = {};
        account.username = data.username;
        account.role = data.roleDTO.roleName;
        window.localStorage.setItem('account', JSON.stringify(account));

        if( data.roleDTO.roleName == "admin")
          window.location.href = "/admin";
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
    if (this.loggedIn()) {
      headers["Authorization"] = "Bearer " + this.getToken();
    }

    return fetch(url, {
      headers,
      ...options
    })
      .then(this._checkStatus)
  };

  loggedIn = () => {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken(); // Getting token from localstorage
    return !!token && !this.isTokenExpired(token); // handwaiving here
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

  _checkStatus = response => {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) {
      // Success status lies between 200 to 300
      return response;
    } else {
      var error = new Error(response.statusText);
      // error.response = response;
      // throw error;
      console.log(error);
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
                  <div className="heading-title">
                    <h2 className="active">Đăng Nhập</h2>
                  </div>
                </div>
                <form onSubmit={this.submitForm(this.state.username, this.state.password)}>
                  <fieldset>
                    <fieldset className="form-group">
                      <label htmlFor="username">Email<span>*</span></label>
                      <input
                        className="form-control form-control-lg"
                        type="text"
                        placeholder="Username"
                        value={this.state.username} onChange={this.updateState('username')} />
                    </fieldset>

                    <fieldset className="form-group">
                      <label htmlFor="password">Mật khẩu<span>*</span></label>
                      <input
                        className="form-control form-control-lg"
                        type="password"
                        placeholder="Mật khẩu"
                        value={this.state.password} onChange={this.updateState('password')} />
                    </fieldset>
                    <button
                      className="btn btn-primary login-btn"
                      type="submit" >
                      Đăng Nhập
                    </button>

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