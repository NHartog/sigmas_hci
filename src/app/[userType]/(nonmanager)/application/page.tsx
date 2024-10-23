"use server";

import {Box, Typography} from '@mui/material'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import ApplicationStepper from '@/Component/application'
import {Stack} from "@mui/system";


export default async function LandingPage() {

    return (
        <Stack style={{ padding: "20px", textAlign: "center", justifyContent: "center" }}>
            <Typography variant="h2" component="h1" gutterBottom>
                This is the Application Page
            </Typography>
            <Typography variant="body1" paragraph>
                Here we will add Application
            </Typography>
            <ApplicationStepper />
        </Stack>
    );
}