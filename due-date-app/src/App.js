import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import HelloWorldText from "./HelloWorld";
import StockPantry from "./app/stockPantry";
import Calendar from "react-calendar";
import Pantry from "./app/pantry";
import SearchItems from "./app/searchItems";
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      date: new Date()
    };
  }
  onChange = date => {
    console.log("*******state", this.state);

    this.setState({ date });
  };
  componentDidMount() {
    console.log("APP component mounted");
  }
  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <HelloWorldText name="Merle" />
          <a href="/logout">Logout</a>
          <Route path="/pantry" component={Pantry} />
          <Route path="/search" component={SearchItems} />
          <Route path="/stock-pantry" component={StockPantry} />
          <Route
            path="/calendar"
            component={Calendar}
            onChange={this.onChange}
            value={this.state.date}
          />
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

//
//
//
