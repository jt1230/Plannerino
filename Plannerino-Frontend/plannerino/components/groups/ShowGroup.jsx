import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect, useState } from "react";
import authState from "atoms/authState";
import groupssState from "atoms/groupsState";
import fetchElement from "features/users/fetch-element";
import deleteElement from "features/users/delete-element";

export default function ShowGroup({ setShowInfo, group }) {
  const auth = useRecoilValue(authState);
  const setUserGroups = useSetRecoilState(groupssState);
  const [groupMembers, setGroupMembers] = useState([]);

  useEffect(() => {
    const getGroupMembers = async () => {
      const response = await fetch(
        `https://localhost:7063/api/Group/${group.id}/users`
      );
      let data = await response.json();
      setGroupMembers(data);
    };
    getGroupMembers();
  }, [group]);

  const handleLeaveGroup = async () => {
    const deleteUserGroup = await deleteElement(`https://localhost:7063/api/Group/${group.id}/usergroup?userId=${auth.id}`)

    if(deleteUserGroup === 200){
      const data = await fetchElement(`https://localhost:7063/api/User/${auth.id}/groups`)
      setUserGroups(data);
    }
    setShowInfo(false);
  };

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
        <Box
          display="flex"
          flexWrap="wrap"
          overflow="auto"
          width="100%"
          mt="1rem"
          ml="1rem"
          gap={2}
          textAlign="center"
        >
          {groupMembers.map((member) => {
            return (
              <Box>
                <Avatar
                  src={member.avatar}
                  alt={member.firstName + " " + member.lastName}
                  key={member.id}
                  sx={{ height: "4rem", width: "4rem", margin: 1 }}
                
                />
                <Typography>
                  {member.firstName} {member.lastName}
                </Typography>
              </Box>
            );
          })}
        </Box>
        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteIcon aria-label="leave group" />}
          sx={{ mt: "auto", mb: "1rem" }}
          onClick={handleLeaveGroup}
        >
          Leave Group
        </Button>
      </Box>
    </>
  );
}
