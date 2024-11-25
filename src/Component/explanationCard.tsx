import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

function ExplanationCard({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
    return (
        <Card sx={{ width: '100%', mb: 2 }} elevation={5}>
            <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                    {title}
                </Typography>
                {description && (
                    <Typography variant="body2" gutterBottom sx={{ whiteSpace: 'pre-wrap' }}>
                        {description}
                    </Typography>
                )}
                {children}
            </CardContent>
        </Card>
    );
}

export default ExplanationCard;