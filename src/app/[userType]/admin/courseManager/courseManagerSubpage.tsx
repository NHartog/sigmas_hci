"use client";

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
import AreYouSureDialog from '@/Component/areYouSureDialog';
import { deleteTAPreference } from "@/actions/manager";

export default function CourseSubPage({ coursesRows }: { coursesRows: any }) {
    let rowSelected: any;

    // State to force re-render
    const [reload, setReload] = useState(false);

    // Utility function to create list string
    const makeListString = (list: string | any[]) => {
        return list.join(", ");
    };

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
    const [areYouSureDialogOpen, setAreYouSureDialogOpen] = useState(false);
    const [manageCourseProfessorsOpen, setManageCourseProfessorsOpen] = useState(false);
    const [manageCourseTAsOpen, setManageCourseTAsOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<any>(null);
    const [rowPrefix, setRowPrefix] = useState('');

    const handleSelectCourse = (professor: { id: number; Professor: string; Courses: []; numTaHours: number, email: string }) => {
        setSelectedCourse(professor);
        setDetailsDialogOpen(true);
    };

    const handleSelectCourseForRemoval = (course: any) => {
        setSelectedCourse(course);
        setAreYouSureDialogOpen(true);
    };

    const handleSelectProfessorCourse = (professor: any) => {
        setSelectedCourse(professor);
        setManageCourseProfessorsOpen(true);
    };

    const handleSelectTACourse = (professor: any) => {
        setSelectedCourse(professor);
        setManageCourseTAsOpen(true);
    };

    // Function to close all dialogs and force re-render
    const handleCloseDialog = () => {
        setDetailsDialogOpen(false);
        setAddCourseDialogOpen(false);
        setAreYouSureDialogOpen(false);
        setSelectedCourse(null);
        window.location.reload(); // Reload the entire page
    };

    const handleClickViewCourseDetails = () => handleSelectCourse(rowSelected);
    const handleClickManageCourseProfessors = () => handleSelectProfessorCourse(rowSelected);
    const handleClickManageCourseTAs = () => handleSelectTACourse(rowSelected);
    const handleAddCourse = () => setAddCourseDialogOpen(true);
    const handleAreYouSure = () => handleSelectCourseForRemoval(selectedCourse);

    const handleRowSelect = (row: any) => {
        rowSelected = row;
        setSelectedCourse(row);
        setRowPrefix(row.Prefix);
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
            <Button sx={{ margin: 1, width: 'max-content' }} variant="contained" onClick={handleAreYouSure} endIcon={<DeleteOutlineIcon />}>
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
                onRowSelect={handleRowSelect}
            />
            <Box sx={{ textAlign: "right" }}>
                <Button sx={{ border: "3px solid black", width: "15%", height: "120%", color: "white", backgroundColor: "rgba(255, 127, 50, 0.8)", '&:hover': { backgroundColor: "rgba(255, 127, 50, 1)" } }}
                        onClick={handleAddCourse}
                        endIcon={<AddCircleIcon />}>
                    Add a Course
                </Button>
            </Box>
            {detailsDialogOpen && <CourseDetails open={detailsDialogOpen} close={handleCloseDialog} params={selectedCourse} />}
            {addCourseDialogOpen && <AddCourseForm open={addCourseDialogOpen} onClose={handleCloseDialog} />}
            {manageCourseProfessorsOpen && <CourseProfessors open={manageCourseProfessorsOpen} close={handleCloseDialog} params={selectedCourse} />}
            {manageCourseTAsOpen && <CourseTAs open={manageCourseTAsOpen} close={handleCloseDialog} params={selectedCourse} />}
            {areYouSureDialogOpen && <AreYouSureDialog open={areYouSureDialogOpen} onClose={handleCloseDialog} toRemove={selectedCourse} />}
        </>
    );
}
