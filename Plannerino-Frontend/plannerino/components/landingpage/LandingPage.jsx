import { Box, Container, Grid, Typography } from "@mui/material";
import LoginForm from "components/landingpage/LoginForm";

export default function LandingPage() {
  const BG_IMG = "assets/wave-haikei.svg";
  const LOGO = "assets/logo.png";
  const LANDING_TEXT = "Easy planning, saving you time and headaches.";

  return (
    <>
      <Container
        component="main"
        sx={{
          height: "100vh",
          m: 0,
          backgroundImage: `url(${BG_IMG})`,
          backgroundRepeat: "none",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
        <Grid container
          direction="column"
          width="40%"
          alignItems="center"
          justifyContent="center"
          height="100%"
          pb="10rem"
          mx="4rem"
        >
          <Box
            component="img"
            sx={{
              height: "auto",
              maxWidth: "100%",
            }}
            alt="Plannerino"
            src={LOGO}
          />
          <Typography variant="subtitle1" color="primary.darker">
            {LANDING_TEXT}
          </Typography>
          <LoginForm />
        </Grid>
      </Container>
    </>
  );
}
