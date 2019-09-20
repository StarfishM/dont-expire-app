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
