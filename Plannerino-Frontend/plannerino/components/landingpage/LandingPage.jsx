import { Box, Container, Typography } from "@mui/material";
import LoginForm from "components/landingpage/LoginForm";

export default function LandingPage() {

  return (
    <>
      <Container
        component="main"
        sx={{
          height: "100vh",
          m: 0,
          backgroundImage: `url(${"static/wave-haikei.svg"})`,
          backgroundRepeat: "none",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
        <Box
          sx={{
            width: "40%",
            mx: 15,
            pt: 15,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            component="img"
            sx={{
              height: 250,
            }}
            alt="Plannerino"
            src="static/logo.png"
          />
          <Typography component="p" variant="p">
            Easy planning, saving you time and headaches.
          </Typography>
          <LoginForm />
        </Box>
      </Container>
    </>
  );
}
