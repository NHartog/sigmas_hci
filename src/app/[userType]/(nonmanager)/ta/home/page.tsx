"use server";

import {
    Container,
    Paper,
    Stack,
    Typography,
    Divider,
    Button
} from '@mui/material';
import WithdrawButton from './withdrawButton';
import { getUserData } from '@/actions/application';
import { getCourses } from "@/actions/professor";

export default async function LandingPage() {
    const user = await getUserData();
    const courses = await getCourses();

    // Filter courses where the logged-in student is part of `assignedTas`
    const studentCourses = courses.filter(course => course.assignedTas.includes(user.name));

    const options: any = {weekday: "long", year: "numeric", month: "long", day: "numeric"};

    return (
        <Container maxWidth="md">
            <Paper elevation={5} style={{ padding: "20px", textAlign: "center" }}>
                <Stack spacing={1}>
                    <Stack direction="row" spacing={2} justifyContent="space-between" sx={{ width: '100%', pb: 2 }}>
                        <Typography variant="h2" color="info">Fall 2024</Typography>
                        <Typography variant="h2"> Application</Typography>
                    </Stack>
                    <Stack direction="row" spacing={2} justifyContent="space-between" sx={{ width: '100%' }}>
                        <Typography variant="h5">Last Edit Date</Typography>
                        <Typography variant="body1">{new Date(user.applicationLastEditDate).toLocaleDateString("en-US", options)}</Typography>
                    </Stack>
                    <Stack direction="row" spacing={2} justifyContent="space-between" sx={{ width: '100%' }}>
                        <Typography variant="h5">Completed Status</Typography>
                        <Typography variant="body1" color={user.applicationCompletionStatus ? 'success' : 'error'}>{user.applicationCompletionStatus ? 'Completed' : 'Not Completed'}</Typography>
                    </Stack>
                    <Stack direction="row" spacing={2} justifyContent="space-between" sx={{ width: '100%' }}>
                        <Typography variant="h5">Application Status</Typography>
                        <Typography variant="body1" color={user.applicationStatus ? 'success' : 'error'}>{user.applicationStatus ? 'Accepted' : 'Pending'}</Typography>
                    </Stack>
                </Stack>
                <Stack direction="row" justifyContent="space-between" sx={{ pt: 2 }}>
                    <WithdrawButton />
                    <Button href='/student/application' variant="outlined">Edit Application</Button>
                </Stack>
            </Paper>

            {/* Display Courses the Student is Part of */}
            {studentCourses.length > 0 && (
                <Paper elevation={5} style={{ marginTop: "20px", padding: "20px" }}>
                    <Typography variant="h4" align="center" gutterBottom>Assigned Courses</Typography>
                    <Stack spacing={2} sx={{ p: 2 }}>
                        {studentCourses.map((course) => (
                            <Stack key={course.prefix} spacing={2} divider={<Divider orientation="horizontal" flexItem />}>
                                <Typography variant="h5" align="center">{course.prefix}: {course.title}</Typography>

                                <Stack direction="row" alignItems="center" spacing={2}>
                                    <Typography variant="h6" sx={{ width: "50%" }}>TA Hours:</Typography>
                                    <Typography sx={{ width: "50%" }}>{course.numTaHours}</Typography>
                                </Stack>

                                <Stack direction="row" alignItems="center" spacing={2}>
                                    <Typography variant="h6" sx={{ width: "50%" }}>Current Enrollment:</Typography>
                                    <Typography sx={{ width: "50%" }}>{course.currentEnrollment} / {course.maxEnrollment}</Typography>
                                </Stack>

                                <Stack direction="row" alignItems="center" spacing={2}>
                                    <Typography variant="h6" sx={{ width: "50%" }}>Sections:</Typography>
                                    <Typography sx={{ width: "50%" }}>{course.sections}</Typography>
                                </Stack>

                                {/* Assigned TAs */}
                                <Stack direction="row" alignItems="center" spacing={2}>
                                    <Typography variant="h6" sx={{ width: "50%" }}>Assigned TAs:</Typography>
                                    <Stack direction="row" spacing={1} sx={{ width: "50%" }}>
                                        {course.assignedTas.length > 0 ? (
                                            course.assignedTas.map((ta : any, index : any) => (
                                                <Typography key={index}>{ta}{index < course.assignedTas.length - 1 ? ',' : ''}</Typography>
                                            ))
                                        ) : (
                                            <Typography>No TAs Assigned</Typography>
                                        )}
                                    </Stack>
                                </Stack>

                                {/* Professors */}
                                <Stack direction="row" alignItems="center" spacing={2}>
                                    <Typography variant="h6" sx={{ width: "50%" }}>Professors:</Typography>
                                    <Stack direction="row" spacing={1} sx={{ width: "50%" }}>
                                        {course.professors.length > 0 ? (
                                            course.professors.map((professor : any, index : any) => (
                                                <Typography key={index}>{professor}{index < course.professors.length - 1 ? ',' : ''}</Typography>
                                            ))
                                        ) : (
                                            <Typography>No Professors Assigned</Typography>
                                        )}
                                    </Stack>
                                </Stack>
                            </Stack>
                        ))}
                    </Stack>
                </Paper>

            )}
        </Container>
    );
}
