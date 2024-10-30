"use client"

import { Box, Typography, Button, ButtonGroup, Stack } from '@mui/material'
import React, { useState } from "react";
import CourseTable from "@/Component/courseManagementTable";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CableIcon from '@mui/icons-material/Cable';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { EnhancedTable, HeadCell } from '@/Component/customMangerTable';
import CourseDetails from "@/Component/courseDetails";
import CourseProfessors from "@/Component/manageCourseProfessors";
import CourseTAs from "@/Component/manageCourseTAs";
import AddCourseForm from '@/Component/addCourseForm';

export default function CourseSubPage({ coursesRows }: { coursesRows: any }) {
    let rowSelected: any;

    //Didn't want to mess with table function, so instead assuming backend gets list items in list form,
    //and we turn them to a string here to give as data to the table
    const makeListString = (list: string | any[]) => {
        let str: string = ""
        for (let i = 0; i < list.length; i++) {
            str = str + list[i];
            if (i !== list.length - 1) {
                str = str + ", "
            }
        }
        return str
    }

    //const coursesRows = [
    //    {
    //        id: 1,
    //        Prefix: "CAP5100",
    //        Title: "HCI",
    //        Professors: ['Jamie Ruiz', 'Someone Else'],
    //        Assigned_TAs: [],
    //        Current_Enrollment: 81,
    //        Max_Enrollment: 100,
    //        TA_Hours: 10,
    //        Sections: 1
    //    },
    //];

    const coursesHeadCells: HeadCell[] = [
        { id: 'Prefix', numeric: false, disablePadding: true, label: 'Course' },
        { id: 'Title', numeric: false, disablePadding: false, label: 'Full Title' },
        { id: 'Professors', numeric: false, disablePadding: true, label: 'Professors' },
        { id: 'Assigned_TAs', numeric: false, disablePadding: false, label: 'Assigned TAs' },
        { id: 'Current_Enrollment', numeric: true, disablePadding: true, label: 'Enrollment' },
        { id: 'TA_Hours', numeric: true, disablePadding: false, label: 'TA Hours' },
        { id: 'Sections', numeric: true, disablePadding: false, label: 'Sections' },
    ];

    const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
    const [addCourseDialogOpen, setAddCourseDialogOpen] = useState(false);
    const [manageCourseProfessorsOpen, setManageCourseProfessorsOpen] = useState(false);
    const [manageCourseTAsOpen, setManageCourseTAsOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<any>(null);

    const handleSelectCourse = (professor: { id: number; Professor: string; Courses: []; numTaHours: number, email: string }) => {
        setSelectedCourse(professor);
        console.log(professor);
        setDetailsDialogOpen(true);
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
        setDetailsDialogOpen(false);
        setAddCourseDialogOpen(false);
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

    const handleClickViewCourseDetails = () => {
        handleSelectCourse(rowSelected);
    }

    const handleClickManageCourseProfessors = () => {
        console.log("meow")
        handleSelectProfessorCourse(rowSelected);
    }

    const handleClickManageCourseTAs = () => {
        console.log("TAs")
        handleSelectTACourse(rowSelected);
    }

    const handleAddCourse = () =>{
        setAddCourseDialogOpen(true);
    }

    const handleRowSelect = (row: any) => {
        rowSelected = row; // Pass the selected row to handleViewDetails
    };

    const button = (
        <Stack direction="row" useFlexGap sx={{ width: 'fit-content', flexWrap: 'wrap' }}>
            <Button sx={{ margin: 1, width: 'max-content' }} variant="contained" onClick={handleClickViewCourseDetails} endIcon={<ReadMoreIcon />}>
                View Course Details
            </Button>
            <Button sx={{ margin: 1, width: 'max-content' }} variant="contained" onClick={handleClickManageCourseProfessors} endIcon={<PersonAddIcon />}>
                Manage Course Professors
            </Button>
            <Button sx={{ margin: 1, width: 'max-content' }} variant="contained" onClick={handleClickManageCourseTAs} endIcon={<PersonAddIcon />}>
                Manage Course TAs
            </Button>
            <Button sx={{ margin: 1, width: 'max-content' }} variant="contained" endIcon={<CableIcon />}>
                Link Course
            </Button>
            <Button sx={{ margin: 1, width: 'max-content' }} variant="contained" endIcon={<DeleteOutlineIcon />}>
                Remove Course
            </Button>
        </Stack>
    );
    return (
        <>

            <EnhancedTable
                rows={coursesRows}
                headCells={coursesHeadCells}
                title="Courses"
                button={button}
                advancedTooltip
                onRowSelect={handleRowSelect} // Pass the handleRowSelect function
            />
            <Box sx={{textAlign: "right"}}>
                <Button sx={{border: "3px solid black", width: "15%", height: "120%", color: "white", backgroundColor: "rgba(255, 127, 50, 0.8)", '&:hover': {backgroundColor: "rgba(255, 127, 50, 1)"}}}
                onClick={handleAddCourse}
                endIcon={<AddCircleIcon />}>
                    Add a Course
                </Button>
            </Box>
            {
                detailsDialogOpen && (
                    <CourseDetails
                        open={detailsDialogOpen}
                        close={handleCloseDialog}
                        params={selectedCourse}
                    />
                )
            }

            {
                addCourseDialogOpen && (
                    <AddCourseForm
                        open={addCourseDialogOpen}
                        onClose={handleCloseDialog}
                    />
                )
            }

            {
                manageCourseProfessorsOpen && (
                    <CourseProfessors
                        open={manageCourseProfessorsOpen}
                        close={handleCloseManageCourseProfessors}
                        params={selectedCourse}
                    />
                )
            }

            {
                manageCourseTAsOpen && (
                    <CourseTAs
                        open={manageCourseTAsOpen}
                        close={handleCloseManageCourseTAs}
                        params={selectedCourse}
                    />
                )
            }

        </>
    )
}
