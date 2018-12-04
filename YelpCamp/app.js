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

app.get("/", function(req,res){
    res.render("landing");
})

app.get("/campgrounds", function(req, res){
    // Get all campgrounds from DB
    console.log(req.user);
    Campground.find({}, function(err, allCampgrounds){
        if (err){
            console.log(err);
        }
        else{
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }

    });
    // res.render("campgrounds", {campgrounds: campgrounds});
})

app.post("/campgrounds", function(req, res){
    // get data from form and add to campgrounds array
    // redirect to campgrounds page
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name :name, image:image, desciption:desc};
    
    // Create a new campground and save to datebase
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        }
        else{
            console.log("New Campground Created: ");
            // console.log()
            res.redirect("/campgrounds");
        }
    });
});

app.get("/campgrounds/new", function(req, res){
    res.render("campgrounds/new");
});


// ===================
// COMMENTS ROUTES
// ===================
app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
    // find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if (err){
            console.log(err);
        }
        else{
            res.render("comments/new", {campground: campground});
        }
    });
});

app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
    // look up campground using ID
    Campground.findById(req.params.id, function(err, campground){
        if (err){
            console.log(err);
            // Missing id
            redirect("/campgrounds");
        }
        else{
            Comment.create(req.body.comment, function(err, comment){
                if (err){
                    console.log(err);
                }
                else{
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/'+campground._id);
                }
            });
        }
    })
    // create new comment
    // connect new comment
    // redirect campground show page
});


app.get("/campgrounds/:id", function(req, res){
    // res.send("This will be the show page one day"); 
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if (err){
            console.log(err);
        }
        else{
            console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

/// =========
//  AUTH Routes
/// =========

app.get("/register", function(req, res){
    res.render("register");
});

app.post("/register", function(req, res){
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
app.get("/login", function(req, res){
    res.render("login");
});

// Handling login logic
app.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res){
        res.send("Login Logic Happens Here");
});

app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(3000, function(){
    console.log("The YelpCamp Server has started.");
});