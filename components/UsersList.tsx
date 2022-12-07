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
import {setUser} from "../features/users/userSlice";
import { isEmpty } from "./helpers";
import AddIcon from '@mui/icons-material/Add';
import SearchBar from "material-ui-search-bar";
import { TextField } from "@mui/material";
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';

export default function UsersList() {
    const users = UpdateData();
    const dispatch = useAppDispatch();
    const router = useRouter()
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [searched, setSearched] = React.useState('');

    if (!users || isEmpty(users)) {
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

    const selectUser = (id: string) => {
        dispatch(setUser(id))
        router.push('/user')
    }

    return <>
        <Paper sx={{width: '100%', overflow: 'hidden'}}>
            <Toolbar sx={{
                pl: {sm: 2},
                pr: {xs: 1, sm: 1},
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ flex: 1 }}
                >
                    List of users
                </Typography>
                <TextField
                    value={searched}
                    onChange={(e) => setSearched(e.target.value)}
                    sx={{ mr: 1 }}
                    label="User search"/>
                <Button variant="contained" endIcon={<AddIcon/>}>
                    Add User
                </Button>
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
                        {rows.filter((row) => { return row.name.toLowerCase().includes(searched.toLowerCase()); })
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => (
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
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'flex-end',
                                            '& > *': {
                                                m: 1,
                                            },
                                        }}
                                    >
                                        <ButtonGroup variant="text" aria-label="text button group">
                                            <Button>Edit</Button>
                                            <Button onClick={() => {
                                                selectUser(row.id)
                                            }}>Select</Button>
                                        </ButtonGroup>
                                    </Box>
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