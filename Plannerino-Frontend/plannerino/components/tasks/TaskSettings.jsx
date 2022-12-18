import { Button, Grid } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRecoilValue, useSetRecoilState } from "recoil";
import authState from "atoms/authState";
import tasksState from "atoms/tasksState";
import fetchElement from "features/users/fetch-element";
import deleteElement from "features/users/delete-element";

export default function TaskSettings({ task, toggleEdit, setToggleEdit }) {
  const auth = useRecoilValue(authState);
  const setTasks = useSetRecoilState(tasksState);

  const handleEditTask = (taskId) => {
    setToggleEdit({ ...toggleEdit, [taskId]: !toggleEdit[taskId] });
  };

  const handleDeleteTask = async (taskId) => {
    const deleteTask = await deleteElement(`https://localhost:7063/api/UserTask/${taskId}`);

    // If the task was deleted successfully, update tasks on client
    if (deleteTask === 200) {
      const updatedTasksList = await fetchElement(`https://localhost:7063/api/User/${auth.id}/tasks`);
      setTasks(updatedTasksList);
    }
  };

  return (
    <>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        sx={{
          position: "absolute",
          right: "2%",
          mx: "auto",
          top: "5%",
          backgroundColor: "white",
          zIndex: 100,
          width: "15%",
          border: 1,
        }}
      >
        <Grid item xs={12} borderBottom={1}>
          <Button
            size="small"
            startIcon={<EditIcon aria-label="edit" />}
            onClick={() => handleEditTask(task.id)}
          >
            EDIT
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            size="small"
            startIcon={<DeleteIcon aria-label="delete" />}
            onClick={() => handleDeleteTask(task.id)}
          >
            DELETE
          </Button>
        </Grid>
        <Grid item xs={12}></Grid>
      </Grid>
    </>
  );
}
