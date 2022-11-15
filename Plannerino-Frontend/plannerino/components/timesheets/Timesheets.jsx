import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Navbar from "components/Navbar";

export default function Timesheets() {

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
        </Grid>
      </Grid>
    </>
  );
}
