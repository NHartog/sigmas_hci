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
    Stack,
    styled,
    Popper
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';
import { assignTACourse, getStudentPreference, unassignTACourse, getTAPreferencesbyStudentCourseCombo } from '@/actions/manager';
import AreYouSureDialog from './areYouSureDialog';

const StyledPopper = styled(Popper)({
    zIndex: 1300, // Ensures it stays on top of other UI elements
    '& .MuiAutocomplete-listbox': {
        position: 'relative',
        maxHeight: '40vh', // Remove height restriction
    },
    '& .MuiAutocomplete-paper': {
        overflow: 'visible', // Ensure dropdown expands fully
    },
});

const CourseTAs = ({ open, close, params, allTAs }: any) => {
    const tasByName = allTAs.map((item: any) => item.studentName);
    const [tempTAs, setTempTAs] = useState(params.assignedTas);
    const [editMode, setEditMode] = useState(false);
    const [courseDetails, setCourseDetails] = useState(params);
    const [tempDetails, setTempDetails] = useState(params);
    const [newTA, setNewTAName] = useState("");
    const [filteredItems, setFilteredItems] = useState(tasByName);
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
        if (value === "") {
            setFilteredItems(tasByName)
        }
        else {
            const matches = tasByName.filter((item: any) => item.toLowerCase().includes(value.toLowerCase()))
            setFilteredItems(matches)
        }
    };

    useEffect(() => {
        const generation = async () => {
            const newCards = {...allCards};
            for(let i = 0; i < filteredItems.length; i++){
                const student = filteredItems[i];
                if (!(student in newCards)) {
                    const newCard = await GenerateCard(student); // Generate the card
                    newCards[student] = newCard;
                    setAllCards((prevCards: any) => ({
                        ...prevCards,
                        [student]: newCard,
                    }));
                }
                
            }
        }
        generation();

    }, [newTA, filteredItems]);


    const getCard = (student: string) => {
        console.log(student);
        console.log("Filtered items, ", filteredItems)
        return allCards[student];
    }

    const GenerateCard = async (student: string) => {
        console.log("STUDENT", student);
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
                            width: "100%",
                        }}
                    >
                        <CardActionArea>
                            <CardContent sx={{height: "20vh"}}>
                                <Typography variant="h6">{student}</Typography>
                                <Box mt={2}>
                                    <Box display="flex" flexDirection="row">
                                    <Typography variant="subtitle2" fontWeight="bold">Professor Preferences:</Typography>
                                    <Box display="flex" flexDirection="column" sx={{marginLeft: "10px"}}>
                                    {(savedProfPreferences[student]).map((professor: any) => (
                                                
                                                    <Box key={professor.professor} display="flex" flexDirection="row">
                                                    <Typography variant="subtitle2" sx={{ mr: 1, marginTop: "1%" }}>
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
                                        </Box>
                                    </Box>
                                    <Box display="flex" flexDirection="row" sx={{marginTop: "2%"}}>
                                    <Typography variant="subtitle2" fontWeight="bold" sx={{marginTop: "1%"}}>Student Preference:</Typography>
                                    <Box key={`${student}Box`} display="flex" alignItems="center">
                                        <Box display="flex" sx={{marginLeft: "10px"}}>
                                            {Array.from({ length: (savedStudentPreferences[student]) || 0 }).map((_, index) => (
                                                <StarTwoToneIcon key={`filled-${index}`} sx={{ color: "rgba(255,127,50,1)" }} />
                                            ))}
                                            {Array.from({ length: 5 - ((savedStudentPreferences[student]) || 0) }).map((_, index) => (
                                            <StarTwoToneIcon key={`empty-${index}`} sx={{ color: "gray" }} />
                                        ))}
                                    </Box>
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



    //Set initial items before running
    return (
        <Dialog open={open} onClose={close} fullWidth PaperProps={{sx: {height: "auto", maxHeight: "90vh", overflow: "visible", display: "flex", flexDirection: "column", justifyContent: "center"}}}>
            <DialogContent sx={{ p: 0, display: 'flex', flexDirection: 'column', flexGrow: 1  }}>
                <Box style={{ textAlign: "center", width: "100%", display: "flex", flexDirection: "column", flexGrow: 1 }}>
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
                                        Remove TA
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
                        (<Box sx={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "stretch" }}>
                            <Box>
                            <Autocomplete
                                        id="tags-standard"
                                        options={filteredItems}
                                        fullWidth
                                        getOptionLabel={(option: any) => option}
                                        defaultValue={""}
                                        PopperComponent={(props) => (
                                            <StyledPopper
                                              {...props} // This ensures the dropdown is part of the dialog
                                              modifiers={[
                                                {
                                                  name: "preventOverflow",
                                                  options: {
                                                    boundary: "window", // Ensure the dropdown stays within the window
                                                  },
                                                },
                                                {
                                                  name: "flip",
                                                  enabled: false, // Disable flipping to avoid rendering above the input field
                                                },
                                              ]}
                                              sx={{
                                                zIndex: 'unset',
                                                overflow: "visible",
                                                width: '100%', // Ensure the dropdown expands in width as well
                                                position: "static",
                                                height: "10vh"
                                              }}
                                            />
                                          )}
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
                        {newTA in allCards ? 
                        (<Box sx={{height: "25vh"}}>
                            {getCard(newTA)}
                        </Box>)
                        : (<Box sx={{height: "25vh"}}></Box>)
                        }
                        <Stack justifyContent='center' alignItems='center' direction='row' spacing={2} sx={{ width: 1, p: 2, marginTop: "10vh" }}>
                        <Button onClick={handleAddTASubmit} variant='contained' color='secondary' endIcon={<AddCircleIcon />} sx={{ height: "80%", margin: "5px", marginTop: "3.5%"}}>
                            Add
                        </Button>
                        <Button onClick={handleCancel} variant='contained' color='error'>
                            Cancel
                        </Button>
                        </Stack>
                        </Box>
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
