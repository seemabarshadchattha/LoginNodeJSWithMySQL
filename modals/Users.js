const db = require("../config/db");
const Sequelize = require("sequelize");

module.exports = db.define("Users", {
  firstname: Sequelize.STRING,
  lastname: Sequelize.STRING,
  email: Sequelize.STRING
});
