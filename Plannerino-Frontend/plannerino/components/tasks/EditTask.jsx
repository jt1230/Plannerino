import { Box, Button, TextField } from "@mui/material";
import { useSetRecoilState, useRecoilValue } from "recoil";
import tasksState from "atoms/tasksState";
import authState from "atoms/authState";
import fetchElement from "features/users/fetch-element";
import editElement from "features/users/edit-element";

export default function EditTask({ task, toggleEdit, setToggleEdit }) {
  const auth = useRecoilValue(authState);
  const setTasks = useSetRecoilState(tasksState);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let taskToBeUpdated = { ...task };
    taskToBeUpdated.title = data.get("title");
    taskToBeUpdated.category = data.get("category");

    const updateTask = await editElement(`https://localhost:7063/api/UserTask/${task.id}/${auth.id}`, taskToBeUpdated);

    // If the task was updated successfully, update tasks on client.
    if (updateTask) {
      const updatedTasksList = await fetchElement(`https://localhost:7063/api/User/${auth.id}/tasks`);
      setTasks(updatedTasksList);
    }
    setToggleEdit({ ...toggleEdit, [task.id]: !toggleEdit[task.id] });
  };

  return (
    <>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{
          position: "absolute",
          left: 0,
          top: "25%",
          zIndex: 100,
          backgroundColor: "white",
          height: "50%",
          width: "35%",
        }}
        display="flex"
        flexDirection="row"
        gap="1rem"
        alignItems="center"
      >
        <TextField
          required
          variant="filled"
          margin="dense"
          id="category"
          label="Category"
          name="category"
          placeholder={task.category}
          autoFocus
          size="small"
        />
        <TextField
          required
          variant="filled"
          margin="none"
          id="title"
          label="Title"
          name="title"
          placeholder={task.title}
          autoFocus
          size="small"
        />

        <Button
          type="submit"
          variant="contained"
          size="small"
          sx={{ mt: "0.25rem", bgcolor: "#483434" }}
        >
          Save
        </Button>
      </Box>
    </>
  );
}
