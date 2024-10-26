"use server";
import { ReactNode } from "react";
import { Box, ButtonGroup, Button, Typography } from "@mui/material";
import Link from "next/link";
import LaunchIcon from '@mui/icons-material/Launch';
import InfoIcon from '@mui/icons-material/Info';
import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';

export default async function LandingPage({ children, params }: { children: ReactNode, params: {course: string}} ) {

    return (
        <Box style={{ padding: "20px", textAlign: "center" }}>
            <Typography variant="h2" component="h1" gutterBottom>
                This is the Manager Settings Page
            </Typography>
            <Typography variant="body1">
                Here we will add Course Details for {params.course}
            </Typography>
        </Box>
    );
}