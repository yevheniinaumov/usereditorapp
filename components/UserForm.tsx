import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {useAppSelector} from '../app/hooks';
import {getUsers} from '../features/users/usersSlice';
import {getUser} from '../features/users/userSlice';
import {Button} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

export default function UserForm(props: { type: any }) {
    const type = props.type
    const users = Object.values(useAppSelector(getUsers));
    const userID = useAppSelector(getUser);
    const userData = users.filter((user) => {
        return user.id === userID;
    })
    let listFields: any
    if (type === 'new') listFields = Object.keys(users[0])
    if (type === 'edit') listFields = Object.entries(userData.at(-1))

    React.useEffect(() => {
        console.log(listFields)
    });

    function applyUserData() {
        console.log('applyUserData')
    }

    return <>
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': {m: 1, width: '25ch'},
            }}
            noValidate
            autoComplete="off"
        >
            {listFields !== undefined && listFields.map((field: string | any[], index: any) => {
                const firstEl = field[0]
                const lastEl = typeof field === "object" ? field.at(-1) : ''
                const name = typeof field === "object" ? firstEl : field
                const value = typeof lastEl === "object" ? '' : lastEl

                return (
                    <TextField
                        key={name + index}
                        required
                        id={name}
                        label={name}
                        defaultValue={value}
                    />
                )
            })
            }
        </Box>
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 5
        }}>
            <Button onClick={applyUserData} variant="contained" endIcon={<CheckIcon/>}>
                Apply
            </Button>
        </Box>
    </>
}
