const URI = process.env.MONGO_URI
const express = require("express");
const router = express.Router();
const mongodb = require("mongodb");
const session = require("express-session");

router.use(session({
    secret: 'secret key',
    resave: false,
    saveUninitialized: false,

}))

const MongoClient = mongodb.MongoClient;
var editpost = {
    post: (req, res) => {
        MongoClient.connect(URI, (err, db) => {
            if (err) console.log(err);
            console.log(req.body.description)
            console.log(req.params.id)
            let dbo = db.db("myFirstDatabase");
            dbo.collection("posts").findOne({ _id: mongodb.ObjectId(req.params.id) }, (err, result) => {
                let query = {
                    $set: {
                        description: req.body.description,
                    }
                }
                dbo.collection("posts").updateOne({ _id: mongodb.ObjectId(req.params.id) }, query);
            })
            res.redirect("/post/" + req.params.id)
        });
    }

}
module.exports = editpost;