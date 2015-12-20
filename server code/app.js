/// <reference path="./typings/tsd.d.ts" />
//import {initializeModels} from "./sturegModule";
var express = require("express");
var mongoose = require("mongoose");
var path = require("path");
var bodyparser = require("body-parser");
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
    stu_Id: {type: String, required: true},
    stu_Name: {type: String},
    Age: Number,
    CreatedOn: {type: Date, default: Date.now()}
});
var StuRegModel = mongoose.model("sturegistration", stuchema);
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
            res.json({status: "success"});
        }
    });
});
app.delete("/delete/:stuid", function (req, res) {
    var stu = mongoose.model('sturegistrations', stuchema);
    stu.remove({_id: req.params.stuid}, function (err) {
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
    var qury = {_id: req.params.stuid};
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
app.listen(3000, function () {
    console.log("Poert Listen 3000");
});
