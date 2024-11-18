import React, { useState } from 'react';
import {
    Autocomplete,
    Box,
    Button,
    Card,
    TextField,
    Typography,
    DialogContent,
    Dialog,
    DialogTitle,
    Divider,
    IconButton,
    Stack
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { assignProfessorCourse, unassignProfessorCourse } from '@/actions/manager';

const ProfessorCourses = ({ open, close, params, courses, allCourses }: any) => {
    const [tempCourses, setTempCourses] = useState(courses); 
    let coursesByPrefix = allCourses.map((item: any) => item.prefix).filter((item: any) => !tempCourses.includes(item));
    const [editMode, setEditMode] = useState(false);
    const [courseDetails, setCourseDetails] = useState(params);
    const [newCourse, setNewCourseName] = useState("");
    const [filteredItems, setFilteredItems] = useState(coursesByPrefix);

    const handleEditToggle = () => {
        setEditMode(!editMode);
    };

    const handleRemoveCourse = (course: any) => {
        unassignProfessorCourse(params.Professor, course);
        setTempCourses(tempCourses.filter((c: any) => c !== course));
        console.log(tempCourses, "ADDING")
        setEditMode(false);
        coursesByPrefix = allCourses.map((item: any) => item.prefix).filter((item: any) => !tempCourses.includes(item));
        handleFilteredItems("");
        alert("Course Successfully Unassigned From Professor!")
    };

    const handleFilteredItems = (value: string) => {
        if (coursesByPrefix.includes(value)) {
            setFilteredItems([])
        }
        else {
            const matches = coursesByPrefix.filter((item: any) => item.toLowerCase().includes(value.toLowerCase()))
            setFilteredItems(matches)
        }
    };


    const handleChange = (newValue: string | null) => {
        setNewCourseName(newValue !== null ? newValue : "");
        handleFilteredItems(newValue !== null ? newValue : "");
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
        coursesByPrefix = allCourses.map((item: any) => item.prefix).filter((item: any) => !tempCourses.includes(item));
        handleFilteredItems("");
        alert("Course Successfully Assigned to Professor!")
    }
    console.log("rendered")
    return (
        <Dialog open={open} onClose={close} fullWidth>
            <DialogContent sx={{ p: 0 }}>
                <Box style={{ textAlign: "center", width: "100%" }}>
                    <Box sx={{ padding: "20px" }}>
                        <Typography variant="h5">Professor's Courses</Typography>
                    </Box>

                    {/* Assigned Courses Section */}
                    <Stack sx={{ p: 2 }} spacing={2} divider={<Divider orientation="horizontal" flexItem />}>
                        <Typography variant="h5">Assigned Courses</Typography>
                        { tempCourses.length > 0 ?
                            tempCourses.map((course: any) => (
                                <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }} key={course}>
                                    <Typography variant='h6' sx={{ textAlign: "left", width: "50%" }}>{course}</Typography>
                                    <Button variant='contained' color='secondary' onClick={() => {handleRemoveCourse(course)}} sx={{height: "75%", verticalAlign: "middle", width: "30%", textAlign: "left"}}>
                                        Remove Course
                                    </Button>
                                </Box>
                            ))
                        :
                            <Typography sx={{ fontSize: "150%", padding: "10px", margin: "10px" }}>None Assigned</Typography>
                        }
                        {!editMode && <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center">
                            <Button onClick={handleEditToggle} variant='contained' color='secondary' endIcon={<AddCircleIcon />} sx={{textAlign: "center"}}>
                            Add a Course
                            </Button>
                            </Box>}
                    </Stack>

                    {/* Available Courses Section */}
                    {editMode && (
                        <Stack sx={{ p: 2 }} spacing={2} divider={<Divider orientation="horizontal" flexItem />}>
                            {allCourses.length > 0 ? (
                                <><Box>
                                    <Autocomplete
                                                id="tags-standard"
                                                options={filteredItems}
                                                fullWidth
                                                getOptionLabel={(option: any) => option}
                                                defaultValue={""}
                                                onInputChange={(event, newValue) => handleChange(newValue)}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        variant="standard"
                                                        label="Course to Add"
                                                    />
                                                )}
                                            />
                                </Box>
                                <Stack justifyContent='center' alignItems='center' direction='row' spacing={2} sx={{ width: 1, p: 2 }}>
                                    <Button onClick={handleAddCourseSubmit} variant='contained' color='secondary' endIcon={<AddCircleIcon />} sx={{ height: "80%", margin: "5px", marginTop: "3.5%"}}>
                                        Add
                                    </Button>
                                    <Button onClick={handleEditToggle} variant='contained' color='error'>
                                        Cancel
                                    </Button>
                                </Stack>
                                </>
                            ) : (
                                <Typography sx={{ fontSize: "150%", padding: "10px" }}>
                                    No Courses to Assign
                                </Typography>
                            )}
                        </Stack>
                    )}
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default ProfessorCourses;
