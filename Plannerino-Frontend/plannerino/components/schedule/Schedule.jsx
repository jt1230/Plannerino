import Link from "next/link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Navbar from "../Navbar";

export default function Schedule() {

  return (
    <>  
      <Grid container spacing={2} height="100vh">
      <Grid item xs={3}>
          <Navbar />
        </Grid>
        <Grid item xs={8} display="flex" borderLeft={1}>
          <Typography variant="h3" component="h1" gutterBottom>
          SchedulePage
            yes
          </Typography>
        </Grid>
      </Grid>
      
    </>
  );
}
