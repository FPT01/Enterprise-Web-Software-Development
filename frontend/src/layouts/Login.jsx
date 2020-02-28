/*!

 =========================================================
 * Enterprise Web Software Development
 * Based on Light Bootstrap Dashboard React - v1.3.0
 * Based on Light Bootstrap Dashboard - v1.3.0
 =========================================================

*/

import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";

const recaptchaRef = React.createRef();

class Login extends React.Component {
  constructor() {
    super();
    this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
    this.changePassword = ev => this.props.onChangePassword(ev.target.value);
    this.changeRecaptcha = ev => this.props.onChangeRecaptcha(ev.target.value);
    this.submitForm = (email, password) => ev => {
      ev.preventDefault();
      const recaptcha = recaptchaRef.current.getValue();
      this.props.onSubmit(email, password, recaptcha);
      recaptchaRef.current.reset();
    };
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const email = this.props.email;
    const password = this.props.password;
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
                <form onSubmit={this.submitForm(email, password)}>
                  <fieldset>
                    <fieldset className="form-group">
                      <label htmlFor="email">Email<span>*</span></label>
                      <input
                        className="form-control form-control-lg"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={this.changeEmail} />
                    </fieldset>

                    <fieldset className="form-group">
                      <label htmlFor="password">Mật khẩu<span>*</span></label>
                      <input
                        className="form-control form-control-lg"
                        type="password"
                        placeholder="Mật khẩu"
                        value={password}
                        onChange={this.changePassword} />
                    </fieldset>
                    <div className="recaptcha-block">
                      <ReCAPTCHA ref={recaptchaRef} sitekey="6LcUurAUAAAAAAd9IDibqeoHlYS3MlMxG3cj0o_i" onChange={this.changeRecaptcha} />
                    </div>
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