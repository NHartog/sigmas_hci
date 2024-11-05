"use server";

import { Box, Typography, Button, ButtonGroup, Stack } from '@mui/material'
import StudentSubPage from './studentManagerSubPage';
import {getManagerCourses, getStudents, getTAPreferences} from '@/actions/manager';
import studentManagerSubPage from "./studentManagerSubPage";
import CourseSubPage from "@/app/[userType]/admin/courseManager/courseManagerSubpage";


export default async function LandingPage() {

    const rows = await getStudents();
    const availableCourses = await getManagerCourses();
    const taPreferences = await  getTAPreferences();



    return (
        <Box sx={{ padding: 2 }}>
            <StudentSubPage rows={rows} availableCourses= {availableCourses} taPreferences={taPreferences} />
        </Box>
    );
}