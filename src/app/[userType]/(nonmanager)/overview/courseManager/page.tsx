"use server";

import {Box, Button, Typography} from '@mui/material'
import { EnhancedTable, HeadCell } from '../home/customTable';

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
        label: 'Student Name',
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

export default async function LandingPage() {

    return (
        <Box style={{ padding: "20px" }}>
            <EnhancedTable rows={rows} headCells={headCells} title={title} advancedTooltip/>
        </Box>
    );
}
