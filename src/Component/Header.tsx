import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home"; // Replace with your desired icon
import SettingsIcon from "@mui/icons-material/Settings"; // Replace with your desired icon

const Header = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="home">
                    <HomeIcon />
                </IconButton>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    UF TA System
                </Typography>
                <IconButton edge="end" color="inherit" aria-label="settings">
                    <SettingsIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Header;