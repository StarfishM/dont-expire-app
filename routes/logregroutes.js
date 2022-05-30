const { app } = require("../app");
const { userCreate, getUserInfoEmail } = require("../utils/db");
const chalk = require("chalk");
const { hash, compare } = require("../utils/bc");

let err = chalk.bold.red;
let routeInfo = chalk.bold.blue;

app.post("/login", (req, res) => {
  console.log(routeInfo("POST /login"));
  let pw = req.body.password;
  let email = req.body.email;
  getUserInfoEmail(email)
    .then(info => {
      console.log("return from DB getUserInfo: ", info);
      compare(pw, info.password)
        .then(match => {
          if (match === true) {
            req.session.user = {};
            req.session.user.id = info.id;
            req.session.user.first = info.first;
            res.json({
              first: info.first,
              success: true
            });
          } else {
            console.log("POST /login: PW incorrect");
            let msg = "Sorry, but your email password combination was wrong";
            res.json({ success: false, errormsg: msg });
          }
        })
        .catch(error => {
          console.log("Error in POST /login compare", err(error));
          res.json({ success: false });
        });
    })
    .catch(error => {
      console.log(
        "Error in POST /login getUserInfo EMAIL not in DB",
        err(error)
      );
      let msg = "Email not registered";
      res.json({ success: false, errormsg: msg });
    });
});

app.post("/register", (req, res) => {
  console.log(routeInfo("POST /register route"));
  let user = {};
  if (!req.body.password) {
    res.json({ success: false });
  } else {
    hash(req.body.password)
      .then(hash => {
        user.first = req.body.first;
        user.last = req.body.last;
        user.email = req.body.email;
        user.password = hash;
      })
      .then(() => {
        userCreate(user)
          .then(data => {
            req.session.user = {};
            req.session.user.id = data.id;
            // res.redirect("/item-Tinder");
            res.json({
              success: true
            });
          })
          .catch(error => {
            console.log("Error in userCreate:", err(error));
            res.json({ success: false });
          });
      });
  }
});
