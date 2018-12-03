var express = require("express"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    User = require("./models/user")


mongoose.connect("mongodb://localhost/auth_demo_app");

var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

// Used to encode and decode the sessions information
app.use(require("express-session")({
    secret: "thisisasecreykeyithink",
    resave: false,
    saveUninitialized: false
}));

// Required for passport
app.use(passport.initialize());
app.use(passport.session());

// Responsible for reading the session (decoding), and 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));

// Routes

app.get("/", function(req, res){
    res.render("home");
});

// first runs isLoggedIn before the anonymous? function is run
app.get("/secret", isLoggedIn, function(req, res){
    res.render("secret");
});

// Auth routes
app.get("/register", function(req, res){
    res.render("register");
});

app.post("/register", function(req, res){
    req.body.username 
    req.body.password
    // Don't save the password in the database, not a good idea
    // Hashed password is better
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            res.render('register');
        }
        // use the local strategy
        passport.authenticate("local")(req, res, function(){
            res.redirect("secret");
        });
    });

    res.send("Register Post Route");
});

// Login routes
app.get("/login", function(req, res){
    res.render("login");
});

// Middleware
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), function(req, res){
    // wow
});

app.get("/logout", function(req, res){
    req.logout(); // comes from passport
    res.redirect("/");
})

// Middleware function
function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(3000, function(){
    console.log("Authentication server has started");
});