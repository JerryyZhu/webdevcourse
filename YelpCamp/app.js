var express = require('express'),
    app = express(),
    bodyParser = require("body-parser"),
    passport = require('passport'),
    LocalStrategy = require("passport-local"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    seedDB = require("./seeds"),
    User = require("./models/user");

// Refactor routes
var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require('./routes/index');


seedDB();
mongoose.connect("mongodb://localhost/yelp_camp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// Passport Configuration
app.use(require("express-session")({
    secret: "thisisasecretkey",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
})
// Campground.create({
//     name: "Salmon Creek",
//     image: "https://farm3.staticflickr.com/2929/14442301811_04f2a7f7a2.jpg",
//     description: "This is a huge granite hill. Granite is a hard rock. Very hard."
// }, function(err, campground){
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log("Newly Created Campground: ");
//         console.log(campground)
//     }
// });

// var campgrounds = [
//     {name: "Granite Hill", image: "https://farm3.staticflickr.com/2929/14442301811_04f2a7f7a2.jpg"},
//     {name: "Stony Peak", image: "https://pixabay.com/get/e834b5062cf4033ed1584d05fb1d4e97e07ee3d21cac104491f3c17dafe5bcbc_340.jpg"}        
// ]

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(3000, function(){
    console.log("The YelpCamp Server has started.");
});