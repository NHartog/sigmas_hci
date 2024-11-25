import React, { useState } from 'react';
import {
    Autocomplete,
    Box,
    Button,
    Card,
    Divider,
    Stack,
    TextField,
    Typography,
    DialogContent,
    Dialog,
    DialogTitle,
    IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AreYouSureDialog from './areYouSureDialog';
import { assignProfessorCourse, unassignProfessorCourse } from '@/actions/manager';

const CourseProfessors = ({ open, close, params, profs, allProfs }: any) => {
    const [tempProfs, setTempProfs] = useState(profs);
    let profsByName = allProfs.map((item: any) => item.Professor).filter((item: any) => !tempProfs.includes(item));
    const [editMode, setEditMode] = useState(false);
    const [areYouSureDialogOpen, setAreYouSureDialogOpen] = useState(false);
    const [courseDetails, setCourseDetails] = useState(params);
    const [tempDetails, setTempDetails] = useState(params);
    const [newProf, setNewProfName] = useState("");
    const [filteredItems, setFilteredItems] = useState(profsByName);
    const [deleteData, setDeleteData] = useState<any>();

    const handleEditToggle = () => {
        if (editMode) {
            // Save changes
            setCourseDetails(tempDetails);
        }
        setEditMode(!editMode);
    };

    const handleCancel = () => {
        setEditMode(false);
    }

    const closingAreYouSure = () => {
        setAreYouSureDialogOpen(false);
    }

    const openingAreYouSure = (professor: string) => {
        setDeleteData({prefix: params.prefix, name: professor, title: ""});
        setAreYouSureDialogOpen(true);
    }

    const handleRemoveProfessor = (professor: any) => {
        setTempProfs(tempProfs.filter((p: any) => p !== professor));
        setEditMode(false);
        profsByName = allProfs.map((item: any) => item.Professor).filter((item: any) => !tempProfs.includes(item));
        handleFilteredItems("");
    };

    const handleFilteredItems = (value: any) => {
        if (profsByName.includes(value)) {
            setFilteredItems([])
        }
        else {
            const matches = profsByName.filter((item: any) => item.toLowerCase().includes(value.toLowerCase()))
            setFilteredItems(matches.slice(0,5))
        }
    };


    const handleChange = (newValue: string | null) => {
        setNewProfName(newValue !== null ? newValue : "");
        handleFilteredItems(newValue !== null ? newValue : "");
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
        setTempProfs([...tempProfs, newProf]);
        setEditMode(false);
        profsByName = allProfs.map((item: any) => item.Professor).filter((item: any) => !tempProfs.includes(item));
        handleFilteredItems("");
        alert("Professor Successfully Assigned to Course!");
    }

    const unAssigning = async () => {
        try {
            const response = await unassignProfessorCourse(deleteData.name, deleteData.prefix);

            if (response.success) {
                alert(response.message);
                handleRemoveProfessor(deleteData.name);
            } else {
                alert(response.message);
            }
        } catch (error) {
            console.error('Error unassigning professor:', error);
            alert('An unexpected error occurred. Please try again.');
        }
    }

    console.log("rendered")
    console.log(allProfs)
    return (
        <Dialog open={open} onClose={close} fullWidth>
            <DialogContent sx={{ p: 0 }}>
                <Box style={{ textAlign: "center", width: "100%" }}>
                    <Box sx={{ padding: "20px" }}>
                        <Typography variant="h5">Course's Professors</Typography>
                    </Box>

                    {/* Assigned Professors Section */}
                    <Stack sx={{ p: 2 }} spacing={2} divider={<Divider orientation="horizontal" flexItem />}>
                        <Typography variant="h5">Assigned Professors</Typography>
                        { tempProfs.length > 0 ?
                            tempProfs.map((prof: any) => (
                                <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }} key={prof}>
                                    <Typography sx={{ textAlign: "left", width: "50%" }}>{prof}</Typography>
                                    <Button variant='contained' color='secondary' onClick={() => {openingAreYouSure(prof)}} sx={{ height: "75%", verticalAlign: "middle", width: "35%", textAlign: "left"}}>
                                        Remove Professor
                                    </Button>
                                </Box>
                            ))
                        :
                            <Typography sx={{ fontSize: "150%", padding: "10px", margin: "10px" }}>None Assigned</Typography>
                        }
                        {!editMode && <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center">
                        <Button onClick={handleEditToggle} variant='contained' color='secondary' endIcon={<AddCircleIcon />} sx={{textAlign: "center"}}>
                            Add a Professor
                        </Button>
                        </Box>}
                    </Stack>

                    {/* Available Professors Section */}
                    {editMode && (
                        <Stack sx={{ p: 2 }} spacing={2} divider={<Divider orientation="horizontal" flexItem />}>
                            {allProfs.length > 0 ? 
                        (<><Box>
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
                                            label="Professor to Add"
                                        />
                                        )}
                                />
                        </Box>
                        <Stack justifyContent='center' alignItems='center' direction='row' spacing={2} sx={{ width: 1, p: 2 }}>
                        <Button onClick={handleAddProfSubmit} variant='contained' color='secondary' endIcon={<AddCircleIcon />} sx={{ height: "80%", margin: "5px", marginTop: "3.5%"}}>
                            Add
                        </Button>
                        <Button onClick={handleCancel} variant='contained' color='error'>
                            Cancel
                        </Button>
                        </Stack>
                        </>
                            ) : (
                                <Typography sx={{ fontSize: "150%", padding: "10px" }}>
                                    No Available Professors
                                </Typography>
                            )}
                        </Stack>
                    )}
                    {areYouSureDialogOpen && <AreYouSureDialog open={areYouSureDialogOpen}
                    onClose={closingAreYouSure}
                    toRemove={deleteData}
                    onConfirm = {unAssigning}
                     />}
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default CourseProfessors;
