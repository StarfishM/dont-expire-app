const spicedPg = require("spiced-pg");

let db;
if (process.env.DATABASE_URL) {
  db = spicedPg(process.env.DATABASE_URL);
} else {
  // const { dbuser, dbpass } = require("../secrets.json");
  db = spicedPg(`postgres:postgres:postgres@localhost:5432/expire-app`);
}

exports.userCreate = function(user) {
  return db
    .query(
      `INSERT INTO users(first, last, email, password)
        VALUES($1,$2,$3,$4)
        RETURNING *`,
      [user.first, user.last, user.email, user.password]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.getUserInfoEmail = function(email) {
  return db
    .query(`SELECT * FROM users WHERE email =$1`, [email])
    .then(({ rows }) => {
      return rows[0];
    });
};

exports.getInitialProductList = () => {
  return db
    .query(
      `SELECT id, img_url, name, time_until_expiry
      FROM items
      ORDER BY name
      LIMIT 16`
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.findItems = val => {
  return db
    .query(
      `SELECT id, img_url, name, time_until_expiry
    FROM items
    WHERE name|| ' ' ILIKE $1`,
      [val + "%"]
    )
    .then(({ rows }) => {
      return rows;
    });
};

exports.addItemtoPantry = (user_id, item_id, expires) => {
  return db
    .query(
      `INSERT INTO userpantry(account_id, product_id,expires_after_date_bought, name,expiry_date)
      SELECT $1,$2,$3,name, time_until_expiry
    FROM items
    WHERE id=$2
    RETURNING *`,
      [user_id, item_id, expires]
    )
    .then(({ rows }) => {
      return rows;
    })
    .catch(err => console.log("Error in DB query addItemToPantry:", err));
};

exports.addAllItemsFromShoppingToPantry = (item_id, expires) => {
  return db.query(
    `UPDATE userpantry
      SET on_shopping_list=false, expires_after_date_bought=$1
      WHERE id=$2
      RETURNING *`,
    [expires, item_id]
  );
};

exports.addItemToShoppingList = (user_id, item_id) => {
  return db
    .query(
      `INSERT INTO userpantry(account_id, product_id, name,expiry_date, on_shopping_list)
        SELECT $1,$2,name, time_until_expiry, true
      FROM items
      WHERE id=$2
      RETURNING *`,
      [user_id, item_id]
    )
    .then(({ rows }) => {
      return rows;
    })
    .catch(err => console.log("Error in DB query addItemToPantry:", err));
};

exports.getUsersPantryAndShoppingItems = id => {
  return db
    .query(
      `SELECT * FROM userpantry
        WHERE account_id=$1
        ORDER BY expires_after_date_bought`,
      [id]
    )
    .then(({ rows }) => {
      return rows;
    })
    .catch(err => console.log("Error in DB query getUsersPantry:", err));
};

exports.deleteItemFromUserPantry = (user_id, item_id) => {
  return db.query(
    `DELETE from userpantry
        WHERE (account_id=$1 AND id=$2)`,
    [user_id, item_id]
  );
};

exports.deleteAllFromShoppingList = user_id => {
  return db.query(
    `DELETE from userpantry
        WHERE (account_id=$1 AND on_shopping_list=true)`,
    [user_id]
  );
};

exports.deleteAllFromUserPantry = user_id => {
  return db.query(
    `DELETE from userpantry
            WHERE (account_id=$1 AND on_shopping_list=false)`,
    [user_id]
  );
};

exports.getStandardProducts = () => {
  return db
    .query(
      `SELECT* FROM Items
        WHERE regular_item=true`
    )
    .then(({ rows }) => {
      return rows;
    })
    .catch(err => console.log("Error in DB query getStandardProducts:", err));
};

exports.updateItemInUserPantry = pantryObj => {
  return db
    .query(
      `UPDATE userpantry
      SET amount=$1, date_bought=$2, expires_after_date_bought=$3
      WHERE id=$4`,
      [
        pantryObj.amount,
        pantryObj.purchaseDate,
        pantryObj.expiryDate,
        pantryObj.id
      ]
    )
    .then(({ rows }) => {
      return rows;
    })
    .catch(err =>
      console.log("Error in DB query updateItemInUserPantry:", err)
    );
};

exports.getExpiryItems = (userId, expire) => {
  return db
    .query(
      `SELECT * FROM userpantry
        WHERE (account_id=$1 AND expires_after_date_bought <=$2 AND on_shopping_list = false)
        ORDER BY expires_after_date_bought`,
      [userId, expire]
    )
    .then(({ rows }) => {
      return rows;
    })
    .catch(err => console.log("Error in DB getExpiryItems:", err));
};
