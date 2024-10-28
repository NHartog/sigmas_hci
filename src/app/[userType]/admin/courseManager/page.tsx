"use server";

import {Box, Typography, Button, ButtonGroup} from '@mui/material'
import CourseTable from "@/Component/courseManagementTable";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CableIcon from '@mui/icons-material/Cable';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import { EnhancedTable, HeadCell } from '@/Component/customMangerTable';

export default async function LandingPage() {

    //Didn't want to mess with table function, so instead assuming backend gets list items in list form,
    //and we turn them to a string here to give as data to the table
    const makeListString = (list) => {
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
        { id: 1, Course: "CAP5100", Full_Title: "HCI", Professors: makeListString(['Jamie Ruiz']), Assigned_TAs: [], Enrollment: 81, TA_Hours: 10, Sections: 1},
    ];

    const coursesHeadCells: HeadCell[] = [
        { id: 'Course', numeric: false, disablePadding: true, label: 'Course' },
        { id: 'Full_Title', numeric: false, disablePadding: false, label: 'Full Title' },
        { id: 'Professors', numeric: false, disablePadding: true, label: 'Professors' },
        { id: 'Assigned_TAs', numeric: false, disablePadding: false, label: 'Assigned TAs' },
        { id: 'Enrollment', numeric: true, disablePadding: true, label: 'Enrollment' },
        { id: 'TA_Hours', numeric: true, disablePadding: false, label: 'TA Hours' },
        { id: 'Sections', numeric: true, disablePadding: false, label: 'Sections' },
    ];

    const button = (
        <ButtonGroup sx={{marginTop: "3px"}}>
            <Button sx={{ margin: 1, minWidth: 'max-content' }} variant="contained" endIcon={<ReadMoreIcon />}>
                View Details and Applicants
            </Button>
            <Button sx={{ margin: 1, minWidth: 'max-content' }} variant="contained" endIcon={<PersonAddIcon />}>
                Add a Professor
            </Button>
            <Button sx={{ margin: 1, minWidth: 'max-content' }} variant="contained" endIcon={<PersonAddIcon />}>
                Assign a TA
            </Button>
            <Button sx={{ margin: 1, minWidth: 'max-content' }} variant="contained" endIcon={<CableIcon />}>
                Link Course
            </Button>
            <Button sx={{ margin: 1, minWidth: 'max-content' }} variant="contained" endIcon={<DeleteOutlineIcon />}>
                Remove Course
            </Button>
        </ButtonGroup>
    );

    return (
        <Box sx={{ padding: 2 }}>
           <EnhancedTable rows={coursesRows} headCells={coursesHeadCells} title="Courses" button={button} advancedTooltip/>
        </Box>
    );
}