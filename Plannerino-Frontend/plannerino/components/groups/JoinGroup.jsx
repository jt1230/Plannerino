import { Autocomplete, Avatar, Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useState, useEffect } from "react";
import authState from "atoms/authState";
import groupssState from "atoms/groupsState";
import createElement from "features/users/create-element";
import editElement from "features/users/edit-element";
import fetchElement from "features/users/fetch-element";

export default function JoinGroup({ setIsJoining }) {
  const [auth, setAuth] = useRecoilState(authState);
  const setUserGroups = useSetRecoilState(groupssState);
  const [allGroups, setAllGroups] = useState([]);
  const [searchGroup, setSearchGroup] = useState(null);
  const [searchGroupMembers, setSearchGroupMembers] = useState([]);

  useEffect(() => {
    const getAllGroups = async () => {
      const data = await fetchElement(`https://localhost:7063/api/Group`);
      setAllGroups(data);
    };
    getAllGroups();

    const getGroupMembers = async () => {
      const data = await fetchElement(`https://localhost:7063/api/Group/${searchGroup.id}/users`);
      setSearchGroupMembers(data);
    };
    if(searchGroup){
      getGroupMembers();
    }

  }, [searchGroup]);

  const handleJoinBtn = async (event) => {
    event.preventDefault();

    const createUserGroup = await createElement( `https://localhost:7063/api/Group/UserGroup?userId=${auth.id}&groupId=${searchGroup.id}`, {});

    // If usergroup was successfully created, update group count
    if(createUserGroup === 200){
      let groupToBeUpdated = { ...searchGroup };
      groupToBeUpdated.count = groupToBeUpdated.count + 1;
      await editElement(`https://localhost:7063/api/Group/${searchGroup.id}`, groupToBeUpdated)
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
      setUserGroups(data);
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
                    src={member.avatar}
                    key={member.id}
                    sx={{ height: "2rem", width: "2rem", margin: 1 }}
                  />
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
