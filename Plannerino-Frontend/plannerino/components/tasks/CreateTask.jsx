import { Box, Button, Grid, TextField, Typography } from "@mui/material"
import authState from "atoms/authState";
import tasksState from "atoms/tasksState";
import { useRecoilState } from "recoil";

export default function CreateTask({ setAddTask }) {
  const [auth, setAuth] = useRecoilState(authState);
  const [tasks, setTasks] = useRecoilState(tasksState)
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let createTask = {title:"", category:"", isCompleted: false};
    createTask.title = data.get("title");
    createTask.category = data.get("category");

    const response = await fetch(`https://localhost:7063/api/UserTask?userId=${auth.id}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(createTask),
    });
    setAddTask(false);
    
    const getAllTasks = async () => {
			const response = await fetch(
			  `https://localhost:7063/api/User/${auth.id}/tasks`
			);
			let data = await response.json();
			setTasks(data);
		  };
		
		if(response.ok){
			getAllTasks();

		}
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