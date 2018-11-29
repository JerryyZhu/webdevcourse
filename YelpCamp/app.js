var express = require('express'),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    seedDB = require("./seeds");

seedDB();
mongoose.connect("mongodb://localhost/yelp_camp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

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
app.get("/campgrounds/:id/comments/new", function(req, res){
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

app.post("/campgrounds/:id/comments", function(req, res){
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


app.listen(3000, function(){
    console.log("The YelpCamp Server has started.");
});