const Users = require("../modals/Users");
const gatekeeper = require("./gatekeeper");

module.exports = function(app) {
  app.get("/", gatekeeper.unauthenticateUser, function(req, res) {
    res.render("login", {
      success: req.flash("success"),
      error: req.flash("error")
    });
  });

  app.get("/login", gatekeeper.unauthenticateUser, function(req, res) {
    res.render("login", {
      success: req.flash("success"),
      error: req.flash("error")
    });
  });

  app.get("/signup", gatekeeper.unauthenticateUser, function(req, res) {
    res.render("signup", {
      success: req.flash("success"),
      error: req.flash("error")
    });
  });

  app.get("/home", gatekeeper.authenticateUser, function(req, res) {
    res.render("home", {
      success: req.flash("success"),
      error: req.flash("error")
    });
  });
  app.post("/signup", gatekeeper.unauthenticateUser, function(req, res) {
    // console.log(req.body);
    Users.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email
    })
      .then(function(repo) {
        req.flash("success", "User register successfully.");
        res.redirect("/");
      })
      .catch(function(error) {
        req.flash("error", "User not register.");
        res.redirect("/");
      });
  });

  app.post("/login", gatekeeper.unauthenticateUser, function(req, res) {
    // console.log(req.body);
    Users.findOne({
      where: {
        email: req.body.email
      }
    })
      .then(function(repo) {
        req.flash("success", "User successfully Login.");
        req.session.username = req.body.email;
        res.redirect("/home");
      })
      .catch(function(error) {
        req.flash("error", "User not register.");
        res.redirect("/");
      });
  });

  app.get("/logout", function(req, res) {
    req.session.destroy(function() {
      res.redirect("/login");
    });
  });
};
