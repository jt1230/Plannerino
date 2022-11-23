import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { useRecoilState } from "recoil";
import authState from "atoms/authState";
import SignUpForm from "components/landingpage/SignUpForm";
import SnackbarAlert from "components/SnackbarAlert";
import fetchUser from "features/users/fetch-user";
import activeUser from "features/users/active-user";

export default function LoginForm() {
  const [open, setOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [auth, setAuth] = useRecoilState(authState);
  const router = useRouter();

  // useEffect(() => {
  //   if (auth != null) {
  //     router.push("/user");
  //   } else router.push("/");
  // }, [auth]);

  activeUser("/user");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // const response = await fetch(
    //   `https://localhost:7063/api/User/${data.get("email")}/${data.get(
    //     "password"
    //   )}`
    // );
    // if (response.ok) {
    //   const data = await response.json();
    //   setAuth(data);
    // } else {
    //   alert("Invalid email or password");
    //   setOpen(true);
    // }

    const response = await fetchUser(data.get("email"), data.get("password"));
    if (response != "") {
      setAuth(response);
    } else {
      setOpen(true);
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

        <SnackbarAlert
          message="Login failed"
          open={open}
          setOpen={setOpen}
          severity="error"
        />

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
    </>
  );
}
