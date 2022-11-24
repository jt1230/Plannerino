import { Box, Button, TextField } from "@mui/material";
import { useRecoilState } from "recoil";
import authState from "atoms/authState";
import fetchUser from "features/users/fetch-user";
import putUser from "features/users/put-user";

export default function EditProfile({setIsEditing}) {
    const [auth, setAuth] = useRecoilState(authState);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        let userToBeUpdated = {...auth};
        userToBeUpdated.firstName = data.get("firstName");
        userToBeUpdated.lastName = data.get("lastName");
        userToBeUpdated.password = data.get("password");
        userToBeUpdated.email = data.get("email");

        // await fetch(`https://localhost:7063/api/User/${auth.id}`, {
        // method: "PUT",
        // headers: {'content-type': 'application/json'},
        // body: JSON.stringify(userToBeUpdated)
        // })

        const updateUser = await putUser(auth.id, userToBeUpdated);

    //     const response = await fetch(`https://localhost:7063/api/User/${auth.id}`);
    // const updatedData = await response.json();
    const getUpdatedUser = await fetchUser(userToBeUpdated.email, userToBeUpdated.password);
    setAuth(getUpdatedUser);
        setIsEditing(false);
    };

    return (
        <>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }} display="flex" flexDirection="column" alignItems="center" > 
                 <TextField
                    required
                    variant="filled"
                    margin="dense"
                    id="firstName"
                    label="First Name"
                    name="firstName"
                    placeholder={auth.firstName}
                    autoFocus
                    size = "small"
                />
                <TextField
                    required
                    variant="filled"
                    margin="dense"
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    placeholder={auth.lastName}
                    autoFocus
                    size="small"

                />
                <TextField
                    required
                    variant="filled"
                    margin="dense"
                    id="email"
                    label="Email Address"
                    name="email"
                    placeholder={auth.email}
                    autoFocus
                    size="small"
                />
                <TextField
                    required
                    variant="filled"
                    margin="dense"
                    name="password"
                    label="Password"
                    placeholder="*********"
                    type="password"
                    id="password"
                    size="small"
                />
                <Box display="flex" gap={3} width="100%">

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: "1rem"}}
                >
                    Save
                </Button>
                <Button
                    type="button"
                    fullWidth
                    variant="outlined"
                    sx={{ mt: "1rem" }}
                    onClick={() => setIsEditing(false)}
                >
                    Cancel
                </Button>
                </Box>
             </Box> 

        </>
    );
}