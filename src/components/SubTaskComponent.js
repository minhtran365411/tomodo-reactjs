import { IoTrashBinSharp } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import axios from "axios";

//task
import { useEffect, useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from "react-native-web";



function SubTaskComponent(props) {
    //const [taskStatus, setTaskStatus] = useState(props.subTask.done); //i tried to make use of useState with this variable through out the code
    //but for some reason it acted very weirdly in the way they catch this status data
    //so i keep using props.subTask.done instead
    //const [index, setIndex] = useState(props.index);

//toggle task status to show done and un done mask
const toggleDone = (taskStatus) => {

    if (taskStatus === 'false') {
        //setTaskStatus('true');

        let subTaskToUpdate = {
          subTaskTitle: props.subTask.subTaskTitle, 
          done: 'true',
        }

        axios.put('http://localhost:4000/subtask/'+ props.selectedTaskId, subTaskToUpdate)
            .then((res) => {
              //Reload data when update
                axios.get('http://localhost:4000/tasks/'+props.selectedTaskId)
                .then((res) => {
                  //console.log(res.data.subTasks[props.index].done)
                  props.subTask.done = res.data.subTasks[props.index].done;
                })
                .catch((err) =>  console.log('Error whiling caching status')+err)
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
                axios.get('http://localhost:4000/tasks/'+props.selectedTaskId) // {subTasks: {subTaskTitle: props.subTask.subTaskTitle}})
                .then((res) => {
                  //console.log(res.data.subTasks[props.index].done)
                  props.subTask.done = res.data.subTasks[props.index].done;
                })
                .catch((err) =>  console.log('Error whiling caching status')+err)
            })
            .catch((err)=> console.log('Error while updating status'+ err))

    }
  
}
  //edit button
  const [isEditable, setIsEditable] = useState(false);
  const [newSubTask, setNewSubTask] = useState('');

  const editFn = () => {
    setNewSubTask(props.subTask.subTaskTitle)
    if(!isEditable) {
      //allow editting
      setIsEditable(true);
    } else {
      //set variable to edit
      setIsEditable(false);

      //create a temp var to push
      let subTaskToUpdate = {
        subTaskTitle: props.subTask.subTaskTitle, 
        newSubTaskTitle: newSubTask
      }

      //pushing to database
      axios.put('http://localhost:4000/subtask/'+ props.selectedTaskId, subTaskToUpdate)
          .then((res) => {
            //Reload data when update
              axios.get('http://localhost:4000/tasks/'+props.selectedTaskId)
              .then((res) => {
                //console.log(res.data.subTasks[props.index].done)
                props.subTask.subTaskTitle = res.data.subTasks[props.index].subTaskTitle;
              })
              .catch((err) =>  console.log('Error whiling caching status')+err)
          })
          .catch((err)=> console.log('Error while updating status'+ err))


    }
    
  } 

  const deleteFn = () => {

    let subTaskToUpdate = {
      subTaskTitle: props.subTask.subTaskTitle
    }


         axios.put('http://localhost:4000/subtask/delete/'+ props.selectedTaskId, subTaskToUpdate)
          .then((res) => {
            //Reload data when update
            axios.get('http://localhost:4000/tasks/'+props.selectedTaskId)
              .then((res) => {
                //console.log(res.data.subTasks[props.index].done)
                
              })
              .catch((err) =>  console.log('Error whiling caching status')+err)
          })
          .catch((err)=> console.log('Error while updating status'+ err))

  }

    return (
        <View style={styles.task}>
          <TouchableOpacity onPress={() => toggleDone(props.subTask.done)} style={styles.square}>
            <Text>
                {props.subTask.done === 'true'? "✔️" : ""}
            </Text>
          </TouchableOpacity>
        
            {/* conditional styling, have a line through if task is done. Will add condition not being able to edit task if done later */}
            {isEditable ? 
            <input type="text" value={newSubTask} onChange={(e) => {setNewSubTask(e.target.value)}} />
            :
            <Text style={[styles.taskTitle, {color: props.subTask.done === 'true'? '#a8a8a8':'#000',textDecoration: props.subTask.done === 'true'? 'line-through': 'none'}]}>{props.subTask.subTaskTitle}</Text>
            }
          {/* {props.index} is to get index*/}
          <TouchableOpacity onPress={() => editFn()} style={styles.editBtn}> <MdEdit /> </TouchableOpacity>
          <TouchableOpacity onPress={() => deleteFn()} style={styles.deleteBtn}><IoTrashBinSharp style={{color: "#fff"}} /></TouchableOpacity>
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