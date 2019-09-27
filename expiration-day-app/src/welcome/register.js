import React from "react";
import axios from "../axios";
import { Link } from "react-router-dom";
import { Right, InputField, Button } from "../StandardStyles";

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let user = {};
    user = this.state;
    axios
      .post(
        //
        "/register",
        user
      )
      .then(resp => {
        if (resp.data.success === true) {
          console.log("New user created");
          window.location.replace("/item-Tinder");
        } else {
          this.setState({
            error: true
          });
        }
        console.log("Server Response on POST register:", resp);
      })
      .catch(e => {
        console.log("error in handleSubmit:", e);
        this.setState({
          error: true
        });
      });
  }
  render() {
    let error = this.state.error;
    return (
      <Right>
        {error && (
          <div>
            <h2>
              Oooooooooops something went wrong in the registration process
            </h2>
          </div>
        )}
        <form>
          <label htmlFor="first">First Name</label>
          <InputField
            name="first"
            // placeholder="firstname"
            onChange={this.handleChange}
          />

          <label htmlFor="last">Last Name</label>
          <InputField
            name="last"
            // placeholder="lastname"
            onChange={this.handleChange}
          />

          <label htmlFor="email">E-Mail </label>
          <InputField
            name="email"
            // placeholder="e-m@il"
            onChange={this.handleChange}
          />

          <label htmlFor="password"> Password</label>
          <InputField
            type="password"
            name="password"
            // placeholder="password"
            onChange={this.handleChange}
          />

          <Button primary onClick={this.handleSubmit}>
            {" "}
            Submit{" "}
          </Button>
        </form>
        <p>
          Already signed up? <Link to="/login">Log in</Link>
        </p>
      </Right>
    );
  }
}
