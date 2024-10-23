"use server"

import { Container, Link, Stack, Typography } from "@mui/material"
import React from "react"

export default async function About() {
    return (
        <Container maxWidth="md">
            <Stack spacing={5} alignItems="start">
                <Stack spacing={1} alignItems="start">
                    <Typography variant="h4">What is the TA Application System (TAAS)</Typography>
                    <Typography variant="body1" textAlign="start">TAAS is a simple tool for students, professors, and school officials to manage the different aspects of either becoming or employing Teaching Assistants.</Typography>
                </Stack>
                <Stack spacing={1} alignItems="start">
                    <Stack direction={'row'} justifyContent="center" spacing={2}>
                        <Typography variant="h4">Current Semester: </Typography>
                        <Typography variant="h4" color="info">Fall 2024</Typography>
                    </Stack>
                    <Stack direction={'row'} justifyContent="center" spacing={1}>
                        <Typography variant="body1">Students </Typography>
                        <Typography variant="body1" color="info">are</Typography>
                        <Typography variant="body1"> able to apply</Typography>
                    </Stack>
                </Stack>
                <Stack spacing={1} alignItems="start">
                    <Typography variant="h4">Questions and Issues With TAAS</Typography>
                    <Stack direction={'row'} justifyContent="center" spacing={1}>
                        <Typography variant="body1">Questions: </Typography>
                        <Link href="mailto:rzhang1@ufl.edu" variant="body1" color="info">rzhang1@ufl.edu</Link>
                    </Stack>
                    <Stack direction={'row'} justifyContent="center" spacing={1}>
                        <Typography variant="body1">Technical Issues: </Typography>
                        <Link href="mailto:consult@cise.ufl.edu" variant="body1" color="info">consult@cise.ufl.edu</Link>
                    </Stack>
                </Stack>
            </Stack>
        </Container>
    )
}
