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
import {postProf, getManagerCourses, deleteTAPreference} from '@/actions/manager';

interface TaPreferenceDialogProps {
    open: boolean;
    onClose: () => void;
    toRemove: { prefix: string | null; name: string | null; title: string | null };
}

const AreYouSureDialog = ({open, onClose, toRemove}: TaPreferenceDialogProps) => {

    console.log(toRemove);
    console.log(open);

    return(
    <Dialog open={open} onClose={onClose} fullWidth scroll="paper">
        <DialogContent>
            <Box style={{textAlign: "center", gridTemplateColumns: '1fr 1fr'}}>
                <Box sx={{backgroundColor: "rgba(255, 127, 50, 1)",
                        borderTopLeftRadius: "15px", borderTopRightRadius: "15px",
                        padding: "20px"
                    }}>
                    <Typography variant="h3">
                        Are You Sure?
                    </Typography>
                </Box>
            </Box>
            <Box>
                <Typography variant="h5" sx={{padding: "30px"}}>
                    The following is a permanent deletion. Please confirm that you want to delete {toRemove.Prefix} from the system.
                </Typography>
                <ButtonGroup sx={{width: '100%', justifyContent: 'space-evenly', marginTop: '5%'}}>
                    <Button sx={{border: "3px solid black", width: "25%", height: "80%", color: "white", backgroundColor: "rgba(255, 127, 50, 0.8)", '&:hover': {backgroundColor: "rgba(255, 127, 50, 1)"}}}
                        onClick={onClose}>
                        Cancel
                    </Button>
                    <Button
                        sx={{
                            border: "3px solid black",
                            width: "25%",
                            height: "80%",
                            color: "white",
                            backgroundColor: "rgba(255, 127, 50, 0.8)",
                            '&:hover': { backgroundColor: "rgba(255, 127, 50, 1)" },
                        }}
                        onClick={async () => {
                            try {
                                const response = await deleteTAPreference(toRemove);

                                if (response.success) {
                                    alert(response.message);
                                } else {
                                    alert(response.message);
                                }
                            } catch (error) {
                                console.error('Error deleting TA preference:', error);
                                alert('An unexpected error occurred. Please try again.');
                            } finally {
                                onClose() // Close the dialog
                            }
                        }}
                    >
                        Yes, I'm sure
                    </Button>
                </ButtonGroup>
            </Box>
        </DialogContent>
    </Dialog>
      )
}

export default AreYouSureDialog;