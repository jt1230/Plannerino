import { Button, Grid, Typography } from "@mui/material";
import { useRecoilState } from "recoil";
import authState from "atoms/authState";
import Navbar from "components/Navbar";
import Router from "next/router";

export default function Settings() {
  const [auth, setAuth] = useRecoilState(authState);
  
  const handleDeleteAccount = async() => {
    const response = await fetch(`https://localhost:7063/api/User/${auth.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
    });
    if (response.status === 200) {
      localStorage.removeItem("auth");
      window.location.reload();
    }
  }
  
  if(auth == null){
    Router.push('/');
  }
  return (
    <>
      <Grid container spacing={2} height="100vh">
        <Grid item xs={3}>
          <Navbar />
        </Grid>
        <Grid
          item
          xs={8}
          display="flex"
          flexDirection="column"
          gap={3}
          borderLeft={1}
        >
          <Typography variant="h3" component="h1" gutterBottom>
            SettingsPage yes
          </Typography>
          <Button
            sx={{ width: "50%" }}
            size="large"
            variant="contained"
            color="error"
            onClick={handleDeleteAccount}
          >
            Delete Account
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
