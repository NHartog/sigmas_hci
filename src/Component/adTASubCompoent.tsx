"use client";

import { Box, Button, Typography } from '@mui/material'
import { EnhancedTable, HeadCell } from '@/Component/customTable'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { getCourses, getTAs } from '@/actions/professor';
import TaPreferenceDialog from '@/Component/addTAPreference';
import CourseDetails from "@/Component/courseDetails";
import React, {useState} from "react";

let rowSelected : any = null;

export default  function AddTASubcomponent({rows, rows2}:{rows: any, rows2: any}) {

    const headCells: HeadCell[] = [
        {
            id: 'prefix',
            numeric: false,
            disablePadding: true,
            label: 'Prefix',
        },
        {
            id: 'title',
            numeric: false,
            disablePadding: false,
            label: 'Title',
        },
        {
            id: 'numTaHours',
            numeric: true,
            disablePadding: false,
            label: 'Num TA Hours',
        },
        {
            id: 'enrollment',
            numeric: false,
            disablePadding: false,
            label: 'Enrollment',
        }
    ];

    const headCells2: HeadCell[] = [
        {
            id: 'name',
            numeric: false,
            disablePadding: true,
            label: 'Name',
        },
        {
            id: 'status',
            numeric: false,
            disablePadding: false,
            label: 'Status',
        },
        {
            id: 'assignedToYou',
            numeric: false,
            disablePadding: false,
            label: 'Assigned To You?',
        }
    ];



    const title = "Assigned Courses"
    const title2 = "Current TA Applied"

    const [dialogOpen, setDialogOpen] = useState(false);
    const [manageCourseProfessorsOpen, setManageCourseProfessorsOpen] = useState(false);
    const [manageCourseTAsOpen, setManageCourseTAsOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);

    const handleSelectCourse = (professor: { id: number; Professor: string; Courses: []; numTaHours: number, email: string }) => {
        setSelectedCourse(professor);
        setDialogOpen(true);
        console.log(rowSelected);
    };

    const handleSelectProfessorCourse = (professor: { id: number; Professor: string; Courses: []; numTaHours: number, email: string }) => {
        setSelectedCourse(professor);
        setManageCourseProfessorsOpen(true);
    };

    const handleSelectTACourse = (professor: { id: number; Professor: string; Courses: []; numTaHours: number, email: string }) => {
        setSelectedCourse(professor);
        setManageCourseTAsOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setSelectedCourse(null);
    };

    const handleCloseManageCourseProfessors = () => {
        setManageCourseProfessorsOpen(false);
        setSelectedCourse(null);
    };

    const handleCloseManageCourseTAs = () => {
        setManageCourseTAsOpen(false);
        setSelectedCourse(null);
    };

    const handleClickViewCourseDetails =() => {
        handleSelectCourse(rowSelected);
    }

    const handleClickManageCourseProfessors =() => {
        handleSelectProfessorCourse(rowSelected);
    }

    const handleClickManageCourseTAs =() => {
        handleSelectTACourse(rowSelected);
    }

    const handleRowSelect = (row: any) => {
        rowSelected = row; // Pass the selected row to handleViewDetails
    };


    const button = <Button sx={{ margin: 1, minWidth: 'max-content' }} variant="contained" onClick={handleClickViewCourseDetails} endIcon={<PersonAddIcon />}>
        Add TA Preference
    </Button>


    const button2 = <Button sx={{ margin: 1, minWidth: 'max-content' }} variant="contained" onClick={handleClickViewCourseDetails} endIcon={<PersonAddIcon />}>
        Add TA Preference
    </Button>

    return (
        <Box style={{ padding: "20px" }}>
            <EnhancedTable rows={rows} headCells={headCells} title={title} button={button} onRowSelect={handleRowSelect} />
            {dialogOpen && (
                <TaPreferenceDialog open={dialogOpen} close={handleCloseDialog} students={rows2} courses={rows} selected = {rowSelected}/>
            )}
            <EnhancedTable rows={rows2} headCells={headCells2} title={title2} button={button2} onRowSelect={handleRowSelect}/>
            {dialogOpen && (
                <TaPreferenceDialog open={dialogOpen} close={handleCloseDialog} students={rows2} courses={rows} selected = {rowSelected}/>
            )}
        </Box>
    );
}