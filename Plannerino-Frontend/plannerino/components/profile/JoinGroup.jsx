import { Box, Button, TextField, Typography } from "@mui/material";
import { useRecoilValue } from "recoil";
import authState from "atoms/authState";

export default function JoinGroup({ setIsJoining}) {
  const auth= useRecoilValue(authState);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let postGroup = {name:"", description:""};
    postGroup.name = data.get("name");
    postGroup.description = data.get("description");

    await fetch(`https://localhost:7063/api/Group?userId=${auth.id}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(postGroup),
    });
    setIsJoining(false);
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
              onClick={() => setIsJoining(false)}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
