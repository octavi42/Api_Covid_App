const express = require('express');
const app = express();
const mongoose = require('mongoose');

// const aws = require('aws-sdk');

// let s3 = new aws.S3({
//   accessKeyId: process.env.S3_KEY,
//   secretAccessKey: process.env.TEST
// });

require('dotenv').config() 

const port = process.env.PORT || 5000;
app.listen(port, () => {
    //console.log('listening at ' + port);
    // document.getElementById("co19").innerHTML = process.env.TEST
    //console.log('dot env ' + process.env.DATA_BASE)
});
app.use(express.static('public'));
app.use(express.static('public/Pages/Places/placesPageJS'));
app.use(express.json({limit: '1mb'}));

// console.log('db name ' + process.env.DATA_BASE)

const placeRoutes = require('./routes/place');

app.use('/place', placeRoutes)

//console.log('')

app.post('/api', (request, response) => {
    console.log('got request')
    console.log(request.body);

    const data = request.body;
    response.json({
        status: 'SUCCESS', 
        data: data
    });

    response.send('api');
});

app.get('/appi', (req, resp) => {
    resp.send('appi');
})

mongoose.connect(process.env.DATA_BASE, { useNewUrlParser: true, useUnifiedTopology: true}, () => {
    
})

var db = mongoose.connection;

if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")