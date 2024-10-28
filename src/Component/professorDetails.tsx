"use client";

import React, { useState } from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    ButtonGroup,
    Card,
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
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Link from "next/link";

const ProfessorDetails = ({open, onClose, params}) => {

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="max">
            <DialogTitle>Professor Details</DialogTitle>
            <DialogContent>
                <Box style={{ padding: "20px", textAlign: "center"}}>
                    <Box sx={{backgroundColor: "rgba(255, 127, 50, 1)",
                        borderTopLeftRadius: "15px", borderTopRightRadius: "15px",
                        padding: "20px"
                    }}>
                        <Typography variant="h3">
                        {params.Professor}: Professor
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
                                    {params.Professor}
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
                                                <TableCell style={{textAlign: "center"}}><strong>{course.professor}</strong></TableCell>
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

                    {/*<Accordion disableGutters={true}>*/}
                    {/*    <AccordionSummary expandIcon={<ArrowDropDownIcon />}>*/}
                    {/*        <Typography variant="h4">Previous Courses</Typography>*/}
                    {/*    </AccordionSummary>*/}
                    {/*    <AccordionDetails>*/}
                    {/*        {params.prev_courses.length > 0 ?*/}
                    {/*            <Table>*/}
                    {/*                <TableHead>*/}
                    {/*                    <TableRow sx={{justifyItems: "space-between"}}>*/}
                    {/*                        <TableCell style={{width: "50%", textAlign: 'center'}}><strong>Course</strong></TableCell>*/}
                    {/*                        <TableCell style={{width: "50%", textAlign: 'center'}}><strong>Semester</strong></TableCell>*/}
                    {/*                    </TableRow>*/}
                    {/*                </TableHead>*/}
                    {/*                <TableBody>*/}
                    {/*                    {params.prev_courses.map((prev_course: any) => (*/}
                    {/*                        <TableRow>*/}
                    {/*                            <TableCell style={{textAlign: "center"}}><strong>{prev_course.course}</strong></TableCell>*/}
                    {/*                            <TableCell style={{textAlign: "center"}}><strong>{prev_course.semester}</strong></TableCell>*/}
                    {/*                        </TableRow>*/}
                    {/*                    ))}*/}
                    {/*                </TableBody>*/}
                    {/*            </Table>*/}
                    {/*        :*/}
                    {/*        <Typography variant="h4">No Previous Courses Found</Typography>*/}
                    {/*        }*/}
                    {/*    </AccordionDetails>*/}
                    {/*</Accordion>*/}
                </Box>
            </DialogContent>
        </Dialog>
    )

};

export default ProfessorDetails;