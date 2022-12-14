import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import UpdateData from './updateData';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {getUser, setUser} from '../features/users/userSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import UserForm from './UserForm';
import {getUsers, setUsers} from '../features/users/usersSlice';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { getModalType, setModalType } from '../features/modal/modalTypeSlice';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    maxWidth: '75%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function EditModal(props: {
    handle: any; status: boolean;
}) {
    const dispatch = useAppDispatch();
    const users = Object.values(useAppSelector(getUsers));
    const userID = useAppSelector(getUser);
    const open = props.status
    const handleClose = props.handle
    const type = useAppSelector(getModalType)
    const listFields = Object.keys(users[0])
    const [showCreateButton, setShowCreateButton] = React.useState(true);
    let title = ''

    if (type === 'new') title = 'Add new user'

    if (type === 'edit') title = 'Edit or delete User'

    function createUser() {
        dispatch(setModalType('edit'))
        const allIds = users.map((user) => {
            return user.id
        })
        const newID: number = Math.max(...allIds) + 1
        if (allIds.includes(newID)) return false
        const emptyFields: object = listFields.reduce((a, v) => ({
            ...a, [v]: ''
        }), {})
        // @ts-ignore
        emptyFields.id = newID
        // @ts-ignore
        emptyFields.modified = true
        dispatch(setUser(newID))
        dispatch(setUsers([...users, emptyFields]))
    }

    function deleteUser() {
        const filteredUsers = users.filter((user) => {
            return user.id !== userID;
        })
        dispatch(setUsers(filteredUsers))
        handleClose()
    }

    return (
        <Modal
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
                    <UserForm/>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mt: 3
                    }}>
                        {(type === 'new') &&
                        <Button onClick={createUser} variant="contained" endIcon={<AddCircleOutlineIcon/>}>
                            Create User
                        </Button>
                        }
                        {(type === 'edit') &&
                          <Button onClick={deleteUser} variant="contained" endIcon={<DeleteIcon/>}>
                            Delete User
                          </Button>
                        }
                    </Box>
                </Box>
            </Fade>
        </Modal>
    );
}