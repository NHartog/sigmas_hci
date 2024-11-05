"use client";

import { Box, Dialog, DialogContent, Typography, Button, Card, CardContent, CardActionArea } from '@mui/material';
import {useEffect, useState} from 'react';
import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';
import {updateWithTAPreference, getStudentPreference} from "@/actions/manager";

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
    const [studentPreference, setStudentPreference] = useState<any>({});
    const [loading, setLoading] = useState(false);

    const handleSelectCourse = (courseId: string) => {
        setSelectedCourse(courseId);
    };

    const handleAssignCourse = async () => {
        console.log(selectedCourse);
        if (selectedCourse && studentName) {
            setLoading(true); // Optional: Set loading state
            try {
                // Call server function to update student and course details
                const result = await updateWithTAPreference(studentName, selectedCourse);
                console.log(result.message); // Log the success or error message



                if (result.success) {
                    // Close dialog or show confirmation as needed
                    alert(result.message);
                    onClose();
                } else {
                    // Handle any errors or notify the user
                    alert(result.message);
                }
            } catch (error) {
                console.error("Failed to assign course:", error);
                alert("An error occurred while assigning the course.");
            } finally {
                setLoading(false); // Reset loading state
            }
        }
    };

    const getPreferenceForProfessor = (professor: string, course: string): number => {
        console.log(taPreferences)
        const preference = taPreferences.find(pref =>
            pref.Prefix === course &&
            pref.Student === studentName &&
            pref.Professor === professor
        );
        return preference ? preference.Preference : 0;
    };

    const getPreferenceForStudent = async (course: string) => {
        return await getStudentPreference(studentName, course);
    };



    useEffect(() =>
    {
        for(const course of availableCourses) {
            getPreferenceForStudent(course.prefix).then((preference: any) => {
                var temp = JSON.parse(JSON.stringify(studentPreference));
                temp[course.prefix] = preference;
                setStudentPreference(temp);
                console.log(preference);
            });

        }
    },[])


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
                                        <Typography variant="subtitle2" fontWeight="bold">Student Preferences:</Typography>
                                        <Box key={studentName} display="flex" alignItems="center">
                                            <Typography variant="body2" color="textSecondary" sx={{ mr: 1 }}>
                                                {studentName}:
                                            </Typography>
                                            <Box display="flex">
                                                {Array.from({ length: studentPreference[course.prefix] }).map((_, index) => (
                                                    <StarTwoToneIcon key={`filled-${index}`} sx={{ color: "rgba(255,127,50,1)" }} />
                                                ))}
                                                {Array.from({ length: 5 - studentPreference[course.prefix] }).map((_, index) => (
                                                    <StarTwoToneIcon key={`empty-${index}`} sx={{ color: "gray" }} />
                                                ))}
                                            </Box>
                                        </Box>
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
                        onClick={handleAssignCourse}
                        sx={{ ml: 2 }}
                        disabled={!selectedCourse || loading} // Disable if no course selected or loading
                    >
                        {loading ? "Assigning..." : "Assign Selected Course"}
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default AssignToCourseDialog;
