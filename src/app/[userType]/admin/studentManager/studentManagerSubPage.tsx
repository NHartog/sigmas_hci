"use client";

import { Box, Button, Typography } from '@mui/material';
import { EnhancedTable, HeadCell } from '@/Component/customTable';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import PersonIcon from '@mui/icons-material/Person';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState } from "react";
import AssignToCourseDialog from '@/Component/AssignToCourseDialog';
import { getTAPreferencesbyStudent, addStudent, deleteStudent } from '@/actions/manager';
import StudentDetails from '@/Component/studentDetails';
import AddStudentDialog from '@/Component/AddStudentDialog';
import ExplanationCard from "@/Component/explanationCard";
import {Stack} from "@mui/system";
import AreYouSureDialog from "@/Component/areYouSureDialog";

export default function studentManagerSubPage({ rows, availableCourses, taPreferences }: { rows: any; availableCourses: any, taPreferences: any }) {
    const [selectedStudent, setSelectedStudent] = useState<any>(null);
    const [studentRows, setStudentRows] = useState(rows);
    const [assignDialogOpen, setAssignDialogOpen] = useState(false);
    const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
    const [preferences, setPreferences] = useState<any>(null);
    const [addStudentDialogOpen, setAddStudentDialogOpen] = useState(false);
    const [selectionKey, setSelectionKey] = useState(0);
    const [areYouSureDialogOpen, setAreYouSureDialogOpen] = useState(false);
    const cardTitle = 'Welcome to Student Manager';
    const cardDescription = 'Manage your students efficiently using the options below. Select a student to perform various actions.';

    const headCells: HeadCell[] = [
        { id: 'studentName', numeric: false, disablePadding: true, label: 'Applicant Name' },
        { id: 'collegeStatus', numeric: false, disablePadding: false, label: 'College Status' },
        { id: 'applicationStatus', numeric: true, disablePadding: false, label: 'Application Status' },
    ];

    const handleRowSelect = (row: any) => {
        setSelectedStudent(row);
    };

    const handleStudentDetails = () => {
        setPreferences(getTAPreferencesbyStudent(selectedStudent.name));
        setDetailsDialogOpen(true);
    };

    const handleAssignCourse = () => {
        if (selectedStudent) {
            setAssignDialogOpen(true);
        }
    };

    const handleRemoveStudent =  () => {
        setAreYouSureDialogOpen(true);
    };

    const closeDialog = () => {
        setAssignDialogOpen(false);
        setDetailsDialogOpen(false);
        setAddStudentDialogOpen(false);
        setAreYouSureDialogOpen(false);
        window.location.reload();
    };

    const handleAddStudentDialogOpen = () => {
        setAddStudentDialogOpen(true);
    };

    const removeStudent = async () => {
        if (selectedStudent) {
            try {
                const response = await deleteStudent(selectedStudent); // Ensure _id is included in selectedStudent
                alert(response.message);

            } catch (error) {
                console.error('Error removing student:', error);
                alert('Failed to remove student.');
            }
        }
    };

    const studentOptions = [
        {
            label: 'View Student Details',
            description: 'View all important details for a student',
            icon: <PersonIcon />,
            onClick: handleStudentDetails,
        },
        {
            label: 'Assign to Course',
            description: 'Assign the selected student to a course',
            icon: <AutoStoriesIcon />,
            onClick: handleAssignCourse,
        },
        {
            label: 'Remove Student',
            description: 'Remove the selected student from the system',
            icon: <DeleteIcon />,
            onClick: handleRemoveStudent,
        },
    ];

    const button = (
        <Stack direction="row">
            <Button sx={{ margin: 1, minWidth: 'max-content' }} variant="contained" onClick={handleStudentDetails} endIcon={<PersonIcon />} >
                View Student Details
            </Button>
            <Button sx={{ margin: 1, minWidth: 'max-content' }} variant="contained" onClick={handleAssignCourse} endIcon={<AutoStoriesIcon />} >
                Assign to Course
            </Button>
            <Button sx={{ margin: 1, minWidth: 'max-content' }} variant="contained" onClick={handleRemoveStudent} endIcon={<DeleteIcon />} >
                Remove Student
            </Button>
        </Stack>
    );

    return (
        <Box>
            <ExplanationCard title={cardTitle} description={cardDescription}>
                {!selectedStudent && (
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                        Please select a student from the table below to enable the options.
                    </Typography>
                )}
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
                            onClick={option.onClick}
                        >
                            {option.label}
                        </Button>
                        <Typography variant="body1">{option.description}</Typography>
                    </Box>
                ))}
            </ExplanationCard>

            <EnhancedTable
                rows={studentRows}
                headCells={headCells}
                title="Student Management"
                onRowSelect={handleRowSelect}
                advancedTooltip
                selectionKey={selectionKey}
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
                    onClose={closeDialog}
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
            {areYouSureDialogOpen && (
                <AreYouSureDialog
                    open={areYouSureDialogOpen}
                    onClose={closeDialog}
                    toRemove={selectedStudent}
                    onConfirm={removeStudent}
                />
                )}
        </Box>
    );
}
