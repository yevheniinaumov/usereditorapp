import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';

export default function LoadingStatus (props: { text: string; }) {
    const text:string = props.text
    return (
        <Box sx={{ width: '100%' }}>
            <Alert severity="warning">{text}</Alert>
            <LinearProgress />
        </Box>
    );
}
