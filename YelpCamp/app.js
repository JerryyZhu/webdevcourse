var express = require('express');
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req,res){
    res.render("landing");
})

app.get("/campgrounds", function(req, res){
    var campgrounds = [
        {name: "Salmon Creek", image: "https://pixabay.com/get/e837b1072af4003ed1584d05fb1d4e97e07ee3d21cac104491f3c17dafe5bcbc_340.jpg"},
        {name: "Granite Hill", image: "https://farm3.staticflickr.com/2929/14442301811_04f2a7f7a2.jpg"},
        {name: "Stony Peak", image: "https://pixabay.com/get/e834b5062cf4033ed1584d05fb1d4e97e07ee3d21cac104491f3c17dafe5bcbc_340.jpg"}        
    ]
    res.render("campgrounds", {campgrounds: campgrounds});
})

app.listen(3000, function(){
    console.log("The YelpCamp Server has started.");
})