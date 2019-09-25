const { app } = require("../app");
const { getExpiryItems, deleteItemFromUserPantry } = require("../utils/db");
const chalk = require("chalk");
const moment = require("moment");
const {
  calculateExpirationDate,
  calculateCompareValueForDB
} = require("./expirationcalc");

let err = chalk.bold.red;
let routeInfo = chalk.bold.blue;
let dbInfo = chalk.bold.yellow;

app.get("/get-expiry-items", (req, res) => {
  console.log(routeInfo("GET /get-expiry-items running"));
  let userId = req.session.user.id;
  let compareValue = calculateCompareValueForDB();
  getExpiryItems(userId, compareValue)
    .then(data => {
      console.log(dbInfo("DB RETURN getExpiryItems", data));
      res.json({
        success: true,
        data
      });
    })
    .catch(error => {
      console.log("ERROR in GET /get-expiry-items", err(error));
      res.json({
        success: false
      });
    });
});
