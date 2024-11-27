import React, { useState } from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    DialogContent,
    Dialog,
    DialogTitle,
    Typography,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Stack,
    Divider
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';
import { updateStudent } from '@/actions/manager';

const StudentDetails = ({ open, onClose, params, prefs }: any) => {
    const [editMode, setEditMode] = useState(false);
    const [editParams, setEditParams] = useState({ ...params, oldName: params.studentName });

    // Toggle edit mode
    const handleToggleEditMode = () => {
        if(editMode){
            //New form of saving
            updateStudent(editParams)
            console.log(editParams)
            setEditParams({ ...editParams, oldName: editParams.studentName })
        }
        setEditMode(!editMode)
    };

    // Handle parameter change
    const handleChange = (field: any) => (event: any) => {
        setEditParams((prev: any) => ({
            ...prev,
            [field]: event.target.value,
        }));
    };

    // Save the changes and exit edit mode
    const handleSave = () => {
        // Call a function to save changes to the backend or update state
        // You could pass editParams to a parent component here if needed.

        //Not touching for now

        console.log(editParams)
        setEditMode(false);
    };

    const handleCancel =() => {
        setEditMode(false);
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogContent sx={{ p: 0 }}>
                <Box style={{ textAlign: "center" }}>
                    <Box
                        sx={{
                            padding: "20px",
                        }}
                    >
                        <Typography variant="h5">{editParams.studentName}</Typography>
                    </Box>

                    <Stack spacing={2} sx={{ p: 2 }} divider={<Divider orientation="horizontal" flexItem />}>

                        <Typography variant='h6'>Student Details</Typography>

                        {[["studentName", "Student Name"], ["collegeStatus", "College Status"], ["applicationStatus", "Application Status"]].map((fieldInfo, index) => (
                            <Stack key={index} direction='row' alignItems='center'>
                                <Typography variant='h6' sx={{ textAlign: "left", width: "50%" }}>
                                    {fieldInfo[1]}:
                                </Typography>
                                {editMode ? (
                                    <TextField
                                        value={editParams[fieldInfo[0]]}
                                        onChange={handleChange(fieldInfo[0])}
                                        sx={{ width: '50%' }}
                                        variant="outlined"
                                    />
                                ) : (
                                    <Typography sx={{ textAlign: "left", width: "50%", paddingY: 1 }}>
                                        {editParams[fieldInfo[0]]}
                                    </Typography>
                                )}
                            </Stack>
                        ))}

                        <Typography variant='h6'>Course Preferences</Typography>

                        {prefs.length > 0 ? (
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ textAlign: "center" }}><strong>Course</strong></TableCell>
                                        <TableCell style={{ textAlign: "center" }}><strong>Preference</strong></TableCell>
                                        <TableCell style={{ textAlign: "center" }}><strong>Assigneds</strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        prefs.map((course: any) => (
                                            <TableCell style={{ textAlign: "center" }}><strong>{course.prefix}</strong></TableCell>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        ) : (
                            <Typography variant="h6">No Courses given in their preferences</Typography>
                        )}
                    </Stack>
                </Box>
            </DialogContent>
            <Stack direction='row' spacing={2} sx={{ width: 1, p: 2 }} justifyContent='center' alignItems='center'>
                <Button onClick={handleToggleEditMode} variant='contained' color='secondary'>
                    {editMode ? "Save" : "Edit"}
                </Button>
                {editMode && (
                    <Button onClick={handleCancel} variant='contained' color='error'>
                        Cancel
                    </Button>
                )}
            </Stack>
        </Dialog>
    );
};

export default StudentDetails;
