import React, { useState } from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    DialogContent,
    Dialog,
    DialogTitle,
    Typography,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import StarIcon from '@mui/icons-material/Star';
import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';
import Link from "next/link";

const StudentDetails = ({ open, onClose, params, prefs }) => {
    const [editMode, setEditMode] = useState(false);
    const [editParams, setEditParams] = useState({ ...params });

    // Toggle edit mode
    const handleToggleEditMode = () => setEditMode(!editMode);

    // Handle parameter change
    const handleChange = (field) => (event) => {
        setEditParams((prev) => ({
            ...prev,
            [field]: event.target.value,
        }));
    };

    // Save the changes and exit edit mode
    const handleSave = () => {
        // Call a function to save changes to the backend or update state
        // You could pass editParams to a parent component here if needed.

        //Not touching for now

        console.log(editParams)
        setEditMode(false);
    };

    const IconRepeater = ({count}) => {
        return (
          <div>
            {Array.from({ length: count }).map((_, index) => (
                <StarTwoToneIcon sx={{color: "rgba(255,127,50,1)"}} />
            ))}
            {Array.from({ length: 5 - count }).map((_, index) => (
                <StarTwoToneIcon sx={{color: "gray"}} />
            ))}
          </div>
        );
      };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="max">
            <DialogTitle>
                Student Details
                <Button onClick={handleToggleEditMode} sx={{ marginLeft: 2 }}>
                    {editMode ? "Cancel" : "Edit"}
                </Button>
                {editMode && (
                    <Button onClick={handleSave} sx={{ marginLeft: 2 }}>
                        Save
                    </Button>
                )}
            </DialogTitle>
            <DialogContent>
                <Box style={{ padding: "20px", textAlign: "center" }}>
                    <Box
                        sx={{
                            backgroundColor: "rgba(255, 127, 50, 1)",
                            borderTopLeftRadius: "15px",
                            borderTopRightRadius: "15px",
                            padding: "20px",
                        }}
                    >
                        <Typography variant="h3">{editParams.name}</Typography>
                    </Box>

                    <Accordion disableGutters defaultExpanded>
                        <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
                            <Typography variant="h4">Student Details</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ display: "flex", flexDirection: "column" }}>
                            {["studentName", "collegeStatus", "applicationStatus"].map((field, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                    }}
                                >
                                    <Typography sx={{ textAlign: "left", fontSize: "150%", width: "15%" }}>
                                        {field.charAt(0).toUpperCase() + field.slice(1)}:
                                    </Typography>
                                    {editMode ? (
                                        <TextField
                                            value={editParams[field]}
                                            onChange={handleChange(field)}
                                            fullWidth
                                            variant="outlined"
                                        />
                                    ) : (
                                        <Typography sx={{ textAlign: "left", fontSize: "150%", width: "50%" }}>
                                            {editParams[field]}
                                        </Typography>
                                    )}
                                </Box>
                            ))}
                        </AccordionDetails>
                    </Accordion>

                    <Accordion disableGutters defaultExpanded>
                        <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
                            <Typography variant="h4">Course Preferences</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {prefs.length > 0 ? (
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell style={{ textAlign: "center" }}><strong>Course</strong></TableCell>
                                            <TableCell style={{ textAlign: "center" }}><strong>Preference</strong></TableCell>
                                            <TableCell style={{ textAlign: "center" }}><strong>Assigneds</strong></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            prefs.map((course) => (
                                                <TableCell style={{textAlign: "center"}}><strong>{course.prefix}</strong></TableCell>
                                            ))
                                        }
                                    </TableBody>
                                </Table>
                            ) : (
                                <Typography variant="h4">No Courses given in their preferences</Typography>
                            )}
                        </AccordionDetails>
                    </Accordion>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default StudentDetails;
