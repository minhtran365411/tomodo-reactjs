import { IoTrashBinSharp } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import axios from "axios";

//task
import { useEffect, useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from "react-native-web";



function SubTaskComponent(props) {
    const [taskStatus, setTaskStatus] = useState(props.subTask.done); //props.task.done
    //const [index, setIndex] = useState(props.index);

//toggle task status to show done and un done mask
const toggleDone = (taskStatus) => {

    if (taskStatus === 'false') {
        //setTaskStatus('true');

        let subTaskToUpdate = {
          taskId: props.selectedTaskId,
          subTaskTitle: props.subTask.subTaskTitle, 
          done: 'true',
          index: props.index
        }

        axios.put('http://localhost:4000/subtask/'+ props.selectedTaskId, subTaskToUpdate)
            .then((res) => {
              //Reload data when update
                // axios.get('http://localhost:4000/tasks/'+props.selectedTaskId)
                // .then((res) => {
                //   //console.log(res.data)
                //   setTaskStatus(res.data.subTasks[props.index].done)
                // })
                // .catch((err) =>  console.log('Error whiling caching status')+err)
            })
            .catch((err)=> console.log('Error while updating status'+ err))

    } else if (taskStatus === 'true') {

      let subTaskToUpdate = {
        subTaskTitle: props.subTask.subTaskTitle, 
        done: 'false'
      }

        axios.put('http://localhost:4000/subtask/'+ props.selectedTaskId, subTaskToUpdate)
            .then((res) => {
              //Reload data when update
                // axios.get('http://localhost:4000/tasks/'+props.selectedTaskId) // {subTasks: {subTaskTitle: props.subTask.subTaskTitle}})
                // .then((res) => {
                //   //console.log(res.data)
                //   setTaskStatus(res.data.subTasks[props.index].done)
                // })
                // .catch((err) =>  console.log('Error whiling caching status')+err)
            })
            .catch((err)=> console.log('Error while updating status'+ err))

    }
  
}

    return (
        <View style={styles.task}>
          <TouchableOpacity onPress={() => toggleDone(taskStatus)} style={styles.square}>
            <Text>
                {props.subTask.done === 'true'? "✔️" : ""}
            </Text>
          </TouchableOpacity>
        
            {/* conditional styling, have a line through if task is done. Will add condition not being able to edit task if done later */}
          <Text style={[styles.taskTitle, {color: props.subTask.done === 'true'? '#a8a8a8':'#000',textDecoration: props.subTask.done === 'true'? 'line-through': 'none'}]}>{props.subTask.subTaskTitle}</Text>
          {/* {props.index} is to get index*/}
          <TouchableOpacity style={styles.editBtn}> <MdEdit /> </TouchableOpacity>
          <TouchableOpacity onPress={() => {}} style={styles.deleteBtn}><IoTrashBinSharp style={{color: "#fff"}} /></TouchableOpacity>
        </View>
    )
}

export default SubTaskComponent;

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