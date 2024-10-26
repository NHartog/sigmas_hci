"use server";

import {Box, Typography} from '@mui/material'
import ProfessorManagementTable from "@/Component/professorManagementTable";

export default async function LandingPage() {

    return (
        <Box style={{ padding: "20px", textAlign: "center" }}>
            <Typography variant="h2" component="h1" gutterBottom>
                This is the professor Manager Page
            </Typography>
            <Typography variant="body1" paragraph>
                Here we will add stuff about the professor management
            </Typography>
            <ProfessorManagementTable />
        </Box>
    );
}