"use server";

import { Box, Button, Container, Paper, Stack, Typography } from '@mui/material'

export default async function LandingPage() {

    return (
        <Container maxWidth="md">
            <Paper elevation={5} style={{ padding: "20px", textAlign: "center" }}>
                <Stack spacing={1}>
                    <Stack direction="row" spacing={2} justifyContent="space-between" sx={{ width: '100%', pb: 2 }}>
                        <Typography variant="h2" color="info">Fall 2024</Typography>
                        <Typography variant="h2"> Application</Typography>
                    </Stack>
                    <Stack direction="row" spacing={2} justifyContent="space-between" sx={{ width: '100%' }}>
                        <Typography variant="h5">Last Edit Date</Typography>
                        <Typography variant="body1">10/21/2024</Typography>
                    </Stack>
                    <Stack direction="row" spacing={2} justifyContent="space-between" sx={{ width: '100%' }}>
                        <Typography variant="h5">Completed Status</Typography>
                        <Typography variant="body1" color="success">Completed</Typography>
                    </Stack>
                    <Stack direction="row" spacing={2} justifyContent="space-between" sx={{ width: '100%' }}>
                        <Typography variant="h5">Application Status</Typography>
                        <Typography variant="body1" color="success">Accepted</Typography>
                    </Stack>
                </Stack>
                <Stack direction="row" justifyContent="space-between" sx={{pt: 2}}>
                    <Button variant="outlined" color="error">Withdraw Application</Button>
                    <Button variant="outlined">View Application</Button>
                </Stack>
            </Paper>
        </Container>
    );
}
