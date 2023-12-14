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

//connect mongoose
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://minhtran:Thatxam123!@tomodocluster.utxrx2u.mongodb.net/');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

//use mongoose schema to create a model for data
const taskSchema = new mongoose.Schema({
    taskTitle: String,
    done: String
})

//Create the model from Schema
const taskModel = mongoose.model('tasks', taskSchema);

app.get('/', (req, res) => {
    res.send('Hello')
})

app.post('/tasks', (req, res) => {
    console.log(req.body);

    //add req data into model
    taskModel.create({
        taskTitle: req.body.taskTitle,
        done: req.body.done
    })
    .then(() => {res.send('New task created!')})
    .catch(() => {res.send('Error occured when creating a new task')})

})

//have async and await because data need to be retrived from mongo, asynchronous will prevent freeze website
app.get('/tasks', async (req, res) => {
    //retrieve task data from mongo atlas service
    let tasks = await taskModel.find({}); //find without anything will return all
    //console.log(tasks);
    //i did this to destructure the code, giving it an array structure to use with flatlist
    res.json([...tasks]);
})

//get a specific task id to update
app.get('/tasks/:id', async(req,res) => {
    let taskLookUp = await taskModel.findById({_id:req.params.id})
    res.send(taskLookUp)
})
//app listen to have server hosted
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })