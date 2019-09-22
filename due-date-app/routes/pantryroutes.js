const { app } = require("../app");
const { findItems, getInitialProductList } = require("../utils/db");
const chalk = require("chalk");
let err = chalk.bold.red;
let routeInfo = chalk.bold.blue;

app.get(`/find/:val?`, (req, res) => {
  console.log(routeInfo("Running GET /find/:val ROUTE"));
  console.log("req.params.val:", req.params.val);
  if (!req.params.val) {
    console.log("first time route is hit");
    getInitialProductList().then(data => {
      res.json({
        items: data,
        searchresults: true
      });
    });
  } else {
    findItems(req.params.val)
      .then(data => {
        console.log("DB return from findItems:", data);
        res.json({
          items: data,
          success: true
        });
      })
      .catch(error => {
        console.log("ERROR in findItems", err(error));
        res.json({
          success: false
        });
      });
  }
});
