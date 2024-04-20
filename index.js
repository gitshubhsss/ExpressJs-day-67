const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
//for creating the radom ids
const { v4: uuidv4 } = require("uuid");
//overiding the HTML Form request
let methodOverride = require('method-override')
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "views");

app.listen(port, () => {
  console.log(`app is listening on the port ${port}`);
});

const posts = [
  {
    id: uuidv4(),
    username: "apana collage",
    content: "This is the best platform to learn the coding !",
  },
  {
    id: uuidv4(),
    username: "shubhamranjane",
    content:
      "the sky is in your palm and when you open your palm the sky is not limit !",
  },
  {
    id: uuidv4(),
    username: "ashish ranjane",
    content: "consistency is the key of success !",
  },
];
//index.ejs
app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
  console.log("app is runnig");
});

//create new post
app.get("/posts/new", (req, res) => {
  res.render("newpost.ejs");
});

//adding the new post to the index.ejs
app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  let id = uuidv4();
  posts.push({ username, content, id });
  res.redirect("/posts");
});

//getting the post as per the id

app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find(findId);
  function findId(po) {
    return id === po.id;
  }
  res.render("show.ejs", { post });
});

// in index.js <a href="http://localhost:8080/posts/<%=post.id%>/edit">Edit post</a>
app.get("/posts/:id/edit", (req, res) => {

  let { id } = req.params;
  let post = posts.find(findId);
  function findId(po) {
    return id === po.id;
  }
  res.render("edit.ejs", { post });// edit.ejs will open
});

//upate the content in the post from selecting the id

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find(findId);
  function findId(po) {
    return id === po.id;
  }
  console.log(post.content);
  let newContent = req.body.content;
  post.content = newContent;
  console.log(`this is new content${newContent}`);

  res.redirect("/posts");
});
