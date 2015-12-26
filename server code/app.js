/// <reference path="./typings/tsd.d.ts" />
//import {initializeModels} from "./sturegModule";
var express = require("express");
var mongoose = require("mongoose");
var path = require("path");
var bodyparser = require("body-parser");
var bcrypt = require("bcrypt-nodejs");
var SALT_FACTOR = 10;
var cors = require('cors');
var connection = mongoose.connect("mongodb://localhost/stuinfo");
var app = express();
app.use(cors());
var staticFilesPath = path.resolve(__dirname, "static");
app.use(express.static(staticFilesPath));
app.use(bodyparser.json({}));
//initializeModels(app);
// app.use("/", (req, res)=>{
// 	let indexFile = path.resolve( __dirname, "./static/app/index.html");
// 	res.sendfile(indexFile);
// });
var stuchema = new mongoose.Schema({
    stu_Id: { type: String, required: true },
    stu_Name: { type: String },
    Age: Number,
    CreatedOn: { type: Date, default: Date.now() }
});
var userchema = new mongoose.Schema({
    user_Id: { type: String, required: true },
    user_Password: { type: String, require: true },
    CreatedOn: { type: Date, default: Date.now() }
});
var StuRegModel = mongoose.model("sturegistration", stuchema);
var userRegModel = mongoose.model("userInfo", userchema);
app.post("/", function (req, res) {
    var user = new StuRegModel({
        stu_Id: req.body.data.stu_id,
        stu_Name: req.body.data.stu_name,
        Age: req.body.data.stu_age
    });
    user.save(function (err, success) {
        if (err) {
            res.json(err);
        }
        else {
            res.json({ status: "success" });
        }
    });
});
app.delete("/delete/:stuid", function (req, res) {
    var stu = mongoose.model('sturegistrations', stuchema);
    stu.remove({ _id: req.params.stuid }, function (err) {
        if (err) {
            res.send(err);
        }
        else {
            res.end();
        }
    });
});
app.put("/update/:stuid", function (req, res) {
    console.log(req.params.stuid);
    console.log(req.body.data.stu_name);
    var stuedit = {
        stu_Id: req.body.data.stu_id,
        stu_Name: req.body.data.stu_name,
        Age: req.body.data.stu_age
    };
    var stu = mongoose.model('sturegistrations', stuchema);
    var qury = { _id: req.params.stuid };
    stu.update(qury, stuedit, function (err) {
        if (err) {
            res.send(err);
        }
        else {
            res.end();
        }
    });
});
app.get("/", function (req, res) {
    StuRegModel.find({}, function (err, success) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(success);
        }
    });
});
///Signup
var noop = function () { };
// userSchema.pre("save", function(done) {
//     let user = this;
//     if (!user.isModified("password")) {
//         return done();
//     }
//     bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
//         if (err) { return done(err); }
//         bcrypt.hash(user.password, salt, noop,
//             function(err, hashedPassword) {
//                 if (err) { return done(err); }
//                 user.password = hashedPassword;
//                 done();
//             });
//     });
// });
app.post("/usersave", function (req, res) {
    var bcryiptPassword = "";
    bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
        if (err) {
            return console.log(err);
        }
        bcrypt.hash(req.body.data.password, salt, noop, function (err, hashedPassword) {
            if (err) {
                return console.log(err);
            }
            bcryiptPassword = hashedPassword;
            saveSignup();
        });
    });
    var saveSignup = function () {
        var user = new userRegModel({
            user_Id: req.body.data.id,
            user_Password: bcryiptPassword
        });
        user.save(function (err, success) {
            if (err) {
                res.json(err);
            }
            else {
                res.json({ success: success });
            }
        });
    };
});
/////////////////////////
app.post("/signin", function (req, res) {
    //console.log(req.body.user);
    var query = { user_Password: req.body.user.password };
    userRegModel.find({ user_Password: req.body.user.password, user_Id: req.body.user.userid }, { user_Password: 1, user_Id: 1, _id: 0 }, function (err, success) {
        console.log(success[0]);
        if (err) {
            console.log("Un-Authorise");
            res.send(err);
        }
        else {
            console.log("Authorise");
            res.send(success);
        }
    });
});
app.listen(3000, function () {
    console.log("Poert Listen 3000");
});
