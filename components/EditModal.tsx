import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function EditModal(props: {
    handle: any; status: boolean; type: string;
}) {
    let title = ''
    const open = props.status
    const handleClose = props.handle
    const type = props.type
    const editStatus = type && type === 'edit' ? true : false
    const addingStatus = type && type === 'new' ? true : false
    if (addingStatus) title = 'Add new user'
    if (editStatus) title = 'Edit or delete User'

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <Box sx={style}>
                    <Typography variant="h6" component="h2">
                        {title}
                    </Typography>
                </Box>
            </Fade>
        </Modal>
    );
}