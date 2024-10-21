"use server";

import { ReactNode } from "react";
import { Box, ButtonGroup, Button } from "@mui/material";
import Link from "next/link";

const SidebarLayout = ({ children, params }: { children: ReactNode, params: {userType: string}} ) => {

    const allTabs = {
        manager: [
            { label: "Manager Home", path: "/manager/admin/home" },
            { label: "Student Manager", path: "/manager/admin/studentManager" },
            { label: "Professor Manager", path: "/manager/admin/professorManager" },
            { label: "Course Manager", path: "/manager/admin/courseManager" },
            { label: "Settings", path: "/manager/admin/settings" },
        ],
        student: [
            { label: "Student Home", path: "/student/ta/home" },
            { label: "Application", path: "/student/application" },
        ],
        professor: [
            { label: "Professor Home", path: "/professor/overview/home" },
            { label: "Course Manager", path: "/professor/overview/courseManager" },
        ],
        common: [
            { label: "About", path: `/${params.userType}/about` },
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
