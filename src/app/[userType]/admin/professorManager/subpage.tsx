"use client"

import React, { useRef, useState } from 'react';
import {Box, Button, ButtonGroup, Stack, Typography} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { EnhancedTable, HeadCell } from '@/Component/customMangerTable';
import ProfessorDetailsDialog from "@/Component/professorDetails";
import AddProfessorForm from '@/Component/addProfessorForm';
import ProfessorCourses from '@/Component/manageProfessorsCourses';
import { getSpecificProf } from '@/actions/manager';
import ExplanationCard from "@/Component/explanationCard";

export default function ProfessorSubPage({ assignedCoursesRows, all_Courses }: { assignedCoursesRows: any, all_Courses: any }) {

	let myVariable = useRef();

	const assignedCoursesHeadCells: HeadCell[] = [
		{ id: 'Professor', numeric: false, disablePadding: true, label: 'Professor' },
		{ id: 'courses', numeric: false, disablePadding: false, label: 'Assigned Course' }
	];

	const cardTitle = 'Welcome to Professor Manager';
	const cardDescription = 'Manage your professors efficiently using the options below. Select a professor to perform various actions.';

	const [profDetailsDialogOpen, setProfDetailsDialogOpen] = useState(false);
	const [addProfDialogOpen, setAddProfDialogOpen] = useState(false);
	const [selectedProfessor, setSelectedProfessor] = useState<any>(null);
	const [profCourses, setProfCourses] = useState<any>(null);
	const [manageCourseDialog, setManageCourseDialog] = useState(false);

	const handleViewDetails = (professor: { id: number; Professor: string; Courses: []; numTaHours: number, email: string }) => {
		setSelectedProfessor(professor);
		console.log(myVariable.current);
		console.log(selectedProfessor);
		setProfDetailsDialogOpen(true);
	};

	const handleCloseDialog = () => {
		setProfDetailsDialogOpen(false);
		setAddProfDialogOpen(false);
		setManageCourseDialog(false);
	};

	// New function to handle row selection
	const handleRowSelect = (row: any) => {
		setSelectedProfessor(row)
		myVariable.current = row; // Pass the selected row to handleViewDetails
	};

	const handleButtonOneClick = () => {
		handleViewDetails(myVariable.current as any);
	};

	const handleAddProfDialog = () => {
		setAddProfDialogOpen(true);
	};
	const handleManageCourseDialog = async () => {
		const curr_Prof = await getSpecificProf(selectedProfessor.Professor);
        setProfCourses(curr_Prof.courses);
		setManageCourseDialog(true);
	}

	const button = (
		<Stack direction="row">
			<Button
				sx={{ margin: 1, minWidth: 'max-content' }}
				variant="contained"
				endIcon={<PersonAddIcon />}
				onClick={handleButtonOneClick}
			>
				View Professor Details
			</Button>
			<Button sx={{ margin: 1, minWidth: 'max-content' }} onClick={handleManageCourseDialog} variant="contained" endIcon={<PersonAddIcon />}>
				Manage Courses
			</Button>
		</Stack>
	);

	const professorOptions = [
		{
			label: 'View Professor Details',
			description: 'View all important details for a professor',
			icon: <PersonAddIcon />
		},
		{
			label: 'Manage Courses',
			description: 'Assign or remove courses from the selected professor',
			icon: <PersonAddIcon />
		},
	];

	return (
		<Box>
			<ExplanationCard title={cardTitle} description={cardDescription}>
				{professorOptions.map((option) => (
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
							disabled={!selectedProfessor}
						>
							{option.label}
						</Button>
						<Typography variant="body1">{option.description}</Typography>
					</Box>
				))}
			</ExplanationCard>

			<EnhancedTable
				rows={assignedCoursesRows}
				headCells={assignedCoursesHeadCells}
				title="Professors"
				button={button}
				advancedTooltip
				onRowSelect={handleRowSelect} // Pass the handleRowSelect function
			/>
			<Box sx={{ textAlign: "right" }}>
				<Button onClick={handleAddProfDialog} variant={'contained'} color='secondary' endIcon={<AddCircleIcon />}>
					Add a Professor
				</Button>
			</Box>
			{profDetailsDialogOpen && (
				<ProfessorDetailsDialog
					open={profDetailsDialogOpen}
					onClose={handleCloseDialog}
					params={selectedProfessor}
				/>
			)}
			{addProfDialogOpen && (
				<AddProfessorForm
					open={addProfDialogOpen}
					onClose={handleCloseDialog}
					all_Courses={all_Courses}
				/>
			)}
			{manageCourseDialog && (
				<ProfessorCourses
					open={manageCourseDialog}
					close={handleCloseDialog}
					params={selectedProfessor}
					courses = {profCourses}
					allCourses={all_Courses}
				/>
			)}
		</Box>
	)
}
