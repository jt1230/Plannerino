import { Avatar, Button, Box } from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";
import Face2Icon from "@mui/icons-material/Face2";
import Face3Icon from "@mui/icons-material/Face3";
import Face4Icon from "@mui/icons-material/Face4";
import Face5Icon from "@mui/icons-material/Face5";
import Face6Icon from "@mui/icons-material/Face6";
import MoodIcon from "@mui/icons-material/Mood";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import { useRecoilState } from "recoil";
import avatarState from "atoms/avatarState";

export default function Avatars({ setIsChangingAvatar }) {
  const [avatar, setAvatar] = useRecoilState(avatarState);

 const AvatarIcon = (avatar) => {
	switch (avatar) {
	  case "FaceIcon":
		return <FaceIcon />;
	  case "Face2Icon":
		return <Face2Icon />;
	  case "Face3Icon":
		return <Face3Icon />;
	  case "Face4Icon":
		return <Face4Icon />;
	  case "Face5Icon":
		return <Face5Icon />;
	  case "Face6Icon":
		return <Face6Icon />;
	  case "MoodIcon":
		return <MoodIcon />;
	  case "SentimentSatisfiedIcon":
		return <SentimentSatisfiedIcon />;
	  default:
		return <FaceIcon />;
	}
  }

 
  return (
    <Box
      height="30vh"
      width="30vh"
      top="15%"
      zIndex={100}
      backgroundColor="white"
      border={1}
      position="absolute"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-evenly"
    >
      <Box display="flex" flexWrap="wrap" gap={1} justifyContent="center">
        <Avatar
          sx={{ height: 60, width: 60, "&:hover": { cursor: "pointer" } }}
          onClick={() => {
            setAvatar(<FaceIcon fontSize="large" color="button" />);
            setIsChangingAvatar(false);
          }}
        >
          <FaceIcon fontSize="large" color="button" />
        </Avatar>
        <Avatar
          sx={{ height: 60, width: 60, "&:hover": { cursor: "pointer" } }}
          onClick={() => {
            setAvatar(<Face2Icon fontSize="large" color="button" />);
            setIsChangingAvatar(false);
          }}
        >
          <Face2Icon fontSize="large" color="button" />
        </Avatar>
        <Avatar
          sx={{ height: 60, width: 60, "&:hover": { cursor: "pointer" } }}
          onClick={() => {
            setAvatar(<Face3Icon fontSize="large" color="button" />);
            setIsChangingAvatar(false);
          }}
        >
          <Face3Icon fontSize="large" color="button" />
        </Avatar>
        <Avatar
          sx={{ height: 60, width: 60, "&:hover": { cursor: "pointer" } }}
          onClick={() => {
            setAvatar(<Face4Icon fontSize="large" color="button" />);
            setIsChangingAvatar(false);
          }}
        >
          <Face4Icon fontSize="large" color="button" />
        </Avatar>
        <Avatar
          sx={{ height: 60, width: 60, "&:hover": { cursor: "pointer" } }}
          onClick={() => {
            setAvatar(<Face5Icon fontSize="large" color="button" />);
            setIsChangingAvatar(false);
          }}
        >
          <Face5Icon fontSize="large" color="button" />
        </Avatar>
        <Avatar
          sx={{ height: 60, width: 60, "&:hover": { cursor: "pointer" } }}
          onClick={() => {
            setAvatar(<Face6Icon fontSize="large" color="button" />);
            setIsChangingAvatar(false);
          }}
        >
          <Face6Icon fontSize="large" color="button" />
        </Avatar>
        <Avatar
          sx={{ height: 60, width: 60, "&:hover": { cursor: "pointer" } }}
          onClick={() => {
            setAvatar(
              <SentimentSatisfiedIcon fontSize="large" color="button" />
            );
            setIsChangingAvatar(false);
          }}
        >
          <SentimentSatisfiedIcon fontSize="large" color="button" />
        </Avatar>
        <Avatar
          sx={{ height: 60, width: 60, "&:hover": { cursor: "pointer" } }}
          onClick={() => {
            setAvatar(<MoodIcon fontSize="large" color="button" />);
            setIsChangingAvatar(false);
          }}
        >
          <MoodIcon fontSize="large" color="button" />
        </Avatar>
      </Box>
      <Button variant="outlined" onClick={() => setIsChangingAvatar(false)}>
        Cancel
      </Button>
    </Box>
  );
}
