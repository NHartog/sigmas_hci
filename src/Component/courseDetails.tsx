"use client";

import React, { useState } from 'react';
import { Box, Button, ButtonGroup, Card, TextField, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper, Stack } from '@mui/material';
import Link from "next/link";

const CourseDetails = ({params}) => {

    const gradLevel = ["PhD", "Graduate", "Undergraduate", "All"]
    const [selectedStatus, setStatus] = useState<string[]>([]);
    const [searchText, setSearchText] = useState('');

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

    return (
        <Box style={{ padding: "20px", textAlign: "center", gridTemplateColumns: '1fr 1fr'}}>
            <Box sx={{backgroundColor: "rgba(255, 127, 50, 1)", 
                borderTopLeftRadius: "15px", borderTopRightRadius: "15px",
                padding: "20px"
            }}>
                <Typography variant="h3">
                {params.course} Details
                </Typography>
            </Box>
            
            <Box sx={{display: "flex", flexDirection: "row", alignItems: "stretch"}}>
                <Box sx={{width: "40%"}}>
                    <Card sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                        <Typography sx={{textAlign: "left", fontSize: "150%", padding: "10px", margin: "5px", width: "50%"}}>
                            Students Enrolled: 
                        </Typography>
                        <Typography sx={{textAlign: "right", fontSize: "150%", padding: "10px", margin: "5px", width: "50%"}}>
                            {params.enrolled}
                        </Typography>
                    </Card>
                    <Card sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                        <Typography sx={{textAlign: "left", fontSize: "150%", padding: "10px", margin: "5px", width: "50%"}}>
                            Total Seats: 
                        </Typography>
                        <Typography sx={{textAlign: "right", fontSize: "150%", padding: "10px", margin: "5px", width: "50%"}}>{params.seats}</Typography>
                    </Card>
                    <Card sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                        <Typography sx={{textAlign: "left", fontSize: "150%", padding: "10px", margin: "5px", width: "50%"}}>
                            Professor: 
                        </Typography>
                        <Typography sx={{textAlign: "right", fontSize: "150%", padding: "10px", margin: "5px", width: "50%"}}>{params.professor}</Typography>
                    </Card>
                    <Card sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                        <Typography sx={{textAlign: "left", fontSize: "150%", padding: "10px", margin: "5px", width: "50%"}}>
                            Linked Courses: 
                        </Typography>
                        <Typography sx={{textAlign: "right", fontSize: "150%", padding: "10px", margin: "5px", width: "50%"}}>{params.linked_courses}</Typography>
                    </Card>
                    <Card sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                        <Typography sx={{textAlign: "left", fontSize: "150%", padding: "10px", margin: "5px", width: "50%"}}>
                            Assigned TAs: 
                        </Typography>
                        <Box sx={{padding: "10px", margin: "5px", width: "50%", display: "flex", flexDirection: "column", alignItems: "right" }}>
                            {params.tas.map((ta: string) => (
                                <Typography sx={{textAlign: "right", fontSize: "150%"}}>{ta}</Typography>
                            ))}
                            {params.tas.length > 0 ? null : <Typography sx={{textAlign: "right", fontSize: "150%"}}>None Assigned</Typography>}
                            <Button sx={{alignSelf: "flex-end", border: "3px solid black", width: "80%", color: "white", backgroundColor: "rgba(255, 127, 50, 0.8)", '&:hover': {backgroundColor: "rgba(255, 127, 50, 1)"}}}>
                                + Assign a TA
                            </Button>
                        </Box>
                    </Card>
                </Box>
                <Box sx={{width: "60%"}}>
                    <Paper sx={{paddingTop: "10px", height: "100%"}}>
                    <Typography variant="h4">Prospective Applicants</Typography>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2, marginTop: "10px" }}>
                        <div style={{display: "flex", gap: "16px"}}>
                            <div style={{marginLeft: "10px", marginTop: "13px", verticalAlign: "middle"}}><span>Filters: </span> </div>
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
                        </div>
                        
                        <TextField
                                    label="Search by Last Name"
                                    variant="outlined"
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                    sx={{ width: 300, marginRight: "10px", marginTop: "10px"}}
                                />
                        </Stack>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{textAlign: 'center'}}><strong>Applicant Name</strong></TableCell>
                                    <TableCell style={{textAlign: 'center'}}><strong>Status</strong></TableCell>
                                    <TableCell style={{textAlign: 'center'}}><strong>Application</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {params.prosp_tas.map((prosp_ta: any) => (
                                    <TableRow>
                                        <TableCell style={{textAlign: "center"}}><strong>{prosp_ta.name}</strong></TableCell>
                                        <TableCell style={{textAlign: "center"}}><strong>{prosp_ta.status}</strong></TableCell>
                                        <TableCell style={{textAlign: "center"}}>
                                            <Link href={`/manager/admin/applicationDetails/${prosp_ta.name.substring(prosp_ta.name.indexOf(" ")+1)}_${prosp_ta.name.substring(0,prosp_ta.name.indexOf(" "))}`}>
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
        </Box>
    );
};

export default CourseDetails;