import {useAppDispatch, useAppSelector} from "../app/hooks";
import {getUserIndex, setUserIndex} from "../features/users/userIndexSlice";
import LoadingStatus from "./LoadingStatus";
import * as React from "react";
import UpdateData from "./updateData";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {Button, CardActionArea, CardActions, Typography} from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

export default function UserCard() {
    const dispatch = useAppDispatch();
    const users = UpdateData();
    const userIndex = useAppSelector(getUserIndex) ?? 0;
    const userDataObj = Object.values(users)[userIndex];
    const userData = userDataObj ? Object.entries(userDataObj) : [];

    if (!userIndex) {
        return <LoadingStatus text='The user has not selected.'/>
    }

    if (!userData) {
        return <LoadingStatus text='No user information found.'/>
    }

    const selectUser = (index: number) => {
        dispatch(setUserIndex(index))
    }

    return <>
        <Card sx={{maxWidth: 345}}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image="user.png"
                    alt="green iguana"
                />
                <CardContent>
                    {userData.length ?
                        <List>
                            {userData.map((el, index) => {
                                const fieldName = el[0]
                                const fieldValue = el.at(-1)
                                const text = fieldName + ': ' + fieldValue
                                return (
                                    <ListItem key={index} disablePadding>
                                        <ListItemText primary={text}/>
                                    </ListItem>
                                )
                            })}
                        </List>
                        :
                        <Typography variant="h5" component="span">
                            User is not found. Try to go back.
                        </Typography>
                    }
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button onClick={() => {
                    selectUser(userIndex - 1)
                }} size="small" color="primary">
                    Prev User
                </Button>
                <Button onClick={() => {
                    selectUser(userIndex + 1)
                }} size="small" color="primary">
                    Next User
                </Button>
            </CardActions>
        </Card>
    </>
}
