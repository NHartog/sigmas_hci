"use server";

import { Box, Typography, Button, ButtonGroup, Stack } from '@mui/material'
import CourseSubPage from './subpage';
import { getManagerCourses } from '@/actions/manager';


export default async function LandingPage() {

    //const coursesRows = [
    //    {
    //        id: 1,
    //        Prefix: "CAP5100",
    //        Title: "HCI",
    //        Professors: ['Jamie Ruiz', 'Someone Else'],
    //        Assigned_TAs: [],
    //        Current_Enrollment: 81,
    //        Max_Enrollment: 100,
    //        TA_Hours: 10,
    //        Sections: 1
    //    },
    //];
    const rows = await getManagerCourses();

    return (
        <Box sx={{ padding: 2 }}>
            <CourseSubPage coursesRows={rows}/>
        </Box>
    );
}
