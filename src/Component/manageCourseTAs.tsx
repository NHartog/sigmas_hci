import React, { useState } from 'react';
import {
    Box,
    Button,
    Typography,
    DialogContent,
    Dialog,
    DialogTitle,
    IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const CourseTAs = ({ open, close, params }) => {
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

    const handleAddTA = (ta) => {
        setTempDetails(prevDetails => ({
            ...prevDetails,
            Assigned_TAs: [...prevDetails.Assigned_TAs, ta],
            Available_TAs: prevDetails.Available_TAs.filter(t => t !== ta)
        }));
    };

    const handleRemoveTA = (ta) => {
        setTempDetails(prevDetails => ({
            ...prevDetails,
            Assigned_TAs: prevDetails.Assigned_TAs.filter(t => t !== ta),
            Available_TAs: [...prevDetails.Available_TAs, ta]
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

                    {/* Assigned TAs Section */}
                    <Box sx={{ marginTop: 3 }}>
                        <Typography variant="h5">Assigned TAs</Typography>
                        {/*{tempDetails.Assigned_TAs.length ? (*/}
                        {/*    tempDetails.Assigned_TAs.map(ta => (*/}
                        {/*        <Card sx={{ display: "flex", flexDirection: "row", alignItems: "center", padding: "10px", marginY: 1 }} key={ta}>*/}
                        {/*            <Typography sx={{ fontSize: "150%", flexGrow: 1 }}>{ta}</Typography>*/}
                        {/*            {editMode && (*/}
                        {/*                <IconButton onClick={() => handleRemoveTA(ta)} size="small">*/}
                        {/*                    <CloseIcon fontSize="small" />*/}
                        {/*                </IconButton>*/}
                        {/*            )}*/}
                        {/*        </Card>*/}
                        {/*    ))*/}
                        {/*) : (*/}
                            <Typography sx={{ fontSize: "150%", padding: "10px" }}>None Assigned</Typography>
                        {/*)}*/}
                    </Box>

                    {/* Available TAs Section */}
                    {editMode && (
                        <Box sx={{ marginTop: 3 }}>
                            <Typography variant="h5">Available TAs</Typography>
                            {/*{tempDetails.Available_TAs.length ? (*/}
                            {/*    tempDetails.Available_TAs.map(ta => (*/}
                            {/*        <Card sx={{ display: "flex", flexDirection: "row", alignItems: "center", padding: "10px", marginY: 1 }} key={ta}>*/}
                            {/*            <Typography sx={{ fontSize: "150%", flexGrow: 1 }}>{ta}</Typography>*/}
                            {/*            <Button onClick={() => handleAddTA(ta)} size="small" variant="contained" sx={{ marginLeft: 2 }}>*/}
                            {/*                Add*/}
                            {/*            </Button>*/}
                            {/*        </Card>*/}
                            {/*    ))*/}
                            {/*) : (*/}
                                <Typography sx={{ fontSize: "150%", padding: "10px" }}>No Available TAs</Typography>
                            {/*)}*/}
                        </Box>
                    )}
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default CourseTAs;
