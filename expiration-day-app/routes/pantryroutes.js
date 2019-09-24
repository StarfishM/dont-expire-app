const { app } = require("../app");
const {
  findItems,
  getInitialProductList,
  addItemtoPantry,
  addItemToShoppingList,
  getUsersPantryAndShoppingItems,
  deleteItemFromUserPantry,
  getStandardProducts
} = require("../utils/db");
const chalk = require("chalk");
const moment = require("moment");
const { calculateExpirationDate } = require("./expirationcalc");

let err = chalk.bold.red;
let routeInfo = chalk.bold.blue;
let dbInfo = chalk.bold.yellow;

app.get("/useritems", (req, res) => {
  console.log(routeInfo("Running GET /useritems"));
  getUsersPantryAndShoppingItems(req.session.user.id)
    .then(data => {
      // console.log(dbInfo("return from db", data));
      for (let i = 0; i < data.length; i++) {
        if (!data[i].on_shopping_list) {
          let purchaseDate = moment(data[i].created_at)
            .utc()
            .format("YYYY-MM-DD");
          // console.log("****PURCHASE DATE****", purchaseDate);
          data[i].expires_at = calculateExpirationDate(
            purchaseDate,
            data[i].expiry_date
          );
          // console.log("data.expires_at", data.expires_at);
          // console.log("days until expiry", data[i].expiry_date);
          // console.log("data after expiry calculation:", data);
        }
      }

      res.json({
        success: true,
        data
      });
    })
    .catch(error => {
      console.log("ERROR in GET /useritems", err(error));
      res.json({
        success: false
      });
    });
});

app.get(`/find/:val?`, (req, res) => {
  console.log(routeInfo("Running GET /find/:val ROUTE"));
  // console.log("req.params.val:", req.params.val);
  if (!req.params.val) {
    // console.log("first time route is hit");
    getInitialProductList().then(data => {
      res.json({
        items: data,
        searchresults: true
      });
    });
  } else {
    findItems(req.params.val)
      .then(data => {
        // console.log("DB return from findItems:", data);
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

app.post("/add-to-pantry/:item", (req, res) => {
  console.log(routeInfo("POST /add-to-pantry"));
  let itemId = req.params.item;
  let userId = req.session.user.id;
  addItemtoPantry(userId, itemId)
    .then(data => {
      // console.log(dbInfo("addItemtoPantry db return:"), data);

      let purchaseDate = moment(data[0].created_at)
        .utc()
        .format("YYYY-MM-DD");
      // console.log("****PURCHASE DATE****", purchaseDate);
      data[0].expires_at = calculateExpirationDate(
        purchaseDate,
        data[0].expiry_date
      );
      // console.log("data.expires_at", data.expires_at);
      // console.log("days until expiry", data[0].expiry_date);
      // console.log("data after expiry calculation:", data);
      res.json({
        data,
        success: true
      });
    })
    .catch(e => {
      console.log(err("error is addItemToPantery", e));
    });
});

app.post("/add-to-list/:item", (req, res) => {
  let itemId = req.params.item;
  let userId = req.session.user.id;
  console.log(routeInfo("POST /add-to-list"));
  // console.log("req.params.id:", req.params.item);
  // console.log("req.session.user.id", req.session.user.id);
  addItemToShoppingList(userId, itemId)
    .then(data => {
      // console.log(dbInfo("addItemtoShoppingList db return:"), data);
      res.json({
        data,
        success: true
      });
    })

    .catch(e => {
      console.log(err("error is addItemToPantery", e));
    });
});

app.post("/delete-item/:item", (req, res) => {
  let itemId = req.params.item;
  let userId = req.session.user.id;
  deleteItemFromUserPantry(userId, itemId)
    .then(data => {
      res.json({
        deleted: true
      });
    })
    .catch(e => {
      console.log(err("error is deleteItemFromUserPantry", e));
    });
});

app.get("/get-standard-products", (req, res) => {
  getStandardProducts()
    .then(data => {
      console.log(dbInfo("DB return from getStandardProducts", data));
      res.json({
        data
      });
    })
    .catch(e => {
      console.log(err("error in getStandardProducts", e));
    });
});
