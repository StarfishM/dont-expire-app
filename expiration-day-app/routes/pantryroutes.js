const { app } = require("../app");
const {
  findItems,
  getInitialProductList,
  addItemtoPantry,
  addItemToShoppingList,
  getUsersPantryAndShoppingItems,
  deleteItemFromUserPantry,
  getStandardProducts,
  updateItemInUserPantry,
  addAllItemsFromShoppingToPantry,
  deleteAllFromShoppingList,
  deleteAllFromUserPantry
} = require("../utils/db");
const chalk = require("chalk");
const moment = require("moment");
const {
  calculateDefaultExpirationDate,
  calculateOrangeZone,
  calculateCompareValueForDB
} = require("./expirationcalc");

let err = chalk.bold.red;
let routeInfo = chalk.bold.blue;
let dbInfo = chalk.bold.yellow;

let orangeZone = calculateOrangeZone();
let redZone = calculateCompareValueForDB();

app.get("/useritems", (req, res) => {
  console.log(routeInfo("Running GET /useritems"));
  getUsersPantryAndShoppingItems(req.session.user.id)
    .then(data => {
      console.log(dbInfo("getUsersPantryAndShoppingItems", data));
      console.log("ORANGEZONE DATE", orangeZone);
      console.log("REDZONE DATE", redZone);
      for (let i = 0; i < data.length; i++) {
        if (!data[i].on_shopping_list) {
          if (data[i].expires_after_date_bought <= redZone) {
            data[i].color = "red";
          } else if (
            data[i].expires_after_date_bought <= orangeZone &&
            data[i].expires_after_date_bought > redZone
          ) {
            data[i].color = "orange";
          } else {
            data[i].color = "green";
          }
          data[i].expires_after_date_bought = moment(
            data[i].expires_after_date_bought
          ).format("YYYY-MM-DD");
          console.log(
            "COMPARE DATE DB EXPIRES AFTER DATE BOUGHT",
            data[i].expires_after_date_bought
          );
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
  let shoppingItemsArr = req.body.shoppingItemsArr;
  let arrayOfPromises = [];
  for (let i = 0; i < shoppingItemsArr.length; i++) {
    shoppingItemsArr[
      i
    ].expires_after_date_bought = calculateDefaultExpirationDate(
      shoppingItemsArr[i].expires_after_date_bought
    );
  }
  shoppingItemsArr.forEach(item => {
    console.log("item.account_id", item.account_id);
    console.log("item.id", item.id);
    console.log(
      "item.expires_after_date_bought",
      item.expires_after_date_bought
    );
    arrayOfPromises.push(
      addAllItemsFromShoppingToPantry(
        item.id,
        item.expires_after_date_bought
      ).then(data => {
        console.log(dbInfo("DATA in addItemToPantry forEach", data));
      })
    );
    console.log("array of Promises:", arrayOfPromises);
    return Promise.all(arrayOfPromises)
      .then(() => {})
      .catch(e => {
        console.log(err("Error in addItemtoPantra for each", e));
      });
  });
  // console.log("****shoppingItemsArray", shoppingItemsArr);

  // res.json({
  //   success: true
  // });
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

app.post("/delete-all-pantry", (req, res) => {
  console.log(routeInfo("POST /delete-all-pantry"));
  let user_id = req.session.user.id;
  deleteAllFromUserPantry(user_id)
    .then(data => {
      res.json({
        data,
        success: true
      });
    })
    .catch(e => {
      console.log(err("error in delete all from pantry:", e));
    });
});

app.post("/delete-all-shopping", (req, res) => {
  console.log(routeInfo("POST /delete-all-shopping"));
  let user_id = req.session.user.id;
  deleteAllFromShoppingList(user_id)
    .then(data => {
      res.json({
        data,
        success: true
      });
    })
    .catch(e => {
      console.log(err("error in delete all from pantry:", e));
    });
});
