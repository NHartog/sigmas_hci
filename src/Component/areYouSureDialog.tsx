"use client";

import React, { useState } from 'react';
import {
    Box,
    Button,
    ButtonGroup,
    Card,
    List,
    ListItem,
    ListItemText,
    TextField,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    Stack,
    DialogContent, Dialog, DialogTitle
} from '@mui/material';
import Link from "next/link";
import { postProf, getManagerCourses, deleteTAPreference, deleteCourse, unassignProfessorCourse } from '@/actions/manager';

interface DialogProps {
    open: boolean;
    onClose: () => void;
    toRemove: { prefix: string | null; name: string | null; title: string | null };
    //I tried to make it give the function directly, but that seems to cause issues where it runs immediately
    deletionType: string;
    onProfCourseSuccess?: (professor: any) => void;
}

const AreYouSureDialog = ({ open, onClose, toRemove, deletionType, onProfCourseSuccess }: DialogProps) => {

    console.log(toRemove);
    console.log(open);

    return (
        <Dialog open={open} onClose={onClose} fullWidth scroll="paper">
            <DialogContent sx={{p:0}}>
                <Box style={{ textAlign: "center", gridTemplateColumns: '1fr 1fr' }}>
                    <Box sx={{
                        padding: "20px"
                    }}>
                        <Typography variant="h5">
                            Are You Sure?
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{pb:2}}>
                    {deletionType === "course" && <Typography variant="h6" sx={{ paddingX: 5 }}>
                        The following is a permanent deletion. Please confirm that you want to delete {toRemove.prefix} from the system.
                    </Typography>}
                    {deletionType === "ProfCourse" && <Typography variant="h6" sx={{ paddingX: 5 }}>
                        Please confirm that you want to unassign {toRemove.name} from the course {toRemove.prefix}.
                    </Typography>}
                    {deletionType === "TAPreferencee" && <Typography variant="h6" sx={{ paddingX: 5 }}>
                        Please confirm that you want to remove the following TA preference.
                    </Typography> //I'll make this more specific later
                    }
                    <Stack direction='row' sx={{ width: '100%', justifyContent: 'space-evenly', marginTop: '5%' }}>
                        <Button onClick={onClose} variant='contained' color='secondary'>
                            Cancel
                        </Button>
                        <Button
                            onClick={async () => {
                                try {
                                    console.log(toRemove);
                                    if(deletionType === "course"){
                                        const response = await deleteCourse(toRemove);
                                        alert(response.message);
                                    }
                                    else if(deletionType === "TApreference"){
                                        const response = await deleteTAPreference(toRemove);
                                        alert(response.message);
                                    }
                                    else if(deletionType === "CourseProf"){
                                        const response = await unassignProfessorCourse(toRemove.name, toRemove.prefix);
                                        alert(response.message);
                                        if(response.success && onProfCourseSuccess){
                                            onProfCourseSuccess(toRemove.name);
                                        }
                                    }
                                    else if(deletionType === "ProfCourse"){
                                        console.log(toRemove);
                                        const response = await unassignProfessorCourse(toRemove.name, toRemove.prefix);
                                        alert(response.message);
                                        if(response.success && onProfCourseSuccess){
                                            onProfCourseSuccess(toRemove.prefix);
                                        }
                                    }
                                    else{
                                        throw new Error("Deletion type is invalid");
                                    }
                                } catch (error) {
                                    console.error('Error deleting ', toRemove, ':', error);
                                    alert('An unexpected error occurred. Please try again.');
                                } finally {
                                    onClose() // Close the dialog
                                }
                            }}
                            variant='contained'
                            color='error'
                        >
                            Yes, I'm sure
                        </Button>
                    </Stack>
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default AreYouSureDialog;
