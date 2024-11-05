'use client'
import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home"; // Replace with your desired icon
import LogoutIcon from '@mui/icons-material/Logout';
import { goHome, logout } from "@/actions/operations";

const Header = () => {
    return (
        <AppBar position="static" sx={{height: '64px'}}>
            <Toolbar>
                <Button sx={{mr: 2}} onClick={() => goHome()} color="secondary" variant="contained" startIcon={<HomeIcon />}>
                    Home
                </Button>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    UF TA System
                </Typography>
                <Button onClick={() => logout()} color="secondary" variant="contained" endIcon={<LogoutIcon />}>
                    Logout
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
