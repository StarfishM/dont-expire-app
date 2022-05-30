import { Link } from "react-router-dom";
import React from "react";
import axios from "../axios";
import { Right, InputField, Button } from "../StandardStyles";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    console.log("change.event", e.target.value);
    this.setState(
      {
        [e.target.name]: e.target.value
      },
      () => console.log("state after set Value:", this.state)
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log("handleSubmit", e);
    console.log("State Value in handleSubmit", this.state);
    let user = {};
    user = this.state;
    axios
      .post("/login", user)
      .then(resp => {
        if (resp.data.success === true) {
          console.log("User logged in");
          window.location.replace("/");
        } else {
          this.setState({
            error: true
          });
        }
        console.log("Server Response on POST login:", resp);
      })
      .catch(e => {
        console.log("error in POST /login:", e);
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
            <h2>Login failed</h2>
          </div>
        )}
        <form>
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
          Not a member yet? <Link to="/"> Register </Link>
        </p>
      </Right>
    );
  }
}
