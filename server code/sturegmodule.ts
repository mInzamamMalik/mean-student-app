/// <reference path="./typings/tsd.d.ts" />

import mongoose = require("mongoose");
let connection = mongoose.connect("mongodb://localhost/stuinfo");

let stuchema = new mongoose.Schema({
    stu_Id: {type: String, required: true},
    stu_Name: {type: String},
    Age: Number,
    CreatedOn: {type: Date, default: Date.now()}
});


let StuRegModel = mongoose.model("sturegistration", stuchema);


export function initializeModels(app) {

    app.post("/insert", (req, res)=> {

        let user = new StuRegModel({stu_Id: req.body.stu_id, stu_Name: req.body.stu_name, Age: parseInt(req.body.age)});

        user.save(function (err, success) {

            if (err) {
                res.send(err);
            } else {
                res.send({message: "Inserted Successfully", data: success});
            }

        });

    });
}