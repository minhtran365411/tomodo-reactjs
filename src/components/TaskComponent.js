import { IoTrashBinSharp } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import axios from "axios";

//task
import { useEffect, useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from "react-native-web";



function TasksComponent(props) {

    const [taskStatus, setTaskStatus] = useState(); //props.task.done
    const [taskId, setTaskId] = useState(props.task._id);
    const [subTasks, setSubTasks] = useState([]);


    //useEffect to implement update status
    useEffect(() => {
      axios.get('http://localhost:4000/tasks/'+taskId)
      .then((res) => {
        //console.log(res.data.done)
        setTaskStatus(res.data.done)
      })
      .catch((err) =>  console.log('Error whiling caching status')+err)
    },[taskStatus]);

    //toggle task status to show done and un done mask
    const toggleDone = (taskStatus) => {
        if (taskStatus === 'false') {
            
            axios.put('http://localhost:4000/tasks/'+taskId, {done: 'true'})
            .then((res) => {
              //Reload data when update
                axios.get('http://localhost:4000/tasks/'+taskId)
                .then((res) => {
                  //console.log(res.data.done)
                  setTaskStatus(res.data.done)
                })
                .catch((err) =>  console.log('Error whiling caching status')+err)
            })
            .catch((err)=> console.log('Error while updating status'+ err))
        } else if (taskStatus === 'true') {
            axios.put('http://localhost:4000/tasks/'+taskId, {done: 'false'})
            .then((res) => {
              //Reload data when update
              axios.get('http://localhost:4000/tasks/'+taskId)
              .then((res) => {
                //console.log(res.data.done)
                setTaskStatus(res.data.done)
              })
              .catch((err) =>  console.log('Error whiling caching status')+err)
            })
            .catch((err)=> console.log('Error while updating status'+ err))
        }
      
    }

  //delete one task
  const deleteTask = (taskIdToDelete) => {
    axios.delete('http://localhost:4000/tasks/'+taskIdToDelete)
    .then()
    .catch((err) => console.log('Error when delete')+err);
  }


    return (
        <TouchableOpacity style={[styles.task,
        { //this is to highlight selected big task
          backgroundColor: props.checkSelected === taskId ? '#fad2d2' : '#fff'
        }]}
          horizontal={true} 
          onPress={() => {
            props.selectedFn(taskId);
            props.subTaskFn(props.task.subTasks); //to reset sub task list
          }}
          >

          <TouchableOpacity onPress={() => toggleDone(taskStatus)} style={styles.square}>
            <Text>
                {taskStatus === 'true'? "✔️" : ""}
            </Text>
          </TouchableOpacity>
        
            {/* conditional styling, have a line through if task is done. Will add condition not being able to edit task if done later */}
          <Text style={[styles.taskTitle, {color: taskStatus === 'true'? '#a8a8a8':'#000',textDecoration: taskStatus === 'true'? 'line-through': 'none'}]}>{props.task.taskTitle}</Text>

          {/*<TouchableOpacity style={styles.editBtn}> <MdEdit /> </TouchableOpacity>*/}
          <TouchableOpacity onPress={() => deleteTask(taskId)} style={styles.deleteBtn}><IoTrashBinSharp style={{color: "#fff"}} /></TouchableOpacity>

        </TouchableOpacity>
    )
}

export default TasksComponent;


const styles = StyleSheet.create({
    square: {
      borderColor: "#f26100",
      borderWidth: 2,
      c: 5,
      marginRight: 15,
      flex: 0.3,
      justifyContent: "center",
      alignItems: "center"
    },
    task: {
      flexDirection: "row",
      flex: 1,
      paddingVertical: 10
    },
    container: {
      flex: 1
    },
    taskTitle: {
      flex: 3
    },
    editBtn: {
      backgroundColor: "#99ccff",
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
    },
    deleteBtn: {
      backgroundColor: "#751207",
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
    }
  })