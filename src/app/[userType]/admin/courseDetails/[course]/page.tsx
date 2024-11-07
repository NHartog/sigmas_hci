"use server";
import { Box, ButtonGroup, Button, Typography, Card } from "@mui/material";
import Link from "next/link";
import CourseDetails from '@/Component/courseDetails';
import { ReactNode } from "react";


const existingCourses = ['CAP5100', 'CNT5106C', 'CAP5900']

export default async function LandingPage({ params }: { params: {course: string}} ) {
    if(!existingCourses.includes(params.course)){
        return (
            <Box style={{ padding: "20px", textAlign: "center" }}>
                <Typography variant="h2" component="h1" gutterBottom>
                    Sorry for the Confusion!
                </Typography>
                <Typography variant="body1">
                    {params.course} doesn't seem to be in our current course catalog.
                </Typography>
                <Typography variant="body1">
                    To add the course {params.course}, click here! 
                </Typography>
                <Button sx={{border: "3px solid black", width: "20%", height: "120%", color: "white", backgroundColor: "rgba(255, 127, 50, 0.8)", '&:hover': {backgroundColor: "rgba(255, 127, 50, 1)"}}}>
                    + Add Course
                </Button>
            </Box>
        );
    }
    //AT this step we'll look up real details in the backend, but for the current moment everyone gets the same other details
    const courseDetails = {course: `${params.course}`, enrolled: 81, seats: 144, professor: "Jaime Ruiz", linked_courses: "N/A", tas: [], prosp_tas: [{name: "John Adams", status: "Undergraduate"}]}
    return (
        <CourseDetails params={courseDetails} open={undefined} close={undefined} />
    );
}
