"use client";

import React, {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import {Stack} from "@mui/system";
import {Checkbox, FormControlLabel, IconButton, Slider, Divider} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';


// Steps array containing titles for the stepper
const steps = ['Student Information', 'Course Preferences', 'Confirm and Submit'];

// Values for dropdown options
const semesters = ['Fall 2023', 'Spring 2024', 'Summer 2024'];
const collegeStatus = ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate'];

const courses = ['Course 1', 'Course 2', 'Course 3', 'Course 4', 'Course 5'];

interface OverviewProps {
    studentInfo: {
        semesterAdmitted: string;
        collegeStatus: string;
        ufGpa: string;
        ufid: string;
        ufEmail: string;
    };
    coursePreferences: {
        course: string;
        preference: number;
        taken: boolean;
    }[];
}

export default function ApplicationStepper() {
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState<{ [k: number]: boolean }>({});
    const [formData, setFormData] = useState({
        selectedSemester: '',
        selectedCollegeStatus: '',
        ufGPA: '',
        ufID: '',
        ufEmail: '',
        coursePreferences: [{ course: '', preference: 1, taken: false }]
    });

    const handleSemesterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setFormData({ ...formData, selectedSemester: event.target.value as string });
    };

    const handleCollegeStatusChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setFormData({ ...formData, selectedCollegeStatus: event.target.value as string });
    };

    const handleGPAChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setFormData({ ...formData, ufGPA: event.target.value as string });
    };

    const handleIDChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setFormData({ ...formData, ufID: event.target.value as string });
    };

    const handleEmailChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setFormData({ ...formData, ufEmail: event.target.value as string });
    };

    const handlePreferenceChange = (index: number, field: string, value: unknown) => {
        const updatedPreferences = [...formData.coursePreferences];
        updatedPreferences[index][field] = value;
        setFormData({ ...formData, coursePreferences: updatedPreferences });
    };

    const handleAddPreference = () => {
        if (formData.coursePreferences.length < 5) {
            setFormData({
                ...formData,
                coursePreferences: [...formData.coursePreferences, { course: '', preference: 1, taken: false }]
            });
        }
    };

    const handleDeletePreference = (index: number) => {
        const updatedPreferences = formData.coursePreferences.filter((_, i) => i !== index);
        setFormData({ ...formData, coursePreferences: updatedPreferences });
    };

    const renderStepContent = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <Box
                        sx={{
                            padding: 3,
                            borderRadius: 2,
                            border: '1px solid #ccc',
                            maxWidth: '500px',
                            margin: 'auto',
                            marginTop: 5,
                            marginBottom: 5,
                            backgroundColor: '#f5f5f5',
                            width: '100%'
                        }}
                    >
                        {/* Semester Admitted Dropdown */}
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Semester Admitted</InputLabel>
                            <Select
                                value={formData.selectedSemester}
                                onChange={handleSemesterChange}
                                label="Semester Admitted"
                                variant="outlined"
                            >
                                {semesters.map((semester) => (
                                    <MenuItem key={semester} value={semester}>
                                        {semester}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* College Status Dropdown */}
                        <FormControl fullWidth margin="normal">
                            <InputLabel>College Status</InputLabel>
                            <Select
                                value={formData.selectedCollegeStatus}
                                onChange={handleCollegeStatusChange}
                                label="College Status"
                                variant="outlined"
                            >
                                {collegeStatus.map((status) => (
                                    <MenuItem key={status} value={status}>
                                        {status}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* UF GPA Field */}
                        <TextField
                            value={formData.ufGPA}
                            onChange={handleGPAChange}
                            label="UF GPA"
                            name="ufGpa"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            required
                        />

                        {/* UFID Field */}
                        <TextField
                            value={formData.ufID}
                            onChange={handleIDChange}
                            label="UFID"
                            name="ufid"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            required
                        />

                        {/* UF Email Field */}
                        <TextField
                            value={formData.ufEmail}
                            onChange={handleEmailChange}
                            label="UF Email"
                            name="ufEmail"
                            type="email"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            required
                        />
                    </Box>
                );
            case 1:
                return (
                    <Stack spacing={2} sx={{ width: '100%', marginTop: 5}}>
                        {formData.coursePreferences.map((preference, index) => (
                            <Box
                                key={index}
                                sx={{
                                    padding: 2,
                                    borderRadius: 2,
                                    border: '1px solid #ccc',
                                    backgroundColor: '#f5f5f5',
                                    width: '100%'
                                }}
                            >
                                <Stack spacing={2} direction="row" sx={{ width: '100%'}}>
                                    {/* Course Dropdown */}
                                    <FormControl sx={{minWidth: '40%'}} margin="normal">
                                        <InputLabel>Course</InputLabel>
                                        <Select
                                            value={preference.course}
                                            onChange={(event) => handlePreferenceChange(index, 'course', event.target.value)}
                                            label="Course"
                                            variant="outlined"

                                        >
                                            {courses.map((course) => (
                                                <MenuItem key={course} value={course}>
                                                    {course}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    {/* Preference Level Slider */}
                                    <Typography>Preference Level: {preference.preference}</Typography>
                                    <Slider
                                        valueLabelDisplay="auto"
                                        marks={[
                                            { value: 1, label: '1' },
                                            { value: 2, label: '2' },
                                            { value: 3, label: '3' },
                                            { value: 4, label: '4' },
                                            { value: 5, label: '5' }
                                        ]}
                                        onChange={(event, newValue) => handlePreferenceChange(index, 'preference', newValue)}
                                        aria-labelledby="preference-slider"
                                        step={1}
                                        min={1}
                                        max={5}
                                        sx={{ width: '40%'}}
                                    />

                                    {/* Course Taken Checkbox */}
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={preference.taken}
                                                onChange={(event) => handlePreferenceChange(index, 'taken', event.target.checked)}

                                            />
                                        }
                                        label="Course Taken"
                                        labelPlacement="start"
                                    />

                                    {/* Delete Preference Button */}
                                    <IconButton
                                        color="error"
                                        onClick={() => handleDeletePreference(index)}
                                        disabled={formData.coursePreferences.length === 1}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Stack>
                            </Box>
                        ))}

                        {/* Add Course Preference Button */}
                        {formData.coursePreferences.length < 5 && (
                            <Button variant="contained" onClick={handleAddPreference} sx={{alignItems: 'center'}}>
                                Add Course Preference
                            </Button>
                        )}
                    </Stack>
                );
            case 2:
                return (
                    <Box sx={{ padding: 3 }}>
                        <Typography variant="h6">Overview</Typography>

                        {/* Student Information */}
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Student Information</Typography>
                        <Typography>Semester Admitted: {formData.selectedSemester}</Typography>
                        <Typography>College Status: {formData.selectedCollegeStatus}</Typography>
                        <Typography>UF GPA: {formData.ufGPA}</Typography>
                        <Typography>UFID: {formData.ufID}</Typography>
                        <Typography>UF Email: {formData.ufEmail}</Typography>

                        {/* Course Preferences */}
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 3 }}>Course Preferences</Typography>
                        {formData.coursePreferences.map((preference, index) => (
                            <Box key={index} sx={{ marginBottom: 2 }}>
                                <Typography>Course: {preference.course}</Typography>
                                <Typography>Preference Level: {preference.preference}</Typography>
                                <Typography>Course Taken: {preference.taken ? 'Yes' : 'No'}</Typography>
                            </Box>
                        ))}

                        {/* Final Notes */}
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 3 }}>Final Confirmation</Typography>
                        <Typography>Please review and confirm all the information before submission.</Typography>
                    </Box>
                );
            default:
                return <Typography>Unknown step</Typography>;
        }
    };

    return (
        <Stack sx={{ width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
            <Stepper Linear activeStep={activeStep} sx={{width: '100%'}}>
                {steps.map((label, index) => (
                    <Step key={label} completed={completed[index]}>
                        <StepButton color="inherit" onClick={() => setActiveStep(index)}>
                            {label}
                        </StepButton>
                    </Step>
                ))}
            </Stepper>
            <Box sx={{ width: '100%' }}>
                {renderStepContent(activeStep)}
                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={() => setActiveStep((prev) => prev - 1)}
                        sx={{ width: '100%', mr: 1 }}
                    >
                        Back
                    </Button>
                    <Box sx={{ width: '100%', flex: '1 1 auto' }} />
                    <Button
                        onClick={() => setActiveStep((prev) => prev + 1)}
                        disabled={activeStep === steps.length - 1}
                        sx={{ mr: 1 }}
                    >
                        Next
                    </Button>
                    {activeStep === steps.length - 1 && (
                        <Button
                            onClick={() => alert('Submit the form')}
                            sx={{ width: '100%', ml: 1 }}
                        >
                            Submit
                        </Button>
                    )}
                </Box>
            </Box>
        </Stack>
    );
}
