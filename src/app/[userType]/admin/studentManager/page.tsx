"use server";

import {Box, Button, ButtonGroup, Typography} from '@mui/material'
import { EnhancedTable, HeadCell } from '@/Component/customTable';
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import PersonIcon from '@mui/icons-material/Person';

const rows = [
    {
        id: 1,
        studentName: 'Lisa Simpson',
        collegeStatus: 'Masters',
        applicationStatus: 'Accepted',
    }
];

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
    <ButtonGroup sx={{marginTop: "3px"}}>
        <Button sx={{ margin: 1, minWidth: 'max-content', display: "flex", flexDirection: "row" }} variant="contained" endIcon={<PersonIcon />}>
            View Student Details
        </Button>
        <Button sx={{ margin: 1, minWidth: 'max-content', display: "flex", flexDirection: "row" }} variant="contained" endIcon={<AutoStoriesIcon />}>
            Assign to Course
        </Button>
    </ButtonGroup>
);

export default async function LandingPage() {

    return (
        <Box style={{ padding: "20px" }}>
            <EnhancedTable rows={rows} headCells={headCells} button={button} title={title} advancedTooltip/>
        </Box>
    );
}