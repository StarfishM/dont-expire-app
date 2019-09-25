import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserItems, getExpiryItems } from "./actions";
import { BrowserRouter, Route, Link } from "react-router-dom";
import HelloWorldText from "./helloWorld";
import Calendar from "react-calendar";
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
  }

  render() {
    return (
      <React.Fragment>
        <div className="main-grid">
          <BrowserRouter>
            <div className="nav-bar">
              <HelloWorldText name="Merle" />
              <a href="/logout">Logout</a>
              <Link to="/search">
                <img className="icon" src="search_icon.png" alt="" />
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
              component={Calendar}
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
  // console.log("********STATE", state);
  return {
    items: state.items
  };
};

export default connect(mapStateToProps)(App);

// <Link to="/expiry-list">
//   <img className="icon" src="expired_icon.png" alt="" />
// </Link>
