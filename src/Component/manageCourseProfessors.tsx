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
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { assignProfessorCourse, unassignProfessorCourse } from '@/actions/manager';

const CourseProfessors = ({ open, close, params, profs, allProfs }: any) => {
    const profsByName = allProfs.map((item: any) => item.Professor);
    const [tempProfs, setTempProfs] = useState(profs); 
    const [editMode, setEditMode] = useState(false);
    const [courseDetails, setCourseDetails] = useState(params);
    const [tempDetails, setTempDetails] = useState(params);
    const [newProf, setNewProfName] = useState("");
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

    const handleChange = (field: any, value: any) => {
        setTempDetails((prevDetails: any) => ({ ...prevDetails, [field]: value }));
    };

    const handleAddProfessor = (professor: any) => {
        setTempDetails((prevDetails: any) => ({
            ...prevDetails,
            Assigned_Professors: [...prevDetails.Assigned_Professors, professor],
            Available_Professors: prevDetails.Available_Professors.filter((p: any) => p !== professor)
        }));
    };

    const handleRemoveProfessor = (professor: any) => {
        unassignProfessorCourse(professor, params.prefix);
        setTempProfs(tempProfs.filter((p: any) => p !== professor));
        console.log(tempProfs, "ADDING")
        setEditMode(false);
        alert("Professor Successfully Removed From Course!")
    };

    const handleFilteredItems = (value: any) => {
        if (value === '' || profsByName.includes(value)) {
            setFilteredItems([])
        }
        else {
            const matches = profsByName.filter((item: any) => item.toLowerCase().includes(value.toLowerCase()))
            setFilteredItems(matches)
        }
        setShowDropdown(filteredItems.length > 0);
    };

    const handleItemClick = (item: any) => {
        setNewProfName(item);
        setFilteredItems([]);
        setShowDropdown(false);
    }

    const handleType = (e: any) => {
        console.log(profsByName);
        setNewProfName(e.target.value);
        handleFilteredItems(e.target.value);
    }

    const handleAddProfSubmit = () =>{
        if (!profsByName.includes(newProf)){
            alert('Professor given does not exist, please check your spelling')
            return
        }
        else if(tempProfs.includes(newProf)){
            alert('Professor is already assigned to course')
            return
        }
        assignProfessorCourse(newProf, params.prefix);
        setTempProfs([...tempProfs, newProf])
        setEditMode(false);
        alert("Professor Successfully Assigned to Course!")
    }
    console.log("rendered")
    console.log(allProfs)
    return (
        <Dialog open={open} onClose={close} fullWidth>
            <DialogTitle>
                {courseDetails.Course} Details
                <Button onClick={handleEditToggle} sx={{ marginLeft: 2 }}>
                    {editMode ? "Save" : "Edit"}
                </Button>
            </DialogTitle>

            <DialogContent sx={{overflow: "visible", paddingLeft: "10%", paddingRight: "10%", paddingBottom: "40%"}}>
                <Box style={{ textAlign: "center", width: "100%" }}>
                    <Box sx={{ backgroundColor: "rgba(255, 127, 50, 1)", borderTopRadius: "15px", padding: "20px" }}>
                        <Typography variant="h3">{courseDetails.Course} Details</Typography>
                    </Box>

                    {/* Assigned Professors Section */}
                    <Box sx={{ marginTop: 3 }}>
                        <Typography variant="h5">Assigned Professors</Typography>
                        { tempProfs.length > 0 ?
                            tempProfs.map((prof: any) => (
                                <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                                    <Typography sx={{ fontSize: "150%", padding: "10px", margin: "10px" }}>{prof}</Typography>
                                    <Button variant='contained' color='secondary' onClick={() => {handleRemoveProfessor(prof)}} sx={{fontSize: "80%", height: "75%", marginTop: "20px", verticalAlign: "middle"}}>
                                        Remove from Course
                                    </Button>
                                </Box>
                            ))
                        :
                            <Typography sx={{ fontSize: "150%", padding: "10px", margin: "10px" }}>None Assigned</Typography>
                        }
                        {!editMode && <Button onClick={handleEditToggle} variant='contained' color='secondary' endIcon={<AddCircleIcon />}>
                            Add a Professor
                        </Button>}
                    </Box>

                    {/* Available Professors Section */}
                    {editMode && (
                        <Box sx={{ marginTop: 3, display: "flex", flexDirection: "row" }}>
                            {allProfs.length > 0 ? (
                                <>
                                <Box sx={{width: '100%'}}>
                                    <TextField
                                        name="newProf"
                                        label="Search name"
                                        variant="outlined"
                                        value={newProf}
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
                                <Button onClick={handleAddProfSubmit} variant='contained' color='secondary' endIcon={<AddCircleIcon />} sx={{ height: "80%", margin: "5px", marginTop: "3.5%"}}>
                                    Add
                                </Button>
                                </>
                            ) : (
                                <Typography sx={{ fontSize: "150%", padding: "10px" }}>
                                    No Available Professors
                                </Typography>
                            )}
                        </Box>
                    )}
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default CourseProfessors;
