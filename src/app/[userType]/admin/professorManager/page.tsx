"use server";

import {Box, Button, ButtonGroup} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { EnhancedTable, HeadCell } from '../customMangerTable';

const assignedCoursesRows = [
    { id: 1, Professor: 'Jamie Ruiz', Course: 'CAP 5100', numTaHours: 0},
    { id: 2, Professor: 'Professor Prefessorson', Course: 'YAP 9999', numTaHours: 0},
];
const taAppliedRows = [
    { id: 1, name: 'Lisa Simpson', status: 'PHD', assignedToYou: 'No' },
];

const assignedCoursesHeadCells: HeadCell[] = [
    { id: 'Professor', numeric: false, disablePadding: true, label: 'Professor' },
    { id: 'Course', numeric: false, disablePadding: false, label: 'Assigned Course' }
];

const button = (
    <ButtonGroup sx={{marginTop: "3px"}}>
        <Button sx={{ margin: 1, minWidth: 'max-content' }} variant="contained" endIcon={<PersonAddIcon />}>
            View Professor Details
        </Button>
        <Button sx={{ margin: 1, minWidth: 'max-content' }} variant="contained" endIcon={<PersonAddIcon />}>
            Add Course
        </Button>
    </ButtonGroup>
);

export default async function LandingPage() {
    return (
        <Box sx={{ padding: 2 }}>
            <EnhancedTable rows={assignedCoursesRows} headCells={assignedCoursesHeadCells} title="Professors" button={button} advancedTooltip/>
        </Box>
    );
}