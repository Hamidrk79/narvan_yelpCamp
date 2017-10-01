var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest",
        image: "https://www.nhstateparks.org/uploads/images/Dry-River_Campground_02.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vestibulum nulla dapibus lorem commodo, et tincidunt justo consequat. Phasellus euismod nulla id egestas semper. Donec tempor, massa sed volutpat finibus, sapien augue varius felis, finibus scelerisque enim nisi sit amet dui. Fusce ultricies nulla vitae consectetur faucibus. Aliquam mattis lacinia dolor, ac rutrum quam pulvinar nec. Duis facilisis mi eget fermentum dignissim. Proin aliquam nisl et placerat mollis."
    },
    {
        name: "Soaring Eagle",
        image: "http://soaringeaglecampground.com/test/wp-content/uploads/2014/01/view-of-the-basket-at-Soaring-Eagle.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vestibulum nulla dapibus lorem commodo, et tincidunt justo consequat. Phasellus euismod nulla id egestas semper. Donec tempor, massa sed volutpat finibus, sapien augue varius felis, finibus scelerisque enim nisi sit amet dui. Fusce ultricies nulla vitae consectetur faucibus. Aliquam mattis lacinia dolor, ac rutrum quam pulvinar nec. Duis facilisis mi eget fermentum dignissim. Proin aliquam nisl et placerat mollis."
    },
    {
        name: "Riversand Creeks",
        image: "http://4.bp.blogspot.com/-fljGBmg-L7s/UIBUtnB9sMI/AAAAAAAADP8/PY-R7i1m2Yo/s1600/DSCF0027.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vestibulum nulla dapibus lorem commodo, et tincidunt justo consequat. Phasellus euismod nulla id egestas semper. Donec tempor, massa sed volutpat finibus, sapien augue varius felis, finibus scelerisque enim nisi sit amet dui. Fusce ultricies nulla vitae consectetur faucibus. Aliquam mattis lacinia dolor, ac rutrum quam pulvinar nec. Duis facilisis mi eget fermentum dignissim. Proin aliquam nisl et placerat mollis."
    }
    ];

//REMOVE ALL CAMPGROUNDS
function seedDB(){
    Campground.remove({}, function(err){
        
        if(err){
            console.log(err);
        }
        console.log("removed Campground");
        
         //add a few campgrounds
        data.forEach(function(seed){
        Campground.create(seed, function(err, campground){
          if (err){
              console.log(err);
          }else{
              console.log("added a campground");
              //creat a comment
              Comment.create(
                  {
                      text:"This Place is great but I wish there was internet",
                      author:"Homer"
                      
                  }, function(err, comment){
                  if(err){
                      console.log(err);
                  } else{
                      campground.comments.push(comment);
                      campground.save();
                      console.log("created new comment");
                  }
                  
              })
          }
      });
  });
 });

 //add a few comments
}

module.exports = seedDB;
