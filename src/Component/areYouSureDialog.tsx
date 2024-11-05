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
import { postProf, getManagerCourses, deleteTAPreference } from '@/actions/manager';

interface TaPreferenceDialogProps {
    open: boolean;
    onClose: () => void;
    toRemove: { prefix: string | null; name: string | null; title: string | null };
}

const AreYouSureDialog = ({ open, onClose, toRemove }: TaPreferenceDialogProps) => {

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
                    <Typography variant="h6" sx={{ paddingX: 5 }}>
                        The following is a permanent deletion. Please confirm that you want to delete {toRemove.prefix} from the system.
                    </Typography>
                    <Stack direction='row' sx={{ width: '100%', justifyContent: 'space-evenly', marginTop: '5%' }}>
                        <Button onClick={onClose} variant='contained' color='secondary'>
                            Cancel
                        </Button>
                        <Button
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
