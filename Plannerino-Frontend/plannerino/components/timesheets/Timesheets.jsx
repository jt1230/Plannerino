import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Navbar from "components/Navbar";
import Router from "next/router";
import authState from "atoms/authState";
import { useRecoilState } from "recoil";
import Calendar from "components/Calendar";

export default function Timesheets() {
  const [auth, setAuth] = useRecoilState(authState);

  if (auth == null) {
    Router.push("/");
  }
  return (
    <>
      <Grid container spacing={2} height="100vh">
        <Grid item xs={3}>
          <Navbar />
        </Grid>
        <Grid item xs={8.9} borderLeft={1} >

            <Calendar />

        </Grid>
      </Grid>
    </>
  );
}
