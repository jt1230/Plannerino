import Link from "next/link";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Navbar from "../Navbar";
import authState from "../../atoms/authState";
import Router from "next/router";
import { useState } from "react";
import { useRecoilState } from "recoil";
import EditIcon from '@mui/icons-material/Edit';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import EditProfile from "./EditProfile";

export default function Profile() {
  const [auth, setAuth] = useRecoilState(authState);
  const [isEditing, setIsEditing] = useState(false);

  if(auth == null){
    Router.push('/');
  }
  else
  return (
    <>
      <Grid container spacing={2} height="100vh">
        <Grid item xs={3}>
          <Navbar />
        </Grid>
        <Grid item xs={8} display="flex" flexDirection="column" borderLeft={1}>
          <Typography variant="h3" component="h1" gutterBottom>
            ProfilePage
          </Typography>
          <Grid container display="flex" height="100%">
            <Grid item xs={4} sx={{ border: 1 }} display="flex" flexDirection="column" alignItems="center" textAlign={isEditing ? "center" : "left"}>
              <Avatar
                alt="Profile Pic"
                src="/static/dummyprofile.jpg"
                sx={{ height: 200, width: 200, my: "1rem" }}
              />
              <Button startIcon={<AddAPhotoIcon aria-label="change photo" />} variant="contained" sx={{ width: "65%" }}>
                Change Photo
              </Button>
              {(isEditing ? <EditProfile setIsEditing={setIsEditing}/> : <Box sx={{ width: "65%" }}>
                <Typography variant="body1" mt="1rem" ml="0.5rem" fontWeight="bold">
                  Name:
                </Typography>
                <Typography variant="body2" mb="1rem" ml="0.5rem">
                  {auth.firstName} {auth.lastName}
                </Typography>
                <Typography variantvariant="body1" fontWeight="bold" ml="0.5rem">
                  Mail:
                </Typography>
                <Typography variant="body2" mb="1rem" ml="0.5rem">
                  {auth.email}
                </Typography>
                <Button startIcon={<EditIcon aria-label="edit profile" />} variant="contained" sx={{ width: "100%" }} onClick={() => setIsEditing(true)}>
                  Edit
                </Button>
              </Box>)}
            </Grid>
            <Grid item xs={8} sx={{ border: 1 }}>
              Expenses, group
            </Grid>
          </Grid>
        </Grid>
      </Grid>

    </>
  );
}
