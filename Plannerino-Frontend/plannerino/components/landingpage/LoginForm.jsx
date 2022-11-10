import {Box, Button, Grid, TextField, Typography} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import authState from "atoms/authState"
import SignUpForm from "components/landingpage/SignUpForm";

export default function LoginForm() {
  const [isCreating, setIsCreating] = useState(false);
  const [auth, setAuth] = useRecoilState(authState);
  const router = useRouter();

  useEffect(() => {
    if(auth != null){
      router.push("/user");
    }
    else router.push("/");

  }, [auth]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const response = await fetch(`https://localhost:7063/api/User/${data.get("email")}/${data.get("password")}`);
    if(response.ok){
      const data = await response.json();
      setAuth(data);
    }
    else{
      alert("Login failed");
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
