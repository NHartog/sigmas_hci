"use client";

import { Box, Button, Stack, Typography } from '@mui/material';
import { EnhancedTable, HeadCell } from '@/Component/customTable';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import PersonIcon from '@mui/icons-material/Person';
import { useState } from "react";
import AssignToCourseDialog from '@/Component/AssignToCourseDialog';
import {getTAPreferencesbyStudent, addStudent, postProf} from '@/actions/manager';
import StudentDetails from '@/Component/studentDetails';
import AddStudentDialog from '@/Component/AddStudentDialog';
import ExplanationCard from "@/Component/explanationCard";  // Assuming you've created this component

export default function studentManagerSubPage({ rows, availableCourses, taPreferences }: { rows: any; availableCourses: any, taPreferences: any }) {

    const [selectedStudent, setSelectedStudent] = useState<any>(null);
    const [assignDialogOpen, setAssignDialogOpen] = useState(false);
    const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
    const [preferences, setPreferences] = useState<any>(null);
    const [addStudentDialogOpen, setAddStudentDialogOpen] = useState(false);  // state for dialog

    const cardTitle = 'Welcome to Student Manager';
    const cardDescription = 'Manage your students efficiently using the options below. Select a student to perform various actions.';


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
        setAddStudentDialogOpen(false);  // Close Add Student Dialog
    }

    const handleAddStudentDialogOpen = () => {
        setAddStudentDialogOpen(true);  // Open Add Student Dialog
    }
    const button = (
        <Stack direction="row">
            <Button sx={{ margin: 1, minWidth: 'max-content' }} variant="contained" onClick={handleStudentDetails} endIcon={<PersonIcon />} >
                View Student Details
            </Button>
            <Button sx={{ margin: 1, minWidth: 'max-content' }} variant="contained" onClick={handleAssignCourse} endIcon={<AutoStoriesIcon />} >
                Assign to Course
            </Button>
        </Stack>
    );

    const studentOptions = [
        {
            label: 'View Student Details',
            description: 'View all important details for a student',
            icon: <PersonIcon />,
        },
        {
            label: 'Assign to Course',
            description: 'Assign the selected student to a course',
            icon: <AutoStoriesIcon />,
        }
    ];

    return (
        <Box>

            <ExplanationCard title={cardTitle} description={cardDescription}>
                {studentOptions.map((option) => (
                    <Box
                        key={option.label}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mb: 1,
                            flexWrap: 'wrap',
                        }}
                    >
                        <Button
                            variant="contained"
                            startIcon={option.icon}
                            sx={{ mr: 2, width: '220px' }}
                            disabled={!selectedStudent}
                        >
                            {option.label}
                        </Button>
                        <Typography variant="body1">{option.description}</Typography>
                    </Box>
                ))}
            </ExplanationCard>

            <EnhancedTable
                rows={rows}
                headCells={headCells}
                button={button}
                title="Student Management"
                onRowSelect={handleRowSelect}
                advancedTooltip
            />
            {/* Add the "Add New Student" button below the table */}
            <Box sx={{ textAlign: "right", mt: 2 }}>
                <Button
                    onClick={handleAddStudentDialogOpen}
                    variant="contained"
                    color="secondary"
                >
                    Add New Student
                </Button>
            </Box>

            {/* Add Student Dialog Component */}
            {addStudentDialogOpen && (
                <AddStudentDialog
                    open={addStudentDialogOpen}
                    onClose={closeDialog} // Close the dialog
                />
            )}

            {/* Details and Assign Dialogs */}
            {detailsDialogOpen && (
                <StudentDetails
                    open={detailsDialogOpen}
                    onClose={closeDialog}
                    params={selectedStudent}
                    prefs={preferences}
                />
            )}
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
