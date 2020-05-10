const mongoose = require('mongoose');

const citysArrayFS = require('./../citys');
const places = require('../routes/place');

const postScheme = mongoose.Schema({
    //phoneId: UUID,
    latitude: Number,
    longitude: Number,
    //countDown: setInterval(timeIt, 1000)
});

function timeIt(){
    console.log(countDown)
}

// exports.expFnc = expChck;

var postPlace = places.city
model = mongoose.model(postPlace, postScheme);

module.exports = model

    // getPArray: function(name) {
    //     var citysArray = [];
    //     var cnt = 0;

    //     for (const type of citysArrayFS.citys) {

    //         if (type == name) {
                
    //             citysArray[cnt] = mongoose.model(type, postScheme);
    //             var num=cnt;

    //         }
    //         cnt=cnt+1;

    //     }

    //     return citysArray[num];
    //   }