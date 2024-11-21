"use client"
import React, { useState } from 'react';
import {
    Box,
    Button,
    Card,
    TextField,
    Typography,
    DialogContent,
    Dialog,
    DialogTitle,
    IconButton,
    Autocomplete,
    Stack,
    Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { updateCourse } from '@/actions/manager';

const CourseDetails = ({ open, close, params }: { open: any, close: any, params: any }) => {
    const [editMode, setEditMode] = useState(false);
    const [courseDetails, setCourseDetails] = useState(params);
    const [tempDetails, setTempDetails] = useState({...params, oldPrefix: params.prefix});
    const numericFields = ['currentEnrollment', 'maxEnrollment', 'numTaHours', 'sections'];
    //I know this is lazy but rather than make a function to translate each field this just feels easier
    const titleFormat = { prefix: 'Prefix', title: 'Title', professors: 'Professors', assignedTas: 'Assigned TAs', currentEnrollment: 'Current Enrollment', maxEnrollment: 'Max Enrollment', numTaHours: 'TA Hours', sections: 'Sections' };

    const handleEditToggle = () => {
        if (editMode) {
            // Save changes
            setCourseDetails(tempDetails);
            //Push new details to database
            updateCourse(tempDetails);
            setTempDetails(() => ({...tempDetails, oldPrefix: tempDetails.prefix}))
        }
        setEditMode(!editMode);
    };

    const handleCancel = () => {
        // Reset to original details
        setTempDetails(courseDetails);
        setEditMode(false);
    };

    const handleChange = (field: any, value: any) => {
        if (numericFields.includes(field)) {
            value = Number(value);
        }
        setTempDetails((prevDetails: any) => ({ ...prevDetails, [field]: value }));
    };

    const handleRemoveItem = (field: any, item: any) => {
        setTempDetails((prevDetails: any) => ({
            ...prevDetails,
            [field]: prevDetails[field].filter((i: any) => i !== item)
        }));
    };

    return (
        <Dialog open={open} onClose={close} fullWidth>
            <DialogContent sx={{ p: 0 }}>
                <Box style={{ textAlign: "center", width: "100%" }}>
                    <Box sx={{ padding: "20px" }}>
                        <Typography variant="h5">{courseDetails.Course} Details</Typography>
                    </Box>

                    <Stack sx={{ p: 2 }} spacing={2} divider={<Divider orientation="horizontal" flexItem />}>
                        {['prefix', 'title', 'currentEnrollment', 'maxEnrollment', 'sections'].map(field => (
                            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }} key={field}>
                                <Typography variant='h6' sx={{ textAlign: "left", width: "50%" }}>
                                    {(titleFormat as any)[field]}:
                                </Typography>
                                {editMode ? (
                                    <TextField
                                        value={tempDetails[field]}
                                        onChange={e => handleChange(field, e.target.value)}
                                        sx={{ width: "50%" }}
                                    />
                                ) : (
                                    <Typography>
                                        {courseDetails[field]}
                                    </Typography>
                                )}
                            </Box>
                        ))}

                        {['professors', 'assignedTas'].map(field => (
                            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }} key={field}>
                                <Typography variant='h6' sx={{ textAlign: "left", width: "50%" }}>
                                    {(titleFormat as any)[field]}:
                                </Typography>
                                <Box sx={{ width: "50%", display: "flex", flexDirection: "column" }}>
                                    {
                                        !editMode
                                            ?
                                            tempDetails[field].map((item: string) => (
                                                <Box key={item} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                    <Typography>{item}</Typography>
                                                </Box>
                                            ))
                                            :
                                            <Autocomplete
                                                multiple
                                                id="tags-standard"
                                                options={tempDetails[field]}
                                                fullWidth
                                                getOptionLabel={(option: any) => option}
                                                defaultValue={tempDetails[field]}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        variant="standard"
                                                        label="Multiple values"
                                                    />
                                                )}
                                            />
                                    }
                                    {!tempDetails[field].length && (
                                        <Typography sx={{ fontSize: "150%" }}>None Assigned</Typography>
                                    )}
                                </Box>
                            </Box>
                        ))}
                    </Stack>

                </Box>
                <Stack justifyContent='center' alignItems='center' direction='row' spacing={2} sx={{ width: 1, p: 2 }}>
                    <Button onClick={handleEditToggle} variant='contained' color='secondary'>
                        {editMode ? "Save" : "Edit"}
                    </Button>
                    {editMode && (
                        <Button onClick={handleCancel} variant='contained' color='error'>
                            Cancel
                        </Button>
                    )}
                </Stack>
            </DialogContent>
        </Dialog>
    );
};

export default CourseDetails;
