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
    IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { updateCourse } from '@/actions/manager';

const CourseDetails = ({ open, close, params }) => {
    const [editMode, setEditMode] = useState(false);
    const [courseDetails, setCourseDetails] = useState(params);
    const [tempDetails, setTempDetails] = useState(params);
    const numericFields = ['currentEnrollment', 'maxEnrollment', 'numTaHours', 'sections'];
    //I know this is lazy but rather than make a function to translate each field this just feels easier
    const titleFormat = {prefix: 'Prefix', title: 'Title', professors: 'Professors', assignedTas: 'Assigned TAs', currentEnrollment: 'Current Enrollment', maxEnrollment: 'Max Enrollment', numTaHours: 'TA Hours', sections: 'Sections'};

    const handleEditToggle = () => {
        if (editMode) {
            // Save changes
            setCourseDetails(tempDetails);
            //Push new details to database
            updateCourse(tempDetails);
        }
        setEditMode(!editMode);
    };

    const handleCancel = () => {
        // Reset to original details
        setTempDetails(courseDetails);
        setEditMode(false);
    };

    const handleChange = (field, value) => {
        if(numericFields.includes(field)){
            value = Number(value);
        }
        setTempDetails(prevDetails => ({ ...prevDetails, [field]: value }));
    };

    const handleRemoveItem = (field, item) => {
        setTempDetails(prevDetails => ({
            ...prevDetails,
            [field]: prevDetails[field].filter(i => i !== item)
        }));
    };

    return (
        <Dialog open={open} onClose={close} fullWidth>
            <DialogTitle>
                {courseDetails.Course} Details
                <Button onClick={handleEditToggle} sx={{ marginLeft: 2 }}>
                    {editMode ? "Save" : "Edit"}
                </Button>
                {editMode && (
                    <Button onClick={handleCancel} sx={{ marginLeft: 1 }}>
                        Cancel
                    </Button>
                )}
            </DialogTitle>

            <DialogContent>
                <Box style={{ textAlign: "center", width: "100%" }}>
                    <Box sx={{ backgroundColor: "rgba(255, 127, 50, 1)", borderTopRadius: "15px", padding: "20px" }}>
                        <Typography variant="h3">{courseDetails.Course} Details</Typography>
                    </Box>

                    {['prefix', 'title', 'currentEnrollment', 'maxEnrollment', 'sections'].map(field => (
                        <Card sx={{ display: "flex", flexDirection: "row", alignItems: "center" }} key={field}>
                            <Typography sx={{ textAlign: "left", fontSize: "150%", padding: "10px", width: "50%" }}>
                                {titleFormat[field]}:
                            </Typography>
                            {editMode ? (
                                <TextField
                                    value={tempDetails[field]}
                                    onChange={e => handleChange(field, e.target.value)}
                                    sx={{ fontSize: "150%", padding: "10px", width: "50%" }}
                                />
                            ) : (
                                <Typography sx={{ textAlign: "right", fontSize: "150%", padding: "10px", width: "50%" }}>
                                    {courseDetails[field]}
                                </Typography>
                            )}
                        </Card>
                    ))}

                    {['professors', 'assignedTas'].map(field => (
                        <Card sx={{ display: "flex", flexDirection: "row", alignItems: "center" }} key={field}>
                            <Typography sx={{ textAlign: "left", fontSize: "150%", padding: "10px", width: "50%" }}>
                                {titleFormat[field]}:
                            </Typography>
                            <Box sx={{ padding: "10px", width: "50%", display: "flex", flexDirection: "column" }}>
                                {tempDetails[field].map(item => (
                                    <Box key={item} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                        <Typography sx={{ fontSize: "150%" }}>{item}</Typography>
                                        {editMode && (
                                            <IconButton onClick={() => handleRemoveItem(field, item)} size="small">
                                                <CloseIcon fontSize="small" />
                                            </IconButton>
                                        )}
                                    </Box>
                                ))}
                                {!tempDetails[field].length && (
                                    <Typography sx={{ fontSize: "150%" }}>None Assigned</Typography>
                                )}
                            </Box>
                        </Card>
                    ))}
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default CourseDetails;
