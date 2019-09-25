import React from "react";
import axios from "../axios";
import { Link } from "react-router-dom";

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
      <div>
        {error && (
          <div>
            <h2>
              Oooooooooops something went wrong in the registration process
            </h2>
          </div>
        )}
        <form>
          <label htmlFor="first">First Name</label>
          <input
            name="first"
            // placeholder="firstname"
            onChange={this.handleChange}
          />

          <label htmlFor="last">Last Name</label>
          <input
            name="last"
            // placeholder="lastname"
            onChange={this.handleChange}
          />

          <label htmlFor="email">E-Mail </label>
          <input
            name="email"
            // placeholder="e-m@il"
            onChange={this.handleChange}
          />

          <label htmlFor="password"> Password</label>
          <input
            type="password"
            name="password"
            // placeholder="password"
            onChange={this.handleChange}
          />

          <button onClick={this.handleSubmit}> Submit </button>
        </form>
        <p>
          Already signed up? <Link to="/login">Log in</Link>
        </p>
      </div>
    );
  }
}
