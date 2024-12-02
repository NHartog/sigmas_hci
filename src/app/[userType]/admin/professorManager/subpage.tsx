"use client"

import React, { useRef, useState } from 'react';
import {Box, Button, ButtonGroup, Stack, Typography} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { EnhancedTable, HeadCell } from '@/Component/customMangerTable';
import ProfessorDetailsDialog from "@/Component/professorDetails";
import AddProfessorForm from '@/Component/addProfessorForm';
import ProfessorCourses from '@/Component/manageProfessorsCourses';
import { getSpecificProf, getStudentsByCourse, deleteProf } from '@/actions/manager';
import ExplanationCard from "@/Component/explanationCard";
import AreYouSureDialog from '@/Component/areYouSureDialog';

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
	const [specificProfApplicants, setSpecificProfApplicants] = useState<any[]>([]);
	const [areYouSureDialogOpen, setAreYouSureDialogOpen] = useState(false);
	let someTAs: any = [];

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
		setAreYouSureDialogOpen(false);
		window.location.reload(); // Reload the entire page
	};

	// New function to handle row selection
	const handleRowSelect = (row: any) => {
		setSelectedProfessor(row)
		myVariable.current = row; // Pass the selected row to handleViewDetails
	};

	const handleButtonOneClick = async () => {
		setSelectedProfessor(myVariable.current);
		setSpecificProfApplicants([]);
		for(let i = 0; i < selectedProfessor.courses.length; i++){
				someTAs = await getStudentsByCourse(selectedProfessor.courses[i]);
				setSpecificProfApplicants(prev => [...prev, ...someTAs]);
		}
		console.log(specificProfApplicants);
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

	const handleSelectProfForRemoval = (prof: any) => {
        setSelectedProfessor(prof);
        setAreYouSureDialogOpen(true);
    };

	const handleAreYouSure = () => handleSelectProfForRemoval(selectedProfessor);

	const deleteProfessorInternal = async () => {
        try {
            const response = await deleteProf(selectedProfessor);

            if (response.success) {
                alert(response.message);
            } else {
                alert(response.message);
            }
        } catch (error) {
            console.error('Error deleting Professor:', error);
            alert('An unexpected error occurred. Please try again.');
        }
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
			<Button sx={{ margin: 1, minWidth: 'max-content' }} onClick={handleAreYouSure} variant="contained" endIcon={<PersonRemoveIcon />}>
				Remove Professor
			</Button>
		</Stack>
	);

	const professorOptions = [
		{
			label: 'View Professor Details',
			description: 'View all important details for a professor',
			icon: <PersonAddIcon />,
			onClick: handleButtonOneClick
		},
		{
			label: 'Manage Courses',
			description: 'Assign or remove courses from the selected professor',
			icon: <PersonAddIcon />,
			onClick: handleManageCourseDialog
		},
		{
			label: 'Remove Professor',
			description: 'Remove the professor from the TAAS system',
			icon: <PersonRemoveIcon />,
			onClick: handleAreYouSure
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
							onClick={option.onClick}
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
					applicants={specificProfApplicants}
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
			{areYouSureDialogOpen && <AreYouSureDialog open={areYouSureDialogOpen} onClose={handleCloseDialog} toRemove={selectedProfessor} onConfirm={deleteProfessorInternal} />}
		</Box>
	)
}
