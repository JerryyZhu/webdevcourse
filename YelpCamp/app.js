var express = require('express'),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");


mongoose.connect("mongodb://localhost/yelp_camp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
})

// Compile into model
var Campground = mongoose.model("Campground", campgroundSchema);
// Campground.create({
//     name: "Salmon Creek",
//     image: "https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104491f3c17dafe5bcbc_340.jpg"
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
//     {name: "Salmon Creek", image: "https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104491f3c17dafe5bcbc_340.jpg"},
//     {name: "Granite Hill", image: "https://farm3.staticflickr.com/2929/14442301811_04f2a7f7a2.jpg"},
//     {name: "Stony Peak", image: "https://pixabay.com/get/e834b5062cf4033ed1584d05fb1d4e97e07ee3d21cac104491f3c17dafe5bcbc_340.jpg"}        
// ]


app.get("/", function(req,res){
    res.render("landing");
})

app.get("/campgrounds", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if (err){
            console.log(err);
        }
        else{
            res.render("campgrounds", {campgrounds: allCampgrounds});
        }

    });
    // res.render("campgrounds", {campgrounds: campgrounds});
})

app.post("/campgrounds", function(req, res){
    // get data from form and add to campgrounds array
    // redirect to campgrounds page
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name :name, image:image}
    
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
    res.render("new.ejs");
});


app.listen(3000, function(){
    console.log("The YelpCamp Server has started.");
});