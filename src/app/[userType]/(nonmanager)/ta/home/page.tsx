"use server";

import { Button, Container, Paper, Stack, Typography } from '@mui/material'
import WithdrawButton from './withdrawButton';
import { getUserData } from '@/actions/application';

export default async function LandingPage() {

    const user = await getUserData()
    var options: any = { weekday: "long", year: "numeric", month: "long", day: "numeric" };

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
                    <WithdrawButton/>
                    <Button href='/student/application' variant="outlined">Edit Application</Button>
                </Stack>
            </Paper>
        </Container>
    );
}
