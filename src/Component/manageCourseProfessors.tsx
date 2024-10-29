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

const CourseProfessors = ({ open, close, params }) => {
    const [editMode, setEditMode] = useState(false);
    const [courseDetails, setCourseDetails] = useState(params);
    const [tempDetails, setTempDetails] = useState(params);

    const handleEditToggle = () => {
        if (editMode) {
            // Save changes
            setCourseDetails(tempDetails);
        }
        setEditMode(!editMode);
    };

    const handleCancel = () => {
        // Reset to original details
        setTempDetails(courseDetails);
        setEditMode(false);
    };

    const handleChange = (field, value) => {
        setTempDetails(prevDetails => ({ ...prevDetails, [field]: value }));
    };

    const handleAddProfessor = (professor) => {
        setTempDetails(prevDetails => ({
            ...prevDetails,
            Assigned_Professors: [...prevDetails.Assigned_Professors, professor],
            Available_Professors: prevDetails.Available_Professors.filter(p => p !== professor)
        }));
    };

    const handleRemoveProfessor = (professor) => {
        setTempDetails(prevDetails => ({
            ...prevDetails,
            Assigned_Professors: prevDetails.Assigned_Professors.filter(p => p !== professor),
            Available_Professors: [...prevDetails.Available_Professors, professor]
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

                    {/* Assigned Professors Section */}
                    <Box sx={{ marginTop: 3 }}>
                        <Typography variant="h5">Assigned Professors</Typography>
                        {/*{tempDetails.Assigned_Professors.length ? (*/}
                        {/*    tempDetails.Assigned_Professors.map(professor => (*/}
                        {/*        <Card sx={{ display: "flex", flexDirection: "row", alignItems: "center", padding: "10px", marginY: 1 }} key={professor}>*/}
                        {/*            <Typography sx={{ fontSize: "150%", flexGrow: 1 }}>{professor}</Typography>*/}
                        {/*            {editMode && (*/}
                        {/*                <IconButton onClick={() => handleRemoveProfessor(professor)} size="small">*/}
                        {/*                    <CloseIcon fontSize="small" />*/}
                        {/*                </IconButton>*/}
                        {/*            )}*/}
                        {/*        </Card>*/}
                        {/*    ))*/}
                        {/*) : (*/}
                            <Typography sx={{ fontSize: "150%", padding: "10px" }}>None Assigned</Typography>
                        {/*)}*/}
                    </Box>

                    {/* Available Professors Section */}
                    {editMode && (
                        <Box sx={{ marginTop: 3 }}>
                            <Typography variant="h5">Available Professors</Typography>
                            {/*{tempDetails.Available_Professors.length ? (*/}
                            {/*    tempDetails.Available_Professors.map(professor => (*/}
                            {/*        <Card sx={{ display: "flex", flexDirection: "row", alignItems: "center", padding: "10px", marginY: 1 }} key={professor}>*/}
                            {/*            <Typography sx={{ fontSize: "150%", flexGrow: 1 }}>{professor}</Typography>*/}
                            {/*            <Button onClick={() => handleAddProfessor(professor)} size="small" variant="contained" sx={{ marginLeft: 2 }}>*/}
                            {/*                Add*/}
                            {/*            </Button>*/}
                            {/*        </Card>*/}
                            {/*    ))*/}
                            {/*) : (*/}
                                <Typography sx={{ fontSize: "150%", padding: "10px" }}>No Available Professors</Typography>
                            {/*)}*/}
                        </Box>
                    )}
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default CourseProfessors;
