// studentManagerSubPage.tsx
"use client";

import { Box, Button, Stack, Typography } from '@mui/material';
import { EnhancedTable, HeadCell } from '@/Component/customTable';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import PersonIcon from '@mui/icons-material/Person';
import { useState } from "react";
import AssignToCourseDialog from '@/Component/AssignToCourseDialog';
import { getTAPreferencesbyStudent } from '@/actions/manager';
import StudentDetails from '@/Component/studentDetails';

export default function studentManagerSubPage({ rows, availableCourses, taPreferences }: { rows: any; availableCourses: any, taPreferences: any }) {

    const [selectedStudent, setSelectedStudent] = useState<any>(null);
    const [assignDialogOpen, setAssignDialogOpen] = useState(false);
    const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
    const [preferences, setPreferences] = useState<any>(null);

    const headCells: HeadCell[] = [
        { id: 'studentName', numeric: false, disablePadding: true, label: 'Applicant Name' },
        { id: 'collegeStatus', numeric: false, disablePadding: false, label: 'College Status' },
        { id: 'applicationStatus', numeric: true, disablePadding: false, label: 'Application Status' }
    ];

    const handleRowSelect = (row: any) => {
        setSelectedStudent(row); // Capture selected student
    };

    const handleStudentDetails = () => {
        setPreferences(getTAPreferencesbyStudent(selectedStudent.name))
        setDetailsDialogOpen(true);
    }

    const handleAssignCourse = () => {
        if (selectedStudent) {
            setAssignDialogOpen(true);
        }
    };

    const closeDialog = () => {
        setAssignDialogOpen(false);
        setDetailsDialogOpen(false);
    }

    const button = (
        <Stack direction="row">
            <Button sx={{ margin: 1, minWidth: 'max-content' }} variant="contained" onClick={handleStudentDetails} endIcon={<PersonIcon />}>
                View Student Details
            </Button>
            <Button sx={{ margin: 1, minWidth: 'max-content' }} variant="contained" onClick={handleAssignCourse} endIcon={<AutoStoriesIcon />}>
                Assign to Course
            </Button>
        </Stack>
    );

    console.log(taPreferences);

    return (
        <Box>
            <EnhancedTable
                rows={rows}
                headCells={headCells}
                button={button}
                title="Student Management"
                onRowSelect={handleRowSelect}
                advancedTooltip
            />
            {detailsDialogOpen && (
                <StudentDetails
                    open={detailsDialogOpen}
                    onClose={closeDialog}
                    params={selectedStudent}
                    prefs={preferences}
                />
            )

            }
            {assignDialogOpen && (
                <AssignToCourseDialog
                    open={assignDialogOpen}
                    onClose={closeDialog}
                    availableCourses={availableCourses}
                    studentName={selectedStudent.studentName}
                    taPreferences={taPreferences}
                />
            )}
        </Box>
    );
}
