import React from "react";
import Register from "./register";
import Login from "./login";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

export default function Welcome() {
  return (
    <div className="welcome-page">
      <div className="info-box-half-page">
        <span className="highlight">
          <h1>Shit I make</h1> <h1>Stuff I bake</h1>
        </span>

        <h1>SOME INFO TEXT</h1>
      </div>
      <div className="welcome-container">
        <BrowserRouter>
          <div>
            <Route exact path="/" component={Register} />
            <Route path="/login" component={Login} />
            <Redirect path="*" to="/" />
          </div>
        </BrowserRouter>
      </div>
    </div>
  );
}
