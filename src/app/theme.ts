'use client';
import { createTheme } from '@mui/material/styles';

const primaryColor = '#FF7F32'; // Orange
const secondaryColor = '#005EB8'; // Blue

const theme = createTheme({
    palette: {
        primary: {
            main: primaryColor,
        },
        secondary: {
            main: secondaryColor,
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
    },
});

export default theme;
