import Grid from "@mui/material/Grid";
import Navbar from "components/Navbar";
import Router from "next/router";
import authState from "atoms/authState";
import { useRecoilState } from "recoil";
import Calendar from "components/Calendar";

export default function Schedule() {
  const [auth, setAuth] = useRecoilState(authState);

  if (auth == null) {
    Router.push("/");
  } else
    return (
      <>
        <Grid container height="100vh">
          <Grid item xs={2}>
            <Navbar />
          </Grid>
          <Grid item xs={10}>
            <Calendar />
          </Grid>
        </Grid>
      </>
    );
}
