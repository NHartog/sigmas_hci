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
import ExplanationCard from "@/Component/explanationCard";
import { deleteTAPreference, getSpecificCourse, getProfessors, getApplicants } from "@/actions/manager";

export default function CourseSubPage({ coursesRows }: { coursesRows: any }) {
    let rowSelected: any;

    // State to force re-render
    const [reload, setReload] = useState(false);

    const courseTitle = "Welcome to Course Manager"
    const courseDescription = 'Manage your courses efficiently using the options below. Select a course to perform various actions.';


    const coursesHeadCells: HeadCell[] = [
        { id: 'prefix', numeric: false, disablePadding: true, label: 'Course' },
        { id: 'title', numeric: false, disablePadding: false, label: 'Full Title' },
        { id: 'professors', numeric: false, disablePadding: true, label: 'Professors' },
        { id: 'assignedTas', numeric: false, disablePadding: false, label: 'Assigned TAs' },
        { id: 'currentEnrollment', numeric: true, disablePadding: true, label: 'Enrollment' },
        { id: 'numTaHours', numeric: true, disablePadding: false, label: 'TA Hours' },
        { id: 'sections', numeric: true, disablePadding: false, label: 'Sections' },
    ];

    const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
    const [addCourseDialogOpen, setAddCourseDialogOpen] = useState(false);
    const [areYouSureDialogOpen, setAreYouSureDialogOpen] = useState(false);
    const [manageCourseProfessorsOpen, setManageCourseProfessorsOpen] = useState(false);
    const [manageCourseTAsOpen, setManageCourseTAsOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<any>(null);
    const [rowPrefix, setRowPrefix] = useState('');
    const [selectedCourseProfs, setSelectedCourseProfs] = useState<any>(null);
    const [allProfs, setAllProfs] = useState<any>(null);
    const [allApplicants, setAllApplicants] = useState<any>(null);

    const handleSelectCourse = (professor: { id: number; Professor: string; Courses: []; numTaHours: number, email: string }) => {
        //setSelectedCourse(professor);
        setDetailsDialogOpen(true);
    };

    const handleSelectCourseForRemoval = (course: any) => {
        setSelectedCourse(course);
        setAreYouSureDialogOpen(true);
    };

    const handleSelectProfessorCourse = async  (professor: any) => {
        const curr_Course = await getSpecificCourse(selectedCourse.prefix);
        setSelectedCourseProfs(curr_Course.professors);
        const all_Profs = await getProfessors();
        setAllProfs(all_Profs);
        console.log(allProfs);
        setManageCourseProfessorsOpen(true);
    };

    const handleSelectTACourse = async (professor: any) => {
        const curr_Course = await getSpecificCourse(selectedCourse.prefix);
        setSelectedCourseProfs(curr_Course.professors);
        const all_Applicants = await getApplicants(selectedCourse.prefix);
        setAllApplicants(all_Applicants);
        console.log(allApplicants);
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

    const courseOptions = [
        {
            label: 'View Course Details',
            description: 'View all important details for a course',
            icon: <ReadMoreIcon />
        },
        {
            label: 'Manage Course Professors',
            description: 'Add or remove professors to selected course',
            icon: <PersonAddIcon />
        },
        {
            label: 'Manage Course TAs',
            description: 'Add or remove potential TAs to selected course',
            icon: <PersonAddIcon />
        },
        {
            label: 'Remove Course',
            description: 'Delete course from TAAS System',
            icon: <DeleteOutlineIcon />
        },
    ];

    return (
        <Box>
            <ExplanationCard title={courseTitle} description={courseDescription}>
                {courseOptions.map((option) => (
                    <Box
                        key={option.label}
                        sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
                    >
                        <Button
                            variant="contained"
                            startIcon={option.icon}
                            sx={{ mr: 2, width: '200px' }} // Set a fixed width
                            disabled={!selectedCourse}
                        >
                            {option.label}
                        </Button>
                        <Typography variant="body1">{option.description}</Typography>
                    </Box>
                ))}
            </ExplanationCard>


            <EnhancedTable
                rows={coursesRows}
                headCells={coursesHeadCells}
                title="Courses"
                button={button}
                advancedTooltip
                onRowSelect={handleRowSelect}
            />
            <Box sx={{ textAlign: "right" }}>
                <Button onClick={handleAddCourse} variant='contained' color='secondary' endIcon={<AddCircleIcon />}>
                    Add a Course
                </Button>
            </Box>
            {detailsDialogOpen && <CourseDetails open={detailsDialogOpen} close={handleCloseDialog} params={selectedCourse} />}
            {addCourseDialogOpen && <AddCourseForm open={addCourseDialogOpen} onClose={handleCloseDialog} />}
            {manageCourseProfessorsOpen && <CourseProfessors open={manageCourseProfessorsOpen} close={handleCloseDialog} params={selectedCourse} profs={selectedCourseProfs} allProfs={allProfs} />}
            {manageCourseTAsOpen && <CourseTAs open={manageCourseTAsOpen} close={handleCloseDialog} params={selectedCourse} allTAs={allApplicants}/>}
            {areYouSureDialogOpen && <AreYouSureDialog open={areYouSureDialogOpen} onClose={handleCloseDialog} toRemove={selectedCourse} />}
        </Box>
    );
}
