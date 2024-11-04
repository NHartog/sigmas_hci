"use server";

import { Box, Typography, Button, ButtonGroup, Stack } from '@mui/material'
import CourseSubPage from './courseManagerSubpage';
import { getManagerCourses } from '@/actions/manager';


export default async function LandingPage() {

    const rows = await getManagerCourses();

    console.log(rows);

    return (
        <Box sx={{ padding: 2 }}>
            <CourseSubPage coursesRows={rows}/>
        </Box>
    );
}
