const express = require("express");
const app = new express();
const Config = require("./config/config");
const db = require("./config/db");
const bodyParser = require("body-parser");
const path = require("path");
var swig = require("swig");
var session = require("express-session");
var SequelizeStore = require("connect-session-sequelize")(session.Store);
var flash = require("connect-flash");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: "application/json", limit: "50mb" }));

require("./modals/Users");

const port = Config.port;

if (process.env.NODE_ENV === "development") {
  app.use(
    session({
      name: "NameApplication",
      resave: false,
      saveUninitialized: true,
      secret: "NameApplication",
      store: new SequelizeStore({
        db: db
      })
    })
  );
  console.log("setting seesion");
} else {
  app.use(
    session({
      resave: false,
      saveUninitialized: true,
      secret: "NameApplication",
      store: new SequelizeStore({
        db: db
      })
    })
  );
}
app.use(flash());
require("./controller/Users")(app);

app.engine("html", swig.renderFile);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");

db.sync();

app.listen(port, function() {
  console.log("Server running on port " + port);
});
