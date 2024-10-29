"use server";

import {Box, Button, Container, Typography} from '@mui/material'
import About from "@/Component/about"
import Image from 'next/image';

export default async function LandingPage() {
  return (
      <Box style={{ padding: 20, textAlign: "center" }}>
        <Typography variant="h2" color= "black"gutterBottom>
          Welcome to the UF TA System
        </Typography>
        <Container maxWidth="md" sx={{position: "relative", aspectRatio: '1.5', mb: 2}}>
          <Image
            src="https://www.gainesville.com/gcdn/authoring/2019/01/15/NTGS/ghows-LK-7f853cad-7096-0edd-e053-0100007fd056-63268455.jpeg"
            alt="Picture of Teaching Assistant"
            fill
          />
        </Container>
        <About/>
        <Button sx={{mt: 3}} variant="contained" color="primary" href="/login">
          Login
        </Button>
      </Box>
  );
}

