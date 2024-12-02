"use client";

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Stack } from "@mui/system";
import { Checkbox, FormControlLabel, IconButton, Slider, Divider, Container, RadioGroup, Radio } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import CustomizedSteppers from './customStepper'
import { saveForLater, submitApplication } from '@/actions/application';
import StarTwoToneIcon from "@mui/icons-material/StarTwoTone";


// Steps array containing titles for the stepper
const steps = ['Student Information', 'Course Preferences', 'Confirm and Submit'];

// Values for dropdown options
const semesters = ['Fall 2023', 'Spring 2024', 'Summer 2024'];
const collegeStatus = ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate'];


const defaultApplication = {
    selectedSemester: '',
    selectedCollegeStatus: '',
    ufGPA: '',
    ufID: '',
    ufEmail: '',
    score: '',
    isUSA: 'yes',
    responseOne: '',
    responseTwo: '',
    coursePreferences: [{ course: '', preference: 1, taken: false }]
}

export default function ApplicationStepper({ applicationData, courses }: { applicationData?: typeof defaultApplication, courses: any}) {
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState<typeof defaultApplication>(applicationData || defaultApplication);

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

    const handleRadioChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setFormData({ ...formData, isUSA: event.target.value as string });
    };

    const handleScoreChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setFormData({ ...formData, score: event.target.value as string });
    };

    const handleResponseOneChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setFormData({ ...formData, responseOne: event.target.value as string });
    };

    const handleResponseTwoChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setFormData({ ...formData, responseTwo: event.target.value as string });
    };

    const handlePreferenceChange = (index: number, field: string, value: unknown) => {
        const updatedPreferences = [...formData.coursePreferences];
        (updatedPreferences as any)[index][field] = value;
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

    const handleNext = () => {
        // Simple validation for step 0
        if (activeStep === 0) {
            const { selectedSemester, selectedCollegeStatus, ufGPA, ufID, ufEmail } = formData;
            if (!selectedSemester || !selectedCollegeStatus || !ufGPA || !ufID || !ufEmail) {
                alert('Please fill out all fields.');
                return;
            }
        }

        // Allow navigation to the next step
        setActiveStep((prev) => prev + 1);
    };


    const renderStepContent = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <Container sx={{ padding: 2 }}>
                        <Box
                            sx={{
                                padding: 3,
                                borderRadius: 2,
                                border: '1px solid #ccc',
                                maxWidth: '80%',
                                margin: 'auto',
                                marginTop: 5,
                                marginBottom: 5,
                                backgroundColor: '#f5f5f5',
                                width: '100%',
                                textAlign: 'start'
                            }}
                        >
                            {/* Semester Admitted Dropdown */}
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Semester Admitted</InputLabel>
                                <Select
                                    value={formData.selectedSemester}
                                    onChange={handleSemesterChange as any}
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
                                    onChange={handleCollegeStatusChange as any}
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

                        <Box
                            sx={{
                                padding: 3,
                                borderRadius: 2,
                                border: '1px solid #ccc',
                                maxWidth: '80%',
                                margin: 'auto',
                                marginTop: 5,
                                marginBottom: 5,
                                backgroundColor: '#f5f5f5',
                                width: '100%',
                                textAlign: 'start'
                            }}
                        >
                            <Typography variant="h6" gutterBottom>
                                Is your country of origin the USA?
                            </Typography>

                            <RadioGroup
                                row
                                aria-label="country-of-origin"
                                value={formData.isUSA}
                                onChange={handleRadioChange}
                            >
                                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                <FormControlLabel value="no" control={<Radio />} label="No" />
                            </RadioGroup>

                            {formData.isUSA === 'no' && (
                                <TextField
                                    label="SPEAK/TOEFL iBT Score"
                                    variant="outlined"
                                    fullWidth
                                    value={formData.score}
                                    onChange={handleScoreChange}
                                    sx={{ mt: 2 }}
                                />
                            )}
                        </Box>

                        <Box
                            sx={{
                                padding: 3,
                                borderRadius: 2,
                                border: '1px solid #ccc',
                                maxWidth: '80%',
                                margin: 'auto',
                                marginTop: 5,
                                marginBottom: 5,
                                backgroundColor: '#f5f5f5',
                                width: '100%',
                                textAlign: 'start'
                            }}
                        >
                            <Typography>
                                What are your reasearch areas and teaching interests?
                            </Typography>
                            <TextField
                                value={formData.responseOne}
                                onChange={handleResponseOneChange}
                                label=""
                                name="ufGpa"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                required
                                multiline
                                rows={4}
                            />

                            <Typography sx={{ marginTop: '20' }}>
                                List your travel plan during the applying semester. Type N/A is there is no plan
                            </Typography>
                            <TextField
                                value={formData.responseTwo}
                                onChange={handleResponseTwoChange}
                                label=""
                                name="ufGpa"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                required
                                multiline
                                rows={4}
                            />
                        </Box>
                    </Container>
                );
            case 1:
                return (
                    <Container sx={{ padding: 2 }}>
                        <Stack spacing={2} sx={{ width: '100%', marginTop: 5 }}>
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
                                    <Stack spacing={2} direction="row" sx={{ width: '100%' }}>
                                        {/* Course Dropdown */}
                                        <FormControl sx={{ minWidth: '40%' }} margin="normal">
                                            <InputLabel>Course</InputLabel>
                                            <Select
                                                value={preference.course}
                                                onChange={(event) => handlePreferenceChange(index, 'course', event.target.value)}
                                                label="Course"
                                                variant="outlined"
                                            >
                                                {courses.map((course: any) => (
                                                    <MenuItem key={course.prefix} value={course.prefix}>
                                                        {course.prefix}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        {/* Preference Level Slider */}
                                        <Typography>Preference Level: {preference.preference}</Typography>
                                        <Box display="flex" alignItems="center">
                                            {Array.from({ length: 5 }).map((_, starIndex) => (
                                                <StarTwoToneIcon
                                                    key={starIndex}
                                                    onMouseEnter={() => handlePreferenceChange(index, 'preference', starIndex + 1)}
                                                    onClick={() => handlePreferenceChange(index, 'preference', starIndex + 1)}
                                                    sx={{
                                                        color: starIndex < formData.coursePreferences[index].preference ? "rgba(255,127,50,1)" : "gray",
                                                        cursor: "pointer",
                                                        fontSize: "2rem",
                                                    }}
                                                />
                                            ))}
                                        </Box>

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
                                <Button variant="contained" onClick={handleAddPreference} sx={{ alignItems: 'center' }}>
                                    Add Course Preference
                                </Button>
                            )}
                        </Stack>
                    </Container>
                );
            case 2:
                return (
                    <Container maxWidth='sm'>
                        <Box sx={{ padding: 3, backgroundColor: '#f5f5f5', borderRadius: 2, boxShadow: 1, marginTop: 2 }}>
                            <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>Overview</Typography>

                            {/* Student Information */}
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>Student Information</Typography>
                            <Box sx={{ border: '1px solid #ccc', borderRadius: 1, padding: 2, backgroundColor: '#fff', mb: 3 }}>
                                <Typography><strong>Semester Admitted:</strong> {formData.selectedSemester}</Typography>
                                <Typography><strong>College Status:</strong> {formData.selectedCollegeStatus}</Typography>
                                <Typography><strong>UF GPA:</strong> {formData.ufGPA}</Typography>
                                <Typography><strong>UFID:</strong> {formData.ufID}</Typography>
                                <Typography><strong>UF Email:</strong> {formData.ufEmail}</Typography>

                                {/* Country of Origin */}
                                <Typography><strong>Country of Origin:</strong> {formData.isUSA === 'yes' ? 'USA' : 'Other'}</Typography>

                                {/* TOEFL/SPEAK Score, only shown if the country is not USA */}
                                {formData.isUSA === 'no' && (
                                    <Typography><strong>TOEFL/SPEAK Score:</strong> {formData.score}</Typography>
                                )}
                                <Button variant="outlined" color="primary" onClick={() => setActiveStep(0)} sx={{ mt: 1 }}>Edit</Button>
                            </Box>

                            {/* Student Responses */}
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>Student Responses</Typography>
                            <Box sx={{ border: '1px solid #ccc', borderRadius: 1, padding: 2, backgroundColor: '#fff', mb: 3 }}>
                                <Typography><strong>Research Plans:</strong> {formData.responseOne}</Typography>
                                <Typography><strong>Travel Plans:</strong> {formData.responseTwo}</Typography>
                                <Button variant="outlined" color="primary" onClick={() => setActiveStep(0)} sx={{ mt: 1 }}>Edit</Button>
                            </Box>

                            {/* Course Preferences */}
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 3, mb: 1 }}>Course Preferences</Typography>
                            <Box sx={{ border: '1px solid #ccc', borderRadius: 1, padding: 2, backgroundColor: '#fff', mb: 3 }}>
                                {formData.coursePreferences.map((preference, index) => (
                                    <Box key={index} sx={{ borderBottom: index < formData.coursePreferences.length - 1 ? '1px solid #ccc' : 'none' }}>
                                        <Typography><strong>Course:</strong> {preference.course}</Typography>
                                        <Typography><strong>Preference Level:</strong> {preference.preference}</Typography>
                                        <Typography><strong>Course Taken:</strong> {preference.taken ? 'Yes' : 'No'}</Typography>
                                        <Button variant="outlined" color="primary" onClick={() => setActiveStep(1)} sx={{ mt: 1, marginBottom: 1 }}>Edit</Button>
                                    </Box>
                                ))}
                            </Box>

                            {/* Final Notes */}
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 3 }}>Final Confirmation</Typography>
                            <Typography>Please review and confirm all the information before submission.</Typography>
                        </Box>
                    </Container>
                );
            default:
                return <Typography>Unknown step</Typography>;
        }
    };

    function saveForLaterClient(){
        saveForLater(formData)
    }

    function submitApplicationClient(){
        submitApplication(formData)
    }

    return (
        <Stack sx={{ width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
            <CustomizedSteppers activeStep={activeStep} />
            <Box sx={{ width: '100%' }}>
                {renderStepContent(activeStep)}
                <Stack direction="row" justifyContent="space-between" sx={{ width: '100%', pt: 2 }}>
                    <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={() => setActiveStep((prev) => prev - 1)}
                    >
                        Back
                    </Button>
                    <Button
                        color="inherit"
                        variant="outlined"
                        onClick={saveForLaterClient}
                    >
                        Save For Later
                    </Button>
                    <Button
                        onClick={() => handleNext()}
                        disabled={activeStep === steps.length - 1}
                    >
                        Next
                    </Button>
                    {activeStep === steps.length - 1 && (
                        <Button
                            onClick={submitApplicationClient}
                        >
                            Submit
                        </Button>
                    )}
                </Stack>
            </Box>
        </Stack>
    );
}
