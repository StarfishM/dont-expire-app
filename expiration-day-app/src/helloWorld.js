import PropTypes from "prop-types";
import React, { Component } from "react";

class HelloWorldText extends Component {

    render() {
        return (
            <div>
                <div>Hello {this.props.name}</div>
            </div>
        );
    }
}

HelloWorldText.propTypes = {
    name: PropTypes.string.isRequired
};

export default HelloWorldText;
