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

const ProfessorDetails = ({ open, onClose, params }) => {
    const [editMode, setEditMode] = useState(false);
    const [editParams, setEditParams] = useState({ ...params });
    const applicants = [{name: "Maggie Simpson", status: "PhD", course: "CAP5100", preference: 5},
        {name: "John Adams", status: "Undergraduate", course: "CAP5100", preference: 3}
    ]

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
                Professor Details
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
                        <Typography variant="h3">{editParams.Professor}: Professor</Typography>
                    </Box>

                    <Accordion disableGutters>
                        <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
                            <Typography variant="h4">Professor Details</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ display: "flex", flexDirection: "column" }}>
                            {["Professor", "email", "department"].map((field, index) => (
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
                                            {params[field]}
                                        </Typography>
                                    )}
                                </Box>
                            ))}
                        </AccordionDetails>
                    </Accordion>

                    <Accordion disableGutters>
                        <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
                            <Typography variant="h4">Current Courses</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {params.courses.length > 0 ? (
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell style={{ textAlign: "center" }}><strong>Course</strong></TableCell>
                                            <TableCell style={{ textAlign: "center" }}><strong>Current Enrollment</strong></TableCell>
                                            <TableCell style={{ textAlign: "center" }}><strong>More Details</strong></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {params.courses.map((course: { name: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; enrolled: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; seats: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }, idx: React.Key | null | undefined) => (
                                            <TableRow key={idx}>
                                                <TableCell style={{ textAlign: "center" }}><strong>{course.name}</strong></TableCell>
                                                <TableCell style={{ textAlign: "center" }}><strong>{course.enrolled}/{course.seats}</strong></TableCell>
                                                <TableCell style={{ textAlign: "center" }}>
                                                    <Link href={`/manager/admin/courseDetails/${course.name}`}>
                                                        <strong style={{ color: "blue" }}><u>Course Details</u></strong>
                                                    </Link>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            ) : (
                                <Typography variant="h4">No Courses Assigned yet for this semester</Typography>
                            )}
                        </AccordionDetails>
                    </Accordion>
                    <Accordion disableGutters>
                        <AccordionSummary expandIcon={<ArrowDropDownIcon />}>
                            <Typography variant="h4">Professor Preferences</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{textAlign: 'center', width: "20%"}}>Applicant</TableCell>
                                    <TableCell style={{textAlign: 'center', width: "20%"}}>Status</TableCell>
                                    <TableCell style={{textAlign: 'center', width: "20%"}}>Course</TableCell>
                                    <TableCell style={{textAlign: 'center', width: "40%"}}>Preference Level</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {applicants.map((applicant) => (
                                    <TableRow>
                                        <TableCell style={{textAlign: 'center', width: "20%"}}><strong>{applicant.name}</strong></TableCell>
                                        <TableCell style={{textAlign: 'center', width: "20%"}}><strong>{applicant.status}</strong></TableCell>
                                        <TableCell style={{textAlign: 'center', width: "20%"}}><strong>{applicant.course}</strong></TableCell>
                                        <TableCell style={{textAlign: 'center', width: "20%"}}><strong>
                                            <IconRepeater count={applicant.preference} />
                                            </strong></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        </AccordionDetails>
                    </Accordion>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default ProfessorDetails;
