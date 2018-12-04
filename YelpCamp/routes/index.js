var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

/// =========
//  AUTH Routes
/// =========

router.get("/register", function(req, res){
    res.render("register");
});

router.post("/register", function(req, res){
    // res.send("Signing you up...");
    var newUser = req.body.username;
    var newPassword = req.body.password;
    User.register(new User({username: newUser}), newPassword, function(err, user){
        if (err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds");
        });
    });
});

// show login form
router.get("/login", function(req, res){
    res.render("login");
});

// Handling login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res){
        res.send("Login Logic Happens Here");
});

router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


module.exports = router;