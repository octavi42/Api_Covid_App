const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config'); 

app.listen(5000, () => console.log('listening at 5000'));
app.use(express.static('public'));
app.use(express.static('public/Pages/Places/placesPageJS'));
app.use(express.json({limit: '1mb'}));

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

mongoose.connect(process.env.DataBaseConnection, { useNewUrlParser: true, useUnifiedTopology: true}, () => {
    
})

var db = mongoose.connection;

if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")