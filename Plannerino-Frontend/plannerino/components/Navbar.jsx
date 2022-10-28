import Link from "next/link";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export default function Navbar() {
	return(
		<>
			<Box sx={{ display: "flex", flexDirection:"column", justifyContent: "center" }}>
				<Avatar alt="Profile Pic" src="/static/dummyprofile.jpg" sx={{height:100, width:50}}/>
				<Typography variant="h4" component="h4" gutterBottom>
					Jane Doe
				</Typography>
				<Link href="/dashboard">
					Dashboard
				</Link>
				<Link href="/profile">
					My Profile
				</Link>
				<Link href="/tasks">
					My Tasks
				</Link>
				<Link href="/schedule">
					Schedule
				</Link>
				<Link href="/timesheets">
					Timesheets
				</Link>
				<Link href="/settings">
					Settings
				</Link>
				<Link href="/">
					Log out
				</Link>
          </Box>
		</>
	)
}