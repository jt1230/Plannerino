import { Box, Button, TextField, Typography } from "@mui/material"
import { useRecoilValue, useSetRecoilState } from "recoil";
import authState from "atoms/authState";
import tasksState from "atoms/tasksState";
import fetchElement from "features/users/fetch-element";
import createElement from "features/users/create-element";

export default function CreateTask({ setAddTask }) {
  const auth = useRecoilValue(authState);
  const setTasks = useSetRecoilState(tasksState)
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let taskToBeCreated = {title:"", category:"", isCompleted: false};
    taskToBeCreated.title = data.get("title");
    taskToBeCreated.category = data.get("category");
    const createTask = await createElement(`https://localhost:7063/api/UserTask?userId=${auth.id}`, taskToBeCreated);
    
		// If the task was created successfully, update tasks on client.
    if(createTask === 200){
      const updatedTasksList = await fetchElement(`https://localhost:7063/api/User/${auth.id}/tasks`);
      setTasks(updatedTasksList);
		}
    setAddTask(false);
  };

  return (
    <>

        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{ position: "absolute", left: 0, right: 0, mx: "auto", top: "15%", backgroundColor: "white", zIndex: 100, height: "70%", width: "30%", border: 4 }}>
          <Typography gutterBottom>Add New Task</Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mx: "4em" }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              placeholder="Title"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="category"
              label="Category"
              name="category"
              placeholder="Category"
              autoFocus
            />
            <Box display="flex" gap={3} width="100%">
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="small"
                sx={{ mt: "1rem", bgcolor: "#483434" }}
              >
                Add task
              </Button>
              <Button
                type="button"
                fullWidth
                variant="outlined"
                size="small"
                sx={{ mt: "1rem", color: "#483434", borderColor: "#483434" }}
                onClick={() => setAddTask(false)}
              >
                Cancel
              </Button>
              </Box>
            </Box>
            </Box>
        </>
        )
}