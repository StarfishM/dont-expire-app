import React from "react";
import Register from "./register";
import Login from "./login";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { WelcomeGrid, Right, Left } from "../StandardStyles";

export default function Welcome() {
  return (
    <WelcomeGrid>
      <Left>
        <span className="highlight">
          <h1>KGB</h1>
        </span>
        <span className="highlight">
          <h1>keep</h1>
        </span>
        <span className="highlight">
          <h1>good</h1>
        </span>
        <span className="highlight">
          <h1>from going bad</h1>
        </span>
      </Left>

      <BrowserRouter>
        <Route exact path="/" component={Register} />
        <Route path="/login" component={Login} />
        <Redirect path="*" to="/" />
      </BrowserRouter>
    </WelcomeGrid>
  );
}
