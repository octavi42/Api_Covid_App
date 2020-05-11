const path = require('path');

const express = require('express');

const router = express.Router();

//const Post = require('../models/scheme');

const mongoose = require('mongoose');

var db = mongoose.connection;

const postScheme = mongoose.Schema({
    phoneId: String,
    latitude: Number,
    longitude: Number,
    stringDate: String,
    intDate: Number
});

router.get('/', (req, res) => {
    
    res.sendFile(path.join(__dirname+'/../public/placesPage.html'));

    //res.send('');
});

const citysArrayFS = require('./../citys');

var n = citysArrayFS.citys.length

for (const type of citysArrayFS.citys) {  

    router.get(`/${type}`, async (req, res) => {

        var Model = mongoose.model(type, postScheme, type);

        try {
            const posts = await Model.find();
            res.json(posts);
        } catch(err) {
            res.json({message: err});
        }
    });

    router.post(`/${type}`, async (req, res) => {
        
        var Model = mongoose.model(type, postScheme, type);

        //repeatDelete(type, req.body.phoneId)

        myquery = {
            phoneId: req.body.phoneId
        }
        db.collection(type).deleteMany(myquery, function(err, obj) {
            if (err) throw err;
            console.log(obj.result.n + " document(s) deleted");
        });

        const post = new Model({
            phoneId: req.body.phoneId,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            stringDate: req.body.stringDate,
            intDate: req.body.intDate

        });

        afterTime(type, 1000 * 60 * 24 * 4, req.body.phoneId, req.body.latitude, req.body.longitude)

        try {
            const savedPost = await post.save();
            res.json(savedPost);
        } catch (err) {
            res.json({message: err});
        }

    });
    
    //console.log(`A JavaScript type is: ${type}`)
}

function afterTime(type, time, deleteId, latitude, longitude){
    setTimeout(
        function() {
            console.log("ID to delete= ",deleteId)
            console.log("lat= ",latitude)
            console.log("long= ",longitude)
            db.collection(type).find({
                phoneId: deleteId,
                latitude: latitude,
                longitude: longitude
            }, function(err, obj) {
                if (err) throw err;
                db.collection(type).deleteMany({phoneId: deleteId,
                    latitude: latitude,
                    longitude: longitude}, function(err, obj) {
                    if (err) throw err;
                    console.log(obj.result.n + " document(s) deleted");
                });
            })
        }, time);
}

module.exports = router;