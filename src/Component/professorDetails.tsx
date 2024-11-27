"use client"
import React, { useState } from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    DialogContent,
    Dialog,
    DialogTitle,
    Divider,
    Stack,
    Typography,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import StarIcon from '@mui/icons-material/Star';
import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';
import Link from "next/link";
import { updateProfessor } from '@/actions/manager';

const ProfessorDetails = ({ open, onClose, params, applicants }: any) => {
    const [editMode, setEditMode] = useState(false);
    const [editParams, setEditParams] = useState(() => ({ ...params , oldName: params.Professor}));

    // Toggle edit mode
    const handleToggleEditMode = () => {
        if(editMode){
            updateProfessor(editParams);
            console.log(editParams);
            //old name is used for updateProfessor to ensure course and preferences are modified correctly
            setEditParams(() => ({...editParams, oldName: editParams.Professor}))
        }
        setEditMode(!editMode)

    };

    // Handle parameter change
    const handleChange = (field: any) => (event: any) => {
        setEditParams((prev: any) => ({
            ...prev,
            [field]: event.target.value,
        }));
    };

    // Save the changes and exit edit mode
    const handleSave = () => {
        // Call a function to save changes to the backend or update state
        // You could pass editParams to a parent component here if needed.

        updateProfessor(editParams);
        console.log(editParams);
        setEditMode(false);
    };

    const handleCancel = () => {
        setEditParams(params);
        setEditMode(false);
    };

    const IconRepeater = ({count}: any) => {
        return (
          <Box>
            {Array.from({ length: count }).map((_, index) => (
                <StarTwoToneIcon sx={{color: "rgba(255,127,50,1)"}} />
            ))}
            {Array.from({ length: 5 - count }).map((_, index) => (
                <StarTwoToneIcon sx={{color: "gray"}} />
            ))}
          </Box>
        );
      };

      
    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogContent sx={{ p: 0 }}>
                <Box style={{ textAlign: "center", width: "100%" }}>
                    <Box sx={{ padding: "20px" }}>
                        <Typography variant="h5">{editParams.Professor} Details</Typography>
                    </Box>
                    <Stack sx={{ p: 2 }} spacing={2} divider={<Divider orientation="horizontal" flexItem />}>
                        {["Professor", "email", "department"].map((field, index) => (
                            <Box
                                key={index}
                                sx={{
                                    display: "flex",
                                    flexDirection: "row"
                                }}
                            >
                                <Typography variant="h5" sx={{ textAlign: "left", width: "40%", paddingLeft: "10%", marginRight: "20px" }}>
                                    {field.charAt(0).toUpperCase() + field.slice(1)}:
                                </Typography>
                                {editMode ? (
                                    <TextField
                                        value={editParams[field]}
                                        onChange={handleChange(field)}
                                        fullWidth
                                        variant="outlined"
                                    />
                                ) : (
                                    <Typography variant="h6" sx={{ textAlign: "right", width: "50%" }}>
                                        {editParams[field]}
                                    </Typography>
                                )}
                            </Box>
                        ))}
                        {/*Courses*/}
                        <Box>
                        <Box sx={{ display: "flex", flexDirection: "row" }} key="courses">
                            {( params.courses.length > 0 ?
                            (<><Typography variant='h5' sx={{ textAlign: "left", width: "40%", paddingLeft: "10%", marginRight: "20px" }}>Courses:</Typography>
                                <Box display="flex" flexDirection="column" sx={{ textAlign: "right", width: "50%"}}>
                                {params.courses.map((course: any) => (
                                            <Typography variant='h6' >{course}</Typography>
                                    ))
                                    
                                }</Box></>)
                            :
                                (<><Typography variant='h5' sx={{ textAlign: "left", width: "40%", paddingLeft: "10%", marginRight: "20px" }}>Courses:</Typography>
                                <Typography variant="h6" sx={{ textAlign: "right", width: "50%"}}>No Courses Assigned Yet For This Semester</Typography></>
                                )
                            )}
                        </Box>
                        {editMode && <Typography variant="subtitle1" sx={{marginTop: "10px"}}>To modify courses, choose the manage courses option.</Typography>}
                        </Box>
                        {/*Applicants*/}
                        <Box>
                        <Box sx={{ display: "flex", flexDirection: "row" }} key="applicants">
                            {( applicants.length > 0 ?
                            (<><Typography variant='h5' sx={{ textAlign: "left", width: "40%", paddingLeft: "10%", marginRight: "20px" }}>Assigned TAs:</Typography>
                                <Box display="flex" flexDirection="column" sx={{ textAlign: "right", width: "50%"}}>
                                {applicants.map((app: any) => (
                                            <Typography variant='h6' >{app.studentName}</Typography>
                                    ))
                                    
                                }</Box></>)
                            :
                                (<><Typography variant='h5' sx={{ textAlign: "left", width: "40%", paddingLeft: "10%", marginRight: "20px" }}>Applicants:</Typography>
                                <Typography variant="h6" sx={{ textAlign: "right", width: "50%"}}>No TAs Assigned Yet</Typography></>
                                )
                            )}
                        </Box>
                        {editMode && <Typography variant="subtitle1" sx={{marginTop: "10px"}}>To modify TAs, choose the manage TAs option.</Typography>}
                        </Box>
                    </Stack>
                </Box>
                <Stack justifyContent='center' alignItems='center' direction='row' spacing={2} sx={{ width: 1, p: 2 }}>
                    <Button onClick={handleToggleEditMode} variant='contained' color='secondary'>
                        {editMode ? "Save" : "Edit"}
                    </Button>
                    {editMode && (
                        <Button onClick={handleCancel} variant='contained' color='error'>
                            Cancel
                        </Button>
                    )}
                </Stack>
            </DialogContent>
        </Dialog>
    );
};

export default ProfessorDetails;

/*
{['professors', 'assignedTas'].map(field => (
                            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }} key={field}>
                                <Typography variant='h6' sx={{ textAlign: "left", width: "50%" }}>
                                    {(titleFormat as any)[field]}:
                                </Typography>
                                <Box sx={{ width: "50%", display: "flex", flexDirection: "column" }}>
                                    {
                                        !editMode
                                            ?
                                            tempDetails[field].map((item: string) => (
                                                <Box key={item} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                    <Typography>{item}</Typography>
                                                </Box>
                                            ))
                                            :
                                            <Autocomplete
                                                multiple
                                                id="tags-standard"
                                                options={tempDetails[field]}
                                                fullWidth
                                                getOptionLabel={(option: any) => option}
                                                defaultValue={tempDetails[field]}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        variant="standard"
                                                        label="Multiple values"
                                                    />
                                                )}
                                            />
                                    }
                                    {!tempDetails[field].length && (
                                        <Typography sx={{ fontSize: "150%" }}>None Assigned</Typography>
                                    )}
                                </Box>
                            </Box>
                        ))}
    */