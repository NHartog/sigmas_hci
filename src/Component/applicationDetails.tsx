"use client";

import React, { useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, ButtonGroup, Card, TextField, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper, Stack } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { EnhancedTable, HeadCell } from '@/Component/customMangerTable';
import Link from "next/link";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const ApplicationDetails = ({params}: any) => {

    //Will eventually get from backend
    const coursesRows = [
        { id: 1, Course: "CAP5100", Taken: "Yes", App_Preference: 5, Prof_Preference: 4},
    ];

    const coursesHeadCells: HeadCell[] = [
        { id: 'Course', numeric: false, disablePadding: true, label: 'Course' },
        { id: 'Taken', numeric: false, disablePadding: false, label: 'Taken Previously' },
        { id: 'App_Preference', numeric: false, disablePadding: true, label: 'Applicant Preference' },
        { id: 'Prof_Preference', numeric: false, disablePadding: false, label: 'Professor Preference' },
    ];

    const button = (
        <ButtonGroup sx={{marginTop: "3px"}}>
            <Button sx={{ margin: 1, minWidth: 'max-content' }} variant="contained" endIcon={<PersonAddIcon />}>
                Assign TA to Course
            </Button>
            <Button sx={{ margin: 1, minWidth: 'max-content' }} variant="contained" endIcon={<OpenInNewIcon />}>
                Go to Course
            </Button>
        </ButtonGroup>
    );

    return (
        <Box style={{ padding: "20px", textAlign: "center"}}>
            <Box sx={{backgroundColor: "rgba(255, 127, 50, 1)", 
                borderTopLeftRadius: "15px", borderTopRightRadius: "15px",
                padding: "20px"
            }}>
                <Typography variant="h3">
                {params.name}: Applicant
                </Typography>
                <Typography variant="h5" sx={{margin: "10px"}}>
                Assignment: {params.assigned_course ? params.assigned_course : "Unassigned"}
                </Typography>
            </Box>
            <Accordion disableGutters={true}>
                <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
                <Typography variant="h4">Basic Details</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{display: "flex", flexDirection: "column"}}>
                <Box sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                        <Typography sx={{textAlign: "left", fontSize: "150%", width: "15%"}}>
                            Name: 
                        </Typography>
                        <Typography sx={{textAlign: "left", fontSize: "150%", width: "50%"}}>
                            {params.name}
                        </Typography>
                    </Box>
                    <Box sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                        <Typography sx={{textAlign: "left", fontSize: "150%", width: "15%"}}>
                            UF-ID: 
                        </Typography>
                        <Typography sx={{textAlign: "left", fontSize: "150%", width: "50%"}}>
                            {params.ufID}
                        </Typography>
                    </Box>
                    <Box sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                        <Typography sx={{textAlign: "left", fontSize: "150%", width: "15%"}}>
                            College Status: 
                        </Typography>
                        <Typography sx={{textAlign: "left", fontSize: "150%", width: "50%"}}>
                            {params.college_status}
                        </Typography>
                    </Box>
                    <Box sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                        <Typography sx={{textAlign: "left", fontSize: "150%", width: "15%"}}>
                            GPA: 
                        </Typography>
                        <Typography sx={{textAlign: "left", fontSize: "150%", width: "50%"}}>
                            {params.gpa}
                        </Typography>
                    </Box>
                    <Box sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                        <Typography sx={{textAlign: "left", fontSize: "150%", width: "15%"}}>
                            Email: 
                        </Typography>
                        <Typography sx={{textAlign: "left", fontSize: "150%", width: "50%"}}>
                            {params.email}
                        </Typography>
                    </Box>
                    <Box sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                        <Typography sx={{textAlign: "left", fontSize: "150%", width: "15%"}}>
                            United States Origin: 
                        </Typography>
                        <Typography sx={{textAlign: "left", fontSize: "150%", width: "50%"}}>
                            {params.us_origin}
                        </Typography>
                    </Box>
                </AccordionDetails>
            </Accordion>
            <Accordion disableGutters={true}>
                <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
                <Typography variant="h4">Written Responses</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{display: "flex", flexDirection: "column"}}>
                <Box sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                        <Typography sx={{textAlign: "left", fontSize: "150%", width: "15%"}}>
                            Research Interests: 
                        </Typography>
                        <Typography sx={{textAlign: "left", fontSize: "150%", width: "50%"}}>
                            {params.research_interests}
                        </Typography>
                    </Box>
                    <Box sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                        <Typography sx={{textAlign: "left", fontSize: "150%", width: "15%"}}>
                            Travel Plans: 
                        </Typography>
                        <Typography sx={{textAlign: "left", fontSize: "150%", width: "50%"}}>
                            {params.travel_plans}
                        </Typography>
                    </Box>
                </AccordionDetails>
            </Accordion>
            <Accordion disableGutters={true}>
                <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
                <Typography variant="h4">Course Requests and Preferences</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{display: "flex", flexDirection: "column"}}>
                <EnhancedTable rows={coursesRows} headCells={coursesHeadCells} title="Course Preferences" button={button} advancedTooltip onRowSelect={function(row: any): void {
                        throw new Error('Function not implemented.');
                    } }/>
                </AccordionDetails>
            </Accordion>
        </Box>
    )

};

export default ApplicationDetails;
