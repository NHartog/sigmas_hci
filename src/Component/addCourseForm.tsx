"use client";

import React, { useState } from 'react';
import {
    Box,
    Button,
    ButtonGroup,
    Card,
    List,
    ListItem,
    ListItemText,
    TextField,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    Stack,
    DialogContent, Dialog, DialogTitle
} from '@mui/material';
import Link from "next/link";
import { postCourse } from '@/actions/manager';

const AddCourseForm = ({open, onClose}) => {

    let seats: string = '';
    let enrolled: string = '';

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


    const handleFormData = (e) => {
            const { name, value } = e.target;
            setFormData((prevData) => ({
            ...prevData,
            [name]: value,  // Dynamically update based on input name
            }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);  // Log or send data to an API
        // Example: You could send formData to a backend here
        postCourse(formData);
        onClose();
      };
      
    return(
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="max" scroll="paper">
        <DialogTitle>Add Course</DialogTitle>
        <DialogContent>
            <Box style={{ padding: "20px", textAlign: "center", gridTemplateColumns: '1fr 1fr'}}>
                <Box sx={{backgroundColor: "rgba(255, 127, 50, 1)",
                        borderTopLeftRadius: "15px", borderTopRightRadius: "15px",
                        padding: "20px"
                    }}>
                    <Typography variant="h3">
                        Add Course
                    </Typography>
                </Box>
            </Box>
            <form onSubmit={handleSubmit}>
            <Box sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                <Typography sx={{textAlign: "right", fontSize: "150%", width: "50%"}}>
                    Course Code:
                </Typography>
                <Typography sx={{textAlign: "left", marginLeft: "10%", fontSize: "150%", width: "50%"}}>
                    <TextField
                        name="prefix"
                        label="Course Code"
                        variant="outlined"
                        value={formData.prefix}
                        onChange={(e) => handleFormData(e)}
                        sx={{ width: "90%", marginTop: "10px" }}
                    />
                </Typography>
            </Box>
            <Box sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                <Typography sx={{textAlign: "right", fontSize: "150%", width: "50%"}}>
                    Full Title:
                </Typography>
                <Typography sx={{textAlign: "left", marginLeft: "10%", fontSize: "150%", width: "50%"}}>
                    <TextField
                        name="title"
                        label="Full Title"
                        variant="outlined"
                        value={formData.title}
                        onChange={(e) => handleFormData(e)}
                        sx={{ width: "90%", marginTop: "10px" }}
                    />
                </Typography>
            </Box>
            <Box sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                <Typography sx={{textAlign: "right", fontSize: "150%", width: "50%"}}>
                    Number of TA Hours:
                </Typography>
                <Typography sx={{textAlign: "left", marginLeft: "10%", fontSize: "150%", width: "50%"}}>
                    <TextField
                        name="numTaHours"
                        label="Number of TA Hours"
                        variant="outlined"
                        value={formData.numTaHours}
                        onChange={(e) => handleFormData(e)}
                        sx={{ width: "90%", marginTop: "10px" }}
                    />
                </Typography>
            </Box>
            <Box sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                <Typography sx={{textAlign: "right", fontSize: "150%", width: "50%"}}>
                    Current Enrollment:
                </Typography>
                <Typography sx={{textAlign: "left", marginLeft: "10%", fontSize: "150%", width: "50%"}}>
                    <TextField
                        name="currentEnrollment"
                        label="Current Enrollment"
                        variant="outlined"
                        value={formData.currentEnrollment}
                        onChange={(e) => handleFormData(e)}
                        sx={{ width: "90%", marginTop: "10px" }}
                    />
                </Typography>
            </Box>
            <Box sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                <Typography sx={{textAlign: "right", fontSize: "150%", width: "50%"}}>
                    Max Enrollment:
                </Typography>
                <Typography sx={{textAlign: "left", marginLeft: "10%", fontSize: "150%", width: "50%"}}>
                    <TextField
                        name="maxEnrollment"
                        label="Max Enrollment"
                        variant="outlined"
                        value={formData.maxEnrollment}
                        onChange={(e) => handleFormData(e)}
                        sx={{ width: "90%", marginTop: "10px" }}
                    />
                </Typography>
            </Box>
            <Box sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                <Typography sx={{textAlign: "right", fontSize: "150%", width: "50%"}}>
                    Number of Sections:
                </Typography>
                <Typography sx={{textAlign: "left", marginLeft: "10%", fontSize: "150%", width: "50%"}}>
                    <TextField
                        name="sections"
                        label="Sections"
                        variant="outlined"
                        value={formData.sections}
                        onChange={(e) => handleFormData(e)}
                        sx={{ width: "90%", marginTop: "10px" }}
                    />
                </Typography>
            </Box>
            <Box sx={{textAlign: "center", paddingTop: "20px"}}>
                <Button type="submit" sx={{border: "3px solid black", textAlign: "center", width: "30%", height: "80%", color: "white", backgroundColor: "rgba(255, 127, 50, 0.8)", '&:hover': {backgroundColor: "rgba(255, 127, 50, 1)"}}} >
                     Submit
                </Button>
            </Box>
            </form>
        </DialogContent>
    </Dialog>
      )
}

export default AddCourseForm;