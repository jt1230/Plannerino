import Avatar from "@mui/material/Avatar";
import Box from "@mui/system/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useState } from "react";
import authState from "atoms/authState";

export default function Groups() {
    const auth = useRecoilValue(authState);
    const [isDisabled, setIsDisabled] = useState(true);
    const [groupList, setGroupList] = useState([]);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(start + 3);

    useEffect(() => {
        const getGroups = async () => {
            const response = await fetch(`https://localhost:7063/api/User/${auth.id}/groups`);
            let data = await response.json();
            setGroupList(data);

        }
        getGroups();

        if (start == 0)
            setIsDisabled(true);
        else
            setIsDisabled(false);

    }, [auth, start]);

    const handlePrev = () => {
        if (start > 0 && end > 3) {
            setStart(start => start - 3)
            setEnd(end => end - 3)
        }
        else {
            setStart(0)
            setEnd(start + 3)
        }
    }

    const handleNext = () => {
        if (end < groupList.length && end >= 3) {
            setStart(start => start + 3)
            setEnd(end => end + 3)
        }
    }

    return (
        <>
            <Box flexDirection="column">
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    My Groups
                </Typography>
                <Grid container sx={{ width: "95%", mx: 2 }}>
                    <Grid container item xs={10} direction="column" >
                        <Typography variant="subtitles2" pb={1} gutterBottom fontWeight="bold" textTransform="uppercase" borderBottom={1} >
                            Groups
                        </Typography>
                        {groupList.slice(start, end).map((group) => {
                            return (
                                <Grid container item borderBottom={1} key={group.id + group.name} alignItems="center" gap="1rem" height="2rem">
                                    <Avatar sx={{ height: "1.5rem", width: "1.5rem" }} />
                                    <Typography >
                                        {group.name}
                                    </Typography>
                                </Grid>
                            )
                        })}
                    </Grid>
                    <Grid container item xs={2} direction="column" >
                        <Typography variant="subtitles2" gutterBottom fontWeight="bold" pb={1} textTransform="uppercase" borderBottom={1} >
                            Members
                        </Typography>
                        {groupList.slice(start, end).map((group) => {
                            return (
                                <Grid item borderBottom={1} key={group.id + group.count} height="2rem" textAlign="center" >
                                    <Typography gutterBottom>
                                        {group.count}
                                    </Typography>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Grid>
                <Box display="flex" justifyContent="flex-end" mr="1rem">

                    <IconButton variant="text" size="small" disabled={isDisabled} onClick={handlePrev}>
                        <ArrowLeftIcon aria-label="previous button" />
                    </IconButton>
                    <IconButton variant="text" size="small" onClick={handleNext}>
                        <ArrowRightIcon aria-label="next button" />
                    </IconButton>
                </Box>
            </Box>
        </>
    );
}