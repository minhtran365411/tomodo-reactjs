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

//ffe3d9 for selected tasks
function InprogressTasks() {

  const [tasks, setTasks] = useState();

  //useEffect to allow the web to retrieve data without stopping the web
  useEffect(() => {
    axios.get('http://localhost:4000/tasks') //axios is kind of like a promise, the web wont freeze
    .then(
      (res) => {
        setTasks(res.data.tasks);
        console.log('from inprogress'+tasks);
      }
    ) //async, callback function is a fn pass using another fn, fill in what we want the callback to do in then ()
    .catch(
      (error) => {console.log('Error ctached: '+error)}
    )
  }, []); // the [] brackets are to stop the useeffect to be called all the time

  //useState for new task
  const [taskTitle, setTaskTile] = useState()

  //create new task - add into state array
  const addTask = (e) => {
    e.preventDefault(); //stop this from being called all the time
    console.log('Task title:' + taskTitle)
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
    .catch((err)=> console.log('Error ctached: '+err))

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
        renderItem={({item}) => <TasksComponent task={item} />}
        keyExtractor={item => item.id}
      />

      </Col>
      <Col className="mycol" sm={8}>2</Col>
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
    marginBottom: 20,
  },
  addTaskBtnText: {
    textTransform: 'uppercase',
    color: 'white',
    fontWeight: 600
  }
})