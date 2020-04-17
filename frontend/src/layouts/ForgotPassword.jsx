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

class ForgotPassword extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      error: false,
    };

    this.updateState = field => ev => {
      const state = this.state;
      const newState = Object.assign({}, state, { [field]: ev.target.value });
      this.setState(newState);
    };

    this.submitForm = (email) => ev => {
      ev.preventDefault();
      // const recaptcha = recaptchaRef.current.getValue();
      this.onSubmit(email);
      // recaptchaRef.current.reset();
    };
  }

  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }

  onSubmit = (email) => {
    return this.fetch(`http://localhost:8080/api/resetpassword/save`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email})
    })
    .then((response) => response.json())
    .then((data) => {
      if(data.status === "OK"){
        window.location.href = "/";
      }else {
        window.location.href = "/forgot-password";
      }
    })
    .catch(function(err) {
      console.log('Request failed', err);
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
    console.log("this.state.error", this.state.error);
    return (
      <div id="page">
        <div className="wrapper fadeInDown">
          <div className="login-page">
            <div className="container page">
              <div className="inner-form">
                <div className="heading-title text-xs-center">
                  <div className="fpt-greenwich-logo"><img src={Logo} /></div>
                  <div className="heading-title">
                    <h2 className="active">Forgot Password</h2>
                  </div>
                </div>
                {(this.state.error) ? "Incorrect username or password." : ""}
                <form onSubmit={this.submitForm(this.state.email)}>
                  <fieldset>
                    <fieldset className="form-group">
                      <label htmlFor="email">Email<span>*</span></label>
                      <input
                        className="form-control form-control-lg"
                        type="text"
                        placeholder="Email" required
                        value={this.state.email} onChange={this.updateState('email')} />
                    </fieldset>
                    <button
                      className="btn btn-primary login-btn"
                      type="submit" >
                      Submit
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

export default ForgotPassword