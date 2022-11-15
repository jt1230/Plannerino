// OM JAG ORKAR 

import {
  Avatar,
  Box,
  Button,
  Checkbox,
  IconButton,
  List,
  ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction,
  Typography,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRecoilValue, useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import authState from "atoms/authState";
import tasksState from "atoms/tasksState";
import { TaskAltRounded } from "@mui/icons-material";

export default function ShowTasks({ setShowTask, category, tasks }) {
  const auth = useRecoilValue(authState);
  const [currentTasks, setCurrentTasks] = useState([...tasks]);
  const [isChecked, setIsChecked] = useState();

  const isCheckboxChecked = (index) => {
    setIsChecked(index)
}

  const handleDeleteTask = async (taskId) => {
    await fetch(`https://localhost:7063/api/UserTask/${taskId}`, {
      method: "DELETE",
    });
  };

  const handleExitBtn = (event) => {
    event.stopPropagation();
    setShowTask(false);
  };

  const toggleItem = (event) => {
     
    };
    

    // const updateTask = async (task) => {
    //   await fetch(`https://localhost:7063/api/UserTask/${task.id}`, {
    //     method: "PUT",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(taskToBeUpdated),
    //   });
    // };

    // if (checked) {
    //   taskToBeUpdated.completed = true;
    //   updateTask(task);
    // }
    // else{
    //   taskToBeUpdated.completed = false;
    //   updateTask(task);
    // }
  // };

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{
          position: "absolute",
          right: 0,
          right: 0,
          mx: "auto",
          top: "8.6%",
          backgroundColor: "white",
          zIndex: 100,
          height: "91%",
          width: "25%",
          borderLeft: 1,
        }}
      >
        <IconButton
          size="small"
          sx={{
            ml: "auto",
            mr: "1rem",
            color: "#483434",
            borderColor: "#483434",
          }}
          onClick={(event) => handleExitBtn(event)}
        >
          <CancelIcon />
        </IconButton>

        <List>

        {currentTasks.map((task) => {
          return (
            <ListItem
              key={task.id}
              button
              secondaryAction={
                <IconButton edge="end" onClick={handleDeleteTask(task.id)}>
                <DeleteIcon />
              </IconButton>
              }
              >
              <ListItemIcon>
                <Checkbox disableRipple edge="start" checked={task.isCompleted} />
              </ListItemIcon>
              <ListItemText
                primary={
                  task.isCompleted ? (
                    <b>
                      <strike>{task.text}</strike>
                    </b>
                  ) : (
                    task.title
                    )
                  }
                  />
            </ListItem>)
           
        })}
      </List>
      </Box>
    </>
  );
}
