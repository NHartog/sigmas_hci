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
import { postProf, getManagerCourses } from '@/actions/manager';

const AreYouSureDialog = ({open, onClose, onSure, toRemove}: {open: any, onClose: any, onSure: any, toRemove?: string}) => {

    console.log(toRemove);

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
                    The following is a permanent deletion. Please confirm that you want to delete {toRemove} from the system.
                </Typography>
                <ButtonGroup sx={{width: '100%', justifyContent: 'space-evenly', marginTop: '5%'}}>
                    <Button sx={{border: "3px solid black", width: "25%", height: "80%", color: "white", backgroundColor: "rgba(255, 127, 50, 0.8)", '&:hover': {backgroundColor: "rgba(255, 127, 50, 1)"}}}
                        onClick={onClose}>
                        Cancel
                    </Button>
                    <Button sx={{border: "3px solid black", width: "25%", height: "80%", color: "white", backgroundColor: "rgba(255, 127, 50, 0.8)", '&:hover': {backgroundColor: "rgba(255, 127, 50, 1)"}}}
                    onClick={onSure}>
                        Yes, I'm sure
                    </Button>
                </ButtonGroup>
            </Box>
        </DialogContent>
    </Dialog>
      )
}

export default AreYouSureDialog;