"use client";

import React, { useState } from 'react';
import { Box, Button, ButtonGroup, TextField, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper, Stack } from '@mui/material';

const CourseTable = () => {
    // State for selected prefixes
    const [selectedPrefixes, setSelectedPrefixes] = useState<string[]>([]);
    const [searchText, setSearchText] = useState('');

    // Example course data
    const courses = [
        { prefix: 'CAP5100', title: 'HCI', professor: 'Jamie Ruiz', enrollment: '75/100', taHours: '10', sections: '1' },
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
        <Box sx={{ padding: 1 }}>
            {/* Table */}
            <Paper elevation={3}>
                {/* Top Section with multi-select buttons and search bar */}
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                    <ButtonGroup>
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
                    <TextField
                        label="Search"
                        variant="outlined"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        sx={{ width: 300 }}
                    />
                </Stack>

                {/* Courses and three buttons */}
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                    <Typography variant="h6">Courses</Typography>
                    <Stack direction="row" spacing={1}>
                        <Button variant="outlined">Button 1</Button>
                        <Button variant="outlined">Button 2</Button>
                        <Button variant="outlined">Button 3</Button>
                    </Stack>
                </Stack>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Prefix</strong></TableCell>
                            <TableCell><strong>Title</strong></TableCell>
                            <TableCell><strong>Professors</strong></TableCell>
                            <TableCell><strong>Enrollment</strong></TableCell>
                            <TableCell><strong>TA Hours</strong></TableCell>
                            <TableCell><strong>Sections</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {courses.map((course, index) => (
                            <TableRow key={index}>
                                <TableCell>{course.prefix}</TableCell>
                                <TableCell>{course.title}</TableCell>
                                <TableCell>{course.professor}</TableCell>
                                <TableCell>{course.enrollment}</TableCell>
                                <TableCell>{course.taHours}</TableCell>
                                <TableCell>{course.sections}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </Box>
    );
};

export default CourseTable;
