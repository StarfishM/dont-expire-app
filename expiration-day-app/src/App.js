import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import HelloWorldText from "./helloWorld";
import StockPantry from "./app/stockPantry";
import Calendar from "react-calendar";
import ItemList from "./app/ItemList";
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

          <Route path="/search" component={SearchItems} />
          <ItemList
            img_url="./shopping_card_icon.png"
            disp_function=""
            onShoppingList="true"
          />
          <ItemList
            img_url=""
            disp_function="./home_icon.png"
            onShoppingList="false"
          />
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
