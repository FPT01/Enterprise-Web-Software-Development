import React from "react";
import {
  Grid,
  Row,
  Col,
  ControlLabel,
  FormControl
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import { UserCard } from "components/UserCard/UserCard.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

class ForgotPassword extends React.Component {
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Card
                title="Change Password"
                className="change-password"
                content={
                  <form>
                    <FormInputs
                      ncols={["col-md-12", "col-md-12", "col-md-12"]}
                      properties={[
                        {
                          label: "Current Password",
                          type: "password",
                          bsClass: "form-control",
                          placeholder: "Current Password",
                          defaultValue: ""
                        },
                        {
                          label: "New Password",
                          type: "password",
                          bsClass: "form-control",
                          placeholder: "New Password",
                          defaultValue: ""
                        },
                        {
                          label: "Re-enter New Password",
                          type: "password",
                          bsClass: "form-control",
                          placeholder: "Confirm Password"
                        }
                      ]}
                    />
                    <Button bsStyle="info" pullRight fill type="submit">
                      Save
                    </Button>
                    <div className="clearfix" />
                  </form>
                }
              />
          </Row>
        </Grid>
      </div>
    );
  }
}

export default ForgotPassword
