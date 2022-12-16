import Link from "next/link";
import Router from "next/router";
import { Avatar, Box, Button, ButtonGroup, Typography } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRecoilState } from "recoil";
import authState from "atoms/authState";

export default function Navbar() {
  // const BG_COLOR = "#f4f2f0";
  const BG_COLOR = "#fff";
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
          backgroundColor: BG_COLOR,
          height: "100%",
          borderRight: "1px solid #e6e6e6",
        }}
      >
        {window.location.pathname === "/user" ? (
          <Avatar
            src={auth.avatar}
            alt={auth.firstName + " " + auth.lastName}
            sx={{
              height: 100,
              width: 100,
              mt: "50%",
              boxShadow: "0 0 4px #e6e6e6",
            }}
          />
        ) : (
          <Avatar
            src={"../../" + auth.avatar}
            alt={auth.firstName + " " + auth.lastName}
            sx={{
              height: 100,
              width: 100,
              mt: "50%",
              boxShadow: "0 0 4px #e6e6e6",
            }}
          />
        )}
        <Typography variant="h5" fontWeight="bold" mb="1em">
          {auth.firstName} {auth.lastName}
        </Typography>
        <ButtonGroup variant="text" orientation="vertical" color="button">
          <Button startIcon={<AccountBoxIcon aria-label="profile" />}>
            <Link href="/user">
              <Typography variant="body2" fontWeight="bold">
                My Profile
              </Typography>
            </Link>
          </Button>
          <Button startIcon={<CalendarMonthIcon aria-label="schedule" />}>
            <Link href="/user/schedule">
              <Typography variant="body2" fontWeight="bold">
                Schedule
              </Typography>
            </Link>
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
          <Typography variant="body2" fontWeight="bold">
            Log out
          </Typography>
        </Button>
      </Box>
    );
}
