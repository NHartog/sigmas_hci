import React, { useState, useEffect } from 'react';
import {
    Autocomplete,
    Box,
    Button,
    Card,
    CardActionArea,
    CardContent,
    Divider,
    Typography,
    DialogContent,
    Dialog,
    DialogTitle,
    IconButton,
    TextField,
    Stack
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';
import { assignTACourse, getStudentPreference, unassignTACourse, getTAPreferencesbyStudentCourseCombo } from '@/actions/manager';
import AreYouSureDialog from './areYouSureDialog';

const CourseTAs = ({ open, close, params, allTAs }: any) => {
    const tasByName = allTAs.map((item: any) => item.studentName);
    const [tempTAs, setTempTAs] = useState(params.assignedTas);
    const [editMode, setEditMode] = useState(false);
    const [courseDetails, setCourseDetails] = useState(params);
    const [tempDetails, setTempDetails] = useState(params);
    const [newTA, setNewTAName] = useState("");
    const [filteredItems, setFilteredItems] = useState([]);
    const [filteredCards, setFilteredCards] = useState<any>([]);
    const [allCards, setAllCards] = useState<any>({});
    const [savedStudentPreferences, setSavedStudentPreferences] = useState<any>({});
    const [savedProfPreferences, setSavedProfPreferences] = useState<any>({});

    const handleEditToggle = () => {
        if (editMode) {
            // Save changes
            setCourseDetails(tempDetails);
        }
        setEditMode(!editMode);
    };

    const handleChange = (newValue: string | null) => {
        setNewTAName(newValue !== null ? newValue : "");
        handleFilteredItems(newValue !== null ? newValue : "");
    }

    const handleSelection = (student: string) => {
        setNewTAName(student);
        handleFilteredItems(student);

    }

    const handleCancel = () => {
        // Reset to original details
        setTempDetails(courseDetails);
        setEditMode(false);
    };

    const handleFilteredItems = (value: any) => {
        if (value === '') {
            setFilteredItems(tasByName.slice(0,3))
        }
        else {
            const matches = tasByName.filter((item: any) => item.toLowerCase().includes(value.toLowerCase()))
            setFilteredItems(matches.slice(0,3))
        }
    };

    useEffect(() => {
        const generation = async (student: string) => {
            const newCard = await GenerateCard(student);
            setAllCards({...allCards, [student]: newCard});
        }
        for(let i = 0; i < filteredItems.length; i++){
            generation(filteredItems[i]);
        }
    }, [filteredItems]);


    const getCard = (student: string) => {
        console.log(student);
            
        return allCards[student];
    }

    const GenerateCard = async (student: string) => {
        if(!(student in savedStudentPreferences)){
            setSavedStudentPreferences({...savedStudentPreferences, [student]: await getStudentPreference(student, params.prefix)});
        }
        if(!(student in savedProfPreferences)){
            const newValue = await getTAPreferencesbyStudentCourseCombo(student, params.prefix);
            setSavedProfPreferences({...savedProfPreferences, [student]: (newValue ? newValue : [])});
        }
        console.log(savedStudentPreferences);
        console.log(savedProfPreferences);
        return(
                    <Card
                        key={student}
                        onClick={() => handleSelection(student)}
                        sx={{
                            border: '1px solid #e0e0e0',
                            cursor: 'pointer',
                            backgroundColor: '#ffffff',
                        }}
                    >
                        <CardActionArea>
                            <CardContent>
                                <Typography variant="h6">{student}</Typography>
                                <Box mt={2}>
                                    <Typography variant="subtitle2" fontWeight="bold">Professor Preferences:</Typography>
                                    {(savedProfPreferences[student]).map((professor: any) => (
                                                <Box key={professor.professor} display="flex" alignItems="center">
                                                    <Typography variant="body2" color="textSecondary" sx={{ mr: 1 }}>
                                                        {professor.professor}:
                                                    </Typography>
                                                    <Box display="flex">
                                                        {Array.from({ length: professor.preference }).map((_, index) => (
                                                            <StarTwoToneIcon key={`filled-${index}`} sx={{ color: "rgba(255,127,50,1)" }} />
                                                        ))}
                                                        {Array.from({ length: 5 - professor.preference }).map((_, index) => (
                                                            <StarTwoToneIcon key={`empty-${index}`} sx={{ color: "gray" }} />
                                                        ))}
                                                    </Box>
                                                </Box>
                                    ))}
                                    {(savedProfPreferences[student]).length === 0 &&
                                        <Typography variant="body2" color="textSecondary">
                                            No professor preferences found.
                                        </Typography>}

                                    <Typography variant="subtitle2" fontWeight="bold">Student Preferences:</Typography>
                                    <Box key={`${student}Box`} display="flex" alignItems="center">
                                        <Box display="flex">
                                            {Array.from({ length: (savedStudentPreferences[student]) || 0 }).map((_, index) => (
                                                <StarTwoToneIcon key={`filled-${index}`} sx={{ color: "rgba(255,127,50,1)" }} />
                                            ))}
                                            {Array.from({ length: 5 - ((savedStudentPreferences[student]) || 0) }).map((_, index) => (
                                            <StarTwoToneIcon key={`empty-${index}`} sx={{ color: "gray" }} />
                                        ))}
                                    </Box>
                                </Box>
                            </Box>
                        </CardContent>
                    </CardActionArea>
                </Card>
        )
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

    const handleRemoveTA = (ta: any) => {
        unassignTACourse(ta, params.prefix);
        setTempTAs(tempTAs.filter((t: any) => t !== ta));
        setEditMode(false);
        alert("TA Successfully Removed From Course!")
    };


    return (
        <Dialog open={open} onClose={close} fullWidth>
            <DialogContent sx={{ p: 0 }}>
                <Box style={{ textAlign: "center", width: "100%" }}>
                    <Box sx={{ padding: "20px" }}>
                        <Typography variant="h5">Course's TAs</Typography>
                    </Box>

                    {/* Assigned TAs Section */}
                    <Stack sx={{ p: 2 }} spacing={2} divider={<Divider orientation="horizontal" flexItem />}>
                        <Typography variant="h5">Assigned TAs</Typography>
                        { tempTAs.length > 0 ?
                            tempTAs.map((ta: any) => (
                                <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }} key={ta}>
                                    <Typography sx={{ textAlign: "left", width: "50%" }}>{ta}</Typography>
                                    <Button variant='contained' color='secondary' onClick={() => {handleRemoveTA(ta)}} sx={{ height: "75%", verticalAlign: "middle", width: "35%", textAlign: "left"}}>
                                        Remove Professor
                                    </Button>
                                </Box>
                            ))
                        :
                            <Typography sx={{ fontSize: "150%", padding: "10px", margin: "10px" }}>None Assigned</Typography>
                        }
                        {!editMode && <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center">
                            <Button onClick={handleEditToggle} variant='contained' color='secondary' endIcon={<AddCircleIcon />}>
                                Add a TA
                            </Button>
                        </Box>}
                    </Stack>

                    {/* Available TAs Section */}
                    {editMode && (
                        <Stack sx={{ p: 2 }} spacing={2} divider={<Divider orientation="horizontal" flexItem />}>
                            {allTAs.length > 0 ? 
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
                                            label="TA to Add"
                                        />
                                        )}
                                        renderOption={(props, option: string)=>(
                                            <li {...props} key={option}>{getCard(option)}</li>
                                        )}
                                />
                        </Box>
                        <Stack justifyContent='center' alignItems='center' direction='row' spacing={2} sx={{ width: 1, p: 2 }}>
                        <Button onClick={handleAddTASubmit} variant='contained' color='secondary' endIcon={<AddCircleIcon />} sx={{ height: "80%", margin: "5px", marginTop: "3.5%"}}>
                            Add
                        </Button>
                        <Button onClick={handleCancel} variant='contained' color='error'>
                            Cancel
                        </Button>
                        </Stack>
                        </>
                            ) : (
                                <Typography sx={{ fontSize: "150%", padding: "10px" }}>
                                    No Available TAs
                                </Typography>
                            )}
                        </Stack>
                    )}
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default CourseTAs;
