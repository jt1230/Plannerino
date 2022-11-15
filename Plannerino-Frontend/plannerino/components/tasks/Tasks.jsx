import { Avatar, Button, Grid, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Router from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import authState from "atoms/authState";
import tasksState from "atoms/tasksState";
import Navbar from "components/Navbar";
import CreateTask from "components/tasks/CreateTask";
import ShowTasks from "components/tasks/ShowTasks";

export default function Tasks() {
  const [auth, setAuth] = useRecoilState(authState);
  const [tasks, setTasks] = useRecoilState(tasksState);
  const [categories, setCategories] = useState([]);
  const [currentTasks, setCurrentTasks] = useState([]);
  const [showTask, setShowTask] = useState(false);
  const [addTask, setAddTask] = useState(false);

  useEffect(() => {
    const getAllTasks = async () => {
      const response = await fetch(`https://localhost:7063/api/User/${auth.id}/tasks`)
      let data = await response.json();
      setTasks(data);
    }
    getAllTasks();
    allCategories();

  }, [tasks]);

  const handleTaskClick = (tasks) => {
    setCurrentTasks((currentTasks = { ...tasks }));
    setShowTask(true);
  };

  const allCategories = () =>{
    let uniqueCategories = [];
    for(var i = 0; i < tasks.length; i++){
      if(!uniqueCategories.find(category => category == tasks[i].category)){
        uniqueCategories.push(tasks[i].category);
      }
    }
    setCategories(uniqueCategories);
  }

  if (auth == null) {
    Router.push('/');
  }
  else
    return (
      <>
        <Grid container spacing={2} height="100vh">
          <Grid item xs={3}>
            <Navbar />
          </Grid>
          <Grid container item direction="column" xs={9} borderLeft={1} my="1rem">
            <Grid item display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h4" gutterBottom>
                My Tasks
              </Typography>
              <Button
                endIcon={<AddIcon aria-label="add task" />}
                variant="outlined"
                size="medium"
                sx={{ height: "80%", mr: "1rem" }}
                onClick={() => setAddTask(true)}
              >
                Add Task
              </Button>
            </Grid>
            {/* {tasks.map(task => {
              return (
                <Grid key={task.id} item display="flex" alignItems="center" borderTop={1} sx={{
                  "&:hover": { background: "gray", cursor: "pointer" }
                }}
                onClick={() => handleTaskClick(task)}>
                  <Avatar container
                    sx={{ height: "3rem", width: "3rem", margin: 1 }}>
                    <Typography variant="subtitle2">{task.category}</Typography>
                  </Avatar>
                  {task.title}
                  <IconButton sx={{ml:"auto"}}>
                    <MoreVertIcon aria-label="edit task" />
                  </IconButton>
                  {showTask ? <ShowTask setShowTask={setShowTask} task={currentTask} /> : null}
                </Grid>
              )
            })}
             */}
             {categories.map(category => {
              return (
                <Grid key={category.id} item display="flex" alignItems="center" borderTop={1} sx={{
                  "&:hover": { background: "gray", cursor: "pointer" }
                }}
                onClick={() => handleTaskClick(tasks)}>
                  <Avatar container
                    sx={{ height: "3rem", width: "3rem", margin: 1 }}>
                    <Typography variant="subtitle2">{category}</Typography>
                  </Avatar>
                  {category}
                  <IconButton sx={{ml:"auto"}}>
                    <MoreVertIcon aria-label="edit task" />
                  </IconButton>
                  {showTask ? <ShowTasks setShowTask={setShowTask} category={category} tasks={currentTasks} /> : null}
                </Grid>
              )
            })}
          </Grid>
          {addTask ? <CreateTask setAddTask={setAddTask} /> : null}
        </Grid>

      </>
    );
}
