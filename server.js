const express = require("express");
const app = (exports.app = express());
const compression = require("compression");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
// const { requireLogin, requireNoLogin } = require("./utils/middlewarerouting");
const server = require("http").Server(app);
const io = (exports.io = require("socket.io")(server, {
    origins: "localhost:8080",
}));
const path = require("path");

//___________SERVE STATIC FILES__________________
// app.use(express.static("./public"));

app.use(compression());
//___________BOILER PLATE FOR REQ.BODY POST REQ NOT TO BE EMPTY____________
app.use(express.json());

const cookieSessionMiddleware = cookieSession({
    maxAge: 1000 * 60 * 60 * 24 * 14,
    secret:
        process.env.NODE_ENV === "production"
            ? process.env.SESS_SECRET
            : require("./secrets.json").secret,
});

app.use(cookieSessionMiddleware);
io.use((socket, next) => {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

app.use(csurf());

app.use(function (req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

app.get("/logout", (req, res) => {
    console.log("hit logout route");
    req.session = null;
    res.redirect("/welcome");
});

//////////////////////////////////////
///////////////Routes////////////////
////////////////////////////////////
require("./routes/logregroutes");
require("./routes/pantryroutes");
require("./routes/expirationroutes");

// Route for not logged in users
const requireLogin = (req, res, next) => {
    if (!req.session.user) {
        res.redirect("/welcome");
    } else {
        next();
    }
};

const requireNoLogin = (req, res, next) => {
    if (req.session.user) {
        res.redirect("/");
    } else {
        next();
    }
};

app.use(function (req, res, next) {
    console.log("+++++++ req.url", req.url);
    console.log("####### req.session", req.session);
    next();
});

app.get("/welcome", requireNoLogin, (req, res) => {
    res.sendFile(__dirname + "/build/index.html");
    console.log("#####", __dirname + "/build/index.html");
});

app.use(express.static(path.join(__dirname, "build")));

app.get("*", requireLogin, (req, res) => {
    console.log("**************running star route");
    res.sendFile(path.join(__dirname, "/build/index.html"));
});

server.listen(8080, () => {
    console.log("PAST DUE DATE SERVER RUNNING");
});
console.log("Open http://localhost:8080/ in Browser to start");
