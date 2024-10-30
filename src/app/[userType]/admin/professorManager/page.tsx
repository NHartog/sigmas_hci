"use server";

import { Box } from "@mui/material";
import ProfessorSubPage from "./subpage";
import { getProfessors } from "@/actions/manager";



export default async function LandingPage() {

    const rows = await getProfessors();

    return (
        <Box sx={{ padding: 2 }}>
            <ProfessorSubPage assignedCoursesRows={rows}/>
        </Box>
    );
}
