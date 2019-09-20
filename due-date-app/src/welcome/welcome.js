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

                <h1>
                    A place for bakers and makers... Discover a beautiful mess
                    of <span className="highlight">inspiration </span>,
                    technics, insights,{" "}
                    <span className="highlight">tips & tricks </span>
                    to learn and teach. A sphere to showcase your
                    <span className="highlight"> projects</span> beyond the
                    filter palette of instagram
                </h1>
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
