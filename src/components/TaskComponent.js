import { IoTrashBinSharp } from "react-icons/io5";
import { MdEdit } from "react-icons/md";

//task
import { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from "react-native-web";



function TasksComponent(props) {

    const [taskStatus, setTaskStatus] = useState(props.task.done);
    console.log(props)

    //toggle task status to show done and un done mask
    const toggleDone = (taskStatus) => {
        if (taskStatus === 'false') {
            setTaskStatus('true')
        } else if (taskStatus === 'true') {
            setTaskStatus('false')
        }
    }

    return (
        <TouchableOpacity style={styles.task}
          horizontal={true} >

          <TouchableOpacity onPress={() => toggleDone(taskStatus)} style={styles.square}>
            <Text>
                {taskStatus === 'true'? "✔️" : ""}
            </Text>
          </TouchableOpacity>
        
            {/* conditional styling, have a line through if task is done. Will add condition not being able to edit task if done later */}
          <Text style={[styles.taskTitle, {textDecoration: taskStatus === 'true'? 'line-through': 'none'}]}>{props.task.taskTitle}</Text>

          <TouchableOpacity style={styles.editBtn}> <MdEdit /> </TouchableOpacity>
          <TouchableOpacity style={styles.deleteBtn}><IoTrashBinSharp style={{color: "#fff"}} /></TouchableOpacity>

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