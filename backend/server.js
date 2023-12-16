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
  await mongoose.connect('mongodb+srv://admin:DataRep2023@tomodo.uheqf0v.mongodb.net/');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

//use mongoose schema to create a model for data
const taskSchema = new mongoose.Schema({
    taskTitle: String,
    done: String,
    subTasks: Array
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
        done: req.body.done,
        subTasks: []
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
//update task status
app.put('/tasks/:id', async(req,res) => {
    console.log('Update status of'+req.params.id);
    let taskLookUp = await taskModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    )
    res.send(taskLookUp)
})

//delete task
app.delete('/tasks/:id', async(req,res) => {
    console.log('Deleted:'+req.params.id);
    let deleteTask = await taskModel.findByIdAndDelete({_id:req.params.id}); // delete function
    res.send(deleteTask);
})

//get a specific sub task from task id to update
app.put('/subtask/:id', async(req,res) => {
    let taskLookUp;
    const taskTitleToLookUp = req.body.subTaskTitle; 

    //update status
    if(req.body.done) {
        const taskStatusToUpdate = req.body.done; 
        //subTasks: {$elemMatch:  {subTaskTitle: taskTitleToLookUp}}
            //look up the task that hold that subtask
            taskLookUp = await taskModel.updateOne({_id:req.params.id},
                {
                    $set : {
                        "subTasks.$[subTasks].done": taskStatusToUpdate //only update that specific record
                    }},
                    { arrayFilters: [ { "subTasks.subTaskTitle": {$eq: taskTitleToLookUp} } ], upsert: true } //using array filter to read in the record
            );
        //console.log(taskLookUp)
        res.send(taskLookUp)
    }
    
    //update title
    if(req.body.newSubTaskTitle) {
        const taskTitleToUpdate = req.body.newSubTaskTitle; 

        //subTasks: {$elemMatch:  {subTaskTitle: taskTitleToLookUp}}
            //look up the task that hold that subtask
            taskLookUp = await taskModel.updateOne({_id:req.params.id},
                {
                    $set : {
                        "subTasks.$[subTasks].subTaskTitle": taskTitleToUpdate //only update that specific record
                    }},
                    { arrayFilters: [ { "subTasks.subTaskTitle": {$eq: taskTitleToLookUp} } ], upsert: true } //using array filter to read in the record
            );
        //console.log(taskLookUp)
        res.send(taskLookUp)
    }

    
})

//delete subtask
app.put('/subtask/delete/:id', async(req,res) => {
        
    let taskLookUp;
    const taskTitleToDelete = req.body.subTaskTitle; 


        //look up the task that hold that subtask
        taskLookUp = await taskModel.updateOne({_id:req.params.id},
            {
                $pull : {
                    subTasks: {subTaskTitle: taskTitleToDelete}  //find that sub task and delete
                }}
        );
    res.send(taskLookUp)
     

})

//app listen to have server hosted
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })