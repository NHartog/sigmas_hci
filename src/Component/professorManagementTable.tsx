"use client";

import React, { useState } from 'react';
import { Box, Button, ButtonGroup, TextField, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper, Stack, Divider } from '@mui/material';
import Link from "next/link";
import CourseDetails from "@/Component/courseDetails";

const ProfessorManagementTable = () => {

    const [searchText, setSearchText] = useState('');
    const [asgnFilters, setasgnFilters] = useState('');
    const [selectedPrefixes, setSelectedPrefixes] = useState<string[]>([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

    const assignFilters = ["Only Unassigned", "Only Assigned"];
    const codeFilters = ['CDA', 'CIS', 'COP', 'CGS']

    const handlePrefixToggle = (prefix: string) => {
        if (selectedPrefixes.includes(prefix)) {
            setSelectedPrefixes(selectedPrefixes.filter((p) => p !== prefix));
        } else {
            setSelectedPrefixes([...selectedPrefixes, prefix]);
        }
    };

    const handleAssignmentToggle = (assgn: string) => {
        if(asgnFilters == assgn){
            setasgnFilters('');
        }else{
            setasgnFilters(assgn);
        }

    };

    const openDialog = (course: string) => {
        setSelectedCourse(course);
        setDialogOpen(true);
    };

    const closeDialog = () => {
        setDialogOpen(false);
        setSelectedCourse(null);
    };

    const courseDetails = {course: `CAP5100`, enrolled: 81, seats: 144, professor: "Jaime Ruiz", linked_courses: "N/A", tas: [], prosp_tas: [{name: "John Adams", status: "Undergraduate"}]}
    //In the future, we'll get this based on backend
    const professors = [{name: 'Jaime Ruiz', assigned: true, courses: ['CAP5100', 'CAP5900']},
                        {name: 'Professor 2', assigned: true, courses: ['CNT5106C']},
                        {name: 'Professor 3', assigned: false, courses: [null]}]

        return (
        <Box sx={{padding: 1}}><Paper>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2, marginTop: "20px" }}>
                <div style={{display: "flex", gap: "16px"}}>
                    <div style={{marginLeft: "20px", verticalAlign: "middle"}}><span>Filters: </span> </div>
                    <div><ButtonGroup>
                        {codeFilters.map((prefix) => (
                            <Button
                                key={prefix}
                                variant={selectedPrefixes.includes(prefix) ? 'contained' : 'outlined'}
                                onClick={() => handlePrefixToggle(prefix)}
                            >
                                {prefix}
                            </Button>
                        ))}
                    </ButtonGroup>
                    </div><div>
                    <ButtonGroup>
                    {assignFilters.map((assgn) => (
                        <Button
                        key={assgn}
                        variant={asgnFilters == assgn ? 'contained' : 'outlined'}
                        onClick={() => handleAssignmentToggle(assgn)}>
                        {assgn}
                        </Button>
                    ))}
                </ButtonGroup>
                </div>
                </div>

            <TextField
                        label="Search by Last Name"
                        variant="outlined"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        sx={{ width: 300, marginRight: "20px", marginTop: "20px"}}
                    />
            </Stack>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                    <Typography variant="h6" style={{marginLeft: "20px"}}>Professors</Typography>
                    <Button variant="outlined" sx={{marginRight: "20px"}}>+ Add a Professor</Button>
            </Stack>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell style={{textAlign: 'center'}}><strong>Professor Name</strong></TableCell>
                        <TableCell style={{textAlign: 'center'}}><strong>Courses Assigned</strong></TableCell>
                        <TableCell style={{textAlign: 'center'}}><strong>Assign Course</strong></TableCell>
                        <TableCell style={{textAlign: 'center'}}><strong>More Details</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {professors.map((professor, index) => (
                        <TableRow key={index}>
                            <TableCell style={{textAlign: "center"}}><strong>{professor.name}</strong></TableCell>
                            <TableCell style={{textAlign: "center"}}>
                                {professor.courses.map((course, cIndex) => (
                                    course ? (
                                        <React.Fragment key={cIndex}>
                                            <div style={{ textAlign: "center" }}>
                                                    <span style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
                                                          onClick={() => openDialog(course)}>
                                                        {course}
                                                    </span>
                                            </div>
                                        </React.Fragment>
                                    ) : <strong>Unassigned</strong>
                                ))}
                            </TableCell>
                            <TableCell style={{textAlign: "center"}}>
                                <Button sx={{border: "3px solid black", width: "60%", height: "100%", color: "white", backgroundColor: "rgba(255, 127, 50, 0.8)", '&:hover': {backgroundColor: "rgba(255, 127, 50, 1)"}}}>
                                    + Assign A Course
                                </Button>
                            </TableCell>
                            <TableCell style={{textAlign: "center"}}>
                                <Link href={`/manager/admin/professorDetails/${professor.name.substring(professor.name.indexOf(" ")+1)}_${professor.name.substring(0,professor.name.indexOf(" "))}`}>
                                <strong style={{color: "blue"}}><u>Professor Details</u></strong>
                                </Link>
                                </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
            <CourseDetails open={dialogOpen} close={closeDialog} params={courseDetails || ''} />
        </Box>
    )

};

export default ProfessorManagementTable;