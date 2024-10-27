"use client"
import { Typography, TextField, Button, Box, Paper, FormControl, FormHelperText } from "@mui/material"; // Import Material-UI components
import { redirectUser } from "@/actions/login";
import { LoadingButton } from "@mui/lab";
import { useEffect, useState } from "react";

export default function LoginPage() {

    const [isLoading, setLoading] = useState<boolean>(false)
    const [showError, setShowError] = useState<false | string>(false)
    const [event, setEvent] = useState<any>()

    function handleLoading(e: any) {
        setLoading(true)
        setShowError(false)
        setEvent(e)
    }

    useEffect(() => {
        if (isLoading) {
            redirectUser(event).then((incorrect: boolean) => {
                if (incorrect) {
                    setLoading(false)
                    setShowError("Incorrect Username and Password")
                }
            })
        }
    }, [isLoading])

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                padding: "20px",
            }}
        >
            <Typography variant="h4" component="h1" color="black" gutterBottom>
                Login
            </Typography>
            <form
                action={(e: any) => { handleLoading(e) }}
                style={{ width: "100%", maxWidth: "400px" }}
            >
                <FormControl
                    error={showError as boolean}
                    sx={{mb: 1}}
                    fullWidth
                >
                    <TextField
                        label="Username"
                        name="username"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        required
                        error={showError as boolean}
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        required
                        error={showError as boolean}
                    />
                    <FormHelperText sx={{textAlign: 'center'}}>{showError}</FormHelperText>
                </FormControl>
                <LoadingButton loading={isLoading} variant="contained" color="primary" type="submit" fullWidth>
                    Enter
                </LoadingButton>
            </form>
        </Box>
    );
}
