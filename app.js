const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require('lodash');       //lodash

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutStartingContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactStartingContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

let posts = [];

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true})); // url encoded request
app.use(express.static("public"));   // all files will be stored in public folder

// if you want to render a page directly, when no input is required u can type res.render directly in app.get
app.get("/", function(req, res){ // home page
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts // key value pairs of variables which we want to change in home.ejs
  }); // adding a key value pair to change the value of that para
});

app.get("/about", function(req, res){     // about page
  res.render("about", {aboutContent: aboutStartingContent})
})

app.get("/contact", function(req, res){     //contact page
  res.render("contact", {contactContent: contactStartingContent})
})

app.get("/compose", function(req, res){    //compose page get method
  res.render("compose");
})

app.post("/compose", function(req, res){   //compose page post method
  const post = {
    title: req.body.titleContent,           //creating objects using the name given to input field and text area 
    content: req.body.postContent
  };
  
  posts.push(post)                       //pushing objects to global posts array
  res.redirect("/")                      // after clicking publish button it should redirect to home page

})

// Parameters in website is any-word-the-space which is known as KEBAB casing
app.get("/posts/:topic", function(req, res){   //EXPRESS ROuting paramters in which instead of creating repeatedly new pages for each route
  const requestedTitle = _.lowerCase(req.params.topic);                // we can access the route parameters using req.params .lowerCase is from lodash

  posts.forEach(function(post){                // we need to match the parameter with every title in posts array
    const storedTitle = _.lowerCase(post.title);

    if(storedTitle === requestedTitle){
      res.render("post", {
        postTitle: post.title,
        postContent: post.content
      })
    }
  })


})                                             // this is used for dynamic url based on topic we will decide what to do in app.get()

app.listen(3000, function() {                 //listening at port 3000
  console.log("Server started on port 3000");
});
