"use client";

import React, { useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, ButtonGroup, Card, TextField, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper, Stack } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Link from "next/link";

const ProfessorDetails = ({params}) => {

    return (
        <Box style={{ padding: "20px", textAlign: "center"}}>
            <Box sx={{backgroundColor: "rgba(255, 127, 50, 1)", 
                borderTopLeftRadius: "15px", borderTopRightRadius: "15px",
                padding: "20px"
            }}>
                <Typography variant="h3">
                {params.name}: Professor
                </Typography>
            </Box>
            
            <Accordion disableGutters={true}>
                <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
                    <Typography variant="h4">Professor Details</Typography>
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
                            Email: 
                        </Typography>
                        <Typography sx={{textAlign: "left", fontSize: "150%", width: "50%"}}>
                            {params.email}
                        </Typography>
                    </Box>
                    <Box sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                        <Typography sx={{textAlign: "left", fontSize: "150%", width: "15%"}}>
                            Department: 
                        </Typography>
                        <Typography sx={{textAlign: "left", fontSize: "150%", width: "50%"}}>
                            {params.department}
                        </Typography>
                    </Box>
                </AccordionDetails>
            </Accordion>
            
            <Accordion disableGutters={true}>
                <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
                    <Typography variant="h4">Current Courses</Typography>
                </AccordionSummary>
                <AccordionDetails>
                {params.courses.length > 0 ?
                    <Table>
                            <TableHead>
                                <TableRow sx={{justifyItems: "space-between"}}>
                                    <TableCell style={{width: "33%", textAlign: 'center'}}><strong>Course</strong></TableCell>
                                    <TableCell style={{width: "33%", textAlign: 'center'}}><strong>Current Enrollment</strong></TableCell>
                                    <TableCell style={{width: "33%", textAlign: 'center'}}><strong>More Details</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {params.courses.map((course: any) => (
                                    <TableRow>
                                        <TableCell style={{textAlign: "center"}}><strong>{course.name}</strong></TableCell>
                                        <TableCell style={{textAlign: "center"}}><strong>{course.enrolled}/{course.seats}</strong></TableCell>
                                        <TableCell style={{textAlign: "center"}}>
                                            <Link href={`/manager/admin/courseDetails/${course.name}`}>
                                            <strong style={{color: "blue"}}><u>Course Details</u></strong>
                                            </Link>
                                            </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    :
                    <Typography variant="h4">No Courses Assigned yet for this semester</Typography>
                    }
                    <Button sx={{alignSelf: "flex-end", border: "3px solid black", width: "20%", color: "white", marginTop: "10px", backgroundColor: "rgba(255, 127, 50, 0.8)", '&:hover': {backgroundColor: "rgba(255, 127, 50, 1)"}}}>
                        + Assign a Course
                    </Button>
                </AccordionDetails>
            </Accordion>
            
            <Accordion disableGutters={true}>
                <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
                    <Typography variant="h4">Assigned TAs</Typography>
                </AccordionSummary>
                <AccordionDetails>
                {params.assigned_tas.length > 0 ?
                    <Table>
                            <TableHead>
                                <TableRow sx={{justifyItems: "space-between"}}>
                                    <TableCell style={{width: "20%", textAlign: 'center'}}><strong>TA Name</strong></TableCell>
                                    <TableCell style={{width: "20%", textAlign: 'center'}}><strong>Status</strong></TableCell>
                                    <TableCell style={{width: "20%", textAlign: 'center'}}><strong>Assigned Course</strong></TableCell>
                                    <TableCell style={{width: "20%", textAlign: 'center'}}><strong>Preference</strong></TableCell>
                                    <TableCell style={{width: "20%", textAlign: 'center'}}><strong>Application</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {params.assigned_tas.map((assigned_ta: any) => (
                                    <TableRow>
                                        <TableCell style={{textAlign: "center"}}><strong>{assigned_ta.name}</strong></TableCell>
                                        <TableCell style={{textAlign: "center"}}><strong>{assigned_ta.status}</strong></TableCell>
                                        <TableCell style={{textAlign: "center"}}><strong>{assigned_ta.assigned_course}</strong></TableCell>
                                        <TableCell style={{textAlign: "center"}}>{assigned_ta.preference ? 
                                            <strong>{assigned_ta.preference}/5</strong> :
                                            <Button sx={{border: "3px solid black", width: "60%", fontSize: "80%", color: "white", backgroundColor: "rgba(255, 127, 50, 0.8)", '&:hover': {backgroundColor: "rgba(255, 127, 50, 1)"}}}>
                                                + Rate Preference
                                            </Button>
                                        }</TableCell>
                                        <TableCell style={{textAlign: "center"}}>
                                            <Link href={`/manager/admin/applicationDetails/${assigned_ta.name.substring(assigned_ta.name.indexOf(" ")+1)}_${assigned_ta.name.substring(0,assigned_ta.name.indexOf(" "))}`}>
                                            <strong style={{color: "blue"}}><u>View Application</u></strong>
                                            </Link>
                                            </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    :
                    <Typography variant="h4">No TAs assigned yet</Typography>
                    }
                    <Button sx={{alignSelf: "flex-end", border: "3px solid black", width: "20%", color: "white", marginTop: "10px", backgroundColor: "rgba(255, 127, 50, 0.8)", '&:hover': {backgroundColor: "rgba(255, 127, 50, 1)"}}}>
                        + Assign a TA
                    </Button>
                </AccordionDetails>
            </Accordion>
            
            <Accordion disableGutters={true}>
                <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
                    <Typography variant="h4">Prospective TAs</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {params.prosp_tas.length > 0 ?
                    <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{width: "25%", textAlign: 'center'}}><strong>Applicant Name</strong></TableCell>
                                    <TableCell style={{width: "25%", textAlign: 'center'}}><strong>Status</strong></TableCell>
                                    <TableCell style={{width: "25%", textAlign: 'center'}}><strong>Preference</strong></TableCell>
                                    <TableCell style={{width: "25%", textAlign: 'center'}}><strong>Application</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {params.prosp_tas.map((prosp_ta: any) => (
                                    <TableRow>
                                        <TableCell style={{textAlign: "center"}}><strong>{prosp_ta.name}</strong></TableCell>
                                        <TableCell style={{textAlign: "center"}}><strong>{prosp_ta.status}</strong></TableCell>
                                        <TableCell style={{textAlign: "center"}}>{prosp_ta.preference ? 
                                            <strong>{prosp_ta.preference}/5</strong> :
                                            <Button sx={{border: "3px solid black", width: "60%", fontSize: "80%", color: "white", backgroundColor: "rgba(255, 127, 50, 0.8)", '&:hover': {backgroundColor: "rgba(255, 127, 50, 1)"}}}>
                                                + Rate Preference
                                            </Button>
                                        }</TableCell>
                                        <TableCell style={{textAlign: "center"}}>
                                            <Link href={`/manager/admin/applicationDetails/${prosp_ta.name.substring(prosp_ta.name.indexOf(" ")+1)}_${prosp_ta.name.substring(0,prosp_ta.name.indexOf(" "))}`}>
                                            <strong style={{color: "blue"}}><u>View Application</u></strong>
                                            </Link>
                                            </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    :
                    <Typography variant="h4">No Applicants yet</Typography>
                    }
                </AccordionDetails>
            </Accordion>

            <Accordion disableGutters={true}>
                <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
                    <Typography variant="h4">Previous Courses</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {params.prev_courses.length > 0 ?
                        <Table>
                            <TableHead>
                                <TableRow sx={{justifyItems: "space-between"}}>
                                    <TableCell style={{width: "50%", textAlign: 'center'}}><strong>Course</strong></TableCell>
                                    <TableCell style={{width: "50%", textAlign: 'center'}}><strong>Semester</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {params.prev_courses.map((prev_course: any) => (
                                    <TableRow>
                                        <TableCell style={{textAlign: "center"}}><strong>{prev_course.course}</strong></TableCell>
                                        <TableCell style={{textAlign: "center"}}><strong>{prev_course.semester}</strong></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    :
                    <Typography variant="h4">No Previous Courses Found</Typography>
                    }
                </AccordionDetails>
            </Accordion>
        </Box>
    )

};

export default ProfessorDetails;