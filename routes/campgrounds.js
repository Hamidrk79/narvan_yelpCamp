var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");


router.get("/", function(req, res){
    //Get All campgrounds from Db
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index", {campgrounds:allCampgrounds, currentUser: req.user, page:'campgrounds'});
        }
    });
    
      // res.render("campgrounds", {campgrounds:campgrounds});
});


//CREATE - add new campground to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    
    //get data from form and add to campgrounds array
    var name =req.body.name;
    var image =req.body.image;
    var cost = req.body.cost;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name, cost:cost, image: image, description:desc, author:author};
    //create a new campground and save to the database
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
            console.log(newlyCreated);
            //redirect back to campground page
            res.redirect("/campgrounds");
        }
    });
    
    
});

//NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});

//SHOW - shows more info about the campground

router.get("/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
            // console.log(foundCampground);
            //render show page temmplate with that campground
            res.render("campgrounds/show", {campground: foundCampground}); 
        }
    });
   
});

//EDIT CAMPGROUND ROUTE


    router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
        
        Campground.findById(req.params.id, function(err, foundCampground){
            
             res.render("campgrounds/edit", {campground:foundCampground});
                
    });
    });
    
    
//UPDATE CAMPGROUND ROUTE

router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
   //find and update the correct campground
   
   Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
      if(err){
          res.redirect("/campgrounds");
      } else{
          res.redirect("/campgrounds/" + req.params.id);
      }
   });
   //redirect somewhere(show page)
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds");
        }
    });
});




module.exports = router;
