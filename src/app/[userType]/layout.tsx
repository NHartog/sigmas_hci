"use client";

import { ReactNode, useEffect, useState } from "react";
import { Box, ButtonGroup, Button, Typography } from "@mui/material";
import Link from "next/link";
import LaunchIcon from "@mui/icons-material/Launch";
import InfoIcon from "@mui/icons-material/Info";
import HomeIcon from "@mui/icons-material/Home";
import ClassIcon from "@mui/icons-material/Class";
import SchoolIcon from "@mui/icons-material/School";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import {getUserData} from "@/actions/application";

const SidebarLayout = ({
                           children,
                           params,
                       }: {
    children: ReactNode;
    params: { userType: string };
}) => {
    const [userName, setUserName] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const user = await getUserData();
            if (user && (params.userType === "student" || params.userType === "professor")) {
                setUserName(user.name || "Unknown User");
            }
        };

        fetchUserData();
    }, [params.userType]);

    const allTabs = {
        manager: [
            { label: "Student Manager", path: "/manager/admin/studentManager", icon: <ManageAccountsIcon /> },
            { label: "Professor Manager", path: "/manager/admin/professorManager", icon: <SchoolIcon /> },
            { label: "Course Manager", path: "/manager/admin/courseManager", icon: <ClassIcon /> },
        ],
        student: [
            { label: "Student Home", path: "/student/ta/home", icon: <HomeIcon /> },
            { label: "Application", path: "/student/application", icon: <LaunchIcon /> },
        ],
        professor: [
            { label: "Professor Home", path: "/professor/overview/home", icon: <HomeIcon /> },
        ],
        common: [{ label: "About", path: `/${params.userType}/about`, icon: <InfoIcon /> }],
    };

    let tabsToShow = allTabs.common;
    if (params.userType === "manager") {
        tabsToShow = [...allTabs.manager, ...allTabs.common]; // Show manager tabs
    } else if (params.userType === "student") {
        tabsToShow = [...allTabs.student, ...allTabs.common]; // Show student tabs
    } else if (params.userType === "professor") {
        tabsToShow = [...allTabs.professor, ...allTabs.common]; // Show professor tabs
    }

    return (
        <Box sx={{ display: "flex", height: "100%" }}>
            <Box
                sx={{
                    width: 240,
                    padding: 2,
                    bgcolor: "background.paper",
                    borderRight: "1px solid #ccc",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                {/* User Info Container */}
                <Box
                    sx={{
                        width: "100%",
                        padding: 2,
                        borderRadius: 2, // Rounded corners
                        border: "1px solid #FF7F32", // Border color
                        backgroundColor: "#FFF8E1", // Light background color
                        textAlign: "center",
                        marginBottom: 2,
                    }}
                >
                    {/* Display the userType */}
                    <Typography
                        variant="h6"
                        sx={{
                            marginBottom: 1,
                            color: "#FF7F32",
                            fontWeight: "bold",
                        }}
                    >
                        {params.userType.charAt(0).toUpperCase() + params.userType.slice(1)}
                    </Typography>

                    {/* Display the user's name if available */}
                    {userName && (
                        <Typography
                            variant="subtitle1"
                            sx={{
                                color: "#0800fd",
                                fontStyle: "italic",
                            }}
                        >
                            {userName}
                        </Typography>
                    )}
                </Box>

                {/* Button Group */}
                <ButtonGroup size="large" color="secondary" orientation="vertical" fullWidth>
                    {tabsToShow.map((tab) => (
                        <Link href={tab.path} key={tab.label} style={{ textDecoration: "none", color: "inherit" }}>
                            <Button
                                variant="outlined"
                                fullWidth
                                sx={{
                                    bgcolor: "#FF7F32",
                                    color: "#fff",
                                    "&:hover": {
                                        bgcolor: "#FF5F00",
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
                    height: "100%",
                    overflowY: "auto",
                    width: "100%",
                    padding: 2,
                    bgcolor: "background.default",
                }}
            >
                {children} {/* This is where the routed content will be displayed */}
            </Box>
        </Box>
    );
};

export default SidebarLayout;
