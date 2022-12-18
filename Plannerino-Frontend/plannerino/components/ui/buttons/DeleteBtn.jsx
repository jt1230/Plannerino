import { Box, Button, Typography } from "@mui/material";
import { useRecoilState } from "recoil";
import { useState } from "react";
import authState from "atoms/authState";

export default function DeleteBtn() {
  const [auth, setAuth] = useRecoilState(authState);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteAccount = async () => {
    const response = await fetch(`https://localhost:7063/api/User/${auth.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
    });
    if (response.status === 200) {
      setAuth(null);
    }
  };

  const DeleteConfirmation = () => {
    return (
      <Box
        border="2px solid red"
        padding={1}
        sx={{
          position: "absolute",
          background: "white",
          width: "15rem",
          textAlign: "center",
        }}
      >
        <Typography>Are you sure you want to delete your account?</Typography>
        <Box display="flex" gap={2} mt="1rem" justifyContent="center">
          <Button
            sx={{ backgroundColor: "#483434" }}
            variant="contained"
            onClick={handleDeleteAccount}
          >
            Yes
          </Button>
          <Button variant="outlined" onClick={() => setIsDeleting(false)}>
            No
          </Button>
        </Box>
      </Box>
    );
  };
  return (
    <>
      <Button
        sx={{ width: "50%" }}
        size="large"
        variant="contained"
        color="error"
        onClick={() => setIsDeleting(true)}
      >
        Delete Account
      </Button>
      {isDeleting ? <DeleteConfirmation /> : null}
    </>
  );
}
