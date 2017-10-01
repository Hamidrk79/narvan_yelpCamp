var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
 
//Root Route
router.get("/", function(req,res){
   res.render("landing");
});


//show register form
router.get("/register", function(req, res){
    res.render("register", {page:'register'});
});

//handle sign up logic

router.post("/register", function(req,res){
    var newUser = new User({username: req.body.username});
    var pass = req.body.password;
    User.register(newUser, pass, function(err, user){
        if(err){
            console.log(err);
            return res.render("register", {error: err.message});
            }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to yelp camp " + user.username);
            res.redirect("/campgrounds");
        });
    });
});


//show login form

router.get("/login", function(req, res) {
    res.render("login", {page:'login'});
});

//HANDLING LOGIN LOGIC

router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
    
}) ,function(req, res) {
    
});

// logout route

router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "See you later!");
    res.redirect("/campgrounds");
});


module.exports = router;
