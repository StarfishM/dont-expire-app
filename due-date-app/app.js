const express = require("express");
const app = (exports.app = express());
const compression = require("compression");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
// const { requireLogin, requireNoLogin } = require("./utils/middlewarerouting");
const server = require("http").Server(app);
const io = (exports.io = require("socket.io")(server, {
    origins: "localhost:8080"
}));
const path = require("path");

app.use(compression());
//___________BOILER PLATE FOR REQ.BODY POST REQ NOT TO BE EMPTY____________
app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));


const cookieSessionMiddleware = cookieSession({
    maxAge: 1000 * 60 * 60 * 24 * 14,
    secret:
        process.env.NODE_ENV === "production"
            ? process.env.SESS_SECRET
            : require("./secrets.json").secret
});

app.use(cookieSessionMiddleware);
io.use((socket, next) => {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

app.use(csurf());

app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

//////////////////////////////////////
///////////////Routes////////////////
////////////////////////////////////
require("./routes/logregroutes");


// Route for not logged in users
app.get("/welcome", (req, res) => {
    res.sendFile(__dirname + "/build/index.html");
});

app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/welcome");
});

// serves all routes not specifically listed above this one
// app.get("*", requireLogin, function(req, res) {
//     res.sendFile(__dirname + "/index.html");
// });

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/build/index.html"));
});


server.listen(8080, ()=>{
    console.log("PAST DUE DATE SERVER RUNNING");
});
console.log("Open http://localhost:8080/ in Browser to start");
