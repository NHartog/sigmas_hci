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
import { addTAPreference } from "@/actions/professor";
import { getUserData } from "@/actions/application";

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
    selectedCourse: Course | null;
    selectedTA: Ta | null;
}

export default function TaPreferenceDialog({ open, close, students, courses, selectedCourse, selectedTA }: TaPreferenceDialogProps) {
    const [selectedCoursePrefix, setSelectedCoursePrefix] = useState<string>(selectedCourse ? selectedCourse.prefix : '');
    const [selectedCourseTitle, setSelectedCourseTitle] = useState<string>(selectedCourse ? selectedCourse.title : '');
    const [selectedTAName, setSelectedTAName] = useState<string>(selectedTA ? selectedTA.name : '');
    const [preferenceValue, setPreferenceValue] = useState<number>(3); // Default preference value

    useEffect(() => {
        if (selectedCourse) {
            setSelectedCoursePrefix(selectedCourse.prefix);
            setSelectedCourseTitle(selectedCourse.title);
        } else {
            setSelectedCoursePrefix('');
            setSelectedCourseTitle('');
        }
    }, [selectedCourse]);

    useEffect(() => {
        if (selectedTA) {
            setSelectedTAName(selectedTA.name);
        } else {
            setSelectedTAName('');
        }
    }, [selectedTA]);

    const handleCourseChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const coursePrefix = event.target.value as string;
        setSelectedCoursePrefix(coursePrefix);

        // Find and set the title associated with the selected prefix
        const selectedCourseData = courses.find((course) => course.prefix === coursePrefix);
        setSelectedCourseTitle(selectedCourseData ? selectedCourseData.title : '');
    };

    const handleTAChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const taName = event.target.value as string;
        setSelectedTAName(taName);
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
                                    value={selectedCoursePrefix}
                                    onChange={handleCourseChange as any}
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
                                    value={selectedTAName}
                                    onChange={handleTAChange as any}
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
                                    value={preferenceValue}
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
                                const userData = await getUserData();
                                const response = await addTAPreference({
                                    prefix: selectedCoursePrefix,
                                    title: selectedCourseTitle,
                                    student: selectedTAName,
                                    preference: preferenceValue,
                                    professor: userData.name,
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
                        disabled={!selectedCoursePrefix || !selectedTAName} // Disable if either is not selected
                    >
                        Add as TA Preference
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
}
