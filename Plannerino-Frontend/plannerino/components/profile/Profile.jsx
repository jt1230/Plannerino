import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import EditIcon from "@mui/icons-material/Edit";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import authState from "atoms/authState";
import Navbar from "components/Navbar";
import EditProfile from "components/profile/EditProfile";
import Groups from "components/groups/Groups";
import Tasks from "components/tasks/Tasks";
import DeleteBtn from "components/ui/buttons/DeleteBtn";
import Avatars from "./Avatars";
import avatarState from "atoms/avatarState";
import putUser from "features/users/put-user";

export default function Profile() {
  const BG_COLOR = "#f4f2f0"
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingAvatar, setIsChangingAvatar] = useState(false);
  const auth = useRecoilValue(authState);
  const userAvatar = useRecoilValue(avatarState);

  
  useEffect(() => {
    
    const updateAvatar = async () => {
    console.log("copying user")
      let userToBeUpdated = {...auth};
    userToBeUpdated.avatar = userAvatar;
    console.log("userAvatar", userAvatar)
    const updateUser = await putUser(auth.id, userToBeUpdated);
      console.log("updated user", updateUser)
  }
  if(userAvatar){
    updateAvatar();
  }  

  },[userAvatar]);
  
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
          <Grid container item xs={10} sx={{ backgroundColor:BG_COLOR }} >
            <Grid item display="flex" xs={12} paddingX="2rem" alignItems="flex-end" >
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                My Profile
              </Typography>
            </Grid>
            <Grid container item xs={12} sx={{ mx: "2rem", height:"90%"}} >
              <Grid
                item
                height="100%"
                xs={3}
                sx={{ backgroundColor:"#fff", boxShadow: 2 }}
                gap={2}
                display="flex"
                flexDirection="column"
                alignItems="center"
                textAlign={isEditing ? "center" : "left"}
                >
                <Avatar sx={{ height: 150, width: 150, mt: "5rem", boxShadow: "0 0 4px #e6e6e6" }} src={userAvatar}/>
                {isChangingAvatar ? (
                  <Avatars setIsChangingAvatar={setIsChangingAvatar} />
                ) : null}
                <Button
                  startIcon={<AddAPhotoIcon aria-label="change photo" />}
                  variant="contained"
                  color="button"
                  sx={{ width: "65%", color: "white" }}
                  component="label"
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
                <Grid item display="flex" width="100%" my="auto" justifyContent="center">
                  <DeleteBtn />
                </Grid>
              </Grid>
              
              <Grid container item xs height="100%">
                <Grid
                  item
                  xs={12}
                  sx={{ backgroundColor:"#fff", ml:"1.5rem", minHeight: "50%", maxHeight: "50%", boxShadow: 1 }}
                >
                  <Tasks />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{ backgroundColor:"#fff", mt: "1rem", ml:"1.5rem", minHeight: "48%", maxHeight: "48%", boxShadow:1 }}
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

