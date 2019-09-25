const { app } = require("../app");
const {
  findItems,
  getInitialProductList,
  addItemtoPantry,
  addItemToShoppingList,
  getUsersPantryAndShoppingItems,
  deleteItemFromUserPantry,
  getStandardProducts,
  updateItemInUserPantry
} = require("../utils/db");
const chalk = require("chalk");
const moment = require("moment");
const { calculateDefaultExpirationDate } = require("./expirationcalc");

let err = chalk.bold.red;
let routeInfo = chalk.bold.blue;
let dbInfo = chalk.bold.yellow;

app.get("/useritems", (req, res) => {
  console.log(routeInfo("Running GET /useritems"));
  getUsersPantryAndShoppingItems(req.session.user.id)
    .then(data => {
      console.log(dbInfo("getUsersPantryAndShoppingItems", data));
      for (let i = 0; i < data.length; i++) {
        if (!data[i].on_shopping_list) {
          data[i].expires_after_date_bought = moment(
            data[i].expires_after_date_bought
          ).format("YYYY-MM-DD");
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
  let daysUntilExp = req.body.expiry_date;
  let expires = calculateDefaultExpirationDate(daysUntilExp);
  addItemtoPantry(userId, itemId, expires)
    .then(data => {
      res.json({
        data,
        success: true
      });
    })
    .catch(e => {
      console.log(err("error is addItemToPantery", e));
    });
});

app.post("/add-all-to-pantry", (req, res) => {
  console.log(routeInfo("POST /add-all-to-pantry"));
  console.log("#########req.body.shoppingItemsArr", req.body.shoppingItemsArr);
  res.json({
    success: true
  });
});

app.post("/add-to-list/:item", (req, res) => {
  let itemId = req.params.item;
  let userId = req.session.user.id;
  console.log(routeInfo("POST /add-to-list"));
  addItemToShoppingList(userId, itemId)
    .then(data => {
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
      res.json({
        data
      });
    })
    .catch(e => {
      console.log(err("error in getStandardProducts", e));
    });
});

app.post("/update-userpantry", (req, res) => {
  let itemObj = {};
  console.log(routeInfo("POST /update-userpantry running"));
  itemObj.amount = req.body.amount;
  itemObj.purchaseDate = req.body.purchaseDate;
  itemObj.expiryDate = req.body.expiryDate;
  itemObj.id = req.body.id;
  itemObj.account_id = req.body.account_id;
  itemObj.product_id = req.body.product_id;
  updateItemInUserPantry(itemObj);
  res.json({
    updatedPantry: true
  });
});
