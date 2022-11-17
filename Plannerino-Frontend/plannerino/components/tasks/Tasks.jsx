import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Router from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import authState from "atoms/authState";
import tasksState from "atoms/tasksState";
import Navbar from "components/Navbar";
import CreateTask from "components/tasks/CreateTask";
import TaskSettings from "components/tasks/TaskSettings";
import EditTask from "./EditTask";

export default function Tasks() {
  const [auth, setAuth] = useRecoilState(authState);
  const [tasks, setTasks] = useRecoilState(tasksState);
  const [sortedTasks, setSortedTasks] = useState([]);
  const [addTask, setAddTask] = useState(false);
  const [clickedTask, setClickedTask] = useState({});
  const [toggleSettings, setToggleSettings] = useState({});
  const [toggleEdit, setToggleEdit] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const getAllTasks = async () => {
      const response = await fetch(
        `https://localhost:7063/api/User/${auth.id}/tasks`
      );
      let data = await response.json();
      setTasks(data);
    };
    getAllTasks();
    setSortedTasks([...tasks]);
  }, []);

  const handleTaskClick = (task) => {
    setClickedTask({ ...task });
    setToggleSettings({ ...toggleSettings, [task.id]: !toggleSettings[task.id] });
  };

  const handleEditTask =  (task) => {
    setToggleEdit({ ...toggleEdit, [task.id]: !toggleEdit[task.id] });
  };

  if (auth == null) {
    Router.push("/");
  } else
    return (
      <>
        {addTask ? <CreateTask setAddTask={setAddTask} /> : null}
        <Grid container sx={{ height: "100vh" }}>
          <Grid item xs={3}>
            <Navbar />
          </Grid>
          <Grid container item xs={9} borderLeft={1} >
            <Grid
              item
              xs={12}
              mx="1rem"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              maxHeight="10%"
            >
              <Typography variant="h4" gutterBottom>
                My Tasks
              </Typography>
              <Button
                endIcon={<AddIcon aria-label="add task" />}
                variant="outlined"
                size="medium"
                sx={{ height: "50%", mr: "1rem" }}
                onClick={() => setAddTask(true)}
              >
                Add Task
              </Button>
            </Grid>
            <Grid container item xs={12} maxHeight="90%" overflow="auto">
              {sortedTasks
                .sort(
                  (a, b) =>
                    a.category.localeCompare(b.category) ||
                    a.title.localeCompare(b.title)
                )
                .map((task) => {
                  return (
                    <Grid
                      key={task.id}
                      item
                      xs={12}
                      height="20%"
                      display="flex"
                      alignItems="center"
                      borderTop={1}
                      sx={{
                        position: "relative",
                        "&:hover": { background: "gray", cursor: "pointer" },
                      }}
                      onClick={() => handleTaskClick(task)}
                    >
                      <Avatar
                        container
                        sx={{ height: "3rem", width: "3rem", margin: 1 }}
                      >
                        <Typography variant="subtitle2">
                          {task.category}
                        </Typography>
                      </Avatar>
                      {task.title}
                      <IconButton
                        sx={{ ml: "auto" }}
                        onClick={() => handleTaskClick(task.id)}
                      >
                        <MoreVertIcon aria-label="edit task" />
                      </IconButton>
                      <Box
                        style={{ display: toggleSettings[task.id] ? "block" : "none" }}
                      >
                        <TaskSettings
                          task={clickedTask}
                          toggleEdit={toggleEdit}
                          setToggleEdit={setToggleEdit}
                        />
                      </Box>
                      <Box
                        style={{ display: toggleEdit[task.id] ? "block" : "none" }}
                      >
                         <EditTask task={clickedTask} toggleEdit={toggleEdit}
                          setToggleEdit={setToggleEdit}/>
                      </Box>
                    </Grid>
                  );
                })}
            </Grid>
          </Grid>
        </Grid>
      </>
    );
}
