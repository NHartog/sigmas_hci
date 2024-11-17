import React, { useState } from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Button,
    Box,
    Typography,
    Stack, Divider
} from '@mui/material';
import {addStudent} from "@/actions/manager";

interface AddStudentDialogProps {
    open: boolean;
    onClose: () => void;
}

const AddStudentDialog: React.FC<AddStudentDialogProps> = ({ open, onClose}) => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [nameError, setNameError] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const handleSubmit = async () => {
        // Check if all fields are filled
        const isNameValid = name.trim() !== '';
        const isUsernameValid = username.trim() !== '';
        const isPasswordValid = password.trim() !== '';

        setNameError(!isNameValid);
        setUsernameError(!isUsernameValid);
        setPasswordError(!isPasswordValid);

        if (isNameValid && isUsernameValid && isPasswordValid) {
            const studentData = {name, username, password};
            const result = await addStudent(studentData);
            console.log(result);
            if (result.success) {
                // Close dialog or show confirmation as needed
                alert(result.message);
                onClose();
            } else {
                // Handle any errors or notify the user
                alert(result.message);
            }
        }
    };




    function getInput(label: string, name: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, error: boolean) {
        return (
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Typography sx={{ textAlign: "right", fontSize: "150%", width: "50%" }}>
                    {label}:
                </Typography>
                <Typography sx={{ textAlign: "left", marginLeft: "10%", fontSize: "150%", width: "50%" }}>
                    <TextField
                        name={name}
                        label={label}
                        variant="outlined"
                        value={value}
                        onChange={onChange}
                        error={error}  // This will highlight the input red when error is true
                        helperText={error ? 'This field is required' : ''}
                        sx={{ width: "90%", marginTop: "10px" }}
                    />
                </Typography>
            </Box>
        );
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth scroll="paper">
            <DialogContent sx={{ p: 0 }}>
                <Box style={{ textAlign: "center", gridTemplateColumns: '1fr 1fr' }}>
                    <Box sx={{ padding: "20px" }}>
                        <Typography variant="h5">
                            Add New Student
                        </Typography>
                    </Box>
                </Box>
                <form onSubmit={(e) => e.preventDefault()}> {/* Prevent form submission to handle validation with custom button */}
                    <Stack spacing={2} sx={{ p: 2 }} divider={<Divider orientation="horizontal" flexItem />}>
                        {getInput('Name', 'name', name, (e) => setName(e.target.value), nameError)}
                        {getInput('Username', 'username', username, (e) => setUsername(e.target.value), usernameError)}
                        {getInput('Password', 'password', password, (e) => setPassword(e.target.value), passwordError)}
                    </Stack>
                    <Box sx={{ textAlign: "center", padding: "20px" }}>
                        <Button
                            type="button" // Prevent default form submit behavior
                            variant='contained'
                            color='secondary'
                            onClick={handleSubmit}
                            disabled={!name || !username || !password} // Disable button if any input is empty
                        >
                            Add Student
                        </Button>
                    </Box>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddStudentDialog;
