import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Navbar from "components/Navbar"
import Router from "next/router";
import authState from "atoms/authState";;
import { useRecoilState } from "recoil";
import Calendar from "components/Calendaar";

export default function Timesheets() {
  const [auth, setAuth] = useRecoilState(authState);

  if(auth == null){
    Router.push('/');
  }
  return (
    <>  
      <Grid container spacing={2} height="100vh">
        <Grid item xs={3}>
          <Navbar />
        </Grid>
        <Grid item xs={8} display="flex" borderLeft={1}>
          <Typography variant="h3" component="h1" gutterBottom>
          TimesheetsPage
            yes
          </Typography>
          <Calendar />
          
        </Grid>
      </Grid>
    </>
  );
}
