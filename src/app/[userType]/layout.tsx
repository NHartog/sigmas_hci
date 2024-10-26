"use server";

import { ReactNode } from "react";
import { Box, ButtonGroup, Button } from "@mui/material";
import Link from "next/link";
import LaunchIcon from '@mui/icons-material/Launch';
import InfoIcon from '@mui/icons-material/Info';
import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';

const SidebarLayout = ({ children, params }: { children: ReactNode, params: {userType: string}} ) => {

    const allTabs = {
        manager: [
            { label: "Manager Home", path: "/manager/admin/home", icon: <></> },
            { label: "Student Manager", path: "/manager/admin/studentManager", icon: <></> },
            { label: "Professor Manager", path: "/manager/admin/professorManager", icon: <></> },
            { label: "Course Manager", path: "/manager/admin/courseManager", icon: <></> },
            { label: "Settings", path: "/manager/admin/settings", icon: <></> },
        ],
        student: [
            { label: "Student Home", path: "/student/ta/home", icon: <HomeIcon/> },
            { label: "Application", path: "/student/application", icon: <LaunchIcon/> },
        ],
        professor: [
            { label: "Professor Home", path: "/professor/overview/home", icon: <HomeIcon/> },
            { label: "Course Manager", path: "/professor/overview/courseManager", icon: <ArticleIcon/> },
            { label: "Application", path: "/professor/application", icon: <LaunchIcon/> },
        ],
        common: [
            { label: "About", path: `/${params.userType}/about`, icon: <InfoIcon/> },
        ],
    };

    let tabsToShow = allTabs.common;
    if (params.userType == "manager") {
        tabsToShow = [...allTabs.manager, ...allTabs.common]; // Show manager tabs
    } else if (params.userType =="student") {
        tabsToShow = [...allTabs.student, ...allTabs.common]; // Show student tabs
    } else if (params.userType =="professor") {
        tabsToShow = [...allTabs.professor, ...allTabs.common]; // Show professor tabs
    }

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            <Box
                sx={{
                    width: 240,
                    padding: 1,
                    bgcolor: 'background.paper',
                    borderRight: '1px solid #ccc',
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center-up', // Center buttons vertically
                }}
            >
                <ButtonGroup size = "large" color = "secondary" orientation="vertical" fullWidth>
                    {tabsToShow.map((tab) => (
                        <Link href={tab.path} key={tab.label} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Button
                                variant="outlined"
                                fullWidth
                                sx={{
                                    bgcolor: '#FF7F32',
                                    color: '#fff',
                                    '&:hover': {
                                        bgcolor: '#FF5F00',
                                    },
                                }}
                                startIcon={tab.icon}
                            >
                                {tab.label}
                            </Button>
                        </Link>
                    ))}
                </ButtonGroup>
            </Box>
            <Box
                sx={{
                    flexGrow: 1,
                    padding: 2,
                    bgcolor: 'background.default',
                }}
            >
                {children} {/* This is where the routed content will be displayed */}
            </Box>
        </Box>
    );
};

export default SidebarLayout;
