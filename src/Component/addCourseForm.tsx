"use client";

import React, { useState } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Stack,
    DialogContent,
    Dialog,
    Paper,
    Divider,
} from '@mui/material';
import { postCourse } from '@/actions/manager';

const AddCourseForm = ({ open, onClose }: { open: any, onClose: any }) => {


    const [formData, setFormData] = useState({
        prefix: '',
        title: '',
        numTaHours: '',
        currentEnrollment: '',
        maxEnrollment: '',
        assignedTAs: [],
        assignedProfessors: [],
        sections: '',
    });


    const handleFormData = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,  // Dynamically update based on input name
        }));
    };

    const handleSubmit = async (e: any) => {
        console.log("submited")
        console.log(e)
        e.preventDefault();
        console.log(formData);
        // Example: You could send formData to a backend here
        await postCourse(formData);
        onClose();
    };

    function getInput(label: string, textFieldName: string) {
        return (
            <Stack direction="row" justifyContent='space-between' alignItems='center' spacing={5}>
                <Box>
                    <Typography noWrap variant='h6' sx={{ p: 1 }}>
                        {label}:
                    </Typography>
                </Box>
                <TextField
                    name={textFieldName}
                    label={label}
                    variant="outlined"
                    value={(formData as any)[textFieldName]}
                    onChange={(e) => handleFormData(e)}
                />
            </Stack>
        )
    }

    console.log("rendered")
    return (
        <Dialog open={open} onClose={onClose} scroll="paper">
            <DialogContent sx={{ p: 0, width: 'max-content' }}>
                <Box style={{ textAlign: "center", gridTemplateColumns: '1fr 1fr' }}>
                    <Box sx={{ padding: "20px" }}>
                        <Typography noWrap variant="h5">
                            Add Course
                        </Typography>
                    </Box>
                </Box>
                <form onSubmit={handleSubmit}>
                    <Stack sx={{ p: 1 }} spacing={2} divider={<Divider orientation="horizontal" flexItem />}>

                        {getInput('Course Code', 'prefix')}
                        {getInput('Full Title', 'title')}
                        {getInput('Number of TA Hours', 'numTaHours')}
                        {getInput('Current Enrollment', 'currentEnrollment')}
                        {getInput('Max Enrollment', 'maxEnrollment')}
                        {getInput('Number of Sections', 'sections')}
                    </Stack>
                    <Box sx={{ textAlign: "center", padding: "20px" }}>
                        <Button type="submit" variant='contained' color='secondary' >
                            Submit
                        </Button>
                    </Box>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default AddCourseForm;
