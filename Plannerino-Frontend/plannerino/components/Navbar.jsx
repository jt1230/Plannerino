import Link from "next/link";
import Router from "next/router";
import { Avatar, Box, Button, ButtonGroup, Typography } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRecoilState, useRecoilValue } from "recoil";
import authState from "atoms/authState";
import avatarState from "atoms/avatarState";

export default function Navbar() {
  // const BG_COLOR = "#f4f2f0";
  const BG_COLOR = "#fff";
  const [auth, setAuth] = useRecoilState(authState);
  const userAvatar = useRecoilValue(avatarState);

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
          height:"100%",
          boxShadow: 1,

        }}
      >
        <Avatar src={userAvatar} alt={auth.firstName + " " + auth.lastName} sx={{ height: 100, width: 100, mt:"50%" }} />
        <Typography variant="h5" fontWeight="bold" mb="1em">
          {auth.firstName} {auth.lastName}
        </Typography>
        <ButtonGroup variant="text" orientation="vertical" color="button">
          <Button startIcon={<AccountBoxIcon aria-label="profile" />}>
            <Link href="/user"><Typography variant="body2" fontWeight="bold">My Profile</Typography></Link>
          </Button>
          <Button startIcon={<CalendarMonthIcon aria-label="schedule" />}>
            <Link href="/user/schedule"><Typography variant="body2" fontWeight="bold">Schedule</Typography></Link>
          </Button>
          <Button startIcon={<Diversity3Icon aria-label="timesheets" />}>
            <Link href="/user/timesheets"><Typography variant="body2" fontWeight="bold">Timesheets</Typography></Link>
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
          <Typography variant="body2" fontWeight="bold">Log out</Typography>
        </Button>
      </Box>
    );
}
