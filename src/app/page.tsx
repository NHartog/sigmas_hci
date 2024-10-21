"use server";

import {Box, Button, Typography} from '@mui/material'
import {headers} from "next/headers";

export default async function LandingPage() {
    console.log("meow")
  return (
      <Box style={{ padding: "20px", textAlign: "center" }}>
        <Typography variant="h2" component="h1" color= "black"gutterBottom>
          Welcome to the UF TA System
        </Typography>
        <Typography variant="body1" color = "black" paragraph>
          Manage your TA applications, roles, and settings all in one place!
        </Typography>
        <Button variant="contained" color="primary" href="/login">
          Login
        </Button>
      </Box>
  );
}

