const { app } = require("../app");
const {
  findItems,
  getInitialProductList,
  addItemtoPantry,
  addItemToShoppingList,
  getUsersPantryAndShoppingItems,
  deleteItemFromUserPantry
} = require("../utils/db");
const chalk = require("chalk");
let err = chalk.bold.red;
let routeInfo = chalk.bold.blue;
let dbInfo = chalk.bold.yellow;

app.get("/useritems", (req, res) => {
  console.log(routeInfo("Running GET /useritems"));
  getUsersPantryAndShoppingItems(req.session.user.id)
    .then(data => {
      // console.log(dbInfo("return from db", data));
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

app.post("/add-to-pantry/:item", (req, res) => {
  console.log(routeInfo("POST /add-to-pantry"));
  let itemId = req.params.item;
  let userId = req.session.user.id;
  addItemtoPantry(userId, itemId)
    .then(data => {
      console.log(dbInfo("addItemtoPantry db return:"), data);
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
  console.log("req.params.id:", req.params.item);
  console.log("req.session.user.id", req.session.user.id);
  addItemToShoppingList(userId, itemId)
    .then(data => {
      console.log(dbInfo("addItemtoShoppingList db return:"), data);
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
