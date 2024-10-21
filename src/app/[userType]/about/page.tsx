"use server";

import {Box, Typography} from '@mui/material'

export default async function LandingPage() {

    return (
        <Box style={{ padding: "20px", textAlign: "center" }}>
            <Typography variant="h2" component="h1" gutterBottom>
                This is the About Page
            </Typography>
            <Typography variant="body1" paragraph>
                Here we will add about information
            </Typography>
        </Box>
    );
}