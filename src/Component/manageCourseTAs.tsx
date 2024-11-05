import React, { useState } from 'react';
import {
    Box,
    Button,
    Typography,
    DialogContent,
    Dialog,
    DialogTitle,
    IconButton,
    TextField
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { assignTACourse, unassignTACourse } from '@/actions/manager';

const CourseTAs = ({ open, close, params, allTAs }) => {
    const tasByName = allTAs.map(item => item.studentName);
    const [tempTAs, setTempTAs] = useState(params.assignedTas);
    const [editMode, setEditMode] = useState(false);
    const [courseDetails, setCourseDetails] = useState(params);
    const [tempDetails, setTempDetails] = useState(params);
    const [newTA, setNewTAName] = useState("");
    const [filteredItems, setFilteredItems] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

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

    const handleFilteredItems = (value: any) => {
        if (value === '' || tasByName.includes(value)) {
            setFilteredItems([])
        }
        else {
            const matches = tasByName.filter((item: any) => item.toLowerCase().includes(value.toLowerCase()))
            setFilteredItems(matches)
        }
        setShowDropdown(filteredItems.length > 0);
    };

    const handleItemClick = (item: any) => {
        setNewTAName(item);
        setFilteredItems([]);
        setShowDropdown(false);
    }

    const handleType = (e) => {
        console.log(tasByName);
        setNewTAName(e.target.value);
        handleFilteredItems(e.target.value);
    }

    const handleAddTASubmit = () =>{
        if (!tasByName.includes(newTA)){
            alert('TA given does not exist, please check your spelling')
            return
        }
        else if(tempTAs.includes(newTA)){
            alert('TA is already assigned to course')
            return
        }
        assignTACourse(newTA, params.prefix);
        setTempTAs([...tempTAs, newTA])
        setEditMode(false);
        alert("TA Successfully Assigned to Course!")
    }

    const handleRemoveTA = (ta) => {
        unassignTACourse(ta, params.prefix);
        setTempTAs(tempTAs.filter(t => t !== ta));
        setEditMode(false);
        alert("TA Successfully Removed From Course!")
    };


    return (
        <Dialog open={open} onClose={close} fullWidth>
            <DialogTitle>
                {courseDetails.Course} Details
                <Button onClick={handleEditToggle} sx={{ marginLeft: 2 }}>
                    {editMode ? "Save" : "Edit"}
                </Button>
            </DialogTitle>

            <DialogContent>
                <Box style={{ textAlign: "center", width: "100%" }}>
                    <Box sx={{ backgroundColor: "rgba(255, 127, 50, 1)", borderTopRadius: "15px", padding: "20px" }}>
                        <Typography variant="h3">{courseDetails.Course} Details</Typography>
                    </Box>

                    {/* Assigned TAs Section */}
                    <Box sx={{ marginTop: 3 }}>
                        <Typography variant="h5">Assigned TAs</Typography>
                        { tempTAs.length > 0 ?
                            tempTAs.map((ta) => (
                                <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                                    <Typography sx={{ fontSize: "150%", padding: "10px", margin: "10px" }}>{ta}</Typography>
                                    <Button variant='contained' color='secondary' onClick={() => {handleRemoveTA(ta)}} sx={{fontSize: "80%", height: "75%", marginTop: "20px", verticalAlign: "middle"}}>
                                        Remove from Course
                                    </Button>
                                </Box>
                            ))
                        :
                            <Typography sx={{ fontSize: "150%", padding: "10px", margin: "10px" }}>None Assigned</Typography>
                        }
                        {!editMode && <Button onClick={handleEditToggle} variant='contained' color='secondary' endIcon={<AddCircleIcon />}>
                            Add a TA
                        </Button>}
                    </Box>

                    {/* Available TAs Section */}
                    {editMode && (
                        <Box sx={{ marginTop: 3, display: "flex", flexDirection: "row" }}>
                            {tasByName.length > 0 ? (
                                <>
                                <Box sx={{width: '100%'}}>
                                    <TextField
                                        name="newTA"
                                        label="Search name"
                                        variant="outlined"
                                        value={newTA}
                                        onChange={(e) => handleType(e)}
                                        sx={{ width: "90%", marginTop: "10px" }}
                                    />
                                    {showDropdown && (
                                        <Box
                                            style={{
                                                border: "1px solid #ccc",
                                                maxHeight: "150px",
                                                overflowY: "auto",
                                                position: "absolute",
                                                backgroundColor: "white",
                                                width: "50%",
                                                marginLeft: "20px"
                                            }}
                                        >
                                            {filteredItems.map((item, index) => (
                                                <div
                                                    key={index}
                                                    onClick={() => handleItemClick(item)}
                                                    style={{padding: "5px", cursor: "pointer",border: "1px solid #ccc" }}
                                                >
                                                    {item}
                                                </div>
                                            ))}
                                        </Box>
                                    )}
                                </Box>
                                <Button onClick={handleAddTASubmit} variant='contained' color='secondary' endIcon={<AddCircleIcon />} sx={{ height: "80%", margin: "5px", marginTop: "3.5%"}}>
                                    Add
                                </Button>
                                </>
                            ) : (
                                <Typography sx={{ fontSize: "150%", padding: "10px" }}>
                                    No Available TAs
                                </Typography>
                            )}
                        </Box>
                    )}
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default CourseTAs;
