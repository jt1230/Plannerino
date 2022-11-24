import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import authState from "atoms/authState";
import SignUpForm from "components/landingpage/SignUpForm";
import SnackbarAlert from "components/SnackbarAlert";
import fetchUser from "features/users/fetch-user";

export default function LoginForm() {
  const [open, setOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [auth, setAuth] = useRecoilState(authState);

  useEffect(() => {
		console.log("checking auth...")
		
		if(auth != null){
		  Router.push("/user");
		}
		else Router.push("/");
	
	  }, [auth]);
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (data.get("email") == "" || data.get("password") == "") {
      setOpen(true);
    } else {
      const response = await fetchUser(data.get("email"), data.get("password"));
      if (response == "") {
        setOpen(true);
      } else {
        setAuth(response);
      }
    }
  };

  return (
    <>
      {isCreating ? <SignUpForm setIsCreating={setIsCreating} /> : null}
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 5, mb: 2, bgcolor: "#483434" }}
        >
          Login
        </Button>
        <Grid container sx={{ alignItems: "center" }}>
          <Grid item xs sx={{ height: 1.5, bgcolor: "text.secondary" }}></Grid>
          <Grid item xs>
            <Typography variant="body2" color="text.secondary" align="center">
              OR
            </Typography>
          </Grid>
          <Grid item xs sx={{ height: 1.5, bgcolor: "text.secondary" }}></Grid>
        </Grid>
        <Button
          type="button"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, bgcolor: "#483434" }}
          onClick={() => setIsCreating(true)}
        >
          Sign Up
        </Button>
      </Box>
      <SnackbarAlert
        message="Login failed"
        open={open}
        setOpen={setOpen}
        severity="error"
      />
    </>
  );
}
