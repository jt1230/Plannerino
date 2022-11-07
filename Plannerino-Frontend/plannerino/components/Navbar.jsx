import Link from "next/link";
import Router from "next/router";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Typography from "@mui/material/Typography";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useRecoilState } from "recoil";
import authState from "../atoms/authState"

export default function Navbar() {
  const [auth, setAuth] = useRecoilState(authState);
  
  const handleLogout = () => {
    setAuth(null);
  }

  if(auth == null){
    Router.push('/');
  }
  else
    return (
      <>
        <Box
          sx={{
            mt: "15%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar
            alt="Profile Pic"
            src="/static/dummyprofile.jpg"
            sx={{ height: 100, width: 100 }}
          />
          <Typography variant="h5" mb="1em">
            {auth.firstName} {auth.lastName}
          </Typography>
          <ButtonGroup variant="text" orientation="vertical" color="primary" >
            <Button startIcon={<DashboardIcon aria-label="dashboard"/>}>
              <Link href="/user">Dashboard</Link>
            </Button>
            <Button startIcon={<AccountBoxIcon aria-label="profile"/>}>
              <Link href="/user/profile">My Profile</Link>
            </Button>
            <Button startIcon={<AssignmentIcon aria-label="tasks"/>}>
              <Link href="/user/tasks">My Tasks</Link>
            </Button>
            <Button startIcon={<CalendarMonthIcon aria-label="schedule"/>}>
              <Link href="/user/schedule">Schedule</Link>
            </Button>
            <Button startIcon={<Diversity3Icon aria-label="timesheets" />}>
              <Link href="/user/timesheets">Timesheets</Link>
            </Button>
          </ButtonGroup>
      <Box borderBottom={2} borderColor="grey.400" width="8em" height="0em" my="2em">
      </Box>
      <ButtonGroup variant="text" orientation="vertical" textAlign="left" >
        <Button	tton startIcon={<SettingsIcon aria-label="settings" />}>
              <Link href="/user/settings">Settings</Link>
            </Button>
            <Button onClick={handleLogout} startIcon={<LogoutIcon aria-label="logout"/>}>
              Log out
            </Button>
      </ButtonGroup>		  		
        </Box>
      </>
    );
}
