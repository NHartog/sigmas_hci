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

const AddProfessorForm = ({open, onClose}) => {

    const fakeCourses = ['CAP5100', 'CNT5106C', 'CAP5900', 'CAD3020', 'AST2000']

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        department: '',
        course: ''
      });

    const [filteredItems, setFilteredItems] = useState([])
    
    const handleFilteredItems = (value) => {
        if(value === '' || fakeCourses.includes(value)){
            setFilteredItems([])
        }
        else{
            const matches = fakeCourses.filter(item => item.toLowerCase().includes(value.toLowerCase()))
            console.log(matches, "     ", value)
            setFilteredItems(matches)
        }
    };

    const handleFormData = (e) => {
        
        const { name, value } = e.target;
        setFormData((prevData) => ({
        ...prevData,
        [name]: value,  // Dynamically update based on input name
        }));

        if(name === 'course'){
            handleFilteredItems(value)
        }
        
    };

    const handleItemClick = (item) => {
        setFormData((prevData) => ({
            ...prevData,
            ['course']: item
            }));
            setFilteredItems([]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);  // Log or send data to an API
        // Example: You could send formData to a backend here
        onClose();
      };
      
    return(
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="max" scroll="paper">
        <DialogTitle>Add Professor</DialogTitle>
        <DialogContent>
            <Box style={{ padding: "20px", textAlign: "center", gridTemplateColumns: '1fr 1fr'}}>
                <Box sx={{backgroundColor: "rgba(255, 127, 50, 1)",
                        borderTopLeftRadius: "15px", borderTopRightRadius: "15px",
                        padding: "20px"
                    }}>
                    <Typography variant="h3">
                        Add Professor
                    </Typography>
                </Box>
            </Box>
            <form onSubmit={handleSubmit}>
            <Box sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                <Typography sx={{textAlign: "right", fontSize: "150%", width: "50%"}}>
                    Name:
                </Typography>
                <Typography sx={{textAlign: "left", marginLeft: "10%", fontSize: "150%", width: "50%"}}>
                    <TextField
                        name="name"
                        label="Name"
                        variant="outlined"
                        value={formData.name}
                        onChange={(e) => handleFormData(e)}
                        sx={{ width: "90%", marginTop: "10px" }}
                    />
                </Typography>
            </Box>
            <Box sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                <Typography sx={{textAlign: "right", fontSize: "150%", width: "50%"}}>
                    Email:
                </Typography>
                <Typography sx={{textAlign: "left", marginLeft: "10%", fontSize: "150%", width: "50%"}}>
                    <TextField
                        name="email"
                        label="Email"
                        variant="outlined"
                        value={formData.email}
                        onChange={(e) => handleFormData(e)}
                        sx={{ width: "90%", marginTop: "10px" }}
                    />
                </Typography>
            </Box>
            <Box sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                <Typography sx={{textAlign: "right", fontSize: "150%", width: "50%"}}>
                    Department:
                </Typography>
                <Typography sx={{textAlign: "left", marginLeft: "10%", fontSize: "150%", width: "50%"}}>
                    <TextField
                        name="department"
                        label="Department"
                        variant="outlined"
                        value={formData.department}
                        onChange={(e) => handleFormData(e)}
                        sx={{ width: "90%", marginTop: "10px" }}
                    />
                </Typography>
            </Box>
            <Box sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                <Typography sx={{textAlign: "right", fontSize: "150%", width: "50%"}}>
                    Course:
                    <Typography variant="subtitle1">(Leave blank if not assigning)</Typography>
                </Typography>
                <Typography sx={{textAlign: "left", marginLeft: "10%", fontSize: "150%", width: "50%"}}>
                    <TextField
                        name="course"
                        label="Course"
                        variant="outlined"
                        value={formData.course}
                        onChange={(e) => handleFormData(e)}
                        sx={{ width: "90%", marginTop: "10px" }}
                    />
                    {filteredItems.length > 0 && (
                        <Paper style={{ position: 'absolute', zIndex: 1, width: '100%' }}>
                        <List>
                            {filteredItems.map((item, index) => (
                            <ListItem button key={index} onClick={() => handleItemClick(item)}>
                                <ListItemText primary={item} />
                            </ListItem>
                            ))}
                        </List>
                        </Paper>
                    )}
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

export default AddProfessorForm;