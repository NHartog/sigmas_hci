"use server";

import { Typography } from '@mui/material'
import ApplicationStepper from '@/Component/application'
import { Stack } from "@mui/system";
import { getApplicationData } from '@/actions/application';


export default async function LandingPage() {

    const applicationData = await getApplicationData()

    return (
        <Stack style={{ padding: "20px", textAlign: "center", justifyContent: "center" }}>
            <Typography variant="h2" component="h1" gutterBottom>
                Teaching Assistant Application
            </Typography>
            <Typography variant="body1" paragraph>
                Please fill the application to the best of your ability
            </Typography>
            <ApplicationStepper applicationData={applicationData} />
        </Stack>
    );
}
