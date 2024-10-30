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
    selected: { prefix: string | null; name: string | null }; // Updated to include selected
}

export default function TaPreferenceDialog({ open, close, students, courses, selected }: TaPreferenceDialogProps) {
    const [selectedCourse, setSelectedCourse] = useState<string | null>(selected.prefix);
    const [selectedTA, setSelectedTA] = useState<string | null>(selected.name);
    const [preferenceValue, setPreferenceValue] = useState<number | null>(3); // Default preference value

    useEffect(() => {
        // Prefill selections when dialog opens or selected changes
        setSelectedCourse(selected.prefix);
        setSelectedTA(selected.name);
    }, [open, selected]);

    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        setPreferenceValue(newValue as number);
    };

    return (
        <Dialog open={open} onClose={close}>
            <DialogTitle sx={{ backgroundColor: 'orange', color: 'white' }}>
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
                                    onChange={(e) => setSelectedCourse(e.target.value)}
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

                     {/*TA Selection Card*/}
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
                            <Box sx={ {p:1}}>
                                <Slider
                                    valueLabelDisplay="auto"
                                    marks={[
                                        { value: 1, label: '1' },
                                        { value: 2, label: '2' },
                                        { value: 3, label: '3' },
                                        { value: 4, label: '4' },
                                        { value: 5, label: '5' }
                                    ]}
                                    onChange={handleSliderChange}
                                    aria-labelledby="preference-slider"
                                    step={1}
                                    min={1}
                                    max={5}
                                    value={preferenceValue || 3} // Default to 3 if preferenceValue is null
                                    sx={{ width: '100%' }}
                                />
                            </Box>


                        </CardContent>
                    </Card>

                     {/*Add as TA Button*/}
                    <Button
                        variant="contained"
                        endIcon={<PersonAddIcon />}
                        onClick={() => {
                            // Add your logic for adding the selected course and TA here
                            console.log("Selected Course:", selectedCourse);
                            console.log("Selected TA:", selectedTA);
                            console.log("Preference Level:", preferenceValue);
                            // You can close the dialog after adding
                            close();
                        }}
                        sx={{ marginTop: 2 }}
                    >
                        Add as TA
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
}
