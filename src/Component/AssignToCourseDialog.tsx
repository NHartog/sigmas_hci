"use client";

import { Box, Dialog, DialogContent, Typography, Button, Card, CardContent, CardActionArea } from '@mui/material';
import { useState } from 'react';

interface Course {
    Prefix: string;
    Title: string;
    Professors: string[];
}

const AssignToCourseDialog = ({ open, onClose, availableCourses, studentName, taPreferences, studentId }: {
    open: boolean,
    onClose: () => void,
    availableCourses: Course[],
    studentName: string,
    taPreferences: any[],
    studentId: string,  // Assuming you have the student's ID passed as a prop
}) => {
    const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

    const handleSelectCourse = (courseId: string) => {
        setSelectedCourse(courseId);
    };

    const getPreferenceForProfessor = (professor: string): string => {
        console.log(studentName);
        const preference = taPreferences.find(pref =>
            pref.Prefix === selectedCourse &&
            pref.Professors === professor &&
            pref.student === studentName  // Ensure the preference is for the selected student
        );
        return preference ? preference.Preference.toString() : 'None';
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogContent>
                <Box textAlign="center" mb={3}>
                    <Typography variant="h5">Assign {studentName} to a Course</Typography>
                </Box>
                <Box display="flex" flexDirection="column" gap={2}>
                    {availableCourses.map((course) => (
                        <Card
                            key={course.Prefix}
                            onClick={() => handleSelectCourse(course.Prefix)}
                            sx={{
                                border: selectedCourse === course.Prefix ? '2px solid #3f51b5' : '1px solid #e0e0e0',
                                cursor: 'pointer',
                                backgroundColor: selectedCourse === course.Prefix ? '#f3f4fc' : '#ffffff',
                            }}
                        >
                            <CardActionArea>
                                <CardContent>
                                    <Typography variant="h6">{course.Prefix}</Typography>
                                    <Typography variant="subtitle1" color="textSecondary">{course.Title}</Typography>
                                    <Box mt={2}>
                                        <Typography variant="subtitle2" fontWeight="bold">Professor Preferences:</Typography>
                                        {course.Professors.map((professor) => (
                                            <Typography key={professor} variant="body2" color="textSecondary">
                                                {professor}: {getPreferenceForProfessor(professor)}
                                            </Typography>
                                        ))}
                                    </Box>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    ))}
                </Box>
                <Box textAlign="center" mt={4}>
                    <Button variant="contained" color="primary" onClick={onClose}>Close</Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => { /* Handle assignment action here */ }}
                        sx={{ ml: 2 }}
                        disabled={!selectedCourse}  // Only enable if a course is selected
                    >
                        Assign Selected Course
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default AssignToCourseDialog;
