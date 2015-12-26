/// <reference path="./typings/tsd.d.ts" />
//import {initializeModels} from "./sturegModule";


import express = require("express");
import mongoose = require("mongoose");
import path = require("path");
import bodyparser = require("body-parser");
let bcrypt = require("bcrypt-nodejs");
let SALT_FACTOR = 10;

var cors = require('cors');
let connection = mongoose.connect("mongodb://localhost/stuinfo");

let app = express();

app.use(cors());

let staticFilesPath = path.resolve(__dirname, "static");
app.use(express.static(staticFilesPath));
app.use(bodyparser.json({}));


//initializeModels(app);


// app.use("/", (req, res)=>{
// 	let indexFile = path.resolve( __dirname, "./static/app/index.html");
// 	res.sendfile(indexFile);
// });

let stuchema = new mongoose.Schema({
    stu_Id: { type: String, required: true },
    stu_Name: { type: String },
    Age: Number,
    CreatedOn: { type: Date, default: Date.now() }
});

let userchema = new mongoose.Schema({
    user_Id: { type: String, required: true },
    user_Password: { type: String, require: true },
    CreatedOn: { type: Date, default: Date.now() }
});




let StuRegModel = mongoose.model("sturegistration", stuchema);
let userRegModel = mongoose.model("userInfo", userchema);

app.post("/", (req, res) => {

    let user = new StuRegModel({

        stu_Id: req.body.data.stu_id,
        stu_Name: req.body.data.stu_name,
        Age: req.body.data.stu_age
    });

    user.save(function(err, success) {

        if (err) {
            res.json(err);
        } else {
            res.json({ status: "success" });
        }
    });
});

app.delete("/delete/:stuid", (req, res) => {


    var stu = mongoose.model('sturegistrations', stuchema);


    stu.remove({ _id: req.params.stuid }, function(err) {

        if (err) {
            res.send(err);
        } else {
            res.end();
        }
    });
});

app.put("/update/:stuid", (req, res) => {

    console.log(req.params.stuid);
    console.log(req.body.data.stu_name);

    let stuedit = {

        stu_Id: req.body.data.stu_id,
        stu_Name: req.body.data.stu_name,
        Age: req.body.data.stu_age
    };

    var stu = mongoose.model('sturegistrations', stuchema);

    let qury = { _id: req.params.stuid };

    stu.update(qury, stuedit, function(err) {

        if (err) {
            res.send(err);
        } else {
            res.end();
        }
    });
});

app.get("/", (req, res) => {

    StuRegModel.find({}, (err, success) => {

        if (err) {
            res.send(err);
        } else {
            res.send(success);
        }
    });

});

///Signup
let noop = function() { };
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


app.post("/usersave", (req, res) => {

    let bcryiptPassword = "";

    bcrypt.genSalt(SALT_FACTOR, function(err, salt) {

        if (err) {
            return console.log(err);
        }

        bcrypt.hash(req.body.data.password, salt, noop,
            function(err, hashedPassword) {

                if (err) {
                    return console.log(err);
                }
                bcryiptPassword = hashedPassword;
                        
                saveSignup();    
            });
    });



    let saveSignup = function() {
        let user = new userRegModel({

            user_Id: req.body.data.id,
            user_Password: bcryiptPassword

        });

        user.save(function(err, success) {

            if (err) {
                res.json(err);
            } else {
                res.json({ success });
            }
        });
    }
    
    
    
});
/////////////////////////
app.post("/signin", (req, res) => {

    //console.log(req.body.user);


    let query = { user_Password: req.body.user.password };

    userRegModel.find({ user_Password: req.body.user.password, user_Id: req.body.user.userid }, { user_Password: 1, user_Id: 1, _id: 0 }, (err, success) => {

        console.log(success[0]);


        if (err) {
            console.log("Un-Authorise");
            res.send(err);


        } else {

            console.log("Authorise");
            res.send(success);

        }
    });

});




app.listen(3000, function() {

    console.log("Poert Listen 3000");

});