const { app } = require("../app");
const { getExpiryItems } = require("../utils/db");
const chalk = require("chalk");
const moment = require("moment");
const { calculateCompareValueForDB } = require("./expirationcalc");

let err = chalk.bold.red;
let routeInfo = chalk.bold.blue;
let dbInfo = chalk.bold.yellow;

app.get("/get-expiry-items", (req, res) => {
  console.log(routeInfo("GET /get-expiry-items running"));
  let userId = req.session.user.id;
  let first = req.session.user.first;
  let compareValue = calculateCompareValueForDB();
  // console.log("****compare Value", compareValue);
  getExpiryItems(userId, compareValue)
    .then(data => {
      // console.log(dbInfo("DB RETURN getExpiryItems", data));
      for (let i = 0; i < data.length; i++) {
        data[i].expires_after_date_bought = moment(
          data[i].expires_after_date_bought
        ).fromNow();
      }
      res.json({
        data,
        first: first
      });
    })
    .catch(error => {
      // console.log("ERROR in GET /get-expiry-items", err(error));
      res.json({
        success: false
      });
    });
});
