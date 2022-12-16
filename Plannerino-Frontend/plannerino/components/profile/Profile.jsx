import Router from "next/router";
import { Avatar, Box, Button, Grid, Typography } from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import authState from "atoms/authState";
import avatarState from "atoms/avatarState";
import Navbar from "components/Navbar";
import Groups from "components/groups/Groups";
import EditProfile from "components/profile/EditProfile";
import Avatars from "components/profile/Avatars";
import Tasks from "components/tasks/Tasks";
import DeleteBtn from "components/ui/buttons/DeleteBtn";
import editElement from "features/users/edit-element";
import fetchElement from "features/users/fetch-element";

export default function Profile() {
  const BG_COLOR = "#f4f2f0";
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingAvatar, setIsChangingAvatar] = useState(false);
  const userAvatar = useRecoilValue(avatarState);
  const [auth, setAuth] = useRecoilState(authState);

  useEffect(() => {
    const updateAvatar = async () => {
      let userToBeUpdated = { ...auth };
      userToBeUpdated.avatar = userAvatar;
      const updateUser = await editElement(`https://localhost:7063/api/User/${auth.id}`, userToBeUpdated);
      
      if(updateUser){
        const getUpdatedUser = await fetchElement(`https://localhost:7063/api/User/${userToBeUpdated.email}/${userToBeUpdated.password}`);
        setAuth(getUpdatedUser);
      }
    };

    if (userAvatar) {
      updateAvatar();
    }
  }, [userAvatar]);

  const handleAvatar = () => {
    setIsChangingAvatar(true);
  };

  if (auth == null) {
    Router.push("/");
  } else
    return (
      <>
        <Grid container height="100vh" overflow="hidden" position="static">
          <Grid item xs={2}>
            <Navbar />
          </Grid>
          <Grid container item xs={10} sx={{ backgroundColor: BG_COLOR }}>
            <Grid
              item
              display="flex"
              xs={12}
              paddingX="2rem"
              alignItems="flex-end"
            >
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                My Profile
              </Typography>
            </Grid>
            <Grid container item xs={12} sx={{ mx: "2rem", height: "90%" }}>
              <Grid
                item
                height="100%"
                xs={3}
                sx={{ backgroundColor: "#fff", boxShadow: 2 }}
                gap={2}
                display="flex"
                flexDirection="column"
                alignItems="center"
                textAlign={isEditing ? "center" : "left"}
              >
                <Avatar
                  sx={{
                    height: 150,
                    width: 150,
                    mt: "5rem",
                    boxShadow: "0 0 4px #e6e6e6",
                  }}
                  src={auth.avatar}
                />
                {isChangingAvatar ? (
                  <Avatars setIsChangingAvatar={setIsChangingAvatar} />
                ) : null}
                <Button
                  startIcon={<AddAPhotoIcon aria-label="change photo" />}
                  variant="contained"
                  color="button"
                  sx={{ width: "65%", color: "white" }}
                  onClick={handleAvatar}
                >
                  Change Avatar
                </Button>
                {isEditing ? (
                  <EditProfile setIsEditing={setIsEditing} />
                ) : (
                  <Box sx={{ width: "65%" }}>
                    <Typography
                      variant="body2"
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
                      variantvariant="body2"
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
                <Grid
                  item
                  display="flex"
                  width="100%"
                  my="auto"
                  justifyContent="center"
                >
                  <DeleteBtn />
                </Grid>
              </Grid>

              <Grid container item xs height="100%">
                <Grid
                  item
                  xs={12}
                  sx={{
                    backgroundColor: "#fff",
                    ml: "1.5rem",
                    minHeight: "58%",
                    maxHeight: "58%",
                    boxShadow: 1,
                  }}
                >
                  <Tasks />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    backgroundColor: "#fff",
                    mt: "1rem",
                    ml: "1.5rem",
                    minHeight: "40%",
                    maxHeight: "40%",
                    boxShadow: 1,
                  }}
                >
                  <Groups />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
}
