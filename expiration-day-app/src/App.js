import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserItems } from "./actions";
import { BrowserRouter, Route, Link } from "react-router-dom";
import HelloWorldText from "./helloWorld";
import ExpiryCalendar from "./app/calendar";
import ItemList from "./app/ItemList";
import SearchItems from "./app/searchItems";
import ItemTinder from "./app/ItemTinder";
import ExpiryList from "./app/ExpiryList";
// import styled from "styled-components";

class App extends Component {
  constructor() {
    super();
    this.state = {
      date: new Date()
    };
  }

  onChange = date => {
    this.setState({ date });
  };

  componentDidMount() {
    this.props.dispatch(getUserItems());

    console.log("APP MOUNTED");
  }

  render() {
    return (
      <React.Fragment>
        <div className="main-grid">
          <BrowserRouter>
            <div className="nav-bar">
              <HelloWorldText name={this.props.first} />
              <a href="/logout">Logout</a>
              <Link to="/search">
                <img className="icon" src="search_icon.png" alt="" />
              </Link>
              <Link to="/item-Tinder">
                <img className="icon" src="./item-tinder.png" alt="" />
              </Link>
              <ExpiryList />
              <ItemList
                img_url="./shopping_card_icon.png"
                disp_function=""
                onShoppingList={true}
              />
              <ItemList
                img_url="./home_icon.png"
                disp_function=""
                onShoppingList={false}
              />
            </div>
            <Route path="/search" component={SearchItems} />
            <Route
              path="/calendar"
              component={ExpiryCalendar}
              onChange={this.onChange}
              value={this.state.date}
            />
            <Route path="/item-tinder" component={ItemTinder} />
          </BrowserRouter>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    items: state.items,
    first: state.first
  };
};

export default connect(mapStateToProps)(App);
