import { Avatar, Box, Button, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import authState from "atoms/authState";
import tasksState from "atoms/tasksState";
import CreateTask from "components/tasks/CreateTask";
import EditTask from "components/tasks/EditTask";
import TaskSettings from "components/tasks/TaskSettings";
import fetchElement from "features/users/fetch-element";

export default function Tasks() {
  const auth = useRecoilValue(authState);
  const [dbTasks, setDbTasks] = useRecoilState(tasksState);
  const [sortedTasks, setSortedTasks] = useState([]);
  const [addTask, setAddTask] = useState(false);
  const [clickedTask, setClickedTask] = useState({});
  const [toggleSettings, setToggleSettings] = useState({});
  const [toggleEdit, setToggleEdit] = useState({});

  // Runs on first render, other components will update tasks.
  useEffect(() => {
    const getAllTasks = async () => {
      let data = await fetchElement(`https://localhost:7063/api/User/${auth.id}/tasks`);
      setDbTasks(data);
    };
    getAllTasks();
  }, []);

   // To avoid callback hell, copy dbTasks to a new array that re-mounts everytime dbTasks changes.
  useEffect(() => {
    setSortedTasks([...dbTasks]);
  }, [dbTasks]);

  const handleTaskClick = (task) => {
    setClickedTask({ ...task });
    setToggleSettings({
      ...toggleSettings,
      [task.id]: !toggleSettings[task.id],
    });
  };

  return (
    <Box sx={{height:"1rem"}}>
      {addTask ? <CreateTask setAddTask={setAddTask} /> : null}
      <Grid
        container
        item
        xs={12}
        justifyContent="space-between"
        alignItems="center"
        paddingX="1rem"
        mt="1rem"        
      >
        <Grid item>
          <Typography variant="body1" fontWeight="bold" gutterBottom>
            My Tasks
          </Typography>
        </Grid>
        <Grid item>
          <Button
            endIcon={<AddIcon aria-label="add task" />}
            variant="outlined"
            size="medium"
            sx={{ height: "50%"}}
            onClick={() => setAddTask(true)}
          >
            Add Task
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12} maxHeight="26rem" overflow="auto">
        <List>
          {sortedTasks
            .sort(
              (a, b) =>
                a.category.localeCompare(b.category) ||
                a.title.localeCompare(b.title)
            )
            .map((task) => {
              return (
                <ListItem
                  key={task.id}
                  onClick={() => handleTaskClick(task)}
                  disablePadding
                  sx={{ borderBottom: "1px solid #e0e0e0" }}
                >
                  <ListItemButton>
                    <ListItemIcon>
                      <ListItemAvatar>
                        <Avatar>
                          <LocalGroceryStoreIcon />
                        </Avatar>
                      </ListItemAvatar>
                    </ListItemIcon>
                    <ListItemText primaryTypographyProps={{fontSize: "16px"}}  secondaryTypographyProps={{fontSize: "14px"}}
                      primary={task.title}
                      secondary={task.category}
                    />
                    <IconButton
                      sx={{ ml: "auto" }}
                      onClick={() => handleTaskClick(task.id)}
                    >
                      <MoreVertIcon aria-label="edit task" />
                    </IconButton>
                    <Box
                      style={{
                        display: toggleSettings[task.id] ? "block" : "none",
                      }}
                    >
                      <TaskSettings
                        task={clickedTask}
                        toggleEdit={toggleEdit}
                        setToggleEdit={setToggleEdit}
                      />
                    </Box>
                    <Box
                      style={{
                        display: toggleEdit[task.id] ? "block" : "none",
                      }}
                    >
                      <EditTask
                        task={clickedTask}
                        toggleEdit={toggleEdit}
                        setToggleEdit={setToggleEdit}
                      />
                    </Box>
                  </ListItemButton>
                </ListItem>
              );
            })}
        </List>
      </Grid>
    </Box>
  );
}
