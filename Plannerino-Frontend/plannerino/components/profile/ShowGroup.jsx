import { Avatar, Box, IconButton, Typography } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import authState from "atoms/authState";
import groupssState from "atoms/groupsState";

export default function ShowGroup({ setShowInfo, group }) {
  const auth = useRecoilValue(authState);
  const groups = useRecoilValue(groupssState);
	const [groupMembers, setGroupMembers] = useState([]);

	  useEffect(() => {

		const getGroupMembers = async () => {
		  const response = await fetch(`https://localhost:7063/api/Group/${group.id}/users`);
		  let data = await response.json();
		  setGroupMembers(data);
	  }
	  getGroupMembers();
	}, [group]);

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{
          position: "absolute",
          left: 0,
          right: 0,
          mx: "auto",
          top: "25%",
          backgroundColor: "white",
          zIndex: 100,
          height: "50%",
          width: "25%",
          border: 1,
        }}
      >
        <IconButton
          size="small"
          sx={{
            ml: "auto",
            mr: "1rem",
            color: "#483434",
            borderColor: "#483434",
          }}
          onClick={() => setShowInfo(false)}
        >
          <CancelIcon />
        </IconButton>
        <Typography>{group.name}</Typography>
		<Box display="flex" flexWrap="wrap" overflow="auto" width="100%" mt="1rem" ml="1rem" gap={2} textAlign="center">

		{groupMembers.map((member) => {
              return (
                <Box> 
                <Avatar container key={member.id} sx={{height:"4rem", width:"4rem", margin: 1}}>
                  {member.firstName}
                </Avatar>
                <Typography>{member.firstName} {member.lastName}</Typography>           
                </Box>
              );
            })}
		</Box>
      </Box>
    </>
  );
}
