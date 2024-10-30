"use server";
import { ReactNode } from "react";
import { Box, ButtonGroup, Button, Typography } from "@mui/material";
import Link from "next/link";
import ProfessorDetails from "@/Component/professorDetails";

const existingProfessors = ['Jaime Ruiz', 'Ye Xia']

export default async function LandingPage({ children, params }: { children: ReactNode, params: {name: string}} ) {
    const last_name = params.name.substring(0, params.name.indexOf('_'))
    const first_name = params.name.substring(params.name.indexOf('_')+1)
    const full_name = `${first_name} ${last_name}`
    if(!existingProfessors.includes(full_name)){
        return (
            <Box style={{ padding: "20px", textAlign: "center" }}>
                <Typography variant="h2" component="h1" gutterBottom>
                    Sorry for the Confusion!
                </Typography>
                <Typography variant="body1">
                    {full_name} doesn't seem to be registered as a professor for the current semester.
                </Typography>
                <Typography variant="body1">
                    To add the professor {full_name}, click here! 
                </Typography>
                <Button sx={{border: "3px solid black", width: "20%", height: "120%", color: "white", backgroundColor: "rgba(255, 127, 50, 0.8)", '&:hover': {backgroundColor: "rgba(255, 127, 50, 1)"}}}>
                    + Add Professor
                </Button>
            </Box>
        );
    }


    //At this step we'll look up real details in the backend, but for the current moment everyone gets the same other details
    const professorDetails = {name: full_name, email: "prof@ufl.edu", department: "CISE", courses: [{name: "CAP5100", enrolled: 81, seats: 144}], assigned_tas: [{name: "Dustin Samuels", status: "Graduate", assigned_course: "CAP5100"}, {name: "Ed Chambers", status: "Undergraduate", assigned_course: "CNT5106C", preference: 5}], prosp_tas: [], prev_courses: [{course:'CAP5100', semester: "Spring 2023"}]}
    return (
        <ProfessorDetails params={professorDetails} />
    );
}
