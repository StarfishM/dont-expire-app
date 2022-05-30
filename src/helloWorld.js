import PropTypes from "prop-types";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class HelloWorldText extends Component {
  render() {
    return (
      <div className="flex-start-self">
        <Link to="/">
          <h3
            style={{
              cursor: "pointer",
              color: "#192aa9",
              textDecoration: "none"
            }}
          >
            Hello {this.props.name}
          </h3>
        </Link>
      </div>
    );
  }
}

HelloWorldText.propTypes = {
  name: PropTypes.string.isRequired
};

export default HelloWorldText;
