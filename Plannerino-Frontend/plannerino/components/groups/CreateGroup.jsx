import { Box, Button, TextField, Typography } from "@mui/material";
import { useRecoilValue, useSetRecoilState } from "recoil";
import authState from "atoms/authState";
import groupsState from "atoms/groupsState";
import createElement from "features/users/create-element";
import fetchElement from "features/users/fetch-element";

export default function CreateGroup({ setIsCreating }) {
  const auth = useRecoilValue(authState);
  const setGroups = useSetRecoilState(groupsState);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let createGroup = {name:"", description:""};
    createGroup.name = data.get("name");
    createGroup.description = data.get("description");

    const createUserGroup = await createElement(`https://localhost:7063/api/Group?userId=${auth.id}`, createGroup)

    // If group was successfully created, update user's groups on client.
    if(createUserGroup.status === 200){
      const updatedGroups = await fetchElement(`https://localhost:7063/api/User/${auth.id}/groups`);
      setGroups(updatedGroups)
    }
    setIsCreating(false);
  };

  return (
    <>
	  <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{position: "absolute", left: 0, right: 0, mx: "auto", top:"25%", backgroundColor: "white", zIndex: 100, height: "50%", width: "25%", border: 4}}>
        <Typography>Create a Group</Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 1 }}
          display="flex"
          flexDirection="column"
        >
          <TextField
            required
			      margin="dense"
            id="name"
            label="Name"
            name="name"
            autoFocus
            size="small"
          />
          <TextField
            required
			      margin="dense"
            id="description"
            label="Description"
            name="description"
            autoFocus
            multiline
          />
          <Box display="flex" gap={3} width="100%">
            <Button
              type="submit"
              fullWidth
              variant="contained"
			        size="small"
              sx={{ mt: "1rem", bgcolor: "#483434" }}
            >
              Create
            </Button>
            <Button
              type="button"
              fullWidth
              variant="outlined"
			        size="small"
              sx={{ mt: "1rem", color: "#483434", borderColor: "#483434" }}
              onClick={() => setIsCreating(false)}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
