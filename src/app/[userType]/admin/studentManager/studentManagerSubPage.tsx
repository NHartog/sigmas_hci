// studentManagerSubPage.tsx
"use client";

import { Box, Button, Stack, Typography } from '@mui/material';
import { EnhancedTable, HeadCell } from '@/Component/customTable';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import PersonIcon from '@mui/icons-material/Person';
import { useState } from "react";
import AssignToCourseDialog from '@/Component/AssignToCourseDialog';

export default function studentManagerSubPage({ rows, availableCourses, taPreferences }: { rows: any; availableCourses:any, taPreferences:any }) {

    const [selectedStudent, setSelectedStudent] = useState<any>(null);
    const [assignDialogOpen, setAssignDialogOpen] = useState(false);

    const headCells: HeadCell[] = [
        { id: 'studentName', numeric: false, disablePadding: true, label: 'Applicant Name' },
        { id: 'collegeStatus', numeric: false, disablePadding: false, label: 'College Status' },
        { id: 'applicationStatus', numeric: true, disablePadding: false, label: 'Application Status' }
    ];

    const handleRowSelect = (row: any) => {
        setSelectedStudent(row); // Capture selected student
    };

    const handleAssignCourse = () => {
        if (selectedStudent) setAssignDialogOpen(true);
    };

    const closeAssignDialog = () => setAssignDialogOpen(false);

    const button = (
        <Stack direction="row">
            <Button sx={{ margin: 1 }} variant="contained" endIcon={<PersonIcon />}>
                View Student Details
            </Button>
            <Button sx={{ margin: 1 }} variant="contained" onClick={handleAssignCourse} endIcon={<AutoStoriesIcon />}>
                Assign to Course
            </Button>
        </Stack>
    );

    return (
        <Box style={{ padding: "20px" }}>
            <EnhancedTable
                rows={rows}
                headCells={headCells}
                button={button}
                title="Student Management"
                onRowSelect={handleRowSelect}
                advancedTooltip
            />
            {assignDialogOpen && selectedStudent && (
                <AssignToCourseDialog
                    open={assignDialogOpen}
                    onClose={closeAssignDialog}
                    availableCourses={availableCourses}
                    studentName={selectedStudent.studentName}
                    taPreferences={taPreferences}
                />
            )}
        </Box>
    );
}
