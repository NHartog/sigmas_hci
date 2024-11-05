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

const ProfessorCourses = ({ open, close, params, courses, allCourses }) => {
    const coursesByPrefix = allCourses.map(item => item.prefix);
    const [tempCourses, setTempCourses] = useState(courses); 
    const [editMode, setEditMode] = useState(false);
    const [courseDetails, setCourseDetails] = useState(params);
    const [tempDetails, setTempDetails] = useState(params);
    const [newCourse, setNewCourseName] = useState("");
    const [filteredItems, setFilteredItems] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    const handleEditToggle = () => {
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

    const handleRemoveCourse = (course) => {
        unassignProfessorCourse(params.Professor, course);
        setTempCourses(tempCourses.filter(c => c !== course));
        console.log(tempCourses, "ADDING")
        setEditMode(false);
        alert("Course Successfully Unassigned From Professor!")
    };

    const handleFilteredItems = (value: any) => {
        if (value === '' || coursesByPrefix.includes(value)) {
            setFilteredItems([])
        }
        else {
            const matches = coursesByPrefix.filter((item: any) => item.toLowerCase().includes(value.toLowerCase()))
            setFilteredItems(matches)
        }
        setShowDropdown(filteredItems.length > 0);
    };

    const handleItemClick = (item: any) => {
        setNewCourseName(item);
        setFilteredItems([]);
        setShowDropdown(false);
    }

    const handleType = (e) => {
        console.log(coursesByPrefix);
        setNewCourseName(e.target.value);
        handleFilteredItems(e.target.value);
    }

    const handleAddCourseSubmit = () =>{
        if (!coursesByPrefix.includes(newCourse)){
            alert('Course given does not exist, please check your spelling')
            return
        }
        else if(tempCourses.includes(newCourse)){
            alert('Course is already assigned to professor')
            return
        }
        assignProfessorCourse(params.Professor, newCourse);
        setTempCourses([...tempCourses, newCourse])
        setEditMode(false);
        alert("Course Successfully Assigned to Professor!")
    }
    console.log("rendered")
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
                        <Typography variant="h3">{params.Professor} Courses</Typography>
                    </Box>

                    {/* Assigned Courses Section */}
                    <Box sx={{ marginTop: 3 }}>
                        <Typography variant="h5">Assigned Courses</Typography>
                        { tempCourses.length > 0 ?
                            tempCourses.map((course) => (
                                <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                                    <Typography sx={{ fontSize: "150%", padding: "10px", margin: "10px" }}>{course}</Typography>
                                    <Button variant='contained' color='secondary' onClick={() => {handleRemoveCourse(course)}} sx={{fontSize: "80%", height: "75%", marginTop: "20px", verticalAlign: "middle"}}>
                                        Remove Course
                                    </Button>
                                </Box>
                            ))
                        :
                            <Typography sx={{ fontSize: "150%", padding: "10px", margin: "10px" }}>None Assigned</Typography>
                        }
                        {!editMode && <Button onClick={handleEditToggle} variant='contained' color='secondary' endIcon={<AddCircleIcon />}>
                            Add a Course
                        </Button>}
                    </Box>

                    {/* Available Courses Section */}
                    {editMode && (
                        <Box sx={{ marginTop: 3, display: "flex", flexDirection: "row" }}>
                            {allCourses.length > 0 ? (
                                <>
                                <Box sx={{width: '100%'}}>
                                    <TextField
                                        name="newCourse"
                                        label="Search name"
                                        variant="outlined"
                                        value={newCourse}
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
                                <Button onClick={handleAddCourseSubmit} variant='contained' color='secondary' endIcon={<AddCircleIcon />} sx={{ height: "80%", margin: "5px", marginTop: "3.5%"}}>
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

export default ProfessorCourses;