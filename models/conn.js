require("dotenv").config();
const options = {
  host: process.env["DB_HOST"],
  database: process.env["DB_NAME"],
  user: process.env["DB_USER"],
  password: process.env["DB_PW"]
};
const pgp = require("pg-promise")({
  query: function(e) {
    console.log("QUERY:", e.query); //
  }
});
const db = pgp(options);
module.exports = db;
