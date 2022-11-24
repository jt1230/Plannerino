import { Box, Button, TextField } from "@mui/material";
import { useRecoilState, useRecoilValue } from "recoil";
import tasksState from "atoms/tasksState";
import authState from "atoms/authState";

export default function EditTask({task, toggleEdit, setToggleEdit}) {
    const auth = useRecoilValue(authState);
	const [tasks, setTasks] = useRecoilState(tasksState);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        let taskToBeUpdated = {...task};
        taskToBeUpdated.title = data.get("title");
        taskToBeUpdated.category = data.get("category");
		console.log(taskToBeUpdated)

        const response = await fetch(`https://localhost:7063/api/UserTask/${task.id}/${auth.id}`, {
        method: "PUT",
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(taskToBeUpdated)
        })
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
        setToggleEdit({ ...toggleEdit, [task.id]: !toggleEdit[task.id] });  

    };


    return (
        <>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ position:"absolute", left: 0, top: "25%", zIndex:100, backgroundColor: "white", height:"50%", width:"35%" }} display="flex" flexDirection="row" gap="1rem" alignItems="center" > 
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
                    size = "small"
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