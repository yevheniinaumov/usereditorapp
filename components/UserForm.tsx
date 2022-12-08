import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {getUsers, setUsers} from '../features/users/usersSlice';
import {getUser} from '../features/users/userSlice';
import {Button} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import {useState} from "react";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {Typography} from '@mui/material';
import { getModalType } from '../features/modal/modalTypeSlice';

export default function UserForm() {
    const dispatch = useAppDispatch();
    const type = useAppSelector(getModalType)
    const users = Object.values(useAppSelector(getUsers));
    const userID = useAppSelector(getUser);
    const userData = userID ? users.filter((user) => {
        return user.id === userID;
    }) : []
    const listFields = userData.length ? Object.entries(userData.at(-1)) : []

    React.useEffect(() => {
        console.log(users)
    });

    function onChangeField(name: string, value: any) {
        if (type === 'edit') {
            const changedUserData = users.map((user) => ({
                ...user,
                [name]: user.id === userID ? value : user[name]
            }))
            dispatch(setUsers(changedUserData))
        }
    }

    return <>
        {listFields.length && listFields !== undefined ?
            <>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': {m: 1, width: '25ch'},
                    }}
                    noValidate
                    autoComplete="off"
                >
                    {listFields.map((field: string | any[], index: any) => {
                        const firstEl = field[0];
                        const lastEl = typeof field === "object" ? field.at(-1) : '';
                        const name = typeof field === "object" ? firstEl : field;
                        if (name === 'modified') return false
                        const value = typeof lastEl === "object" ? '' : lastEl;
                        const idField = name === 'id'
                        const usernameField = name === 'username'
                        const disabledStatus = idField ? true : false;
                        const requiredStatus = (idField || usernameField) ? true : false;
                        const errorStatus = requiredStatus && value.length === 0
                        const helperText = errorStatus ? 'Empty field' : ''

                        return (
                            <TextField
                                disabled={disabledStatus}
                                label={name}
                                error={errorStatus}
                                key={name + index}
                                helperText={helperText}
                                required={requiredStatus}
                                id={name}
                                defaultValue={value}
                                onChange={(e) => {
                                    onChangeField(name, e.target.value);
                                }}/>
                        );
                    })}
                </Box><Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mt: 1
            }}>
                <CheckCircleOutlineIcon/>
                <Typography variant="h6" component="span">
                    Autosave Changes
                </Typography>
            </Box>
            </>
            : ''}
    </>
}
