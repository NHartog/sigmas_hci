"use client";

import React, { useState } from 'react';
import {
    Box,
    Button,
    List,
    ListItem,
    ListItemText,
    TextField,
    Typography,
    Paper,
    DialogContent, Dialog, DialogTitle,
    Stack,
    Divider
} from '@mui/material';
import { postProf } from '@/actions/manager';

const AddProfessorForm = ({ open, onClose, all_Courses }: any) => {

    const allPrefixes = all_Courses.map((obj: any) => obj.Prefix);
    console.log(allPrefixes)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        department: '',
        username: '',
        password: '',
    });

    const [filteredItems, setFilteredItems] = useState([])

    const handleFilteredItems = (value: any) => {
        if (value === '' || allPrefixes.includes(value)) {
            setFilteredItems([])
        }
        else {
            const matches = allPrefixes.filter((item: any) => item.toLowerCase().includes(value.toLowerCase()))
            console.log(matches, "     ", value)
            setFilteredItems(matches)
        }
    };

    const handleFormData = (e: any) => {

        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,  // Dynamically update based on input name
        }));

        if (name === 'course') {
            handleFilteredItems(value)
        }

    };

    const handleItemClick = (item: any) => {
        setFormData((prevData) => ({
            ...prevData,
            ['course']: item
        }));
        setFilteredItems([]);
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log(formData);
        const sentData = { ...formData};
        postProf(sentData);
        onClose();
    };

    function getInput(label: string, name: string) {
        return (
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Typography sx={{ textAlign: "right", fontSize: "150%", width: "50%" }}>
                    {label}:
                </Typography>
                <Typography sx={{ textAlign: "left", marginLeft: "10%", fontSize: "150%", width: "50%" }}>
                    <TextField
                        name={name}
                        label={label}
                        variant="outlined"
                        value={(formData as any)[name]}
                        onChange={(e) => handleFormData(e)}
                        sx={{ width: "90%", marginTop: "10px" }}
                    />
                </Typography>
            </Box>
        )
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth scroll="paper">
            <DialogContent sx={{ p: 0 }}>
                <Box style={{ textAlign: "center", gridTemplateColumns: '1fr 1fr' }}>
                    <Box sx={{ padding: "20px" }}>
                        <Typography variant="h5">
                            Add Professor
                        </Typography>
                    </Box>
                </Box>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2} sx={{ p: 2 }} divider={<Divider orientation="horizontal" flexItem />}>
                        {getInput('Name', 'name')}
                        {getInput('Email', 'email')}
                        {getInput('Department', 'department')}
                        {getInput('Username', 'username')}
                        {getInput('Password', 'password')}
                    </Stack>
                    <Box sx={{ textAlign: "center", padding: "20px" }}>
                        <Button type="submit" variant='contained' color='secondary'>
                            Submit
                        </Button>
                    </Box>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default AddProfessorForm;
