import App from "../App";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import { StyleSheet, Text, FlatList, TouchableOpacity } from "react-native-web";

//import usestate to set data
import { useState, useEffect } from "react";
//axios to call data from backend
import axios from "axios";

//import components
import TasksComponent from "../components/TaskComponent";
import SubTaskComponent from "../components/SubTaskComponent";

//ffe3d9 for selected tasks
function InprogressTasks() {

  const [tasks, setTasks] = useState();
  //sub-task declaration
  const [selectedTaskId, setSelectedTaskId] = useState();
  //to ensure to choose the first task in load
  const [firstLoad, setFirstLoad] = useState(false);

  //useEffect to allow the web to retrieve data without stopping the web
  useEffect(() => {
    axios.get('http://localhost:4000/tasks') //axios is kind of like a promise, the web wont freeze
    .then(
      (res) => {
        //console.log(res.data);
        setTasks(res.data);
        if(!firstLoad) {
          setSelectedTaskId(tasks[0]._id); //this have to be here so that it only happens after task is loaded
          setFirstLoad(true)
        }
        
      }
    ) //async, callback function is a fn pass using another fn, fill in what we want the callback to do in then ()
    .catch(
      (error) => {console.log('Error catched: '+error)}
    )
  }, [tasks]); // anything that is in the bracket means that to evoke reload if this data changes => reload data
  //I have this here because it is efficient for my asdd new task and delete task
  //update instantly

  //useState for new task
  const [taskTitle, setTaskTile] = useState()

  //create new task - add into state array
  const addTask = (e) => {
    e.preventDefault(); //stop this from being called all the time
    //default status will be false


    //create a var that hold the new task
    const newTask = {
        taskTitle: taskTitle,
        done: 'false'
    }

    //connect to axios post to pot to backend
    axios.post('http://localhost:4000/tasks', newTask)
    .then((res) => {
      console.log('from frontend'+res.data)
      //to clear up form menu after pusinh in array
      setTaskTile('')
    })
    .catch((err)=> console.log('Error catched: '+err))

  }

  //sub-tasks 
  const [subTasks, setSubTasks] = useState([]);//tasks[0].subTasks
  const [subTaskTitle, setSubTaskTitle] = useState();
 

  //assign a value when clicking on component task
  const selectedTask = (selectedTaskIdFromComponent) => {
    setSelectedTaskId(selectedTaskIdFromComponent);
  }

  const setSubTaskFn = (subTaskArr) => {
    setSubTasks(subTaskArr);
  }


  const addSubTask = (e) => {
    e.preventDefault();

    //create a clone array to push
    const cloneSubTask = subTasks;

    //create a var that hold the new sub task
    const newSubTask = {
      subTaskTitle: subTaskTitle,
      done: 'false'
    }
    cloneSubTask.push(newSubTask);
    console.log(cloneSubTask)

        axios.put('http://localhost:4000/tasks/'+selectedTaskId, {subTasks: cloneSubTask})
            .then((res) => {
              //to reset the input
              setSubTaskTitle('');
            })
            .catch((err)=> console.log('Error while updating status'+ err))
        

  }



  return (
    <div>
    <App></App>
    <Container style={{marginTop: 50}}>

      {/* Add a task form */}
      <Form onSubmit={addTask}>
      {/* having row and col to achive inline styling */}
        <Row> 
          <Col>
              <Form.Control type="text" placeholder="Input your new task" value={taskTitle} onChange={(e) => {setTaskTile(e.target.value)}} />
          </Col>
          <Col>
              <Button type="submit" variant="primary" style={styles.addTaskBtn}>
              + Add a new task
              </Button>{' '}
          </Col>
        </Row>
      </Form>

    <Row> 
      <Col className="mycol" sm={4}>

      {/* print out a list of task */}
      <FlatList
        style={styles.container}
        data={tasks}
        renderItem={({item}) => <TasksComponent checkSelected={selectedTaskId} task={item} selectedFn={(taskID) => selectedTask(taskID)} subTaskFn={(subTaskArr) => setSubTaskFn(subTaskArr)} />}
        keyExtractor={item => item.id}
      />

      </Col>
      <Col className="mycol" sm={8}>

        <Row style={{marginTop: 10}}>

          {/* Add a sub task form */}
          <Form onSubmit={addSubTask}>
          {/* having row and col to achive inline styling */}
            <Row> 
              <Col xs={10}>
                  <Form.Control type="text" placeholder="Add a sub task" value={subTaskTitle} onChange={(e) => {setSubTaskTitle(e.target.value)}} />
              </Col>
              <Col>
                  <Button type="submit" variant="primary" style={styles.addTaskBtn}>
                  + 
                  </Button>{' '}
              </Col>
            </Row>
          </Form>

        </Row>

        <Row>
          {/* print out a list of sub task */}
          <FlatList
            style={styles.container}
            data={subTasks}
            renderItem={({item, index}) => <SubTaskComponent index={index} subTask={item} selectedTaskId={selectedTaskId} subTaskFn={(subTaskArr) => setSubTaskFn(subTaskArr)} />}
            keyExtractor={item => item.id}
          />
        </Row>
      
      </Col>
    </Row>


    </Container>
    </div>

  );
}

export default InprogressTasks;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  addTaskBtn: {
    marginBottom: 20
  },
  addTaskBtnText: {
    textTransform: 'uppercase',
    color: 'white',
    fontWeight: 600
  }
})