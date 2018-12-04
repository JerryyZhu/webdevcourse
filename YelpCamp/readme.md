#Yelp Camp

* Add a landing page
* Add Campgrounds page

Each Campground has
 * Name
 * Image

 # Layout and Basic Styling
 * Create a header and footer partials
 * Add in bootstrap

 # Data Persistence
 * Set up campground model
 * Use campground model inside routes

# Show page
* Review the RESTFUL routes we've seen so far
* Add description to campground model
* Show db.collection.drop()
* Add a show route/template

# Refactor Mongoose Code
* Create a models directory
* Use module.exports
* Require everything corretly

# Add Seeds File
* Add a seeds.js file
* Run the seeds file everytime the server starts

# Add the Comment Model
* Make our errors go away!
* Display comments on campground show page

# Comment New/Create
* Discuss nested routes
* Add the comment new and create routes
* Add the new comment form

# Style Show Page
* Add sidebar to show page
* Display comments nicely

# Authentication
* Install all packages for auth
* Define user model

* Configure passport
* Add register routes
* Add regiser template

* Add login routes
* Add login template

* Add logout route
* Prevent user from adding a comment if not signed in
* Add links to navbar
* Show/hide auth links in navbar correctly

# Notes

 RESTFUL ROUTES
 name           url             verb        description
 ==================================================================
 INDEX          /dogs           GET         Displays a list of all dog
 NEW            /dogs/new       GET         Displays form to make a new dog
 CREATE         /dogs           POST        Add new dog to DB
 SHOW           /dogs/:id       GET         Shows info about one dog (ID)      

 INDEX          /campgrounds
 NEW            /campgrounds/new
 CREATE         /campgrounds
 SHOW           /campgrounds/:id

 NEW            /campgrounds/:id/comments/new   GET
 CREATE         /campgrounds/:id/comments       POST

