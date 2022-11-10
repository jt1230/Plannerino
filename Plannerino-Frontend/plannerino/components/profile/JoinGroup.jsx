import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useRecoilState } from "recoil";
import { useState, useEffect } from "react";
import authState from "atoms/authState";
import groupssState from "atoms/groupsState";

export default function JoinGroup({ setIsJoining }) {
  const [auth, setAuth] = useRecoilState(authState);
  const [groupList, setGroupList] = useRecoilState(groupssState);
  const [allGroups, setAllGroups] = useState([]);
  const [searchGroup, setSearchGroup] = useState(null);
  const [searchGroupMembers, setSearchGroupMembers] = useState([]);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    const getAllGroups = async () => {
      const response = await fetch(`https://localhost:7063/api/Group`);
      let data = await response.json();
      setAllGroups(data);
    };
    getAllGroups();

  }, [searchGroup]);

  useEffect(() => {
    const getGroupMembers = async () => {
      const response = await fetch(
        `https://localhost:7063/api/Group/${searchGroup.id}/users`
      );
        let data = await response.json();
        setSearchGroupMembers(data);

    };
    if (searchGroup) getGroupMembers();
  }, [searchGroup]);

  const handleJoinBtn = async (event) => {
    event.preventDefault();

    const response = await fetch(
      `https://localhost:7063/api/Group/UserGroup?userId=${auth.id}&groupId=${searchGroup.id}`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({})
      }
    );
    if(response.ok){
      await fetch(`https://localhost:7063/api/Group/${searchGroup.id}`,
      {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          id: searchGroup.id,
          name: searchGroup.name,
          description: searchGroup.description,
          count: searchGroup.count + 1,
        })
      })
    }
    const getUser = async () =>{
      const response = await fetch(`https://localhost:7063/api/User/${auth.id}`);
      const updatedData = await response.json();
      setAuth(updatedData);
    }
    getUser();
    
    const getGroups = async () => {
      const response = await fetch(
        `https://localhost:7063/api/User/${auth.id}/groups`
      );
      let data = await response.json();
      setGroupList(data);
    };
    getGroups();

    setIsJoining(false);
  };

  return (
    <>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        gap={"2rem"}
        p={"2rem"}
        sx={{
          position: "absolute",
          left: 0,
          right: 0,
          mx: "auto",
          top: "15%",
          backgroundColor: "white",
          zIndex: 100,
          height: "70%",
          width: "50%",
          border: 4,
        }}
      >
        <Grid item xs={12}>
          <Typography>Join a Group</Typography>
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            id="search-groups"
            freeSolo
            disableClearable
            value={searchGroup}
            onChange={(event, searchValue) => {
              setSearchGroup({ ...searchValue });
              setShowInfo(true);
            }}
            options={allGroups}
            getOptionLabel={(option) => option.name || ""}
            renderOption={(props, option) => (
              <Box component="li" {...props} key={option.id + option.name}>
                {option.name} ({option.count}): {option.description}
              </Box>
            )}
            renderInput={(params) => (
              <TextField {...params} label="Search group" />
            )}
          />
        </Grid>
          <Grid xs={12} item height="40%" overflow="auto">
            {searchGroupMembers.map((member) => {
              return (
                <Box display="flex" alignItems="center" gap="1rem">
                  <Avatar
                    container
                    key={member.id}
                    sx={{ height: "2rem", width: "2rem", margin: 1 }}
                  >
                    {member.firstName}
                  </Avatar>
                  <Typography variant="body2">
                    {member.firstName} {member.lastName}
                  </Typography>
                </Box>
              );
            })}
          </Grid>
          <Box display="flex" gap={3} width="100%">
            <Button
              type="button"
              fullWidth
              variant="contained"
              size="small"
              sx={{ mt: "1rem", bgcolor: "#483434" }}
              onClick={handleJoinBtn}
            >
              Join
            </Button>
            <Button
              type="button"
              fullWidth
              variant="outlined"
              size="small"
              sx={{ mt: "1rem", color: "#483434", borderColor: "#483434" }}
              onClick={() => setIsJoining(false)}
            >
              Cancel
            </Button>
        </Box>
      </Grid>
    </>
  );
}
