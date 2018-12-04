var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

// Index - Shows all campgrounds
router.get("/", function(req, res){
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

router.post("/", function(req, res){
    // get data from form and add to campgrounds array
    // redirect to campgrounds page
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name :name, image:image, description:desc};
    
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

// NEW - show form to create new campground
router.get("/new", function(req, res){
    res.render("campgrounds/new");
});

// SHOW - showsmore info about one campground
router.get("/:id", function(req, res){
    // find campground by ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if (err){
            console.log(err);
        }
        else{
            console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});
        }
    })
});

module.exports = router;