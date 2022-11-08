import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/system/Box";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useState } from "react";
import authState from "../../atoms/authState";

export default function Groups() {
    const auth = useRecoilValue(authState)
    const [groupList, setGroupList] = useState([]);

    useEffect(() => {
        const getGroups = async () => {
            const response = await fetch(`https://localhost:7063/api/User/${auth.id}/groups`);
            let data = await response.json();
            setGroupList(data);

        }
        getGroups();

    }, [auth]);


    return (
        <>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
                My Groups
            </Typography>


            <Grid container sx={{ width: "95%", mx: 2 }}>
                <Grid container item xs={10} direction="column" >
                    <Typography variant="subtitles2" pb={1}  gutterBottom fontWeight="bold" textTransform="uppercase" borderBottom={1} >
                        Groups
                    </Typography>
                    {groupList.map((group) => {
                        return (
                            <Grid item borderBottom={1} key={group.id + group.name}>
                                <Typography gutterBottom>
                                    {group.name}
                                </Typography>
                            </Grid>
                        )
                    })}
                </Grid>
                <Grid container item xs={2} direction="column" >
                    <Typography variant="subtitles2" pb={1} gutterBottom fontWeight="bold"  textTransform="uppercase" borderBottom={1} >
                        Members
                    </Typography>
                    {groupList.map((group) => {
                        return (
                            <Grid item borderBottom={1} key={group.id + group.count}>
                                <Typography gutterBottom>
                                    {group.count}
                                </Typography>
                            </Grid>
                        )
                    })}
                </Grid>
            </Grid>
        </>
    );
}