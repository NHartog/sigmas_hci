"use server";

import {Box, Button, Typography} from '@mui/material'


// The main landing page component
export default async function LandingPage() {
  return (
      <Box style={{ padding: "20px", textAlign: "center" }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to the UF TA System
        </Typography>
        <Typography variant="body1" paragraph>
          Manage your TA applications, roles, and settings all in one place!
        </Typography>
        <Button variant="contained" color="primary" href="/login">
          Login
        </Button>
      </Box>
  );
}


// sigmasta.edu/professor/application
