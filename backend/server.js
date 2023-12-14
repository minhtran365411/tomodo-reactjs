const express = require('express');
const path = require('path');
const bodyParser =  require('body-parser');
const cors = require('cors')
const app = express();
const port = 4000;

//mongoose is to connect to my database mongo
const mongoose = require('mongoose');

//get my update


app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
    next();
    
});


// Serve the static files from the React app
//This code is to make both client side & server side being host from 1 source/domain
app.use(express.static(path.join(__dirname, '../build')));
app.use('/static', express.static(path.join(__dirname, 'build//static')));

app.get('/', (req, res) => {
    res.send('Hello')
})

app.get('/tasks', (req, res) => {
    let data = [
        {
          taskTitle: 'Cook',
          done: 'false',
        },
        {
          taskTitle: 'Eat',
          done: 'true',
        },
        {
          taskTitle: 'Study',
          done: 'false',
        },
        {
            taskTitle: 'Sleep',
            done: 'true',
          }
      ]

//status 200 means everything works
      res.status(200).json({ 

        tasks:data, 
        
        }) 
})

app.post('/tasks', (req, res) => {
    console.log(req.body);
})

//app listen to have server hosted
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })