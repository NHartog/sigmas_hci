"use client";

import React, { useState } from 'react';
import { Box, Button, ButtonGroup } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { EnhancedTable, HeadCell } from '@/Component/customMangerTable';
import ProfessorDetailsDialog from "@/Component/professorDetails";

let myVariable;

const courses = [
    { id: 1, Professor: 'Jamie Ruiz', enrolled: 71, seats: 100, name: "Human Computer Interaction", prefix: "CAP 5100" }
]


const assignedCoursesRows = [
    { id: 1, Professor: 'Jamie Ruiz', course: courses, numTaHours: 0, email: "jamie.ruiz@ufl.edu", courses: ['CAP5100'] },
    { id: 2, Professor: 'Professor Prefessorson', Courses: ['YAP 9999'], numTaHours: 0, email: "jyap@ufl.edu" },
];


const assignedCoursesHeadCells: HeadCell[] = [
    { id: 'Professor', numeric: false, disablePadding: true, label: 'Professor' },
    { id: 'courses', numeric: false, disablePadding: false, label: 'Assigned Course' }
];

export default function LandingPage() {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedProfessor, setSelectedProfessor] = useState(null);

    const handleViewDetails = (professor: { id: number; Professor: string; Courses: []; numTaHours: number, email: string }) => {
        setSelectedProfessor(professor);
        console.log(professor);
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setSelectedProfessor(null);
    };

    // New function to handle row selection
    const handleRowSelect = (row: any) => {
        myVariable = row; // Pass the selected row to handleViewDetails
    };

    const handleButtonOneClick =() => {
        handleViewDetails(myVariable);
    }

    const button = (
        <ButtonGroup sx={{ marginTop: "3px" }}>
            <Button
                sx={{ margin: 1, minWidth: 'max-content' }}
                variant="contained"
                endIcon={<PersonAddIcon />}
                onClick={handleButtonOneClick}
            >
                View Professor Details
            </Button>
            <Button sx={{ margin: 1, minWidth: 'max-content' }} variant="contained" endIcon={<PersonAddIcon />}>
                Add Course
            </Button>
        </ButtonGroup>
    );

    return (
        <Box sx={{ padding: 2 }}>
            <EnhancedTable
                rows={assignedCoursesRows}
                headCells={assignedCoursesHeadCells}
                title="Professors"
                button={button}
                advancedTooltip
                onRowSelect={handleRowSelect} // Pass the handleRowSelect function
            />
            {dialogOpen && (
                <ProfessorDetailsDialog
                    open={dialogOpen}
                    onClose={handleCloseDialog}
                    params={selectedProfessor}
                />
            )}
        </Box>
    );
}
