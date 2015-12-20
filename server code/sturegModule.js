/// <reference path="./typings/tsd.d.ts" />
var mongoose = require("mongoose");
var connection = mongoose.connect("mongodb://localhost/stuinfo");
var stuchema = new mongoose.Schema({
    stu_Id: {type: String, required: true},
    stu_Name: {type: String},
    Age: Number,
    CreatedOn: {type: Date, default: Date.now()}
});
var StuRegModel = mongoose.model("sturegistration", stuchema);
function initializeModels(app) {
    app.post("/insert", function (req, res) {
        var user = new StuRegModel({stu_Id: req.body.stu_id, stu_Name: req.body.stu_name, Age: parseInt(req.body.age)});
        user.save(function (err, success) {
            if (err) {
                res.send(err);
            }
            else {
                res.send({message: "Inserted Successfully", data: success});
            }
        });
    });
}
exports.initializeModels = initializeModels;
