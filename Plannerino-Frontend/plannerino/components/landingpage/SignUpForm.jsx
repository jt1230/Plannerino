import { Box, Button, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import authState from "atoms/authState"


export default function SignUpForm({setIsCreating}) {
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

	let postUser = {firstName:"", lastName:"", email:"", password:""};
        postUser.firstName = data.get("firstName");
        postUser.lastName = data.get("lastName");
        postUser.email = data.get("email");
        postUser.password = data.get("password");

    const response = await fetch(`https://localhost:7063/api/User?groupId=1`, {
        method: "POST",
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(postUser)
        });
	  setIsCreating(false);
  };

  return (
	<>
	<Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{position: "absolute", left: 0, right: 0, mx: "auto", top:"15%", backgroundColor: "white", zIndex: 100, height: "70%", width: "30%", border: 4}}>
	<Typography gutterBottom>Sign Up</Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mx: "4em" }}>
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
        
        <Button
          type="submit"
          variant="contained"
          sx={{ bgcolor: "#483434" }}
		  >
          Sign Up
        </Button>
      </Box>
	  </Box>
  </>
  );
}
