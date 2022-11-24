import { Box, Container, Grid, Typography } from "@mui/material";
import LoginForm from "components/landingpage/LoginForm";

export default function LandingPage() {
  // const BG_IMG = "assets/background-1.jpg";
  const BG_IMG = "assets/background-2.jpg";
  const LOGO = "assets/logo.png";
  const LANDING_TEXT = "Easy planning, saving you time and headaches.";

  return (
    <>
      <Box
        component="main"
        sx={{
          height: "100vh",
          backgroundImage: `url(${BG_IMG})`,
          backgroundRepeat: "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          height="100%"
          pb="6rem"
        >
          <Grid item height="100%" width="35%" backgroundColor="rgb(222, 216, 211)" px="5rem" mt="5rem" textAlign="center">
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
          <Typography
            variant="subtitle2"
            color="grey.400"
            position="absolute"
            bottom="0"
            right="1%"
          >
            Photo by{" "}
            <a href="https://unsplash.com/@manhterry93?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
              Phạm Mạnh
            </a>{" "}
            on{" "}
            <a href="https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
              Unsplash
            </a>
          </Typography>
        </Grid>
      </Box>
    </>
  );
}
