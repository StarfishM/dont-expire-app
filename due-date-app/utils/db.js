const spicedPg = require("spiced-pg");

let db;
if (process.env.DATABASE_URL) {
  db = spicedPg(process.env.DATABASE_URL);
} else {
  const { dbuser, dbpass } = require("../secrets.json");
  db = spicedPg(`postgres:${dbuser}:${dbpass}@localhost:5432/pastduedate`);
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
      LIMIT 3`
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
