"use client";

import React from 'react';
import {
    Box,
    Button,
    Stack,
    Typography,
    DialogContent,
    Dialog,
} from '@mui/material';

interface AreYouSureDialogProps {
    open: boolean;
    onClose: () => void;
    toRemove: { prefix: string | null; name: string | null; title: string | null };
    onConfirm: (item: { prefix: string | null; name: string | null; title: string | null }) => Promise<void> | void;
}

const AreYouSureDialog = ({ open, onClose, toRemove, onConfirm }: AreYouSureDialogProps) => {
    return (
        <Dialog open={open} onClose={onClose} fullWidth scroll="paper">
            <DialogContent sx={{ p: 0 }}>
                <Box style={{ textAlign: 'center', gridTemplateColumns: '1fr 1fr' }}>
                    <Box sx={{ padding: '20px' }}>
                        <Typography variant="h5">Are You Sure?</Typography>
                    </Box>
                </Box>
                <Box sx={{ pb: 2 }}>
                    <Typography variant="h6" sx={{ paddingX: 5 }}>
                        The following is a permanent deletion. Please confirm that you want to delete{' '}
                        {toRemove.prefix} from the system.
                    </Typography>
                    <Stack
                        direction="row"
                        sx={{ width: '100%', justifyContent: 'space-evenly', marginTop: '5%' }}
                    >
                        <Button onClick={onClose} variant="contained" color="secondary">
                            Cancel
                        </Button>
                        <Button
                            onClick={async () => {
                                await onConfirm(toRemove);
                                onClose();
                            }}
                            variant="contained"
                            color="error"
                        >
                            Yes, I'm sure
                        </Button>
                    </Stack>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default AreYouSureDialog;
