import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import EditIcon from "@mui/icons-material/Edit";
import Router from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import authState from "atoms/authState";
import Navbar from "components/Navbar";
import EditProfile from "components/profile/EditProfile";
import Groups from "components/profile/Groups";
import Tasks from "components/tasks/Tasks";
import DeleteBtn from "components/ui/buttons/DeleteBtn";

export default function Profile() {
  const [auth, setAuth] = useRecoilState(authState);
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("/assets/dummyprofile.jpg");

  useEffect(() => {
    if (profileImage) {
      setImageUrl(URL.createObjectURL(profileImage));
    }
  }, [profileImage]);

  if (auth == null) {
    Router.push("/");
  } else
    return (
      <>
        <Grid container height="100vh" overflow="hidden" position="static">
          <Grid item xs={2}>
            <Navbar />
          </Grid>
          <Grid container item xs={10} borderLeft={1} >
            <Grid item xs={12} paddingX={1} borderBottom={1}>
              <Typography variant="h4" gutterBottom>
                My Profile
              </Typography>
            </Grid>
            <Grid container item xs={12} >
              <Grid
                item
                xs={3}
                sx={{ borderRight: 1 }}
                gap={2}
                display="flex"
                flexDirection="column"
                alignItems="center"
                textAlign={isEditing ? "center" : "left"}
              >
                <Avatar
                  alt="Profile Pic"
                  src={imageUrl}
                  sx={{ height: 200, width: 200, my: "1rem" }}
                />
                <Button
                  startIcon={<AddAPhotoIcon aria-label="change photo" />}
                  variant="contained"
                  color="button"
                  sx={{ width: "65%", color: "white" }}
                  component="label"
                >
                  <input
                    hidden
                    accept="image/*"
                    multiple
                    type="file"
                    id="profile-image"
                    onChange={(e) => setProfileImage(e.target.files[0])}
                  />
                  Change Photo
                </Button>
                {isEditing ? (
                  <EditProfile setIsEditing={setIsEditing} />
                ) : (
                  <Box sx={{ width: "65%" }}>
                    <Typography
                      variant="body1"
                      mt="1rem"
                      ml="0.5rem"
                      fontWeight="bold"
                    >
                      Name:
                    </Typography>
                    <Typography variant="body2" mb="1rem" ml="0.5rem">
                      {auth.firstName} {auth.lastName}
                    </Typography>
                    <Typography
                      variantvariant="body1"
                      fontWeight="bold"
                      ml="0.5rem"
                    >
                      Mail:
                    </Typography>
                    <Typography variant="body2" mb="1rem" ml="0.5rem">
                      {auth.email}
                    </Typography>
                    <Button
                      startIcon={<EditIcon aria-label="edit profile" />}
                      variant="contained"
                      sx={{ width: "100%", color: "white" }}
                      color="button"
                      onClick={() => setIsEditing(true)}
                    >
                      Edit
                    </Button>
                  </Box>
                )}
                <DeleteBtn />
              </Grid>
              <Grid container item xs={9} >
                <Grid item xs={12} sx={{ maxHeight:"50vh", borderBottom:1}}>
                  <Tasks />
                </Grid>
                <Grid item xs={12} >
                  <Groups />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
}
