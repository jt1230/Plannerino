import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { loginUser } from "../../lib/auth";

export default function LoginForm() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isActiveUser, setIsActiveUser] = useState(false);
  const router = useRouter();

  // useEffect(() => {
  //   if (isLoggingIn && isActiveUser) {
  //     router.push("/dashboard");
  //   }
  // }, [isLoggingIn]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // loginUser(data.get("email"), data.get("password"));

    console.log("Logging in...");

    if (data.get("email") == "admin" && data.get("password") == "admin") {
      console.log("Success!");
      router.push("/dashboard");
    } else {
      console.log("Wrong credentials", "Logged in: " + isActiveUser);
    }
    // setIsLoggingIn(true);
  };

  return (
    <>
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
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Link
            href="#"
            variant="body2"
            underline="hover"
            sx={{ color: "#717171" }}
          >
            Forgot password?
          </Link>
        </Box>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, bgcolor: "#483434" }}
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
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, bgcolor: "#483434" }}
        >
          Sign Up
        </Button>
      </Box>
    </>
  );
}
