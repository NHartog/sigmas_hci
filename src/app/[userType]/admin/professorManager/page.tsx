"use server";

import { Box } from "@mui/material";
import ProfessorSubPage from "./subpage";
import { getProfessors, getManagerCourses } from "@/actions/manager";



export default async function LandingPage() {

    const rows = await getProfessors();
    const all_Courses = await getManagerCourses();

    return (
        <Box sx={{ padding: 2 }}>
            <ProfessorSubPage assignedCoursesRows={rows} all_Courses={all_Courses}/>
        </Box>
    );
}
