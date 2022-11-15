import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRecoilValue, useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import authState from "atoms/authState";
import tasksState from "atoms/tasksState";

export default function ShowTasks({ setShowTask, category, tasks }) {
  const auth = useRecoilValue(authState);

  const handleDeleteTask = async () => {
    await fetch(
      `https://localhost:7063/api/UserTask/${task.id}`,
      {
        method: "DELETE",
      }
    );
  }

  const handleExitBtn = (event) => {
    event.stopPropagation();
    setShowTask(false);
  }

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
          top: "7.5%",
          backgroundColor: "white",
          zIndex: 100,
          height: "92.5%",
          width: "25%",
          border: 1,
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
        {tasks.filter(c => c == category).map(task => {
          return (
            <Box>
              <Typography>{task.title}</Typography>
              <Typography>{task.description}</Typography>
              <Typography>{task.category}</Typography>
              <Typography>{task.isCompleted ? "Completed" : "In Progress"}</Typography>

              <Button
                variant="contained"
                color="error"
                startIcon={<DeleteIcon aria-label="delete task" />}
                sx={{ mt: "auto", mb: "1rem" }}
                onClick={handleDeleteTask}
              >
                Delete Task
              </Button>

            </Box>

          )
        })

        }
      </Box>
    </>
  );
}