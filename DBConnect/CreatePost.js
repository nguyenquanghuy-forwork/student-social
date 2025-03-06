const URI = process.env.MONGO_URI
const express = require("express");
const router = express.Router();
const mongodb = require("mongodb");
const session = require("express-session");
const Post = require("./post.js");
router.use(session({
    secret: 'secret key',
    resave: false,
    saveUninitialized: false,

}))
const MongoClient = mongodb.MongoClient;
var createpost = {
    post: (req, res) => {
        MongoClient.connect(URI, (err, db) => {
            if (err) { console.log(err) };
            let dbo = db.db("myFirstDatabase");
            console.log(req.body)
            dbo.collection("users").findOne({ email: req.body.postemail }, (err, result) => {
                //check file is exist ??? If not set image = ""
                if (req.body.postimage) {
                    let temp = {
                        avatar: req.body.postavatar,
                        username: req.body.postemail,
                        fullname: req.body.postfullname,
                        description: req.body.postdescription,
                        image: req.body.postimage,
                        role: req.body.postrole,
                        linkyoutube: req.body.postlinkyoutube,
                    }
                    var post = new Post(temp);
                } else {
                    let temp = {
                        avatar: req.body.postavatar,
                        username: req.body.postemail,
                        fullname: req.body.postfullname,
                        description: req.body.postdescription,
                        image: "",
                        role: req.body.postrole,
                        linkyoutube: req.body.postlinkyoutube,
                    }
                    var post = new Post(temp);
                }
                dbo.collection("posts").insertOne(post, (err, result) => {
                    if (err) throw err;
                    console.log("--------- Create AJAX Post Successfully ---------")
                    res.send(req.body)
                });

            })
        });
    },
}
module.exports = createpost;