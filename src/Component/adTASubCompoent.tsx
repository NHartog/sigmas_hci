"use client";

import React, { useState } from "react";
import { Box, Button, Typography } from '@mui/material';
import { EnhancedTable, HeadCell } from '@/Component/customTable';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TaPreferenceDialog from '@/Component/addTAPreference';
import ExplanationCard from "@/Component/explanationCard";

export default function AddTASubcomponent({rows1, rows2}: {rows1 : any, rows2: any}) {


    const headCells: HeadCell[] = [
        { id: 'prefix', numeric: false, disablePadding: true, label: 'Prefix' },
        { id: 'title', numeric: false, disablePadding: false, label: 'Title' },
        { id: 'numTaHours', numeric: true, disablePadding: false, label: 'Num TA Hours' },
        { id: 'enrollment', numeric: false, disablePadding: false, label: 'Enrollment' },
    ];

    const headCells2: HeadCell[] = [
        { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
        { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
        { id: 'prefString', numeric: false, disablePadding: false, label: 'Preference' },
        { id: 'assignedToYou', numeric: false, disablePadding: false, label: 'Assigned To You?' },
    ];

    const cardTitle = 'Welcome to TA Preference Manager';
    const cardDescription =
        'Selecting a Course from Assigned Courses will prefill information for that course.\n' +
        'Selecting a TA from Current TA Applied will prefill information from that TA.\n' +
        'Both of these will have the following option to be selected:';

    const title = "Assigned Courses";
    const title2 = "Current TA Applied";

    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedTA, setSelectedTA] = useState(null);
    const [courseSelectionKey, setCourseSelectionKey] = useState(0);
    const [taSelectionKey, setTASelectionKey] = useState(0);

    const handleAddTAPreference = () => {
        if (selectedCourse || selectedTA) {
            setDialogOpen(true);
        }
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const handleCourseRowSelect = (row: any | null) => {
        setSelectedCourse(row);
        setSelectedTA(null);
        setTASelectionKey(prev => prev + 1);
    };

    // Handle selection in the TA table
    const handleTARowSelect = (row: any | null) => {
        setSelectedTA(row);
        setSelectedCourse(null);
        setCourseSelectionKey(prev => prev + 1);
    };

    // Define buttons for each table
    const courseButton = (
        <Button
            sx={{ margin: 1, minWidth: 'max-content' }}
            variant="contained"
            onClick={handleAddTAPreference}
            endIcon={<PersonAddIcon />}
            disabled={!selectedCourse}
        >
            Add TA Preference
        </Button>
    );

    const taButton = (
        <Button
            sx={{ margin: 1, minWidth: 'max-content' }}
            variant="contained"
            onClick={handleAddTAPreference}
            endIcon={<PersonAddIcon />}
            disabled={!selectedTA}
        >
            Add TA Preference
        </Button>
    );

    const taOptions = [
        {
            label: 'Add TA Preference',
            description: 'When a course is selected, assign a TA for that course. When a TA is selected, assign the TA to a course',
            icon: <PersonAddIcon />
        },
    ];
    console.log("rows guy :",rows1)
    return (
        <Box style={{ padding: "20px" }}>
            <ExplanationCard title={cardTitle} description={cardDescription}>
                {taOptions.map((option) => (
                    <Box
                        key={option.label}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mb: 1,
                            flexWrap: 'wrap',
                        }}
                    >
                        <Button
                            variant="contained"
                            startIcon={option.icon}
                            sx={{ mr: 2, width: '220px' }}
                            disabled={!selectedCourse}
                        >
                            {option.label}
                        </Button>
                        <Typography variant="body1">{option.description}</Typography>
                    </Box>
                ))}
            </ExplanationCard>
            <EnhancedTable
                rows={rows1}
                headCells={headCells}
                title={title}
                button={courseButton}
                onRowSelect={handleCourseRowSelect}
                selectionKey={courseSelectionKey}
            />

            <EnhancedTable
                rows={rows2}
                headCells={headCells2}
                title={title2}
                button={taButton}
                onRowSelect={handleTARowSelect}
                selectionKey={taSelectionKey}
            />

            {dialogOpen && (
                <TaPreferenceDialog
                    open={dialogOpen}
                    close={handleCloseDialog}
                    students={rows2}
                    courses={rows1}
                    selectedCourse={selectedCourse}
                    selectedTA={selectedTA}
                />
            )}
        </Box>
    );
}
