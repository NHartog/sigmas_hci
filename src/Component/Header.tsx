'use client'
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home"; // Replace with your desired icon
import LogoutIcon from '@mui/icons-material/Logout';
import { goHome, logout } from "@/actions/operations";

const Header = () => {
    return (
        <AppBar position="static" sx={{height: '64px'}}>
            <Toolbar>
                <IconButton onClick={() => goHome()} edge="start" color="inherit" aria-label="home">
                    <HomeIcon />
                </IconButton>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    UF TA System
                </Typography>
                <IconButton onClick={() => logout()} edge="end" color="inherit" aria-label="logout">
                    <LogoutIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
