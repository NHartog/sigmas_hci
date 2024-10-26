"use server";
import { ReactNode } from "react";
import { Box, ButtonGroup, Button, Typography } from "@mui/material";
import Link from "next/link";
import LaunchIcon from '@mui/icons-material/Launch';
import InfoIcon from '@mui/icons-material/Info';
import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';

export default async function LandingPage({ children, params }: { children: ReactNode, params: {name: string}} ) {
    const last_name = params.name.substring(0,params.name.indexOf("_"));
    const first_name = params.name.substring(params.name.indexOf("_")+1,params.name.length);
    return (
        <Box style={{ padding: "20px", textAlign: "center" }}>
            <Typography variant="h2" component="h1" gutterBottom>
                This is the Professor Details Page
            </Typography>
            <Typography variant="body1">
                Here we will add Professor Details for {first_name} {last_name}
            </Typography>
        </Box>
    );
}