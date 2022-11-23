import Link from "next/link";
import Router from "next/router";
import { Avatar, Box, Button, ButtonGroup, Typography } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import LogoutIcon from "@mui/icons-material/Logout";
import Face3Icon from '@mui/icons-material/Face3';
import { useRecoilState } from "recoil";
import authState from "atoms/authState";

export default function Navbar() {
  const [auth, setAuth] = useRecoilState(authState);

  const handleLogout = () => {
    setAuth(null);
  };

  if (auth == null) {
    Router.push("/");
  } else
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor:"#f6f4f6",
          height:"100%"
        }}
      >
        <Avatar sx={{ height: 100, width: 100 }}>
          <Face3Icon fontSize="large" color="button"/>
        </Avatar>
        <Typography variant="h5" mb="1em">
          {auth.firstName} {auth.lastName}
        </Typography>
        <ButtonGroup variant="text" orientation="vertical" color="button">
          <Button startIcon={<AccountBoxIcon aria-label="profile" />}>
            <Link href="/user">My Profile</Link>
          </Button>
          <Button startIcon={<CalendarMonthIcon aria-label="schedule" />}>
            <Link href="/user/schedule">Schedule</Link>
          </Button>
          <Button startIcon={<Diversity3Icon aria-label="timesheets" />}>
            <Link href="/user/timesheets">Timesheets</Link>
          </Button>
        </ButtonGroup>
        <Box
          borderBottom={2}
          borderColor="grey.400"
          width="8em"
          height="0em"
          my="2em"
        ></Box>
        <Button
          onClick={handleLogout}
          color="button"
          startIcon={<LogoutIcon aria-label="logout" />}
        >
          Log out
        </Button>

        <Box display="flex">
          primary
          <Box
            sx={{
              height: "2rem",
              width: "2rem",
              backgroundColor: "primary.lighter",
              fontSize: "10px",
            }}
          >
            lighter
          </Box>
          <Box
            sx={{
              height: "2rem",
              width: "2rem",
              backgroundColor: "primary.light",
              fontSize: "10px",
            }}
          >
            light
          </Box>
          <Box
            sx={{
              height: "2rem",
              width: "2rem",
              backgroundColor: "primary.main",
              fontSize: "10px",
            }}
          >
            main
          </Box>
          <Box
            sx={{
              height: "2rem",
              width: "2rem",
              backgroundColor: "primary.dark",
              fontSize: "10px",
            }}
          >
            dark
          </Box>
          <Box
            sx={{
              height: "2rem",
              width: "2rem",
              backgroundColor: "primary.darker",
              fontSize: "10px",
            }}
          >
            darker
          </Box>
        </Box>
        <Box display="flex">
          secondary
          <Box
            sx={{
              height: "2rem",
              width: "2rem",
              backgroundColor: "secondary.lighter",
              fontSize: "10px",
            }}
          >
            lighter
          </Box>
          <Box
            sx={{
              height: "2rem",
              width: "2rem",
              backgroundColor: "secondary.light",
              fontSize: "10px",
            }}
          >
            light
          </Box>
          <Box
            sx={{
              height: "2rem",
              width: "2rem",
              backgroundColor: "secondary.main",
              fontSize: "10px",
            }}
          >
            main
          </Box>
          <Box
            sx={{
              height: "2rem",
              width: "2rem",
              backgroundColor: "secondary.dark",
              fontSize: "10px",
            }}
          >
            dark
          </Box>
          <Box
            sx={{
              height: "2rem",
              width: "2rem",
              backgroundColor: "secondary.darker",
              fontSize: "10px",
            }}
          >
            darker
          </Box>
        </Box>
        <Box display="flex">
          gray
          <Box
            sx={{
              height: "2rem",
              width: "2rem",
              backgroundColor: "gray.lighter",
              fontSize: "10px",
            }}
          >
            lighter
          </Box>
          <Box
            sx={{
              height: "2rem",
              width: "2rem",
              backgroundColor: "gray.light",
              fontSize: "10px",
            }}
          >
            light
          </Box>
          <Box
            sx={{
              height: "2rem",
              width: "2rem",
              backgroundColor: "gray.main",
              fontSize: "10px",
            }}
          >
            main
          </Box>
          <Box
            sx={{
              height: "2rem",
              width: "2rem",
              backgroundColor: "gray.dark",
              fontSize: "10px",
            }}
          >
            dark
          </Box>
          <Box
            sx={{
              height: "2rem",
              width: "2rem",
              backgroundColor: "gray.darker",
              fontSize: "10px",
            }}
          >
            darker
          </Box>
          <Box
            sx={{
              height: "2rem",
              width: "2rem",
              backgroundColor: "gray.darkest",
              fontSize: "10px",
            }}
          >
            darkest
          </Box>
        </Box>
        <Box display="flex">
          error
          <Box
            sx={{
              height: "2rem",
              width: "2rem",
              backgroundColor: "error.lighter",
              fontSize: "10px",
            }}
          >
            lighter
          </Box>
          <Box
            sx={{
              height: "2rem",
              width: "2rem",
              backgroundColor: "error.light",
              fontSize: "10px",
            }}
          >
            light
          </Box>
          <Box
            sx={{
              height: "2rem",
              width: "2rem",
              backgroundColor: "error.main",
              fontSize: "10px",
            }}
          >
            main
          </Box>
          <Box
            sx={{
              height: "2rem",
              width: "2rem",
              backgroundColor: "error.dark",
              fontSize: "10px",
            }}
          >
            dark
          </Box>
          <Box
            sx={{
              height: "2rem",
              width: "2rem",
              backgroundColor: "error.darker",
              fontSize: "10px",
            }}
          >
            darker
          </Box>
        </Box>
        <Box display="flex">
          success
          <Box
            sx={{
              height: "2rem",
              width: "2rem",
              backgroundColor: "success.lighter",
              fontSize: "10px",
            }}
          >
            lighter
          </Box>
          <Box
            sx={{
              height: "2rem",
              width: "2rem",
              backgroundColor: "success.light",
              fontSize: "10px",
            }}
          >
            light
          </Box>
          <Box
            sx={{
              height: "2rem",
              width: "2rem",
              backgroundColor: "success.main",
              fontSize: "10px",
            }}
          >
            main
          </Box>
          <Box
            sx={{
              height: "2rem",
              width: "2rem",
              backgroundColor: "success.dark",
              fontSize: "10px",
            }}
          >
            dark
          </Box>
          <Box
            sx={{
              height: "2rem",
              width: "2rem",
              backgroundColor: "success.darker",
              fontSize: "10px",
            }}
          >
            darker
          </Box>
        </Box>
      </Box>
    );
}
