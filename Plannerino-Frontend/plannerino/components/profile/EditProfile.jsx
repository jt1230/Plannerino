import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useRecoilState } from "recoil";
import authState from "atoms/authState"

export default function EditProfile({setIsEditing}) {
    const [auth, setAuth] = useRecoilState(authState);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        let putUser = {...auth};
        putUser.firstName = data.get("firstName");
        putUser.lastName = data.get("lastName");
        putUser.password = data.get("password");;
        putUser.email = data.get("email");;
        console.log(putUser);

        await fetch(`https://localhost:7063/api/User/${putUser.id}`, {
        method: "PUT",
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(putUser)
        })

        const response = await fetch(`https://localhost:7063/api/User/${data.get("email")}`);
        const updatedData = await response.json();
        setAuth(updatedData);
        setIsEditing(false);
    };

    return (
        <>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }} display="flex" flexDirection="column" alignItems="center" > 
                 <TextField
                    required
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
                    margin="dense"
                    id="email"
                    label="Email Address"
                    name="email"
                    placeholder="name@mail.com"
                    autoFocus
                    size="small"
                />
                <TextField
                    required
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
                    sx={{ mt: "1rem", bgcolor: "#483434" }}
                >
                    Save
                </Button>
                <Button
                    type="button"
                    fullWidth
                    variant="outlined"
                    sx={{ mt: "1rem", color:"#483434", borderColor:"#483434" }}
                    onClick={() => setIsEditing(false)}
                >
                    Cancel
                </Button>
                </Box>
             </Box> 

        </>
    );
}