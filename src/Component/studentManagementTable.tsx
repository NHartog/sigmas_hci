"use client";

import React, { useState } from 'react';
import { Box, Button, ButtonGroup, Card, TextField, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper, Stack } from '@mui/material';
import Link from "next/link";

const StudentManagementTable = () => {

    const gradLevel = ["PhD", "Graduate", "Undergraduate", "All"];
    const assignFilters = ["Only Unassigned", "Only Assigned"];
    const [selectedStatus, setStatus] = useState<string[]>([]);
    const [searchText, setSearchText] = useState('');
    const [asgnFilters, setasgnFilters] = useState('');

    const handleStatus = (status: string) => {
        if(status === "All" && !selectedStatus.includes(status)){
            setStatus(["PhD", "Graduate", "Undergraduate", "All"])
        }
        else if(status=="All"){
            setStatus([])
        }
        else if (selectedStatus.includes(status)) {
            setStatus(selectedStatus.filter((p) => p !== status && p !== "All"));
        } else {
            setStatus([...selectedStatus, status]);
        }
    };

    const handleAssignmentToggle = (assgn: string) => {
        if(asgnFilters == assgn){
            setasgnFilters('');
        }else{
            setasgnFilters(assgn);
        }

    };

    //Will pull from the backend in the future
    const all_tas = [{name: "John Adams", status: "Undergraduate", assignment: "CAP5100"}]

    return (
        <Box style={{ padding: "20px", textAlign: "center", gridTemplateColumns: '1fr 1fr'}}>
            <Box sx={{padding: 1}}>
                <Paper sx={{paddingTop: "10px", height: "100%"}}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2, marginTop: "20px" }}>
                    <div style={{display: "flex", gap: "16px"}}>
                        <div style={{marginLeft: "10px", marginTop: "15px", verticalAlign: "middle"}}><span>Filters: </span> </div>
                        <div><ButtonGroup sx={{marginTop: "8px"}}>
                            {gradLevel.map((status) => (
                                <Button
                                    key={status}
                                    variant={selectedStatus.includes(status) || selectedStatus.includes("All")  ? 'contained' : 'outlined'}
                                    onClick={() => handleStatus(status)}
                                >
                                    {status}
                                </Button>
                            ))}
                        </ButtonGroup>
                        </div>
                        <ButtonGroup sx={{marginTop: "8px"}}>
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
                        
                    <TextField
                        label="Search by Last Name"
                        variant="outlined"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        sx={{ width: 300, marginRight: "10px", marginTop: "10px"}}
                    />
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                            <Typography variant="h6" style={{marginLeft: "20px"}}>Applicants</Typography>
                            <Button variant="outlined" sx={{marginRight: "20px"}}>+ Add an Applicant</Button>
                    </Stack>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{textAlign: 'center'}}><strong>Applicant Name</strong></TableCell>
                                <TableCell style={{textAlign: 'center'}}><strong>Status</strong></TableCell>
                                <TableCell style={{textAlign: 'center'}}><strong>Assigned Course</strong></TableCell>
                                <TableCell style={{textAlign: 'center'}}><strong>Application</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {all_tas.map((ta: any) => (
                                <TableRow>
                                    <TableCell style={{textAlign: "center"}}><strong>{ta.name}</strong></TableCell>
                                    <TableCell style={{textAlign: "center"}}><strong>{ta.status}</strong></TableCell>
                                    { ta.assignment ?
                                        <TableCell style={{textAlign: "center"}}>
                                          <Link href={`/manager/admin/courseDetails/${ta.assignment}`}>
                                                <strong style={{color: "blue"}}><u>{ta.assignment}</u></strong>
                                            </Link>
                                        </TableCell>
                                        :
                                        <TableCell style={{textAlign: "center"}}>
                                        <Button sx={{border: "3px solid black", width: "40%", height: "80%", color: "white", backgroundColor: "rgba(255, 127, 50, 0.8)", '&:hover': {backgroundColor: "rgba(255, 127, 50, 1)"}}}>
                                            + Assign
                                        </Button>
                                        </TableCell>
                                    }
                                    <TableCell style={{textAlign: "center"}}>
                                        <Link href={`/manager/admin/applicationDetails/${ta.name.substring(ta.name.indexOf(" ")+1)}_${ta.name.substring(0,ta.name.indexOf(" "))}`}>
                                    <strong style={{color: "blue"}}><u>View Application</u></strong>
                                    </Link>
                                    </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </Box>
        </Box>
    );
};

export default StudentManagementTable;