import {
  Avatar,
  Box,
  Grid,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { useState } from "react";
import authState from "atoms/authState";
import groupssState from "atoms/groupsState";
import CreateGroup from "components/profile/CreateGroup";
import JoinGroup from "components/profile/JoinGroup";
import ShowGroup from "components/profile/ShowGroup";

export default function Groups() {
  const PER_PAGE = 4;
  const auth = useRecoilValue(authState);
  const [isDisabled, setIsDisabled] = useState(true);
  const [groupList, setGroupList] = useRecoilState(groupssState);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(start + PER_PAGE);
  const [showInfo, setShowInfo] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [currentGroup, setCurrentGroup] = useState(null);

  useEffect(() => {
    const getGroups = async () => {
      const response = await fetch(
        `https://localhost:7063/api/User/${auth.id}/groups`
      );
      let data = await response.json();
      setGroupList(data);
    };
    getGroups();

    if (start == 0) setIsDisabled(true);
    else setIsDisabled(false);
  }, [auth, start, groupList]);

  const handleBackClick = () => {
    if (start > 0 && end > PER_PAGE) {
      setStart((start) => start - PER_PAGE);
      setEnd((end) => end - PER_PAGE);
    } else {
      setStart(0);
      setEnd(start + PER_PAGE);
    }
  };

  const handleNextClick = () => {
    if (end < groupList.length && end >= PER_PAGE) {
      setStart((start) => start + PER_PAGE);
      setEnd((end) => end + PER_PAGE);
    }
  };

  const handleGroupClick = (group) => {
    setCurrentGroup((currentGroup = { ...group }));
    setShowInfo(true);
  };
  return (
    <>
      {isCreating ? <CreateGroup setIsCreating={setIsCreating} /> : null}
      {isJoining ? <JoinGroup setIsJoining={setIsJoining} /> : null}

      <Box flexDirection="column" minHeight="40vh" maxHeight="40vh">
        <Grid container alignItems="center" >
          <Grid container item px="1rem" mt="1rem">
          <Grid item xs>
            <Typography variant="body1" fontWeight="bold" gutterBottom>
              My Groups
            </Typography>
          </Grid>
          <Grid item xs display="flex" gap="0.5rem" justifyContent="flex-end" >
            <Button
              endIcon={<AddIcon aria-label="join group" />}
              variant="outlined"
              size="small"
              onClick={() => setIsJoining(true)}
            >
              Join Group
            </Button>
            <Button
              endIcon={<AddIcon aria-label="create group" />}
              variant="outlined"
              size="small"
              onClick={() => setIsCreating(true)}
            >
              Create Group
            </Button>
          </Grid>

          </Grid>
          <Grid container item xs={12} mt="1rem" borderBottom="1px solid #e0e0e0">
            <Typography
              variant="subtitle2"
              px="1rem"
              pb={1}
              gutterBottom
              fontWeight="bold"
              textTransform="uppercase"
            >
              Groups
            </Typography>
            <Typography
              variant="subtitle2"
              px="1rem"
              pb={1}
              gutterBottom
              fontWeight="bold"
              textTransform="uppercase"
              ml="auto"
            >
              Members
            </Typography>
            {groupList.slice(start, end).map((group) => {
              return (
                <>
                  {showInfo ? (
                    <ShowGroup setShowInfo={setShowInfo} group={currentGroup} />
                  ) : null}
                  <Grid
                    sx={{
                      "&:hover": { background: "#e9e9e9", cursor: "pointer" },
                    }}
                    container
                    item
                    borderTop="1px solid #e0e0e0"
                    key={group.id + group.name}
                    alignItems="center"
                    gap="1rem"
                    px="0.5rem"
                    height="3rem"
                    onClick={() => handleGroupClick(group)}
                  >
                    <Avatar sx={{ height: "1.5rem", width: "1.5rem" }} />
                    <Box>
                      <Typography variant="subtitle1" >{group.name}</Typography>
                      <Typography variant="subtitle2" color="gray" >
                        {group.description}
                      </Typography>
                    </Box>
                    <Typography ml="auto" px="1rem" gutterBottom >
                      {group.count}
                    </Typography>
                  </Grid>
                </>
              );
            })}
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="flex-end" mr="1rem" mb="1rem">
          <IconButton
            variant="text"
            size="small"
            disabled={isDisabled}
            onClick={handleBackClick}
          >
            <ArrowLeftIcon aria-label="previous button" />
          </IconButton>
          <IconButton variant="text" size="small" onClick={handleNextClick}>
            <ArrowRightIcon aria-label="next button" />
          </IconButton>
        </Box>
      </Box>
    </>
  );
}
