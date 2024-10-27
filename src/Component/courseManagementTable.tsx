"use client";

import React, { useState } from 'react';
import { Box, Button, ButtonGroup, TextField, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper, Stack } from '@mui/material';
import Link from "next/link";

const CourseTable = () => {
    // State for selected prefixes
    const [selectedPrefixes, setSelectedPrefixes] = useState<string[]>([]);
    const [searchText, setSearchText] = useState('');

    // Example course data
    const courses = [
        { prefix: 'CAP5100', title: 'HCI', professors: ['Jaime Ruiz'], tas: ['John Adams'], enrolled: 75, seats: 100, taHours: 10, sections: 1 },
        { prefix: 'CNT5106C', title: 'Computer Networks and a Longer Title', professors: [], tas: [], enrolled: 81, seats: 144, taHours: 20, sections: 2}
        // Add more course rows as needed
    ];

    const handlePrefixToggle = (prefix: string) => {
        if (selectedPrefixes.includes(prefix)) {
            setSelectedPrefixes(selectedPrefixes.filter((p) => p !== prefix));
        } else {
            setSelectedPrefixes([...selectedPrefixes, prefix]);
        }
    };

    return (
        <Box sx={{ padding: 1}}>
            {/* Table */}
            <Paper elevation={3}>
                {/* Top Section with multi-select buttons and search bar */}
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2, marginLeft: "10px", marginRight: "10px"}}>
                    <Box sx={{display: "flex", flexDirection: "row"}}>
                    <div style={{marginTop: "10px", marginRight: "10px", verticalAlign: "middle"}}><span>Filters: </span> </div>
                    <ButtonGroup sx={{marginTop: "3px"}}>
                        {['CDA', 'CIS', 'COP', 'CGS'].map((prefix) => (
                            <Button
                                key={prefix}
                                variant={selectedPrefixes.includes(prefix) ? 'contained' : 'outlined'}
                                onClick={() => handlePrefixToggle(prefix)}
                            >
                                {prefix}
                            </Button>
                        ))}
                    </ButtonGroup>
                    </Box>
                    <TextField
                        label="Search"
                        variant="outlined"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        sx={{ width: 300, marginTop: "10px" }}
                    />
                </Stack>

                {/* Courses and three buttons */}
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2, marginLeft: "10px", marginRight: "10px" }}>
                    <Typography variant="h6">Courses</Typography>
                    <Stack direction="row" spacing={1}>
                        <Button variant="outlined">+ Download Preferences</Button>
                        <Button variant="outlined">+ Link Courses</Button>
                        <Button variant="outlined">+ Add a Course</Button>
                    </Stack>
                </Stack>
                <Table>
                <TableHead>
                        <TableRow>
                            <TableCell style={{textAlign: 'center', width: "8%"}}><strong>Prefix</strong></TableCell>
                            <TableCell style={{textAlign: 'center', width: "12%"}}><strong>Title</strong></TableCell>
                            <TableCell style={{textAlign: 'center', width: "10%"}}><strong>Professors</strong></TableCell>
                            <TableCell style={{textAlign: 'center', width: "10%"}}><strong>Assigned TAs</strong></TableCell>
                            <TableCell style={{textAlign: 'center', width: "8%"}}><strong>Enrollment</strong></TableCell>
                            <TableCell style={{textAlign: 'center', width: "8%"}}><strong>TA Hours</strong></TableCell>
                            <TableCell style={{textAlign: 'center', width: "8%"}}><strong>Sections</strong></TableCell>
                            <TableCell style={{textAlign: 'center', width: "12%"}}><strong>Details</strong></TableCell>
                            <TableCell style={{textAlign: 'center', width: "8%"}}><strong>Assign Professor</strong></TableCell>
                            <TableCell style={{textAlign: 'center', width: "8%"}}><strong>Assign TA</strong></TableCell>
                            <TableCell style={{textAlign: 'center', width: "8%"}}><strong>Remove</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {courses.map((course, index) => (
                            <TableRow key={index}>
                                <TableCell style={{textAlign: "center", width: "8%"}}>
                                    <strong>{course.prefix}</strong>
                                </TableCell>
                                <TableCell style={{textAlign: "center", width: "12%"}}>
                                    <strong>{course.title}</strong>
                                </TableCell>
                                { course.professors.length > 0 ?
                                <TableCell style={{textAlign: "center", width: "10%"}}>
                                    {course.professors.map((prof, index) => (
                                    <React.Fragment key={index}><div style={{textAlign: "center"}}>
                                <Link href={`/manager/admin/professorDetails/${prof.substring(prof.indexOf(" ")+1)}_${prof.substring(0,prof.indexOf(" "))}`}>
                                    <strong style={{color: "blue"}}><u>{prof}</u></strong>
                                </Link>
                                {index < course.professors.length - 1 ? <strong>, </strong> : null}</div>
                                </React.Fragment>
                                ))}
                                </TableCell> :
                                <TableCell style={{textAlign: "center", width: "10%"}}>
                                <strong>None Assigned</strong>
                                </TableCell>
                                }
                                { course.tas.length > 0 ?
                                <TableCell style={{textAlign: "center", width: "10%"}}>
                                {course.tas.map((ta, tIndex) => (
                                <React.Fragment key={tIndex}><div style={{textAlign: "center"}}>
                                    <Link href={`/manager/admin/applicationDetails/${ta.substring(ta.indexOf(" ")+1)}_${ta.substring(0,ta.indexOf(" "))}`}>
                                        <strong style={{color: "blue"}}><u>{ta}</u></strong>
                                    </Link>
                                    {tIndex < course.professors.length - 1 ? <strong>, </strong> : null}</div>
                                </React.Fragment>
                                ))}
                                </TableCell> :
                                <TableCell style={{textAlign: "center", width: "10%"}}>
                                <strong>None Assigned</strong>
                                </TableCell>
                                }
                                <TableCell style={{textAlign: "center", width: "8%"}}>
                                <strong>{course.enrolled}/{course.seats}</strong>
                                </TableCell>
                                <TableCell style={{textAlign: "center", width: "8%"}}>
                                    <strong>{course.taHours}</strong>
                                </TableCell>
                                <TableCell style={{textAlign: "center", width: "8%"}}>
                                    <strong>{course.sections}</strong>
                                </TableCell>
                                <TableCell style={{textAlign: "center", width: "12%"}}>
                                    <Link href={`/manager/admin/courseDetails/${course.prefix}`}>
                                        <strong style={{color: "blue", textAlign: "center"}}><u>View Details and Prospective TAs</u></strong>
                                    </Link>
                                </TableCell>
                                <TableCell style={{textAlign: "center", width: "8%"}}>
                                    <Button sx={{border: "3px solid black", fontSize: "80%", color: "white", backgroundColor: "rgba(255, 127, 50, 0.8)", '&:hover': {backgroundColor: "rgba(255, 127, 50, 1)"}}}>
                                        + Assign a Professor
                                    </Button>
                                </TableCell>
                                <TableCell style={{textAlign: "center", width: "8%"}}>
                                    <Button sx={{border: "3px solid black", fontSize: "80%", color: "white", backgroundColor: "rgba(255, 127, 50, 0.8)", '&:hover': {backgroundColor: "rgba(255, 127, 50, 1)"}}}>
                                        + Assign a TA
                                    </Button>
                                </TableCell>
                                <TableCell style={{textAlign: "center", width: "8%"}}>
                                    <Button sx={{border: "3px solid black", fontSize: "80%", color: "white", backgroundColor: "rgba(255, 127, 50, 0.8)", '&:hover': {backgroundColor: "rgba(255, 127, 50, 1)"}}}>
                                        - Remove Course
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </Box>
    );
};

export default CourseTable;
