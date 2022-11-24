import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import { useEffect } from "react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import authState from "atoms/authState";
import tasksState from "atoms/tasksState";
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
  }, [auth]);

  const handleTaskClick = (task) => {
    setClickedTask({ ...task });
    setToggleSettings({
      ...toggleSettings,
      [task.id]: !toggleSettings[task.id],
    });
  };

  return (
    <>
      {addTask ? <CreateTask setAddTask={setAddTask} /> : null}
      <Grid
        container
        item
        xs={12}
        justifyContent="space-between"
        alignItems="center"
        paddingX="1rem"
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
      <Grid item xs={12} maxHeight="90%" overflow="auto">
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
    </>
  );
}
