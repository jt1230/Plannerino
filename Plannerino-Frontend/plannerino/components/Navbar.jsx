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
  const BG_COLOR = "#f4f2f0";
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
          alignItems: "center",
          backgroundColor:BG_COLOR,
          height:"100%"
        }}
      >
        <Avatar sx={{ height: 100, width: 100, mt:"50%" }}>
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
      </Box>
    );
}
