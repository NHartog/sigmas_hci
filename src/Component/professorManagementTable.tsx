"use client";

import React, { useState } from 'react';
import { Box, Button, ButtonGroup, TextField, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper, Stack } from '@mui/material';
import CourseDetailsDialog from './courseDetails'; // import the popup component

const ProfessorManagementTable = () => {
    const [searchText, setSearchText] = useState('');
    const [asgnFilters, setasgnFilters] = useState('');
    const [selectedPrefixes, setSelectedPrefixes] = useState<string[]>([]);
    const [openDialog, setOpenDialog] = useState(false); // controls popup visibility
    const [selectedCourse, setSelectedCourse] = useState(null); // holds course data for popup
    const assignFilters = ["Only Unassigned", "Only Assigned"];
    const codeFilters = ['CDA', 'CIS', 'COP', 'CGS'];

    const handlePrefixToggle = (prefix: string) => {
        setSelectedPrefixes(prev =>
            prev.includes(prefix) ? prev.filter(p => p !== prefix) : [...prev, prefix]
        );
    };

    const handleAssignmentToggle = (assgn: string) => {
        setasgnFilters(asgnFilters === assgn ? '' : assgn);
    };

    const openCourseDialog = (course: any) => {
        setSelectedCourse(course); // set the selected course
        setOpenDialog(true); // open the dialog
    };

    const closeCourseDialog = () => {
        setOpenDialog(false);
        setSelectedCourse(null);
    };

    // Sample professor data
    const professors = [
        { name: 'Jaime Ruiz', assigned: true, courses: [{ code: 'CAP5100', enrolled: 75, seats: 100, professor: 'Jaime Ruiz', linked_courses: [], tas: [] }]},
        { name: 'Professor 2', assigned: true, courses: [{ code: 'CNT5106C', enrolled: 50, seats: 80, professor: 'Professor 2', linked_courses: [], tas: [] }]},
        { name: 'Professor 3', assigned: false, courses: [] }
    ];

    return (
        <Box sx={{ padding: 1 }}>
            <Paper>
                {/* Filter and Search Section */}
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2, marginTop: "20px" }}>
                    <div style={{ display: "flex", gap: "16px" }}>
                        <Typography sx={{ ml: 2 }}>Filters:</Typography>
                        <ButtonGroup>
                            {codeFilters.map(prefix => (
                                <Button
                                    key={prefix}
                                    variant={selectedPrefixes.includes(prefix) ? 'contained' : 'outlined'}
                                    onClick={() => handlePrefixToggle(prefix)}
                                >
                                    {prefix}
                                </Button>
                            ))}
                        </ButtonGroup>
                        <ButtonGroup>
                            {assignFilters.map(assgn => (
                                <Button
                                    key={assgn}
                                    variant={asgnFilters === assgn ? 'contained' : 'outlined'}
                                    onClick={() => handleAssignmentToggle(assgn)}
                                >
                                    {assgn}
                                </Button>
                            ))}
                        </ButtonGroup>
                    </div>
                    <TextField
                        label="Search by Last Name"
                        variant="outlined"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        sx={{ width: 300, mr: 2 }}
                    />
                </Stack>

                {/* Professor Table */}
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                    <Typography variant="h6" sx={{ ml: 2 }}>Professors</Typography>
                    <Button variant="outlined" sx={{ mr: 2 }}>+ Add a Professor</Button>
                </Stack>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ textAlign: 'center' }}><strong>Professor Name</strong></TableCell>
                            <TableCell style={{ textAlign: 'center' }}><strong>Courses Assigned</strong></TableCell>
                            <TableCell style={{ textAlign: 'center' }}><strong>Assign Course</strong></TableCell>
                            <TableCell style={{ textAlign: 'center' }}><strong>More Details</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {professors.map((professor, index) => (
                            <TableRow key={index}>
                                <TableCell style={{ textAlign: "center" }}><strong>{professor.name}</strong></TableCell>
                                <TableCell style={{ textAlign: "center" }}>
                                    {professor.courses.map((course, cIndex) => (
                                        <span key={cIndex} onClick={() => openCourseDialog(course)} style={{ cursor: 'pointer', color: "blue", textDecoration: "underline" }}>
                                            {course.code}
                                            {cIndex < professor.courses.length - 1 ? ', ' : ''}
                                        </span>
                                    ))}
                                    {!professor.assigned && <strong>Unassigned</strong>}
                                </TableCell>
                                <TableCell style={{ textAlign: "center" }}>
                                    <Button sx={{ border: "3px solid black", width: "60%", height: "100%", color: "white", backgroundColor: "rgba(255, 127, 50, 0.8)", '&:hover': { backgroundColor: "rgba(255, 127, 50, 1)" } }}>
                                        + Assign A Course
                                    </Button>
                                </TableCell>
                                <TableCell style={{ textAlign: "center" }}>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>

            {/* Popup Dialog */}
            {selectedCourse && (
                <CourseDetailsDialog
                    open={openDialog}
                    onClose={closeCourseDialog}
                    course={selectedCourse}
                />
            )}
        </Box>
    );
};

export default ProfessorManagementTable;
