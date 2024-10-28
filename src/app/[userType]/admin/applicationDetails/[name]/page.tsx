"use server";
import { ReactNode } from "react";
import { Box, ButtonGroup, Button, Typography } from "@mui/material";
import ApplicationDetails from "@/Component/applicationDetails";

export default async function LandingPage({ children, params }: { children: ReactNode, params: {name: string}} ) {
    const last_name = params.name.substring(0,params.name.indexOf("_"));
    const first_name = params.name.substring(params.name.indexOf("_")+1,params.name.length);
    const decoy = {name: "John Adams", ufID: "11244420", gpa: 4.0, college_status: "Senior", email: "no@yahoo.com", us_origin: "Yes", travel_plans: "Cape Town", research_interests: "HCI"};
    return (
        <Box style={{ padding: "20px", textAlign: "center" }}>
            <Typography variant="h2" component="h1" gutterBottom>
                This is the Application Details Page
            </Typography>
            <Typography variant="body1">
                Here we will add Application Details for {first_name} {last_name}
            </Typography>
            <ApplicationDetails params={decoy}/>
        </Box>
    );
}