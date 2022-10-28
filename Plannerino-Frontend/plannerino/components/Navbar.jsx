import Link from "next/link";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Navbar() {
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
          sx={{ height: 150, width: 150 }}
        />
        <Typography variant="h4" component="h4" mb="1em">
          Jane Doe
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
          <Button startIcon={<LogoutIcon aria-label="logout"/>}>
            <Link href="/">Log out</Link>
          </Button>
		</ButtonGroup>		  		
      </Box>
    </>
  );
}
