import App from "../App";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import { StyleSheet, Text, FlatList, TouchableOpacity } from "react-native-web";

//import usestate to set data
import { useState } from "react";

//import components
import TasksComponent from "../components/TaskComponent";

//ffe3d9 for selected tasks
function InprogressTasks() {
  const dataArray= [
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
    }
  ]
  const [tasks, setTasks] = useState(dataArray);

  //useState for new task
  const [taskTitle, setTaskTile] = useState()

  //create new task - add into state array
  const addTask = (e) => {
    e.preventDefault(); //stop this from being called all the time
    console.log('Task title:' + taskTitle)
    //default status will be false

    //a clone task array data to push new task into
    const cloneTaskData = tasks;
    cloneTaskData.push(
      {
        taskTitle: taskTitle,
        done: 'false'
      }
    )

    setTasks(cloneTaskData);

    //to clear up form menu after pusinh in array
    setTaskTile('')

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