import UpdateData from "./updateData";
import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Button from '@mui/material/Button';
import {useAppDispatch} from "../app/hooks";
import {useRouter} from "next/router";
import LoadingStatus from "./LoadingStatus";
import {setUserIndex} from "../features/users/userIndexSlice";

export default function UsersList() {
    const users = UpdateData();
    const dispatch = useAppDispatch();
    const router = useRouter()
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

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

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const selectUser = (index: number) => {
        dispatch(setUserIndex(index))
        router.push('/user')
    }

    return <>
        <Paper sx={{width: '100%', overflow: 'hidden'}}>
            <Toolbar sx={{
                pl: {sm: 2},
                pr: {xs: 1, sm: 1}
            }}>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                >
                    List of users
                </Typography>
            </Toolbar>
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
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
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
                                        selectUser(index)
                                    }} variant="contained" endIcon={<NavigateNextIcon/>}>
                                        Select
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    </>
}