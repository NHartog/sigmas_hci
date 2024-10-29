"use server";

import { Box, Button, Typography } from '@mui/material'
import { EnhancedTable, HeadCell } from '@/Component/customTable'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { getCourses, getTAs } from '@/actions/professor';

export default async function LandingPage() {

    const headCells: HeadCell[] = [
        {
            id: 'prefix',
            numeric: false,
            disablePadding: true,
            label: 'Prefix',
        },
        {
            id: 'title',
            numeric: false,
            disablePadding: false,
            label: 'Title',
        },
        {
            id: 'numTaHours',
            numeric: true,
            disablePadding: false,
            label: 'Num TA Hours',
        },
        {
            id: 'enrollment',
            numeric: false,
            disablePadding: false,
            label: 'Enrollment',
        }
    ];

    const headCells2: HeadCell[] = [
        {
            id: 'name',
            numeric: false,
            disablePadding: true,
            label: 'Name',
        },
        {
            id: 'status',
            numeric: false,
            disablePadding: false,
            label: 'Status',
        },
        {
            id: 'assignedToYou',
            numeric: false,
            disablePadding: false,
            label: 'Assigned To You?',
        }
    ];

    const title = "Assigned Courses"
    const title2 = "Current TA Applied"

    const button = <Button sx={{ margin: 1, minWidth: 'max-content' }} variant="contained" endIcon={<PersonAddIcon />}>
        Add TA Preference
    </Button>

    const button2 = <Button sx={{ margin: 1, minWidth: 'max-content' }} variant="contained" endIcon={<PersonAddIcon />}>
        Add TA Preference
    </Button>

    const rows = await getCourses()
    const rows2 = await getTAs()

    console.log(rows2)
    return (
        <Box style={{ padding: "20px" }}>
            <EnhancedTable rows={rows} headCells={headCells} title={title} button={button} />
            <EnhancedTable rows={rows2} headCells={headCells2} title={title2} button={button2} />
        </Box>
    );
}
