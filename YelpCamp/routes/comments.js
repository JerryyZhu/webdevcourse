var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");

// merge params allows parameters to be passed through to the router

// ===================
// COMMENTS ROUTES
// ===================
router.get("/new", isLoggedIn, function(req, res){
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

router.post("/comments", isLoggedIn, function(req, res){
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



function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


module.exports = router;