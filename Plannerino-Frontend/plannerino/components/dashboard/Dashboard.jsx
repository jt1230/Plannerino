import Link from "next/link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Navbar from "../navbar";

export default function Dashboard() {

  return (
    <>  
      
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Navbar />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h3" component="h1" gutterBottom>
            Dashboard
          </Typography>
        </Grid>
      </Grid>
      
    </>
  );
}
