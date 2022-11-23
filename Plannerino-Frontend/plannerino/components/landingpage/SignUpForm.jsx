import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import SnackbarAlert from "components/SnackbarAlert";
import activeUser from "features/users/active-user";
import fetchAllUsers from "features/users/fetch-all-users";
import postUser from "features/users/post-user";

export default function SignUpForm({ setIsCreating }) {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  activeUser("/user");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let createUser = { firstName: "", lastName: "", email: "", password: "" };
    createUser.firstName = data.get("firstName");
    createUser.lastName = data.get("lastName");
    createUser.email = data.get("email");
    createUser.password = data.get("password");

    // const response = await fetch(`https://localhost:7063/api/User`, {
    //     method: "POST",
    //     headers: {'content-type': 'application/json'},
    //     body: JSON.stringify(postUser)
    //     });

    const getAllUsers = await fetchAllUsers();
    var userExists = getAllUsers.find(
      (user) => user.email === createUser.email
    );
    if (userExists) {
      setError(true);
      return;
    } else {
      const response = await postUser(createUser);
      setSuccess(true);
    }
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{
          position: "absolute",
          left: 0,
          right: 0,
          mx: "auto",
          top: "15%",
          backgroundColor: "#f4f2f0",
          zIndex: 100,
          height: "70%",
          width: "30%",
          border: 1,
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>Create your Plannerino account</Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mx: "4em" }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            placeholder="First name"
            autoFocus
            sx={{ bgcolor: "white" }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            placeholder="Last name"
            autoFocus
            sx={{ bgcolor: "white" }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            placeholder="name@mail.com"
            autoFocus
            sx={{ bgcolor: "white" }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            placeholder="*********"
            type="password"
            id="password"
            sx={{ bgcolor: "white" }}
          />
          <Box display="flex" gap="1rem" mt="1rem">
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ bgcolor: "#483434" }}
            >
              Sign Up
            </Button>
            <Button
              type="button"
              fullWidth
              variant="outlined"
              sx={{ borderColor: "#483434", color: "#483434" }}
              onClick={() => setIsCreating(false)}
            >
              Cancel
            </Button>
          </Box>
        </Box>
        <SnackbarAlert
          message="User already exists"
          open={error}
          setOpen={setError}
          severity="error"
        />
        <SnackbarAlert
          message="Sign up succeeded"
          open={success}
          setOpen={setSuccess}
          severity="success"
        />
      </Box>
    </>
  );
}
