"use server";

import { Box, Button, ButtonGroup, Stack, Typography } from '@mui/material'
import { EnhancedTable, HeadCell } from '@/Component/customTable';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import PersonIcon from '@mui/icons-material/Person';
import { getStudents } from '@/actions/manager';


export default async function LandingPage() {

    const rows = await getStudents()

    const headCells: HeadCell[] = [
        {
            id: 'studentName',
            numeric: false,
            disablePadding: true,
            label: 'Applicant Name',
        },
        {
            id: 'collegeStatus',
            numeric: false,
            disablePadding: false,
            label: 'College Status',
        },
        {
            id: 'applicationStatus',
            numeric: true,
            disablePadding: false,
            label: 'Application Status',
        }
    ];

    const title = "Student Management"

    const button = (
        <Stack direction="row">
            <Button sx={{ margin: 1, minWidth: 'max-content', display: "flex", flexDirection: "row" }} variant="contained" endIcon={<PersonIcon />}>
                View Student Details
            </Button>
            <Button sx={{ margin: 1, minWidth: 'max-content', display: "flex", flexDirection: "row" }} variant="contained" endIcon={<AutoStoriesIcon />}>
                Assign to Course
            </Button>
        </Stack>
    );

    return (
        <Box style={{ padding: "20px" }}>
            <EnhancedTable rows={rows} headCells={headCells} button={button} title={title} advancedTooltip />
        </Box>
    );
}
