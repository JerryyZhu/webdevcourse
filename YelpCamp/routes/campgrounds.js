var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");




router.get("/", function(req,res){
    res.render("landing");
})

router.get("/campgrounds", function(req, res){
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

router.post("/campgrounds", function(req, res){
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

router.get("/campgrounds/new", function(req, res){
    res.render("campgrounds/new");
});

function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


module.exports = router;