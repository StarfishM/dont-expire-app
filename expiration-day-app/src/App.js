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
import {
  NavbarItem,
  MainContentGrid,
  BoxOne,
  BoxTwo,
  BoxThree
} from "./StandardStyles";
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
              <a href="/logout">
                <NavbarItem src="./logout.png" alt="" />
              </a>

              <Link to="/search">
                <NavbarItem src="search_icon.png" alt="" />
              </Link>
              <Link to="/item-Tinder">
                <NavbarItem src="./item-tinder.png" alt="" />
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
            <Route
              exact
              path="/"
              render={() => {
                return (
                  <MainContentGrid>
                    <BoxOne>
                      <Link to="/search">
                        <div className="transparent-box">
                          <h2 className="dashboard">search food database</h2>
                        </div>
                      </Link>
                    </BoxOne>
                    <BoxTwo>
                      <h1 style={{ color: "#567f5d", fontWeight: "bold" }}>
                        "The average German wastes 55 kilos of food per year.
                        <br />
                        Let's start making that number go down!"
                      </h1>
                    </BoxTwo>
                    <BoxThree>
                      <div className="transparent-box">
                        <h2 className="dashboard">calendar coming soon...</h2>
                      </div>
                    </BoxThree>
                  </MainContentGrid>
                );
              }}
            />
          </BrowserRouter>
          <footer className="footer">
            <p>KGB</p>
            <p>made with ❤︎ by Merle Fischer</p>
            <p> @SPICED Academy 2019</p>
          </footer>
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
