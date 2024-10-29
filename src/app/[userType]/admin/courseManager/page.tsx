"use client";

import {Box, Typography, Button, ButtonGroup} from '@mui/material'
import CourseTable from "@/Component/courseManagementTable";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CableIcon from '@mui/icons-material/Cable';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import { EnhancedTable, HeadCell } from '@/Component/customMangerTable';
import React, {useState} from "react";
import CourseDetails from "@/Component/courseDetails";
import CourseProfessors from "@/Component/manageCourseProfessors";
import CourseTAs from "@/Component/manageCourseTAs";

let rowSelected;

//Didn't want to mess with table function, so instead assuming backend gets list items in list form,
//and we turn them to a string here to give as data to the table
const makeListString = (list: string | any[]) => {
    let str: string = ""
    for (let i = 0; i < list.length; i++){
        str = str + list[i];
        if (i !== list.length - 1){
            str = str + ", "
        }
    }
    return str
}

const coursesRows = [
    { id: 1, Prefix: "CAP5100", Title: "HCI", Professors: ['Jamie Ruiz', 'Someone Else'], Assigned_TAs: [], Current_Enrollment: 81, Max_Enrollment:100, TA_Hours: 10, Sections: 1},
];

const coursesHeadCells: HeadCell[] = [
    { id: 'Prefix', numeric: false, disablePadding: true, label: 'Course' },
    { id: 'Title', numeric: false, disablePadding: false, label: 'Full Title' },
    { id: 'Professors', numeric: false, disablePadding: true, label: 'Professors' },
    { id: 'Assigned_TAs', numeric: false, disablePadding: false, label: 'Assigned TAs' },
    { id: 'Current_Enrollment', numeric: true, disablePadding: true, label: 'Enrollment' },
    { id: 'TA_Hours', numeric: true, disablePadding: false, label: 'TA Hours' },
    { id: 'Sections', numeric: true, disablePadding: false, label: 'Sections' },
];

export default function LandingPage() {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [manageCourseProfessorsOpen, setManageCourseProfessorsOpen] = useState(false);
    const [manageCourseTAsOpen, setManageCourseTAsOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);

    const handleSelectCourse = (professor: { id: number; Professor: string; Courses: []; numTaHours: number, email: string }) => {
        setSelectedCourse(professor);
        console.log(professor);
        setDialogOpen(true);
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
        console.log("meow")
        handleSelectProfessorCourse(rowSelected);
    }

    const handleClickManageCourseTAs =() => {
        console.log("TAs")
        handleSelectTACourse(rowSelected);
    }

    const handleRowSelect = (row: any) => {
        rowSelected = row; // Pass the selected row to handleViewDetails
    };
    
    const button = (
        <ButtonGroup sx={{marginTop: "3px"}}>
            <Button sx={{ margin: 1, maxWidth: 'max-content' }} variant="contained" onClick={handleClickViewCourseDetails} endIcon={<ReadMoreIcon />}>
                View Course Details
            </Button>
            <Button sx={{ margin: 1, maxWidth: 'max-content' }} variant="contained" onClick={handleClickManageCourseProfessors} endIcon={<PersonAddIcon />}>
                Manage Course Professors
            </Button>
            <Button sx={{ margin: 1, maxWidth: 'max-content' }} variant="contained" onClick={handleClickManageCourseTAs} endIcon={<PersonAddIcon />}>
                Manage Course TAs
            </Button>
            <Button sx={{ margin: 1, maxWidth: 'max-content' }} variant="contained" endIcon={<CableIcon />}>
                Link Course
            </Button>
            <Button sx={{ margin: 1, maxWidth: 'max-content' }} variant="contained" endIcon={<DeleteOutlineIcon />}>
                Remove Course
            </Button>
        </ButtonGroup>
    );

    return (
        <Box sx={{ padding: 2 }}>
           <EnhancedTable
               rows={coursesRows}
               headCells={coursesHeadCells}
               title="Courses"
               button={button}
               advancedTooltip
               onRowSelect={handleRowSelect} // Pass the handleRowSelect function
           />
            {dialogOpen && (
                <CourseDetails
                    open={dialogOpen}
                    close={handleCloseDialog}
                    params={selectedCourse}
                />
            )}

            {manageCourseProfessorsOpen && (
                <CourseProfessors
                    open={manageCourseProfessorsOpen}
                    close={handleCloseManageCourseProfessors}
                    params={selectedCourse}
                />
            )}

            {manageCourseTAsOpen && (
                <CourseTAs
                    open={manageCourseTAsOpen}
                    close={handleCloseManageCourseTAs}
                    params={selectedCourse}
                />
            )}
        </Box>
    );
}