"use client";

import { Box, Dialog, DialogContent, Typography, Button, Card, CardContent, CardActionArea } from '@mui/material';
import { useState } from 'react';
import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';

interface Course {
    prefix: string;
    title: string;
    professors: string[];
}

const AssignToCourseDialog = ({ open, onClose, availableCourses, studentName, taPreferences }: {
    open: boolean,
    onClose: () => void,
    availableCourses: Course[],
    studentName: string,
    taPreferences: any[],
}) => {
    const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

    const handleSelectCourse = (courseId: string) => {
        setSelectedCourse(courseId);
    };

    const getPreferenceForProfessor = (professor: string, course: string): number => {
        console.log(professor);
        console.log(taPreferences);
        const preference = taPreferences.find(pref =>
            pref.Prefix === course &&
            pref.Student === studentName
        );
        return preference ? preference.Preference : 0;  // Return preference count or 0 if none
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogContent>
                <Box textAlign="center" mb={3}>
                    <Typography variant="h5">Assign {studentName} to a Course</Typography>
                </Box>
                <Box display="flex" flexDirection="column" gap={2}>
                    {availableCourses.map((course) => (
                        <Card
                            key={course.prefix}
                            onClick={() => handleSelectCourse(course.prefix)}
                            sx={{
                                border: selectedCourse === course.prefix ? '2px solid #3f51b5' : '1px solid #e0e0e0',
                                cursor: 'pointer',
                                backgroundColor: selectedCourse === course.prefix ? '#f3f4fc' : '#ffffff',
                            }}
                        >
                            <CardActionArea>
                                <CardContent>
                                    <Typography variant="h6">{course.prefix}</Typography>
                                    <Typography variant="subtitle1" color="textSecondary">{course.title}</Typography>
                                    <Box mt={2}>
                                        <Typography variant="subtitle2" fontWeight="bold">Professor Preferences:</Typography>
                                        {course.professors.map((professor) => {
                                            const preference = getPreferenceForProfessor(professor, course.prefix);
                                            return (
                                                <Box key={professor} display="flex" alignItems="center">
                                                    <Typography variant="body2" color="textSecondary" sx={{ mr: 1 }}>
                                                        {professor}:
                                                    </Typography>
                                                    <Box display="flex">
                                                        {Array.from({ length: preference }).map((_, index) => (
                                                            <StarTwoToneIcon key={`filled-${index}`} sx={{ color: "rgba(255,127,50,1)" }} />
                                                        ))}
                                                        {Array.from({ length: 5 - preference }).map((_, index) => (
                                                            <StarTwoToneIcon key={`empty-${index}`} sx={{ color: "gray" }} />
                                                        ))}
                                                    </Box>
                                                </Box>
                                            );
                                        })}
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
