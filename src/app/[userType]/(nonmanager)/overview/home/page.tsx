"use server";

import { Box, Button, Typography } from '@mui/material'
import { EnhancedTable, HeadCell } from '@/Component/customTable'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { getCourses, getTAs } from '@/actions/professor';
import AddTASubcomponent from '@/Component/adTASubCompoent';

export default async function LandingPage() {

    const rows = await getCourses()
    const rows2 = await getTAs()
    return (
        <AddTASubcomponent rows = {rows} rows2={rows2}/>
    );
}
