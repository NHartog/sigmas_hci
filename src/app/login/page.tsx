"use server";

import { Typography, TextField, Button, Box } from "@mui/material"; // Import Material-UI components
import {redirectUser} from "@/actions/login";



export default async function LoginPage() {


    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                padding: "20px",
            }}
        >
            <Typography variant="h4" component="h1" color="black" gutterBottom>
                Login
            </Typography>
            <form
                action={redirectUser}
                method="POST"
                style={{width: "100%", maxWidth: "400px"}}
            >
                <TextField
                label="Username"
                name="username"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                />
                <TextField
                    label="Password"
                    name="password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    required
                />
                <Button variant="contained" color="primary" type="submit" fullWidth>
                    Login
                </Button>
            </form>
        </Box>
    );
}
