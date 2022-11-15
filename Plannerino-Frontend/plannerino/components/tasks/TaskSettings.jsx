import { Box, Button, Grid, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function TaskSettings({ task, toggleEdit, setToggleEdit }) {
  const handleEditTask = (taskId) => {
    setToggleEdit({ ...toggleEdit, [taskId]: !toggleEdit[taskId] });
  };

  const handleDeleteTask = async (taskId) => {
    await fetch(`https://localhost:7063/api/UserTask/${taskId}`, {
      method: "DELETE",
    });
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
          right: 0,
          mx: "auto",
          top: "15%",
          backgroundColor: "white",
          zIndex: 100,
          width: "20%",
          border: 1,
        }}
      >
        <Grid item xs={12} borderBottom={1}>
          <Button
            fullWidth
            startIcon={<EditIcon aria-label="edit" />}
            onClick={() => handleEditTask(task.id)}
          >
            EDIT
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
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
