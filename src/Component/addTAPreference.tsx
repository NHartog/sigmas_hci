"use client";

import { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
    Box,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Card,
    CardContent,
    Typography,
    Slider,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {addTAPreference} from "@/actions/professor";
import {getUserData} from "@/actions/application";

interface Ta {
    id: number;
    name: string;
    status: string;
    assignedToYou: string;
}

interface Course {
    id: number;
    prefix: string;
    title: string;
    professors: string[];
}

interface TaPreferenceDialogProps {
    open: boolean;
    close: () => void;
    students: Ta[];
    courses: Course[];
    selected: { prefix: string | null; name: string | null; title: string | null; pref: string | null };
}

export default function TaPreferenceDialog({ open, close, students, courses, selected }: TaPreferenceDialogProps) {
    const [selectedCourse, setSelectedCourse] = useState<string | null>(selected.prefix);
    const [selectedCourseTitle, setSelectedCourseTitle] = useState<string | null>(selected.title);
    const [selectedTA, setSelectedTA] = useState<string | null>(selected.name);
    const [preferenceValue, setPreferenceValue] = useState<number | null>(selected.pref || 3); // Default preference value
    useEffect(() => {
        setSelectedCourse(selected.prefix);
        setSelectedCourseTitle(selected.title);
        setSelectedTA(selected.name);
    }, [open, selected]);

    const handleCourseChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const coursePrefix = event.target.value as string;
        setSelectedCourse(coursePrefix);

        // Find and set the title associated with the selected prefix
        const selectedCourseData = courses.find((course) => course.prefix === coursePrefix);
        setSelectedCourseTitle(selectedCourseData ? selectedCourseData.title : null);
    };

    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        setPreferenceValue(newValue as number);
    };

    return (
        <Dialog open={open} onClose={close} fullWidth maxWidth="lg">
            <DialogTitle sx={{ backgroundColor: 'rgba(255, 127, 50, 1)', color: 'white' }}>
                Add TA Preference
            </DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {/* Course Selection Card */}
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Select Course
                            </Typography>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>Select Course</InputLabel>
                                <Select
                                    value={selectedCourse || ''}
                                    onChange={handleCourseChange}  // Updated to use handleCourseChange
                                    label="Select Course"
                                >
                                    {courses.map((course) => (
                                        <MenuItem key={course.id} value={course.prefix}>
                                            {course.prefix} - {course.title}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </CardContent>
                    </Card>

                    {/* TA Selection Card */}
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Select TA
                            </Typography>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>Select TA</InputLabel>
                                <Select
                                    value={selectedTA || ''}
                                    onChange={(e) => setSelectedTA(e.target.value)}
                                    label="Select TA"
                                >
                                    {students.map((ta) => (
                                        <MenuItem key={ta.id} value={ta.name}>
                                            {ta.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            {/* Slider for TA Preference */}
                            <Typography variant="subtitle1" gutterBottom sx={{ marginTop: 2 }}>
                                Preference Level
                            </Typography>
                            <Box sx={{ p: 1 }}>
                                <Slider
                                    valueLabelDisplay="auto"
                                    marks={[
                                        { value: 1, label: '1' },
                                        { value: 2, label: '2' },
                                        { value: 3, label: '3' },
                                        { value: 4, label: '4' },
                                        { value: 5, label: '5' },
                                    ]}
                                    onChange={handleSliderChange}
                                    aria-labelledby="preference-slider"
                                    step={1}
                                    min={1}
                                    max={5}
                                    value={preferenceValue || 3}
                                    sx={{ width: '100%' }}
                                />
                            </Box>
                        </CardContent>
                    </Card>

                    {/* Add as TA Button */}
                    <Button
                        variant="contained"
                        endIcon={<PersonAddIcon />}
                        onClick={async () => {

                            try {
                                const userData = await getUserData()
                                console.log(userData)
                                const response = await addTAPreference({
                                    prefix: selectedCourse,
                                    title: selectedCourseTitle,
                                    student: selectedTA,
                                    preference: preferenceValue,
                                    professor: userData.name
                                });

                                if (response.success) {
                                    alert(response.message); // Success alert
                                    close();
                                } else {
                                    alert(response.message); // Error alert
                                }
                            } catch (error) {
                                console.error('Error adding TA preference:', error);
                                alert('An unexpected error occurred. Please try again.');
                            }
                        }}
                        sx={{ marginTop: 2 }}
                    >
                        Add as TA Preference
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
}
