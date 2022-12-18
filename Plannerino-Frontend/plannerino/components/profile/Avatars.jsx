import { Avatar, Button, Box } from "@mui/material";
import { useSetRecoilState, useRecoilValue } from "recoil";
import authState from "atoms/authState";
import avatarState from "atoms/avatarState";
import avatars from "public/avatars";

export default function Avatars({ setIsChangingAvatar }) {
  const setAvatar = useSetRecoilState(avatarState);
  const auth = useRecoilValue(authState);

  return (
    <Box
      height="40vh"
      width="35vh"
      top="15%"
      zIndex={100}
      backgroundColor="white"
      boxShadow={1}
      position="absolute"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-aroubd"
    >
      <Box
        display="flex"
        flexWrap="wrap"
        gap={1.5}
        margin="2rem"
        justifyContent="center"
      >
        {avatars.map((avatar) => (
          <Avatar
            key={avatar.id}
            src={avatar.image}
            alt={auth.firstName + " " + auth.lastName}
            sx={{
              height: 60,
              width: 60,
              "&:hover": { cursor: "pointer" },
              boxShadow: "0 0 4px #e6e6e6",
            }}
            onClick={() => {
              setAvatar(avatar.image);
              setIsChangingAvatar(false);
            }}
          />
        ))}
      </Box>
      <Button variant="outlined" onClick={() => setIsChangingAvatar(false)}>
        Cancel
      </Button>
    </Box>
  );
}
