import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, Typography, Card, Box, Button, Stack, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';

interface CourseDetailsDialogProps {
    open: boolean;
    onClose: () => void;
    course: any; // Customize type as needed
}

const CourseDetailsDialog: React.FC<CourseDetailsDialogProps> = ({ open, onClose, course }) => {
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>{course.course} Details</DialogTitle>
            <DialogContent>
                <Box style={{ padding: '20px' }}>
                    <Typography variant="h6">Course Information</Typography>
                    <Card sx={{ padding: '10px', mb: 2 }}>
                        <Typography><strong>Students Enrolled:</strong> {course.enrolled}</Typography>
                        <Typography><strong>Total Seats:</strong> {course.seats}</Typography>
                        <Typography><strong>Professor:</strong> {course.professor}</Typography>
                        <Typography><strong>Linked Courses:</strong> {course.linked_courses}</Typography>
                        <Typography><strong>Assigned TAs:</strong> {course.tas.join(', ') || 'None Assigned'}</Typography>
                    </Card>

                    <Paper sx={{ padding: '20px' }}>
                        <Typography variant="h6">Prospective Applicants</Typography>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><strong>Applicant Name</strong></TableCell>
                                    <TableCell><strong>Status</strong></TableCell>
                                    <TableCell><strong>Application</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {/*{course.prosp_tas.map((prosp_ta: any, index: number) => (*/}
                                {/*    <TableRow key={index}>*/}
                                {/*        <TableCell>{prosp_ta.name}</TableCell>*/}
                                {/*        <TableCell>{prosp_ta.status}</TableCell>*/}
                                {/*        <TableCell>*/}
                                {/*            <strong style={{ color: 'blue', cursor: 'pointer' }}>View Application</strong>*/}
                                {/*        </TableCell>*/}
                                {/*    </TableRow>*/}
                                {/*))}*/}
                            </TableBody>
                        </Table>
                    </Paper>
                </Box>
            </DialogContent>
            <Button onClick={onClose} color="primary" variant="contained" sx={{ m: 2 }}>Close</Button>
        </Dialog>
    );
};

export default CourseDetailsDialog;
