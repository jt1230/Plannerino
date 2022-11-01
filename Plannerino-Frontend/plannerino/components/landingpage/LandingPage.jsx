import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import LoginForm from "./LoginForm";

export default function LandingPage() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isActiveUser, setIsActiveUser] = useState(false);
  const router = useRouter();
  
  return (
    <>
      <Head>
        <title>Plannerino</title>
        <meta name="description" content="Plan your time easier." />
        <link rel="icon" href="/favicon.jpg" />
      </Head>

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
