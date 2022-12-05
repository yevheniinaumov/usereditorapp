import UpdateData from "./updateData";
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Button from '@mui/material/Button';
import {useAppDispatch} from "../app/hooks";
import {useRouter} from "next/router";
import LoadingStatus from "./LoadingStatus";
import {setUser} from "../features/users/userSlice";

export default function UsersList() {
    const users = UpdateData();
    const dispatch = useAppDispatch();
    const router = useRouter()

    if (!users) {
        return <LoadingStatus text='Loading...'/>
    }

    function createData(
        id: string,
        name: string,
        username: string,
    ) {
        return {id, name, username};
    }

    const rows = Object.values(users).map((user: { id: string; name: string; username: string; }) => {
        return createData(user.id, user.name, user.username)
    })

    const select = (id: string) => {
        dispatch(setUser(id))
        router.push('/user')
    }

    return <>
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="right">Username</TableCell>
                        <TableCell align="right">Select</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">
                                {row.id}
                            </TableCell>
                            <TableCell align="right">{row.name}</TableCell>
                            <TableCell align="right">{row.username}</TableCell>
                            <TableCell align="right">
                                <Button onClick={() => {
                                    select(row.id)
                                }} variant="contained" endIcon={<NavigateNextIcon/>}>
                                    Select
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </>
}